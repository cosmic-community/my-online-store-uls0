import { getReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export const metadata = {
  title: 'Reviews | My Online Store',
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">Customer Reviews</h1>
      <p className="mt-2 text-gray-500">See what our customers are saying.</p>

      {reviews.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-gray-500">No reviews available yet.</p>
      )}
    </div>
  )
}