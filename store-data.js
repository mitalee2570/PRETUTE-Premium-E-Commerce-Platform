/**
 * PRETUTE - Unified Persistent Store Data Layer
 * Handles Products, Categories, Orders, Coupons, Messages, and Store Settings.
 * Stores data in localStorage and provides a synchronized API for Storefront & Back Panel.
 */

(function () {
    const STORAGE_KEYS = {
        PRODUCTS: "pretute_db_products",
        CATEGORIES: "pretute_db_categories",
        BANNERS: "pretute_db_banners",
        ORDERS: "pretute_db_orders",
        COUPONS: "pretute_db_coupons",
        MESSAGES: "pretute_db_messages",
        SETTINGS: "pretute_db_settings",
        AUTH: "pretute_admin_auth",
        CUSTOMERS: "pretute_db_customers",
        CUSTOMER_SESSION: "pretute_customer_session"
    };

    // Default Seed Customer for Testing
    const DEFAULT_CUSTOMERS = [
        {
            id: "cust-1",
            name: "Mitalee Sharma",
            email: "customer@pretute.com",
            phone: "9876543210",
            password: "password123",
            createdAt: "2026-01-15T10:00:00.000Z",
            address: {
                street: "Flat 402, Lotus Orchid, Palm Beach Road",
                city: "Mumbai",
                state: "Maharashtra",
                pincode: "400705"
            }
        }
    ];

    // Default Seed Banners (Homepage Carousel Sliders)
    const DEFAULT_BANNERS = [
        {
            id: 1,
            title: "Luxury Organic Wear for Little Ones",
            headline: "Luxury Organic Wear for Little Ones",
            subtitle: "Spring/Summer Collection",
            description: "Aesthetic pastel rompers and kids apparel hand-knit with 100% GOTS-certified organic cotton.",
            image: "assets/hero_fashion.png",
            btn1Text: "Shop Kids Fashion",
            btn1Link: "#category/baby-fashion",
            btn2Text: "Explore Maternity",
            btn2Link: "#category/maternity",
            order: 1,
            active: true
        },
        {
            id: 2,
            title: "Handcrafted Montessori Toys",
            headline: "Handcrafted Montessori Toys",
            subtitle: "Play & Grow",
            description: "Promote creative exploration, sensory growth, and active learning with premium toxin-free wood playsets.",
            image: "assets/hero_toys.png",
            btn1Text: "Shop Montessori Toys",
            btn1Link: "#category/wooden-toys",
            btn2Text: "View Best Sellers",
            btn2Link: "#home",
            order: 2,
            active: true
        },
        {
            id: 3,
            title: "Artisan Crafts & Home Decor",
            headline: "Artisan Crafts & Home Decor",
            subtitle: "Handmade Aesthetics",
            description: "Curated collection of handcrafted resin clocks, soy candles, and bohemian lifestyle accents.",
            image: "assets/Resin Art.jpg",
            btn1Text: "Explore Crafts",
            btn1Link: "#category/resin-art",
            btn2Text: "Shop Candles",
            btn2Link: "#category/candle",
            order: 3,
            active: true
        }
    ];

    // Default Seed Categories
    const DEFAULT_CATEGORIES = [
        { id: 1, slug: "baby-fashion", name: "Baby & Kids Apparel", image: "assets/prod_romper.png", description: "Organic baby clothes, rompers and cute kids outfits" },
        { id: 2, slug: "wooden-toys", name: "Montessori Toys", image: "assets/prod_rainbow.png", description: "Handcrafted wooden toys, stackers and brain games" },
        { id: 3, slug: "baby-gear", name: "Baby Gear & Nursery", image: "assets/prod_stroller.png", description: "Strollers, cribs and premium nursery essentials" },
        { id: 4, slug: "maternity", name: "Maternity Wear", image: "assets/prod_dress.png", description: "Comfortable dresses, bump-friendly loungewear" },
        { id: 5, slug: "diy-kit", name: "DIY Kit", image: "assets/DIY KIT.jpg", description: "Creative do-it-yourself craft kits for all ages" },
        { id: 6, slug: "resin-art", name: "Resin Art", image: "assets/Resin Art.jpg", description: "Handcrafted glossy resin clocks, coasters and decor" },
        { id: 7, slug: "candle", name: "Candle & Aromas", image: "assets/candle.jpg", description: "Scented organic soy wax candles and aroma diffusers" },
        { id: 8, slug: "decorative-shop", name: "Decorative Shop", image: "assets/Decorative Shop.jpg", description: "Handmade decorative showpieces and artistic accents" },
        { id: 9, slug: "corporate-gifts", name: "Corporate Gifts", image: "assets/Corporate Gifts.jpg", description: "Customized corporate gift hampers and luxury packaging" },
        { id: 10, slug: "home-decor", name: "Home Decor", image: "assets/Home Decor.jpg", description: "Artisan wall hangings, table decor and craft aesthetics" },
        { id: 11, slug: "treasure-keeps", name: "Treasure Keeps", image: "assets/Treasure Keeps.jpg", description: "Personalized keepsake frames and memories preservation" }
    ];

    // Default Seed Products
    const DEFAULT_PRODUCTS = [
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
            stock: 45,
            rating: 4.8,
            reviewsCount: 42,
            badge: "Best Seller",
            shortDesc: "Made from ultra-soft GOTS-certified organic knit cotton, keeping your little bundle comfortable all day long. Features simple nickel-free snap buttons.",
            longDesc: "Our Organic Cotton Ribbed Romper is engineered for pure comfort. Designed to support flexible mobility and easy movements, this item features flat seams that will not irritate your child's delicate skin.",
            sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
            featured: true
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
            stock: 28,
            rating: 4.9,
            reviewsCount: 56,
            badge: "Trending",
            shortDesc: "Aesthetic wooden rainbow stacking blocks to promote creative exploration, spatial reasoning, and hand-eye coordination.",
            longDesc: "Our Waldorf-inspired rainbow stacker is handcrafted from solid FSC-certified beechwood and tinted with non-toxic, water-based stains.",
            sizes: ["Standard", "Large"],
            featured: true
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
            stock: 12,
            rating: 4.7,
            reviewsCount: 31,
            badge: "Luxury",
            shortDesc: "Aesthetic, ultra-lightweight travel stroller with one-hand folding, multi-position recline, and dynamic shock absorbers.",
            longDesc: "The AeroGlide Premium Stroller is designed for the modern family on the move. Featuring a carbon graphite chassis, it is exceptionally strong yet lightweight.",
            sizes: ["One Size"],
            featured: true
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
            stock: 19,
            rating: 4.6,
            reviewsCount: 19,
            badge: "New",
            shortDesc: "Breathable organic linen midi dress featuring a flexible smocked bodice and nursing-friendly concealed zippers.",
            longDesc: "Embrace elegance and comfort throughout pregnancy and beyond. Crafted from 100% natural, breathable European flax linen, this midi dress adjusts to your changing silhouette.",
            sizes: ["XS", "S", "M", "L", "XL"],
            featured: true
        },
        {
            id: 5,
            title: "Artisan DIY Craft Starter Kit",
            category: "diy-kit",
            categoryLabel: "DIY Kit",
            image: "assets/DIY KIT.jpg",
            images: ["assets/DIY KIT.jpg"],
            originalPrice: 1899.00,
            price: 1399.00,
            discount: 26,
            stock: 35,
            rating: 4.9,
            reviewsCount: 28,
            badge: "Hot Deal",
            shortDesc: "Complete all-in-one DIY kit including paints, brushes, canvas, and wooden elements for creative crafting at home.",
            longDesc: "Unleash creativity with this comprehensive kit packed with non-toxic art supplies, detailed guide booklet, and reusable materials.",
            sizes: ["Standard Box"],
            featured: true
        },
        {
            id: 6,
            title: "Handcrafted Ocean Breeze Resin Clock",
            category: "resin-art",
            categoryLabel: "Resin Art",
            image: "assets/Resin Art.jpg",
            images: ["assets/Resin Art.jpg"],
            originalPrice: 3999.00,
            price: 2899.00,
            discount: 27,
            stock: 8,
            rating: 5.0,
            reviewsCount: 34,
            badge: "Handmade",
            shortDesc: "Glossy ocean wave resin wall clock crafted with real gold foil and premium high-torque silent quartz clock movement.",
            longDesc: "Each piece is hand-poured in small batches, featuring multilayered resin ocean waves, gold numbers, and durable teakwood backing.",
            sizes: ["12 Inch", "16 Inch"],
            featured: true
        },
        {
            id: 7,
            title: "Organic Lavender Scented Soy Candle",
            category: "candle",
            categoryLabel: "Candle",
            image: "assets/candle.jpg",
            images: ["assets/candle.jpg"],
            originalPrice: 999.00,
            price: 699.00,
            discount: 30,
            stock: 50,
            rating: 4.8,
            reviewsCount: 45,
            badge: "Eco-Friendly",
            shortDesc: "100% natural soy wax scented candle with calming French lavender, wooden crackling wick, and 45-hour clean burn time.",
            longDesc: "Poured in an elegant glass jar with a natural cork lid. Clean, smoke-free burn filled with pure essential oils.",
            sizes: ["200g Jar"],
            featured: true
        },
        {
            id: 8,
            title: "Nordic Ceramic Flower Vase Showpiece",
            category: "decorative-shop",
            categoryLabel: "Decorative Shop",
            image: "assets/Decorative Shop.jpg",
            images: ["assets/Decorative Shop.jpg"],
            originalPrice: 2499.00,
            price: 1799.00,
            discount: 28,
            stock: 14,
            rating: 4.7,
            reviewsCount: 15,
            badge: "Trending",
            shortDesc: "Matte finish ceramic donut vase, minimalist aesthetic modern home and office decoration piece.",
            longDesc: "Handmade by local ceramic artisans, boasting a stylish modern silhouette perfect for dried pampas grass or fresh flowers.",
            sizes: ["Medium", "Large"],
            featured: true
        },
        {
            id: 9,
            title: "Executive Luxury Corporate Gift Hamper",
            category: "corporate-gifts",
            categoryLabel: "Corporate Gifts",
            image: "assets/Corporate Gifts.jpg",
            images: ["assets/Corporate Gifts.jpg"],
            originalPrice: 4999.00,
            price: 3899.00,
            discount: 22,
            stock: 20,
            rating: 4.9,
            reviewsCount: 39,
            badge: "Corporate",
            shortDesc: "Premium leather journal, metal pen, scented candle, and artisan confectionery packed in a velvet keepsake box.",
            longDesc: "Designed for executive gifting, client appreciation, and festive corporate events. Customizable branding available on bulk orders.",
            sizes: ["Luxury Hamper"],
            featured: false
        },
        {
            id: 10,
            title: "Aesthetic Bohemian Wall Hanging Tapestry",
            category: "home-decor",
            categoryLabel: "Home Decor",
            image: "assets/Home Decor.jpg",
            images: ["assets/Home Decor.jpg"],
            originalPrice: 2199.00,
            price: 1499.00,
            discount: 31,
            stock: 22,
            rating: 4.8,
            reviewsCount: 27,
            badge: "Artisan",
            shortDesc: "Handwoven macrame cotton rope wall hanging tapestry with natural wooden dowel and tassel detailing.",
            longDesc: "Infuse your living room, nursery, or bedroom with warm boho vibes. Hand-knotted from soft natural unbleached cotton rope.",
            sizes: ["60cm x 80cm"],
            featured: false
        },
        {
            id: 11,
            title: "Customized Baby Footprint Keepsake Frame",
            category: "treasure-keeps",
            categoryLabel: "Treasure Keeps",
            image: "assets/Treasure Keeps.jpg",
            images: ["assets/Treasure Keeps.jpg"],
            originalPrice: 2799.00,
            price: 1999.00,
            discount: 28,
            stock: 18,
            rating: 5.0,
            reviewsCount: 61,
            badge: "Memories",
            shortDesc: "Clay impression and photo wooden shadow box frame to immortalize baby handprints and footprints forever.",
            longDesc: "Includes non-toxic baby-safe air-dry clay, wooden styling frame, rolling pin, and acrylic transparent protection cover.",
            sizes: ["Shadow Box Frame"],
            featured: false
        }
    ];

    // Default Seed Coupons
    const DEFAULT_COUPONS = [
        { code: "PRETUTE20", type: "percent", value: 20, minSpend: 0, description: "Flat 20% Off entire order", active: true, status: "active", expiryDate: "2026-12-31", usageLimit: 500, usageCount: 42 },
        { code: "GEAR25", type: "category", category: "baby-gear", value: 25, minSpend: 0, description: "25% Off Nursery & Baby Gear", active: true, status: "active", expiryDate: "2026-12-31", usageLimit: 200, usageCount: 18 },
        { code: "MOM15", type: "flat", value: 1000, minSpend: 4999, description: "₹1,000 Off on orders above ₹4,999", active: true, status: "active", expiryDate: "2026-11-30", usageLimit: 100, usageCount: 8 },
        { code: "PLAYFREE", type: "flat", value: 500, minSpend: 1500, description: "Flat ₹500 Off toys & gifts", active: true, status: "active", expiryDate: "2026-10-31", usageLimit: 150, usageCount: 23 },
        { code: "FESTIVE30", type: "percent", value: 30, minSpend: 2500, description: "30% Off on orders above ₹2,500", active: true, status: "active", expiryDate: "2026-12-31", usageLimit: 300, usageCount: 65 },
        { code: "EXPIRED50", type: "percent", value: 50, minSpend: 1000, description: "Flash 50% Off (Expired Demo)", active: false, status: "expired", expiryDate: "2026-08-01", usageLimit: 50, usageCount: 50 }
    ];

    // Default Seed Orders for Dashboard Realism
    const DEFAULT_ORDERS = [
        {
            id: "PRT-984210",
            date: "2026-09-05T14:32:00.000Z",
            customerName: "Aarav Sharma",
            customerEmail: "aarav.sharma@example.com",
            customerPhone: "+91 98765 43210",
            address: "Flat 402, Lotus Heights, Sector 45, Gurgaon, Haryana 122003",
            items: [
                { productId: 1, title: "Organic Cotton Ribbed Romper", price: 999, quantity: 2, image: "assets/prod_romper.png" },
                { productId: 7, title: "Organic Lavender Scented Soy Candle", price: 699, quantity: 1, image: "assets/candle.jpg" }
            ],
            subtotal: 2697.00,
            discount: 539.40,
            couponUsed: "PRETUTE20",
            total: 2157.60,
            paymentMethod: "Online UPI",
            status: "Delivered",
            notes: "Please leave package with building security if not available."
        },
        {
            id: "PRT-874129",
            date: "2026-09-06T09:15:00.000Z",
            customerName: "Pooja Verma",
            customerEmail: "pooja.v@example.com",
            customerPhone: "+91 98112 34567",
            address: "B-12, Green Park Main, New Delhi 110016",
            items: [
                { productId: 3, title: "AeroGlide Premium Stroller", price: 11999, quantity: 1, image: "assets/prod_stroller.png" }
            ],
            subtotal: 11999.00,
            discount: 2999.75,
            couponUsed: "GEAR25",
            total: 8999.25,
            paymentMethod: "Credit Card",
            status: "Shipped",
            notes: "Call before delivery."
        },
        {
            id: "PRT-763914",
            date: "2026-09-06T11:45:00.000Z",
            customerName: "Rohan Kulkarni",
            customerEmail: "rohan.k@example.com",
            customerPhone: "+91 99201 88776",
            address: "701, Silver Crest, Bandra West, Mumbai, Maharashtra 400050",
            items: [
                { productId: 6, title: "Handcrafted Ocean Breeze Resin Clock", price: 2899, quantity: 1, image: "assets/Resin Art.jpg" },
                { productId: 5, title: "Artisan DIY Craft Starter Kit", price: 1399, quantity: 1, image: "assets/DIY KIT.jpg" }
            ],
            subtotal: 4298.00,
            discount: 0,
            couponUsed: null,
            total: 4298.00,
            paymentMethod: "Cash on Delivery",
            status: "Pending",
            notes: "Gift packing requested."
        }
    ];

    // Default Inquiries / Messages
    const DEFAULT_MESSAGES = [
        {
            id: "msg-101",
            date: "2026-09-05T16:20:00.000Z",
            name: "Ananya Iyer",
            email: "ananya.iyer@gmail.com",
            subject: "Bulk Corporate Order Inquiry",
            message: "Hello team, we are planning a festival gifting event for 150 employees. Can we customize the Luxury Corporate Gift Hampers with our company logo?",
            read: false
        },
        {
            id: "msg-102",
            date: "2026-09-04T10:10:00.000Z",
            name: "Vikas Malhotra",
            email: "vikas.m@yahoo.com",
            subject: "Resin Clock Custom Size",
            message: "Can I order the Ocean Breeze resin clock in a custom 24-inch diameter? Please share quotation and delivery timeline to Bengaluru.",
            read: true
        }
    ];

    // Default Settings
    const DEFAULT_SETTINGS = {
        storeName: "PRETUTE | Premium Lifestyle & Crafts",
        announcementText: "🌟 Spend ₹1,499+ for Free Shipping! | Code: PRETUTE20",
        announcementActive: true,
        contactEmail: "support@pretute.com",
        contactPhone: "+91 98765 43210",
        currencySymbol: "₹",
        adminPin: "1234",
        adminPass: "admin123"
    };

    // Helper functions for localStorage
    function readData(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return fallback;
            return JSON.parse(raw);
        } catch (e) {
            console.error(`Error reading ${key} from storage:`, e);
            return fallback;
        }
    }

    function writeData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            window.dispatchEvent(new CustomEvent("pretute_data_sync", { detail: { key, data } }));
            return true;
        } catch (e) {
            console.error(`Error writing ${key} to storage:`, e);
            return false;
        }
    }

    // Initialize data if not yet present
    function initDatabase() {
        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
            writeData(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
            writeData(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
        }
        if (!localStorage.getItem(STORAGE_KEYS.BANNERS)) {
            writeData(STORAGE_KEYS.BANNERS, DEFAULT_BANNERS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.COUPONS)) {
            writeData(STORAGE_KEYS.COUPONS, DEFAULT_COUPONS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
            writeData(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
            writeData(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
        }
        if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
            writeData(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
        }
    }

    // Run init immediately
    initDatabase();

    // Exported Public API
    window.StoreData = {
        // --- PRODUCTS ---
        getProducts() {
            const raw = readData(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
            return raw.map(p => {
                const stockNum = parseInt(p.stock) || 0;
                return {
                    ...p,
                    stock: stockNum,
                    stockStatus: p.stockStatus || (stockNum > 0 ? "in_stock" : "out_of_stock"),
                    availability: p.availability || "available", // 'available' | 'unavailable'
                    status: p.status || "active"                 // 'active' | 'deactivated'
                };
            });
        },
        getProductById(id) {
            const products = this.getProducts();
            return products.find(p => String(p.id) === String(id)) || null;
        },
        saveProduct(product) {
            const products = this.getProducts();
            const stockNum = parseInt(product.stock) || 0;
            const normalizedProduct = {
                ...product,
                stock: stockNum,
                stockStatus: product.stockStatus || (stockNum > 0 ? "in_stock" : "out_of_stock"),
                availability: product.availability || "available",
                status: product.status || "active"
            };

            if (normalizedProduct.id) {
                // Update
                const index = products.findIndex(p => String(p.id) === String(normalizedProduct.id));
                if (index !== -1) {
                    products[index] = { ...products[index], ...normalizedProduct };
                } else {
                    products.push(normalizedProduct);
                }
            } else {
                // New product
                normalizedProduct.id = Date.now();
                products.unshift(normalizedProduct);
            }
            writeData(STORAGE_KEYS.PRODUCTS, products);
            return normalizedProduct;
        },
        deleteProduct(id) {
            const products = this.getProducts().filter(p => String(p.id) !== String(id));
            writeData(STORAGE_KEYS.PRODUCTS, products);
            return true;
        },
        toggleProductStatus(id) {
            const products = this.getProducts();
            const prod = products.find(p => String(p.id) === String(id));
            if (prod) {
                prod.status = prod.status === "deactivated" ? "active" : "deactivated";
                writeData(STORAGE_KEYS.PRODUCTS, products);
                return prod;
            }
            return null;
        },
        toggleProductStock(id) {
            const products = this.getProducts();
            const prod = products.find(p => String(p.id) === String(id));
            if (prod) {
                if (prod.stockStatus === "out_of_stock" || prod.stock <= 0) {
                    prod.stockStatus = "in_stock";
                    if (prod.stock <= 0) prod.stock = 15;
                } else {
                    prod.stockStatus = "out_of_stock";
                    prod.stock = 0;
                }
                writeData(STORAGE_KEYS.PRODUCTS, products);
                return prod;
            }
            return null;
        },

        // --- CATEGORIES ---
        getCategories() {
            const raw = readData(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
            return raw.map(c => ({
                ...c,
                status: c.status || "active",               // 'active' | 'deactivated'
                availability: c.availability || "available", // 'available' | 'unavailable'
                showOnHome: c.showOnHome !== false
            }));
        },
        saveCategory(category) {
            const categories = this.getCategories();
            const normalizedCategory = {
                ...category,
                status: category.status || "active",
                availability: category.availability || "available",
                showOnHome: category.showOnHome !== false
            };

            if (normalizedCategory.id) {
                const index = categories.findIndex(c => String(c.id) === String(normalizedCategory.id));
                if (index !== -1) {
                    categories[index] = { ...categories[index], ...normalizedCategory };
                } else {
                    categories.push(normalizedCategory);
                }
            } else {
                normalizedCategory.id = Date.now();
                categories.push(normalizedCategory);
            }
            writeData(STORAGE_KEYS.CATEGORIES, categories);
            return normalizedCategory;
        },
        deleteCategory(idOrSlug) {
            const categories = this.getCategories().filter(c => String(c.id) !== String(idOrSlug) && c.slug !== idOrSlug);
            writeData(STORAGE_KEYS.CATEGORIES, categories);
            return true;
        },
        toggleCategoryStatus(idOrSlug) {
            const categories = this.getCategories();
            const cat = categories.find(c => String(c.id) === String(idOrSlug) || c.slug === idOrSlug);
            if (cat) {
                cat.status = cat.status === "deactivated" ? "active" : "deactivated";
                writeData(STORAGE_KEYS.CATEGORIES, categories);
                return cat;
            }
            return null;
        },

        // --- BANNERS / HOMEPAGE SLIDERS ---
        getBanners() {
            const raw = readData(STORAGE_KEYS.BANNERS, DEFAULT_BANNERS);
            return raw.map(b => ({
                ...b,
                headline: b.headline || b.title || "Luxury Collection",
                title: b.title || b.headline || "Luxury Collection",
                active: b.active !== false,
                status: b.active !== false ? "active" : "deactivated",
                order: parseInt(b.order) || 1
            })).sort((a, b) => a.order - b.order);
        },
        getBannerById(id) {
            const banners = this.getBanners();
            return banners.find(b => String(b.id) === String(id)) || null;
        },
        saveBanner(banner) {
            const banners = this.getBanners();
            const bannerTitle = banner.headline || banner.title || "Special Collection";
            const normalizedBanner = {
                ...banner,
                headline: bannerTitle,
                title: bannerTitle,
                order: parseInt(banner.order) || 1,
                active: banner.active !== false && banner.status !== "deactivated",
                status: banner.status || (banner.active !== false ? "active" : "deactivated")
            };

            if (normalizedBanner.id) {
                const index = banners.findIndex(b => String(b.id) === String(normalizedBanner.id));
                if (index !== -1) {
                    banners[index] = { ...banners[index], ...normalizedBanner };
                } else {
                    banners.push(normalizedBanner);
                }
            } else {
                normalizedBanner.id = Date.now();
                banners.push(normalizedBanner);
            }
            writeData(STORAGE_KEYS.BANNERS, banners);
            return normalizedBanner;
        },
        deleteBanner(id) {
            const banners = this.getBanners().filter(b => String(b.id) !== String(id));
            writeData(STORAGE_KEYS.BANNERS, banners);
            return true;
        },
        toggleBannerStatus(id) {
            const banners = this.getBanners();
            const banner = banners.find(b => String(b.id) === String(id));
            if (banner) {
                const newActive = banner.active === false;
                banner.active = newActive;
                banner.status = newActive ? "active" : "deactivated";
                writeData(STORAGE_KEYS.BANNERS, banners);
                return banner;
            }
            return null;
        },

        // --- ORDERS ---
        getOrders() {
            return readData(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
        },
        createOrder(orderData) {
            const orders = this.getOrders();
            const newOrder = {
                id: orderData.id || ("PRT-" + Math.floor(1000000 + Math.random() * 9000000)),
                date: new Date().toISOString(),
                status: "Pending",
                ...orderData
            };
            orders.unshift(newOrder);
            writeData(STORAGE_KEYS.ORDERS, orders);
            return newOrder;
        },
        updateOrderStatus(orderId, newStatus) {
            const orders = this.getOrders();
            const order = orders.find(o => o.id === orderId);
            if (order) {
                order.status = newStatus;
                writeData(STORAGE_KEYS.ORDERS, orders);
                return order;
            }
            return null;
        },
        cancelOrder(orderId, cancelReason) {
            const orders = this.getOrders();
            const order = orders.find(o => o.id === orderId);
            if (!order) return { success: false, message: "Order not found" };
            if (order.status === "Cancelled") return { success: false, message: "Order is already cancelled" };
            if (order.status === "Delivered") return { success: false, message: "Delivered orders cannot be cancelled directly. Please request a return/refund." };

            order.status = "Cancelled";
            order.cancelledAt = new Date().toISOString();
            order.cancelReason = cancelReason || "Cancelled by customer";

            // Restock product quantities
            if (Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const prod = this.getProductById(item.productId);
                    if (prod && typeof prod.stock !== 'undefined') {
                        const newStock = (parseInt(prod.stock) || 0) + (parseInt(item.quantity) || 1);
                        this.saveProduct({ ...prod, stock: newStock, stockStatus: newStock > 0 ? "in_stock" : "out_of_stock" });
                    }
                });
            }

            writeData(STORAGE_KEYS.ORDERS, orders);
            return { success: true, order };
        },
        requestRefund(orderId, refundData) {
            const orders = this.getOrders();
            const order = orders.find(o => o.id === orderId);
            if (!order) return { success: false, message: "Order not found" };

            const ticketId = "REF-" + Math.floor(10000 + Math.random() * 90000);
            order.status = "Refund Requested";
            order.refundDetails = {
                ticketId: ticketId,
                reason: refundData.reason || "Received Damaged Item",
                description: refundData.description || "",
                items: refundData.items || (order.items || []).map(it => it.title),
                videoProofName: refundData.videoProofName || "unboxing_damage_video.mp4",
                videoProofUrl: refundData.videoProofUrl || "",
                photoUrls: refundData.photoUrls || [],
                refundMethod: refundData.refundMethod || "Original Payment Source",
                upiId: refundData.upiId || "",
                requestedAt: new Date().toISOString(),
                status: "Under Review"
            };

            writeData(STORAGE_KEYS.ORDERS, orders);
            return { success: true, order, ticketId };
        },
        deleteOrder(orderId) {
            const orders = this.getOrders().filter(o => o.id !== orderId);
            writeData(STORAGE_KEYS.ORDERS, orders);
            return true;
        },

        // --- COUPONS ---
        getCoupons() {
            const raw = readData(STORAGE_KEYS.COUPONS, DEFAULT_COUPONS);
            return raw.map(c => {
                const expiry = c.expiryDate || "2026-12-31";
                const isExpired = expiry && new Date(expiry).setHours(23, 59, 59, 999) < Date.now();
                const isManuallyDeactivated = c.status === "deactivated" || c.active === false;
                let computedStatus = "active";
                if (isExpired) computedStatus = "expired";
                else if (isManuallyDeactivated) computedStatus = "deactivated";

                return {
                    ...c,
                    expiryDate: expiry,
                    isExpired: !!isExpired,
                    status: computedStatus,
                    active: computedStatus === "active",
                    usageLimit: typeof c.usageLimit !== 'undefined' ? c.usageLimit : 200,
                    usageCount: typeof c.usageCount !== 'undefined' ? c.usageCount : 0
                };
            });
        },
        saveCoupon(coupon) {
            const coupons = this.getCoupons();
            const normalizedCode = coupon.code.toUpperCase().trim();
            coupon.code = normalizedCode;
            coupon.expiryDate = coupon.expiryDate || "2026-12-31";

            const isExpired = coupon.expiryDate && new Date(coupon.expiryDate).setHours(23, 59, 59, 999) < Date.now();
            if (isExpired) {
                coupon.status = "expired";
                coupon.active = false;
            } else if (coupon.status === "deactivated") {
                coupon.active = false;
            } else {
                coupon.status = "active";
                coupon.active = true;
            }

            const index = coupons.findIndex(c => c.code === normalizedCode);
            if (index !== -1) {
                coupons[index] = { ...coupons[index], ...coupon };
            } else {
                coupons.push(coupon);
            }
            writeData(STORAGE_KEYS.COUPONS, coupons);
            return coupon;
        },
        deleteCoupon(code) {
            const coupons = this.getCoupons().filter(c => c.code !== code.toUpperCase().trim());
            writeData(STORAGE_KEYS.COUPONS, coupons);
            return true;
        },
        toggleCouponStatus(code) {
            const coupons = this.getCoupons();
            const coupon = coupons.find(c => c.code === code.toUpperCase().trim());
            if (coupon) {
                if (coupon.status === "deactivated") {
                    const isExpired = coupon.expiryDate && new Date(coupon.expiryDate).setHours(23, 59, 59, 999) < Date.now();
                    coupon.status = isExpired ? "expired" : "active";
                    coupon.active = !isExpired;
                } else {
                    coupon.status = "deactivated";
                    coupon.active = false;
                }
                writeData(STORAGE_KEYS.COUPONS, coupons);
                return coupon;
            }
            return null;
        },

        // --- MESSAGES / INQUIRIES ---
        getMessages() {
            return readData(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
        },
        saveMessage(msgData) {
            const messages = this.getMessages();
            const newMsg = {
                id: "msg-" + Date.now(),
                date: new Date().toISOString(),
                read: false,
                ...msgData
            };
            messages.unshift(newMsg);
            writeData(STORAGE_KEYS.MESSAGES, messages);
            return newMsg;
        },
        markMessageRead(id) {
            const messages = this.getMessages();
            const msg = messages.find(m => m.id === id);
            if (msg) {
                msg.read = true;
                writeData(STORAGE_KEYS.MESSAGES, messages);
                return true;
            }
            return false;
        },
        deleteMessage(id) {
            const messages = this.getMessages().filter(m => m.id !== id);
            writeData(STORAGE_KEYS.MESSAGES, messages);
            return true;
        },

        // --- STORE SETTINGS ---
        getSettings() {
            return readData(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
        },
        saveSettings(settings) {
            const current = this.getSettings();
            const updated = { ...current, ...settings };
            writeData(STORAGE_KEYS.SETTINGS, updated);
            return updated;
        },

        // --- AUTHENTICATION ---
        loginAdmin(passwordOrPin) {
            const settings = this.getSettings();
            if (passwordOrPin === settings.adminPass || passwordOrPin === settings.adminPin) {
                sessionStorage.setItem(STORAGE_KEYS.AUTH, "true");
                return true;
            }
            return false;
        },
        isAdminLoggedIn() {
            return sessionStorage.getItem(STORAGE_KEYS.AUTH) === "true";
        },
        logoutAdmin() {
            sessionStorage.removeItem(STORAGE_KEYS.AUTH);
            return true;
        },

        // --- CUSTOMER ACCOUNTS ---
        getCustomers() {
            return readData(STORAGE_KEYS.CUSTOMERS, DEFAULT_CUSTOMERS);
        },
        getCustomerById(id) {
            return this.getCustomers().find(c => c.id === id) || null;
        },
        registerCustomer(custData) {
            const customers = this.getCustomers();
            const normalizedEmail = (custData.email || "").trim().toLowerCase();
            const normalizedPhone = (custData.phone || "").trim();

            if (normalizedEmail && customers.some(c => c.email.toLowerCase() === normalizedEmail)) {
                return { success: false, message: "An account with this email already exists." };
            }
            if (normalizedPhone && customers.some(c => c.phone === normalizedPhone)) {
                return { success: false, message: "An account with this mobile number already exists." };
            }

            const newCust = {
                id: "cust-" + Date.now(),
                name: custData.name ? custData.name.trim() : "Customer",
                email: normalizedEmail,
                phone: normalizedPhone,
                password: custData.password || "password123",
                createdAt: new Date().toISOString(),
                address: custData.address || {
                    street: custData.street || "",
                    city: custData.city || "",
                    state: custData.state || "",
                    pincode: custData.pincode || ""
                }
            };

            customers.push(newCust);
            writeData(STORAGE_KEYS.CUSTOMERS, customers);
            this.setCurrentCustomer(newCust);
            return { success: true, customer: newCust };
        },
        loginCustomer(identifier, password) {
            const customers = this.getCustomers();
            const cleanId = (identifier || "").trim().toLowerCase();
            const cust = customers.find(c =>
                c.email.toLowerCase() === cleanId ||
                c.phone === cleanId ||
                (c.phone && c.phone.replace(/\D/g, '') === cleanId.replace(/\D/g, ''))
            );

            if (!cust) {
                return { success: false, message: "Account not found with this email or mobile number." };
            }

            if (cust.password && cust.password !== password) {
                return { success: false, message: "Incorrect password. Please try again." };
            }

            this.setCurrentCustomer(cust);
            return { success: true, customer: cust };
        },
        getCurrentCustomer() {
            const raw = localStorage.getItem("pretute_customer");
            if (raw) {
                try {
                    return JSON.parse(raw);
                } catch (e) {
                    return null;
                }
            }
            return null;
        },
        setCurrentCustomer(cust) {
            if (!cust) {
                localStorage.removeItem("pretute_customer");
                return;
            }
            const safeCust = {
                id: cust.id,
                name: cust.name,
                email: cust.email,
                phone: cust.phone,
                address: cust.address || { street: "", city: "", state: "", pincode: "" },
                createdAt: cust.createdAt
            };
            localStorage.setItem("pretute_customer", JSON.stringify(safeCust));
            return safeCust;
        },
        updateCustomer(updatedData) {
            const customers = this.getCustomers();
            const current = this.getCurrentCustomer();
            if (!current) return { success: false, message: "No user currently logged in" };

            const index = customers.findIndex(c => c.id === current.id || c.email.toLowerCase() === current.email.toLowerCase());
            if (index === -1) return { success: false, message: "Customer record not found" };

            const existing = customers[index];
            const updated = {
                ...existing,
                name: updatedData.name ? updatedData.name.trim() : existing.name,
                phone: updatedData.phone ? updatedData.phone.trim() : existing.phone,
                email: updatedData.email ? updatedData.email.trim().toLowerCase() : existing.email,
                address: {
                    ...(existing.address || {}),
                    ...(updatedData.address || {})
                }
            };

            if (updatedData.password) {
                updated.password = updatedData.password;
            }

            customers[index] = updated;
            writeData(STORAGE_KEYS.CUSTOMERS, customers);
            this.setCurrentCustomer(updated);
            return { success: true, customer: updated };
        },
        logoutCustomer() {
            localStorage.removeItem("pretute_customer");
            return true;
        },

        // --- BACKUP & RESTORE ---
        exportDatabase() {
            return {
                products: this.getProducts(),
                categories: this.getCategories(),
                banners: this.getBanners(),
                orders: this.getOrders(),
                coupons: this.getCoupons(),
                messages: this.getMessages(),
                settings: this.getSettings(),
                customers: this.getCustomers(),
                exportedAt: new Date().toISOString()
            };
        },
        importDatabase(data) {
            if (!data) return false;
            if (data.products) writeData(STORAGE_KEYS.PRODUCTS, data.products);
            if (data.categories) writeData(STORAGE_KEYS.CATEGORIES, data.categories);
            if (data.banners) writeData(STORAGE_KEYS.BANNERS, data.banners);
            if (data.orders) writeData(STORAGE_KEYS.ORDERS, data.orders);
            if (data.coupons) writeData(STORAGE_KEYS.COUPONS, data.coupons);
            if (data.messages) writeData(STORAGE_KEYS.MESSAGES, data.messages);
            if (data.settings) writeData(STORAGE_KEYS.SETTINGS, data.settings);
            if (data.customers) writeData(STORAGE_KEYS.CUSTOMERS, data.customers);
            return true;
        },
        resetToDefaults() {
            writeData(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
            writeData(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
            writeData(STORAGE_KEYS.BANNERS, DEFAULT_BANNERS);
            writeData(STORAGE_KEYS.COUPONS, DEFAULT_COUPONS);
            writeData(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
            writeData(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
            writeData(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
            writeData(STORAGE_KEYS.CUSTOMERS, DEFAULT_CUSTOMERS);
            return true;
        }
    };
})();
