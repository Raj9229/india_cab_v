const CACHE_NAME = "india-cab-v2"
const STATIC_CACHE = "static-v2"
const DYNAMIC_CACHE = "dynamic-v2"

const staticAssets = ["/", "/manifest.json", "/icon-192x192.png", "/icon-512x512.png"]

const imageAssets = [
  "/images/varanasi-evening-aarti.jpg",
  "/images/taj-mahal-agra.jpg",
  "/images/ayodhya-ram-temple.jpg",
  "/images/mathura-krishna-temple.jpg",
  "/images/swift-dzire.jpg",
  "/images/honda-city.jpg",
  "/images/innova.jpg",
  "/images/crysta.jpg",
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(staticAssets)),
      caches.open(DYNAMIC_CACHE).then((cache) => cache.addAll(imageAssets)),
    ]),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - serve from cache with network fallback
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle navigation requests
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("/").then((response) => {
        return response || fetch(request)
      }),
    )
    return
  }

  // Handle image requests with cache-first strategy
  if (request.destination === "image") {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response
        }
        return fetch(request).then((fetchResponse) => {
          const responseClone = fetchResponse.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
          return fetchResponse
        })
      }),
    )
    return
  }

  // Handle other requests with network-first strategy
  event.respondWith(
    fetch(request)
      .then((response) => {
        const responseClone = response.clone()
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, responseClone)
        })
        return response
      })
      .catch(() => {
        return caches.match(request)
      }),
  )
})
