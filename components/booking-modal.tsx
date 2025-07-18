"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Users, Clock, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RealTimeAvailability from "./real-time-availability"
import FareEstimator from "./fare-estimator"
import PopularRidesAnalytics from "./popular-rides-analytics"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  selectedVehicle?: string
  tripType?: string
}

const vehicles = [
  { name: "Swift Dzire", price: 900, seating: "4+1", image: "/placeholder.svg?height=100&width=150&text=Swift+Dzire" },
  { name: "Honda City", price: 1100, seating: "4+1", image: "/placeholder.svg?height=100&width=150&text=Honda+City" },
  { name: "Innova", price: 1450, seating: "6+1", image: "/placeholder.svg?height=100&width=150&text=Innova" },
  { name: "Crysta", price: 1500, seating: "6+1", image: "/placeholder.svg?height=100&width=150&text=Crysta" },
]

const popularRoutes = [
  { from: "Varanasi Airport", to: "City Center", price: "₹900", duration: "45 min" },
  { from: "Railway Station", to: "Ghats", price: "₹400", duration: "25 min" },
  { from: "Varanasi", to: "Ayodhya", price: "₹4,200", duration: "4 hours" },
  { from: "Varanasi", to: "Mathura", price: "₹8,500", duration: "7 hours" },
]

export default function BookingModal({ isOpen, onClose, selectedVehicle, tripType }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    tripType: tripType || "airport",
    pickup: "",
    destination: "",
    date: "",
    time: "",
    vehicle: selectedVehicle || "",
    passengers: "1",
    name: "",
    phone: "",
    email: "",
  })
  const [availableVehicles, setAvailableVehicles] = useState(vehicles)
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

    // Calculate estimated fare
    if (field === "vehicle" || field === "tripType") {
      const vehicle = vehicles.find((v) => v.name === (field === "vehicle" ? value : bookingData.vehicle))
      if (vehicle) {
        setEstimatedFare(vehicle.price)
      }
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const message = `🚗 *New Booking Request*

📍 *Trip Details:*
• Type: ${bookingData.tripType}
• From: ${bookingData.pickup}
• To: ${bookingData.destination}
• Date: ${bookingData.date}
• Time: ${bookingData.time}

🚙 *Vehicle:* ${bookingData.vehicle}
👥 *Passengers:* ${bookingData.passengers}

👤 *Customer Details:*
• Name: ${bookingData.name}
• Phone: ${bookingData.phone}
• Email: ${bookingData.email}

💰 *Estimated Fare:* ₹${estimatedFare}

Please confirm availability and send final quote.`

    const whatsappUrl = `https://wa.me/918090032475?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    setIsLoading(false)
    setStep(4) // Success step
  }

  const addToGoogleCalendar = () => {
    const startDate = new Date(`${bookingData.date}T${bookingData.time}`)
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // 2 hours later

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl animate-in zoom-in-95 duration-300">
        <CardHeader className="relative">
          <Button onClick={onClose} variant="ghost" size="sm" className="absolute right-4 top-4 rounded-full">
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-bold text-center">
            {step === 4 ? "Booking Confirmed!" : "Book Your Ride"}
          </CardTitle>

          {/* Progress Bar */}
          {step < 4 && (
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-2 rounded-full transition-colors ${i <= step ? "bg-blue-600" : "bg-gray-200"}`}
                  />
                ))}
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <h3 className="text-xl font-semibold mb-4">Trip Details</h3>

              {/* Popular Routes Analytics */}
              <PopularRidesAnalytics
                onRouteSelect={(route) => {
                  setBookingData((prev) => ({
                    ...prev,
                    pickup: route.from,
                    destination: route.to,
                  }))
                }}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={bookingData.pickup}
                      onChange={(e) => handleInputChange("pickup", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Enter destination"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <select
                      value={bookingData.passengers}
                      onChange={(e) => handleInputChange("passengers", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white py-3 rounded-2xl text-lg font-semibold"
                disabled={!bookingData.pickup || !bookingData.destination || !bookingData.date || !bookingData.time}
              >
                Check Availability
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="grid lg:grid-cols-2 gap-6 animate-in slide-in-from-right duration-300">
              <div>
                <h3 className="text-xl font-semibold mb-4">Available Vehicles</h3>
                <RealTimeAvailability
                  selectedDate={bookingData.date}
                  selectedTime={bookingData.time}
                  onVehicleSelect={(vehicle) => {
                    setBookingData((prev) => ({ ...prev, vehicle: vehicle.name }))
                    setEstimatedFare(vehicle.basePrice)
                  }}
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Fare Details</h3>
                {bookingData.vehicle && (
                  <FareEstimator
                    pickup={bookingData.pickup}
                    destination={bookingData.destination}
                    selectedTime={bookingData.time}
                    selectedVehicle={{ name: bookingData.vehicle, basePrice: estimatedFare }}
                    tripType={bookingData.tripType}
                  />
                )}
              </div>

              <div className="lg:col-span-2 flex space-x-4">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1 py-3 rounded-2xl">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white py-3 rounded-2xl"
                  disabled={!bookingData.vehicle}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <h3 className="text-xl font-semibold mb-4">Contact Details</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Booking Summary */}
              <Card className="bg-gray-50 border border-gray-200 rounded-2xl">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Route:</span>
                      <span>
                        {bookingData.pickup} → {bookingData.destination}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span>
                        {bookingData.date} at {bookingData.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vehicle:</span>
                      <span>{bookingData.vehicle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Passengers:</span>
                      <span>{bookingData.passengers}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Estimated Fare:</span>
                      <span>₹{estimatedFare}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1 py-3 rounded-2xl">
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold"
                  disabled={!bookingData.name || !bookingData.phone || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Booking...</span>
                    </div>
                  ) : (
                    "Book via WhatsApp"
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Booking Request Sent!</h3>
                <p className="text-gray-600">
                  Your booking request has been sent via WhatsApp. Our team will confirm availability and send you the
                  final quote shortly.
                </p>
              </div>

              <Card className="bg-blue-50 border border-blue-200 rounded-2xl">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">What's Next?</h4>
                  <ul className="text-sm text-gray-600 space-y-1 text-left">
                    <li>• Our team will contact you within 10 minutes</li>
                    <li>• We'll confirm vehicle availability for your date</li>
                    <li>• Final fare will be shared based on exact route</li>
                    <li>• Payment can be made cash or online</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={addToGoogleCalendar}
                  variant="outline"
                  className="flex-1 py-3 rounded-2xl bg-transparent"
                >
                  Add to Calendar
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white py-3 rounded-2xl"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
