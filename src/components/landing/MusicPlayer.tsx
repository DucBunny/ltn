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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 left-6 z-40 flex items-center justify-center gap-2 rounded-full border-2 border-white bg-[#C62534] p-3 text-white shadow-2xl transition-colors hover:bg-red-800 md:px-5 md:py-3">
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

          <span className="hidden font-bold md:inline">Gọi cho mình</span>
        </motion.a>
      )}

      <button
        onClick={toggleMusic}
        className={`fixed right-6 bottom-6 z-40 rounded-full border-2 border-white bg-[#C62534] p-3 text-white shadow-2xl transition-transform ${
          isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
        }`}>
        <Disc3 className="h-6 w-6" />
      </button>
    </>
  )
}
