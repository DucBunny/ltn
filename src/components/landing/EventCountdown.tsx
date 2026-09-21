import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import { Card, CardContent } from '@/components/ui/card'

const eventDate = new Date('2026-09-27T08:00:00+07:00').getTime()

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const getTimeLeft = (): TimeLeft => {
  const distance = Math.max(eventDate - Date.now(), 0)

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  }
}

export default function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const items = useMemo(
    () => [
      { label: 'Ngày', value: timeLeft.days },
      { label: 'Giờ', value: timeLeft.hours },
      { label: 'Phút', value: timeLeft.minutes },
      { label: 'Giây', value: timeLeft.seconds },
    ],
    [timeLeft],
  )

  return (
    <section className="bg-[#fff8dc] px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-5xl">
        <h3 className="mb-8 font-serif text-3xl font-bold tracking-wider text-[#C62534] uppercase">
          Đếm ngược
        </h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((item) => (
            <Card
              key={item.label}
              className="border-yellow-300/70 bg-white/70 backdrop-blur">
              <CardContent className="px-4 py-6 sm:py-8">
                <div className="font-serif text-5xl font-bold text-[#C62534] sm:text-6xl">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="mt-3 text-xs font-bold tracking-[0.25em] text-gray-700 uppercase sm:text-sm">
                  {item.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
