import { Car, Plane, MapPin, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import OptimizedImage from "./optimized-image"
import { memo } from "react"

const services = [
  {
    icon: Plane,
    title: "Airport & Railway Transfers",
    description: "Comfortable rides to/from Varanasi Airport and Railway Station with flight tracking.",
    features: ["Flight tracking", "Meet & greet service", "Fixed rates", "24/7 availability"],
    image: "/images/airport-transfer.jpg",
    price: "From ₹900",
  },
  {
    icon: Car,
    title: "City Rides",
    description: "Local transportation within Varanasi for shopping, business, or leisure trips.",
    features: ["8 hours/80 km package", "AC vehicles", "Experienced drivers", "Multiple stops"],
    image: "/images/city-rides.jpg",
    price: "From ₹300",
  },
  {
    icon: MapPin,
    title: "Outstation Trips",
    description: "Intercity travel to nearby destinations with comfortable and reliable service.",
    features: ["12 hours/200 km package", "All India permit", "Fuel included", "Driver allowance"],
    image: "/images/outstation-trips.jpg",
    price: "From ₹2,200",
  },
  {
    icon: Calendar,
    title: "Multi-day Tour Packages",
    description: "Customized tour packages for spiritual journeys and cultural exploration.",
    features: ["Customizable itinerary", "Hotel bookings", "Guide services", "Group discounts"],
    image: "/images/tour-packages.jpg",
    price: "From ₹2,500",
  },
]

const ServiceCard = memo(({ service, index }: { service: (typeof services)[0]; index: number }) => (
  <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg rounded-3xl overflow-hidden glass hover:scale-105">
    <div className="relative overflow-hidden">
      <OptimizedImage
        src={service.image}
        alt={service.title}
        className="w-full h-48 group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-2xl">
        <service.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
        {service.price}
      </div>
    </div>

    <CardHeader className="pb-2">
      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {service.title}
      </CardTitle>
      <CardDescription className="text-gray-600 dark:text-gray-300">{service.description}</CardDescription>
    </CardHeader>

    <CardContent className="pt-0">
      <ul className="space-y-2 mb-6">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
            {feature}
          </li>
        ))}
      </ul>

      <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white rounded-2xl transform hover:scale-105 transition-all duration-300">
        View Rates
      </Button>
    </CardContent>
  </Card>
))

ServiceCard.displayName = "ServiceCard"

export default function OptimizedServices() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From airport transfers to spiritual tours, we provide comprehensive transportation solutions in and around
            Uttar Pradesh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "500+", label: "Happy Customers" },
            { number: "4.8★", label: "Average Rating" },
            { number: "50+", label: "Destinations" },
            { number: "24/7", label: "Service Available" },
          ].map((stat, index) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
