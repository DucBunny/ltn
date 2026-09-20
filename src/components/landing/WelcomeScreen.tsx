import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

interface WelcomeScreenProps {
  guestName: string
  ownerName: string
  onOpen: () => void
}

export default function WelcomeScreen({
  guestName,
  ownerName,
  onOpen,
}: WelcomeScreenProps) {
  return (
    <motion.div
      // Hiệu ứng trượt toàn bộ màn hình lên trên khi bấm "Mở thiệp"
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#C62534] p-4 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative flex w-full max-w-xl flex-col items-center overflow-hidden rounded-xl bg-white p-6 text-center shadow-2xl">
        {/* Họa tiết mờ ở các góc (Giả lập hiệu ứng watercolor/hoa lá nền mờ) */}
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-red-100 opacity-70 mix-blend-multiply blur-3xl filter"></div>
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-yellow-100/60 opacity-70 mix-blend-multiply blur-3xl filter"></div>

        {/* Nội dung chính */}
        <div className="z-10 flex w-full flex-col items-center">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C62534] shadow-md">
            <GraduationCap className="h-7 w-7 text-white" />
          </motion.div>

          {/* Tiêu đề Thiệp */}
          <h2 className="mb-2 text-sm font-bold tracking-widest text-[#C62534] uppercase">
            Thiệp Mời Tốt Nghiệp
          </h2>

          {/* Tên Người Mời (Chủ nhân bữa tiệc) */}
          <h1 className="mb-4 font-serif text-4xl tracking-wide text-gray-800 md:text-5xl">
            {ownerName}
          </h1>

          {/* Dải phân cách trang trí (~ e ~) */}
          <div className="mb-4 flex items-center justify-center gap-2 opacity-60">
            <div className="h-px w-16 bg-gray-400"></div>
            <div className="h-2 w-2 rounded-full border border-gray-400"></div>
            <div className="h-px w-16 bg-gray-400"></div>
          </div>

          {/* Ngày tháng */}
          <p className="mb-6 font-serif text-xl font-semibold text-[#C62534]">
            27 tháng 9, 2026
          </p>

          {/* Lời mời và Tên Khách (Đọc từ URL) */}
          <div className="mb-4 font-serif">
            <p className="mb-1 text-sm tracking-widest text-gray-500 uppercase">
              Thân Mời
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#C62534] md:text-4xl">
              {guestName}
            </h2>
          </div>

          {/* Nút bấm mở thiệp */}
          <div className="relative mt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              // Thêm overflow-hidden để vệt sáng không bị tràn ra ngoài viền bo góc của nút
              className="relative overflow-hidden rounded-full bg-[#C62534] px-10 py-3 text-xl font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-[#a51e2b]">
              {/* Vệt sáng chạy ngang */}
              <motion.div
                animate={{ left: ['-100%', '200%'] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
                // skew-x tạo độ nghiêng cho vệt sáng; gradient từ trong suốt -> trắng mờ -> trong suốt
                className="absolute top-0 bottom-0 w-24 -skew-x-14 bg-linear-to-r from-transparent via-white/50 to-transparent"></motion.div>

              <span className="relative z-10 font-serif">Mở thiệp</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
