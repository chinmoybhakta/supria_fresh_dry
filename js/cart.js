function updateCartQty(key, d) {
    const i = cart.find(x => x.key === key); if (!i) return;
    i.qty += d; if (i.qty <= 0) cart = cart.filter(x => x.key !== key);
    afterCartChange();
}
function removeFromCart(key) { cart = cart.filter(x => x.key !== key); afterCartChange(); }
function afterCartChange() { saveCart(); updateBadge(); cart.length ? drawCartList() : renderCart(); }

function renderCart() {
    if (!cart.length) {
        $('cart-root').innerHTML = `
        <div class="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
            <i class="fa-solid fa-bag-shopping text-5xl text-brandSand"></i>
            <h2 class="text-2xl font-bold text-brandGreenDark">আপনার কার্ট খালি রয়েছে</h2>
            <a href="index.html#products" class="inline-block px-6 py-3 bg-brandGreen text-white font-bold rounded-xl">পণ্য দেখুন</a>
        </div>`;
        return;
    }
    $('cart-root').innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 class="text-3xl font-extrabold text-brandGreenDark mb-6"><i class="fa-solid fa-bag-shopping mr-2"></i>শপিং কার্ট</h1>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-3" id="cart-list"></div>
            <form onsubmit="sendOrder(event)" class="bg-white border border-brandSand rounded-2xl p-5 shadow-sm space-y-3 h-fit">
                <div class="flex justify-between font-bold text-brandGreenDark">
                    <span>সর্বমোট:</span><span id="cart-total" class="text-brandCoral text-xl"></span>
                </div>
                <p class="text-[11px] text-gray-500">* ডেলিভারি চার্জ অর্ডার কনফার্মের সময় জানানো হবে</p>
                <div><label class="block text-xs font-semibold mb-1">আপনার নাম *</label>
                    <input id="customer-name" required maxlength="100" autocomplete="name" class="w-full px-3 py-2 rounded-lg border border-brandSand focus:outline-none focus:ring-2 focus:ring-brandGreen text-sm"></div>
                <div><label class="block text-xs font-semibold mb-1">মোবাইল নম্বর *</label>
                    <input id="customer-phone" type="tel" required maxlength="20" autocomplete="tel" class="w-full px-3 py-2 rounded-lg border border-brandSand focus:outline-none focus:ring-2 focus:ring-brandGreen text-sm"></div>
                <div><label class="block text-xs font-semibold mb-1">ডেলিভারির ঠিকানা *</label>
                    <textarea id="customer-address" required maxlength="300" rows="3" autocomplete="street-address" placeholder="বাড়ি/রোড, এলাকা, শহর" class="w-full px-3 py-2 rounded-lg border border-brandSand focus:outline-none focus:ring-2 focus:ring-brandGreen text-sm resize-y"></textarea></div>
                <div><label class="block text-xs font-semibold mb-1">অতিরিক্ত নোট (ঐচ্ছিক)</label>
                    <input id="customer-note" maxlength="200" class="w-full px-3 py-2 rounded-lg border border-brandSand focus:outline-none focus:ring-2 focus:ring-brandGreen text-sm"></div>
                <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition"><i class="fa-brands fa-whatsapp mr-1"></i> WhatsApp-এ অর্ডার নিশ্চিত করুন</button>
            </form>
        </div>
    </div>`;
    drawCartList();
}

function drawCartList() {
    $('cart-total').innerText = taka(cartTotal());
    $('cart-list').innerHTML = cart.map(i => `
        <div class="flex items-center gap-4 p-3 bg-white rounded-xl border border-brandSand">
            ${img(i.image, i.name, 'w-20 h-20 rounded-lg object-cover')}
            <div class="flex-1 min-w-0">
                <h4 class="font-bold text-sm text-brandGreenDark leading-tight">${i.name}</h4>
                <p class="text-xs text-gray-500">${i.category} • ${i.weight}</p>
                ${i.detail ? `<p class="text-[11px] text-gray-500">${i.detail}</p>` : ''}
                <div class="flex items-center gap-2 mt-2">
                    <button onclick="updateCartQty('${i.key}', -1)" class="w-6 h-6 bg-gray-200 rounded text-xs">-</button>
                    <span class="text-sm font-bold w-6 text-center">${i.qty}</span>
                    <button onclick="updateCartQty('${i.key}', 1)" class="w-6 h-6 bg-gray-200 rounded text-xs">+</button>
                    <span class="text-xs text-gray-500 ml-2">${taka(i.price)} each</span>
                </div>
            </div>
            <div class="text-right">
                <div class="font-bold text-brandCoral">${taka(i.price * i.qty)}</div>
                <button onclick="removeFromCart('${i.key}')" class="text-gray-400 hover:text-red-500 text-sm mt-2"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`).join('');
}

// ============ WHATSAPP ORDER (full details) ============
function sendOrder(e) {
    e.preventDefault();
    if (!cart.length) return;
    const v = id => $(id).value.trim();
    const lines = cart.map((i, n) =>
        `${n + 1}) ${i.name}\n   ক্যাটাগরি: ${i.category}\n   ওজন: ${i.weight}\n` +
        (i.detail ? `   বিবরণ: ${i.detail}\n` : '') +
        `   একক মূল্য: ${taka(i.price)}\n   পরিমাণ: ${i.qty}\n   সাবটোটাল: ${taka(i.price * i.qty)}`).join('\n\n');
    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const text = `🛒 *নতুন অর্ডার*\n━━━━━━━━━━━━━━\n${lines}\n━━━━━━━━━━━━━━\n` +
        `মোট আইটেম: ${totalQty} টি\n*সর্বমোট: ${taka(cartTotal())}* (ডেলিভারি চার্জ আলাদা)\n\n` +
        `👤 নাম: ${v('customer-name')}\n📞 মোবাইল: ${v('customer-phone')}\n📍 ঠিকানা: ${v('customer-address')}` +
        (v('customer-note') ? `\n📝 নোট: ${v('customer-note')}` : '');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
}

renderCart();
