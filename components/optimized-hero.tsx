"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight, Star, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import OptimizedImage from "./optimized-image"
import dynamic from "next/dynamic"

// Lazy load booking modal
const BookingModal = dynamic(() => import("./booking-modal"), {
  loading: () => <div className="animate-pulse">Loading...</div>,
})

const heroImages = [
  {
    src: "/images/varanasi-evening-aarti.jpg",
    alt: "Varanasi Evening Ganga Aarti",
    title: "Spiritual Varanasi",
  },
  {
    src: "/images/taj-mahal-agra.jpg",
    alt: "Taj Mahal Agra",
    title: "Iconic Taj Mahal",
  },
  {
    src: "/images/ayodhya-ram-temple.jpg",
    alt: "Ayodhya Ram Temple",
    title: "Sacred Ayodhya",
  },
  {
    src: "/images/mathura-krishna-temple.jpg",
    alt: "Mathura Krishna Temple",
    title: "Divine Mathura",
  },
]

export default function OptimizedHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide, isPaused])

  const handleWhatsAppBooking = useCallback(() => {
    const message = "Hi! I would like to book a cab. Please provide me with more details."
    const whatsappUrl = `https://wa.me/918090032475?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }, [])

  const trustBadges = useMemo(
    () => [
      { icon: Shield, text: "UP Labour Dept Approved", color: "text-green-400" },
      { icon: Clock, text: "24×7 Service", color: "text-blue-400" },
      { icon: Star, text: "No Hidden Charges", color: "text-yellow-400" },
    ],
    [],
  )

  return (
    <>
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <OptimizedImage src={image.src} alt={image.alt} className="w-full h-full" priority={index === 0} />
              <div className="absolute inset-0 bg-black/40" />

              {/* Image Title */}
              <div className="absolute bottom-20 left-6 text-white">
                <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium">{image.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all z-10 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all z-10 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg font-medium">4.8/5 Rating</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              India Cab: Your 24×7
              <span className="block text-orange-400">Uttar Pradesh Travel Partner</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Explore the spiritual and cultural heritage of Uttar Pradesh with licensed taxi service
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl hover:bg-white/20 transition-colors"
              >
                <badge.icon className={`h-5 w-5 ${badge.color}`} />
                <span className="font-medium">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleWhatsAppBooking}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Book Now via WhatsApp
            </Button>
            <Button
              onClick={() => setIsBookingModalOpen(true)}
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-2xl text-lg font-semibold backdrop-blur-sm bg-transparent transform hover:scale-105 transition-all duration-300"
            >
              Smart Booking
            </Button>
          </div>

          {/* Live Availability */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 inline-block">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">Serving Varanasi • Agra • Ayodhya • Mathura</span>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {isBookingModalOpen && <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />}
    </>
  )
}
