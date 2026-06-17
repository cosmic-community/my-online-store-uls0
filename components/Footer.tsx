import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-lg font-extrabold text-gray-900">
              <span className="text-xl">🛍️</span>
              <span>My Online Store</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              Quality products, curated categories, and honest customer reviews.
            </p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm font-medium text-gray-600">
            <Link href="/products" className="hover:text-brand-600 transition-colors">
              Products
            </Link>
            <Link href="/categories" className="hover:text-brand-600 transition-colors">
              Categories
            </Link>
            <Link href="/reviews" className="hover:text-brand-600 transition-colors">
              Reviews
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
          © {year} My Online Store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}