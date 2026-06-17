import Link from 'next/link'
import type { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

interface ReviewCardProps {
  review: Review
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name) || 'Anonymous'
  const reviewText = getMetafieldValue(review.metadata?.review)
  const rating = typeof review.metadata?.rating === 'number' ? review.metadata.rating : 0
  const product = review.metadata?.product

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
            {reviewerName.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-gray-900">{reviewerName}</span>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>
      {reviewText && <p className="mt-4 text-gray-600 text-sm leading-relaxed">{reviewText}</p>}
      {showProduct && product && product.slug && (
        <Link
          href={`/products/${product.slug}`}
          className="mt-4 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          Reviewed: {getMetafieldValue(product.metadata?.name) || product.title} →
        </Link>
      )}
    </div>
  )
}