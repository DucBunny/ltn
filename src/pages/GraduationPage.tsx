import { useEffect, useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'

import img1 from '@/assets/images/1.png'
import img2 from '@/assets/images/2.png'
import img3 from '@/assets/images/3.png'

import InteractiveBackground from '@/components/landing/InteractiveBackground'
import WelcomeScreen from '@/components/landing/WelcomeScreen'
import MusicPlayer from '@/components/landing/MusicPlayer'
import HeroSection from '@/components/landing/HeroSection'
import EventDetails from '@/components/landing/EventDetails'
import Timeline from '@/components/landing/Timeline'
import JourneyStats from '@/components/landing/JourneyStats'
import EventCalendar from '@/components/landing/EventCalendar'
import EventMap from '@/components/landing/EventMap'
import EventCountdown from '@/components/landing/EventCountdown'
import GalleryCarousel from '@/components/landing/GalleryCarousel'

export default function GraduationPage() {
  const [guestName, setGuestName] = useState<string>('Bạn')
  const [windowSize, setWindowSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const galleryImages: string[] = [img1, img2, img3]

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    // Đọc và giải mã URL
    const params = new URLSearchParams(window.location.search)
    const encodedName = params.get('g')
    if (encodedName) {
      try {
        const decoded = decodeURIComponent(atob(encodedName))
        setGuestName(decoded)
      } catch (e) {
        console.error('Lỗi giải mã tên', e)
      }
    }
  }, [])

  const handleOpenInvite = () => {
    setIsOpened(true)
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log('Lỗi autoplay:', e))
    }
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden scroll-smooth bg-white font-sans text-gray-800">
      <audio ref={audioRef} src="/your-background-music.mp3" loop />

      <AnimatePresence>
        {!isOpened && (
          <WelcomeScreen guestName={guestName} onOpen={handleOpenInvite} />
        )}
      </AnimatePresence>

      {isOpened && (
        <>
          <div className="pointer-events-none fixed inset-0 z-50">
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={600}
              colors={['#C62534', '#FFD700', '#FFFFFF', '#000000']}
            />
          </div>

          <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} />

          <InteractiveBackground />

          <div className="relative z-10">
            <HeroSection />

            <EventDetails guestName={guestName} />

            <Timeline />

            <JourneyStats />

            <EventCalendar />

            <EventMap />

            <EventCountdown />

            <GalleryCarousel images={galleryImages} />

            <footer className="bg-[#C62534] py-10 text-center font-serif text-white">
              <h2 className="mb-5 text-3xl font-bold">Hẹn gặp {guestName}!</h2>
              <p className="opacity-80">Design with ❤️ by DucBunny</p>
            </footer>
          </div>
        </>
      )}
    </div>
  )
}
