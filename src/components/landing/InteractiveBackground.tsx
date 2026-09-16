import { useEffect } from 'react'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const particles = [
  { left: '8%', top: '16%', size: 'h-1 w-1', delay: 0 },
  { left: '22%', top: '72%', size: 'h-1.5 w-1.5', delay: 0.8 },
  { left: '41%', top: '24%', size: 'h-1 w-1', delay: 1.4 },
  { left: '68%', top: '62%', size: 'h-1.5 w-1.5', delay: 0.4 },
  { left: '86%', top: '30%', size: 'h-1 w-1', delay: 1.1 },
]

const stars = [
  { left: '14%', top: '42%', delay: 0.2 },
  { left: '31%', top: '12%', delay: 1.1 },
  { left: '58%', top: '34%', delay: 0.7 },
  { left: '79%', top: '68%', delay: 1.6 },
  { left: '91%', top: '18%', delay: 0.5 },
]

const confetti = [
  { left: '18%', top: '24%', rotate: 14, color: 'bg-[#C62534]' },
  { left: '52%', top: '78%', rotate: -18, color: 'bg-yellow-300' },
  { left: '82%', top: '46%', rotate: 28, color: 'bg-[#C62534]' },
]

export default function InteractiveBackground() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 45, damping: 18 })
  const smoothY = useSpring(pointerY, { stiffness: 45, damping: 18 })
  const driftX = useTransform(smoothX, [-0.5, 0.5], [-18, 18])
  const driftY = useTransform(smoothY, [-0.5, 0.5], [-12, 12])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5)
      pointerY.set(event.clientY / window.innerHeight - 0.5)
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [pointerX, pointerY])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ x: driftX, y: driftY }}
        className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-[#C62534]/10 blur-3xl"
      />
      <motion.div
        style={{ x: driftY, y: driftX }}
        className="absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl"
      />

      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.24),transparent_62%)]" />
      <div className="absolute top-0 left-1/2 h-screen w-136 -translate-x-1/2 bg-[linear-gradient(100deg,transparent_35%,rgba(255,255,255,0.34)_48%,transparent_61%)] opacity-30" />

      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className={`absolute rounded-full bg-[#C62534]/35 ${particle.size}`}
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {stars.map((star) => (
        <motion.span
          key={`${star.left}-${star.top}`}
          className="absolute text-lg leading-none text-yellow-300/70"
          style={{ left: star.left, top: star.top }}
          animate={{ y: [0, -10, 0], scale: [0.85, 1.08, 0.85] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}>
          ✦
        </motion.span>
      ))}

      {confetti.map((piece) => (
        <motion.span
          key={`${piece.left}-${piece.top}`}
          className={`absolute h-3 w-1.5 rounded-full ${piece.color}`}
          style={{
            left: piece.left,
            top: piece.top,
            rotate: piece.rotate,
          }}
          animate={{ y: [0, 18, 0], rotate: [piece.rotate, piece.rotate + 18] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(#111_0.7px,transparent_0.7px)] bg-size-[6px_6px] opacity-[0.05]" />
    </div>
  )
}
