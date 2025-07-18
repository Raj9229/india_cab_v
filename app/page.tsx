import { Suspense } from "react"
import dynamic from "next/dynamic"
import OptimizedWhatsAppButton from "@/components/optimized-whatsapp-button"
import LoadingSpinner from "@/components/loading-spinner"

// Immediate load for above-the-fold content
import OptimizedMobileHero from "@/components/optimized-mobile-hero"
import OptimizedHero from "@/components/optimized-hero"

// Lazy load components that are not immediately visible
const OptimizedServices = dynamic(() => import("@/components/optimized-services"), {
  loading: () => <LoadingSpinner />,
})

const OptimizedFleet = dynamic(() => import("@/components/optimized-fleet"), {
  loading: () => <LoadingSpinner />,
})

const TourPackages = dynamic(() => import("@/components/tour-packages"), {
  loading: () => <LoadingSpinner />,
})

const Testimonials = dynamic(() => import("@/components/testimonials"), {
  loading: () => <LoadingSpinner />,
})

const About = dynamic(() => import("@/components/about"), {
  loading: () => <LoadingSpinner />,
})

const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <LoadingSpinner />,
})

const Blog = dynamic(() => import("@/components/blog"), {
  loading: () => <LoadingSpinner />,
})

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Mobile Hero - shown on mobile */}
      <div className="block md:hidden">
        <OptimizedMobileHero />
      </div>

      {/* Desktop Hero - shown on desktop */}
      <div className="hidden md:block">
        <OptimizedHero />
      </div>

      {/* Services section */}
      <Suspense fallback={<LoadingSpinner />}>
        <OptimizedServices />
      </Suspense>

      {/* Fleet section */}
      <Suspense fallback={<LoadingSpinner />}>
        <OptimizedFleet />
      </Suspense>

      {/* Other sections loaded lazily */}
      <Suspense fallback={<LoadingSpinner />}>
        <TourPackages />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Contact />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Blog />
      </Suspense>

      {/* WhatsApp button */}
      <OptimizedWhatsAppButton />
    </main>
  )
}
