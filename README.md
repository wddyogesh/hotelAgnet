# 🏨 Hotel Akriti AI Booking Agent (Maihar)

<div align="center">
  <img src="public/agent-avatar.jpg" alt="Hotel Akriti AI Agent Avatar" width="160" style="border-radius: 50%; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
  
  ### Official AI Reservation & Guest Assistance Desk
  **Hotel Akriti Restaurant And Lodge, Maihar, Madhya Pradesh, India**  
  🌐 Website: [https://hotelakriti.com/](https://hotelakriti.com/) | 📞 Support: **07674-234272** | 📱 WhatsApp: **+91 9165039666**

  ![Node.js](https://img.shields.io/badge/Node.js-v25.9-green?logo=nodedotjs)
  ![Express](https://img.shields.io/badge/Express-v4.21-blue?logo=express)
  ![License](https://img.shields.io/badge/License-MIT-gold)
</div>

---

## 🌟 Overview

The **Hotel Akriti AI Booking Agent** is an intelligent, multi-step reservation system built specifically for travellers and pilgrims visiting **Maa Sharda Devi Temple** in Maihar. It provides a conversational AI assistant on the left panel alongside a 5-step interactive reservation wizard on the right panel.

Completed reservations are automatically submitted to the official Hotel Akriti backend endpoint (`https://hotelakriti.com/reservation/reservation_form`).

---

## ✨ Features

- 🤖 **Smart Conversational AI Agent (Akriti Bot)**:
  - Responds to questions regarding room types, amenities (Free Wi-Fi, 24h Hot Water, Free Parking), room prices, and distance to Maa Sharda Temple.
  - Interactive quick-action buttons for one-click room selection and guidance.
  
- 📋 **5-Step Reservation Wizard**:
  - **Step 1: Room & Dates**: Select Check-In/Out dates, Room type, Adult & Child counts with auto-calculated total amount in INR.
  - **Step 2: Guest Details**: Collects Primary Guest Name and Government ID (Aadhar Card, Voter ID, Driving License).
  - **Step 3: Contact Info**: Mobile number & Email address with auto-confirmation validation.
  - **Step 4: Address**: Postal address, City, State, and Pin Code.
  - **Step 5: Review & Submit**: Summary card verification before submitting.

- 🧾 **Instant Booking Confirmation Voucher**:
  - Displays printable receipt modal with unique reference code (`AKR-XXXXXX`), guest info, and front desk contact numbers.

- 📱 **Mobile & Small Screen Optimized**:
  - Responsive down to 320px screen width with compact panel heights.

- 🔌 **Embeddable Chat Widget**:
  - Includes a lightweight `widget.js` script to embed the floating chat widget on `https://hotelakriti.com/`.

---

## 🛏️ Room Types & Pricing

| Room ID | Room Name | Category | Capacity | AC | Rate (INR) |
| :---: | :--- | :--- | :--- | :---: | :---: |
| `17` | Double Bed | Standard | 2 Adults | ❌ | **₹1,200** / night |
| `19` | Double Bed AC | Standard AC | 2 Adults | ✔️ | **₹1,500** / night |
| `18` | Double Bed AC Deluxe | Deluxe AC | 2 Adults | ✔️ | **₹1,600** / night |
| `20` | Family Bed | Family (3 Beds) | 4 Adults | ❌ | **₹1,800** / night |
| `21` | Family Bed AC | Family AC (3 Beds) | 4 Adults | ✔️ | **₹1,800** / night |
| `225` | Triple Bed | Group (5 Beds) | 6 Adults | ✔️ | **₹2,200** / night |
| `224` | Family Deluxe | Premium Suite | 5 Adults | ✔️ | **₹2,400** / night |

---

## 🏗️ System Architecture

```
                      +---------------------------------------+
                      |       Guest / User Browser            |
                      |  (Interactive AI Chat + 5-Step Wizard)|
                      +------------------+--------------------+
                                         |
                                  HTTP / REST API
                                         v
                      +------------------+--------------------+
                      |     Hotel Akriti Node.js Express      |
                      |        Backend Server (Local)         |
                      +-------+-----------------------+-------+
                              |                       |
                  /api/chat & |                       | /api/book
                  /api/rooms  |                       | (Forward POST Payload)
                              v                       v
                      +-------+-------+       +-------+-----------------------+
                      | Akriti AI     |       | Official Website Backend      |
                      | Dialog Engine |       | https://hotelakriti.com/      |
                      +---------------+       +-------------------------------+
```

---

## 🚀 Quick Start (Local Run)

1. **Clone Repository**:
   ```bash
   git clone https://github.com/wddyogesh/hotelAgnet.git
   cd hotelAgnet
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Server**:
   ```bash
   npm start
   ```

4. **Access in Browser**:
   Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 How to Embed Widget on hotelakriti.com

To add the AI Booking Assistant floating chat widget to the official `hotelakriti.com` website, insert this script tag before `</body>`:

```html
<script src="http://localhost:3000/widget.js"></script>
```

---

## 📄 License & Attribution

Designed and Developed for **Hotel Akriti Restaurant And Lodge, Maihar**.  
All rights reserved © 2026.
