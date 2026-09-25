// Global Room Pricing Map
const ROOM_PRICES = {
  "17": { name: "Double Bed", price: 1200 },
  "18": { name: "Double Bed AC Deluxe", price: 1600 },
  "19": { name: "Double Bed AC", price: 1500 },
  "20": { name: "Family Bed", price: 1800 },
  "21": { name: "Family Bed AC", price: 1800 },
  "224": { name: "Family Deluxe", price: 2400 },
  "225": { name: "Triple Bed", price: 2200 }
};

let currentFormStep = 1;
const TOTAL_STEPS = 5;

let currentState = {
  step: 'WELCOME',
  data: {}
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Default Dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  document.getElementById('check_in_date').valueAsDate = today;
  document.getElementById('check_out_date').valueAsDate = tomorrow;

  // Initialize Event Listeners
  document.getElementById('sendBtn').addEventListener('click', handleUserSend);
  document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserSend();
  });
  document.getElementById('resetChatBtn').addEventListener('click', resetChat);
  document.getElementById('reservationForm').addEventListener('submit', handleFormSubmit);

  // Sync Mobile & Email matching
  document.getElementById('mobile_number').addEventListener('input', (e) => {
    document.getElementById('con_mobile_number').value = e.target.value;
  });
  document.getElementById('email_id').addEventListener('input', (e) => {
    document.getElementById('con_email_id').value = e.target.value;
  });

  // Load Rooms & Places Tabs Data
  loadRoomsCatalog();
  loadPlaces();

  // Initial Stepper State
  updateStepperUI();

  // Initial Welcome Message
  appendBotMessage(
    "Hello! Welcome to **Hotel Akriti Restaurant And Lodge, Maihar** 🏨✨\n\n" +
    "I am your official AI Booking Assistant. I can help you reserve a room using our step-by-step reservation wizard on the right panel.\n\n" +
    "Which room type would you like to reserve?",
    ["Book Double Bed (₹1200)", "Book Double Bed AC (₹1500)", "Book Family Bed AC (₹1800)", "Book Family Deluxe (₹2400)"]
  );
});

// Stepper Logic
function nextStep(currentStep) {
  if (!validateStep(currentStep)) return;
  if (currentStep < TOTAL_STEPS) {
    currentFormStep = currentStep + 1;
    updateStepperUI();
  }
}

function prevStep(currentStep) {
  if (currentStep > 1) {
    currentFormStep = currentStep - 1;
    updateStepperUI();
  }
}

function goToStep(stepNum) {
  if (stepNum > currentFormStep) {
    // Validate all previous steps
    for (let i = 1; i < stepNum; i++) {
      if (!validateStep(i)) return;
    }
  }
  currentFormStep = stepNum;
  updateStepperUI();
}

function validateStep(stepNum) {
  if (stepNum === 1) {
    const roomType = document.getElementById('room_type').value;
    const checkIn = document.getElementById('check_in_date').value;
    const checkOut = document.getElementById('check_out_date').value;
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return false;
    }
    if (!roomType) {
      alert("Please select a room type.");
      return false;
    }
  } else if (stepNum === 2) {
    const fn = document.getElementById('first_name').value.trim();
    const ln = document.getElementById('last_name').value.trim();
    const idType = document.getElementById('id_type_slect').value;
    const idNum = document.getElementById('id_card_number').value.trim();
    if (!fn || !ln) {
      alert("Please enter first and last name.");
      return false;
    }
    if (!idType || !idNum) {
      alert("Please select ID type and enter ID number.");
      return false;
    }
  } else if (stepNum === 3) {
    const mobile = document.getElementById('mobile_number').value.trim();
    const email = document.getElementById('email_id').value.trim();
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email address.");
      return false;
    }
    document.getElementById('con_mobile_number').value = mobile;
    document.getElementById('con_email_id').value = email;
  } else if (stepNum === 4) {
    const addr = document.getElementById('address_1').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const pin = document.getElementById('pin_code').value.trim();
    if (!addr || !city || !state || pin.length < 6) {
      alert("Please fill complete address, city, state, and 6-digit pin code.");
      return false;
    }
  }
  return true;
}

function updateStepperUI() {
  // Update step visibility
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const content = document.getElementById(`stepContent${i}`);
    const node = document.getElementById(`stepNode${i}`);

    if (i === currentFormStep) {
      content.classList.add('active');
      node.classList.add('active');
      node.classList.remove('completed');
    } else if (i < currentFormStep) {
      content.classList.remove('active');
      node.classList.remove('active');
      node.classList.add('completed');
    } else {
      content.classList.remove('active');
      node.classList.remove('active');
      node.classList.remove('completed');
    }
  }

  // Fill progress line percentage
  const fillPercent = ((currentFormStep - 1) / (TOTAL_STEPS - 1)) * 100;
  document.getElementById('progressBarFill').style.width = `${fillPercent}%`;

  // Render Step 5 Review Summary
  if (currentFormStep === 5) {
    renderSummaryReview();
  }

  // Notify AI Agent of Step Transition
  notifyAgentOnStep(currentFormStep);
}

function notifyAgentOnStep(step) {
  const stepTitles = {
    1: "Step 1: Choose dates and select your room type.",
    2: "Step 2: Enter primary guest name and identification card details.",
    3: "Step 3: Provide contact mobile number & email address.",
    4: "Step 4: Enter full residential postal address.",
    5: "Step 5: Review your complete reservation summary and submit!"
  };
  
  if (step > 1) {
    appendBotMessage(`📌 **Wizard Progress update**: You are now on **Step ${step} of 5**.\n${stepTitles[step]}`);
  }
}

function renderSummaryReview() {
  const roomType = document.getElementById('room_type').value;
  const roomObj = ROOM_PRICES[roomType] || { name: 'Double Bed', price: 1200 };

  const summaryHTML = `
    <div class="summary-row">
      <span class="summary-label">Room Type</span>
      <span class="summary-val">${roomObj.name}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Check-In</span>
      <span class="summary-val">${document.getElementById('check_in_date').value}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Check-Out</span>
      <span class="summary-val">${document.getElementById('check_out_date').value}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Guests</span>
      <span class="summary-val">${document.getElementById('total_adults').value} Adults, ${document.getElementById('total_child').value} Children</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Guest Name</span>
      <span class="summary-val">${document.getElementById('first_name').value} ${document.getElementById('last_name').value}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">ID (${document.getElementById('id_type_slect').value})</span>
      <span class="summary-val">${document.getElementById('id_card_number').value}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Mobile</span>
      <span class="summary-val">${document.getElementById('mobile_number').value}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Email</span>
      <span class="summary-val">${document.getElementById('email_id').value}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Address</span>
      <span class="summary-val">${document.getElementById('address_1').value}, ${document.getElementById('city').value}, ${document.getElementById('state').value} - ${document.getElementById('pin_code').value}</span>
    </div>
    <div class="summary-row" style="background:#fffbe8; margin-top:8px; padding:10px; border-radius:6px;">
      <span class="summary-label" style="font-weight:700; color:#1e293b;">Total Payable Amount</span>
      <span class="summary-val" style="font-size:1.1rem; color:#c99e32;">₹${document.getElementById('total_amount').value}</span>
    </div>
  `;

  document.getElementById('summaryCard').innerHTML = summaryHTML;
}

// Switch Main Tab
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

  if (tabId === 'formTab') {
    document.getElementById('tabFormBtn').classList.add('active');
    document.getElementById('formTab').style.display = 'block';
  } else if (tabId === 'roomsTab') {
    document.getElementById('tabRoomsBtn').classList.add('active');
    document.getElementById('roomsTab').style.display = 'block';
  } else if (tabId === 'placesTab') {
    document.getElementById('tabPlacesBtn').classList.add('active');
    document.getElementById('placesTab').style.display = 'block';
  }
}

// Room Selection Event
function onRoomSelectChange() {
  const roomSelect = document.getElementById('room_type');
  const selectedVal = roomSelect.value;
  const costInput = document.getElementById('total_amount');
  
  if (ROOM_PRICES[selectedVal]) {
    costInput.value = ROOM_PRICES[selectedVal].price;
  } else {
    costInput.value = "1200";
  }
}

function selectRoomById(roomId) {
  const select = document.getElementById('room_type');
  select.value = String(roomId);
  onRoomSelectChange();
  switchTab('formTab');
  currentFormStep = 1;
  updateStepperUI();
  
  appendUserMessage(`Selected ${ROOM_PRICES[roomId]?.name || 'Room'}`);
  appendBotMessage(
    `Great choice! You selected **${ROOM_PRICES[roomId]?.name}** (₹${ROOM_PRICES[roomId]?.price}/night).\n\n` +
    `I have set your room choice in Step 1. Click **Next: Guest Info** to proceed with your booking!`,
    ["Next Step: Guest Details", "Change Room", "Contact Support"]
  );
}

// Send Message Handler
async function handleUserSend() {
  const inputEl = document.getElementById('userInput');
  const message = inputEl.value.trim();
  if (!message) return;

  appendUserMessage(message);
  inputEl.value = '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message, state: currentState })
    });
    const data = await res.json();
    if (data.success) {
      if (data.state) currentState = data.state;
      appendBotMessage(data.reply, data.options);
    } else {
      appendBotMessage("Apologies, I encountered an issue. Please try selecting an option or fill the form directly.");
    }
  } catch (err) {
    appendBotMessage("I am temporarily offline. Please fill the reservation form directly on the right panel!");
  }
}

function handleOptionClick(optText) {
  if (optText.includes("Next Step: Guest Details")) nextStep(1);
  else if (optText.includes("Book Double Bed (₹1200)")) selectRoomById("17");
  else if (optText.includes("Book Double Bed AC (₹1500)")) selectRoomById("19");
  else if (optText.includes("Book Family Bed AC (₹1800)")) selectRoomById("21");
  else if (optText.includes("Book Family Deluxe (₹2400)")) selectRoomById("224");
  else if (optText.includes("View Room Rates") || optText.includes("View All Rooms")) switchTab('roomsTab');
  else if (optText.includes("Maa Sharda") || optText.includes("Sightseeing")) switchTab('placesTab');
  else if (optText.includes("Book a Room") || optText.includes("Start Room Booking")) {
    switchTab('formTab');
    currentFormStep = 1;
    updateStepperUI();
  }
  else {
    appendUserMessage(optText);
    handleUserSendText(optText);
  }
}

async function handleUserSendText(text) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, state: currentState })
    });
    const data = await res.json();
    if (data.success) {
      appendBotMessage(data.reply, data.options);
    }
  } catch (e) {}
}

// Render Messages
function appendUserMessage(text) {
  const container = document.getElementById('chatMessages');
  const msgWrapper = document.createElement('div');
  msgWrapper.className = 'message-wrapper user';

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = text;

  const time = document.createElement('div');
  time.className = 'message-time';
  time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  msgWrapper.appendChild(bubble);
  msgWrapper.appendChild(time);
  container.appendChild(msgWrapper);
  container.scrollTop = container.scrollHeight;
}

function appendBotMessage(text, options = []) {
  const container = document.getElementById('chatMessages');
  const msgWrapper = document.createElement('div');
  msgWrapper.className = 'message-wrapper bot';

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.innerHTML = formatMarkdown(text);

  if (options && options.length > 0) {
    const optsDiv = document.createElement('div');
    optsDiv.className = 'quick-options';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.textContent = opt;
      btn.onclick = () => handleOptionClick(opt);
      optsDiv.appendChild(btn);
    });
    bubble.appendChild(optsDiv);
  }

  const time = document.createElement('div');
  time.className = 'message-time';
  time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  msgWrapper.appendChild(bubble);
  msgWrapper.appendChild(time);
  container.appendChild(msgWrapper);
  container.scrollTop = container.scrollHeight;
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function resetChat() {
  document.getElementById('chatMessages').innerHTML = '';
  currentState = { step: 'WELCOME', data: {} };
  currentFormStep = 1;
  updateStepperUI();
  appendBotMessage("Chat reset! How can I assist you with your Hotel Akriti booking?", ["Book a Room", "View Rooms"]);
}

// Submit Form Handler
async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  // Validate dates
  if (!data.check_in_date || !data.check_out_date) {
    alert("Please select check-in and check-out dates.");
    return;
  }

  data.con_mobile_number = data.mobile_number;
  data.con_email_id = data.email_id;

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting Reservation...`;

  try {
    const response = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    if (result.success) {
      showReceiptModal(result.data || data, result.bookingRef);
      appendBotMessage(
        `🎉 **Booking Confirmed!**\n\n` +
        `Your reservation reference is **${result.bookingRef}**.\n` +
        `Guest: ${data.first_name} ${data.last_name}\n` +
        `Room: ${ROOM_PRICES[data.room_type]?.name || 'Hotel Room'}\n` +
        `Check-In: ${data.check_in_date}\n` +
        `Amount: ₹${data.total_amount}\n\n` +
        `We look forward to hosting you at Hotel Akriti Maihar!`
      );
    } else {
      alert("Submission error: " + (result.message || "Could not complete booking."));
    }
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    alert("Network error. Please check server logs.");
  }
}

// Show Booking Confirmation Voucher Modal
function showReceiptModal(data, ref) {
  const modal = document.getElementById('receiptModal');
  const container = document.getElementById('receiptDetails');

  const roomName = ROOM_PRICES[data.room_type]?.name || "Standard Room";

  container.innerHTML = `
    <div class="receipt-item">
      <span>Booking Ref</span>
      <span>${ref || 'AKR-982143'}</span>
    </div>
    <div class="receipt-item">
      <span>Guest Name</span>
      <span>${data.first_name} ${data.last_name}</span>
    </div>
    <div class="receipt-item">
      <span>Room Type</span>
      <span>${roomName}</span>
    </div>
    <div class="receipt-item">
      <span>Total Amount</span>
      <span>₹${data.total_amount}</span>
    </div>
    <div class="receipt-item">
      <span>Check-In</span>
      <span>${data.check_in_date}</span>
    </div>
    <div class="receipt-item">
      <span>Check-Out</span>
      <span>${data.check_out_date}</span>
    </div>
    <div class="receipt-item">
      <span>Mobile</span>
      <span>${data.mobile_number}</span>
    </div>
    <div class="receipt-item">
      <span>ID (${data.id_type_slect})</span>
      <span>${data.id_card_number}</span>
    </div>
    <div class="receipt-item" style="grid-column: span 2;">
      <span>Address</span>
      <span>${data.address_1}, ${data.city}, ${data.state} - ${data.pin_code}</span>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('receiptModal').style.display = 'none';
}

// Fetch Room Catalog
async function loadRoomsCatalog() {
  try {
    const res = await fetch('/api/rooms');
    const data = await res.json();
    if (data.success) {
      const container = document.getElementById('roomsContainer');
      container.innerHTML = data.rooms.map(room => `
        <div class="room-card">
          <div class="room-card-header">
            <div class="room-title">${room.name}</div>
            <div class="room-price">₹${room.price}<span style="font-size:0.75rem; color:#64748b;">/night</span></div>
          </div>
          <div class="room-badges">
            <span class="badge ${room.ac ? 'badge-ac' : 'badge-nonac'}">${room.ac ? 'Air Conditioned' : 'Non-AC'}</span>
            <span class="badge" style="background:#e0f2fe; color:#0369a1;">Max ${room.maxAdults} Adults</span>
          </div>
          <div class="room-desc">${room.description}</div>
          <button class="select-room-btn" onclick="selectRoomById('${room.id}')">Select & Book Room</button>
        </div>
      `).join('');
    }
  } catch (e) {}
}

// Fetch Places Catalog
async function loadPlaces() {
  try {
    const res = await fetch('/api/places');
    const data = await res.json();
    if (data.success) {
      const container = document.getElementById('placesContainer');
      container.innerHTML = data.places.map(place => `
        <div class="room-card">
          <div class="room-card-header">
            <div class="room-title" style="color:#c99e32;"><i class="fa-solid fa-location-dot"></i> ${place.name}</div>
          </div>
          <div class="room-desc"><strong>Distance:</strong> ${place.distance}</div>
          <div class="room-desc">${place.description}</div>
          <div style="font-size:0.8rem; background:#fffbe8; border-left:3px solid #c99e32; padding:6px 10px; margin-top:4px;">
            💡 <strong>Tip:</strong> ${place.tip}
          </div>
        </div>
      `).join('');
    }
  } catch (e) {}
}
