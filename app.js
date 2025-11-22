/* Smart Parking System - app.js
 - Demo-first: works without Firebase.
 - If you enable Firebase (set FIREBASE_ENABLED = true and add config),
   the app will try to connect to Realtime Database and Auth.
*/
const statusText = document.getElementById('status-text');
const locationsList = document.getElementById('locations-list');
const template = document.getElementById('location-item');
const signInBtn = document.getElementById('sign-in-btn');
const guestBtn = document.getElementById('guest-btn');
const userInfo = document.getElementById('user-info');
const refreshBtn = document.getElementById('refresh');
const searchInput = document.getElementById('search');

let map, markers = [];
let demoData = [
  { id: 'loc1', name: 'Green Mall Parking', address: 'Sector 7, Near Green Mall', lat: 28.6139, lng: 77.2090, total: 30, occupied: 12 },
  { id: 'loc2', name: 'City Hospital Parking', address: 'MG Road', lat: 28.6158, lng: 77.2200, total: 20, occupied: 18 },
  { id: 'loc3', name: 'Tech Park Parking', address: 'Infotech City', lat: 28.6200, lng: 77.2000, total: 50, occupied: 5 }
];

function initMap() {
  // If you want to integrate Mappls, replace this fallback with Mappls init using your API key.
  map = L.map('map').setView([28.6139, 77.2090], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  renderMarkers();
}

function renderMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  demoData.forEach(loc => {
    const free = loc.total - loc.occupied;
    const popup = `<strong>${loc.name}</strong><br/>${loc.address}<br/>Free slots: ${free}`;
    const marker = L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(popup);
    markers.push(marker);
  });
}

function renderList(filter='') {
  locationsList.innerHTML = '';
  const data = demoData.filter(d => d.name.toLowerCase().includes(filter.toLowerCase()) || d.address.toLowerCase().includes(filter.toLowerCase()));
  data.forEach(loc => {
    const node = template.content.cloneNode(true);
    node.querySelector('.loc-name').textContent = loc.name;
    node.querySelector('.loc-address').textContent = loc.address;
    const free = loc.total - loc.occupied;
    const freeSpan = node.querySelector('.slot.free'); freeSpan.textContent = `Free: ${free}`;
    const occSpan = node.querySelector('.slot.occupied'); occSpan.textContent = `Occupied: ${loc.occupied}`;
    const resSpan = node.querySelector('.slot.reserved'); resSpan.textContent = `Total: ${loc.total}`;
    const btn = node.querySelector('.toggle-book');
    btn.onclick = () => {
      // toggle one slot between free <-> occupied
      if (loc.occupied < loc.total) loc.occupied++;
      else loc.occupied = Math.max(0, loc.occupied-1);
      simulateRealtimeUpdate(loc.id, { occupied: loc.occupied });
      renderList(searchInput.value);
      renderMarkers();
    };
    locationsList.appendChild(node);
  });
}

function simulateRealtimeUpdate(id, changes) {
  // In a real app you'd push updates to Firebase DB; here we just update local data.
  const idx = demoData.findIndex(d=>d.id===id);
  if (idx!==-1) {
    demoData[idx] = {...demoData[idx], ...changes};
    statusText.textContent = 'Updated locally';
  }
}

function startDemoRealtime() {
  // Simulate random changes every 8-12 seconds
  setInterval(()=>{
    const i = Math.floor(Math.random()*demoData.length);
    const delta = Math.random() < 0.6 ? 1 : -1;
    demoData[i].occupied = Math.min(demoData[i].total, Math.max(0, demoData[i].occupied + delta));
    renderList(searchInput.value);
    renderMarkers();
    statusText.textContent = 'Simulated update at ' + new Date().toLocaleTimeString();
  }, 9000);
}

// Auth handlers (demo)
signInBtn.onclick = async () => {
  if (!FIREBASE_ENABLED) {
    alert('Firebase is disabled in firebase-config.js. To enable sign-in, set FIREBASE_ENABLED = true and add your config.');
    return;
  }
  try {
    // Example: phone auth would require setup of reCAPTCHA and proper domain.
    alert('Firebase enabled: implement phone auth flow after adding project config.');
  } catch(e){ console.error(e); alert('Sign-in failed'); }
};

guestBtn.onclick = () => {
  userInfo.textContent = 'Guest';
  statusText.textContent = 'Guest mode — demo data';
};

// search & refresh
searchInput.oninput = ()=> renderList(searchInput.value);
refreshBtn.onclick = ()=> { renderList(searchInput.value); renderMarkers(); statusText.textContent='Refreshed'; };

window.addEventListener('load', ()=>{
  initMap();
  renderList();
  startDemoRealtime();
});
