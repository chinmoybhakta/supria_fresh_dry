// Product catalog. Edit names, images and prices here.
// ============ CATEGORIES ============
const CATS = {
    'dehydrated-powder': 'ডিহাইড্রেটেড পাউডার',
    'dehydrated-chips': 'ডিহাইড্রেটেড চিপস',
    'freeze-dried-chips': 'ফ্রিজ ড্রাইড চিপস'
};

// ============ PRODUCTS ============
// Weight options (same list for every product). Edit labels/subtitles here.
const WEIGHTS = [
    { id: '50g', weight: '৫০ গ্রাম', sub: 'ট্রায়াল প্যাক' },
    { id: '100g', weight: '১০০ গ্রাম', sub: 'পরিবারের জন্য' },
    { id: '1kg',  weight: '১ কেজি',   sub: 'সাশ্রয়ী বড় প্যাক' }
];
// To use a different image per weight, set variants[i].image after creation.
const P = (id, category, name, desc, image, prices) => ({
    id, category, name, desc, image, tag: CATS[category],
    variants: WEIGHTS.map((w, i) => ({ ...w, image, price: prices[i] }))
});
const PW1 = [149, 249, 2499], 
PW2 = [249, 499, 4999], 
PW3 = [199, 299, 2999], 
PW4 = [149, 249, 2499], 
PW5 = [99, 149, 1499], 
PW6 = [99, 199, 1999], 
PW7 = [199, 399, 3999], 
DC = [], 
FD = [];

const products = [
    P(1, 'dehydrated-powder', 'আমলকী পাউডার (Amla Powder)', 'আমলকী থেকে তৈরি সূক্ষ্ম পাউডার।', 'asset/amloki.jpg', PW1),
    P(2, 'dehydrated-powder', 'আপেল পাউডার (Apple Powder)', 'আপেল থেকে তৈরি সূক্ষ্ম পাউডার।', 'asset/apple.jpg', PW2),
    P(3, 'dehydrated-powder', 'বিটরুট পাউডার (Beetroot Powder)', 'বিটরুট থেকে তৈরি সূক্ষ্ম পাউডার।', 'asset/beetroot.jpg', PW3),
    P(4, 'dehydrated-powder', 'করলা পাউডার (Bitter Gourd Powder)', 'করলা থেকে তৈরি সূক্ষ্ম পাউডার।', 'asset/korolla.jpg', PW4),
    P(5, 'dehydrated-powder', 'নিমপাতা পাউডার (Neem Leaf Powder)', 'নিমপাতা থেকে তৈরি সূক্ষ্ম পাউডার।', 'asset/neem.jpg', PW5),
    P(6, 'dehydrated-powder', 'পেঁয়াজ পাউডার (Onion Powder)', 'পেঁয়াজ থেকে তৈরি সূক্ষ্ম পাউডার।', 'asset/onion.jpg', PW6),
    P(7, 'dehydrated-powder', 'কমলালেবু পাউডার (Orange Powder)', 'কমলালেবু থেকে তৈরি সূক্ষ্ম পাউডার।', 'asset/malta.jpg', PW7),
    // ⚠ SAMPLE products for the new categories – replace names, images and prices with your real ones
    P(8, 'dehydrated-chips', 'Vegetable Chips', 'ডিহাইড্রেটেড মচমচে পুষ্টিকর সবজি চিপস।', 'asset/chips.jpg', DC),
    P(9, 'freeze-dried-chips', 'ফ্রিজ ড্রাইড স্ট্রবেরি (Strawberry)', 'ফ্রিজ ড্রাইড হালকা ও মচমচে স্ট্রবেরি।', 'asset/strawberry.jpg', FD),
];
const minPrice = p => Math.min(...p.variants.map(v => v.price));
