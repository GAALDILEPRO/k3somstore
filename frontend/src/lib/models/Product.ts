import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductDocument extends Document {
  name: string;
  nameSo?: string;
  slug: string;
  description: string;
  descriptionSo?: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  sku: string;
  stock: number;
  lowStockAlert: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  categoryId: string;
  images: { id: string; url: string; alt?: string; isPrimary?: boolean }[];
  specs: Record<string, string>;
  colors?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    nameSo: { type: String, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    descriptionSo: { type: String },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, min: 0 },
    discountPercent: { type: Number, min: 0, max: 100 },
    sku: { type: String, required: true, unique: true, index: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
    lowStockAlert: { type: Number, default: 5 },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
    rating: { type: Number, default: 5.0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    categoryId: { type: String, required: true, index: true },
    images: [
      {
        id: { type: String, required: true },
        url: { type: String, required: true },
        alt: { type: String },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    specs: { type: Map, of: String, default: {} },
    colors: [{ type: String }],
  },
  { timestamps: true }
);

export const ProductModel: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);

export default ProductModel;
