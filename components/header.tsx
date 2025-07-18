"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import DarkModeToggle from "./dark-mode-toggle"
import MobileBookingModal from "./mobile-booking-modal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Fleet", href: "#fleet" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg transition-colors">
        <div className="container mx-auto px-4">
          {/* Top bar - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-orange-100 dark:border-gray-700">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Phone className="h-4 w-4" />
                <span>+91 80900 32475</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs font-medium">
                UP Labour Dept Approved
              </span>
              <DarkModeToggle />
            </div>
          </div>

          {/* Main navigation */}
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-2 rounded-xl">
                <span className="font-bold text-lg">IC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100">India Cab</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Your Travel Partner</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-4 py-2 rounded-xl transition-all hover:scale-105"
              >
                Book Now
              </Button>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-2 md:hidden">
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
              >
                Book
              </Button>
              <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top duration-300">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Call us:</span>
                    <a href="tel:+918090032475" className="text-blue-600 font-medium">
                      +91 80900 32475
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <MobileBookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </>
  )
}
