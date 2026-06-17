// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduct, getReviewsForProduct, getMetafieldValue } from '@/lib/cosmic'
import InventoryBadge from '@/components/InventoryBadge'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'
import type { ProductVariant } from '@/types'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsForProduct(product.id)

  const name = getMetafieldValue(product.metadata?.name) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const price = product.metadata?.price
  const sku = getMetafieldValue(product.metadata?.sku)
  const featuredImage = product.metadata?.featured_image
  const gallery = Array.isArray(product.metadata?.gallery) ? product.metadata.gallery : []
  const variants = Array.isArray(product.metadata?.variants) ? product.metadata.variants : []
  const category = product.metadata?.category

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (typeof r.metadata?.rating === 'number' ? r.metadata.rating : 0), 0) /
        reviews.length
      : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/products" className="hover:text-brand-600">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
            {featuredImage ? (
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-7xl">
                🛍️
              </div>
            )}
          </div>
          {gallery.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.slice(0, 8).map((img, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${name} gallery ${i + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {category && category.slug && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">{name}</h1>

          {reviews.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <StarRating rating={avgRating} size="sm" />
              <span className="text-sm text-gray-500">
                {avgRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          <div className="mt-4 flex items-center gap-4">
            {typeof price === 'number' && (
              <span className="text-3xl font-bold text-brand-600">${price.toFixed(2)}</span>
            )}
            <InventoryBadge status={product.metadata?.inventory_status} />
          </div>

          {sku && <p className="mt-3 text-sm text-gray-400">SKU: {sku}</p>}

          {description && (
            <div className="mt-6 text-gray-600 leading-relaxed whitespace-pre-line">{description}</div>
          )}

          {/* Variants */}
          {variants.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Variants</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {variants.map((variant: ProductVariant, i: number) => {
                  const variantName = getMetafieldValue(variant?.name) || `Variant ${i + 1}`
                  const variantPrice = typeof variant?.price === 'number' ? variant.price : null
                  return (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm"
                    >
                      <span className="font-medium text-gray-900">{variantName}</span>
                      {variantPrice !== null && (
                        <span className="ml-2 text-brand-600 font-semibold">
                          ${variantPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        {reviews.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct={false} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No reviews yet for this product.</p>
        )}
      </section>
    </div>
  )
}