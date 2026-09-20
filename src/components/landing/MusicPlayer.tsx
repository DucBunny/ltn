import { Disc3, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

interface MusicPlayerProps {
  isPlaying: boolean
  ownerPhone: string
  toggleMusic: () => void
}

export default function MusicPlayer({
  isPlaying,
  ownerPhone,
  toggleMusic,
}: MusicPlayerProps) {
  return (
    <>
      {ownerPhone && (
        <motion.a
          href={`tel:${ownerPhone}`}
          className="fixed right-6 bottom-22 z-40 rounded-full border-2 border-white bg-[#C62534] p-3 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-red-800">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: 'easeInOut',
            }}>
            <Phone className="h-6 w-6" />
          </motion.div>
        </motion.a>
      )}

      <button
        onClick={toggleMusic}
        className={`fixed right-6 bottom-6 z-40 rounded-full border-2 border-white bg-[#C62534] p-3 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-red-800 ${
          isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
        }`}>
        <Disc3 className="h-6 w-6" />
      </button>
    </>
  )
}
