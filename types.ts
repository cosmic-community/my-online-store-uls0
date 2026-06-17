// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Inventory status values from the content model
export type InventoryStatus = 'In Stock' | 'Out of Stock' | 'Low Stock' | 'Pre-order';

// Cosmic file/image metafield shape
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// A single product variant
export interface ProductVariant {
  name?: string;
  price?: number;
  sku?: string;
  [key: string]: unknown;
}

// Category object
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: CosmicImage;
  };
}

// Product object
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name?: string;
    description?: string;
    price?: number;
    sku?: string;
    inventory_status?: InventoryStatus | string;
    featured_image?: CosmicImage;
    gallery?: CosmicImage[];
    variants?: ProductVariant[];
    category?: Category;
  };
}

// Review object
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name?: string;
    rating?: number;
    review?: string;
    product?: Product;
  };
}

// Cosmic API response shape
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}