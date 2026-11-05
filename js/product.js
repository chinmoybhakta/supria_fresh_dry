let sel = 0, qty = 1;
// A product with no price list (no variants, or no price above 0) is pre-order only.
const hasPrices = p => Array.isArray(p.variants) && p.variants.some(v => v.price > 0);

// ============ PRODUCT DETAILS PAGE ============
function pricedBlock(p, v, id) {
    return `
                <div class="text-3xl font-extrabold text-brandGreen">${taka(v.price)} <span class="text-sm font-medium text-gray-500">/ ${v.weight}</span></div>

                <div>
                    <h3 class="font-bold text-sm text-brandGreenDark mb-2">ওজন নির্বাচন করুন</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        ${p.variants.map((x, i) => `
                        <button type="button" onclick="pickVariant(${id}, ${i})" class="text-left p-2 rounded-xl border-2 transition ${i === sel ? 'border-brandGreen bg-brandGreen/10' : 'border-brandSand hover:border-brandAmber'}">
                            <div class="flex sm:block items-center gap-3">
                                ${img(x.image, x.weight, 'w-14 h-14 sm:w-full sm:h-24 rounded-lg object-cover')}
                                <div class="sm:mt-2">
                                    <div class="font-bold text-sm text-brandGreenDark">${x.weight}</div>
                                    <div class="text-[11px] text-gray-500">${x.sub}</div>
                                    <div class="text-sm font-bold text-brandCoral">${taka(x.price)}</div>
                                </div>
                            </div>
                        </button>`).join('')}
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <span class="font-bold text-sm text-brandGreenDark">পরিমাণ</span>
                    <div class="flex items-center border border-brandSand rounded-lg overflow-hidden">
                        <button onclick="changeQty(${id}, -1)" class="w-9 h-9 bg-brandCream hover:bg-brandSand">-</button>
                        <span class="w-10 text-center font-bold">${qty}</span>
                        <button onclick="changeQty(${id}, 1)" class="w-9 h-9 bg-brandCream hover:bg-brandSand">+</button>
                    </div>
                    <span class="text-sm text-gray-600">মোট: <b class="text-brandGreen">${taka(v.price * qty)}</b></span>
                </div>

                <div class="flex flex-wrap gap-3 pt-2">
                    <button onclick="addFromProduct(${id}, false)" class="flex-1 min-w-[150px] py-3 bg-brandGreen hover:bg-brandGreenDark text-white font-bold rounded-xl shadow transition"><i class="fa-solid fa-cart-plus mr-1"></i> কার্টে যোগ করুন</button>
                    <button onclick="addFromProduct(${id}, true)" class="flex-1 min-w-[150px] py-3 bg-brandAmber hover:bg-yellow-600 text-brandGreenDark font-bold rounded-xl shadow transition">এখনই অর্ডার করুন</button>
                </div>
    `;
}

function preorderBlock(p) {
    const msg = `আসসালামু আলাইকুম, আমি "${p.name}" প্রি-অর্ডার করতে চাই।`;
    return `
                <div class="text-3xl font-extrabold text-brandGreen">${taka(0)}</div>
                <div class="rounded-xl border-2 border-brandAmber bg-brandAmber/10 p-4 space-y-3">
                    <p class="font-bold text-brandGreenDark"><i class="fa-solid fa-clock mr-1"></i> Pre order available. Product will be in stock very soon</p>
                    <p class="text-sm text-gray-600">প্রি-অর্ডার করতে WhatsApp-এ আমাদের সাথে যোগাযোগ করুন।</p>
                    <a href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition"><i class="fa-brands fa-whatsapp"></i> WhatsApp-এ প্রি-অর্ডার করুন</a>
                </div>`;
}

function drawProduct(id) {
    const p = products.find(x => x.id === id), priced = hasPrices(p);
    if (!p.variants || !p.variants[sel]) sel = 0;
    const v = priced ? p.variants[sel] : { image: p.image, price: 0 };
    $('product-root').innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav class="text-xs text-gray-500 mb-6">
            <a href="index.html#home" class="hover:text-brandGreen">হোম</a> /
            <a href="index.html#bestsellers" class="hover:text-brandGreen">${p.tag}</a> /
            <span class="text-brandGreenDark font-semibold">${p.name}</span>
        </nav>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div class="rounded-2xl overflow-hidden bg-brandSand/30 border border-brandSand aspect-square">
                ${img(v.image, p.name, 'w-full h-full object-cover')}
            </div>
            <div class="space-y-5">
                <span class="bg-brandAmber/20 text-brandGreenDark text-xs font-bold px-3 py-1 rounded-full">${p.tag}</span>
                <h1 class="text-2xl md:text-3xl font-extrabold text-brandGreenDark leading-tight">${p.name}</h1>
                <p class="text-sm text-gray-600 leading-relaxed">${p.desc}</p>
                ${priced ? pricedBlock(p, v, id) : preorderBlock(p)}
            </div>
        </div>
    </div>`;
}
function pickVariant(id, i) { sel = i; drawProduct(id); }
function changeQty(id, d) { qty = Math.max(1, qty + d); drawProduct(id); }
function addFromProduct(id, goCart) {
    const p = products.find(x => x.id === id);
    if (!hasPrices(p)) return;
    const v = p.variants[sel];
    addItem({ key: `${p.id}-${v.id}`, name: p.name, category: p.tag, weight: v.weight, price: v.price, image: v.image, qty });
    if (goCart) location.href = 'cart.html';
}

const productId = +new URLSearchParams(location.search).get('id');
if (products.some(p => p.id === productId)) drawProduct(productId);
else $('product-root').innerHTML = '<div class="py-24 text-center"><h2 class="text-2xl font-bold mb-4">পণ্যটি পাওয়া যায়নি</h2><a href="index.html#products" class="px-6 py-3 bg-brandGreen text-white font-bold rounded-xl">সব পণ্য দেখুন</a></div>';