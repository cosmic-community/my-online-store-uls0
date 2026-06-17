interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}

export default function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating)))
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'

  return (
    <div className="flex items-center" aria-label={`${safeRating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`${sizeClass} ${i < safeRating ? 'text-amber-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.92-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.175 0l-3.367 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  )
}