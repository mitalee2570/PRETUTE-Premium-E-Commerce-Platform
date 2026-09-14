/* ==========================================================================
   PRETUTE STORE APPLICATION DATA & CONTROLLER
   ========================================================================== */






// WordPress WooCommerce API Configuration
const WP_BASE_URL = "https://kuakuacrafts.com";
const WP_CK = "ck_72975b32fcfbde13178ab83d8a37e67f1a0bc467"; // Notepad se paste karein
const WP_CS = "cs_d38c4c911505a303d66b4345b38f4b554c445745"; // Notepad se paste karein



// 1. PRODUCT CATALOG DATA

const FALLBACK_PRODUCT_CATALOG = [
    {
        id: 1,
        title: "Organic Cotton Ribbed Romper",
        category: "baby-fashion",
        categoryLabel: "Baby & Kids Wear",
        image: "assets/prod_romper.png",
        images: ["assets/prod_romper.png", "assets/logo.png"],
        originalPrice: 1299.00,
        price: 999.00,
        discount: 23,
        rating: 4.8,
        reviewsCount: 42,
        shortDesc: "Made from ultra-soft GOTS-certified organic knit cotton, keeping your little bundle comfortable all day long. Features simple nickel-free snap buttons.",
        longDesc: "Our Organic Cotton Ribbed Romper is engineered for pure comfort. Designed to support flexible mobility and easy movements, this item features flat seams that will not irritate your child's delicate skin. The nickel-free snaps along the inseam ensure quick diaper changes without fully undressing, while the breathable knit prevents overheating. GOTS certification represents the highest environmental and social standard in organic textiles.",
        specs: {
            "Material": "100% Organic Cotton (GOTS Certified)",
            "Origin": "Handcrafted in Portugal",
            "Care Instructions": "Machine wash cold, tumble dry low",
            "Safety Standards": "OEKO-TEX Standard 100 Certified"
        },
        sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
        reviews: [
            { name: "Sarah M.", rating: 5, date: "May 24, 2026", comment: "Absolutely love the fabric quality! It is incredibly soft and washes so well without stretching out." },
            { name: "Jessica K.", rating: 4, date: "April 18, 2026", comment: "So cute! Snaps are very sturdy. Deducted one star only because shipping took 4 days." }
        ]
    },
    {
        id: 2,
        title: "Artisan Wooden Rainbow Stacker",
        category: "wooden-toys",
        categoryLabel: "Montessori Toys",
        image: "assets/prod_rainbow.png",
        images: ["assets/prod_rainbow.png", "assets/logo.png"],
        originalPrice: 1999.00,
        price: 1599.00,
        discount: 20,
        rating: 4.9,
        reviewsCount: 56,
        shortDesc: "Aesthetic wooden rainbow stacking blocks to promote creative exploration, spatial reasoning, and hand-eye coordination.",
        longDesc: "Our Waldorf-inspired rainbow stacker is handcrafted from solid FSC-certified beechwood and tinted with non-toxic, water-based stains. The soft matte texture makes it easy for little hands to stack, sort, and build. This open-ended toy can be used as bridges, tunnels, cradles for dolls, or abstract sculptures, growing alongside your child's imagination.",
        specs: {
            "Material": "Solid Sustainable Beechwood",
            "Origin": "Hand-painted in Germany",
            "Paint Style": "Toxin-Free Water-Based Stains",
            "Recommended Age": "12 Months +"
        },
        sizes: ["Standard", "Large"],
        reviews: [
            { name: "David L.", rating: 5, date: "June 02, 2026", comment: "Stunning open-ended toy! Looks beautiful on the nursery shelf and my 2-year-old plays with it every single day." },
            { name: "Emily P.", rating: 5, date: "May 10, 2026", comment: "Top tier craftsmanship. Solid wood pieces, no rough edges. Completely safe for teething toddlers." }
        ]
    },
    {
        id: 3,
        title: "AeroGlide Premium Stroller",
        category: "baby-gear",
        categoryLabel: "Baby Gear",
        image: "assets/prod_stroller.png",
        images: ["assets/prod_stroller.png", "assets/logo.png"],
        originalPrice: 14999.00,
        price: 11999.00,
        discount: 20,
        rating: 4.7,
        reviewsCount: 31,
        shortDesc: "Aesthetic, ultra-lightweight travel stroller with one-hand folding, multi-position recline, and dynamic shock absorbers.",
        longDesc: "The AeroGlide Premium Stroller is designed for the modern family on the move. Featuring a carbon graphite chassis, it is exceptionally strong yet lightweight. The water-resistant extendable UPF 50+ canopy shields your child from rain and sun, while the all-terrain puncture-proof wheels and advanced suspension deliver a smooth glide across any sidewalk.",
        specs: {
            "Frame Material": "Anodized Aerospace-Grade Aluminum",
            "Weight Capacity": "Up to 50 lbs",
            "Fold Dimensions": "20\" x 18\" x 10\" (Carry-On Approved)",
            "Safety Certification": "ASTM F833 Certified"
        },
        sizes: ["One Size"],
        reviews: [
            { name: "Michael S.", rating: 5, date: "May 29, 2026", comment: "Literally folds in one second with one hand. Fits perfectly in the overhead bin. Absolute lifesaver for travel!" },
            { name: "Rachel G.", rating: 4, date: "May 01, 2026", comment: "Very smooth steering and high-quality leather handlebar. Basket is slightly smaller than expected, but manageable." }
        ]
    },
    {
        id: 4,
        title: "Sage Linen Maternity Dress",
        category: "maternity",
        categoryLabel: "Maternity",
        image: "assets/prod_dress.png",
        images: ["assets/prod_dress.png", "assets/logo.png"],
        originalPrice: 3499.00,
        price: 2799.00,
        discount: 20,
        rating: 4.6,
        reviewsCount: 19,
        shortDesc: "Breathable organic linen midi dress featuring a flexible smocked bodice and nursing-friendly concealed zippers.",
        longDesc: "Embrace elegance and comfort throughout pregnancy and beyond. Crafted from 100% natural, breathable European flax linen, this midi dress adjusts to your changing silhouette. Hidden side zippers allow easy, discreet access for nursing, while the relaxed tier skirt drapes beautifully over a growing bump.",
        specs: {
            "Material": "100% European Flax Linen",
            "Nursing Access": "Invisible side zippers",
            "Care Instructions": "Dry clean or wash gentle cold, hang dry",
            "Features": "Smocked elastic bodice, side pockets"
        },
        sizes: ["XS", "S", "M", "L", "XL"],
        reviews: [
            { name: "Olivia R.", rating: 5, date: "June 03, 2026", comment: "The smocking makes it so comfortable! Fits perfectly at 32 weeks, and I know I can wear this postpartum too." }
        ]
    },
    {
        id: 5,
        title: "Organic Cotton Ribbed Knit Set",
        category: "baby-fashion",
        categoryLabel: "Baby & Kids Wear",
        image: "assets/prod_romper.png",
        images: ["assets/prod_romper.png", "assets/logo.png"],
        originalPrice: 1799.00,
        price: 1399.00,
        discount: 22,
        rating: 4.8,
        reviewsCount: 22,
        shortDesc: "Cozy two-piece pullover sweater and jogger pants set made from warm, breathable organic cotton yarns.",
        longDesc: "Keep your little explorer snug in this stylish knit set. Features a matching long-sleeve top and elastic-waist joggers with clean ribbed cuffs. Ideal for layering during cooler months, keeping kids comfortable in pure GOTS-certified cotton.",
        specs: {
            "Material": "100% GOTS Organic Cotton Yarn",
            "Set Includes": "1x Long-Sleeve Pullover, 1x Jogger Pants",
            "Care Instructions": "Wash inside out, lay flat to dry"
        },
        sizes: ["3-6M", "6-12M", "12-18M", "2T", "3T"],
        reviews: [
            { name: "Anna D.", rating: 5, date: "May 15, 2026", comment: "Thick knit fabric, beautiful sage color. Excellent value for a 2-piece set!" }
        ]
    },
    {
        id: 6,
        title: "Montessori Wooden Balancing Blocks",
        category: "wooden-toys",
        categoryLabel: "Montessori Toys",
        image: "assets/prod_rainbow.png",
        images: ["assets/prod_rainbow.png", "assets/logo.png"],
        originalPrice: 1199.00,
        price: 999.00,
        discount: 16,
        rating: 4.7,
        reviewsCount: 18,
        shortDesc: "Set of 10 faceted wooden stones to develop concentration, problem-solving, and hand-eye balance skills.",
        longDesc: "Unlike traditional square blocks, these gemstone-shaped balancing blocks feature asymmetrical flat surfaces that require deep focus to stack. Made from solid hardwood and coated in safe, natural pigments, they double as beautiful modern decor.",
        specs: {
            "Material": "Solid Hardwood",
            "Set Includes": "10x Blocks in various sizes & pastel shades",
            "Safety": "Non-toxic EN71 certified paint"
        },
        sizes: ["Standard (10 pcs)"],
        reviews: [
            { name: "John T.", rating: 5, date: "May 12, 2026", comment: "Extremely challenging and fun even for adults. My 4-year-old is hooked." }
        ]
    },
    {
        id: 7,
        title: "convertible 3-in-1 Wooden Crib",
        category: "baby-gear",
        categoryLabel: "Baby Gear",
        image: "assets/prod_stroller.png",
        images: ["assets/prod_stroller.png", "assets/logo.png"],
        originalPrice: 21999.00,
        price: 17999.00,
        discount: 18,
        rating: 4.9,
        reviewsCount: 14,
        shortDesc: "Beautiful solid pine crib that easily converts from infant crib, to toddler bed, to daybed as your child grows.",
        longDesc: "Crafted from sustainably sourced New Zealand pine wood, this modern mid-century crib features clean lines and tapered legs. Adjustable mattress support positions let you lower the height as your baby begins to sit and stand.",
        specs: {
            "Material": "New Zealand Pine Wood",
            "Conversions": "Crib, Toddler Bed, Daybed (Toddler rail included)",
            "Certifications": "GREENGUARD Gold Certified"
        },
        sizes: ["Standard Crib Size"],
        reviews: [
            { name: "Sophia V.", rating: 5, date: "April 20, 2026", comment: "Beautiful styling, extremely sturdy. GREENGUARD certification was very important for us." }
        ]
    },
    {
        id: 8,
        title: "Organic Bamboo Maternity Loungewear",
        category: "maternity",
        categoryLabel: "Maternity",
        image: "assets/prod_dress.png",
        images: ["assets/prod_dress.png", "assets/logo.png"],
        originalPrice: 3299.00,
        price: 2599.00,
        discount: 21,
        rating: 4.7,
        reviewsCount: 25,
        shortDesc: "Two-piece cozy loungewear set crafted from buttery-soft, thermal-regulating organic bamboo viscose.",
        longDesc: "Relax in absolute luxury. This set includes a drape-neck short-sleeve top and elastic drawstring trousers designed to fit comfortability under or over your bump. The cooling qualities of bamboo fabric help regulate body temperature for a peaceful night's rest.",
        specs: {
            "Material": "95% Bamboo Viscose, 5% Spandex",
            "Inseam": "29 inches",
            "Features": "Hypoallergenic, Moisture-wicking"
        },
        sizes: ["S", "M", "L", "XL"],
        reviews: [
            { name: "Laura H.", rating: 5, date: "June 05, 2026", comment: "Buttery soft is an understatement. I live in these sets now!" }
        ]
    },
    {
        id: 9,
        title: "art and craft ",
        category: "artandcraft",
        categoryLabel: "artandcraft",
        image: "assets/logo.png",
        images: ["assets/prod_dress.png", "assets/logo.png"],
        originalPrice: 3299.00,
        price: 2599.00,
        discount: 21,
        rating: 4.7,
        reviewsCount: 25,
        shortDesc: "Two-piece cozy loungewear set crafted from buttery-soft, thermal-regulating organic bamboo viscose.",
        longDesc: "Relax in absolute luxury. This set includes a drape-neck short-sleeve top and elastic drawstring trousers designed to fit comfortability under or over your bump. The cooling qualities of bamboo fabric help regulate body temperature for a peaceful night's rest.",
        specs: {
            "Material": "95% Bamboo Viscose, 5% Spandex",
            "Inseam": "29 inches",
            "Features": "Hypoallergenic, Moisture-wicking"
        },
        sizes: ["S", "M", "L", "XL"],
        reviews: [
            { name: "Laura H.", rating: 5, date: "June 05, 2026", comment: "Buttery soft is an understatement. I live in these sets now!" }
        ]
    },
    {
        id: 10,
        title: "art and craft 2 ",
        category: "artandcraft",
        categoryLabel: "artandcraft",
        image: "assets/logo.png",
        images: ["assets/prod_dress.png", "assets/logo.png"],
        originalPrice: 3299.00,
        price: 2000.00,
        discount: 21,
        rating: 4.7,
        reviewsCount: 25,
        shortDesc: "Two-piece cozy loungewear set crafted from buttery-soft, thermal-regulating organic bamboo viscose.",
        longDesc: "Relax in absolute luxury. This set includes a drape-neck short-sleeve top and elastic drawstring trousers designed to fit comfortability under or over your bump. The cooling qualities of bamboo fabric help regulate body temperature for a peaceful night's rest.",
        specs: {
            "Material": "95% Bamboo Viscose, 5% Spandex",
            "Inseam": "29 inches",
            "Features": "Hypoallergenic, Moisture-wicking"
        },
        sizes: ["S", "M", "L", "XL"],
        reviews: [
            { name: "Laura H.", rating: 5, date: "June 05, 2026", comment: "Buttery soft is an understatement. I live in these sets now!" }
        ]
    }
];

// Dynamic synchronized catalog proxy reading live products from StoreData
const PRODUCT_CATALOG = new Proxy([], {
    get(target, prop) {
        const liveProducts = (typeof StoreData !== 'undefined' && StoreData.getProducts)
            ? StoreData.getProducts()
            : FALLBACK_PRODUCT_CATALOG;
        if (prop === 'length') return liveProducts.length;
        if (prop in Array.prototype) {
            const val = liveProducts[prop];
            return typeof val === 'function' ? val.bind(liveProducts) : val;
        }
        return liveProducts[prop];
    }
});

// 2. STATE STORE
const STATE = {
    cart: JSON.parse(localStorage.getItem('pretute_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('pretute_wishlist')) || [],
    promoApplied: JSON.parse(localStorage.getItem('pretute_promo')) || null,
    activeSlide: 0,
    currentView: "home",
    carouselInterval: null
};

// COUPON CODE LOGIC RULES
const STATIC_PROMOTIONS = {
    "PRETUTE20": { type: "flat_percent", value: 20, description: "Flat 20% Off Order" },
    "GEAR25": { type: "category_percent", category: "baby-gear", value: 25, description: "25% Off Nursery Gear" },
    "MOM15": { type: "min_spend_maternity", value: 1000, threshold: 4999, description: "₹1,000 Off Maternity (₹4,999 Min Spend)" },
    "PLAYFREE": { type: "flat_amount", value: 500, description: "Flat ₹500 Off Toys/Accessories" }
};

// Dynamic Promotions proxy reading live coupons from StoreData
const PROMOTIONS = new Proxy({}, {
    get(target, prop) {
        if (typeof prop !== 'string') return target[prop];
        const code = prop.toUpperCase();
        if (typeof StoreData !== 'undefined' && StoreData.getCoupons) {
            const found = StoreData.getCoupons().find(c => c.code === code && c.status === "active" && !c.isExpired);
            if (found) {
                let pType = "flat_percent";
                if (found.type === "flat" || found.type === "flat_amount") pType = "flat_amount";
                else if (found.type === "category") pType = "category_percent";
                return {
                    code: found.code,
                    type: pType,
                    value: found.value,
                    threshold: found.minSpend || 0,
                    description: found.description || `${found.value}% Off`,
                    category: found.category
                };
            }
        }
        return STATIC_PROMOTIONS[code] || undefined;
    },
    has(target, prop) {
        if (typeof prop !== 'string') return false;
        const code = prop.toUpperCase();
        if (typeof StoreData !== 'undefined' && StoreData.getCoupons) {
            const found = StoreData.getCoupons().find(c => c.code === code && c.status === "active" && !c.isExpired);
            if (found) return true;
        }
        return code in STATIC_PROMOTIONS;
    }
});

// ==========================================================================
// INITIALIZATION AND ROUTER
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initApp();
    setupRouter();
    setupHeaderUtilities();
    renderHeroBanners();
    setupSearchSuggestions();
    setupDealCountdown();
    setupCartDrawerActions();
    setupProductDetailsZoom();
    setupContactFormValidation();
    setupPromoApplication();
    setupCheckoutSubmission();
    setupNewsletter();

    // Initial render badges
    updateBadges();

    // Synchronize Storefront Settings, Banners, and Categories from Back Panel
    applyStoreSettings();
    renderWordPressCategories();

    // Listen for Back Panel updates across browser tabs
    window.addEventListener("pretute_data_sync", () => {
        applyStoreSettings();
        renderHeroBanners();
        renderWordPressCategories();
        if (STATE.currentView === "home") renderHomeProducts();
        if (STATE.currentView === "category") {
            const cat = window.location.hash.split("/")[1];
            if (cat) renderCategoryView(cat);
        }
        if (STATE.currentView === "details") {
            const id = parseInt(window.location.hash.split("/")[1]);
            if (id) renderProductDetails(id);
        }
    });

});

function applyStoreSettings() {
    if (typeof StoreData !== 'undefined' && StoreData.getSettings) {
        const settings = StoreData.getSettings();
        const bannerEl = document.querySelector(".header-top p");
        if (bannerEl && settings.announcementText) {
            bannerEl.innerHTML = settings.announcementText;
        }
    }
}

function initApp() {
    // Scroll behavior - Hide sub-navigation (Home, Services, About, Reviews, etc.) on scroll down
    const header = document.getElementById("mainHeader");
    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
            header.classList.add("sticky");
        } else {
            header.classList.remove("scrolled");
            header.classList.remove("sticky");
        }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Logo click home trigger (scroll to top smoothly)
    document.getElementById("logoLink")?.addEventListener("click", () => {
        window.location.hash = "#home";
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Home nav links click smooth scroll to top
    document.querySelectorAll('a[href="#home"]').forEach(link => {
        link.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
}

function setupRouter() {
    const handleRoute = () => {
        const hash = window.location.hash || "#home";
        let viewId = "homeView";

        // Intercept Modal routes
        if (hash === "#login") {
            window.openCustomerAuthModal?.("signin");
            return;
        }
        if (hash === "#orders") {
            window.openCustomerOrdersModal?.();
            return;
        }

        // Hide all views first
        document.querySelectorAll(".page-view").forEach(v => {
            v.classList.remove("active");
            v.style.display = "none";
        });

        // Clear sub-elements
        document.getElementById("searchSuggestions")?.classList.remove("active");

        let targetScrollSection = null;

        // Parse Hash parameters
        if (hash === "#home") {
            viewId = "homeView";
            STATE.currentView = "home";
            renderHomeProducts();
            startCarouselAutoPlay();
        } else if (hash === "#services" || hash === "#about" || hash === "#reviews" || hash === "#why-us") {
            viewId = "homeView";
            STATE.currentView = "home";
            renderHomeProducts();
            startCarouselAutoPlay();
            targetScrollSection = hash.substring(1);
        } else if (hash.startsWith("#category/")) {
            viewId = "searchView";
            STATE.currentView = "category";
            const categoryName = hash.split("/")[1];
            renderCategoryView(categoryName);
            stopCarouselAutoPlay();
        } else if (hash.startsWith("#product/")) {
            viewId = "detailsView";
            STATE.currentView = "details";
            const productId = parseInt(hash.split("/")[1]);
            renderProductDetails(productId);
            stopCarouselAutoPlay();
        } else if (hash === "#cart") {
            viewId = "cartView";
            STATE.currentView = "cart";
            renderCartPage();
            stopCarouselAutoPlay();
        } else if (hash === "#contact") {
            viewId = "contactView";
            STATE.currentView = "contact";
            stopCarouselAutoPlay();
        } else if (hash === "#wishlist") {
            viewId = "wishlistView";
            STATE.currentView = "wishlist";
            renderWishlist();
            stopCarouselAutoPlay();
        } else if (hash === "#login") {
            window.openCustomerAuthModal?.("signin");
            return;
        } else if (hash === "#profile") {
            window.openCustomerProfileModal?.();
            return;
        } else if (hash === "#orders") {
            window.openCustomerOrdersModal?.();
            return;
        } else if (hash === "#refund-policy") {
            window.openRefundPolicyModal?.();
            return;
        } else if (hash === "#admin") {
            // Secret admin route: redirect directly to back panel
            window.location.href = "admin.html";
            return;
        } else {
            // Default Fallback
            viewId = "homeView";
            window.location.hash = "#home";
        }

        // Show parsed view
        const activeView = document.getElementById(viewId);
        if (activeView) {
            activeView.style.display = "block";
            setTimeout(() => activeView.classList.add("active"), 50);
        }

        // Scroll to target section or top
        if (targetScrollSection) {
            setTimeout(() => {
                const targetEl = document.getElementById(targetScrollSection);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // Update Nav Menu Highlights
        updateActiveNavLinks(hash);
    };

    window.addEventListener("hashchange", handleRoute);
    // Trigger router on load
    handleRoute();
}

function updateActiveNavLinks(hash) {
    document.querySelectorAll(".nav-link").forEach(link => {
        if (link.getAttribute("href") === hash) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// ==========================================================================
// RENDER MODULES
// ==========================================================================

// Render Main Home Catalog Product Cards from StoreData
function renderHomeProducts() {
    const grid = document.getElementById("homeProductsGrid");
    if (!grid) return;

    grid.innerHTML = "";
    const allProducts = (typeof StoreData !== 'undefined' && StoreData.getProducts)
        ? StoreData.getProducts()
        : PRODUCT_CATALOG;

    // Filter out deactivated products from storefront
    const products = (allProducts || []).filter(p => p.status !== "deactivated");

    if (!products || products.length === 0) {
        grid.innerHTML = "<p style='text-align: center; grid-column: 1/-1;'>No products in store. Add products from the Back Panel!</p>";
        return;
    }

    products.forEach(prod => {
        grid.appendChild(createProductCard(prod));
    });
}

// Helper to create product cards
function createProductCard(prod) {
    const isWished = STATE.wishlist.includes(prod.id);

    // WordPress/WooCommerce style stock and availability verification
    const isOutOfStock = prod.stockStatus === "out_of_stock" || (typeof prod.stock !== 'undefined' && prod.stock <= 0);
    const isUnavailable = prod.availability === "unavailable";
    const isBackorder = prod.stockStatus === "on_backorder";

    let badgeHTML = `<span class="card-badge">${prod.discount}% OFF</span>`;
    let cardExtraClasses = "";
    let isPurchaseDisabled = false;
    let buttonTitle = "Add to bag";

    if (isUnavailable) {
        badgeHTML = `<span class="card-badge unavailable"><i class="fa-solid fa-ban"></i> Unavailable</span>`;
        cardExtraClasses = " is-unavailable";
        isPurchaseDisabled = true;
        buttonTitle = "Currently unavailable";
    } else if (isOutOfStock) {
        badgeHTML = `<span class="card-badge out-of-stock"><i class="fa-solid fa-circle-xmark"></i> Out of Stock</span>`;
        cardExtraClasses = " is-out-of-stock";
        isPurchaseDisabled = true;
        buttonTitle = "Out of Stock";
    } else if (isBackorder) {
        badgeHTML = `<span class="card-badge backorder"><i class="fa-solid fa-clock"></i> Backorder</span>`;
    }

    const card = document.createElement("div");
    card.className = "product-card" + cardExtraClasses;
    card.setAttribute("data-id", prod.id);

    card.innerHTML = `
        <div class="card-img-wrapper">
            ${badgeHTML}
            <button class="card-wishlist-btn ${isWished ? 'wished' : ''}" aria-label="Wishlist">
                <i class="${isWished ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <img src="${prod.image}" alt="${prod.title}" loading="lazy" onerror="this.src='assets/logo.png'">
            <div class="card-hover-actions">
                <button class="btn btn-quickview quickview-trigger" data-id="${prod.id}">Quick View</button>
            </div>
        </div>
        <div class="card-body">
            <span class="card-category">${prod.categoryLabel}</span>
            <h4 class="card-title"><a href="#product/${prod.id}">${prod.title}</a></h4>
            <div class="card-ratings">
                <div class="stars">
                    ${getRatingStarsHTML(prod.rating)}
                </div>
                <span class="rating-score">${prod.rating}</span>
            </div>
            <div class="card-delivery-badge">
                <i class="fa-solid fa-truck-fast"></i> 2-4 Days Delivery
            </div>
            <div class="card-price-row">
                <div class="card-prices">
                    <span class="disc-price">₹${prod.price.toFixed(2)}</span>
                    <span class="orig-price">₹${prod.originalPrice.toFixed(2)}</span>
                </div>
                <div class="card-actions-group">
                    <button class="btn-card-buynow buynow-trigger ${isPurchaseDisabled ? 'disabled' : ''}" ${isPurchaseDisabled ? 'disabled' : ''} data-id="${prod.id}" title="Buy Now">
                        <i class="fa-solid fa-bolt"></i> Buy Now
                    </button>
                    <button class="btn-add-cart-circle add-cart-trigger ${isPurchaseDisabled ? 'disabled' : ''}" ${isPurchaseDisabled ? 'disabled' : ''} data-id="${prod.id}" aria-label="${buttonTitle}" title="${buttonTitle}">
                        <i class="fa-solid ${isPurchaseDisabled ? 'fa-ban' : 'fa-basket-shopping'}"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Event Bindings
    card.querySelector(".card-wishlist-btn").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(prod.id);
    });

    card.querySelector(".add-cart-trigger").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isPurchaseDisabled) {
            showNotification(isUnavailable ? "This product is currently unavailable." : "This product is out of stock.", "warning");
            return;
        }
        addToCart(prod.id, 1, prod.sizes[0] || "Standard");
        openCartDrawer();
    });

    card.querySelector(".buynow-trigger")?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isPurchaseDisabled) {
            showNotification(isUnavailable ? "This product is currently unavailable." : "This product is out of stock.", "warning");
            return;
        }
        addToCart(prod.id, 1, prod.sizes[0] || "Standard");
        window.location.hash = "#cart";
    });

    card.querySelector(".quickview-trigger").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openQuickViewModal(prod.id);
    });

    return card;
}

// Generate stars markup
function getRatingStarsHTML(rating) {
    let html = "";
    const floor = Math.floor(rating);
    const half = rating - floor >= 0.4;
    for (let i = 1; i <= 5; i++) {
        if (i <= floor) {
            html += `<i class="fa-solid fa-star"></i>`;
        } else if (i === floor + 1 && half) {
            html += `<i class="fa-solid fa-star-half-stroke"></i>`;
        } else {
            html += `<i class="fa-regular fa-star"></i>`;
        }
    }
    return html;
}

// Category / Search Filter View
function renderCategoryView(catKey) {
    const grid = document.getElementById("searchProductsGrid");
    const title = document.getElementById("searchResultTitle");
    const count = document.getElementById("searchResultsCount");
    const noResults = document.getElementById("noResultsState");

    if (!grid || !title || !count) return;

    let filtered = [];
    let titleText = "";

    const catObj = (typeof StoreData !== 'undefined' && StoreData.getCategories)
        ? StoreData.getCategories().find(c => c.slug === catKey)
        : null;

    if (catObj && catObj.status === "deactivated") {
        title.textContent = `${catObj.name} (Currently Inactive)`;
        count.textContent = `This category is currently deactivated by store administrator.`;
        grid.innerHTML = "";
        grid.style.display = "none";
        noResults.style.display = "block";
        return;
    }

    // Filter active catalog items
    const liveCatalog = PRODUCT_CATALOG.filter(p => p.status !== "deactivated");

    if (catKey === "all") {
        filtered = liveCatalog;
        titleText = "All Collections";
    } else {
        filtered = liveCatalog.filter(p => p.category === catKey);
        const catMap = {
            "baby-fashion": "Baby & Kids Apparel",
            "wooden-toys": "Montessori Play & Toys",
            "baby-gear": "Nursery Items & Strollers",
            "maternity": "Elegant Maternity Wear",
            "diy-kit": "DIY Kit",
            "resin-art": "Resin Art",
            "decorative-shop": "Decorative Shop",
            "candle": "Candle",
            "corporate-gifts": "Corporate Gifts",
            "home-decor": "Home Decor",
            "treasure-keeps": "Treasure Keeps"
        };
        titleText = (catObj ? catObj.name : catMap[catKey]) || "Category Showcase";
    }

    title.textContent = titleText;
    count.textContent = `${filtered.length} items found`;
    grid.innerHTML = "";

    if (filtered.length === 0) {
        noResults.style.display = "block";
        grid.style.display = "none";
    } else {
        noResults.style.display = "none";
        grid.style.display = "grid";
        filtered.forEach(p => {
            grid.appendChild(createProductCard(p));
        });
    }
}

// Search queries from form
function handleSearchQuery(query) {
    const grid = document.getElementById("searchProductsGrid");
    const title = document.getElementById("searchResultTitle");
    const count = document.getElementById("searchResultsCount");
    const noResults = document.getElementById("noResultsState");

    window.location.hash = `#search/query`;

    // Hide home/details/etc., show search view
    document.querySelectorAll(".page-view").forEach(v => {
        v.classList.remove("active");
        v.style.display = "none";
    });

    const searchView = document.getElementById("searchView");
    searchView.style.display = "block";
    setTimeout(() => searchView.classList.add("active"), 50);

    const matchQuery = query.toLowerCase().trim();
    // Exclude deactivated products from search results
    const filtered = PRODUCT_CATALOG.filter(p =>
        p.status !== "deactivated" && (
            p.title.toLowerCase().includes(matchQuery) ||
            p.categoryLabel.toLowerCase().includes(matchQuery) ||
            p.longDesc.toLowerCase().includes(matchQuery)
        )
    );

    title.textContent = `Search results for: "${query}"`;
    count.textContent = `${filtered.length} items found`;
    grid.innerHTML = "";

    if (filtered.length === 0) {
        noResults.style.display = "block";
        grid.style.display = "none";
    } else {
        noResults.style.display = "none";
        grid.style.display = "grid";
        filtered.forEach(p => {
            grid.appendChild(createProductCard(p));
        });
    }
}

// Render product details page
function renderProductDetails(productId) {
    const prod = PRODUCT_CATALOG.find(p => p.id === productId);
    if (!prod || prod.status === "deactivated") {
        showNotification("This product is currently inactive or unavailable.", "warning");
        window.location.hash = "#home";
        return;
    }

    // Breadcrumbs
    document.getElementById("breadcrumbCategory").innerHTML = `<a href="#category/${prod.category}">${prod.categoryLabel}</a>`;
    document.getElementById("breadcrumbProduct").textContent = prod.title;

    // Gallery
    const mainImg = document.getElementById("mainDetailImg");
    mainImg.src = prod.image;
    mainImg.alt = prod.title;

    const thumbnails = document.getElementById("detailThumbnails");
    thumbnails.innerHTML = "";
    (prod.images || [prod.image]).forEach((imgSrc, index) => {
        const thumb = document.createElement("div");
        thumb.className = `thumb-card ${index === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${imgSrc}" alt="${prod.title}">`;
        thumb.addEventListener("click", () => {
            document.querySelectorAll(".thumb-card").forEach(t => t.classList.remove("active"));
            thumb.classList.add("active");
            mainImg.src = imgSrc;
            setupProductDetailsZoom();
        });
        thumbnails.appendChild(thumb);
    });

    // Info panel
    document.getElementById("detailTitle").textContent = prod.title;
    document.getElementById("detailDiscountPrice").textContent = `₹${prod.price.toFixed(2)}`;
    document.getElementById("detailOriginalPrice").textContent = `₹${prod.originalPrice.toFixed(2)}`;
    document.getElementById("detailDiscountPercentage").textContent = `${prod.discount}% OFF`;
    document.getElementById("detailShortDesc").textContent = prod.shortDesc;
    document.getElementById("detailStars").innerHTML = getRatingStarsHTML(prod.rating);
    document.getElementById("detailReviewsCount").textContent = `(${prod.reviewsCount} Customer Reviews)`;

    // WordPress/WooCommerce Stock & Availability Pill on Details Page
    const isOutOfStock = prod.stockStatus === "out_of_stock" || (typeof prod.stock !== 'undefined' && prod.stock <= 0);
    const isUnavailable = prod.availability === "unavailable";
    const isBackorder = prod.stockStatus === "on_backorder";

    const stockPill = document.getElementById("detailStockAvailability");
    if (stockPill) {
        if (isUnavailable) {
            stockPill.className = "stock-availability-pill unavailable";
            stockPill.innerHTML = `<i class="fa-solid fa-ban"></i> Currently Unavailable`;
        } else if (isOutOfStock) {
            stockPill.className = "stock-availability-pill out-of-stock";
            stockPill.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Out of Stock`;
        } else if (isBackorder) {
            stockPill.className = "stock-availability-pill backorder";
            stockPill.innerHTML = `<i class="fa-solid fa-clock"></i> Available on Backorder`;
        } else {
            const stockCountText = prod.stock > 0 ? ` (${prod.stock} units left)` : "";
            stockPill.className = "stock-availability-pill in-stock";
            stockPill.innerHTML = `<i class="fa-solid fa-circle-check"></i> In Stock${stockCountText}`;
        }
    }

    // Sizes Chips
    const sizeBox = document.getElementById("sizeOptions");
    sizeBox.innerHTML = "";
    (prod.sizes || ["Standard"]).forEach((sz, index) => {
        const btn = document.createElement("button");
        btn.className = `size-chip ${index === 0 ? 'active' : ''}`;
        btn.textContent = sz;
        btn.addEventListener("click", () => {
            document.querySelectorAll(".size-chip").forEach(c => c.classList.remove("active"));
            btn.classList.add("active");
        });
        sizeBox.appendChild(btn);
    });

    // Reset Qty input
    const qtyInput = document.getElementById("detailQtyInput");
    if (qtyInput) {
        qtyInput.value = 1;
        qtyInput.disabled = isUnavailable || isOutOfStock;
    }

    // Product detailed text tabs
    document.getElementById("detailLongDesc").textContent = prod.longDesc || prod.shortDesc || "";

    const specsTable = document.getElementById("detailSpecsTable");
    specsTable.innerHTML = "";
    if (prod.specs) {
        for (const [key, value] of Object.entries(prod.specs)) {
            specsTable.innerHTML += `
                <tr>
                    <td>${key}</td>
                    <td>${value}</td>
                </tr>
            `;
        }
    }

    // Reviews list
    const reviewsList = document.getElementById("detailReviewsList");
    reviewsList.innerHTML = "";
    if (prod.reviews && prod.reviews.length > 0) {
        prod.reviews.forEach(rev => {
            reviewsList.innerHTML += `
                <div class="review-item">
                    <div class="review-header">
                        <span class="reviewer-name">${rev.name}</span>
                        <span class="review-date">${rev.date}</span>
                    </div>
                    <div class="review-stars">
                        ${getRatingStarsHTML(rev.rating)}
                    </div>
                    <p class="review-comment">"${rev.comment}"</p>
                </div>
            `;
        });
    } else {
        reviewsList.innerHTML = `<p>No reviews yet for this product. Be the first to share your thoughts!</p>`;
    }

    // Wishlist state on detail button
    const wishBtn = document.getElementById("detailWishlistBtn");
    if (STATE.wishlist.includes(prod.id)) {
        wishBtn.classList.add("wished");
        wishBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    } else {
        wishBtn.classList.remove("wished");
        wishBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    }

    // Bind Detail Action buttons with Out of Stock / Unavailable protection
    const addCartBtn = document.getElementById("detailAddToCartBtn");
    const buyNowBtn = document.getElementById("detailBuyNowBtn");

    const newAddCart = addCartBtn.cloneNode(true);
    const newBuyNow = buyNowBtn.cloneNode(true);
    const newWishBtn = wishBtn.cloneNode(true);

    const isPurchaseDisabled = isUnavailable || isOutOfStock;
    newAddCart.disabled = isPurchaseDisabled;
    newBuyNow.disabled = isPurchaseDisabled;

    if (isPurchaseDisabled) {
        newAddCart.innerHTML = `<i class="fa-solid fa-ban"></i> ${isUnavailable ? 'Unavailable' : 'Out of Stock'}`;
        newBuyNow.textContent = isUnavailable ? 'Unavailable' : 'Out of Stock';
        newAddCart.classList.add("disabled");
        newBuyNow.classList.add("disabled");
    } else {
        newAddCart.innerHTML = `<i class="fa-solid fa-bag-shopping"></i> Add to Bag`;
        newBuyNow.textContent = "Buy Now";
        newAddCart.classList.remove("disabled");
        newBuyNow.classList.remove("disabled");
    }

    addCartBtn.parentNode.replaceChild(newAddCart, addCartBtn);
    buyNowBtn.parentNode.replaceChild(newBuyNow, buyNowBtn);
    wishBtn.parentNode.replaceChild(newWishBtn, wishBtn);

    if (!isPurchaseDisabled) {
        newAddCart.addEventListener("click", () => {
            const qty = parseInt(document.getElementById("detailQtyInput").value) || 1;
            const selectedSize = document.querySelector(".size-chip.active")?.textContent || "Standard";
            addToCart(prod.id, qty, selectedSize);
            openCartDrawer();
        });

        newBuyNow.addEventListener("click", () => {
            const qty = parseInt(document.getElementById("detailQtyInput").value) || 1;
            const selectedSize = document.querySelector(".size-chip.active")?.textContent || "Standard";
            addToCart(prod.id, qty, selectedSize);
            window.location.hash = "#cart";
        });
    }

    newWishBtn.addEventListener("click", () => {
        toggleWishlist(prod.id);
        if (STATE.wishlist.includes(prod.id)) {
            newWishBtn.classList.add("wished");
            newWishBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        } else {
            newWishBtn.classList.remove("wished");
            newWishBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        }
    });

    // Related Products showcase (only active products)
    const relatedGrid = document.getElementById("relatedProductsGrid");
    relatedGrid.innerHTML = "";
    const related = PRODUCT_CATALOG.filter(p => p.category === prod.category && p.id !== prod.id && p.status !== "deactivated").slice(0, 4);
    related.forEach(rp => {
        relatedGrid.appendChild(createProductCard(rp));
    });

    setupProductDetailsZoom();
}

// Render Full Checkout Cart View
function renderCartPage() {
    const list = document.getElementById("cartPageItemsList");
    const layout = document.getElementById("cartPageLayout");
    const emptyState = document.getElementById("emptyCartPage");

    if (!list || !layout || !emptyState) return;

    if (STATE.cart.length === 0) {
        layout.style.display = "none";
        emptyState.style.display = "block";
        return;
    }

    layout.style.display = "grid";
    emptyState.style.display = "none";
    list.innerHTML = "";

    STATE.cart.forEach((item, index) => {
        const prod = PRODUCT_CATALOG.find(p => p.id === item.productId);
        if (!prod) return;

        const card = document.createElement("div");
        card.className = "cart-item-card";
        card.innerHTML = `
            <img src="${prod.image}" alt="${prod.title}">
            <div class="item-details">
                <h4 class="item-title"><a href="#product/${prod.id}">${prod.title}</a></h4>
                <p class="item-meta">Size: <strong>${item.size}</strong></p>
                <div class="quantity-selector">
                    <button class="qty-btn dec" data-index="${index}">-</button>
                    <input type="number" class="qty-input" value="${item.quantity}" min="1" readonly>
                    <button class="qty-btn inc" data-index="${index}">+</button>
                </div>
            </div>
            <div class="item-price-block">
                <span class="disc-price">₹${(prod.price * item.quantity).toFixed(2)}</span>
                <span class="orig-price">₹${(prod.originalPrice * item.quantity).toFixed(2)}</span>
            </div>
            <button class="remove-item-btn" data-index="${index}" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
        `;

        // Bindings
        card.querySelector(".dec").addEventListener("click", () => updateCartQty(index, -1));
        card.querySelector(".inc").addEventListener("click", () => updateCartQty(index, 1));
        card.querySelector(".remove-item-btn").addEventListener("click", () => removeCartItem(index));

        list.appendChild(card);
    });

    calculateCartPricing();

    // Auto-fill customer checkout details if signed in
    const currentCust = (typeof StoreData !== 'undefined' && StoreData.getCurrentCustomer) ? StoreData.getCurrentCustomer() : null;
    const autofillNotice = document.getElementById("checkoutAutofillNotice");
    const nameInput = document.getElementById("custFullName");
    const phoneInput = document.getElementById("custPhone");
    const emailInput = document.getElementById("custEmail");
    const addrInput = document.getElementById("custAddress");
    const cityInput = document.getElementById("custCity");
    const pinInput = document.getElementById("custPincode");

    if (currentCust) {
        if (autofillNotice) autofillNotice.style.display = "block";
        if (nameInput && !nameInput.value) nameInput.value = currentCust.name || "";
        if (phoneInput && !phoneInput.value) phoneInput.value = currentCust.phone || "";
        if (emailInput && !emailInput.value) emailInput.value = currentCust.email || "";

        const addr = currentCust.address || {};
        if (addrInput && !addrInput.value) addrInput.value = addr.street || "";
        if (cityInput && !cityInput.value) cityInput.value = addr.city || "";
        if (pinInput && !pinInput.value) pinInput.value = addr.pincode || "";
    } else {
        if (autofillNotice) autofillNotice.style.display = "none";
    }

    // Live update of estimated delivery date in checkout summary
    const checkoutDeliverySpan = document.getElementById("checkoutEstDeliveryDate");
    if (checkoutDeliverySpan) {
        const pin = (pinInput && pinInput.value) || localStorage.getItem("pretute_user_pincode") || "400705";
        checkoutDeliverySpan.textContent = getCalculatedDeliveryString(pin);

        pinInput?.addEventListener("input", () => {
            if (pinInput.value.length === 6) {
                checkoutDeliverySpan.textContent = getCalculatedDeliveryString(pinInput.value);
            }
        });
    }
}

// Render Wishlist Page
function renderWishlist() {
    const grid = document.getElementById("wishlistProductsGrid");
    const emptyState = document.getElementById("emptyWishlistState");

    if (!grid || !emptyState) return;

    grid.innerHTML = "";

    if (STATE.wishlist.length === 0) {
        emptyState.style.display = "block";
        grid.style.display = "none";
    } else {
        emptyState.style.display = "none";
        grid.style.display = "grid";
        STATE.wishlist.forEach(id => {
            const prod = PRODUCT_CATALOG.find(p => p.id === id);
            if (prod) {
                grid.appendChild(createProductCard(prod));
            }
        });
    }
}

// Render dynamic elements inside Cart Drawer
function renderCartDrawer() {
    const body = document.getElementById("cartDrawerBody");
    const footer = document.getElementById("cartDrawerFooter");
    const countSpan = document.getElementById("cartDrawerCount");

    if (!body || !footer || !countSpan) return;

    const totalCount = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
    countSpan.textContent = totalCount;

    if (STATE.cart.length === 0) {
        body.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Your bag is empty!</p>
                <button class="btn btn-primary" id="drawerContinueBtn">Start Shopping</button>
            </div>
        `;
        footer.style.display = "none";

        // bind start shopping button in empty message
        document.getElementById("drawerContinueBtn")?.addEventListener("click", () => {
            closeCartDrawer();
            window.location.hash = "#home";
        });
        return;
    }

    footer.style.display = "block";
    body.innerHTML = "";

    STATE.cart.forEach((item, index) => {
        const prod = PRODUCT_CATALOG.find(p => p.id === item.productId);
        if (!prod) return;

        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item-card";
        cartItemDiv.innerHTML = `
            <img src="${prod.image}" alt="${prod.title}">
            <div class="item-details">
                <h5 class="item-title" style="font-size:0.88rem;"><a href="#product/${prod.id}">${prod.title}</a></h5>
                <p class="item-meta" style="margin-bottom:6px;">Size: ${item.size}</p>
                <div class="quantity-selector" style="height:32px;">
                    <button class="qty-btn dec-drawer" data-index="${index}">-</button>
                    <input type="number" class="qty-input" value="${item.quantity}" style="width:24px; font-size:0.85rem;" readonly>
                    <button class="qty-btn inc-drawer" data-index="${index}">+</button>
                </div>
            </div>
            <div class="item-price-block" style="flex-direction:column; align-items:flex-end; gap:0;">
                <span class="disc-price" style="font-size:0.95rem;">₹${(prod.price * item.quantity).toFixed(2)}</span>
            </div>
            <button class="remove-item-btn" data-index="${index}" style="font-size:0.95rem;" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
        `;

        cartItemDiv.querySelector(".dec-drawer").addEventListener("click", () => updateCartQty(index, -1));
        cartItemDiv.querySelector(".inc-drawer").addEventListener("click", () => updateCartQty(index, 1));
        cartItemDiv.querySelector(".remove-item-btn").addEventListener("click", () => removeCartItem(index));

        body.appendChild(cartItemDiv);
    });

    const subtotal = STATE.cart.reduce((sum, item) => {
        const prod = PRODUCT_CATALOG.find(p => p.id === item.productId);
        return sum + (prod ? prod.price * item.quantity : 0);
    }, 0);

    document.getElementById("cartDrawerSubtotal").textContent = `₹${subtotal.toFixed(2)}`;
}


// ==========================================================================
// CORE SHOPPING STATE LOGIC FUNCTIONS
// ==========================================================================

function updateBadges() {
    const totalCount = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartBadge").textContent = totalCount;
    document.getElementById("wishlistBadge").textContent = STATE.wishlist.length;
}

function addToCart(productId, quantity, size) {
    // Check if item already exists with matching size
    const existingIndex = STATE.cart.findIndex(i => i.productId === productId && i.size === size);
    if (existingIndex > -1) {
        STATE.cart[existingIndex].quantity += quantity;
    } else {
        STATE.cart.push({ productId, quantity, size });
    }

    // Save to local storage
    localStorage.setItem('pretute_cart', JSON.stringify(STATE.cart));
    updateBadges();
    renderCartDrawer();

    // If we're on full cart page, refresh it
    if (STATE.currentView === "cart") {
        renderCartPage();
    }
}

function updateCartQty(index, change) {
    if (!STATE.cart[index]) return;

    STATE.cart[index].quantity += change;

    if (STATE.cart[index].quantity <= 0) {
        STATE.cart.splice(index, 1);
    }

    localStorage.setItem('pretute_cart', JSON.stringify(STATE.cart));
    updateBadges();
    renderCartDrawer();

    if (STATE.currentView === "cart") {
        renderCartPage();
    }
}

function removeCartItem(index) {
    if (!STATE.cart[index]) return;

    STATE.cart.splice(index, 1);
    localStorage.setItem('pretute_cart', JSON.stringify(STATE.cart));
    updateBadges();
    renderCartDrawer();

    if (STATE.currentView === "cart") {
        renderCartPage();
    }
}

function toggleWishlist(productId) {
    const index = STATE.wishlist.indexOf(productId);
    if (index > -1) {
        STATE.wishlist.splice(index, 1);
        showNotification("Removed from wishlist");
    } else {
        STATE.wishlist.push(productId);
        showNotification("Added to wishlist", "success");
    }

    localStorage.setItem('pretute_wishlist', JSON.stringify(STATE.wishlist));
    updateBadges();

    // refresh current view configurations
    if (STATE.currentView === "home") {
        renderHomeProducts();
    } else if (STATE.currentView === "category") {
        const hash = window.location.hash || "#home";
        renderCategoryView(hash.split("/")[1]);
    } else if (STATE.currentView === "wishlist") {
        renderWishlist();
    }
}

// Toast notification helper
function showNotification(message, type = "info") {
    // create element
    const toast = document.createElement("div");
    toast.className = `toast-banner ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles temporarily if needed, though they exist in stylesheet
    document.body.appendChild(toast);

    // animate
    setTimeout(() => toast.classList.add("active"), 10);
    setTimeout(() => {
        toast.classList.remove("active");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Calculate full Checkout Subtotals and applied Coupon savings
function calculateCartPricing() {
    const subtotalSpan = document.getElementById("cartPageSubtotal");
    const savingsSpan = document.getElementById("cartPagePromoSavings");
    const grandTotalSpan = document.getElementById("cartPageGrandTotal");
    const itemsCountSpan = document.getElementById("cartPageItemsCount");

    const totalCount = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (itemsCountSpan) itemsCountSpan.textContent = totalCount;

    const subtotal = STATE.cart.reduce((sum, item) => {
        const prod = PRODUCT_CATALOG.find(p => String(p.id) === String(item.productId));
        return sum + (prod ? prod.price * item.quantity : 0);
    }, 0);

    if (subtotalSpan) subtotalSpan.textContent = `₹${subtotal.toFixed(2)}`;

    let discountSavings = 0;

    // Apply Promo rules
    if (STATE.promoApplied) {
        if (!PROMOTIONS[STATE.promoApplied]) {
            showNotification(`Applied promo code ${STATE.promoApplied} has expired or is inactive.`, "warning");
            STATE.promoApplied = null;
            localStorage.removeItem("pretute_promo");
            const feedback = document.getElementById("promoFeedback");
            if (feedback) {
                feedback.textContent = "Previously applied coupon has expired or was deactivated.";
                feedback.className = "promo-feedback text-danger";
            }
        } else {
            const promo = PROMOTIONS[STATE.promoApplied];

            if (promo.type === "flat_percent") {
                discountSavings = subtotal * (promo.value / 100);
            }
            else if (promo.type === "category_percent") {
                // only apply discount to matching category items
                const catTotal = STATE.cart.reduce((sum, item) => {
                    const prod = PRODUCT_CATALOG.find(p => String(p.id) === String(item.productId));
                    if (prod && prod.category === promo.category) {
                        return sum + (prod.price * item.quantity);
                    }
                    return sum;
                }, 0);
                discountSavings = catTotal * (promo.value / 100);
            }
            else if (promo.type === "min_spend_maternity") {
                const maternityTotal = STATE.cart.reduce((sum, item) => {
                    const prod = PRODUCT_CATALOG.find(p => String(p.id) === String(item.productId));
                    if (prod && prod.category === "maternity") {
                        return sum + (prod.price * item.quantity);
                    }
                    return sum;
                }, 0);

                if (maternityTotal >= promo.threshold) {
                    discountSavings = promo.value;
                } else {
                    // remove code invalid threshold
                    STATE.promoApplied = null;
                    localStorage.removeItem("pretute_promo");
                    showNotification(`Code ${promo.code} requires minimum ₹${promo.threshold} in maternity wear`, "error");
                }
            }
            else if (promo.type === "flat_amount") {
                discountSavings = promo.value;
            }
        }
    }

    if (savingsSpan) savingsSpan.textContent = `-₹${discountSavings.toFixed(2)}`;

    const finalTotal = Math.max(0, subtotal - discountSavings);
    if (grandTotalSpan) grandTotalSpan.textContent = `₹${finalTotal.toFixed(2)}`;
}

// Coupon Form Actions
function setupPromoApplication() {
    const applyBtn = document.getElementById("applyPromoBtn");
    const input = document.getElementById("cartPromoInput");
    const feedback = document.getElementById("promoFeedback");

    if (!applyBtn || !input || !feedback) return;

    // Load active code if exists
    if (STATE.promoApplied && PROMOTIONS[STATE.promoApplied]) {
        input.value = STATE.promoApplied;
        feedback.textContent = `Coupon applied: ${PROMOTIONS[STATE.promoApplied].description}`;
        feedback.className = "promo-feedback text-success";
    }

    applyBtn.addEventListener("click", () => {
        const code = input.value.trim().toUpperCase();
        if (!code) {
            feedback.textContent = "Please enter a coupon code.";
            feedback.className = "promo-feedback text-danger";
            return;
        }

        // Check in StoreData coupons for detailed feedback
        if (typeof StoreData !== 'undefined' && StoreData.getCoupons) {
            const coup = StoreData.getCoupons().find(c => c.code === code);
            if (coup) {
                if (coup.status === "expired" || coup.isExpired) {
                    const formattedDate = coup.expiryDate ? new Date(coup.expiryDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : "";
                    feedback.textContent = `Coupon "${code}" has expired (${formattedDate || 'Date passed'}).`;
                    feedback.className = "promo-feedback text-danger";
                    showNotification(`Coupon "${code}" has expired.`, "error");
                    return;
                }
                if (coup.status === "deactivated" || coup.active === false) {
                    feedback.textContent = `Coupon "${code}" is currently deactivated.`;
                    feedback.className = "promo-feedback text-danger";
                    showNotification(`Coupon "${code}" is deactivated.`, "error");
                    return;
                }
                if (coup.minSpend > 0) {
                    const subtotal = STATE.cart.reduce((sum, item) => {
                        const prod = PRODUCT_CATALOG.find(p => p.id === item.productId);
                        return sum + (prod ? prod.price * item.quantity : 0);
                    }, 0);
                    if (subtotal < coup.minSpend) {
                        feedback.textContent = `Coupon requires minimum order value of ₹${coup.minSpend.toFixed(2)}.`;
                        feedback.className = "promo-feedback text-danger";
                        showNotification(`Requires min order ₹${coup.minSpend.toFixed(0)}`, "warning");
                        return;
                    }
                }
            }
        }

        if (PROMOTIONS[code]) {
            STATE.promoApplied = code;
            localStorage.setItem("pretute_promo", JSON.stringify(code));
            feedback.textContent = `✓ ${PROMOTIONS[code].description}`;
            feedback.className = "promo-feedback text-success";
            showNotification("Promo coupon applied!", "success");
            calculateCartPricing();
        } else {
            feedback.textContent = "Invalid or expired coupon code.";
            feedback.className = "promo-feedback text-danger";
        }
    });

    // Copying codes from coupon sections
    document.querySelectorAll(".copy-coupon-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const code = btn.getAttribute("data-code");
            navigator.clipboard.writeText(code).then(() => {
                btn.textContent = "COPIED";
                btn.classList.add("copied");
                showNotification(`Copied code: ${code}`, "success");
                setTimeout(() => {
                    btn.textContent = "COPY";
                    btn.classList.remove("copied");
                }, 2000);
            });
        });
    });
}

// Checkout and success state trigger
function setupCheckoutSubmission() {
    const submitBtn = document.getElementById("checkoutSubmitBtn");
    const overlay = document.getElementById("successScreenOverlay");
    const closeBtn = document.getElementById("successCloseBtn");

    if (!submitBtn || !overlay || !closeBtn) return;

    submitBtn.addEventListener("click", () => {
        if (!STATE.cart || STATE.cart.length === 0) {
            showNotification("Your shopping bag is empty! Add items first.", "error");
            return;
        }

        // Validate customer form fields
        const nameInput = document.getElementById("custFullName");
        const phoneInput = document.getElementById("custPhone");
        const emailInput = document.getElementById("custEmail");
        const addrInput = document.getElementById("custAddress");
        const cityInput = document.getElementById("custCity");
        const pinInput = document.getElementById("custPincode");
        const paymentInput = document.getElementById("custPaymentMethod");
        const errorMsg = document.getElementById("checkoutErrorMsg");

        if (nameInput && phoneInput && addrInput) {
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const addr = addrInput.value.trim();
            const city = cityInput ? cityInput.value.trim() : "";
            const pin = pinInput ? pinInput.value.trim() : "";

            if (!name || !phone || !addr || !city || !pin) {
                if (errorMsg) {
                    errorMsg.textContent = "Please fill in all delivery details (Name, Phone, Address, City & Pincode).";
                    errorMsg.style.display = "block";
                }
                nameInput.focus();
                return;
            }

            if (phone.replace(/\D/g, '').length < 10) {
                if (errorMsg) {
                    errorMsg.textContent = "Please enter a valid 10-digit mobile number.";
                    errorMsg.style.display = "block";
                }
                phoneInput.focus();
                return;
            }

            if (errorMsg) errorMsg.style.display = "none";
        }

        // Calculate final total to show
        const subtotal = STATE.cart.reduce((sum, item) => {
            const prod = PRODUCT_CATALOG.find(p => p.id === item.productId);
            return sum + (prod ? prod.price * item.quantity : 0);
        }, 0);

        let discountSavings = 0;
        if (STATE.promoApplied && PROMOTIONS[STATE.promoApplied]) {
            const promo = PROMOTIONS[STATE.promoApplied];
            if (promo.type === "flat_percent") discountSavings = subtotal * (promo.value / 100);
            else if (promo.type === "flat_amount") discountSavings = promo.value;
        }

        const grandTotal = Math.max(0, subtotal - discountSavings);
        const randomId = "PRT-" + Math.floor(1000000 + Math.random() * 9000000);

        const customerName = (nameInput && nameInput.value.trim()) || "Valued Customer";
        const customerPhone = (phoneInput && phoneInput.value.trim()) || "+91 98765 43210";
        const customerEmail = (emailInput && emailInput.value.trim()) || "shopper@pretute.com";
        const deliveryAddress = `${addrInput ? addrInput.value.trim() : ''}, ${cityInput ? cityInput.value.trim() : ''} - ${pinInput ? pinInput.value.trim() : ''}`;
        const paymentMethod = (paymentInput && paymentInput.value) || "Cash on Delivery";

        document.getElementById("successTotalPaid").textContent = `₹${grandTotal.toFixed(2)}`;
        document.getElementById("successOrderId").textContent = randomId;
        const custNameSpan = document.getElementById("successCustomerName");
        if (custNameSpan) custNameSpan.textContent = customerName;
        const payModeSpan = document.getElementById("successPaymentMode");
        if (payModeSpan) payModeSpan.textContent = paymentMethod;

        // Record customer order in Back Panel StoreData
        const orderItems = STATE.cart.map(item => {
            const prod = PRODUCT_CATALOG.find(p => p.id === item.productId) || {};
            return {
                productId: item.productId,
                title: prod.title || "Store Item",
                price: prod.price || 0,
                quantity: item.quantity,
                image: prod.image || "assets/logo.png"
            };
        });

        const estDeliveryStr = getCalculatedDeliveryString(pinInput ? pinInput.value : "");
        const successDeliverySpan = document.getElementById("successDeliveryDate");
        if (successDeliverySpan) successDeliverySpan.textContent = estDeliveryStr;

        if (typeof StoreData !== 'undefined' && StoreData.createOrder) {
            StoreData.createOrder({
                id: randomId,
                customerName: customerName,
                customerPhone: customerPhone,
                customerEmail: customerEmail,
                address: deliveryAddress,
                items: orderItems,
                subtotal: subtotal,
                discount: discountSavings,
                couponUsed: STATE.promoApplied,
                total: grandTotal,
                paymentMethod: paymentMethod,
                status: "Pending",
                estimatedDelivery: estDeliveryStr
            });

            // Automatically decrement product stock in StoreData
            orderItems.forEach(item => {
                const liveProd = StoreData.getProductById(item.productId);
                if (liveProd && typeof liveProd.stock !== 'undefined') {
                    const newStock = Math.max(0, (parseInt(liveProd.stock) || 0) - item.quantity);
                    StoreData.saveProduct({ ...liveProd, stock: newStock });
                }
            });
        }

        // Show success screen
        overlay.classList.add("active");
    });

    const viewOrdersBtn = document.getElementById("successViewOrdersBtn");
    viewOrdersBtn?.addEventListener("click", () => {
        STATE.cart = [];
        STATE.promoApplied = null;
        localStorage.removeItem('pretute_cart');
        localStorage.removeItem('pretute_promo');
        updateBadges();
        overlay.classList.remove("active");
        window.openCustomerOrdersModal?.();
    });

    closeBtn.addEventListener("click", () => {
        // Clear cart and reset
        STATE.cart = [];
        STATE.promoApplied = null;
        localStorage.removeItem('pretute_cart');
        localStorage.removeItem('pretute_promo');

        const currentCust = typeof StoreData !== 'undefined' ? StoreData.getCurrentCustomer() : null;
        if (!currentCust) {
            const nameInput = document.getElementById("custFullName");
            const phoneInput = document.getElementById("custPhone");
            const emailInput = document.getElementById("custEmail");
            const addrInput = document.getElementById("custAddress");
            const cityInput = document.getElementById("custCity");
            const pinInput = document.getElementById("custPincode");
            if (nameInput) nameInput.value = "";
            if (phoneInput) phoneInput.value = "";
            if (emailInput) emailInput.value = "";
            if (addrInput) addrInput.value = "";
            if (cityInput) cityInput.value = "";
            if (pinInput) pinInput.value = "";
        }

        updateBadges();
        overlay.classList.remove("active");
        window.location.hash = "#home";
    });
}


// ==========================================================================
// INTERACTIVE CAROUSEL & HOMEPAGE HERO BANNERS MODULE
// ==========================================================================
function renderHeroBanners() {
    const slider = document.getElementById("carouselSlider");
    const dotsContainer = document.getElementById("carouselDots");
    if (!slider || !dotsContainer) return;

    let banners = (typeof StoreData !== 'undefined' && StoreData.getBanners)
        ? StoreData.getBanners().filter(b => b.active !== false)
        : [];

    if (!banners || banners.length === 0) {
        banners = [
            {
                headline: "Luxury Organic Wear for Little Ones",
                subtitle: "Spring/Summer Collection",
                description: "Aesthetic pastel rompers and kids apparel hand-knit with 100% GOTS-certified organic cotton.",
                image: "assets/hero_fashion.png",
                btn1Text: "Shop Kids Fashion",
                btn1Link: "#category/baby-fashion",
                btn2Text: "Explore Maternity",
                btn2Link: "#category/maternity"
            },
            {
                headline: "Handcrafted Montessori Toys",
                subtitle: "Play & Grow",
                description: "Promote creative exploration, sensory growth, and active learning with premium toxin-free wood playsets.",
                image: "assets/hero_toys.png",
                btn1Text: "Shop Montessori Toys",
                btn1Link: "#category/wooden-toys",
                btn2Text: "View Best Sellers",
                btn2Link: "#home"
            }
        ];
    }

    // Sort by order ascending
    banners.sort((a, b) => (parseInt(a.order) || 0) - (parseInt(b.order) || 0));

    slider.innerHTML = banners.map((b, idx) => `
        <div class="carousel-slide ${idx === 0 ? 'active' : ''}" style="background-image: linear-gradient(rgba(26,37,60,0.5), rgba(26,37,60,0.2)), url('${b.image || 'assets/hero1.jpg'}');">
            <div class="carousel-content">
                ${b.subtitle ? `<span class="slide-subtitle">${b.subtitle}</span>` : ''}
                <h2 class="slide-title">${b.headline || b.title || "Luxury Organic Wear"}</h2>
                ${b.description ? `<p class="slide-desc">${b.description}</p>` : ''}
                <div class="slide-actions">
                    ${b.btn1Text ? `<a href="${b.btn1Link || '#products'}" class="btn btn-primary btn-large">${b.btn1Text}</a>` : ''}
                    ${b.btn2Text ? `<a href="${b.btn2Link || '#coupons'}" class="btn btn-outline btn-large">${b.btn2Text}</a>` : ''}
                </div>
            </div>
        </div>
    `).join("");

    dotsContainer.innerHTML = banners.map((b, idx) => `
        <span class="dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}"></span>
    `).join("");

    setupCarousel();
}

function setupCarousel() {
    const carousel = document.getElementById("heroCarousel");
    const slider = document.getElementById("carouselSlider");
    const prevBtn = document.getElementById("carouselPrevBtn");
    const nextBtn = document.getElementById("carouselNextBtn");
    const dots = document.querySelectorAll("#carouselDots .dot");

    if (!carousel || !slider || !prevBtn || !nextBtn) return;

    const slides = slider.querySelectorAll(".carousel-slide");
    const slideCount = slides.length;
    if (slideCount === 0) return;

    STATE.activeSlide = 0;

    const changeSlide = (index) => {
        const currentSlides = slider.querySelectorAll(".carousel-slide");
        const currentDots = document.querySelectorAll("#carouselDots .dot");
        currentSlides.forEach(s => s.classList.remove("active"));
        currentDots.forEach(d => d.classList.remove("active"));

        STATE.activeSlide = (index + slideCount) % slideCount;

        if (currentSlides[STATE.activeSlide]) currentSlides[STATE.activeSlide].classList.add("active");
        if (currentDots[STATE.activeSlide]) currentDots[STATE.activeSlide].classList.add("active");
    };

    prevBtn.onclick = () => {
        changeSlide(STATE.activeSlide - 1);
        resetCarouselAutoPlay();
    };

    nextBtn.onclick = () => {
        changeSlide(STATE.activeSlide + 1);
        resetCarouselAutoPlay();
    };

    dots.forEach((dot, index) => {
        dot.onclick = () => {
            changeSlide(index);
            resetCarouselAutoPlay();
        };
    });

    startCarouselAutoPlay();
}

function startCarouselAutoPlay() {
    if (STATE.carouselInterval) clearInterval(STATE.carouselInterval);
    STATE.carouselInterval = setInterval(() => {
        const slider = document.getElementById("carouselSlider");
        if (slider) {
            const slides = slider.querySelectorAll(".carousel-slide");
            const index = (STATE.activeSlide + 1) % slides.length;

            slides.forEach(s => s.classList.remove("active"));
            document.querySelectorAll("#carouselDots .dot").forEach(d => d.classList.remove("active"));

            STATE.activeSlide = index;
            slides[index].classList.add("active");
            document.querySelectorAll("#carouselDots .dot")[index]?.classList.add("active");
        }
    }, 5000);
}

function stopCarouselAutoPlay() {
    if (STATE.carouselInterval) {
        clearInterval(STATE.carouselInterval);
        STATE.carouselInterval = null;
    }
}

function resetCarouselAutoPlay() {
    stopCarouselAutoPlay();
    startCarouselAutoPlay();
}


// ==========================================================================
// SEARCH AUTO-SUGGESTIONS SYSTEM
// ==========================================================================
function setupSearchSuggestions() {
    const input = document.getElementById("searchInput");
    const box = document.getElementById("searchSuggestions");
    const form = document.getElementById("searchForm");

    if (!input || !box || !form) return;

    input.addEventListener("input", () => {
        const value = input.value.toLowerCase().trim();
        if (value.length < 2) {
            box.classList.remove("active");
            return;
        }

        const matches = PRODUCT_CATALOG.filter(p =>
            p.status !== "deactivated" && (
                p.title.toLowerCase().includes(value) ||
                p.categoryLabel.toLowerCase().includes(value)
            )
        ).slice(0, 5); // cap at 5 matches

        if (matches.length === 0) {
            box.innerHTML = `<div class="suggestion-item"><div class="suggestion-info"><h5>No matches found</h5></div></div>`;
        } else {
            box.innerHTML = "";
            matches.forEach(p => {
                const item = document.createElement("div");
                item.className = "suggestion-item";
                item.innerHTML = `
                    <img src="${p.image}" alt="${p.title}">
                    <div class="suggestion-info">
                        <h5>${p.title}</h5>
                        <span>₹${p.price.toFixed(2)}</span>
                    </div>
                `;
                item.addEventListener("click", () => {
                    input.value = "";
                    box.classList.remove("active");
                    window.location.hash = `#product/${p.id}`;
                });
                box.appendChild(item);
            });
        }
        box.classList.add("active");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-wrapper")) {
            box.classList.remove("active");
        }
    });

    // submit full search
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = input.value.trim();
        if (value) {
            box.classList.remove("active");
            input.value = "";
            handleSearchQuery(value);
        }
    });
}


// ==========================================================================
// PRODUCT MAGNIFIER LENS HOVER ZOOM EFFECT
// ==========================================================================
function setupProductDetailsZoom() {
    const container = document.getElementById("zoomContainer");
    const mainImg = document.getElementById("mainDetailImg");
    const lens = document.getElementById("zoomLens");
    const result = document.getElementById("zoomResult");

    if (!container || !mainImg || !lens || !result) return;

    // Reset inline styles
    lens.style.display = "none";
    result.style.display = "none";

    // Only apply on larger screens for UX correctness
    if (window.innerWidth < 768) {
        container.onmouseenter = null;
        container.onmouseleave = null;
        container.onmousemove = null;
        return;
    }

    container.onmouseenter = () => {
        lens.style.display = "block";
        result.style.display = "block";

        // set up background zoom source
        result.style.backgroundImage = `url('${mainImg.src}')`;
        result.style.backgroundSize = `${mainImg.offsetWidth * 2.5}px ${mainImg.offsetHeight * 2.5}px`;
    };

    container.onmouseleave = () => {
        lens.style.display = "none";
        result.style.display = "none";
    };

    container.onmousemove = (e) => {
        // Calculate mouse positioning offset bounds
        const rect = container.getBoundingClientRect();

        // Calculate lens coordinates relative to container
        let x = e.clientX - rect.left - (lens.offsetWidth / 2);
        let y = e.clientY - rect.top - (lens.offsetHeight / 2);

        // Keep lens inside container limits
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > container.offsetWidth - lens.offsetWidth) x = container.offsetWidth - lens.offsetWidth;
        if (y > container.offsetHeight - lens.offsetHeight) y = container.offsetHeight - lens.offsetHeight;

        lens.style.left = `${x}px`;
        lens.style.top = `${y}px`;

        // Calculate ratios and offset background image
        const ratioX = result.offsetWidth / lens.offsetWidth;
        const ratioY = result.offsetHeight / lens.offsetHeight;

        // Multiply positioning coordinates by ratios to coordinate overlay
        result.style.backgroundPosition = `-${x * 2.5}px -${y * 2.5}px`;
    };
}


// ==========================================================================
// UTILITIES DRAWER & ACCORDION DROPDOWN EVENTS
// ==========================================================================

function setupHeaderUtilities() {
    // Hamburger Sidebar menu toggles
    const burger = document.getElementById("mobileNavToggle");
    const sidebar = document.getElementById("mobileSidebar");
    const overlay = document.getElementById("mobileSidebarOverlay");
    const closeBtn = document.getElementById("closeSidebarBtn");

    if (burger && sidebar && overlay && closeBtn) {
        const openSidebar = () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        };

        const closeSidebar = () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        };

        burger.addEventListener("click", openSidebar);
        closeBtn.addEventListener("click", closeSidebar);
        overlay.addEventListener("click", closeSidebar);

        // click links closes drawer
        sidebar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeSidebar);
        });
    }

    // Account Dropdown Click & Hover Management
    const userWrapper = document.getElementById("userAccountWrapper");
    const userBtn = document.getElementById("userMenuBtn");
    const userDropdown = document.getElementById("userDropdown");
    const adminLink = document.getElementById("adminPanelLink");

    if (userWrapper && userBtn && userDropdown) {
        // Explicit click toggle so user can click Account to open & lock dropdown
        userBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = userWrapper.classList.contains("active") || userDropdown.classList.contains("show");
            if (isOpen) {
                userWrapper.classList.remove("active");
                userDropdown.classList.remove("show");
                userBtn.setAttribute("aria-expanded", "false");
            } else {
                userWrapper.classList.add("active");
                userDropdown.classList.add("show");
                userBtn.setAttribute("aria-expanded", "true");
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!userWrapper.contains(e.target)) {
                userWrapper.classList.remove("active");
                userDropdown.classList.remove("show");
                userBtn.setAttribute("aria-expanded", "false");
            }
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                userWrapper.classList.remove("active");
                userDropdown.classList.remove("show");
                userBtn.setAttribute("aria-expanded", "false");
            }
        });

        // Admin Back Panel navigation click handler
        if (adminLink) {
            adminLink.addEventListener("click", (e) => {
                userWrapper.classList.remove("active");
                userDropdown.classList.remove("show");
                // Direct navigation to admin panel
                window.location.href = "admin.html";
            });
        }
    }

    // Initialize Customer Authentication, Profile, Orders, Delivery & Refund modals
    setupCustomerAuthModal();
    setupCustomerProfileModal();
    setupCustomerOrdersModal();
    setupCancelOrderModal();
    setupDamageRefundModal();
    setupRefundPolicyModal();
    setupDeliveryEstimator();
    syncCustomerSessionUI();

    // Detail page Tabs selector
    const tabContainer = document.querySelector(".product-specs-tabs");
    if (tabContainer) {
        tabContainer.querySelectorAll(".tab-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                tabContainer.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
                tabContainer.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

                btn.classList.add("active");
                const targetPane = document.getElementById(btn.getAttribute("data-tab"));
                if (targetPane) targetPane.classList.add("active");
            });
        });
    }

    // Detail Quantity picker +/- links
    const picker = document.querySelector(".quantity-selector");
    if (picker) {
        const input = picker.querySelector(".qty-input");
        picker.querySelector(".dec").addEventListener("click", () => {
            let val = parseInt(input.value) || 1;
            if (val > 1) input.value = val - 1;
        });
        picker.querySelector(".inc").addEventListener("click", () => {
            let val = parseInt(input.value) || 1;
            input.value = val + 1;
        });
    }
}

// ==========================================================================
// ESTIMATED DELIVERY DATE & PINCODE CALCULATOR
// ==========================================================================
function calculateDeliveryDates(pincode = "") {
    const now = new Date();
    // Standard: 3-5 days
    const clean = (pincode || "").replace(/\D/g, "");
    const stdDays = (clean.startsWith("11") || clean.startsWith("40") || clean.startsWith("56")) ? 3 : 4;
    const stdDate = new Date(now.getTime() + stdDays * 24 * 60 * 60 * 1000);
    const expDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return {
        standardDate: stdDate,
        expressDate: expDate,
        formattedStandard: stdDate.toLocaleDateString("en-IN", options),
        formattedExpress: expDate.toLocaleDateString("en-IN", options)
    };
}

function getCalculatedDeliveryString(pincode = "") {
    const dates = calculateDeliveryDates(pincode);
    return dates.formattedStandard;
}

function setupDeliveryEstimator() {
    const input = document.getElementById("pincodeCheckInput");
    const btn = document.getElementById("pincodeCheckBtn");
    const resultDate = document.getElementById("pincodeEstDate");
    const countdownEl = document.getElementById("deliveryCountdownTimer");

    // Initialize with saved or default pincode
    const currentCust = (typeof StoreData !== 'undefined' && StoreData.getCurrentCustomer) ? StoreData.getCurrentCustomer() : null;
    const savedPin = (currentCust && currentCust.address && currentCust.address.pincode)
        || localStorage.getItem("pretute_user_pincode")
        || "400705";

    if (input && !input.value) input.value = savedPin;

    function updateEstimator(pin) {
        if (!resultDate) return;
        const cleanPin = (pin || "").replace(/\D/g, "");
        if (cleanPin.length === 6) {
            localStorage.setItem("pretute_user_pincode", cleanPin);
        }
        const dates = calculateDeliveryDates(cleanPin);
        resultDate.textContent = dates.formattedStandard;
    }

    if (btn && input) {
        btn.addEventListener("click", () => {
            const val = input.value.trim();
            if (val.length !== 6 || isNaN(val)) {
                showStoreToast("Please enter a valid 6-digit Pincode.");
                return;
            }
            updateEstimator(val);
            showStoreToast(`Delivery verified for Pincode ${val}!`);
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                btn.click();
            }
        });
    }

    // Live countdown timer for same-day dispatch
    if (countdownEl) {
        function updateCountdown() {
            const now = new Date();
            const cutoff = new Date();
            cutoff.setHours(18, 0, 0, 0); // 6:00 PM cutoff
            let diff = cutoff - now;
            if (diff <= 0) {
                cutoff.setDate(cutoff.getDate() + 1);
                diff = cutoff - now;
            }
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            countdownEl.textContent = `${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m`;
        }
        updateCountdown();
        setInterval(updateCountdown, 60000);
    }

    updateEstimator(savedPin);
}

// ==========================================================================
// CUSTOMER AUTHENTICATION (SIGN IN, REGISTER & DEMO LOGIN)
// ==========================================================================
function setupCustomerAuthModal() {
    const modal = document.getElementById("customerAuthModal");
    const closeBtn = document.getElementById("closeCustomerAuthBtn");
    const loginBtn = document.getElementById("loginBtn");
    const mobLoginLink = document.getElementById("mobLoginLink");
    const tabSignIn = document.getElementById("authTabSignIn");
    const tabRegister = document.getElementById("authTabRegister");
    const signInForm = document.getElementById("customerSignInForm");
    const registerForm = document.getElementById("customerRegisterForm");
    const demoBtn = document.getElementById("demoCustomerLoginBtn");
    const signInError = document.getElementById("customerSignInErrorMsg");
    const regError = document.getElementById("customerRegisterErrorMsg");

    if (!modal) return;

    window.openCustomerAuthModal = (tab = "signin") => {
        modal.classList.add("active");
        if (signInError) signInError.style.display = "none";
        if (regError) regError.style.display = "none";
        if (tab === "register") {
            tabRegister?.click();
        } else {
            tabSignIn?.click();
        }
    };

    window.closeCustomerAuthModal = () => {
        modal.classList.remove("active");
    };

    closeBtn?.addEventListener("click", window.closeCustomerAuthModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) window.closeCustomerAuthModal();
    });

    loginBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        const currentCust = typeof StoreData !== 'undefined' ? StoreData.getCurrentCustomer() : null;
        if (currentCust) {
            window.openCustomerProfileModal?.();
        } else {
            window.openCustomerAuthModal("signin");
        }
    });

    mobLoginLink?.addEventListener("click", (e) => {
        e.preventDefault();
        const currentCust = typeof StoreData !== 'undefined' ? StoreData.getCurrentCustomer() : null;
        if (currentCust) {
            window.openCustomerProfileModal?.();
        } else {
            window.openCustomerAuthModal("signin");
        }
    });

    tabSignIn?.addEventListener("click", () => {
        tabSignIn.classList.add("active");
        tabRegister.classList.remove("active");
        if (signInForm) signInForm.style.display = "block";
        if (registerForm) registerForm.style.display = "none";
    });

    tabRegister?.addEventListener("click", () => {
        tabRegister.classList.add("active");
        tabSignIn.classList.remove("active");
        if (signInForm) signInForm.style.display = "none";
        if (registerForm) registerForm.style.display = "block";
    });

    // Quick Demo Customer Login
    demoBtn?.addEventListener("click", () => {
        if (typeof StoreData !== 'undefined' && StoreData.loginCustomer) {
            const res = StoreData.loginCustomer("customer@pretute.com", "password123");
            if (res.success) {
                syncCustomerSessionUI();
                window.closeCustomerAuthModal();
                showStoreToast(`Welcome back, ${res.customer.name}!`);
                return;
            }
        }
        // Fallback demo
        const demoCust = {
            id: "cust-1",
            name: "Mitalee Sharma",
            email: "customer@pretute.com",
            phone: "9876543210",
            address: {
                street: "Flat 402, Lotus Orchid, Palm Beach Road",
                city: "Mumbai",
                state: "Maharashtra",
                pincode: "400705"
            }
        };
        localStorage.setItem("pretute_customer", JSON.stringify(demoCust));
        syncCustomerSessionUI();
        window.closeCustomerAuthModal();
        showStoreToast("Logged in as Demo Customer (Mitalee Sharma)!");
    });

    signInForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const identifier = document.getElementById("custLoginEmail").value.trim();
        const password = document.getElementById("custLoginPassword").value;

        if (typeof StoreData !== 'undefined' && StoreData.loginCustomer) {
            const res = StoreData.loginCustomer(identifier, password);
            if (!res.success) {
                if (signInError) {
                    signInError.textContent = res.message;
                    signInError.style.display = "block";
                }
                return;
            }
            syncCustomerSessionUI();
            window.closeCustomerAuthModal();
            showStoreToast(`Welcome back, ${res.customer.name}!`);
        } else {
            const name = identifier.split("@")[0].replace(/[._]/g, " ");
            const customer = { name: name.charAt(0).toUpperCase() + name.slice(1), email: identifier };
            localStorage.setItem("pretute_customer", JSON.stringify(customer));
            syncCustomerSessionUI();
            window.closeCustomerAuthModal();
            showStoreToast(`Welcome back, ${customer.name}!`);
        }
    });

    registerForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("custRegName").value.trim();
        const email = document.getElementById("custRegEmail").value.trim();
        const phone = document.getElementById("custRegPhone").value.trim();
        const password = document.getElementById("custRegPassword").value;

        if (typeof StoreData !== 'undefined' && StoreData.registerCustomer) {
            const res = StoreData.registerCustomer({ name, email, phone, password });
            if (!res.success) {
                if (regError) {
                    regError.textContent = res.message;
                    regError.style.display = "block";
                }
                return;
            }
            syncCustomerSessionUI();
            window.closeCustomerAuthModal();
            showStoreToast(`Account created successfully! Welcome, ${name}!`);
        } else {
            const customer = { name, email, phone };
            localStorage.setItem("pretute_customer", JSON.stringify(customer));
            syncCustomerSessionUI();
            window.closeCustomerAuthModal();
            showStoreToast(`Account created successfully! Welcome, ${customer.name}!`);
        }
    });
}

function syncCustomerSessionUI() {
    const currentCust = (typeof StoreData !== 'undefined' && StoreData.getCurrentCustomer)
        ? StoreData.getCurrentCustomer()
        : (() => {
            const r = localStorage.getItem("pretute_customer");
            try { return r ? JSON.parse(r) : null; } catch (e) { return null; }
        })();

    const label = document.getElementById("userAccountLabel");
    const sessionBox = document.getElementById("customerDropdownSession");
    const loginBtn = document.getElementById("loginBtn");
    const profileLink = document.getElementById("profileLink");
    const mobProfileLink = document.getElementById("mobProfileLink");
    const mobLoginLink = document.getElementById("mobLoginLink");

    if (currentCust) {
        const firstName = currentCust.name ? currentCust.name.split(" ")[0] : "User";
        if (label) label.textContent = firstName;
        if (mobLoginLink) mobLoginLink.innerHTML = `<i class="fa-solid fa-user-check"></i> Hi, ${firstName}`;

        if (profileLink) profileLink.style.display = "flex";
        if (mobProfileLink) mobProfileLink.style.display = "block";

        if (sessionBox) {
            sessionBox.innerHTML = `
                <div class="dropdown-customer-info">
                    <div class="dropdown-customer-name">👋 ${currentCust.name}</div>
                    <div class="dropdown-customer-email">${currentCust.email || currentCust.phone}</div>
                </div>
            `;
        }

        if (loginBtn) {
            loginBtn.textContent = "Sign Out";
            loginBtn.className = "dropdown-link btn-signout";
            loginBtn.onclick = (e) => {
                e.preventDefault();
                if (typeof StoreData !== 'undefined' && StoreData.logoutCustomer) {
                    StoreData.logoutCustomer();
                } else {
                    localStorage.removeItem("pretute_customer");
                }
                syncCustomerSessionUI();
                showStoreToast("Signed out successfully.");
            };
        }
    } else {
        if (label) label.textContent = "Account";
        if (sessionBox) sessionBox.innerHTML = "";
        if (profileLink) profileLink.style.display = "none";
        if (mobProfileLink) mobProfileLink.style.display = "none";
        if (mobLoginLink) mobLoginLink.innerHTML = `<i class="fa-regular fa-user"></i> Sign In / Account`;

        if (loginBtn) {
            loginBtn.textContent = "Sign In / Register";
            loginBtn.className = "dropdown-link btn-login";
            loginBtn.onclick = (e) => {
                e.preventDefault();
                window.openCustomerAuthModal?.("signin");
            };
        }
    }
}

// ==========================================================================
// CUSTOMER PROFILE & ACCOUNT DETAILS MODAL
// ==========================================================================
function setupCustomerProfileModal() {
    const modal = document.getElementById("customerProfileModal");
    const closeBtn = document.getElementById("closeCustomerProfileBtn");
    const profileLink = document.getElementById("profileLink");
    const mobProfileLink = document.getElementById("mobProfileLink");
    const personalForm = document.getElementById("profilePersonalForm");
    const addressForm = document.getElementById("profileAddressForm");
    const openOrdersBtn = document.getElementById("profileOpenOrdersBtn");
    const signOutBtn = document.getElementById("profileSignOutBtn");

    if (!modal) return;

    window.openCustomerProfileModal = () => {
        const cust = (typeof StoreData !== 'undefined' && StoreData.getCurrentCustomer)
            ? StoreData.getCurrentCustomer()
            : null;

        if (!cust) {
            window.openCustomerAuthModal?.("signin");
            return;
        }

        // Populate header
        const initials = cust.name ? cust.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "PR";
        const avatarEl = document.getElementById("profileAvatarCircle");
        if (avatarEl) avatarEl.textContent = initials;
        document.getElementById("profileNameDisplay").textContent = cust.name || "Valued Customer";
        document.getElementById("profileEmailDisplay").textContent = cust.email || cust.phone || "Verified Customer";

        // Populate Personal Form
        document.getElementById("profileFullName").value = cust.name || "";
        document.getElementById("profileEmail").value = cust.email || "";
        document.getElementById("profilePhone").value = cust.phone || "";

        // Populate Address Form
        const addr = cust.address || {};
        document.getElementById("profileStreet").value = addr.street || "";
        document.getElementById("profileCity").value = addr.city || "";
        document.getElementById("profilePincode").value = addr.pincode || "";
        document.getElementById("profileState").value = addr.state || "";

        // Populate Stats
        const orders = (typeof StoreData !== 'undefined' && StoreData.getOrders) ? StoreData.getOrders() : [];
        const userOrders = orders.filter(o =>
            (cust.email && o.customerEmail && o.customerEmail.toLowerCase() === cust.email.toLowerCase()) ||
            (cust.phone && o.customerPhone && o.customerPhone === cust.phone)
        );
        document.getElementById("statOrdersCount").textContent = userOrders.length || orders.length;
        document.getElementById("statWishlistCount").textContent = STATE.wishlist ? STATE.wishlist.length : 0;

        modal.classList.add("active");
    };

    window.closeCustomerProfileModal = () => {
        modal.classList.remove("active");
    };

    closeBtn?.addEventListener("click", window.closeCustomerProfileModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) window.closeCustomerProfileModal();
    });

    profileLink?.addEventListener("click", (e) => {
        e.preventDefault();
        window.openCustomerProfileModal();
    });

    mobProfileLink?.addEventListener("click", (e) => {
        e.preventDefault();
        window.openCustomerProfileModal();
    });

    // Profile Tabs switching
    modal.querySelectorAll(".profile-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            modal.querySelectorAll(".profile-tab-btn").forEach(b => b.classList.remove("active"));
            modal.querySelectorAll(".profile-tab-pane").forEach(p => p.style.display = "none");
            btn.classList.add("active");
            const target = document.getElementById(btn.getAttribute("data-ptab"));
            if (target) target.style.display = "block";
        });
    });

    personalForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("profileFullName").value.trim();
        const email = document.getElementById("profileEmail").value.trim();
        const phone = document.getElementById("profilePhone").value.trim();

        if (typeof StoreData !== 'undefined' && StoreData.updateCustomer) {
            StoreData.updateCustomer({ name, email, phone });
            syncCustomerSessionUI();
            showStoreToast("Personal details saved successfully!");
        }
    });

    addressForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const street = document.getElementById("profileStreet").value.trim();
        const city = document.getElementById("profileCity").value.trim();
        const pincode = document.getElementById("profilePincode").value.trim();
        const state = document.getElementById("profileState").value.trim();

        if (typeof StoreData !== 'undefined' && StoreData.updateCustomer) {
            StoreData.updateCustomer({
                address: { street, city, pincode, state }
            });
            if (pincode) localStorage.setItem("pretute_user_pincode", pincode);
            showStoreToast("Shipping address updated successfully!");
        }
    });

    openOrdersBtn?.addEventListener("click", () => {
        window.closeCustomerProfileModal();
        window.openCustomerOrdersModal();
    });

    signOutBtn?.addEventListener("click", () => {
        if (typeof StoreData !== 'undefined' && StoreData.logoutCustomer) {
            StoreData.logoutCustomer();
        } else {
            localStorage.removeItem("pretute_customer");
        }
        syncCustomerSessionUI();
        window.closeCustomerProfileModal();
        showStoreToast("Signed out successfully.");
    });
}

// ==========================================================================
// ORDER CANCELLATION MODAL
// ==========================================================================
function setupCancelOrderModal() {
    const modal = document.getElementById("cancelOrderModal");
    const closeBtn = document.getElementById("closeCancelOrderBtn");
    const abortBtn = document.getElementById("abortCancelOrderBtn");
    const form = document.getElementById("confirmCancelOrderForm");

    if (!modal) return;

    window.openCancelOrderModal = (orderId) => {
        document.getElementById("cancelTargetOrderId").textContent = orderId;
        document.getElementById("cancelOrderIdHidden").value = orderId;
        document.getElementById("cancelReasonSelect").value = "";
        document.getElementById("cancelReasonNotes").value = "";
        modal.classList.add("active");
    };

    window.closeCancelOrderModal = () => {
        modal.classList.remove("active");
    };

    closeBtn?.addEventListener("click", window.closeCancelOrderModal);
    abortBtn?.addEventListener("click", window.closeCancelOrderModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) window.closeCancelOrderModal();
    });

    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const orderId = document.getElementById("cancelOrderIdHidden").value;
        const reason = document.getElementById("cancelReasonSelect").value;
        const notes = document.getElementById("cancelReasonNotes").value.trim();
        const fullReason = notes ? `${reason} (${notes})` : reason;

        if (typeof StoreData !== 'undefined' && StoreData.cancelOrder) {
            const res = StoreData.cancelOrder(orderId, fullReason);
            if (res.success) {
                window.closeCancelOrderModal();
                if (window.renderCustomerOrders) window.renderCustomerOrders();
                showStoreToast(`Order #${orderId} cancelled successfully.`);
            } else {
                showStoreToast(res.message || "Failed to cancel order.");
            }
        }
    });
}

// ==========================================================================
// RETURN / REFUND & DAMAGE VIDEO CLAIM MODAL
// ==========================================================================
function setupDamageRefundModal() {
    const modal = document.getElementById("damageRefundModal");
    const closeBtn = document.getElementById("closeDamageRefundBtn");
    const form = document.getElementById("damageRefundForm");
    const videoInput = document.getElementById("refundVideoFileInput");
    const dropzone = document.getElementById("videoDropzone");
    const dropzonePrompt = document.getElementById("videoDropzonePrompt");
    const previewContainer = document.getElementById("videoPreviewContainer");
    const videoPreview = document.getElementById("refundVideoPreview");
    const fileNameDisplay = document.getElementById("videoFileNameDisplay");
    const removeVideoBtn = document.getElementById("removeVideoBtn");
    const photoInput = document.getElementById("refundPhotoFileInput");
    const photoThumbnails = document.getElementById("refundPhotoThumbnails");
    const payoutModeSelect = document.getElementById("refundPayoutMode");
    const upiGroup = document.getElementById("refundUpiGroup");

    if (!modal) return;

    let attachedVideoName = "";

    window.openDamageRefundModal = (orderId) => {
        document.getElementById("refundTargetOrderId").textContent = orderId;
        document.getElementById("refundOrderIdHidden").value = orderId;
        document.getElementById("refundReasonSelect").value = "";
        document.getElementById("refundDesc").value = "";
        document.getElementById("refundVideoLink").value = "";
        document.getElementById("refundConfirmCheck").checked = false;

        // Reset video preview
        attachedVideoName = "";
        if (videoInput) videoInput.value = "";
        if (videoPreview) { videoPreview.src = ""; videoPreview.pause(); }
        if (previewContainer) previewContainer.style.display = "none";
        if (dropzonePrompt) dropzonePrompt.style.display = "block";
        if (photoThumbnails) { photoThumbnails.innerHTML = ""; photoThumbnails.style.display = "none"; }

        modal.classList.add("active");
    };

    window.closeDamageRefundModal = () => {
        modal.classList.remove("active");
        if (videoPreview) videoPreview.pause();
    };

    closeBtn?.addEventListener("click", window.closeDamageRefundModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) window.closeDamageRefundModal();
    });

    // Video dropzone click triggers file input
    dropzone?.addEventListener("click", (e) => {
        if (e.target !== removeVideoBtn && !removeVideoBtn?.contains(e.target)) {
            videoInput?.click();
        }
    });

    videoInput?.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            attachedVideoName = file.name;
            const url = URL.createObjectURL(file);
            videoPreview.src = url;
            fileNameDisplay.textContent = `📹 ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`;
            dropzonePrompt.style.display = "none";
            previewContainer.style.display = "block";
        }
    });

    removeVideoBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        attachedVideoName = "";
        videoInput.value = "";
        videoPreview.src = "";
        previewContainer.style.display = "none";
        dropzonePrompt.style.display = "block";
    });

    // Photo thumbnails preview
    photoInput?.addEventListener("change", (e) => {
        if (!photoThumbnails) return;
        photoThumbnails.innerHTML = "";
        if (e.target.files && e.target.files.length > 0) {
            photoThumbnails.style.display = "flex";
            Array.from(e.target.files).forEach(file => {
                const img = document.createElement("img");
                img.src = URL.createObjectURL(file);
                img.className = "photo-thumb";
                photoThumbnails.appendChild(img);
            });
        } else {
            photoThumbnails.style.display = "none";
        }
    });

    payoutModeSelect?.addEventListener("change", () => {
        if (upiGroup) {
            upiGroup.style.display = payoutModeSelect.value === "UPI Direct Transfer" ? "block" : "none";
        }
    });

    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const orderId = document.getElementById("refundOrderIdHidden").value;
        const reason = document.getElementById("refundReasonSelect").value;
        const description = document.getElementById("refundDesc").value.trim();
        const videoLink = document.getElementById("refundVideoLink").value.trim();
        const payoutMethod = payoutModeSelect ? payoutModeSelect.value : "Original Payment Method";
        const upiId = document.getElementById("refundUpiId") ? document.getElementById("refundUpiId").value.trim() : "";

        // Mandatory Unboxing Video verification
        if (!attachedVideoName && !videoLink) {
            showStoreToast("Mandatory unboxing video required! Please upload video file or provide video link.");
            return;
        }

        if (typeof StoreData !== 'undefined' && StoreData.requestRefund) {
            const res = StoreData.requestRefund(orderId, {
                reason,
                description,
                videoProofName: attachedVideoName || "cloud_video_link",
                videoProofUrl: videoLink,
                refundMethod: payoutMethod,
                upiId: upiId
            });

            if (res.success) {
                window.closeDamageRefundModal();
                if (window.renderCustomerOrders) window.renderCustomerOrders();
                showStoreToast(`Refund Claim #${res.ticketId} submitted for Order #${orderId}!`);
            }
        }
    });
}

// ==========================================================================
// REFUND & DAMAGE VIDEO POLICY MODAL
// ==========================================================================
function setupRefundPolicyModal() {
    const modal = document.getElementById("refundPolicyModal");
    const closeBtn = document.getElementById("closeRefundPolicyBtn");
    const ackBtn = document.getElementById("policyAcknowledgeBtn");
    const policyLink = document.getElementById("refundPolicyLink");
    const mobPolicyLink = document.getElementById("mobRefundPolicyLink");
    const footerPolicyLink = document.getElementById("footerRefundPolicyLink");
    const perkPolicyTrigger = document.getElementById("detailRefundPolicyPerk");

    if (!modal) return;

    window.openRefundPolicyModal = () => {
        modal.classList.add("active");
    };

    window.closeRefundPolicyModal = () => {
        modal.classList.remove("active");
    };

    closeBtn?.addEventListener("click", window.closeRefundPolicyModal);
    ackBtn?.addEventListener("click", window.closeRefundPolicyModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) window.closeRefundPolicyModal();
    });

    [policyLink, mobPolicyLink, footerPolicyLink, perkPolicyTrigger].forEach(btn => {
        btn?.addEventListener("click", (e) => {
            e.preventDefault();
            window.openRefundPolicyModal();
        });
    });
}

// ==========================================================================
// CUSTOMER ORDERS MODAL LOGIC WITH TIMELINE & ACTIONS
// ==========================================================================
function setupCustomerOrdersModal() {
    const modal = document.getElementById("customerOrdersModal");
    const closeBtn = document.getElementById("closeCustomerOrdersBtn");
    const ordersLink = document.getElementById("ordersLink");
    const mobOrdersLink = document.getElementById("mobOrdersLink");
    const container = document.getElementById("customerOrdersContainer");

    if (!modal) return;

    window.renderCustomerOrders = () => {
        if (!container) return;
        const allOrders = (typeof StoreData !== "undefined" && StoreData.getOrders) ? StoreData.getOrders() : [];
        const currentCust = (typeof StoreData !== 'undefined' && StoreData.getCurrentCustomer) ? StoreData.getCurrentCustomer() : null;

        let displayOrders = allOrders;
        if (currentCust) {
            const matching = allOrders.filter(o =>
                (currentCust.email && o.customerEmail && o.customerEmail.toLowerCase() === currentCust.email.toLowerCase()) ||
                (currentCust.phone && o.customerPhone && o.customerPhone === currentCust.phone)
            );
            if (matching.length > 0) displayOrders = matching;
        }

        if (!displayOrders || displayOrders.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 32px 16px;">
                    <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--color-border); margin-bottom: 12px; display: block;"></i>
                    <h4 style="color: var(--color-navy); margin-bottom: 6px;">No Orders Found</h4>
                    <p style="color: var(--color-navy-light); font-size: 0.88rem; margin-bottom: 16px;">You haven't placed any orders yet.</p>
                    <a href="#home" class="btn btn-primary" onclick="window.closeCustomerOrdersModal()">Start Shopping</a>
                </div>
            `;
            return;
        }

        container.innerHTML = displayOrders.map(order => {
            const dateStr = new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
            const items = order.items || [];
            const itemsSummary = items.map(it => `${it.title} (x${it.quantity})`).join(", ");
            const isCancelled = order.status === "Cancelled";
            const isDelivered = order.status === "Delivered";
            const isRefundRequested = order.status === "Refund Requested";

            let badgeColor = "#f59e0b"; // Pending/Confirmed
            if (isDelivered) badgeColor = "#10b981";
            else if (order.status === "Shipped") badgeColor = "#3b82f6";
            else if (isCancelled) badgeColor = "#ef4444";
            else if (isRefundRequested) badgeColor = "#8b5cf6";

            // Delivery tracker step calculation
            let step1 = "completed", step2 = "", step3 = "", step4 = "";
            if (order.status === "Confirmed") { step2 = "active"; }
            else if (order.status === "Shipped") { step2 = "completed"; step3 = "active"; }
            else if (isDelivered) { step2 = "completed"; step3 = "completed"; step4 = "completed"; }

            const estDeliveryText = order.estimatedDelivery || getCalculatedDeliveryString();

            return `
                <div class="customer-order-card">
                    <div class="customer-order-card-header">
                        <div>
                            <strong>Order #${order.id}</strong>
                            <div style="font-size: 0.75rem; color: var(--color-navy-light); margin-top: 2px;">Placed on ${dateStr} • ${order.paymentMethod || 'COD'}</div>
                        </div>
                        <span style="background: ${badgeColor}18; color: ${badgeColor}; border: 1px solid ${badgeColor}40; padding: 4px 10px; border-radius: var(--radius-full); font-weight: 700; font-size: 0.78rem;">
                            ${order.status}
                        </span>
                    </div>

                    ${!isCancelled ? `
                        <div class="order-est-delivery-bar">
                            <span><i class="fa-solid fa-truck-fast" style="color: var(--color-primary);"></i> Estimated Delivery:</span>
                            <strong style="color: #15803d;">${estDeliveryText}</strong>
                        </div>
                        <div class="order-tracking-stepper">
                            <div class="order-step ${step1}">
                                <div class="order-step-circle"><i class="fa-solid fa-check"></i></div>
                                <span class="order-step-label">Placed</span>
                            </div>
                            <div class="order-step ${step2}">
                                <div class="order-step-circle">${step2 === "completed" ? '<i class="fa-solid fa-check"></i>' : '2'}</div>
                                <span class="order-step-label">Confirmed</span>
                            </div>
                            <div class="order-step ${step3}">
                                <div class="order-step-circle">${step3 === "completed" ? '<i class="fa-solid fa-check"></i>' : '3'}</div>
                                <span class="order-step-label">Shipped</span>
                            </div>
                            <div class="order-step ${step4}">
                                <div class="order-step-circle">${step4 === "completed" ? '<i class="fa-solid fa-check"></i>' : '4'}</div>
                                <span class="order-step-label">Delivered</span>
                            </div>
                        </div>
                    ` : `
                        <div style="background: #fef2f2; border: 1px solid #fecdd3; color: #b91c1c; padding: 8px 12px; border-radius: var(--radius-sm); font-size: 0.8rem; margin: 8px 0;">
                            <i class="fa-solid fa-circle-xmark"></i> <strong>Cancelled:</strong> ${order.cancelReason || 'Order cancelled'}
                        </div>
                    `}

                    <div class="customer-order-card-items" style="display: flex; align-items: center; gap: 8px; margin: 8px 0;">
                        <i class="fa-solid fa-bag-shopping" style="color: var(--color-navy-light);"></i>
                        <span style="font-size: 0.85rem;">${itemsSummary}</span>
                    </div>

                    ${isRefundRequested && order.refundDetails ? `
                        <div style="background: #f5f3ff; border: 1px solid #ddd6fe; color: #6d28d9; padding: 8px 12px; border-radius: var(--radius-sm); font-size: 0.8rem; margin: 8px 0;">
                            <i class="fa-solid fa-video"></i> <strong>Refund Claim #${order.refundDetails.ticketId}:</strong> Under Review • Video Proof Attached (${order.refundDetails.videoProofName})
                        </div>
                    ` : ''}

                    <div class="customer-order-card-footer">
                        <span>Total Paid: <strong style="color: var(--color-primary); font-size: 1rem;">₹${parseFloat(order.total || 0).toFixed(2)}</strong></span>
                        <a href="#refund-policy" onclick="window.openRefundPolicyModal?.()" style="color: var(--color-navy-light); font-size: 0.78rem; text-decoration: underline;">
                            Refund Policy
                        </a>
                    </div>

                    <div class="order-card-actions">
                        ${(!isCancelled && !isDelivered && !isRefundRequested) ? `
                            <button class="btn-order-action btn-cancel-order" onclick="window.openCancelOrderModal('${order.id}')">
                                <i class="fa-solid fa-xmark"></i> Cancel Order
                            </button>
                        ` : ''}

                        ${(!isCancelled && !isRefundRequested) ? `
                            <button class="btn-order-action btn-refund-order" onclick="window.openDamageRefundModal('${order.id}')">
                                <i class="fa-solid fa-video"></i> Report Damage / Return Video Claim
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join("");
    };

    window.openCustomerOrdersModal = () => {
        window.renderCustomerOrders();
        modal.classList.add("active");
    };

    window.closeCustomerOrdersModal = () => {
        modal.classList.remove("active");
    };

    closeBtn?.addEventListener("click", window.closeCustomerOrdersModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) window.closeCustomerOrdersModal();
    });

    ordersLink?.addEventListener("click", (e) => {
        e.preventDefault();
        window.openCustomerOrdersModal();
    });

    mobOrdersLink?.addEventListener("click", (e) => {
        e.preventDefault();
        window.openCustomerOrdersModal();
    });
}

// Toast helper for storefront
function showStoreToast(message) {
    let toast = document.getElementById("storeToastNotification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "storeToastNotification";
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #0f172a;
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 9999;
            font-size: 0.9rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.25s ease;
        `;
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <span>${message}</span>`;
    toast.style.transform = "translateY(0)";
    toast.style.opacity = "1";
    setTimeout(() => {
        toast.style.transform = "translateY(20px)";
        toast.style.opacity = "0";
    }, 3000);
}

// Quick Side Cart Drawers actions
function setupCartDrawerActions() {
    const toggle = document.getElementById("cartToggleBtn");
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartDrawerOverlay");
    const closeBtn = document.getElementById("closeDrawerBtn");

    if (!toggle || !drawer || !overlay || !closeBtn) return;

    toggle.addEventListener("click", () => {
        renderCartDrawer();
        openCartDrawer();
    });

    closeBtn.addEventListener("click", closeCartDrawer);
    overlay.addEventListener("click", closeCartDrawer);

    // Full bag navigation link inside drawer
    document.getElementById("viewCartDrawerBtn").addEventListener("click", () => {
        closeCartDrawer();
    });

    document.getElementById("checkoutDrawerBtn").addEventListener("click", () => {
        closeCartDrawer();
        window.location.hash = "#cart";
    });
}

function openCartDrawer() {
    document.getElementById("cartDrawer").classList.add("active");
    document.getElementById("cartDrawerOverlay").classList.add("active");
}

function closeCartDrawer() {
    document.getElementById("cartDrawer").classList.remove("active");
    document.getElementById("cartDrawerOverlay").classList.remove("active");
}


// ==========================================================================
// DEAL OF THE DAY COUNTDOWN
// ==========================================================================
function setupDealCountdown() {
    const countdown = document.getElementById("offerCountdown");
    if (!countdown) return;

    // Set countdown duration to 24h from load, or a recurring target
    let time = 3600 * 5 + 3600 * 18 + 1200; // 23 hours 40 minutes

    const updateTimer = () => {
        time--;
        if (time <= 0) time = 86400; // reset to 24h

        const hrs = Math.floor(time / 3600);
        const mins = Math.floor((time % 3600) / 60);
        const secs = time % 60;

        const pad = (num) => String(num).padStart(2, "0");
        countdown.textContent = `${pad(hrs)}h : ${pad(mins)}m : ${pad(secs)}s`;
    };

    setInterval(updateTimer, 1000);
    updateTimer();
}


// ==========================================================================
// CONTACT US FORM VALIDATIONS
// ==========================================================================
function setupContactFormValidation() {
    const form = document.getElementById("contactUsForm");
    const card = document.getElementById("contactSuccessCard");
    const resetBtn = document.getElementById("resetContactFormBtn");

    if (!form || !card || !resetBtn) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;
        const nameInput = document.getElementById("contactName");
        const emailInput = document.getElementById("contactEmail");
        const subjectInput = document.getElementById("contactSubject");
        const messageInput = document.getElementById("contactMessage");

        // Simple validation checks
        if (!nameInput.value.trim()) {
            showInputError(nameInput);
            isValid = false;
        } else {
            clearInputError(nameInput);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            showInputError(emailInput);
            isValid = false;
        } else {
            clearInputError(emailInput);
        }

        if (!subjectInput.value.trim()) {
            showInputError(subjectInput);
            isValid = false;
        } else {
            clearInputError(subjectInput);
        }

        if (!messageInput.value.trim()) {
            showInputError(messageInput);
            isValid = false;
        } else {
            clearInputError(messageInput);
        }

        if (isValid) {
            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const subjectVal = subjectInput.value.trim();
            const messageVal = messageInput.value.trim();

            // Save inquiry into Back Panel StoreData
            if (typeof StoreData !== 'undefined' && StoreData.saveMessage) {
                StoreData.saveMessage({
                    name: nameVal,
                    email: emailVal,
                    subject: subjectVal,
                    message: messageVal
                });
            }

            // Animate submission
            const submitBtn = document.getElementById("contactFormSubmitBtn");
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            setTimeout(() => {
                // reset form, swap card
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
                card.classList.add("active");
            }, 1500);
        }
    });

    resetBtn.addEventListener("click", () => {
        card.classList.remove("active");
    });
}

function showInputError(input) {
    input.closest(".form-group").classList.add("has-error");
}

function clearInputError(input) {
    input.closest(".form-group").classList.remove("has-error");
}


// ==========================================================================
// NEWSLETTER NEWS FEEDBACKS
// ==========================================================================
function setupNewsletter() {
    const form = document.getElementById("newsletterForm");
    const successMsg = document.getElementById("newsletterSuccess");

    if (!form || !successMsg) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("newsletterEmail");
        if (input.value.trim()) {
            input.value = "";
            successMsg.style.display = "block";
            setTimeout(() => {
                successMsg.style.display = "none";
            }, 5000);
        }
    });
}


// ==========================================================================
// QUICK VIEW MODAL COMPONENT POPULATOR
// ==========================================================================
function openQuickViewModal(productId) {
    const prod = PRODUCT_CATALOG.find(p => p.id === productId);
    if (!prod || prod.status === "deactivated") return;

    const overlay = document.getElementById("quickViewOverlay");
    const content = document.getElementById("quickViewContent");

    if (!overlay || !content) return;

    // Stock & Availability checks
    const isOutOfStock = prod.stockStatus === "out_of_stock" || (typeof prod.stock !== 'undefined' && prod.stock <= 0);
    const isUnavailable = prod.availability === "unavailable";
    const isBackorder = prod.stockStatus === "on_backorder";
    const isPurchaseDisabled = isUnavailable || isOutOfStock;

    let stockPillHTML = `<span class="stock-availability-pill in-stock"><i class="fa-solid fa-circle-check"></i> In Stock</span>`;
    if (isUnavailable) {
        stockPillHTML = `<span class="stock-availability-pill unavailable"><i class="fa-solid fa-ban"></i> Currently Unavailable</span>`;
    } else if (isOutOfStock) {
        stockPillHTML = `<span class="stock-availability-pill out-of-stock"><i class="fa-solid fa-circle-xmark"></i> Out of Stock</span>`;
    } else if (isBackorder) {
        stockPillHTML = `<span class="stock-availability-pill backorder"><i class="fa-solid fa-clock"></i> On Backorder</span>`;
    }

    content.innerHTML = `
        <div class="product-details-layout" style="margin-bottom:0; padding:0; border:none;">
            <div class="product-gallery">
                <div class="main-image-container" style="cursor:default;">
                    <img src="${prod.image}" alt="${prod.title}" onerror="this.src='assets/logo.png'">
                </div>
            </div>
            <div class="product-info-panel">
                <div class="brand-tag">PRETUTE ORIGINAL</div>
                <h1 class="product-title" style="font-size:1.8rem;">${prod.title}</h1>
                <div style="margin-bottom: 8px;">${stockPillHTML}</div>
                <div class="product-rating-box" style="margin-bottom:12px;">
                    <div class="stars">
                        ${getRatingStarsHTML(prod.rating)}
                    </div>
                </div>
                <div class="price-box" style="margin-bottom:12px;">
                    <span class="discount-price" style="font-size:1.8rem;">₹${prod.price.toFixed(2)}</span>
                    <span class="original-price" style="font-size:1.1rem;">₹${prod.originalPrice.toFixed(2)}</span>
                </div>
                <p class="product-short-desc" style="margin-bottom:20px;">${prod.shortDesc}</p>
                <div class="purchase-actions" style="margin-bottom:0; display:flex; gap:8px; flex-wrap:wrap;">
                    <button class="btn btn-primary modal-add-to-cart-btn ${isPurchaseDisabled ? 'disabled' : ''}" ${isPurchaseDisabled ? 'disabled' : ''}>
                        <i class="fa-solid ${isPurchaseDisabled ? 'fa-ban' : 'fa-bag-shopping'}"></i> ${isPurchaseDisabled ? (isUnavailable ? 'Unavailable' : 'Out of Stock') : 'Add to Bag'}
                    </button>
                    <button class="btn modal-buy-now-btn ${isPurchaseDisabled ? 'disabled' : ''}" ${isPurchaseDisabled ? 'disabled' : ''}>
                        <i class="fa-solid fa-bolt"></i> Buy Now
                    </button>
                    <a href="#product/${prod.id}" class="btn btn-outline modal-view-details-btn">Full Details</a>
                </div>
            </div>
        </div>
    `;

    // Bind add to cart & buy now
    if (!isPurchaseDisabled) {
        content.querySelector(".modal-add-to-cart-btn").addEventListener("click", () => {
            addToCart(prod.id, 1, prod.sizes[0] || "Standard");
            closeQuickViewModal();
            openCartDrawer();
        });

        content.querySelector(".modal-buy-now-btn")?.addEventListener("click", () => {
            addToCart(prod.id, 1, prod.sizes[0] || "Standard");
            closeQuickViewModal();
            window.location.hash = "#cart";
        });
    }

    content.querySelector(".modal-view-details-btn").addEventListener("click", () => {
        closeQuickViewModal();
    });

    overlay.classList.add("active");
}

function closeQuickViewModal() {
    document.getElementById("quickViewOverlay").classList.remove("active");
}

// Bind modal closing elements
document.getElementById("closeModalBtn")?.addEventListener("click", closeQuickViewModal);
document.getElementById("quickViewOverlay")?.addEventListener("click", (e) => {
    if (e.target === document.getElementById("quickViewOverlay")) {
        closeQuickViewModal();
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeQuickViewModal();
        closeCartDrawer();
    }
});
// Store Categories Rendering (Synchronized with Back Panel)
function renderWordPressCategories() {
    const containers = document.querySelectorAll(".category-scroll-container");
    if (!containers.length) return;

    const allCategories = (typeof StoreData !== 'undefined' && StoreData.getCategories)
        ? StoreData.getCategories()
        : [
            { slug: "baby-fashion", name: "Baby & Kids", image: "assets/prod_romper.png" },
            { slug: "wooden-toys", name: "Montessori Toys", image: "assets/prod_rainbow.png" },
            { slug: "baby-gear", name: "Baby Gear", image: "assets/prod_stroller.png" },
            { slug: "maternity", name: "Maternity", image: "assets/prod_dress.png" },
            { slug: "diy-kit", name: "DIY Kit", image: "assets/DIY KIT.jpg" },
            { slug: "resin-art", name: "Resin Art", image: "assets/Resin Art.jpg" },
            { slug: "decorative-shop", name: "Decorative Shop", image: "assets/Decorative Shop.jpg" },
            { slug: "candle", name: "Candle", image: "assets/candle.jpg" },
            { slug: "corporate-gifts", name: "Corporate Gifts", image: "assets/Corporate Gifts.jpg" },
            { slug: "home-decor", name: "Home Decor", image: "assets/Home Decor.jpg" },
            { slug: "treasure-keeps", name: "Treasure Keeps", image: "assets/Treasure Keeps.jpg" }
        ];

    // Filter out deactivated categories or those hidden from homepage
    const categories = allCategories.filter(c => c.status !== "deactivated" && c.showOnHome !== false);

    containers.forEach(container => {
        container.innerHTML = "";
        categories.forEach(cat => {
            const catImg = cat.image || "assets/logo.png";
            const catCard = document.createElement("a");
            catCard.href = `#category/${cat.slug}`;
            catCard.className = "cat-scroll-card";

            catCard.innerHTML = `
                <div class="cat-img-wrapper">
                    <img src="${catImg}" alt="${cat.name}" onerror="this.src='assets/logo.png'">
                </div>
                <span class="cat-name">${cat.name}</span>
            `;
            container.appendChild(catCard);
        });
    });
}

// ==========================================================================
// STORE OWNER / ADMIN SECRET ACCESS TRIGGERS (HIDDEN FROM REGULAR CUSTOMERS)
// ==========================================================================
(function setupSecretAdminTriggers() {
    // 1. Keyboard Shortcut: Ctrl + Shift + A or Alt + Shift + A
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
            e.preventDefault();
            window.location.href = "admin.html";
        }
    });

    // 2. Secret Triple-Click on Footer Copyright
    const attachCopyrightTrigger = () => {
        const copyrightEl = document.getElementById("footerCopyright") || document.querySelector(".copyright");
        if (copyrightEl) {
            let clicks = 0;
            let timer = null;
            copyrightEl.addEventListener("click", () => {
                clicks++;
                clearTimeout(timer);
                if (clicks >= 3) {
                    window.location.href = "admin.html";
                    clicks = 0;
                } else {
                    timer = setTimeout(() => { clicks = 0; }, 600);
                }
            });
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", attachCopyrightTrigger);
    } else {
        attachCopyrightTrigger();
    }
})();
