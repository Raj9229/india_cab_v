"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, Calculator, Info, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FareEstimatorProps {
  pickup: string
  destination: string
  selectedTime: string
  selectedVehicle: any
  tripType: string
}

interface FareBreakdown {
  baseFare: number
  distanceFare: number
  timeFare: number
  surcharge: number
  toll: number
  parking: number
  total: number
  distance: number
  duration: number
}

const routeDatabase = {
  "Varanasi Airport": { lat: 25.4522, lng: 82.8597 },
  "Railway Station": { lat: 25.3176, lng: 82.9739 },
  "City Center": { lat: 25.3176, lng: 82.9739 },
  Ghats: { lat: 25.3095, lng: 82.9765 },
  Sarnath: { lat: 25.3811, lng: 83.0219 },
  BHU: { lat: 25.2677, lng: 82.9913 },
  Ayodhya: { lat: 26.7922, lng: 82.1998 },
  Mathura: { lat: 27.4924, lng: 77.6737 },
  Haridwar: { lat: 29.9457, lng: 78.1642 },
}

const peakHours = ["08:00", "09:00", "17:00", "18:00", "19:00"]
const nightHours = ["22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00"]

export default function FareEstimator({
  pickup,
  destination,
  selectedTime,
  selectedVehicle,
  tripType,
}: FareEstimatorProps) {
  const [fareBreakdown, setFareBreakdown] = useState<FareBreakdown | null>(null)
  const [loading, setLoading] = useState(false)
  const [priceComparison, setPriceComparison] = useState<any[]>([])

  useEffect(() => {
    if (pickup && destination && selectedVehicle) {
      calculateFare()
    }
  }, [pickup, destination, selectedTime, selectedVehicle, tripType])

  const calculateDistance = (pickup: string, destination: string): number => {
    const pickupCoords = routeDatabase[pickup as keyof typeof routeDatabase]
    const destCoords = routeDatabase[destination as keyof typeof routeDatabase]

    if (!pickupCoords || !destCoords) return 15 // Default distance

    const R = 6371 // Earth's radius in km
    const dLat = ((destCoords.lat - pickupCoords.lat) * Math.PI) / 180
    const dLng = ((destCoords.lng - pickupCoords.lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((pickupCoords.lat * Math.PI) / 180) *
        Math.cos((destCoords.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return Math.round(R * c)
  }

  const calculateFare = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    const distance = calculateDistance(pickup, destination)
    const duration = Math.round((distance / 40) * 60) // Assuming 40 km/h average speed

    const baseFare = selectedVehicle.basePrice || 900
    const perKmRate = getPerKmRate(selectedVehicle.name)
    const distanceFare = distance * perKmRate

    let timeFare = 0
    if (tripType === "hourly") {
      timeFare = Math.ceil(duration / 60) * 50 // ₹50 per hour
    }

    let surcharge = 0
    if (peakHours.includes(selectedTime)) {
      surcharge = baseFare * 0.2 // 20% peak hour surcharge
    } else if (nightHours.includes(selectedTime)) {
      surcharge = baseFare * 0.3 // 30% night surcharge
    }

    const toll = distance > 50 ? Math.round(distance / 50) * 100 : 0
    const parking = 50 // Standard parking fee

    const total = baseFare + distanceFare + timeFare + surcharge + toll + parking

    const breakdown: FareBreakdown = {
      baseFare,
      distanceFare,
      timeFare,
      surcharge,
      toll,
      parking,
      total,
      distance,
      duration,
    }

    setFareBreakdown(breakdown)
    generatePriceComparison(breakdown)
    setLoading(false)
  }

  const getPerKmRate = (vehicleName: string): number => {
    const rates: { [key: string]: number } = {
      "Swift Dzire": 12,
      "Honda City": 12,
      Innova: 16,
      Crysta: 17,
      "Tempo Traveller": 26,
    }
    return rates[vehicleName] || 12
  }

  const generatePriceComparison = (breakdown: FareBreakdown) => {
    const vehicles = ["Swift Dzire", "Honda City", "Innova", "Crysta"]
    const comparison = vehicles.map((vehicle) => {
      const basePrice =
        vehicle === "Swift Dzire" ? 900 : vehicle === "Honda City" ? 1100 : vehicle === "Innova" ? 1450 : 1500
      const perKm = getPerKmRate(vehicle)
      const total = basePrice + breakdown.distance * perKm + breakdown.surcharge + breakdown.toll + breakdown.parking

      return {
        vehicle,
        price: total,
        savings: total < breakdown.total ? breakdown.total - total : 0,
      }
    })

    setPriceComparison(comparison.sort((a, b) => a.price - b.price))
  }

  if (loading) {
    return (
      <Card className="glass rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Calculator className="h-5 w-5 animate-spin text-blue-600" />
            <span className="text-gray-600">Calculating fare...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!fareBreakdown) return null

  return (
    <div className="space-y-6">
      {/* Main Fare Display */}
      <Card className="glass rounded-3xl border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            <span>Fare Estimate</span>
          </CardTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{fareBreakdown.distance} km</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{fareBreakdown.duration} min</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">₹{fareBreakdown.total}</div>
            <div className="text-sm text-gray-600">Estimated Total Fare</div>
          </div>

          {/* Fare Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Base Fare</span>
              <span className="font-medium">₹{fareBreakdown.baseFare}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Distance ({fareBreakdown.distance} km)</span>
              <span className="font-medium">₹{fareBreakdown.distanceFare}</span>
            </div>
            {fareBreakdown.timeFare > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Time Charges</span>
                <span className="font-medium">₹{fareBreakdown.timeFare}</span>
              </div>
            )}
            {fareBreakdown.surcharge > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-orange-600">
                  {peakHours.includes(selectedTime) ? "Peak Hour" : "Night"} Surcharge
                </span>
                <span className="font-medium text-orange-600">+₹{fareBreakdown.surcharge}</span>
              </div>
            )}
            {fareBreakdown.toll > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Toll (estimated)</span>
                <span className="font-medium">₹{fareBreakdown.toll}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Parking</span>
              <span className="font-medium">₹{fareBreakdown.parking}</span>
            </div>
            <div className="border-t pt-3 flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span className="text-blue-600">₹{fareBreakdown.total}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">Fare includes:</p>
                <ul className="space-y-0.5">
                  <li>• Driver allowance & fuel</li>
                  <li>• GST as applicable</li>
                  <li>• Toll & parking extra</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Comparison */}
      <Card className="glass rounded-3xl border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Compare Prices</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {priceComparison.map((item, index) => (
              <div
                key={item.vehicle}
                className={`flex items-center justify-between p-3 rounded-2xl transition-colors ${
                  item.vehicle === selectedVehicle.name
                    ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200"
                    : "bg-gray-50 dark:bg-gray-800/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      index === 0 ? "bg-green-500" : index === 1 ? "bg-yellow-500" : "bg-orange-500"
                    }`}
                  />
                  <span className="font-medium">{item.vehicle}</span>
                  {item.vehicle === selectedVehicle.name && (
                    <Badge variant="secondary" className="text-xs">
                      Selected
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold">₹{item.price}</div>
                  {item.savings > 0 && <div className="text-xs text-green-600">Save ₹{item.savings}</div>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
