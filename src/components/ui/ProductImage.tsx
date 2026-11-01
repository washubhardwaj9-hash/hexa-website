import { useState } from 'react'
import type { ReactNode } from 'react'

type Props = {
  src: string
  alt: string
  /** Rendered while the image is missing / loading. Never claims to be the real product. */
  fallback: ReactNode
  className?: string
  imgClassName?: string
  eager?: boolean
  width?: number
  height?: number
}

/**
 * Loads a real product photo from /public. If the file is not there yet,
 * the supplied fallback is shown instead — so the site works before assets exist
 * and never fabricates product details.
 */
export function ProductImage({
  src,
  alt,
  fallback,
  className = '',
  imgClassName = '',
  eager,
  width,
  height,
}: Props) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  return (
    <div className={`relative ${className}`}>
      {status !== 'ok' && <div className="absolute inset-0">{fallback}</div>}
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('ok')}
          onError={() => setStatus('error')}
          className={`h-full w-full transition-opacity duration-700 ${
            status === 'ok' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  )
}
