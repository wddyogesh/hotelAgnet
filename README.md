# 🏨 Hotel Akriti AI Booking Agent (Maihar)

An intelligent, interactive AI Conversational & Online Reservation Agent developed specifically for **Hotel Akriti Restaurant And Lodge, Maihar** ([https://hotelakriti.com/](https://hotelakriti.com/)).

---

## 🌟 Key Features

1. **Smart Conversational AI Assistant (Akriti Bot)**:
   - Answers traveler inquiries regarding room rates, amenities, location near **Maa Sharda Devi Temple**, ropeway details, and 10% online discount offers.
   - Multi-step interactive flow to collect guest details (Dates, Room selection, Adults/Children count, Name, Phone, Email, Identification, Address).
   - Generates quick response buttons and calculates total room rates automatically.

2. **Direct Submission to Official Website Backend**:
   - Forwards complete booking forms to `https://hotelakriti.com/reservation/reservation_form` with all parameters:
     - `check_in_date`, `check_out_date`
     - `room_type` (17, 18, 19, 20, 21, 224, 225)
     - `total_amount` (Auto calculated: ₹1200 - ₹2400)
     - `total_adults`, `total_child`
     - `first_name`, `last_name`
     - `id_type_slect` (Aadhar Card, Voter ID, Driving License)
     - `id_card_number`
     - `mobile_number`, `con_mobile_number`
     - `email_id`, `con_email_id`
     - `address_1`, `address_2`, `state`, `city`, `country`, `pin_code`

3. **Room Catalog & Pricing**:
   - **Double Bed** (ID: 17): ₹1,200/night
   - **Double Bed AC Deluxe** (ID: 18): ₹1,600/night
   - **Double Bed AC** (ID: 19): ₹1,500/night
   - **Family Bed** (ID: 20): ₹1,800/night (3 Beds)
   - **Family Bed AC** (ID: 21): ₹1,800/night (3 Beds, AC)
   - **Family Deluxe** (ID: 224): ₹2,400/night (Luxury Suite)
   - **Triple Bed** (ID: 225): ₹2,200/night (5 Beds)

4. **Booking Confirmation Voucher**:
   - Instant printable booking receipt with reference code (`AKR-XXXXXX`), date ranges, room details, and Hotel Akriti front desk contact information.

5. **Maihar Sightseeing Guide**:
   - Built-in information for Maa Sharda Devi Temple, Ropeway timings, Alha Pond, and Ustad Allauddin Khan Music Academy.

---

## 🚀 How to Run locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Express backend server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 💻 Embed Widget on https://hotelakriti.com/

To add this AI Booking Agent as a floating chat widget on the official `hotelakriti.com` website, insert this script tag before `</body>`:

```html
<script src="http://localhost:3000/widget.js"></script>
```

---

## 📞 Support & Front Desk
- **Phone**: 07674-234272
- **WhatsApp**: +91 9165039666
- **Website**: [https://hotelakriti.com/](https://hotelakriti.com/)
