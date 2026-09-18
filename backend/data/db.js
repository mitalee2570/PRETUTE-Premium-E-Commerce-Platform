const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname);

// Default Seed Data
const SEEDS = {
  products: [
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
      featured: true,
      stockStatus: "in_stock",
      availability: "available",
      status: "active"
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
      featured: true,
      stockStatus: "in_stock",
      availability: "available",
      status: "active"
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
      featured: true,
      stockStatus: "in_stock",
      availability: "available",
      status: "active"
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
      featured: true,
      stockStatus: "in_stock",
      availability: "available",
      status: "active"
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
      featured: true,
      stockStatus: "in_stock",
      availability: "available",
      status: "active"
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
      featured: true,
      stockStatus: "in_stock",
      availability: "available",
      status: "active"
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
      featured: true,
      stockStatus: "in_stock",
      availability: "available",
      status: "active"
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
      featured: true,
      stockStatus: "in_stock",
      availability: "available",
      status: "active"
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
      featured: false,
      stockStatus: "in_stock",
      availability: "available",
      status: "active"
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
      featured: false,
      stockStatus: "in_stock",
      availability: "available",
      status: "active"
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
      featured: false,
      stockStatus: "in_stock",
      availability: "available",
      status: "active"
    }
  ],
  categories: [
    { id: 1, slug: "baby-fashion", name: "Baby & Kids Apparel", image: "assets/prod_romper.png", description: "Organic baby clothes, rompers and cute kids outfits", showOnHome: true, status: "active", availability: "available" },
    { id: 2, slug: "wooden-toys", name: "Montessori Toys", image: "assets/prod_rainbow.png", description: "Handcrafted wooden toys, stackers and brain games", showOnHome: true, status: "active", availability: "available" },
    { id: 3, slug: "baby-gear", name: "Baby Gear & Nursery", image: "assets/prod_stroller.png", description: "Strollers, cribs and premium nursery essentials", showOnHome: true, status: "active", availability: "available" },
    { id: 4, slug: "maternity", name: "Maternity Wear", image: "assets/prod_dress.png", description: "Comfortable dresses, bump-friendly loungewear", showOnHome: true, status: "active", availability: "available" },
    { id: 5, slug: "diy-kit", name: "DIY Kit", image: "assets/DIY KIT.jpg", description: "Creative do-it-yourself craft kits for all ages", showOnHome: true, status: "active", availability: "available" },
    { id: 6, slug: "resin-art", name: "Resin Art", image: "assets/Resin Art.jpg", description: "Handcrafted glossy resin clocks, coasters and decor", showOnHome: true, status: "active", availability: "available" },
    { id: 7, slug: "candle", name: "Candle & Aromas", image: "assets/candle.jpg", description: "Scented organic soy wax candles and aroma diffusers", showOnHome: true, status: "active", availability: "available" },
    { id: 8, slug: "decorative-shop", name: "Decorative Shop", image: "assets/Decorative Shop.jpg", description: "Handmade decorative showpieces and artistic accents", showOnHome: true, status: "active", availability: "available" },
    { id: 9, slug: "corporate-gifts", name: "Corporate Gifts", image: "assets/Corporate Gifts.jpg", description: "Customized corporate gift hampers and luxury packaging", showOnHome: true, status: "active", availability: "available" },
    { id: 10, slug: "home-decor", name: "Home Decor", image: "assets/Home Decor.jpg", description: "Artisan wall hangings, table decor and craft aesthetics", showOnHome: true, status: "active", availability: "available" },
    { id: 11, slug: "treasure-keeps", name: "Treasure Keeps", image: "assets/Treasure Keeps.jpg", description: "Personalized keepsake frames and memories preservation", showOnHome: true, status: "active", availability: "available" }
  ],
  banners: [
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
  ],
  orders: [
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
  ],
  coupons: [
    { code: "PRETUTE20", type: "percent", value: 20, minSpend: 0, description: "Flat 20% Off entire order", active: true, status: "active", expiryDate: "2026-12-31", usageLimit: 500, usageCount: 42 },
    { code: "GEAR25", type: "category", category: "baby-gear", value: 25, minSpend: 0, description: "25% Off Nursery & Baby Gear", active: true, status: "active", expiryDate: "2026-12-31", usageLimit: 200, usageCount: 18 },
    { code: "MOM15", type: "flat", value: 1000, minSpend: 4999, description: "₹1,000 Off on orders above ₹4,999", active: true, status: "active", expiryDate: "2026-11-30", usageLimit: 100, usageCount: 8 },
    { code: "PLAYFREE", type: "flat", value: 500, minSpend: 1500, description: "Flat ₹500 Off toys & gifts", active: true, status: "active", expiryDate: "2026-10-31", usageLimit: 150, usageCount: 23 },
    { code: "FESTIVE30", type: "percent", value: 30, minSpend: 2500, description: "30% Off on orders above ₹2,500", active: true, status: "active", expiryDate: "2026-12-31", usageLimit: 300, usageCount: 65 },
    { code: "EXPIRED50", type: "percent", value: 50, minSpend: 1000, description: "Flash 50% Off (Expired Demo)", active: false, status: "expired", expiryDate: "2026-08-01", usageLimit: 50, usageCount: 50 }
  ],
  messages: [
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
  ],
  settings: {
    storeName: "PRETUTE | Premium Lifestyle & Crafts",
    announcementText: "🌟 Spend ₹1,499+ for Free Shipping! | Code: <span class=\"promo-highlight\">PRETUTE20</span>",
    announcementActive: true,
    contactEmail: "mitaleemaurya@gmail.com",
    contactPhone: "+91 87572 01351",
    currencySymbol: "₹",
    adminPin: "1234",
    adminPass: "admin123"
  },
  customers: [
    {
      id: "cust-1",
      name: "Mitalee Maurya",
      email: "mitaleemaurya@gmail.com",
      phone: "8757201351",
      password: "password123",
      createdAt: "2026-01-15T10:00:00.000Z",
      address: {
        street: "Flat 402, Lotus Orchid, Palm Beach Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400705"
      }
    }
  ]
};

// Database helper functions
function getFilePath(key) {
  return path.join(DATA_DIR, `${key}.json`);
}

function read(key) {
  const filePath = getFilePath(key);
  try {
    if (!fs.existsSync(filePath)) {
      write(key, SEEDS[key] || []);
      return SEEDS[key] || [];
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${key}.json:`, err);
    return SEEDS[key] || [];
  }
}

function write(key, data) {
  const filePath = getFilePath(key);
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${key}.json:`, err);
    return false;
  }
}

// Initialize files on startup
function init() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  for (const key of Object.keys(SEEDS)) {
    const filePath = getFilePath(key);
    if (!fs.existsSync(filePath)) {
      write(key, SEEDS[key]);
    }
  }
}

init();

module.exports = {
  read,
  write,
  SEEDS
};
