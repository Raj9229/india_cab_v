import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PWAInstallPrompt from "@/components/pwa-install-prompt"
import ServiceWorkerRegistration from "@/components/service-worker-registration"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
}

export const metadata: Metadata = {
  title: "India Cab - Your 24×7 Varanasi Taxi & Tour Partner | Licensed Car Rental Service",
  description:
    "Licensed car rental & intercity taxi service in Varanasi, UP. Airport transfers, city rides, outstation trips, and tour packages. UP Labour Dept approved. Book now!",
  keywords:
    "Varanasi taxi, car rental Varanasi, airport transfer, tour packages, intercity taxi, UP approved taxi service, Varanasi cab booking, online taxi booking",
  authors: [{ name: "India Cab" }],
  creator: "India Cab",
  publisher: "India Cab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://indiacab.vercel.app"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "India Cab",
  },
  openGraph: {
    title: "India Cab - Your 24×7 Varanasi Taxi & Tour Partner",
    description:
      "Licensed car rental & intercity taxi service in Varanasi. Airport transfers, city rides, outstation trips, and tour packages.",
    url: "https://indiacab.vercel.app",
    siteName: "India Cab",
    images: [
      {
        url: "/images/varanasi-evening-aarti.jpg",
        width: 1200,
        height: 630,
        alt: "India Cab - Varanasi Taxi Service",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "India Cab - Your 24×7 Varanasi Taxi & Tour Partner",
    description: "Licensed car rental & intercity taxi service in Varanasi. Book now for reliable transportation.",
    images: ["/images/varanasi-evening-aarti.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "India Cab",
              description: "Licensed car rental & intercity taxi service in Varanasi, Uttar Pradesh",
              url: "https://indiacab.vercel.app",
              telephone: "+91-80900-32475",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Karimuddinpur",
                addressLocality: "Ghazipur",
                addressRegion: "Uttar Pradesh",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "25.3176",
                longitude: "82.9739",
              },
              openingHours: "Mo-Su 00:00-23:59",
              priceRange: "₹₹",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "500",
              },
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "25.3176",
                  longitude: "82.9739",
                },
                geoRadius: "500000",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} transition-colors duration-300`}>
        <Header />
        {children}
        <Footer />
        <PWAInstallPrompt />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
