import Link from 'next/link'
import type { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import InventoryBadge from '@/components/InventoryBadge'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = getMetafieldValue(product.metadata?.name) || product.title
  const image = product.metadata?.featured_image
  const price = product.metadata?.price

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <div className="aspect-square bg-gray-50 overflow-hidden">
        {image ? (
          <img
            src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
            🛍️
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{name}</h3>
        </div>
        <div className="mt-2 flex items-center justify-between">
          {typeof price === 'number' && (
            <span className="text-lg font-bold text-brand-600">${price.toFixed(2)}</span>
          )}
          <InventoryBadge status={product.metadata?.inventory_status} />
        </div>
      </div>
    </Link>
  )
}