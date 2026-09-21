import { useState } from 'react'
import Confetti from 'react-confetti'
import { motion } from 'framer-motion'

import { Badge } from '@/components/ui/badge'

export default function Timeline() {
  const [showConfetti, setShowConfetti] = useState(false)

  const milestones = [
    {
      year: '2022',
      title: 'Nhập học',
      desc: 'Chính thức bước chân vào cánh cổng Đại học Bách Khoa Hà Nội.',
    },
    {
      year: '2023',
      title: 'Qua môn huyền thoại',
      desc: 'Sống sót qua Giải tích 1, 2, 3 và Vật lý đại cương.',
    },
    {
      year: '2024 - 2025',
      title: 'Chinh phục chuyên ngành & Đồ án',
      desc: 'Chìm đắm trong code, bug và những deadline chạy thâu đêm cùng anh em.',
    },
    {
      year: '2026',
      title: 'Tốt nghiệp',
      desc: 'Bảo vệ thành công đồ án, chính thức nhận bằng tốt nghiệp.',
    },
  ]

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 4000)
  }

  return (
    <section className="relative mx-auto max-w-2xl overflow-hidden px-6 py-16">
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50">
          <Confetti
            recycle={false}
            numberOfPieces={200}
            colors={['#C62534', '#FFD700', '#FFFFFF']}
            gravity={0.2}
          />
        </div>
      )}

      <h3 className="mb-12 text-center font-serif text-3xl font-bold tracking-wider text-[#C62534] uppercase">
        Dấu Mốc Thanh Xuân
      </h3>

      <div className="relative ml-4 border-l-4 border-red-200 md:mx-auto md:ml-0 md:flex md:flex-col md:items-center md:border-0">
        <div className="absolute left-1/2 hidden h-full -translate-x-1/2 transform border-l-4 border-red-200 md:block"></div>

        {milestones.map((item, index) => {
          const isGraduation = item.year === '2026'

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              onViewportEnter={() => {
                if (isGraduation) triggerConfetti()
              }}
              className={`relative mb-10 w-full md:w-1/2 ${
                index % 2 === 0
                  ? 'md:self-start md:pr-12 md:text-right'
                  : 'text-left md:self-end md:pl-12'
              } pl-8 md:pl-0`}>
              <div
                className={`absolute top-0 size-6 rounded-full border-4 border-white bg-[#C62534] shadow-md ${
                  index % 2 === 0
                    ? '-left-3.5 md:-right-3 md:left-auto'
                    : '-left-3.5 md:-left-3'
                }`}></div>
              <Badge
                variant="secondary"
                className="mb-2 bg-red-100 px-3 py-1 text-sm font-bold text-[#C62534]">
                {item.year}
              </Badge>
              <h4 className="mb-2 text-xl font-bold text-gray-800">
                {item.title}
              </h4>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
