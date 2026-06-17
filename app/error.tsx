'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
      <p className="mt-2 text-gray-500">We couldn’t load this content right now.</p>
      <button
        onClick={() => reset()}
        className="mt-6 inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}