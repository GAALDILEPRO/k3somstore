# K3SOMSTORE - Production E-Commerce Platform 🇸🇴

K3SOMSTORE is a modern, production-ready Somali e-commerce platform built with a clean two-compartment architecture separating **Frontend** and **Backend**.

---

## 📁 Project Architecture

```text
k3somstore/
├── backend/                       # Node.js + Express.js + MongoDB REST API (Port 5000)
│   ├── src/
│   │   ├── config/                # MongoDB (Mongoose) connection
│   │   ├── models/                # Product, Category, Order, User models
│   │   ├── controllers/           # Product, Order, Auth, Category controllers
│   │   ├── routes/                # REST endpoints (/api/products, /api/orders...)
│   │   ├── middleware/            # JWT & RBAC (Customer vs Admin)
│   │   └── server.js              # Express app
│   ├── scripts/
│   │   └── seed.js                # Database seeder
│   ├── package.json
│   └── .env                       # PORT=5000, MONGODB_URI, JWT_SECRET
│
├── frontend/                      # Next.js 16 + React 19 + Tailwind v4 + Lucide (Port 3000)
│   ├── src/
│   │   ├── app/                   # 20 Storefront & Admin routes
│   │   ├── components/            # Header, Footer, CartDrawer, etc.
│   │   ├── context/               # Cart, Wishlist, Auth contexts
│   │   ├── lib/                   # Payment gateways, API utilities
│   │   └── data/                  # Somali regions, fallback data
│   ├── public/                    # Assets & icons
│   ├── package.json
│   └── .env                       # NEXT_PUBLIC_STORE_NAME, NEXTAUTH_SECRET...
│
├── .vscode/                       # VS Code workspace settings & tasks
└── package.json                   # Root workspace runner
```

---

## 🚀 Quick Start

### 1. Run the Frontend (Port 3000)
```powershell
npm run dev:frontend
```
Or navigate into `frontend`:
```powershell
cd frontend
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

### 2. Run the Backend (Port 5000)
```powershell
npm run dev:backend
```
Or navigate into `backend`:
```powershell
cd backend
npm run dev
```
Backend API will be live at **`http://localhost:5000`**.
Health check: **`http://localhost:5000/api/health`**

---

### 3. Seed MongoDB Database
To populate MongoDB with products, categories, and accounts:
```powershell
npm run seed:backend
```

---

## 💳 Somali Payment Methods & USSD Direct Dial
- **Hormuud EVC Plus**: Merchant Account `611609365` | Instant USSD Dial: `*712*611609365*Amount##` with one-tap "iibso" button.
- **Telesom Zaad**: `*220*634000000*Amount##`
- **Golis Sahal**: `*789*907000000*Amount##`
- **Somtel eDahab**: `*712*620000000*Amount##`
- **Cash on Delivery (COD)**: Available in Mogadishu districts.
- **Credit / Debit Cards**: Visa / Mastercard.

---

## 🔐 Role-Based Access Control (RBAC)
- **Customer Role**: Browsing, adding to cart, placing orders, USSD payments, and order tracking (`/track-order`).
- **Admin Role**: Accessible via `/admin` guarded by Master Security Key (`k3som2026`). Features full Product CRUD, order status management, inventory adjustments, and coupon management.
