import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-2 rounded-2xl">
                <span className="font-bold text-xl">IC</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">India Cab</h3>
                <p className="text-sm text-gray-400">Your Travel Partner</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Licensed car rental & intercity taxi service in Varanasi. Your trusted partner for safe and comfortable
              travel experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#fleet" className="text-gray-300 hover:text-white transition-colors">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="#tours" className="text-gray-300 hover:text-white transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300">Airport Transfers</span>
              </li>
              <li>
                <span className="text-gray-300">City Rides</span>
              </li>
              <li>
                <span className="text-gray-300">Outstation Trips</span>
              </li>
              <li>
                <span className="text-gray-300">Tour Packages</span>
              </li>
              <li>
                <span className="text-gray-300">Corporate Travel</span>
              </li>
              <li>
                <span className="text-gray-300">Wedding Transportation</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+918090032475" className="text-gray-300 hover:text-white transition-colors">
                    +91 80900 32475
                  </a>
                  <br />
                  <a href="tel:+918707850214" className="text-gray-300 hover:text-white transition-colors">
                    +91 87078 50214
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <a href="mailto:info@indiacab.com" className="text-gray-300 hover:text-white transition-colors">
                  info@indiacab.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <address className="text-gray-300 not-italic">
                  Karimuddinpur
                  <br />
                  Ghazipur, Uttar Pradesh
                  <br />
                  India
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 India Cab. All rights reserved. | UP Labour Dept Approved
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
