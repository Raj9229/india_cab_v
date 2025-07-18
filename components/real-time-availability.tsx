"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin, Users, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Vehicle {
  id: string
  name: string
  type: string
  seating: string
  image: string
  basePrice: number
  available: boolean
  nextAvailable?: string
  bookedSlots: string[]
}

interface AvailabilityProps {
  selectedDate: string
  selectedTime: string
  onVehicleSelect: (vehicle: Vehicle) => void
}

const vehicleFleet: Vehicle[] = [
  {
    id: "swift-dzire-1",
    name: "Swift Dzire",
    type: "Sedan",
    seating: "4+1",
    image: "/images/swift-dzire.jpg",
    basePrice: 900,
    available: true,
    bookedSlots: ["09:00", "14:00", "18:00"],
  },
  {
    id: "swift-dzire-2",
    name: "Swift Dzire",
    type: "Sedan",
    seating: "4+1",
    image: "/images/swift-dzire.jpg",
    basePrice: 900,
    available: true,
    bookedSlots: ["10:00", "16:00"],
  },
  {
    id: "honda-city-1",
    name: "Honda City",
    type: "Premium Sedan",
    seating: "4+1",
    image: "/images/honda-city.jpg",
    basePrice: 1100,
    available: true,
    bookedSlots: ["11:00", "15:00"],
  },
  {
    id: "innova-1",
    name: "Innova",
    type: "SUV",
    seating: "6+1",
    image: "/images/innova.jpg",
    basePrice: 1450,
    available: true,
    bookedSlots: ["08:00", "13:00", "17:00"],
  },
  {
    id: "innova-2",
    name: "Innova",
    type: "SUV",
    seating: "6+1",
    image: "/images/innova.jpg",
    basePrice: 1450,
    available: false,
    nextAvailable: "Tomorrow 06:00",
    bookedSlots: [],
  },
  {
    id: "crysta-1",
    name: "Crysta",
    type: "Luxury SUV",
    seating: "6+1",
    image: "/images/crysta.jpg",
    basePrice: 1500,
    available: true,
    bookedSlots: ["12:00", "19:00"],
  },
  {
    id: "tempo-1",
    name: "Tempo Traveller",
    type: "Group Vehicle",
    seating: "17",
    image: "/images/tempo-traveller.jpg",
    basePrice: 2500,
    available: true,
    bookedSlots: ["07:00", "20:00"],
  },
]

export default function RealTimeAvailability({ selectedDate, selectedTime, onVehicleSelect }: AvailabilityProps) {
  const [loading, setLoading] = useState(true)
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([])
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    checkAvailability()
    const interval = setInterval(checkAvailability, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [selectedDate, selectedTime])

  const checkAvailability = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const available = vehicleFleet.map((vehicle) => {
      const isTimeSlotAvailable = !vehicle.bookedSlots.includes(selectedTime)
      const isDateAvailable = vehicle.available

      return {
        ...vehicle,
        available: isDateAvailable && isTimeSlotAvailable,
        nextAvailable: !isTimeSlotAvailable
          ? "Next slot: " + getNextAvailableSlot(vehicle.bookedSlots, selectedTime)
          : vehicle.nextAvailable,
      }
    })

    setAvailableVehicles(available)
    setLastUpdated(new Date())
    setLoading(false)
  }

  const getNextAvailableSlot = (bookedSlots: string[], currentTime: string): string => {
    const timeSlots = [
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
    ]
    const currentIndex = timeSlots.indexOf(currentTime)

    for (let i = currentIndex + 1; i < timeSlots.length; i++) {
      if (!bookedSlots.includes(timeSlots[i])) {
        return timeSlots[i]
      }
    }
    return "Tomorrow 06:00"
  }

  const getAvailabilityStats = () => {
    const total = availableVehicles.length
    const available = availableVehicles.filter((v) => v.available).length
    return { total, available, percentage: Math.round((available / total) * 100) }
  }

  const stats = getAvailabilityStats()

  if (loading) {
    return (
      <Card className="glass rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <span className="text-gray-600">Checking real-time availability...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Availability Stats */}
      <Card className="glass rounded-3xl border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Real-time Availability</CardTitle>
            <Badge variant={stats.percentage > 50 ? "default" : "destructive"} className="rounded-full">
              {stats.available}/{stats.total} Available
            </Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.available}</div>
              <div className="text-xs text-gray-600">Available Now</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{stats.total - stats.available}</div>
              <div className="text-xs text-gray-600">Busy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.percentage}%</div>
              <div className="text-xs text-gray-600">Availability</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle List */}
      <div className="grid gap-4">
        {availableVehicles.map((vehicle, index) => (
          <Card
            key={vehicle.id}
            className={`cursor-pointer transition-all duration-300 border-2 rounded-2xl glass hover:shadow-lg ${
              vehicle.available
                ? "border-green-200 hover:border-green-400 hover:scale-102"
                : "border-gray-200 opacity-75"
            }`}
            onClick={() => vehicle.available && onVehicleSelect(vehicle)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                    className="w-20 h-12 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div
                    className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                      vehicle.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {vehicle.type}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{vehicle.seating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>₹{vehicle.basePrice}</span>
                    </div>
                  </div>

                  {vehicle.available ? (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Available Now</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-orange-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{vehicle.nextAvailable}</span>
                    </div>
                  )}
                </div>

                {vehicle.available && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">₹{vehicle.basePrice}</div>
                    <div className="text-xs text-gray-500">Base fare</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
