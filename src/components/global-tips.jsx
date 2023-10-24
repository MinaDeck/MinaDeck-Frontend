import useSWR from 'swr';
import stateFetcher from '@/fetcher/state';

export default function GlobalTips() {
  // Fetch game messages using SWR (stale-while-revalidate) for data fetching
  const { data: gameMessages, mutate: gameMessagesMutate } = useSWR('local:gameMessages', stateFetcher);

  return (
    <div className='fixed right-4 top-4 flex flex-col gap-2'>
      {/* Map through game messages and display each as a tip */}
      {gameMessages?.map((message, i) => {
        return (
          <Tips key={`tip_${i}`} message={message} onClose={() => {
            // Remove message from the list on close
            const messages = [...gameMessages];
            messages.splice(i, 1);
            stateFetcher('local:gameMessages', messages).then(gameMessagesMutate);
          }} />
        );
      })}
    </div>
  );
}

function Tips({ message, onClose }) {
  return (
    <div className='rounded-lg bg-white shadow-lg px-8 py-4 transition-transform translate-x-full'
      // Animation for tip appearance and disappearance
      ref={dom => {
        if (dom) {
          requestAnimationFrame(() => {
            dom.classList.remove('translate-x-full');
            // Automatically close the tip after a delay
            setTimeout(() => {
              dom.classList.add('translate-x-full');
              setTimeout(onClose, 200);
            }, 3000);
          });
        }
      }}
      onClick={onClose} // Close the tip on click
    >{message}</div>
  );
}