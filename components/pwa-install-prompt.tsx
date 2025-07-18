"use client"

import { useState, useEffect } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)

      // Show prompt after 30 seconds if not dismissed
      setTimeout(() => {
        const dismissed = localStorage.getItem("pwa-prompt-dismissed")
        if (!dismissed) {
          setShowPrompt(true)
        }
      }, 30000)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("pwa-prompt-dismissed", "true")
  }

  if (!showPrompt || !deferredPrompt) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 md:left-auto md:right-6 md:w-80">
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl animate-in slide-in-from-bottom duration-300">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-2 rounded-lg">
                <span className="font-bold text-sm">IC</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Install India Cab</h4>
                <p className="text-xs text-gray-600">Quick access on your phone</p>
              </div>
            </div>
            <Button onClick={handleDismiss} variant="ghost" size="sm" className="p-1 h-auto">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Install our app for faster booking and offline access to your trips.
          </p>

          <div className="flex space-x-2">
            <Button
              onClick={handleInstall}
              className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white text-sm rounded-xl"
            >
              <Download className="h-4 w-4 mr-2" />
              Install
            </Button>
            <Button onClick={handleDismiss} variant="outline" className="px-4 text-sm rounded-xl bg-transparent">
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
