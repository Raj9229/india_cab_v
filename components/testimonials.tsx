"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Priya & Raj Sharma",
    location: "Mumbai",
    category: "Couple Trips",
    rating: 5,
    text: "Excellent service for our Varanasi honeymoon trip. The driver was courteous and the car was spotless. Highly recommended for couples!",
    image: "/placeholder.svg?height=80&width=80&text=PS",
    tripImage: "/placeholder.svg?height=200&width=300&text=Couple+Trip",
  },
  {
    name: "Amit Kumar",
    location: "Delhi",
    category: "Solo Travelers",
    rating: 5,
    text: "As a solo traveler, I felt completely safe. The driver shared local insights and made my spiritual journey memorable.",
    image: "/placeholder.svg?height=80&width=80&text=AK",
    tripImage: "/placeholder.svg?height=200&width=300&text=Solo+Travel",
  },
  {
    name: "Gupta Family",
    location: "Kolkata",
    category: "Group Tours",
    rating: 5,
    text: "Perfect for our family of 8. The Tempo Traveller was comfortable and the tour was well-organized. Great value for money!",
    image: "/placeholder.svg?height=80&width=80&text=GF",
    tripImage: "/placeholder.svg?height=200&width=300&text=Family+Group",
  },
  {
    name: "Sarah Johnson",
    location: "USA",
    category: "Solo Travelers",
    rating: 5,
    text: "Incredible experience exploring Varanasi with India Cab. Professional service and helped me understand the local culture.",
    image: "/placeholder.svg?height=80&width=80&text=SJ",
    tripImage: "/placeholder.svg?height=200&width=300&text=International+Tourist",
  },
  {
    name: "Mehta Group",
    location: "Ahmedabad",
    category: "Group Tours",
    rating: 4,
    text: "Organized a corporate retreat to Varanasi. Excellent coordination and all vehicles were on time. Professional service.",
    image: "/placeholder.svg?height=80&width=80&text=MG",
    tripImage: "/placeholder.svg?height=200&width=300&text=Corporate+Group",
  },
  {
    name: "Ravi & Sunita",
    location: "Bangalore",
    category: "Couple Trips",
    rating: 5,
    text: "Romantic trip to Varanasi made special by India Cab. Evening Ganga Aarti tour was beautifully arranged.",
    image: "/placeholder.svg?height=80&width=80&text=RS",
    tripImage: "/placeholder.svg?height=200&width=300&text=Romantic+Trip",
  },
]

const categories = ["All", "Couple Trips", "Solo Travelers", "Group Tours"]

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredTestimonials =
    selectedCategory === "All" ? testimonials : testimonials.filter((t) => t.category === selectedCategory)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredTestimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real experiences from travelers who chose India Cab for their journeys
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentSlide(0)
                }}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-6 py-2 rounded-2xl font-medium ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white"
                    : "border-2 border-gray-300 text-gray-700 hover:border-blue-500"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {filteredTestimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="relative h-64 md:h-auto">
                          <img
                            src={testimonial.tripImage || "/placeholder.svg"}
                            alt={`${testimonial.category} experience`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center space-x-1 mb-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-sm opacity-90">{testimonial.category}</p>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 flex flex-col justify-center">
                          <Quote className="h-12 w-12 text-blue-200 mb-4" />
                          <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                            "{testimonial.text}"
                          </blockquote>

                          <div className="flex items-center space-x-4">
                            <img
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                              <p className="text-gray-600 text-sm">{testimonial.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-800 p-3 rounded-full transition-all z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl text-gray-800 p-3 rounded-full transition-all z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Destinations</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Service Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}
