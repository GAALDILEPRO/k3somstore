const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);
router.route('/:id/stock').patch(adjustStock);

module.exports = router;
