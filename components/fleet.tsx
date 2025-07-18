"use client"

import { useState } from "react"
import { Users, Luggage, Fuel, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const vehicles = [
  {
    name: "Swift Dzire",
    image: "/images/swift-dzire.jpg",
    seating: "4+1",
    luggage: "2 bags",
    airportPickup: 900,
    cityRate: 1800,
    outstationRate: 2200,
    perKmRate: 12,
    features: ["AC", "Music System", "GPS"],
    category: "economy",
  },
  {
    name: "Honda City",
    image: "/images/honda-city.jpg",
    seating: "4+1",
    luggage: "3 bags",
    airportPickup: 1100,
    cityRate: 1800,
    outstationRate: 2200,
    perKmRate: 12,
    features: ["AC", "Premium Interior", "GPS"],
    category: "premium",
  },
  {
    name: "Tavera/Ertiga",
    image: "/images/innova.jpg",
    seating: "6+1",
    luggage: "4 bags",
    airportPickup: 1200,
    cityRate: 2400,
    outstationRate: 2600,
    perKmRate: 14,
    features: ["AC", "7 Seater", "GPS"],
    category: "suv",
  },
  {
    name: "Innova",
    image: "/images/innova.jpg",
    seating: "6+1",
    luggage: "5 bags",
    airportPickup: 1450,
    cityRate: 2400,
    outstationRate: 3000,
    perKmRate: 16,
    features: ["AC", "Premium SUV", "GPS"],
    category: "premium",
  },
  {
    name: "Crysta",
    image: "/images/crysta.jpg",
    seating: "6+1",
    luggage: "5 bags",
    airportPickup: 1500,
    cityRate: 2600,
    outstationRate: 3200,
    perKmRate: 17,
    features: ["AC", "Luxury SUV", "GPS"],
    category: "luxury",
  },
  {
    name: "Tempo Traveller 17s",
    image: "/images/tempo-traveller.jpg",
    seating: "17",
    luggage: "10 bags",
    airportPickup: 2500,
    cityRate: 5000,
    outstationRate: 5000,
    perKmRate: 26,
    features: ["AC", "Group Travel", "GPS"],
    category: "group",
  },
]

const tripTypes = [
  { id: "airport", name: "Airport Pickup", key: "airportPickup" },
  { id: "city", name: "City (8h/80km)", key: "cityRate" },
  { id: "outstation", name: "Outstation (12h/200km)", key: "outstationRate" },
]

export default function Fleet() {
  const [selectedTripType, setSelectedTripType] = useState("airport")
  const [compareMode, setCompareMode] = useState(false)
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([])

  const selectedTrip = tripTypes.find((trip) => trip.id === selectedTripType)

  const toggleCompare = (vehicleName: string) => {
    if (selectedVehicles.includes(vehicleName)) {
      setSelectedVehicles(selectedVehicles.filter((v) => v !== vehicleName))
    } else if (selectedVehicles.length < 3) {
      setSelectedVehicles([...selectedVehicles, vehicleName])
    }
  }

  return (
    <section id="fleet" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Choose Your Cab</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Select your trip type to see the best vehicle options and transparent pricing
          </p>

          {/* Trip Type Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tripTypes.map((trip) => (
              <Button
                key={trip.id}
                onClick={() => setSelectedTripType(trip.id)}
                variant={selectedTripType === trip.id ? "default" : "outline"}
                className={`px-6 py-3 rounded-2xl font-medium ${
                  selectedTripType === trip.id
                    ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white"
                    : "border-2 border-gray-300 text-gray-700 hover:border-blue-500"
                }`}
              >
                {trip.name}
              </Button>
            ))}
          </div>

          {/* Compare Toggle */}
          <Button onClick={() => setCompareMode(!compareMode)} variant="outline" className="mb-8 rounded-2xl">
            {compareMode ? "Exit Compare Mode" : "Compare Vehicles"}
          </Button>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {vehicles.map((vehicle, index) => (
            <Card
              key={index}
              className={`group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg rounded-3xl overflow-hidden ${
                compareMode && selectedVehicles.includes(vehicle.name) ? "ring-4 ring-blue-500" : ""
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900">{vehicle.category}</Badge>
                {compareMode && (
                  <Button
                    onClick={() => toggleCompare(vehicle.name)}
                    className={`absolute top-4 right-4 ${
                      selectedVehicles.includes(vehicle.name) ? "bg-blue-500 text-white" : "bg-white/90 text-gray-900"
                    }`}
                    size="sm"
                  >
                    {selectedVehicles.includes(vehicle.name) ? "Selected" : "Compare"}
                  </Button>
                )}
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {vehicle.name}
                </CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{vehicle.seating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Luggage className="h-4 w-4" />
                    <span>{vehicle.luggage}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Fuel className="h-4 w-4" />
                    <span>₹{vehicle.perKmRate}/km</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ₹{vehicle[selectedTrip?.key as keyof typeof vehicle] as number}
                  </div>
                  <p className="text-sm text-gray-600">{selectedTrip?.name}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {vehicle.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white rounded-2xl">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Table */}
        <div className="bg-gray-50 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Complete Pricing Table</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Info className="h-4 w-4" />
              <span>Includes fuel, driver allowance, parking & tolls extra</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 font-semibold">Vehicle</th>
                  <th className="text-center py-3 font-semibold">Airport Pickup ₹</th>
                  <th className="text-center py-3 font-semibold">City (8h/80km) ₹</th>
                  <th className="text-center py-3 font-semibold">Outstation (12h/200km) ₹</th>
                  <th className="text-center py-3 font-semibold">₹/km Rate</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-white transition-colors">
                    <td className="py-3 font-medium">{vehicle.name}</td>
                    <td className="text-center py-3">₹{vehicle.airportPickup}</td>
                    <td className="text-center py-3">₹{vehicle.cityRate}</td>
                    <td className="text-center py-3">₹{vehicle.outstationRate}</td>
                    <td className="text-center py-3">₹{vehicle.perKmRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
