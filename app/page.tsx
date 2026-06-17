import Link from 'next/link'
import { getProducts, getCategories } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])
  const featuredProducts = products.slice(0, 4)
  const featuredCategories = categories.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Discover quality products you’ll love
            </h1>
            <p className="mt-4 text-lg text-white/85">
              Browse our curated collection, explore categories, and read honest customer reviews.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-gray-100 transition-colors"
              >
                Shop Products
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      {featuredCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <Link href="/categories" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </div>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products available yet.</p>
        )}
      </section>
    </div>
  )
}