"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Clock, Users, Star, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PopularRoute {
  id: string
  from: string
  to: string
  bookings: number
  avgRating: number
  avgFare: number
  avgDuration: string
  trend: "up" | "down" | "stable"
  trendPercentage: number
  peakHours: string[]
  category: "airport" | "city" | "outstation" | "spiritual"
  image: string
}

const popularRoutes: PopularRoute[] = [
  {
    id: "1",
    from: "Varanasi Airport",
    to: "City Center",
    bookings: 1247,
    avgRating: 4.8,
    avgFare: 900,
    avgDuration: "45 min",
    trend: "up",
    trendPercentage: 15,
    peakHours: ["06:00-09:00", "18:00-21:00"],
    category: "airport",
    image: "/images/airport-transfer.jpg",
  },
  {
    id: "2",
    from: "Railway Station",
    to: "Ghats",
    bookings: 892,
    avgRating: 4.7,
    avgFare: 400,
    avgDuration: "25 min",
    trend: "up",
    trendPercentage: 8,
    peakHours: ["07:00-10:00", "17:00-20:00"],
    category: "city",
    image: "/images/varanasi-ghats.jpg",
  },
  {
    id: "3",
    from: "Varanasi",
    to: "Ayodhya",
    bookings: 634,
    avgRating: 4.9,
    avgFare: 4200,
    avgDuration: "4 hours",
    trend: "up",
    trendPercentage: 25,
    peakHours: ["05:00-08:00", "14:00-16:00"],
    category: "spiritual",
    image: "/images/outstation-trips.jpg",
  },
  {
    id: "4",
    from: "Hotel",
    to: "Sarnath",
    bookings: 567,
    avgRating: 4.6,
    avgFare: 800,
    avgDuration: "1 hour",
    trend: "stable",
    trendPercentage: 2,
    peakHours: ["09:00-11:00", "15:00-17:00"],
    category: "spiritual",
    image: "/images/sarnath-temple.jpg",
  },
  {
    id: "5",
    from: "Varanasi",
    to: "Mathura",
    bookings: 423,
    avgRating: 4.8,
    avgFare: 8500,
    avgDuration: "7 hours",
    trend: "up",
    trendPercentage: 12,
    peakHours: ["04:00-06:00", "22:00-24:00"],
    category: "outstation",
    image: "/images/tour-packages.jpg",
  },
  {
    id: "6",
    from: "City Center",
    to: "BHU",
    bookings: 389,
    avgRating: 4.5,
    avgFare: 300,
    avgDuration: "20 min",
    trend: "down",
    trendPercentage: 5,
    peakHours: ["08:00-10:00", "16:00-18:00"],
    category: "city",
    image: "/images/city-rides.jpg",
  },
]

const categories = ["all", "airport", "city", "outstation", "spiritual"]

interface PopularRidesProps {
  onRouteSelect: (route: PopularRoute) => void
}

export default function PopularRidesAnalytics({ onRouteSelect }: PopularRidesProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredRoutes, setFilteredRoutes] = useState(popularRoutes)
  const [analytics, setAnalytics] = useState({
    totalBookings: 0,
    avgRating: 0,
    topCategory: "",
    growthRate: 0,
  })

  useEffect(() => {
    const filtered =
      selectedCategory === "all" ? popularRoutes : popularRoutes.filter((route) => route.category === selectedCategory)

    setFilteredRoutes(filtered)

    // Calculate analytics
    const totalBookings = filtered.reduce((sum, route) => sum + route.bookings, 0)
    const avgRating = filtered.reduce((sum, route) => sum + route.avgRating, 0) / filtered.length
    const categoryCount = popularRoutes.reduce(
      (acc, route) => {
        acc[route.category] = (acc[route.category] || 0) + route.bookings
        return acc
      },
      {} as Record<string, number>,
    )
    const topCategory = Object.entries(categoryCount).sort(([, a], [, b]) => b - a)[0][0]
    const growthRate = filtered.reduce((sum, route) => sum + route.trendPercentage, 0) / filtered.length

    setAnalytics({ totalBookings, avgRating, topCategory, growthRate })
  }, [selectedCategory])

  const getTrendIcon = (trend: string, percentage: number) => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-green-500" />
    if (trend === "down") return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
    return <div className="h-3 w-3 rounded-full bg-gray-400" />
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      airport: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      city: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      outstation: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      spiritual: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <Card className="glass rounded-3xl border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Popular Routes Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analytics.totalBookings.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Total Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analytics.avgRating.toFixed(1)}</div>
              <div className="text-xs text-gray-600">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 capitalize">{analytics.topCategory}</div>
              <div className="text-xs text-gray-600">Top Category</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">+{analytics.growthRate.toFixed(0)}%</div>
              <div className="text-xs text-gray-600">Growth Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className={`rounded-2xl capitalize ${
              selectedCategory === category
                ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white"
                : "bg-transparent"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Popular Routes List */}
      <div className="grid gap-4">
        {filteredRoutes.map((route, index) => (
          <Card
            key={route.id}
            className="cursor-pointer transition-all duration-300 border-0 shadow-lg rounded-3xl glass hover:shadow-xl hover:scale-102 group"
            onClick={() => onRouteSelect(route)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                {/* Route Image */}
                <div className="relative">
                  <img
                    src={route.image || "/placeholder.svg"}
                    alt={`${route.from} to ${route.to}`}
                    className="w-16 h-12 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <Badge className={`absolute -top-1 -right-1 text-xs ${getCategoryColor(route.category)}`}>
                    #{index + 1}
                  </Badge>
                </div>

                {/* Route Details */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {route.from} → {route.to}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(route.trend, route.trendPercentage)}
                      <span
                        className={`text-xs font-medium ${
                          route.trend === "up"
                            ? "text-green-600"
                            : route.trend === "down"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {route.trend === "stable" ? "±" : route.trend === "up" ? "+" : "-"}
                        {route.trendPercentage}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{route.bookings} bookings</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{route.avgRating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{route.avgDuration}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={`text-xs ${getCategoryColor(route.category)}`}>
                      {route.category}
                    </Badge>
                    <span className="text-xs text-gray-500">Peak: {route.peakHours.join(", ")}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">₹{route.avgFare.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mb-2">Avg fare</div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="sr-only">Book this route</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card className="glass rounded-3xl border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="text-center">
            <h4 className="font-semibold mb-3">Quick Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <div className="font-medium text-blue-800 dark:text-blue-200">Most Popular Time</div>
                <div className="text-blue-600">7:00 AM - 9:00 AM</div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <div className="font-medium text-green-800 dark:text-green-200">Highest Rated</div>
                <div className="text-green-600">Varanasi → Ayodhya (4.9★)</div>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
                <div className="font-medium text-orange-800 dark:text-orange-200">Fastest Growing</div>
                <div className="text-orange-600">Airport Transfers (+15%)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
