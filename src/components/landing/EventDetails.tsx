import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

interface EventDetailsProps {
  guestName: string
}

export default function EventDetails({ guestName }: EventDetailsProps) {
  return (
    <section
      id="event-details"
      className="mx-auto max-w-3xl px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}>
        <GraduationCap className="mx-auto mb-6 h-12 w-12 text-[#C62534]" />
        <p className="mt-8 font-serif text-2xl leading-relaxed font-semibold sm:text-3xl">
          “Một chặng đường khép lại, một hành trình mới bắt đầu.”
        </p>
        <p className="text-muted-foreground mx-auto mt-5 max-w-2xl leading-8">
          Cảm ơn <span className="font-bold text-[#CC0000]">{guestName}</span>{' '}
          đã luôn đồng hành trong những năm tháng thanh xuân. Sự hiện diện của
          bạn tại buổi lễ là niềm vui và là món quà ý nghĩa nhất dành cho mình
          trong ngày đặc biệt này.
        </p>
      </motion.div>
    </section>
  )
}
