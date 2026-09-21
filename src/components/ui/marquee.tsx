'use client'

import * as FastMarqueeModule from 'react-fast-marquee'

import type { ComponentType, HTMLAttributes } from 'react'
import type { MarqueeProps as FastMarqueeProps } from 'react-fast-marquee'

import { cn } from '@/lib/utils'

type MaybeDefaultModule = {
  default?: unknown
}

const resolveFastMarquee = (
  module: unknown,
): ComponentType<FastMarqueeProps> => {
  const firstDefault =
    module && typeof module === 'object' && 'default' in module
      ? (module as MaybeDefaultModule).default
      : module

  const resolved =
    firstDefault &&
    typeof firstDefault === 'object' &&
    'default' in firstDefault
      ? (firstDefault as MaybeDefaultModule).default
      : firstDefault

  return resolved as ComponentType<FastMarqueeProps>
}

const FastMarquee = resolveFastMarquee(FastMarqueeModule)

export type MarqueeProps = HTMLAttributes<HTMLDivElement>

export const Marquee = ({ className, ...props }: MarqueeProps) => (
  <div
    className={cn('relative w-full overflow-hidden', className)}
    {...props}
  />
)

export type MarqueeContentProps = FastMarqueeProps

export const MarqueeContent = ({
  loop = 0,
  autoFill = true,
  pauseOnHover = true,
  ...props
}: MarqueeContentProps) => (
  <FastMarquee
    loop={loop}
    autoFill={autoFill}
    pauseOnHover={pauseOnHover}
    {...props}
  />
)

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: 'left' | 'right'
}

export const MarqueeFade = ({
  className,
  side,
  ...props
}: MarqueeFadeProps) => (
  <div
    className={cn(
      'from-background absolute top-0 bottom-0 z-10 h-full w-24 to-transparent',
      side === 'left' ? 'left-0 bg-linear-to-r' : 'right-0 bg-linear-to-l',
      className,
    )}
    {...props}
  />
)

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div className={cn('mx-2 shrink-0 object-contain', className)} {...props} />
)
