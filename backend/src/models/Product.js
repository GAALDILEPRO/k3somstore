const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    category: { type: String, required: true, index: true },
    categoryId: { type: String, required: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
    sku: { type: String, required: true, unique: true },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    reviewCount: { type: Number, default: 0 },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: '' },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    colors: [{ type: String }],
    sizes: [{ type: String }],
    specifications: { type: Map, of: String },
    somaliGuaranteeDays: { type: Number, default: 7 },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
