import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">🛍️</div>
      <h1 className="text-3xl font-extrabold text-gray-900">Page not found</h1>
      <p className="mt-2 text-gray-500">The page you’re looking for doesn’t exist.</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
      >
        Back to home
      </Link>
    </div>
  )
}