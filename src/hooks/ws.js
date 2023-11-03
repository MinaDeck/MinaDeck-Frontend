import { useEffect, useRef } from 'react'

// Maintain a set for message history and a map for WebSocket pooling
const messageHistory = new Set()
const wsPool = new Map()
globalThis.$MSG_HISTORY$ = messageHistory

// Custom hook for managing WebSocket connections
export default function useWebSocket(url, { onClose, onMessage, onError, onOpen } = {}) {
  // Create a useRef to persist WebSocket reference across renders
  const wsRef = useRef()

  useEffect(() => {
    let ws

    // Check if a WebSocket for the given URL exists in the pool
    if (wsPool.has(url)) {
      ws = wsPool.get(url)
    } else {
      // Create a new WebSocket and add it to the pool
      ws = new WebSocket(url)
      wsPool.set(url, ws)

      // Event handlers for WebSocket events
      const closeHandler = e => {
        onClose?.(e)
        messageHistory.add({ url, eventType: 'close', type: 'in', payload: e, time: Date.now() })
      }

      const errorHandler = e => {
        onError?.(e)
        messageHistory.add({ url, eventType: 'error', type: 'in', payload: e, time: Date.now() })
      }

      const messageHandler = e => {
        onMessage?.(e)
        messageHistory.add({ url, eventType: 'message', type: 'in', payload: e, time: Date.now() })
      }

      const openHandler = e => {
        onOpen?.(e)
        messageHistory.add({ url, eventType: 'error', type: 'in', payload: e, time: Date.now() })
      }

      // Attach event listeners to the WebSocket
      onClose && ws.addEventListener('close', closeHandler)
      onError && ws.addEventListener('error', errorHandler)
      onMessage && ws.addEventListener('message', messageHandler)
      onOpen && ws.addEventListener('open', openHandler)
    }

    // Set the current WebSocket reference
    wsRef.current = ws
  }, [url, onClose, onMessage, onError, onOpen])

  return {
    // Function to send data through the WebSocket
    send(data) {
      wsRef.ws.send(JSON.stringify(data))
      messageHistory.add({ url, eventType: '::USER_MSG::', type: 'out', payload: data, time: Date.now() })
    },

    // Generator function to read the message history
    *readMessageHistory() {
      // Iterate over the message history set and yield each message
      for (const message of messageHistory) {
        yield message
      }
    }
  }
}
