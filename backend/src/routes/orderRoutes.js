const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/status').patch(updateOrderStatus);

module.exports = router;
