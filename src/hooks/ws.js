import { useEffect, useRef } from 'react'

const messageHistory = new Set()
const wsPool = new Map()
globalThis.$MSG_HISTORY$ = messageHistory

export default function useWebSocket(url, { onClose, onMessage, onError, onOpen } = {}) {
  const wsRef = useRef()
  useEffect(() => {
    let ws
    if(wsPool.has(url)) {
      ws = wsPool.get(url)
    } else {
      ws = new WebSocket(url)
      wsPool.set(url, ws)
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
      
      onClose && ws.addEventListener('close', closeHandler)
      onError && ws.addEventListener('error',  errorHandler)
      onMessage && ws.addEventListener('message', messageHandler)
      onOpen && ws.addEventListener('open', openHandler)
    }
    wsRef.current = ws
  }, [ url, onClose, onMessage, onError, onOpen ])

  return {
    send(data) {
      wsRef.ws.send(JSON.stringify(data))
      messageHistory.add({ url, eventType: '::USER_MSG::', type: 'out', payload: data, time: Date.now() })
    },
    *readMessageHistory() {
      
    }
  }
}