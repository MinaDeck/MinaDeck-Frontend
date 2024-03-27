import { useEffect } from 'react';
import useSWRSubscribe from 'swr/subscription';
import useLocalStorageState from 'use-local-storage-state';
import { useSearchParams } from 'next/navigation';

const wsMap = new Map();
globalThis.$WS_MAP$ = wsMap;

export function useGameRoom(gameId) {
  const ws = useSWRSubscribe([gameId], ([gameId], { next }) => {
    let socket;
    if (gameId) {
      const url = new URL(`ws://localhost:8080`);
      url.searchParams.set('gameId', gameId);
      socket = new WebSocket(url);

      const openHandle = event => {
        const heartbeatHandle = () => {
          socket.send(JSON.stringify({ state: 'open' }));
          socket._heartbeat = setTimeout(heartbeatHandle, 1000 * 60);
        };
        heartbeatHandle();
      };

      socket.addEventListener('open', openHandle);

      socket.addEventListener('message', event => {
        console.log(event)
        const data = JSON.parse(event.data);
        next(null, data);
      });

      const closeHandle = () => {
        socket.removeEventListener('open', openHandle);
        socket.removeEventListener('close', closeHandle);
      };

      socket.addEventListener('close', closeHandle);

      wsMap.set(`${gameId}`, socket);
    } else {
      next(new Error('gameId is required'));
    }

    return () => {
      socket?.close();
    };
  });

  console.log(wsMap)

  const send = (message) => {
    console.log(message)
    const socket = wsMap.get(`${gameId}`);
    if (socket) {
      socket.send(message);
    }
  };

  useEffect(() => {
    return () => {
      const socket = wsMap.get(`${gameId}`);
      if (socket) {
        socket.close();
        wsMap.delete(`${gameId}`);
      }
    };
  }, [gameId]);

  return {
    data: ws.data,
    error: ws.error,
    send: send
  };
}

export function useCurrentGameRoom() {
  const [userInfo] = useLocalStorageState('userinfo');
  const gameId = useSearchParams().get('gameId');

  return useGameRoom(gameId, userInfo?.token);
}
