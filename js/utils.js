// ============ SETTINGS ============
const WHATSAPP = '8801745693992';
const PH = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#F4EAD4"/><text x="200" y="210" font-size="22" text-anchor="middle" fill="#2D5A27">ছবি শীঘ্রই আসছে</text></svg>');
const img = (src, alt, cls = '') => `<img src="${src}" alt="${alt}" class="${cls}" onerror="this.onerror=null;this.src=PH">`;
const taka = n => '৳ ' + n.toLocaleString('en-US');
const $ = id => document.getElementById(id);

// ---- Cart state (saved in the browser) ----
let cart = [];
try { cart = JSON.parse(localStorage.getItem('supriya_cart') || '[]'); } catch (e) {}

function addItem(item) {
    const e = cart.find(i => i.key === item.key);
    e ? e.qty += item.qty : cart.push(item);
    saveCart(); updateBadge(); toast('কার্টে যোগ হয়েছে ✓');
}
function saveCart() { try { localStorage.setItem('supriya_cart', JSON.stringify(cart)); } catch (e) {} }
function updateBadge() { $('cart-count').innerText = cart.reduce((s, i) => s + i.qty, 0); }
function cartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function toast(msg) {
    const t = $('toast'); t.innerText = msg; t.classList.remove('hidden');
    clearTimeout(window._tt); window._tt = setTimeout(() => t.classList.add('hidden'), 1800);
}
