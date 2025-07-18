import { Users, Fuel } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const vehicles = [
  {
    name: "Swift Dzire",
    image: "/images/swift-dzire.jpg",
    seating: "4+1",
    price: 900,
    category: "Economy",
    perKm: 12,
  },
  {
    name: "Honda City",
    image: "/images/honda-city.jpg",
    seating: "4+1",
    price: 1100,
    category: "Premium",
    perKm: 12,
  },
  {
    name: "Innova",
    image: "/images/innova.jpg",
    seating: "6+1",
    price: 1450,
    category: "SUV",
    perKm: 16,
  },
  {
    name: "Crysta",
    image: "/images/crysta.jpg",
    seating: "6+1",
    price: 1500,
    category: "Luxury",
    perKm: 17,
  },
]

export default function MobileFleet() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Fleet</h2>
          <p className="text-gray-600 max-w-md mx-auto">Choose from our well-maintained vehicles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicles.map((vehicle, index) => (
            <Card
              key={index}
              className="border-0 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="w-full h-32 object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-white/90 text-gray-900 text-xs">{vehicle.category}</Badge>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">₹{vehicle.price}</div>
                    <div className="text-xs text-gray-500">Airport pickup</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{vehicle.seating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Fuel className="h-4 w-4" />
                    <span>₹{vehicle.perKm}/km</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Book Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Pricing */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-4">
          <h3 className="font-semibold text-center mb-4">Quick Pricing</h3>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-bold text-blue-600">₹900</div>
              <div className="text-gray-600">Airport</div>
            </div>
            <div>
              <div className="font-bold text-blue-600">₹1,800</div>
              <div className="text-gray-600">City (8h)</div>
            </div>
            <div>
              <div className="font-bold text-blue-600">₹2,200</div>
              <div className="text-gray-600">Outstation</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center mt-2">
            *Prices for Swift Dzire. Fuel, driver allowance included.
          </div>
        </div>
      </div>
    </section>
  )
}
