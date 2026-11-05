// Shared header, footer, floating WhatsApp button and toast, injected on every page.
(function () {
    const HEADER = `    <!-- TOP ANNOUNCEMENT BAR -->
    <div class="bg-brandGreenDark text-brandCream text-xs md:text-sm py-2 px-4 text-center font-medium flex justify-between items-center px-6">
        <span class="hidden md:inline">🌱 ১০০% বিশুদ্ধ, রাসায়নিক মুক্ত ও স্বাস্থ্যকর প্রিমিয়াম ড্রাই ফুড</span>
        <span class="mx-auto md:mx-0">🚚 সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সহজলভ্য | হটলাইন: <a href="tel:+8801745693992" class="underline hover:text-brandAmber">+8801745693992</a></span>
        <span class="hidden md:inline text-brandAmber font-bold">🎁 ৫০০ টাকার বেশি অর্ডারে আকর্ষণীয় ছাড়!</span>
    </div>

    <!-- MAIN NAVIGATION BAR -->
    <header class="sticky top-0 z-40 glass-header border-b border-brandSand shadow-sm transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">

                <!-- Logo & Brand Info -->
                <a href="index.html" class="flex items-center gap-3 group">
                    <div class="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-brandAmber p-0.5 shadow-md bg-white overflow-hidden flex items-center justify-center">
                        <!-- Custom Inline SVG representation matching uploaded brand logo -->
                        <img src="asset/logo.png" alt="logo.png" srcset="asset/logo.png">
                    </div>
                    <div>
                        <h1 class="text-lg md:text-xl font-bold leading-tight text-brandGreenDark group-hover:text-brandGreen transition">
                            সুপ্রিয়া ফ্রেশ অ্যান্ড ড্রাই ফুডস্
                        </h1>
                        <p class="text-[10px] md:text-xs font-semibold tracking-wider text-brandCoral uppercase">
                            Organic Dehydrated Foods
                        </p>
                    </div>
                </a>

                <!-- Desktop Nav Links -->
                <nav class="hidden lg:flex items-center space-x-8 text-base font-medium">
                    <a href="index.html#home" class="text-brandGreen font-bold border-b-2 border-brandGreen pb-1">হোম</a>
                    <a href="index.html#bestsellers" class="text-gray-700 hover:text-brandGreen transition">বেস্ট সেলিং</a>
                    <a href="index.html#products" class="text-gray-700 hover:text-brandGreen transition">আমাদের পণ্য</a>
                    <a href="index.html#custom-box" class="text-brandCoral hover:text-brandGreen font-semibold transition"><i class="fa-solid font-bold fa-box-open mr-1"></i> কাস্টম বক্স</a>
                    <a href="index.html#benefits" class="text-gray-700 hover:text-brandGreen transition">উপকারিতা</a>
                    <a href="index.html#reviews" class="text-gray-700 hover:text-brandGreen transition">রিভিউ</a>
                </nav>

                <!-- Actions (Search, Cart, Quick Order) -->
                <div class="flex items-center gap-3 md:gap-4">
                    <button id="search-toggle" class="p-2 text-gray-700 hover:text-brandGreen rounded-full hover:bg-brandSand transition" title="Search">
                        <i class="fa-solid fa-magnifying-glass text-lg"></i>
                    </button>

                    <a id="cart-btn" href="cart.html" class="relative p-2.5 bg-brandGreen text-white rounded-full hover:bg-brandGreenDark transition shadow-md flex items-center justify-center">
                        <i class="fa-solid fa-bag-shopping text-lg"></i>
                        <span id="cart-count" class="absolute -top-1 -right-1 bg-brandCoral text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">0</span>
                    </a>

                    <a href="https://wa.me/8801745693992" target="_blank" class="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-full shadow transition text-sm">
                        <i class="fa-brands fa-whatsapp text-lg"></i>
                        <span>অর্ডার করুন</span>
                    </a>

                    <!-- Mobile Menu Button -->
                    <button id="menu-btn" class="lg:hidden p-2 text-gray-700 hover:text-brandGreen focus:outline-none">
                        <i class="fa-solid fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Search Bar Drawer -->
        <div id="search-bar" class="hidden border-t border-brandSand bg-brandCream p-4 shadow-inner transition-all">
            <div class="max-w-3xl mx-auto flex gap-2">
                <input type="text" id="search-input" onkeyup="filterProductsBySearch()" placeholder="পণ্য খুঁজুন (যেমন: আমলকী, আপেল, বিটরুট, করলা পাউডার...)" class="w-full px-4 py-2.5 rounded-lg border border-brandSand focus:outline-none focus:ring-2 focus:ring-brandGreen text-sm">
                <button onclick="clearSearch()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">মুছুন</button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden lg:hidden border-t border-brandSand bg-brandCream px-4 py-4 space-y-3 font-medium">
            <a href="index.html#home" class="block text-brandGreen font-bold py-1">হোম</a>
            <a href="index.html#bestsellers" class="block text-gray-700 hover:text-brandGreen py-1">বেস্ট সেলিং</a>
            <a href="index.html#products" class="block text-gray-700 hover:text-brandGreen py-1">আমাদের পণ্য</a>
            <a href="index.html#custom-box" class="block text-brandCoral font-semibold py-1">কাস্টম বক্স বিল্ডার</a>
            <a href="index.html#benefits" class="block text-gray-700 hover:text-brandGreen py-1">উপকারিতা</a>
            <a href="index.html#reviews" class="block text-gray-700 hover:text-brandGreen py-1">রিভিউ</a>
        </div>
    </header>

`;
    const FOOTER = `    <!-- FOOTER -->
    <footer class="bg-brandGreenDark text-brandCream border-t border-brandGreen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                
                <!-- Col 1: Brand Info -->
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-brandAmber p-0.5 shadow-md bg-white overflow-hidden flex items-center justify-center">
                            <img src="asset/logo.png" alt="logo.png" srcset="asset/logo.png">
                        </div>
                        <span class="font-bold text-lg text-white">সুপ্রিয়া ফ্রেশ</span>
                    </div>
                    <p class="text-xs text-gray-300 leading-relaxed">
                        প্রাকৃতিক ও বিশুদ্ধ অর্গানিক ডিহাইড্রেটেড ফুড এবং প্রিমিয়াম ড্রাই ফ্রুটসের বিশ্বস্ত প্রতিষ্ঠান।
                    </p>
                    <div class="flex gap-3 text-lg text-brandSand">
                        <a href="#" class="hover:text-brandAmber transition"><i class="fa-brands fa-facebook"></i></a>
                        <a href="#" class="hover:text-brandAmber transition"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="hover:text-brandAmber transition"><i class="fa-brands fa-youtube"></i></a>
                        <a href="#" class="hover:text-brandAmber transition"><i class="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>

                <!-- Col 2: Quick Links -->
                <div>
                    <h4 class="font-bold text-white mb-4 border-b border-white/10 pb-2 text-sm">দ্রুত লিঙ্ক</h4>
                    <ul class="space-y-2 text-xs text-gray-300">
                        <li><a href="index.html#home" class="hover:text-brandAmber transition">হোম পেজ</a></li>
                        <li><a href="index.html#bestsellers" class="hover:text-brandAmber transition">বেস্ট সেলিং প্রোডাক্ট</a></li>
                        <li><a href="index.html#products" class="hover:text-brandAmber transition">সকল পণ্যসমূহ</a></li>
                        <li><a href="index.html#custom-box" class="hover:text-brandAmber transition">কাস্টম গিফট বক্স</a></li>
                    </ul>
                </div>

                <!-- Col 3: Customer Care -->
                <div>
                    <h4 class="font-bold text-white mb-4 border-b border-white/10 pb-2 text-sm">গ্রাহক সেবা</h4>
                    <ul class="space-y-2 text-xs text-gray-300">
                        <li><a href="#" class="hover:text-brandAmber transition">অর্ডার করার নিয়ম</a></li>
                        <li><a href="#" class="hover:text-brandAmber transition">শিপিং ও ডেলিভারি পলিসি</a></li>
                        <li><a href="#" class="hover:text-brandAmber transition">রিফান্ড ও রিটার্ন নীতি</a></li>
                        <li><a href="#" class="hover:text-brandAmber transition">প্রাইভেসি পলিসি</a></li>
                    </ul>
                </div>

                <!-- Col 4: Contact -->
                <div>
                    <h4 class="font-bold text-white mb-4 border-b border-white/10 pb-2 text-sm">যোগাযোগ করুন</h4>
                    <ul class="space-y-2 text-xs text-gray-300">
                        <li class="flex items-center gap-2"><i class="fa-solid fa-location-dot text-brandAmber"></i> বরিশাল সদর, বরিশাল, বাংলাদেশ</li>
                        <li class="flex items-center gap-2"><i class="fa-solid fa-phone text-brandAmber"></i> +8801745693992</li>
                        <li class="flex items-center gap-2"><i class="fa-solid fa-envelope text-brandAmber"></i> mvokto19@gmail.com</li>
                    </ul>
                </div>

            </div>

            <div class="border-t border-white/10 mt-10 pt-6 text-center text-xs text-gray-400">
                © ২০২৬ সুপ্রিয়া ফ্রেশ অ্যান্ড ড্রাই ফুডস্। সর্বস্বত্ব সংরক্ষিত।
            </div>
        </div>
    </footer>

`;
    const EXTRAS = `    <!-- FLOATING WHATSAPP BUTTON -->
    <a href="https://wa.me/8801745693992?text=Hello!%20I%20want%20to%20order%20from%20Supriya%20Fresh" target="_blank" class="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition hover:scale-110" title="Direct WhatsApp Order">
        <i class="fa-brands fa-whatsapp text-3xl"></i>
    </a>

    <div id="toast" class="hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-brandGreenDark text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-xl"></div>

`;

    $('site-header').outerHTML = HEADER;
    $('site-footer').outerHTML = FOOTER;
    document.body.insertAdjacentHTML('beforeend', EXTRAS);

    $('menu-btn').addEventListener('click', () => $('mobile-menu').classList.toggle('hidden'));
    $('search-toggle').addEventListener('click', () => $('search-bar').classList.toggle('hidden'));
    updateBadge();
})();

// Search: filters on the home page, otherwise jumps to the home page with the query.
function filterProductsBySearch() {
    const q = $('search-input').value;
    if (typeof renderAllProducts === 'function') { doSearch(q); }
    else if (event && event.key === 'Enter') location.href = 'index.html?q=' + encodeURIComponent(q) + '#products';
}
function clearSearch() { $('search-input').value = ''; if (typeof renderAllProducts === 'function') doSearch(''); }
