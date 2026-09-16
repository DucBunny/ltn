import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from '@/components/ui/marquee'

interface GalleryCarouselProps {
  images: string[]
}

export default function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="bg-gray-800 py-16">
      <h3 className="mb-8 text-center font-serif text-3xl font-bold tracking-wider text-white uppercase">
        Khoảnh khắc kỷ yếu
      </h3>

      <Marquee aria-label="Bộ sưu tập ảnh kỷ yếu">
        <MarqueeFade side="left" className="w-12 from-gray-900 sm:w-24" />
        <MarqueeFade side="right" className="w-12 from-gray-900 sm:w-24" />
        <MarqueeContent speed={30} gradient={false}>
          {images.map((src, index) => (
            <MarqueeItem
              key={src}
              className="h-80 w-56 sm:h-96 sm:w-64 md:h-112.5 md:w-80">
              <button
                type="button"
                className="group block h-full w-full cursor-pointer overflow-hidden rounded-xl border-2 border-gray-700 shadow-xl transition hover:border-[#C62534] focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
                onClick={() => setSelectedImage(src)}
                aria-label={`Phóng to ảnh kỷ yếu ${index + 1}`}>
                <img
                  src={src}
                  alt={`Khoảnh khắc kỷ yếu ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </button>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
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
                className="max-h-[88vh] w-auto max-w-[calc(100vw-2rem)] rounded-2xl object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
