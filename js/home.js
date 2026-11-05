let selectedCustomItems = [];
// Custom box = powders only, priced at their 1 kg pack
const customItems = products.filter(p => p.category === 'dehydrated-powder').map(p => {
    const v = p.variants.find(x => x.id === '50g') || p.variants[0];
    return { id: `c${p.id}`, name: p.name, price: v.price, image: p.image };
});

// ============ HOME: PRODUCT CARDS ============
function card(p) {
    return `
    <a href="product.html?id=${p.id}" class="bg-brandCream rounded-2xl p-4 border border-brandSand hover:border-brandGreen transition shadow-sm hover:shadow-md flex flex-col justify-between group">
        <div>
            <div class="relative rounded-xl overflow-hidden mb-3 aspect-square bg-gray-100">
                ${img(p.image, p.name, 'w-full h-full object-cover group-hover:scale-105 transition duration-500')}
                <span class="absolute top-2 left-2 bg-brandGreen text-white text-[10px] font-bold px-2.5 py-1 rounded-full">${p.tag}</span>
            </div>
            <h3 class="font-bold text-brandGreenDark text-base leading-snug">${p.name}</h3>
            <p class="text-xs text-gray-500 mt-1 line-clamp-2">${p.desc}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-brandSand/60 flex items-center justify-between">
            <span class="text-base font-bold text-brandGreen">${taka(minPrice(p))} <span class="text-xs font-medium text-gray-500">থেকে</span></span>
            <span class="bg-brandGreen group-hover:bg-brandGreenDark text-white text-xs font-bold px-3 py-2 rounded-xl">বিস্তারিত</span>
        </div>
    </a>`;
}

function renderBestSellers(cat) {
    const list = cat === 'all' ? products : products.filter(p => p.category === cat);
    $('bestseller-grid').innerHTML = list.map(card).join('');
}

function renderAllProducts(items) {
    $('all-products-grid').innerHTML = items.length
        ? items.map(card).join('')
        : `<p class="col-span-full text-center text-gray-500 py-8">কোনো পণ্য পাওয়া যায়নি।</p>`;
}

function filterCategory(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => {
        b.classList.remove('bg-brandGreen', 'text-white', 'border-brandGreen');
        b.classList.add('bg-brandCream', 'text-gray-700');
    });
    btn.classList.add('bg-brandGreen', 'text-white', 'border-brandGreen');
    renderBestSellers(cat);
}

function doSearch(q) {
    q = q.toLowerCase();
    renderAllProducts(products.filter(p => (p.name + p.desc + p.tag).toLowerCase().includes(q)));
}

// ============ CUSTOM POWDER BOX ============
function renderCustomBoxItems() {
    $('custom-items-grid').innerHTML = customItems.map(item => `
        <div onclick="toggleCustomItem('${item.id}')" id="custom-item-${item.id}" class="border-2 border-brandSand p-3 rounded-xl cursor-pointer hover:border-brandAmber transition text-center select-none bg-brandCream/50">
            <h4 class="font-bold text-xs text-brandGreenDark">${item.name}</h4>
            <span class="text-xs font-semibold text-brandCoral block mt-1">+ ${taka(item.price)} / ৫০ গ্রাম</span>
        </div>`).join('');
}

function toggleCustomItem(id) {
    const idx = selectedCustomItems.findIndex(i => i.id === id), el = $(`custom-item-${id}`);
    if (idx > -1) {
        selectedCustomItems.splice(idx, 1);
        el.classList.remove('border-brandGreen', 'bg-brandGreen/10'); el.classList.add('border-brandSand');
    } else {
        selectedCustomItems.push(customItems.find(i => i.id === id));
        el.classList.add('border-brandGreen', 'bg-brandGreen/10'); el.classList.remove('border-brandSand');
    }
    const total = selectedCustomItems.reduce((s, i) => s + i.price, 0), count = selectedCustomItems.length;
    $('custom-count').innerText = `${count} টি Item`;
    $('custom-total-price').innerText = taka(total);
    const btn = $('add-custom-box-btn'), on = count >= 2;
    btn.disabled = !on;
    btn.classList.toggle('bg-gray-300', !on); btn.classList.toggle('text-gray-500', !on); btn.classList.toggle('cursor-not-allowed', !on);
    btn.classList.toggle('bg-brandGreen', on); btn.classList.toggle('hover:bg-brandGreenDark', on); btn.classList.toggle('text-white', on);
}

function addCustomBoxToCart() {
    const total = selectedCustomItems.reduce((s, i) => s + i.price, 0);
    addItem({
        key: `custom-${Date.now()}`, name: 'কাস্টম পাউডার বক্স', category: 'কাস্টম বক্স',
        weight: `${selectedCustomItems.length} টি পাউডার × ১ কেজি`,
        detail: selectedCustomItems.map(i => i.name).join(', '),
        price: total, image: selectedCustomItems[0].image, qty: 1
    });
    location.href = 'cart.html';
}

renderBestSellers('all');
renderAllProducts(products);
renderCustomBoxItems();
const q = new URLSearchParams(location.search).get('q');
if (q) { $('search-input').value = q; $('search-bar').classList.remove('hidden'); doSearch(q); }
