import { Phone, MapPin, Clock, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for bookings, inquiries, or any assistance you need
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-blue-600" />
                  <span>Call Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <a href="tel:+918090032475" className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                      +91 80900 32475
                    </a>
                    <p className="text-sm text-gray-600">Primary Contact</p>
                  </div>
                  <div>
                    <a href="tel:+918707850214" className="text-lg font-semibold text-blue-600 hover:text-blue-700">
                      +91 87078 50214
                    </a>
                    <p className="text-sm text-gray-600">Alternative Contact</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  <span>WhatsApp</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Get instant quotes and book your ride</p>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl">
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-red-600" />
                  <span>Office Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <address className="text-gray-600 not-italic">
                  Karimuddinpur
                  <br />
                  Ghazipur, Uttar Pradesh
                  <br />
                  India
                </address>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-orange-600" />
                  <span>Service Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Booking Office:</span>
                    <span>24/7 Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone Support:</span>
                    <span>6 AM - 11 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency:</span>
                    <span>24/7 Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and Quick Contact */}
          <div className="lg:col-span-2 space-y-8">
            {/* Embedded Map */}
            <Card className="border-0 shadow-lg rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg font-medium">Interactive Map</p>
                    <p className="text-sm">Karimuddinpur, Ghazipur, UP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Form */}
            <Card className="border-0 shadow-lg rounded-3xl">
              <CardHeader>
                <CardTitle>Quick Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Required</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                      <option>Airport Transfer</option>
                      <option>City Ride</option>
                      <option>Outstation Trip</option>
                      <option>Tour Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      placeholder="Tell us about your travel requirements..."
                    ></textarea>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white py-3 rounded-2xl text-lg font-semibold">
                    Send Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Emergency Contact</h3>
          <p className="text-lg mb-4">Need immediate assistance? We're available 24/7 for emergencies</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+918090032475"
              className="bg-white text-red-600 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Call Now: +91 80900 32475
            </a>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-6 py-3 rounded-2xl font-semibold bg-transparent"
            >
              WhatsApp Emergency
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
