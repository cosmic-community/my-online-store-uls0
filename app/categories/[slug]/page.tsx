// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategory, getProductsByCategory, getMetafieldValue } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)

  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const image = category.metadata?.category_image

  return (
    <div>
      {/* Category header */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        {image && (
          <img
            src={`${image.imgix_url}?w=2000&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={1000}
            height={300}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="text-sm text-white/70 mb-4">
            <Link href="/categories" className="hover:text-white">
              Categories
            </Link>
            <span className="mx-2">/</span>
            <span>{name}</span>
          </nav>
          <h1 className="text-4xl font-extrabold">{name}</h1>
          {description && <p className="mt-3 max-w-2xl text-white/85">{description}</p>}
        </div>
      </section>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products in this category yet.</p>
        )}
      </div>
    </div>
  )
}