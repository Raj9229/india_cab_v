import { Car, Plane, MapPin, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Plane,
    title: "Airport Transfer",
    description: "Direct rides to/from airport",
    price: "From ₹900",
    features: ["Fixed rates", "Flight tracking", "24/7 available"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Car,
    title: "City Rides",
    description: "Local transportation",
    price: "From ₹300",
    features: ["8h/80km package", "Multiple stops", "AC vehicles"],
    color: "bg-green-50 text-green-600",
  },
  {
    icon: MapPin,
    title: "Outstation",
    description: "Intercity travel",
    price: "From ₹2,200",
    features: ["12h/200km", "All India permit", "Fuel included"],
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Calendar,
    title: "Tour Packages",
    description: "Multi-day spiritual tours",
    price: "From ₹2,500",
    features: ["Custom itinerary", "Guide service", "Hotel booking"],
    color: "bg-orange-50 text-orange-600",
  },
]

export default function MobileServices() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Our Services</h2>
          <p className="text-gray-600 max-w-md mx-auto">Reliable transportation solutions for all your travel needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-0 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${service.color}`}>
                    <service.icon className="h-6 w-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{service.title}</h3>
                      <span className="text-sm font-bold text-blue-600">{service.price}</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>

                    <div className="space-y-1 mb-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-500">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button size="sm" variant="outline" className="w-full rounded-lg bg-transparent">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
