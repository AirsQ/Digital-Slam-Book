/* ---------- localStorage ---------- */
const STORAGE_KEY = 'slamBookMessages';
let messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveMessages() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

/* ---------- page navigation ---------- */
function showPage(page) {
  
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(page).classList.add("active");

  document.querySelectorAll(".nav button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`nav-${page}`).classList.add("active");
  
  if (page === 'read') renderMessages();
  if (page === 'home') updateStoryCount();
}

/* ---- story Count ---- */
function updateStoryCount() {
  const count = messages.length;
  const message = count === 0
    ? "No stories yet — start one now!"
    : `${count} stor${count === 1 ? "y" : "ies"} already shared.`;

  document.getElementById("storyCount").textContent = message;
}


/* ---------- message actions ---------- */
function submitMessage() {
  const author   = document.getElementById('author').value.trim();
  const place    = document.getElementById('place').value.trim();
  const colour   = document.getElementById('colour').value.trim();
  const food     = document.getElementById('food').value.trim();
  const movie    = document.getElementById('movie').value.trim();
  const word     = document.getElementById('word').value.trim();
  const secret   = document.getElementById('secret').value.trim();
  const message  = document.getElementById('message').value.trim();

  if (!author || !message) {
    alert("Please at least enter your name and a message!");
    return;
  }

messages.unshift({
  id: Date.now(),
  author,
  message,
  place,
  colour,
  food,
  movie,
  word,
  secret,
  timestamp: new Date()
});

  saveMessages();

  // clear form
  ['author','place','colour','food','movie','word','secret','message'].forEach(id=>document.getElementById(id).value='');
  showPage('read');
}

function deleteMessage(id) {
  if (confirm("Delete this message?")) {
    messages = messages.filter(m => m.id !== id);
    updateStoryCount();
    saveMessages();
    renderMessages();
  }
}

function formatTime(date) {
  const diff = Math.floor((new Date() - new Date(date)) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return `${diff}m ago`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(date).toLocaleString();
}

function renderMessages() {
  const list = document.getElementById("messagesList");
  list.innerHTML = "";
  if (messages.length === 0) {
    list.innerHTML = "<p style='text-align:center;color:#6b7280;'>No messages yet. Be the first to share a memory!</p>";
    return;
  }
  messages.forEach(msg => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <button class="delete-btn" onclick="deleteMessage(${msg.id})" title="Delete">×</button>
      <h3>${msg.author}</h3>
      <small>${formatTime(msg.timestamp)}</small>
      ${msg.place ? `<p><b>Favourite Place:</b> ${msg.place}</p>` : ''}
      ${msg.colour ? `<p><b>Favourite Colour:</b> ${msg.colour}</p>` : ''}
      ${msg.food ? `<p><b>Favourite Food:</b> ${msg.food}</p>` : ''}
      ${msg.movie ? `<p><b>Favourite Movie/Series:</b> ${msg.movie}</p>` : ''}
      ${msg.word ? `<p><b>One best memory:</b> ${msg.word}</p>` : ''}
      ${msg.secret ? `<p><b>Secret:</b> ${msg.secret}</p>` : ''}
      <p><b>Message:</b> ${msg.message}</p>
    `;
      list.appendChild(card);
  });
}

/* ---------- init ---------- */
showPage('home');

/* ---------- cursor sparkles ---------- */
document.addEventListener('mousemove', e => {
  const s = document.createElement('span');
  s.className = 'sparkle';
  s.style.left = e.clientX + 'px';
  s.style.top  = e.clientY + 'px';
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 800);
});

/* ---------- background elements ---------- */
/*---- twinkling stars ----*/
for (let i = 0; i < 30; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random() * 100 + 'vw';
  s.style.top  = Math.random() * 100 + 'vh';
  s.style.animationDelay = Math.random() * 4 + 's';
  document.body.appendChild(s);
}

/*---- shooting stars ----*/
for (let i = 0; i < 30; i++) {
  const h = document.createElement('div');
  h.className = 'shoot-star';

  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  const angle  = Math.random() * 360;
  const dist   = 150;
  const endX   = startX + dist * Math.cos(angle * Math.PI / 180);
  const endY   = startY + dist * Math.sin(angle * Math.PI / 180);

  h.style.setProperty('--startX', startX + 'vw');
  h.style.setProperty('--startY', startY + 'vh');
  h.style.setProperty('--endX',   endX   + 'vw');
  h.style.setProperty('--endY',   endY   + 'vh');
  h.style.setProperty('--angle',  angle  + 'deg');

  h.style.animationDelay    = Math.random() * 8 + 's';
  h.style.animationDuration = (7 + Math.random() * 3) + 's';
  document.body.appendChild(h);
}
