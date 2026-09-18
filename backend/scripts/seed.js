const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../src/models/Product');
const Category = require('../src/models/Category');
const Order = require('../src/models/Order');
const User = require('../src/models/User');

dotenv.config();

const categories = [
  { name: 'Smartphones & Tablets', slug: 'smartphones', icon: 'Smartphone', itemCount: 12, description: 'Apple iPhone, Samsung Galaxy, and iPads with official warranty in Somalia.' },
  { name: 'Laptops & Computers', slug: 'laptops', icon: 'Laptop', itemCount: 8, description: 'MacBooks, Dell, HP, and accessories for students and professionals.' },
  { name: 'Watches & Wearables', slug: 'watches', icon: 'Watch', itemCount: 6, description: 'Ultra 2 titanium smartwatches, fitness trackers, and luxury timepieces.' },
  { name: 'Audio & Headphones', slug: 'audio', icon: 'Headphones', itemCount: 14, description: 'Sony, JBL, AirPods, noise canceling headsets, and Bluetooth speakers.' },
  { name: 'Somali Perfumes & Bukhoor', slug: 'perfumes', icon: 'Sparkles', itemCount: 10, description: 'Royal Cambodian Oud, Frankincense (Maydi/Beeyo), and traditional Bukhoor.' },
  { name: 'Men Fashion & Macawiis', slug: 'men-fashion', icon: 'Shirt', itemCount: 15, description: 'Traditional royal macawiis, Eid thobes, and luxury linen shirts.' },
  { name: 'Women Modest Fashion', slug: 'women-fashion', icon: 'ShoppingBag', itemCount: 18, description: 'Dubai abayas, chiffon hijabs, and elegant modest dresses.' },
  { name: 'Home & Kitchen', slug: 'home-kitchen', icon: 'Home', itemCount: 9, description: 'Smart kettles, air fryers, and Somali household essentials.' },
];

const products = [
  {
    name: 'Ultra 2 Smart Watch - Titanium Case with Ocean Band',
    slug: 'ultra-2-smart-watch-titanium',
    description: 'The most rugged and capable smartwatch with titanium case, dual-frequency GPS, 3-day battery life, heart rate sensor, and waterproof resistance. Supports Bluetooth calling directly from your watch across Somali networks.',
    price: 38,
    salePrice: 48,
    category: 'Watches & Wearables',
    categoryId: 'watches',
    stock: 24,
    sku: 'WCH-ULT2-001',
    isFeatured: true,
    isNewArrival: true,
    rating: 5,
    reviewCount: 42,
    images: [
      { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', isPrimary: true, alt: 'Ultra 2 Smart Watch Titanium' },
      { url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80', isPrimary: false, alt: 'Ultra 2 Smart Watch Side View' },
    ],
    colors: ['Orange Alpine', 'Midnight Black', 'Starlight Silver'],
    sizes: ['49mm'],
    somaliGuaranteeDays: 7,
  },
  {
    name: 'Apple iPhone 15 Pro Max - 256GB Natural Titanium',
    slug: 'iphone-15-pro-max-256gb',
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, 48MP main camera, and USB-C. Unlocked for all Somali telecom SIM cards (Hormuud, Somtel, Telesom, Golis).',
    price: 1199,
    salePrice: 1149,
    category: 'Smartphones & Tablets',
    categoryId: 'smartphones',
    stock: 7,
    sku: 'PHN-IP15P-256',
    isFeatured: true,
    isNewArrival: false,
    rating: 5,
    reviewCount: 38,
    images: [
      { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80', isPrimary: true, alt: 'iPhone 15 Pro Max Titanium' },
    ],
    colors: ['Natural Titanium', 'Blue Titanium', 'Black Titanium'],
    sizes: ['256GB', '512GB'],
    somaliGuaranteeDays: 14,
  },
  {
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    slug: 'sony-wh-1000xm5-wireless-headphones',
    description: 'Industry-leading noise cancellation optimized to you, magnificent sound with 8 microphones, ultra-comfortable lightweight design with soft fit leather, and 30-hour battery life.',
    price: 349,
    salePrice: 299,
    category: 'Audio & Headphones',
    categoryId: 'audio',
    stock: 12,
    sku: 'AUD-SNY-XM5',
    isFeatured: true,
    isNewArrival: true,
    rating: 5,
    reviewCount: 29,
    images: [
      { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', isPrimary: true, alt: 'Sony XM5 Headphones' },
    ],
    colors: ['Black', 'Silver'],
    sizes: ['Standard'],
    somaliGuaranteeDays: 7,
  },
  {
    name: 'Somali Traditional Royal Macawiis (Kala-Goy)',
    slug: 'somali-traditional-royal-macawiis',
    description: 'Authentic high-thread count cotton macawiis woven with regal patterns. Soft, breathable, and designed for weddings, Eid celebrations, and everyday dignity.',
    price: 35,
    salePrice: 25,
    category: 'Men Fashion & Macawiis',
    categoryId: 'men-fashion',
    stock: 40,
    sku: 'FSH-MAC-001',
    isFeatured: true,
    isNewArrival: true,
    rating: 5,
    reviewCount: 56,
    images: [
      { url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80', isPrimary: true, alt: 'Traditional Royal Macawiis' },
    ],
    colors: ['Navy Blue Plaid', 'Maroon Regal', 'Forest Green'],
    sizes: ['Standard 2M'],
    somaliGuaranteeDays: 7,
  },
  {
    name: 'Luxury Arabian Oud & Bukhoor Incense Burner Set',
    slug: 'luxury-arabian-oud-bukhoor-set',
    description: 'Handcrafted ceramic electric bukhoor mabkhara burner with premium Cambodian oud chips and natural frankincense from Puntland (Maydi & Beeyo).',
    price: 45,
    salePrice: 35,
    category: 'Somali Perfumes & Bukhoor',
    categoryId: 'perfumes',
    stock: 22,
    sku: 'PRF-OUD-SET',
    isFeatured: true,
    isNewArrival: false,
    rating: 5,
    reviewCount: 31,
    images: [
      { url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80', isPrimary: true, alt: 'Luxury Oud and Bukhoor' },
    ],
    colors: ['Gold & Pearl White', 'Black & Copper'],
    sizes: ['Full Gift Set'],
    somaliGuaranteeDays: 7,
  },
  {
    name: 'Apple MacBook Air 15-inch M3 Chip - 16GB / 512GB',
    slug: 'macbook-air-15-m3-chip',
    description: 'Impossibly thin and fast with the next-generation M3 chip, Liquid Retina display, 18 hours of battery life, and MagSafe charging. Perfect for remote work, software engineering, and university students.',
    price: 1399,
    salePrice: 1349,
    category: 'Laptops & Computers',
    categoryId: 'laptops',
    stock: 5,
    sku: 'LPT-MBA15-M3',
    isFeatured: true,
    isNewArrival: true,
    rating: 5,
    reviewCount: 19,
    images: [
      { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', isPrimary: true, alt: 'MacBook Air 15 M3' },
    ],
    colors: ['Space Gray', 'Midnight', 'Starlight', 'Silver'],
    sizes: ['512GB SSD'],
    somaliGuaranteeDays: 14,
  },
];

const sampleOrders = [
  {
    orderNumber: 'K3-10245',
    customerName: 'Guled Abdi Ali',
    customerPhone: '+252 61 543 2198',
    customerEmail: 'guled@example.so',
    city: 'Mogadishu',
    district: 'Hodan',
    streetAddress: 'Taleex Street, Near KM4 Roundabout, House #12',
    deliveryNotes: 'Please call when courier reaches the gate',
    items: [
      {
        productId: 'WCH-ULT2-001',
        productName: 'Ultra 2 Smart Watch - Titanium Case',
        productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        price: 38,
        quantity: 1,
        total: 38,
        selectedColor: 'Orange Alpine',
      },
    ],
    subtotal: 38,
    deliveryFee: 2,
    discountAmount: 0,
    totalAmount: 40,
    paymentMethod: 'EVC_PLUS',
    paymentStatus: 'PAID',
    paymentReference: 'EVC-94821034',
    orderStatus: 'SHIPPED',
    timeline: [
      { status: 'Order Placed', description: 'Order submitted via Hormuud EVC Plus (*712*611609365*40##)', timestamp: new Date(Date.now() - 3600000 * 24) },
      { status: 'Payment Confirmed', description: 'Verified Hormuud transaction Txn ID: EVC-94821034', timestamp: new Date(Date.now() - 3600000 * 20) },
      { status: 'Packaging Ready', description: 'Packed securely at K3SOMSTORE Mogadishu Hub', timestamp: new Date(Date.now() - 3600000 * 8) },
      { status: 'Out for Delivery', description: 'Dispatched with delivery driver (Sahal Courier)', timestamp: new Date(Date.now() - 3600000 * 2) },
    ],
  },
  {
    orderNumber: 'K3-48912',
    customerName: 'Faadumo Jaamac Cilmi',
    customerPhone: '+252 61 889 9001',
    customerEmail: 'faadumo@example.so',
    city: 'Mogadishu',
    district: 'Waberi',
    streetAddress: '21st October Road, near Airport Gate',
    items: [
      {
        productId: 'PRF-OUD-SET',
        productName: 'Luxury Arabian Oud & Bukhoor Incense Burner Set',
        productImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
        price: 35,
        quantity: 1,
        total: 35,
        selectedColor: 'Gold & Pearl White',
      },
    ],
    subtotal: 35,
    deliveryFee: 2,
    discountAmount: 0,
    totalAmount: 37,
    paymentMethod: 'EVC_PLUS',
    paymentStatus: 'PAID',
    paymentReference: 'EVC-77881122',
    orderStatus: 'DELIVERED',
    timeline: [
      { status: 'Order Placed', description: 'Order created', timestamp: new Date(Date.now() - 3600000 * 48) },
      { status: 'Delivered', description: 'Package handed to customer at doorstep in Waberi', timestamp: new Date(Date.now() - 3600000 * 12) },
    ],
  },
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/k3somstore';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing collections...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Order.deleteMany({});
    await User.deleteMany({});

    console.log(`Seeding ${categories.length} Categories...`);
    await Category.insertMany(categories);

    console.log(`Seeding ${products.length} Products...`);
    await Product.insertMany(products);

    console.log(`Seeding ${sampleOrders.length} Orders with tracking & timeline...`);
    await Order.insertMany(sampleOrders);

    console.log('Seeding Admin & Customer Accounts...');
    await User.create([
      {
        name: 'K3SOMSTORE Admin',
        email: 'admin@k3somstore.so',
        password: 'adminpassword2026',
        phone: '+252 61 500 0000',
        role: 'admin',
      },
      {
        name: 'Mahad Hassan',
        email: 'mahad@k3somstore.so',
        password: 'customerpassword2026',
        phone: '+252 61 511 2233',
        role: 'customer',
      },
    ]);

    console.log('\n======================================================');
    console.log('✅ [K3SOMSTORE Backend] MongoDB Seeding Complete!');
    console.log(`  - Categories: ${categories.length}`);
    console.log(`  - Products:   ${products.length}`);
    console.log(`  - Orders:     ${sampleOrders.length}`);
    console.log('  - Accounts:   Admin (admin@k3somstore.so) & Customer');
    console.log('======================================================\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
