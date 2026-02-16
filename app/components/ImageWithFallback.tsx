'use client';
import {useState} from 'react';
import Image from "next/image";
import FallBackImage from "@/public/fallback-cover.jpg";
interface ImageWithFallbackProps {
    originalSrc: string,
    altText: string
    customClass?: string
}
export const ImageWithFallback = ({originalSrc, altText, customClass}: ImageWithFallbackProps) => {
    const [imageSrc, setImageSrc] = useState(originalSrc)
    return (<Image src={imageSrc} onError={() => setImageSrc(FallBackImage.src)} alt={altText} width={252} height={362} className={customClass} />)
}