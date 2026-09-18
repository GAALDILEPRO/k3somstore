# 🌟 K3SOMSTORE — MASTER SYSTEM PROMPT & ARCHITECTURAL BLUEPRINT
> **Production E-Commerce Platform for Somalia**  
> *Two-Compartment Architecture (Next.js 16 Frontend + Express.js & MongoDB Backend)*

---

## 1. PROJECT OVERVIEW & BRAND IDENTITY
* **Store Name**: K3SOMSTORE
* **Tagline**: Shop Smart. Shop K3SOM. (Iibso Si Casri Ah)
* **Target Market**: Somali consumers across Somalia (Mogadishu, Hargeisa, Garowe, Bosaso, Kismayo, Baidoa) and the Somali diaspora.
* **Core Value Proposition**: Premium electronics, fashion, and lifestyle retail with localized Somali mobile money (Hormuud EVC Plus, Telesom Zaad, Golis Sahal, Somtel eDahab), same-day Mogadishu delivery, and 7-day guarantee.

---

## 2. TECHNOLOGY STACK SPECIFICATIONS

| Layer | Technologies & Libraries | Version |
|---|---|---|
| **Frontend Framework** | **Next.js (App Router, Turbopack)** | `16.3.5` |
| **UI Library** | **React** | `19.2.8` |
| **Language** | **TypeScript** | `^5.0.0` |
| **Styling** | **Tailwind CSS v4 + PostCSS** | `^4.0.0` |
| **Icons** | **Lucide React** | `^1.47.0` |
| **Backend Server** | **Node.js + Express.js** | `^4.19.2` |
| **Database** | **MongoDB (Local & Atlas)** | `7.6 / 8.0` |
| **Database ODM** | **Mongoose** | `^8.4.1` |
| **Authentication** | **JWT (jsonwebtoken) + bcryptjs** | `^9.0.2 / ^2.4.3` |
| **Orchestration** | **Concurrently** (Single-command runner) | `^9.1.2` |

---

## 3. FULL PROJECT DIRECTORY TREE

```text
k3somstore/
│
├── backend/                               # 🚀 REST API BACKEND SERVER (Port 5000)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                      # MongoDB Mongoose Connection Manager
│   │   ├── models/
│   │   │   ├── Product.js                 # Product Mongoose Schema
│   │   │   ├── Category.js                # Category Mongoose Schema
│   │   │   ├── Order.js                   # Order Mongoose Schema (with Timeline)
│   │   │   └── User.js                    # User Mongoose Schema (Customer vs Admin)
│   │   ├── controllers/
│   │   │   ├── productController.js       # Product Filtering, Search, Sort & CRUD
│   │   │   ├── orderController.js         # Order Creation, Tracking & Status Updates
│   │   │   ├── authController.js          # Customer Registration, Login & RBAC
│   │   │   └── categoryController.js      # Categories Fetch & Management
│   │   ├── routes/
│   │   │   ├── productRoutes.js           # /api/products
│   │   │   ├── orderRoutes.js             # /api/orders
│   │   │   ├── categoryRoutes.js          # /api/categories
│   │   │   └── authRoutes.js              # /api/auth
│   │   ├── middleware/
│   │   │   └── authMiddleware.js          # JWT Verification & adminOnly Guard
│   │   └── server.js                      # Express App, CORS, JSON Parsers & Route Mounts
│   ├── scripts/
│   │   └── seed.js                        # Standalone MongoDB Database Seeder
│   ├── package.json                       # Backend Dependencies
│   └── .env                               # PORT=5000, MONGODB_URI, JWT_SECRET
│
├── frontend/                              # 💻 NEXT.JS 16 REACT STOREFRONT (Port 3000)
│   ├── src/
│   │   ├── app/                           # App Router (20 Production Pages)
│   │   │   ├── page.tsx                   # Homepage (Hero, 8 Categories, Flash Deals)
│   │   │   ├── shop/page.tsx              # Shop (Search, Filters, Price Slider, Sorting)
│   │   │   ├── product/[id]/page.tsx      # Product Details, Gallery, Buy Now, Reviews
│   │   │   ├── cart/page.tsx              # Full Cart & Regional Delivery Calculator
│   │   │   ├── checkout/page.tsx          # Checkout, Somali Addresses & USSD Dialers
│   │   │   ├── track-order/page.tsx       # 5-Stage Visual Order Tracking Stepper
│   │   │   ├── login/page.tsx             # Customer Login (with Password Eye Toggle)
│   │   │   ├── register/page.tsx          # Customer Sign Up (with Password Eye Toggle)
│   │   │   ├── account/page.tsx           # Customer Account & Order History
│   │   │   ├── admin/page.tsx             # Protected Admin Portal (Master Key: k3som2026)
│   │   │   ├── wishlist/page.tsx          # Saved Wishlist Items
│   │   │   ├── about/page.tsx             # About K3SOMSTORE
│   │   │   ├── contact/page.tsx           # Contact Us & WhatsApp Dispatch
│   │   │   ├── faq/page.tsx               # Frequently Asked Questions
│   │   │   ├── terms/page.tsx             # Terms & Conditions
│   │   │   ├── privacy/page.tsx           # Privacy Policy
│   │   │   ├── layout.tsx                 # Root Layout (Navbar, CartDrawer, Footer)
│   │   │   └── globals.css                # Tailwind CSS v4 Directives & Custom Styles
│   │   ├── components/
│   │   │   ├── layout/Header.tsx          # Sticky Header, Search Bar, Live Cart Count
│   │   │   ├── layout/Footer.tsx          # Somali Payment Badges, Links, Trust Badges
│   │   │   ├── cart/CartDrawer.tsx        # Slide-Over Cart Drawer with Live Totals
│   │   │   └── shop/ProductCard.tsx       # Grid Card with Wishlist, Quick Add, Badges
│   │   ├── context/
│   │   │   ├── CartContext.tsx            # Synchronous Cart State & Immediate LocalStorage
│   │   │   ├── WishlistContext.tsx        # Wishlist Storage & Actions
│   │   │   ├── AuthContext.tsx            # Customer Login State & Session
│   │   │   └── ToastContext.tsx           # Interactive Toast Notifications
│   │   ├── data/
│   │   │   ├── somaliRegions.ts           # Somali Cities & Districts Database
│   │   │   └── initialData.ts             # Store Catalog & Initial Products
│   │   └── lib/
│   │       ├── payments/                  # Somali Payment Providers Registry
│   │       ├── services/storeService.ts   # Unified Store Data Service Layer
│   │       └── utils.ts                   # Currency Formatting & Delivery Logic
│   ├── public/                            # Static Assets & Icons
│   ├── package.json                       # Next.js Dependencies
│   ├── next.config.ts                     # Allowed Dev Origins for Mobile Access
│   ├── tsconfig.json                      # Strict TypeScript Configuration
│   └── .env                               # Store Configuration & Public URLs
│
├── .vscode/                               # 🛠️ VS CODE IDE CONFIGURATION
│   ├── settings.json                      # Auto-Format on Save, Prettier, Tailwind CSS
│   ├── tasks.json                         # Single-Click Tasks (Ctrl+Shift+B)
│   └── extensions.json                    # Recommended VS Code Extensions
│
├── start.bat                              # 🖱️ Double-Click Windows Desktop Launcher
├── package.json                           # Root Monorepo Orchestrator (npm run dev)
├── TUSMO_VSCODE.md                        # Complete Somali Offline Instructions
└── README.md                              # Technical Documentation
```

---

## 4. DATABASE SCHEMAS (MONGODB / MONGOOSE)

### A. Product Schema (`backend/src/models/Product.js`)
* `name`: String (Required, Trimmed)
* `slug`: String (Required, Unique, Lowercase)
* `description`: String
* `price`: Number (Required, Min: 0)
* `salePrice`: Number (Optional)
* `category`: String (Required, Indexed)
* `categoryId`: String (Required)
* `stock`: Number (Required, Default: 0, Min: 0)
* `sku`: String (Required, Unique)
* `isFeatured`: Boolean (Default: false)
* `isNewArrival`: Boolean (Default: false)
* `rating`: Number (Default: 5, Range: 1-5)
* `reviewCount`: Number (Default: 0)
* `images`: Array of `{ url, alt, isPrimary }`
* `colors`: Array of String
* `sizes`: Array of String
* `somaliGuaranteeDays`: Number (Default: 7)

### B. Order Schema (`backend/src/models/Order.js`)
* `orderNumber`: String (Required, Unique, Format: `K3-XXXXX`)
* `customerName`: String (Required)
* `customerPhone`: String (Required, Format: `+252...`)
* `customerEmail`: String (Optional)
* `city`: String (Mogadishu, Hargeisa, Garowe, Bosaso, Kismayo, Baidoa)
* `district`: String (e.g. Hodan, Taleex, Waberi, Yaqshid...)
* `streetAddress`: String (Required)
* `items`: Array of OrderItem (`productId`, `productName`, `productImage`, `price`, `quantity`, `total`, `selectedColor`)
* `subtotal`: Number
* `deliveryFee`: Number (Mogadishu: $2 or Free over $50; Regions: $5)
* `discountAmount`: Number
* `totalAmount`: Number
* `paymentMethod`: Enum (`EVC_PLUS`, `ZAAD`, `SAHAL`, `EDAHAB`, `CASH_ON_DELIVERY`, `CARD`)
* `paymentStatus`: Enum (`PENDING`, `PAID`, `FAILED`, `REFUNDED`)
* `paymentReference`: String (Txn ID or Sender Phone)
* `orderStatus`: Enum (`PENDING`, `CONFIRMED`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`)
* `timeline`: Array of `{ status, description, timestamp }`

### C. User Schema (`backend/src/models/User.js`)
* `name`: String (Required)
* `email`: String (Required, Unique, Lowercase)
* `password`: String (Hashed with bcryptjs 10 rounds)
* `phone`: String
* `role`: Enum (`customer`, `admin`) — Strict RBAC Separation

---

## 5. REST API ENDPOINTS SPECIFICATION

### Products (`/api/products`)
* `GET /api/products` — List all products with query filters (`category`, `search`, `minPrice`, `maxPrice`, `inStock`, `sort`).
* `GET /api/products/:id` — Get single product by MongoDB ID, slug, or SKU.
* `POST /api/products` — Create product (Admin guarded).
* `PUT /api/products/:id` — Update product (Admin guarded).
* `DELETE /api/products/:id` — Delete product (Admin guarded).
* `PATCH /api/products/:id/stock` — Increment/decrement stock count (Admin guarded).

### Orders (`/api/orders`)
* `POST /api/orders` — Create order with auto-generated `K3-XXXXX` tracking ID.
* `GET /api/orders` — List all orders for administrative monitoring.
* `GET /api/orders/:id` — Track order status and fetch timeline logs.
* `PATCH /api/orders/:id/status` — Update order status and append timeline note.

### Authentication (`/api/auth`)
* `POST /api/auth/register` — Create customer account.
* `POST /api/auth/login` — Authenticate and return JWT token + user role.
* `GET /api/auth/me` — Retrieve authenticated profile.

---

## 6. SOMALI LOCALIZATION & PAYMENT INTEGRATION

### A. Hormuud EVC Plus Instant USSD Dialing
* **Merchant Account Number**: `611609365`
* **USSD Direct Dial Link**:
  ```text
  tel:*712*611609365*<AMOUNT>##
  ```
* **Interactive Button**: Dynamic "iibso" action button styled with mobile touch-manipulation (`active:scale-95`, tactile press feedback).
* **Location in App**:
  1. `/checkout` payment provider selection box.
  2. Order Confirmed Receipt Modal (one-tap payment execution).

### B. Additional Somali Payment Providers
* **Telesom Zaad**: `tel:*220*634000000*<AMOUNT>##`
* **Golis Sahal**: `tel:*789*907000000*<AMOUNT>##`
* **Somtel eDahab**: `tel:*712*620000000*<AMOUNT>##`
* **Cash on Delivery (COD)**: Available in Mogadishu districts.
* **Credit / Debit Cards**: Ready for Visa / Mastercard.

### C. Somali Geographic Coverage
* **Cities**: Mogadishu, Hargeisa, Garowe, Bosaso, Kismayo, Baidoa, Burao, Galkayo.
* **Districts**: Hodan, Waberi, Taleex, Hawl-Wadaag, Daynile, Yaqshid, Shingani, Hamar Weyne, etc.

---

## 7. ROLE-BASED ACCESS CONTROL (RBAC)
* **Customer Role**:
  * Front-facing shopping, search, filters, cart, checkout, USSD payments, profile management, and live order tracking (`/track-order`).
  * No admin controls or access to administrative routes.
* **Admin Role**:
  * Dedicated dashboard at `/admin`.
  * Guarded by Master Security Key (`k3som2026`) with Eye icon toggle.
  * Real-time KPI cards: Total Revenue, Total Orders, Active Products, Pending Shipments.
  * Full Product CRUD modal.
  * Order Status dropdown changer (`Pending` ➔ `Confirmed` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`).
  * Live Inventory Adjuster (`+` and `-` buttons).
  * Coupon Manager (`K3SOM10`, `SOMALIA5`).

---

## 8. RUNNING IN VS CODE (WITHOUT EXTERNAL TOOLS)

### Single Command (Terminal)
```bash
npm run dev
```
* Spawns Backend on `http://localhost:5000`
* Spawns Frontend on `http://localhost:3000`
* Accessible on Local Network: `http://192.168.100.17:3000`

### Keyboard Shortcut
* Press **`Ctrl + Shift + B`** in VS Code.

### Windows Desktop Launcher
* Double-click **`start.bat`**.

### Database Seeding
```bash
npm run seed
```
