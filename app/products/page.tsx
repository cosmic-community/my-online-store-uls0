import { getProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export const metadata = {
  title: 'Products | My Online Store',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">All Products</h1>
      <p className="mt-2 text-gray-500">Explore our full collection of products.</p>

      {products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-gray-500">No products available yet.</p>
      )}
    </div>
  )
}