import { Calendar, User, ArrowRight, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    title: "Best Ghats to Visit at Sunrise in Varanasi",
    excerpt: "Discover the most spiritual and photogenic ghats to experience the magical sunrise over the Ganges.",
    image: "/placeholder.svg?height=250&width=400&text=Varanasi+Sunrise+Ghats",
    author: "Rajesh Kumar",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Travel Guide",
    tags: ["Varanasi", "Ghats", "Sunrise", "Photography"],
  },
  {
    title: "How to Plan a Perfect Varanasi-Delhi Road Trip",
    excerpt: "Complete guide with route planning, must-visit stops, and travel tips for your road journey.",
    image: "/placeholder.svg?height=250&width=400&text=Varanasi+Delhi+Road+Trip",
    author: "Priya Sharma",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Road Trip",
    tags: ["Road Trip", "Delhi", "Planning", "Route"],
  },
  {
    title: "Safety Tips for Solo Travelers in Varanasi",
    excerpt: "Essential safety guidelines and local insights for solo travelers exploring the spiritual city.",
    image: "/placeholder.svg?height=250&width=400&text=Solo+Travel+Safety",
    author: "Amit Singh",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Safety",
    tags: ["Solo Travel", "Safety", "Tips", "Local Insights"],
  },
  {
    title: "Exploring Sarnath: Buddha's First Sermon Site",
    excerpt: "A comprehensive guide to Sarnath, the birthplace of Buddhism and its historical significance.",
    image: "/placeholder.svg?height=250&width=400&text=Sarnath+Buddhist+Site",
    author: "Dr. Meera Gupta",
    date: "2024-01-01",
    readTime: "7 min read",
    category: "Culture",
    tags: ["Sarnath", "Buddhism", "History", "Culture"],
  },
  {
    title: "Best Time to Visit Varanasi: Season Guide",
    excerpt: "Weather patterns, festivals, and seasonal highlights to help you plan your perfect visit.",
    image: "/placeholder.svg?height=250&width=400&text=Varanasi+Seasons",
    author: "Vikash Pandey",
    date: "2023-12-28",
    readTime: "4 min read",
    category: "Planning",
    tags: ["Weather", "Seasons", "Planning", "Festivals"],
  },
  {
    title: "Local Food Guide: Must-Try Varanasi Delicacies",
    excerpt: "From street food to traditional sweets, explore the culinary treasures of Varanasi.",
    image: "/placeholder.svg?height=250&width=400&text=Varanasi+Food+Guide",
    author: "Sunita Devi",
    date: "2023-12-25",
    readTime: "6 min read",
    category: "Food",
    tags: ["Food", "Local Cuisine", "Street Food", "Restaurants"],
  },
]

const categories = ["All", "Travel Guide", "Road Trip", "Safety", "Culture", "Planning", "Food"]

export default function Blog() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Travel Guides & Tips</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expert insights, travel guides, and local tips to make your Varanasi experience unforgettable
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="px-4 py-2 rounded-2xl border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 bg-transparent"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-blue-600 text-white">Featured</Badge>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4">
                  {blogPosts[0].category}
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{blogPosts[0].title}</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white rounded-2xl w-fit">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg rounded-3xl overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900">{post.category}</Badge>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-gray-600 line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full rounded-2xl group-hover:bg-blue-50 group-hover:border-blue-200 bg-transparent"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated with Travel Tips</h3>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest travel guides, tips, and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-2xl font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
