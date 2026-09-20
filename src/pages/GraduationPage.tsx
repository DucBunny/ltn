import { useEffect, useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { Route } from '@/routes/$ownerId'

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
import RSVPForm from '@/components/landing/RSVPForm'
import { ownerConfig } from '@/config/owners'

export default function GraduationPage() {
  const { ownerId } = Route.useParams()
  const isValidOwner = ownerId && ownerId in ownerConfig
  const currentOwner = isValidOwner
    ? ownerConfig[ownerId as keyof typeof ownerConfig]
    : ownerConfig.default

  const [guestName, setGuestName] = useState<string>('Bạn')
  const [windowSize, setWindowSize] = useState<{
    width: number
    height: number
  }>({ width: 0, height: 0 })
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const galleryImages = currentOwner.images

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
      <audio ref={audioRef} src="/HanhTrinhRucRo.mp3" loop />

      <AnimatePresence>
        {!isOpened && (
          <WelcomeScreen
            guestName={guestName}
            ownerName={currentOwner.name}
            onOpen={handleOpenInvite}
          />
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

          <MusicPlayer
            isPlaying={isPlaying}
            toggleMusic={toggleMusic}
            ownerPhone={currentOwner.phone}
          />

          <InteractiveBackground />

          <div className="relative z-10">
            <HeroSection ownerName={currentOwner.name} />

            <EventDetails guestName={guestName} />

            <Timeline />

            <JourneyStats />

            <EventCalendar />

            <EventMap />

            <RSVPForm guestName={guestName} ownerName={currentOwner.name} />

            <EventCountdown />

            <GalleryCarousel images={galleryImages} />

            <footer className="bg-[#C62534] px-6 py-10 text-center font-serif text-white">
              {/* Tiêu đề chính */}
              <h2 className="mb-4 text-3xl font-bold tracking-wide md:text-4xl">
                Hẹn gặp {guestName}!
              </h2>

              {/* Lời nhắn nhủ */}
              <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-white/90 md:text-base">
                Sự hiện diện của bạn là niềm vinh hạnh và là món quà ý nghĩa
                nhất trong ngày lễ trọng đại này. Cảm ơn bạn vì đã luôn đồng
                hành cùng mình!
              </p>

              {/* Dải phân cách mờ */}
              <div className="mx-auto mb-8 h-px w-24 bg-white/30"></div>

              {/* Thông tin liên hệ text thường */}
              <p className="mb-2 text-sm text-white/80">
                Liên hệ:{' '}
                <span className="font-sans font-semibold tracking-wider">
                  {currentOwner.phone}
                </span>
              </p>
            </footer>
          </div>
        </>
      )}
    </div>
  )
}
