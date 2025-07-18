"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Users, Clock, X, CheckCircle, ArrowLeft, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MobileBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const vehicles = [
  { name: "Swift Dzire", price: 900, seating: "4+1", image: "/images/swift-dzire.jpg", category: "Economy" },
  { name: "Honda City", price: 1100, seating: "4+1", image: "/images/honda-city.jpg", category: "Premium" },
  { name: "Innova", price: 1450, seating: "6+1", image: "/images/innova.jpg", category: "SUV" },
  { name: "Crysta", price: 1500, seating: "6+1", image: "/images/crysta.jpg", category: "Luxury" },
]

const popularRoutes = [
  { from: "Varanasi Airport", to: "City Center", price: 900, duration: "45 min", icon: "✈️" },
  { from: "Varanasi", to: "Ayodhya", price: 4200, duration: "4 hours", icon: "🏛️" },
  { from: "Varanasi", to: "Agra (Taj Mahal)", price: 8500, duration: "8 hours", icon: "🕌" },
  { from: "Varanasi", to: "Mathura", price: 7500, duration: "7 hours", icon: "🦚" },
  { from: "Varanasi", to: "Lucknow", price: 6500, duration: "6 hours", icon: "🏰" },
  { from: "Railway Station", to: "Ghats", price: 400, duration: "25 min", icon: "🚂" },
]

export default function MobileBookingModal({ isOpen, onClose }: MobileBookingModalProps) {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    vehicle: "",
    passengers: "1",
    name: "",
    phone: "",
  })
  const [estimatedFare, setEstimatedFare] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))

    if (field === "vehicle") {
      const vehicle = vehicles.find((v) => v.name === value)
      if (vehicle) {
        setEstimatedFare(vehicle.price)
      }
    }
  }

  const handleRouteSelect = (route: any) => {
    setBookingData((prev) => ({
      ...prev,
      pickup: route.from,
      destination: route.to,
    }))
    setEstimatedFare(route.price)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const message = `🚗 *Cab Booking Request*

📍 *Trip:* ${bookingData.pickup} → ${bookingData.destination}
📅 *Date:* ${bookingData.date}
⏰ *Time:* ${bookingData.time}
🚙 *Vehicle:* ${bookingData.vehicle}
👥 *Passengers:* ${bookingData.passengers}

👤 *Contact:*
• Name: ${bookingData.name}
• Phone: ${bookingData.phone}

💰 *Estimated Fare:* ₹${estimatedFare}

Please confirm availability.`

    const whatsappUrl = `https://wa.me/918090032475?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    setIsLoading(false)
    setStep(4)
  }

  const addToGoogleCalendar = () => {
    const startDate = new Date(`${bookingData.date}T${bookingData.time}`)
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000)

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }

    const eventDetails = {
      text: `India Cab - ${bookingData.pickup} to ${bookingData.destination}`,
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: `Trip Details:
- Vehicle: ${bookingData.vehicle}
- Passengers: ${bookingData.passengers}
- Contact: +91 80900 32475
- Estimated Fare: ₹${estimatedFare}

Driver will contact you 30 minutes before pickup time.`,
      location: bookingData.pickup,
      ctz: "Asia/Kolkata",
    }

    const params = new URLSearchParams(eventDetails)
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&${params.toString()}`

    window.open(calendarUrl, "_blank")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        {step > 1 && step < 4 ? (
          <Button onClick={() => setStep(step - 1)} variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        ) : (
          <div className="w-10" />
        )}

        <h1 className="text-lg font-semibold">{step === 4 ? "Booking Confirmed!" : "Book Your Ride"}</h1>

        <Button onClick={onClose} variant="ghost" size="sm" className="p-2">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Bar */}
      {step < 4 && (
        <div className="px-4 py-2">
          <div className="flex space-x-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-colors ${i <= step ? "bg-blue-600" : "bg-gray-200"}`}
              />
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">Step {step} of 3</div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Where to?</h2>

              {/* Popular Routes */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Popular UP Routes</h3>
                <div className="grid grid-cols-1 gap-3">
                  {popularRoutes.map((route, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
                      onClick={() => handleRouteSelect(route)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{route.icon}</span>
                            <div>
                              <div className="font-medium text-sm">
                                {route.from} → {route.to}
                              </div>
                              <div className="text-xs text-gray-500">{route.duration}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-blue-600">₹{route.price}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Manual Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={bookingData.pickup}
                      onChange={(e) => handleInputChange("pickup", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Enter pickup location"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={bookingData.destination}
                      onChange={(e) => handleInputChange("destination", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Enter destination"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="time"
                        value={bookingData.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <select
                      value={bookingData.passengers}
                      onChange={(e) => handleInputChange("passengers", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} passenger{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Choose Vehicle</h2>

            <div className="space-y-4">
              {vehicles.map((vehicle, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all border-2 rounded-xl ${
                    bookingData.vehicle === vehicle.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleInputChange("vehicle", vehicle.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={vehicle.image || "/placeholder.svg"}
                        alt={vehicle.name}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{vehicle.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {vehicle.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{vehicle.seating} seating</div>
                        <div className="text-lg font-bold text-blue-600">₹{vehicle.price}</div>
                      </div>
                      {bookingData.vehicle === vehicle.name && <CheckCircle className="h-6 w-6 text-blue-500" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {estimatedFare > 0 && (
              <Card className="bg-blue-50 border border-blue-200 rounded-xl">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">₹{estimatedFare}</div>
                    <div className="text-sm text-gray-600">Estimated Fare</div>
                    <div className="text-xs text-gray-500 mt-2">*Final fare may vary. Tolls & parking extra.</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            {/* Booking Summary */}
            <Card className="bg-gray-50 border border-gray-200 rounded-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">
                      {bookingData.pickup} → {bookingData.destination}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-medium">
                      {bookingData.date} at {bookingData.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-medium">{bookingData.vehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passengers:</span>
                    <span className="font-medium">{bookingData.passengers}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2 mt-3">
                    <span>Total:</span>
                    <span className="text-blue-600">₹{estimatedFare}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Sent!</h2>
              <p className="text-gray-600">
                Your booking request has been sent via WhatsApp. We'll contact you within 10 minutes.
              </p>
            </div>

            <Card className="bg-blue-50 border border-blue-200 rounded-xl text-left">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">What's Next?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Driver details will be shared</li>
                  <li>• Vehicle will arrive 5 min early</li>
                  <li>• Payment: Cash or Online</li>
                  <li>• 24/7 support available</li>
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button onClick={addToGoogleCalendar} variant="outline" className="w-full py-3 rounded-xl bg-transparent">
                📅 Add to Calendar
              </Button>

              <div className="flex space-x-3">
                <Button
                  onClick={() => window.open("tel:+918090032475", "_self")}
                  variant="outline"
                  className="flex-1 py-3 rounded-xl bg-transparent"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </Button>
                <Button onClick={onClose} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Button */}
      {step < 4 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          {step === 1 && (
            <Button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold"
              disabled={!bookingData.pickup || !bookingData.destination || !bookingData.date || !bookingData.time}
            >
              Choose Vehicle
            </Button>
          )}

          {step === 2 && (
            <Button
              onClick={() => setStep(3)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold"
              disabled={!bookingData.vehicle}
            >
              Continue
            </Button>
          )}

          {step === 3 && (
            <Button
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-semibold"
              disabled={!bookingData.name || !bookingData.phone || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                "📱 Book via WhatsApp"
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
