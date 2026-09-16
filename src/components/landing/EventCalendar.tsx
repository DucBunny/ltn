import { motion } from 'framer-motion'
import { CalendarPlus, Heart } from 'lucide-react'

export default function EventCalendar() {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: 1 }, (_, i) => i) // T2, rỗng
  const targetDay = 27 // Ngày sự kiện diễn ra
  const calendarLink =
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lễ+Tốt+Nghiệp+HUST+-+Vũ+Ngọc+Đức&dates=20260927T080000Z/20260927T120000Z&details=Kính+mời+đến+dự+lễ+tốt+nghiệp+tại+Đại+học+Bách+Khoa+Hà+Nội&location=Hội+trường+C2,+Nhà+C2,+Bạch+Mai,+Hà+Nội,+Việt+Nam'

  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-[#C62534] p-8 font-serif text-white shadow-2xl">
        <h3 className="mb-6 text-center text-3xl font-semibold italic">
          Tháng 9 / 2026
        </h3>

        <div className="mb-4 grid grid-cols-7 gap-3 border-b border-white/30 pb-4 text-center text-base font-semibold">
          <span>T2</span>
          <span>T3</span>
          <span>T4</span>
          <span>T5</span>
          <span>T6</span>
          <span>T7</span>
          <span>CN</span>
        </div>

        <div className="grid grid-cols-7 gap-x-3 gap-y-4 text-center text-base">
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`}></div>
          ))}
          {daysInMonth.map((day) => (
            <div
              key={day}
              className="relative flex h-8 items-center justify-center">
              {day === targetDay ? (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
                  className="absolute z-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-white shadow-lg">
                  <span className="z-10 font-bold text-[#C62534]">{day}</span>
                  <Heart
                    className="absolute h-8 w-8 text-yellow-400 opacity-20"
                    fill="currentColor"
                  />
                </motion.div>
              ) : (
                <span className="z-10">{day}</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.a
        href={calendarLink}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        viewport={{ once: true }}
        className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-[#C62534] px-8 py-3 font-bold text-white shadow-lg transition hover:bg-red-800">
        <CalendarPlus className="size-5.5" strokeWidth="2.5" />
        Thêm vào lịch
      </motion.a>
    </section>
  )
}
