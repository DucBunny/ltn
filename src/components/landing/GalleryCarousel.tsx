import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  wrap,
} from 'framer-motion'
import { X } from 'lucide-react'

interface GalleryCarouselProps {
  images: string[]
}

export default function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Chỉ sử dụng MỘT biến motion value duy nhất để tránh xung đột
  const x = useMotionValue(0)

  const [isDragging, setIsDragging] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Nhân 5 mảng ảnh để vuốt thả vô tận
  const duplicatedImages = [
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
  ]

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContentWidth(containerRef.current.scrollWidth / 4)
      }
    }
    // Đợi ảnh render xong để tính toán width chuẩn xác nhất
    const timeout = setTimeout(updateWidth, 250)
    window.addEventListener('resize', updateWidth)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', updateWidth)
    }
  }, [images])

  // Xử lý auto-scroll mượt mà mỗi khung hình
  useAnimationFrame((_, delta) => {
    if (isDragging || isPaused || contentWidth === 0) return

    const moveBy = 0.05 * delta
    const currentX = x.get()
    // Tự động wrap vòng lặp vô tận
    x.set(wrap(-contentWidth, 0, currentX - moveBy))
  })

  // Hàm này cực kỳ quan trọng: Ép vòng lặp vô tận NGAY LẬP TỨC trong lúc đang vuốt
  const handleDrag = () => {
    if (contentWidth === 0) return
    const currentX = x.get()
    const wrappedX = wrap(-contentWidth, 0, currentX)
    // Dịch chuyển tức thời về lại khung ảnh tương đương nếu vuốt lố giới hạn
    if (currentX !== wrappedX) {
      x.set(wrappedX)
    }
  }

  const handleDragStart = () => {
    setIsDragging(true)
    setIsPaused(false)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setIsPaused(true)

    // Tiếp tục chạy sau 2 giây buông tay
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 2000)
  }

  return (
    <section className="overflow-hidden bg-gray-800 py-16">
      <h3 className="mb-8 text-center font-serif text-3xl font-bold tracking-wider text-white uppercase">
        Khoảnh khắc kỷ yếu
      </h3>

      <div className="relative flex w-full items-center overflow-hidden">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-linear-to-r from-gray-800 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-linear-to-l from-gray-800 to-transparent sm:w-24" />

        <motion.div
          ref={containerRef}
          className="flex w-max cursor-grab active:cursor-grabbing"
          style={{ x }} // Trỏ trực tiếp giá trị x vào style
          drag="x"
          dragElastic={0} // Tắt độ co giãn gây khựng
          dragMomentum={true} // Bật quán tính để vuốt mượt hơn
          onDragStart={handleDragStart}
          onDrag={handleDrag} // Đồng bộ vòng lặp trong lúc vuốt
          onDragEnd={handleDragEnd}>
          {duplicatedImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="mx-2 h-80 w-56 shrink-0 sm:h-96 sm:w-64 md:h-112.5 md:w-80">
              <button
                type="button"
                // Ngăn chặn sự kiện kéo thả mặc định của trình duyệt ảnh hưởng tới Framer Motion
                onDragStart={(e) => e.preventDefault()}
                className="group block h-full w-full cursor-pointer overflow-hidden rounded-xl border-2 border-gray-700 shadow-xl transition hover:border-[#C62534] focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
                onClick={() => setSelectedImage(src)}
                aria-label={`Phóng to ảnh kỷ yếu`}>
                <img
                  src={src}
                  alt={`Khoảnh khắc kỷ yếu`}
                  draggable={false} // Rất quan trọng để triệt tiêu lỗi kéo ghost-image
                  className="pointer-events-none h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </button>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}>
            <motion.div
              className="relative w-fit max-w-[calc(100vw-2rem)]"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className="absolute -top-3 -right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white text-[#C62534] shadow-lg transition hover:bg-red-50 focus:ring-2 focus:outline-none"
                onClick={() => setSelectedImage(null)}
                aria-label="Đóng ảnh phóng to">
                <X className="h-5 w-5" />
              </button>
              <img
                src={selectedImage}
                alt="Ảnh kỷ yếu phóng to"
                draggable={false}
                className="max-h-[88vh] w-auto max-w-[calc(100vw-2rem)] rounded-2xl object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
