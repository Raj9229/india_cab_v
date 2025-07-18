import { MapPin, Clock, Users, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const tourPackages = [
  {
    title: "Varanasi Spiritual Tour",
    duration: "1 Day",
    price: "From ₹2,500",
    image: "/images/varanasi-evening-aarti.jpg",
    highlights: ["Kashi Vishwanath Temple", "Ganga Aarti", "BHU Campus", "Sankat Mochan"],
    rating: 4.9,
    reviews: 156,
    category: "Spiritual",
  },
  {
    title: "Agra Taj Mahal Tour",
    duration: "1 Day",
    price: "From ₹3,500",
    image: "/images/taj-mahal-agra.jpg",
    highlights: ["Taj Mahal", "Agra Fort", "Mehtab Bagh", "Local Markets"],
    rating: 4.8,
    reviews: 203,
    category: "Heritage",
  },
  {
    title: "Ayodhya Pilgrimage",
    duration: "1 Day",
    price: "From ₹4,200",
    image: "/images/ayodhya-ram-temple.jpg",
    highlights: ["Ram Janmabhoomi", "Hanuman Garhi", "Kanak Bhawan", "Saryu River"],
    rating: 4.7,
    reviews: 124,
    category: "Pilgrimage",
  },
  {
    title: "Mathura-Vrindavan Circuit",
    duration: "2 Days",
    price: "From ₹8,500",
    image: "/images/mathura-krishna-temple.jpg",
    highlights: ["Krishna Janmabhoomi", "Banke Bihari Temple", "ISKCON Temple", "Govardhan Hill"],
    rating: 4.8,
    reviews: 89,
    category: "Spiritual",
  },
  {
    title: "Lucknow Heritage Tour",
    duration: "1 Day",
    price: "From ₹3,800",
    image: "/images/lucknow-imambara.jpg",
    highlights: ["Bara Imambara", "Chota Imambara", "Rumi Darwaza", "Hazratganj"],
    rating: 4.6,
    reviews: 67,
    category: "Heritage",
  },
  {
    title: "Allahabad Sangam Darshan",
    duration: "1 Day",
    price: "From ₹3,200",
    image: "/images/allahabad-sangam.jpg",
    highlights: ["Triveni Sangam", "Allahabad Fort", "Anand Bhawan", "Khusro Bagh"],
    rating: 4.7,
    reviews: 91,
    category: "Spiritual",
  },
]

const categories = ["All", "Spiritual", "Pilgrimage", "Heritage"]

export default function TourPackages() {
  return (
    <section id="tours" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Uttar Pradesh Tour Packages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the spiritual and cultural heritage of Uttar Pradesh with our carefully curated tour packages
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="px-6 py-2 rounded-2xl border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 bg-transparent"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourPackages.map((tour, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg rounded-3xl overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900">{tour.category}</Badge>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{tour.rating}</span>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tour.title}
                  </CardTitle>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{tour.reviews} reviews</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">{tour.price}</div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Tour Highlights:</h4>
                  <ul className="space-y-1">
                    {tour.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 text-orange-400 mr-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white rounded-2xl">
                    Book Package
                  </Button>
                  <Button variant="outline" className="px-4 rounded-2xl bg-transparent">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular UP Destinations Timeline */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Popular UP Destinations</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-orange-500 rounded-full"></div>
            <div className="space-y-12">
              {[
                { city: "Varanasi", distance: "0 km", time: "Starting Point", icon: "🕉️" },
                { city: "Ayodhya", distance: "200 km", time: "4 hours", icon: "🏛️" },
                { city: "Lucknow", distance: "320 km", time: "6 hours", icon: "🏰" },
                { city: "Agra", distance: "450 km", time: "8 hours", icon: "🕌" },
                { city: "Mathura", distance: "350 km", time: "7 hours", icon: "🦚" },
              ].map((route, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <div className={`bg-white rounded-2xl shadow-lg p-6 max-w-sm ${index % 2 === 0 ? "mr-8" : "ml-8"}`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{route.icon}</span>
                      <h4 className="text-xl font-bold text-gray-900">{route.city}</h4>
                    </div>
                    <p className="text-gray-600">
                      {route.distance} • {route.time}
                    </p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
