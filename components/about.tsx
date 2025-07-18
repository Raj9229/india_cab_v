import { Shield, Award, Users, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "UP Labour Dept Approved",
    description:
      "Fully licensed and registered taxi service with government approval for your safety and peace of mind.",
  },
  {
    icon: Award,
    title: "Experienced Drivers",
    description: "Professional drivers with extensive knowledge of local routes and tourist destinations.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Dedicated to providing exceptional service with transparent pricing and no hidden charges.",
  },
  {
    icon: Clock,
    title: "24×7 Availability",
    description: "Round-the-clock service for all your transportation needs, including emergency situations.",
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About India Cab</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Established as Varanasi's premier taxi and car rental service, India Cab has been serving pilgrims,
              tourists, and locals with reliable transportation solutions since our inception.
            </p>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide safe, comfortable, and affordable transportation services that enhance your travel
                  experience in the spiritual city of Varanasi and beyond.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Why Choose Us?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    Government approved and fully licensed service
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    Transparent pricing with no hidden charges
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    Well-maintained fleet of vehicles
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    Professional and courteous drivers
                  </li>
                </ul>
              </div>
            </div>

            {/* Registration Details */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-3">Registration Details</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <strong>License:</strong> UP Labour Department Approved
                </div>
                <div>
                  <strong>Registration:</strong> All India Tourist Permit
                </div>
                <div>
                  <strong>Insurance:</strong> Comprehensive Coverage
                </div>
                <div>
                  <strong>Established:</strong> Serving since 2015
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/placeholder.svg?height=300&width=250&text=India+Cab+Office"
                alt="India Cab Office"
                className="rounded-2xl shadow-lg"
              />
              <img
                src="/placeholder.svg?height=300&width=250&text=Professional+Driver"
                alt="Professional Driver"
                className="rounded-2xl shadow-lg mt-8"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-6">
              <div className="text-3xl font-bold text-blue-600">8+</div>
              <div className="text-gray-600 text-sm">Years of Service</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg rounded-3xl hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="bg-gradient-to-r from-blue-100 to-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
