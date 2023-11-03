// Import necessary libraries and hooks
import useSWRSubscribe from 'swr/subscription'
import useLocalStorageState from 'use-local-storage-state'
import { useSearchParams } from 'next/navigation'

// Create a global WebSocket Map to store WebSocket instances
const wsMap = new Map()
globalThis.$WS_MAP$ = wsMap

// Custom hook for managing game room WebSocket connection
export function useGameRoom(gameId, token) {
  // Use SWRSubscribe to handle WebSocket connections
  const ws = useSWRSubscribe([gameId, token], ([gameId, token], { next }) => {
    let socket

    // Check if gameId and token are provided
    if (gameId && token) {
      // Create WebSocket connection using provided parameters
      const url = new URL(`ws://162.219.87.221/ws`)
      url.searchParams.set('gameId', gameId)
      url.searchParams.set('token', token)
      socket = new WebSocket(url)

      // Handle WebSocket events
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
        // Close socket if certain condition is met
        if (state.code === 10012) {
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

      // Add event listeners to the socket
      socket.addEventListener('open', openHandle)
      socket.addEventListener('message', messageHandle)
      socket.addEventListener('error', errorHandle)
      socket.addEventListener('close', closeHandle)

      // Store the socket in the global WebSocket Map
      wsMap.set(`${gameId}_${token}`, socket)
    } else {
      // Throw an error if gameId and token are not provided
      next(new Error('gameId and token are required'))
    }

    // Cleanup function to close the socket on unmount
    return () => {
      socket?.close()
    }
  })

  // Return the WebSocket data and a function to send messages
  return {
    data: ws.data,
    error: ws.error,
    send(payload) {
      const socket = wsMap.get(`${gameId}_${token}`)
      if (socket) {
        console.log('<<SEND::', payload, ws)
        // Send the payload if the socket is open
        if (socket.readyState === 1) {
          socket.send(JSON.stringify(payload))
        } else if (socket.readyState > 1) {
          // Reload the page if the socket is closed
          globalThis.location.reload()
        }
      } else {
        // Log an error if the WebSocket object is missing
        console.error('WebSocket object missing', gameId, token)
      }
    }
  }
}

// Custom hook for obtaining the current game room based on user information
export function useCurrentGameRoom() {
  const [userInfo] = useLocalStorageState('userinfo')
  // Get the 'gameId' from the URL search parameters
  const gameId = useSearchParams().get('gameId')

  // Use the useGameRoom hook with the obtained 'gameId' and user token
  return useGameRoom(gameId, userInfo?.token)
}
