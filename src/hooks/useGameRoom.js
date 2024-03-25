import useSWRSubscribe from 'swr/subscription'
import useLocalStorageState from 'use-local-storage-state'
import { useSearchParams } from 'next/navigation'

const wsMap = new Map()
globalThis.$WS_MAP$ = wsMap

export function useGameRoom(gameId) {
  const ws = useSWRSubscribe([gameId], ([gameId], { next }) => {
    let socket
    if (gameId) {
      const url = new URL(`ws://localhost:8080`)
      url.searchParams.set('gameId', gameId)
      socket = new WebSocket(url)

      const openHandle = event => {
        const heartbeatHandle = () => {
          socket.send(JSON.stringify({ state: 'open' }))
          socket._heartbeat = setTimeout(heartbeatHandle, 1000 * 60)
        }
        heartbeatHandle()
      }

      socket.addEventListener('open', openHandle)

      socket.addEventListener('message', event => {
        const data = JSON.parse(event.data)
        next(null, data)
      })

      const closeHandle = () => {
        socket.removeEventListener('open', openHandle)
        socket.removeEventListener('close', closeHandle)
      }

      socket.addEventListener('close', closeHandle)

      wsMap.set(`${gameId}`, socket)
    } else {
      next(new Error('gameId is required'))
    }

    return () => {
      socket?.close()
    }
  })

  return {
    data: ws.data,
    error: ws.error,
    send(payload) {
      const socket = wsMap.get(`${gameId}`)
      if (socket) {
        socket.send(JSON.stringify(payload))
      } else {
        console.error('ws object missing', gameId)
      }
    }
  }
}

export function useCurrentGameRoom() {
  const [userInfo] = useLocalStorageState('userinfo')
  const gameId = useSearchParams().get('gameId')

  return useGameRoom(gameId, userInfo?.token)
}
