"use client"

export default function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        {/* Car animation */}
        <div className="w-16 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg relative animate-bounce">
          <div className="absolute -bottom-2 left-2 w-3 h-3 bg-gray-800 rounded-full"></div>
          <div className="absolute -bottom-2 right-2 w-3 h-3 bg-gray-800 rounded-full"></div>
        </div>

        {/* Road lines */}
        <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gray-300 rounded">
          <div className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
