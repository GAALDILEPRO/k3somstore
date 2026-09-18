import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategoryDocument extends Document {
  name: string;
  nameSo?: string;
  slug: string;
  description?: string;
  image?: string;
  isFeatured: boolean;
  order: number;
}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    nameSo: { type: String },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    image: { type: String },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CategoryModel: Model<ICategoryDocument> =
  mongoose.models.Category || mongoose.model<ICategoryDocument>('Category', CategorySchema);

export default CategoryModel;
