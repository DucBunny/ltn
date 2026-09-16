import { useEffect, useRef, useState } from 'react'

import { animate, motion, useInView } from 'framer-motion'

interface CountUpProps {
  end: number
  suffix?: string
}

function CountUp({ end, suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, end, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(Math.round(latest)),
    })

    return () => controls.stop()
  }, [end, isInView])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

export default function JourneyStats() {
  return (
    <section className="px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-5xl">
        <h3 className="mb-8 text-center font-serif text-3xl font-bold tracking-wider text-[#C62534] uppercase">
          4 Năm Rực Rỡ
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-red-100 bg-white/80 px-6 py-8 shadow-sm backdrop-blur">
            <div className="font-serif text-5xl font-bold text-[#C62534]">
              <CountUp end={4} />
            </div>
            <p className="mt-3 text-sm font-bold tracking-[0.25em] text-gray-700 uppercase">
              Năm đại học
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-300/70 bg-[#fff8dc]/90 px-6 py-8 shadow-sm backdrop-blur">
            <div className="font-serif text-5xl font-bold text-[#C62534]">
              <CountUp end={1460} suffix="+" />
            </div>
            <p className="mt-3 text-sm font-bold tracking-[0.25em] text-gray-700 uppercase">
              Ngày nỗ lực
            </p>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white/80 px-6 py-8 shadow-sm backdrop-blur">
            <div className="font-serif text-5xl font-bold text-[#C62534]">
              1
            </div>
            <p className="mt-3 text-sm font-bold tracking-[0.25em] text-gray-700 uppercase">
              Tấm bằng
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-300/70 bg-[#C62534] px-6 py-8 text-white shadow-sm">
            <div className="font-serif text-5xl font-bold">
              <CountUp end={2026} />
            </div>
            <p className="mt-3 text-sm font-bold tracking-[0.25em] text-yellow-200 uppercase">
              Vô vàn kỷ niệm
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
