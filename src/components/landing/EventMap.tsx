import { motion } from 'framer-motion'
import { MapPin, SquareArrowOutUpRight } from 'lucide-react'

export default function EventMap() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border-t-4 border-[#C62534] bg-white p-4 shadow-xl md:p-8">
        <h3 className="mb-2 text-center font-serif text-3xl font-bold tracking-wider text-[#C62534] uppercase">
          Địa điểm tổ chức
        </h3>

        <p className="mb-6 flex items-center justify-center gap-2 text-gray-600">
          <MapPin className="h-5 w-5 text-[#C62534]" />
          Hội trường C2, Đại học Bách Khoa Hà Nội
        </p>

        <div className="relative mb-6 h-64 w-full overflow-hidden rounded-2xl shadow-inner md:h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4093.241058114645!2d105.8397316756425!3d21.00644738063727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac77be0eafaf%3A0xd66f269f842d3935!2zSOG7mWkgdHLGsOG7nW5nIEMy!5e1!3m2!1svi!2s!4v1789585231561!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"></iframe>
        </div>

        <motion.a
          href="https://maps.app.goo.gl/atrB1v5xvj2BtQiC6"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-[#C62534] px-8 py-3 font-bold text-white shadow-lg transition hover:bg-red-800">
          <SquareArrowOutUpRight className="size-5.5" strokeWidth="2.5" />
          Mở Maps
        </motion.a>
      </motion.div>
    </section>
  )
}
