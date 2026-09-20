import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import bkhnSoictLogo from '@/assets/logo/bkhn-soict.png'

export default function HeroSection({ ownerName }: { ownerName: string }) {
  return (
    <section className="relative flex h-screen flex-col items-center justify-center bg-[#FAF8F5] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="z-10 flex flex-col items-center text-gray-900">
        <img
          src={bkhnSoictLogo}
          alt="BKHN SOICT Logo"
          className="mx-auto mb-10 h-22 drop-shadow-md md:h-28"
        />
        <h2 className="mb-2 text-lg font-medium tracking-widest text-[#C62534] uppercase md:text-xl">
          Lễ Tốt Nghiệp
        </h2>
        <h1 className="font-serif text-5xl font-bold text-gray-900 uppercase md:text-7xl">
          {ownerName}
        </h1>
        <div className="my-6 h-1 w-20 bg-yellow-400" />
        <p className="text-md text-gray-500 md:text-xl">
          HEDSPI - Trường CNTT & TT
        </p>
        <p className="text-primary mt-4 font-serif text-2xl font-bold italic">
          9h30 - 11h · 27/9/2026
        </p>
      </motion.div>

      {/* Mũi tên hướng dẫn cuộn xuống */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform cursor-pointer flex-col items-center text-gray-400"
        onClick={(e) => {
          e.preventDefault()
          const target = document.getElementById('event-details')
          if (target)
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}>
        <span className="mb-4 text-sm font-medium tracking-widest uppercase">
          Khám phá
        </span>
        <ChevronDown className="size-12 animate-bounce text-[#C62534]" />
      </motion.div>
    </section>
  )
}
