# 📖 Buugga Hagaha K3SOMSTORE (VS Code & MongoDB) 🇸🇴

Hambalyo! Mashruuca **K3SOMSTORE** hadda wuxuu si 100% ah ugu shaqaynayaa gacantaada adigoo isticmaalaya **VS Code** iyo **MongoDB** oo kaliya, adigoon u baahnayn wax kale.

---

## ⚡ 1. Sida Hal Amar Loogu Kiciyo Labada Server (VS Code Terminal)

1. Fur **VS Code**.
2. Galka mashruuca fur: `C:\Users\GAALDILE\.gemini\antigravity\scratch\k3somstore`
3. Fur Terminal-ka VS Code:
   * Riix kiiboodhka: **``Ctrl + ` ``** (ama ka dooro menu-ga sare: **Terminal** ➔ **New Terminal**).
4. Ku qor amarkan hal-xariiqda ah:
   ```bash
   npm run dev
   ```
5. **Waa intaas!** Isla ilbiriqsigaas labada server way kici doonaan:
   * 🟢 **Backend (Express + MongoDB)**: `http://localhost:5000`
   * 🔵 **Frontend (Next.js)**: `http://localhost:3000`
   * 📱 **Mobile IP (Taleefankaaga)**: `http://192.168.100.17:3000`

---

## 🖱️ 2. Habka 2-aad: Hal-Riix VS Code ah (Tasks)

Haddii aadan rabin inaad wax qorto:
1. VS Code dhexdiisa riix: **`Ctrl + Shift + B`**
2. Wuxuu si toos ah u bilaabayaa mashruuca oo dhan!

Ama:
* Menu-ga sare: **Terminal** ➔ **Run Task...** ➔ Riix **🚀 Start K3SOMSTORE (Frontend + Backend)**.

---

## 🍃 3. Sida Xogta Loogu Shubayo MongoDB (Seed Database)

Haddii aad mar kasta rabto inaad xogta dukaanka (alaabta, qaybaha, maamulka) ku shubto MongoDB:
Terminal-ka VS Code ku qor:
```bash
npm run seed
```
Wuxuu isla markiiba MongoDB ku xaraynayaa xogta oo dhan.

---

## 🛑 4. Sida Loo Damiyo Server-yada

Markaad dhamaysato shaqada oo aad rabto inaad damiso:
* Ku dhufo Terminal-ka VS Code: **`Ctrl + C`**
* Kadibna qor **`Y`** oo Enter riix.

---

## 📱 5. Tijaabinta Taleefanka Gacanta (Mobile)

* Hubi in computer-kaaga iyo taleefankaagu ay ku xiran yihiin isku Wi-Fi (ama Mobile Hotspot).
* Taleefankaaga ka fur Chrome ama Safari:
  👉 **`http://192.168.100.17:3000`**
* Badhanka **`Buy Now`** iyo badhanka lacag-bixinta **Hormuud EVC Plus (`iibso`)** waxay toos uga shaqaynayaan taleefankaaga!

---

## 📂 6. Qaabka Folder-radu u Kala Jiraan

* **`frontend/`**: Dhammaan boggaga website-ka (Next.js, React 19, Tailwind CSS).
* **`backend/`**: Server-ka REST API-ga iyo xiriirka MongoDB (Express, Mongoose).
* **`start.bat`**: Fayl aad laba jeer ku dhufan karto (Double-click) si uu toos ugu kaco adigoon terminal furin.
