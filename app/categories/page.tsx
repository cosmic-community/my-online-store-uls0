import { getCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const metadata = {
  title: 'Categories | My Online Store',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">Categories</h1>
      <p className="mt-2 text-gray-500">Browse products by category.</p>

      {categories.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-gray-500">No categories available yet.</p>
      )}
    </div>
  )
}