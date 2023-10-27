import useSWR from 'swr'
import stateFetcher from '@/fetcher/state'

export default function GlobalTips() {
  const { data: gameMessages, mutate: gameMessagesMutate } = useSWR('local:gameMessages', stateFetcher)

  return (
    <div className='fixed right-4 top-4 flex flex-col gap-2'>
      {gameMessages?.map((message, i) => {
        return (
          <Tips key={`tip_${i}`} message={message} onClose={() => {
            const messages = [...gameMessages]
            messages.splice(i, 1)
            stateFetcher('local:gameMessages', messages).then(gameMessagesMutate)
          }} />
        )
      })}
    </div>
  )
}

function Tips({ message, onClose }) {
  return (
    <div className='rounded-lg bg-white shadow-lg px-8 py-4 transition-transform translate-x-full'
      ref={ dom => { if(dom) {
        requestAnimationFrame(() => {
          dom.classList.remove('translate-x-full')
          setTimeout(() => {
            dom.classList.add('translate-x-full')
            setTimeout(onClose, 200)
          }, 3000)
        })
      } } }
      onClick={onClose}
    >{message}</div>
  )
}