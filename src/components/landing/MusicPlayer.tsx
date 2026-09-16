import { Disc3 } from 'lucide-react'

interface MusicPlayerProps {
  isPlaying: boolean
  toggleMusic: () => void
}

export default function MusicPlayer({
  isPlaying,
  toggleMusic,
}: MusicPlayerProps) {
  return (
    <button
      onClick={toggleMusic}
      className={`fixed right-6 bottom-6 z-40 rounded-full border-2 border-white bg-[#C62534] p-3 text-white shadow-2xl transition-transform ${
        isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
      }`}>
      <Disc3 className="h-6 w-6" />
    </button>
  )
}
