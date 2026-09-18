const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    itemCount: { type: Number, default: 0 },
    icon: { type: String, default: 'Package' },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema);
