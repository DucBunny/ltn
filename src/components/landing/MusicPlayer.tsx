import { motion } from 'framer-motion'
import { Disc3, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'

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
        <Button
          asChild
          size="icon"
          className="fixed right-6 bottom-22 z-40 size-13 rounded-full border-2 border-white bg-[#C62534] text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-red-800">
          <motion.a href={`tel:${ownerPhone}`} aria-label="Gọi điện">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'easeInOut',
              }}>
              <Phone className="size-6" />
            </motion.div>
          </motion.a>
        </Button>
      )}

      <Button
        type="button"
        size="icon"
        onClick={toggleMusic}
        className={`fixed right-6 bottom-6 z-40 size-13 rounded-full border-2 border-white bg-[#C62534] text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-red-800 ${
          isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
        }`}
        aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}>
        <Disc3 className="size-6" />
      </Button>
    </>
  )
}
