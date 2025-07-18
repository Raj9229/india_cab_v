"use client"

import { useState } from "react"
import LoadingAnimation from "./loading-animation"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export default function LazyImage({ src, alt, className = "", width, height }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <LoadingAnimation />
        </div>
      )}

      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        loading="lazy"
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  )
}
