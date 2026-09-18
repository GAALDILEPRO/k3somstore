import { NextResponse } from 'next/server';
import { StoreService } from '../../../lib/services/storeService';
import { z } from 'zod';

const ProductCreateSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  oldPrice: z.number().optional(),
  sku: z.string().min(3),
  stock: z.number().int().nonnegative(),
  categoryId: z.string(),
  description: z.string().min(5),
  imageUrl: z.string().url(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const sortBy = searchParams.get('sort') || undefined;
    const inStockOnly = searchParams.get('inStock') === 'true';

    const products = StoreService.getProducts({
      categorySlug,
      search,
      sortBy,
      inStockOnly,
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = ProductCreateSchema.parse(body);

    const product = StoreService.addProduct({
      name: validated.name,
      slug: validated.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: validated.price,
      oldPrice: validated.oldPrice,
      sku: validated.sku,
      stock: validated.stock,
      lowStockAlert: 5,
      isFeatured: true,
      isNew: true,
      isBestSeller: false,
      rating: 5.0,
      reviewCount: 0,
      categoryId: validated.categoryId,
      description: validated.description,
      images: [{ id: `img-${Date.now()}`, url: validated.imageUrl, alt: validated.name }],
      specs: {},
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Validation failed or unauthorized' },
      { status: 400 }
    );
  }
}
