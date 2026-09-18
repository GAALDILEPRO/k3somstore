const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      city,
      district,
      streetAddress,
      deliveryNotes,
      items,
      subtotal,
      deliveryFee,
      discountAmount,
      totalAmount,
      couponCode,
      paymentMethod,
      paymentReference,
    } = req.body;

    const orderNumber = `K3-${Math.floor(10000 + Math.random() * 90000)}`;

    const order = await Order.create({
      orderNumber,
      customerName,
      customerPhone,
      customerEmail,
      city,
      district,
      streetAddress,
      deliveryNotes,
      items,
      subtotal,
      deliveryFee,
      discountAmount,
      totalAmount,
      couponCode,
      paymentMethod,
      paymentReference,
      timeline: [
        {
          status: 'Order Placed',
          description: `Order received via ${paymentMethod}`,
          timestamp: new Date(),
        },
      ],
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single order by orderNumber or ID (Order tracking)
// @route   GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    let order;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    } else {
      order = await Order.findOne({ orderNumber: id.toUpperCase() });
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PATCH /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.orderStatus = status;
    order.timeline.push({
      status: `Status: ${status}`,
      description: note || `Order updated to ${status} by admin`,
      timestamp: new Date(),
    });

    await order.save();
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
