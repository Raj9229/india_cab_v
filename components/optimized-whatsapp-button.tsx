"use client"

import { useState, useCallback } from "react"
import { MessageCircle, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function OptimizedWhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleWhatsAppClick = useCallback(() => {
    const phoneNumber = "918090032475"
    const message = "Hi! I would like to book a cab. Please provide me with more details."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }, [])

  const handleCallClick = useCallback(() => {
    window.open("tel:+918090032475", "_self")
  }, [])

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  return (
    <>
      {/* Mobile Floating Button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        {isExpanded && (
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl border-0 mb-4 animate-in slide-in-from-bottom-2 duration-300">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center space-x-2 justify-start"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </Button>
                <Button
                  onClick={handleCallClick}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center space-x-2 justify-start"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={toggleExpanded}
          className={`bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
            isExpanded ? "rotate-45" : "animate-pulse hover:animate-none"
          }`}
          size="lg"
          aria-label={isExpanded ? "Close contact options" : "Open contact options"}
        >
          {isExpanded ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Desktop Floating Button */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col space-y-3">
        <Button
          onClick={handleCallClick}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
          size="lg"
          aria-label="Call now"
        >
          <Phone className="h-6 w-6" />
          <span className="absolute right-full mr-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call Now
          </span>
        </Button>

        <Button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl animate-pulse hover:animate-none transition-all duration-300 hover:scale-110 group"
          size="lg"
          aria-label="Book via WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute right-full mr-3 bg-green-600 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Book via WhatsApp
          </span>
        </Button>
      </div>
    </>
  )
}
