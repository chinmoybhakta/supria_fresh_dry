# সুপ্রিয়া ফ্রেশ অ্যান্ড ড্রাই ফুডস্ (Supriya Fresh & Dry Foods)

Dehydrated and freeze-dried food products, sold online and ordered through WhatsApp.

This repository is the business website: customers browse products, pick a weight, add items to a cart and send the full order to us on WhatsApp.

## Product Categories

| Category | Key in code |
|---|---|
| Dehydrated Powder (ডিহাইড্রেটেড পাউডার) | `dehydrated-powder` |
| Dehydrated Chips (ডিহাইড্রেটেড চিপস) | `dehydrated-chips` |
| Freeze Dried Chips (ফ্রিজ ড্রাইড চিপস) | `freeze-dried-chips` |

Every product is sold in weight options (250g, 500g, 1kg). Each option has its own subtitle, image and price.

## How Ordering Works

1. The customer opens a product and selects a weight.
2. The customer adds it to the cart (`cart.html`).
3. The customer fills in name, mobile number and address, then taps **WhatsApp-এ অর্ডার নিশ্চিত করুন**.
4. WhatsApp opens with the full order: every item with category, weight, unit price, quantity and subtotal, plus the total and the customer's details.
5. We confirm the order and the delivery charge on WhatsApp.

**Pre-order:** a product with no price list shows *"Pre order available. Product will be in stock very soon"* with a price of ৳ 0. It cannot be added to the cart. The customer contacts us on WhatsApp to pre-order.

## Project Structure

```
├── index.html        Home page
├── product.html      Product details page (product.html?id=3)
├── cart.html         Cart and checkout page
├── css/
│   └── style.css
├── js/
│   ├── data.js       Categories, products, weights and prices  ← edit this
│   ├── utils.js      Shared helpers, cart logic, WhatsApp number
│   ├── layout.js     Header and footer shared by every page
│   ├── home.js       Home page: product grid, search, custom box
│   ├── product.js    Product details and pre-order view
│   └── cart.js       Cart page and WhatsApp order message
└── asset/            Product images
```

## Managing Products

All product information lives in `js/data.js`.

**Add a product**

```js
// P(id, category, name, description, image, [price250g, price500g, price1kg])
P(14, 'dehydrated-powder', 'আদা পাউডার (Ginger Powder)', 'আদা থেকে তৈরি সূক্ষ্ম পাউডার।', 'asset/ginger_powder.jpg', [300, 550, 1000]),
```

- `id` must be unique.
- Put the product image in `asset/` and use its path.
- Use an empty price list `[]` to make the product pre-order only.

**Change weight options:** edit the `WEIGHTS` list in `js/data.js`. Each option has an `id`, a `weight` label and a `sub` subtitle.

**Use a different image per weight:** after creating the product, set `variants[i].image` for that weight.

**Change the WhatsApp number:** edit `WHATSAPP` in `js/utils.js`. Use the full international format with no `+` (for example `8801745693992`).

## Running the Website

No build step is needed. It is plain HTML, CSS and JavaScript.

- **Locally:** open `index.html` in a browser.
- **Hosting:** upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages or normal web hosting). Keep `css/`, `js/` and `asset/` next to the HTML files.

The pages load Tailwind CSS and Font Awesome from a CDN, so an internet connection is needed to display the styling.

## Notes

- The cart is saved in the customer's browser (localStorage), so it survives a page refresh.
- Delivery charge is not added automatically. It is confirmed with the customer on WhatsApp.
- Sample prices and sample chips products in `js/data.js` are placeholders. Replace them with real products and prices before launch.

## Contact

- WhatsApp: +880 1745-693992