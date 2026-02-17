'use client'
import { useState } from 'react'
import Image from 'next/image'
import FallBackImage from '@/public/fallback-cover.jpg'
interface ImageWithFallbackProps {
  originalSrc: string
  width?: number
  height?: number
  altText: string
  customClass?: string
}
export const ImageWithFallback = ({
  originalSrc,
  width = 252,
  height = 362,
  altText,
  customClass
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(originalSrc)
  return (
    <Image
      src={imageSrc}
      onError={() => setImageSrc(FallBackImage.src)}
      alt={altText}
      width={width}
      height={height}
      className={customClass}
    />
  )
}
