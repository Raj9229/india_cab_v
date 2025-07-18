"use client"

import { useState } from "react"
import { Star, Shield, Clock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileBookingModal from "./mobile-booking-modal"

export default function MobileHero() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleWhatsAppBooking = () => {
    const message = "Hi! I would like to book a cab. Please provide me with more details."
    const whatsappUrl = `https://wa.me/918090032475?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/varanasi-evening-aarti.jpg"
            alt="Varanasi Evening Ganga Aarti"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 py-20">
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm font-medium">4.8/5 Rating</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              India Cab
              <span className="block text-orange-400 text-2xl md:text-3xl">Uttar Pradesh Travel</span>
            </h1>

            <p className="text-lg mb-6 text-gray-200 max-w-md mx-auto">
              Explore Varanasi • Agra • Ayodhya • Mathura with licensed taxi service
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium">UP Approved</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium">24×7 Service</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Button
              onClick={() => setIsBookingModalOpen(true)}
              size="lg"
              className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
            >
              📱 Book Now
            </Button>

            <div className="flex space-x-3 max-w-sm mx-auto">
              <Button
                onClick={handleWhatsAppBooking}
                size="lg"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold"
              >
                WhatsApp
              </Button>
              <Button
                onClick={() => window.open("tel:+918090032475", "_self")}
                size="lg"
                variant="outline"
                className="flex-1 border-2 border-white text-white hover:bg-white hover:text-gray-900 py-3 rounded-xl font-semibold bg-transparent"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </div>

          {/* Live Status */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-3 inline-block">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Available now • All UP destinations</span>
            </div>
          </div>
        </div>
      </section>

      <MobileBookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </>
  )
}
