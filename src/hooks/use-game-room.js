import useSWRSubscribe from 'swr/subscription'
import useLocalStorageState from 'use-local-storage-state'
import { useSearchParams } from 'next/navigation'

const wsMap = new Map()
globalThis.$WS_MAP$ = wsMap

export function useGameRoom(gameId, token) {
  const ws = useSWRSubscribe([gameId, token], ([gameId, token], { next }) => {
    let socket
    if(gameId && token) {
      const url = new URL(`ws://162.219.87.221/ws`)
      url.searchParams.set('gameId', gameId)
      url.searchParams.set('token', token)
      socket = new WebSocket(url)

      const openHandle = event => {
        const heartbeatHandle = () => {
          socket.send('')
          socket._heartbeat = setTimeout(heartbeatHandle, 1000 * 60)
        }
        heartbeatHandle()
      }

      const messageHandle = event => {
        const state = JSON.parse(event.data)
        console.log('>>PUSH::', state)
        if(state.code === 10012) {
          socket.close()
        }
        next(null, state)
      }

      const errorHandle = event => {
        next(event.error)
        clearTimeout(socket._heartbeat)
      }

      const closeHandle = () => {
        socket.removeEventListener('open', openHandle)
        socket.removeEventListener('message', messageHandle)
        socket.removeEventListener('error', errorHandle)
        socket.removeEventListener('close', closeHandle)
      }

      globalThis.abc = messageHandle

      socket.addEventListener('open', openHandle)
      socket.addEventListener('message', messageHandle)
      socket.addEventListener('error', errorHandle)
      socket.addEventListener('close', closeHandle)

      wsMap.set(`${gameId}_${token}`, socket)
    } else {
      next(new Error('gameId and token is required'))
    }
    return () => {
      socket?.close()
    }
  })

  return {
    data: ws.data,
    error: ws.error,
    send(payload) {
      const socket = wsMap.get(`${gameId}_${token}`)
      if(socket) {
        console.log('<<SEND::', payload, ws)
        if(socket.readyState === 1) {
          socket.send(JSON.stringify(payload))
        } else if(socket.readyState > 1) {
          globalThis.location.reload()
        }
      } else {
        console.error('ws object missing', gameId, token)
      }
    }
  }
}

export function useCurrentGameRoom() {
  const [ userInfo ] = useLocalStorageState('userinfo')
  const gameId = useSearchParams().get('gameId')

  return useGameRoom(gameId, userInfo?.token)
}