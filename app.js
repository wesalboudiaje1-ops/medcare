// ══════════════════════════════════════════
//   DOCTORS DATA
// ══════════════════════════════════════════
const doctors = [
  { name: "Dr. Mamman Bo",    spec: "Cardiologist",       rating: "★★★★★", exp: "12 yrs", color: "c1", img: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png" },
  { name: "Dr. Reda Slana",   spec: "Neurologist",        rating: "★★★★★", exp: "9 yrs",  color: "c2", img: "https://cdn-icons-png.flaticon.com/512/4128/4128176.png" },
  { name: "Dr. Yaroslav Hawa",spec: "Dentist",            rating: "★★★★☆", exp: "7 yrs",  color: "c3", img: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png" },
  { name: "Dr. Sarah Kim",    spec: "Orthopedic",         rating: "★★★★★", exp: "14 yrs", color: "c4", img: "https://cdn-icons-png.flaticon.com/512/4128/4128176.png" },
  { name: "Dr. James Chen",   spec: "Eye Specialist",     rating: "★★★★★", exp: "11 yrs", color: "c1", img: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png" },
  { name: "Dr. Amira Hassan", spec: "General Physician",  rating: "★★★★☆", exp: "6 yrs",  color: "c2", img: "https://cdn-icons-png.flaticon.com/512/4128/4128176.png" },
  { name: "Dr. Lucas Rivera", spec: "Cardiologist",       rating: "★★★★★", exp: "16 yrs", color: "c3", img: "https://cdn-icons-png.flaticon.com/512/4128/4128349.png" },
  { name: "Dr. Nadia Petrov", spec: "Neurologist",        rating: "★★★★☆", exp: "8 yrs",  color: "c4", img: "https://cdn-icons-png.flaticon.com/512/4128/4128176.png" },
];

// ── Render doctors grid ──
function renderDoctors(list) {
  const grid = document.getElementById('doctorsGrid');
  grid.innerHTML = list.map(d => `
    <div class="dr-card" onclick="navigate('appointment')">
      <div class="dr-photo ${d.color}">
        <img src="${d.img}" alt="${d.name}">
      </div>
      <div class="dr-info">
        <div class="dr-name">${d.name}</div>
        <div class="dr-spec">${d.spec}</div>
        <div class="dr-meta">
          <span>${d.exp} exp</span>
          <span class="dr-rating">${d.rating}</span>
        </div>
        <button class="qcard-btn" style="margin-top:10px;width:100%;text-align:center"
          onclick="event.stopPropagation();navigate('appointment')">Book Now</button>
      </div>
    </div>
  `).join('');
}

// ── Filter doctors by name / specialty ──
function filterDoctors() {
  const query = document.getElementById('doctorSearch').value.toLowerCase();
  const spec  = document.getElementById('specFilter').value;
  renderDoctors(doctors.filter(d =>
    (!query || d.name.toLowerCase().includes(query)) &&
    (!spec  || d.spec === spec)
  ));
}

// ══════════════════════════════════════════
//   SPA NAVIGATION
// ══════════════════════════════════════════
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));

  document.getElementById('page-' + page).classList.add('active');

  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ══════════════════════════════════════════
//   FORMS
// ══════════════════════════════════════════

// Contact form submit
function submitContact() {
  const successEl = document.getElementById('contactSuccess');
  successEl.style.display = 'block';
  setTimeout(() => { successEl.style.display = 'none'; }, 5000);
}

// Appointment form submit
function submitAppt() {
  const firstNameInput = document.getElementById('apptFirst');
  if (!firstNameInput.value.trim()) {
    firstNameInput.style.borderColor = '#ef476f';
    firstNameInput.focus();
    return;
  }
  document.getElementById('apptFormFields').style.display = 'none';
  document.getElementById('apptSuccess').style.display = 'block';
}

// Reset appointment form
function resetAppt() {
  document.getElementById('apptFormFields').style.display = 'block';
  document.getElementById('apptSuccess').style.display = 'none';
  document.getElementById('apptFirst').value = '';
  document.getElementById('apptLast').value = '';
  document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
}

// Time slot selection
function selectSlot(el) {
  document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

// ══════════════════════════════════════════
//   INIT
// ══════════════════════════════════════════
(function init() {
  // Pre-fill date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateInput = document.getElementById('apptDate');
  if (dateInput) dateInput.value = tomorrow.toISOString().split('T')[0];

  // Render doctors on load
  renderDoctors(doctors);
})();
