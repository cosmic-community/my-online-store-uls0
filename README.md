# My Online Store

![App Preview](https://imgix.cosmicjs.com/82dca9f0-6a30-11f1-8dfe-457508ece1b8-autopilot-photo-1597484661643-2f5fef640dd1-1781689201158.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern e-commerce storefront built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse products, explore categories, view product variants, and read customer reviews — all from your existing Cosmic content model.

## Features

- 🛍️ **Product Catalog** — Browse all products with images, pricing, SKU, and inventory status
- 🏷️ **Category Browsing** — Explore products organized by category
- 🎨 **Product Variants** — Display product variant options on detail pages
- ⭐ **Customer Reviews** — See star-rated reviews tied to each product
- 🔍 **Product Detail Pages** — Rich product pages with image galleries and related reviews
- 📱 **Fully Responsive** — Looks great on mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Fast loads using Next.js App Router server components
- 🖼️ **Optimized Images** — imgix-powered responsive image delivery

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a326b26cb5ebdc34732fba5&clone_repository=6a326c20cb5ebdc34732fbd8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Online Store". The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Cosmic SDK** (`@cosmicjs/sdk`)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (or Node.js 18+)
- A Cosmic account with a bucket containing `categories`, `products`, and `reviews` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables (these are automatically provided when using the Cosmic deploy button):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all products with related category (depth 1)
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single product by slug
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug })
  .depth(1)

// Fetch reviews for a product
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from three [Cosmic](https://www.cosmicjs.com/docs) object types:

- **categories** — `name`, `description`, `category_image`
- **products** — `name`, `description`, `price`, `sku`, `inventory_status`, `featured_image`, `gallery`, `variants`, `category`
- **reviews** — `reviewer_name`, `rating`, `review`, `product`

All data fetching happens server-side for security and performance. See the [Cosmic docs](https://www.cosmicjs.com/docs) for more.

## Deployment Options

### Vercel

1. Push your code to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify

1. Connect your repository to [Netlify](https://netlify.com)
2. Add the environment variables in Site Settings
3. Deploy

<!-- README_END -->