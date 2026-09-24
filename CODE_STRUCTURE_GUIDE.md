# 📘 PRETUTE E-Commerce Platform: कोड स्ट्रक्चर व फ़ाइल एडिटिंग गाइड
### (Website & Admin Panel Editing Master Guide)

यह गाइड आपकी पूरी वेबसाइट और एडमिन पैनल की फ़ाइल्स का नक्शा है। अगर आपको कभी भी कोई टेक्स्ट, फ़ोटो, रंग, स्टाइल, बटन, एडमिन पैनल का फ़ीचर या डेटा बदलना हो, तो इस फ़ाइल को देखकर आप आसानी से सही फ़ाइल खोलकर बदलाव कर सकते हैं।

---

## 🗂️ 1. मुख्य फ़ोल्डर्स का ओवरव्यू (Project Structure)

```text
PRETUTE-Premium-E-Commerce-Platform/
│
├── CODE_STRUCTURE_GUIDE.md      <-- यह मास्टर गाइड फ़ाइल
├── package.json                 <-- पूरे प्रोजेक्ट के कमांड्स और डिपेंडेंसी
│
├── frontend/                    <-- वेबसाइट का पूरा दिखने वाला भाग (User Interface)
│   ├── public/assets/           <-- सारी फ़ोटो, लोगो और बैनर इमेजेस
│   └── src/
│       ├── App.jsx              <-- मुख्य रूटर (सारे सेक्शंस यहाँ जुड़े हैं)
│       ├── style.css            <-- स्टोरफ़्रंट की पूरी CSS और स्टाइलिंग
│       ├── admin.css            <-- एडमिन पैनल की पूरी CSS
│       ├── components/          <-- वेबसाइट के अलग-अलग हिस्से (सेक्शंस)
│       │   ├── admin/           <-- एडमिन पैनल के कोड
│       │   ├── home/            <-- होमपेज के सेक्शंस
│       │   ├── common/          <-- हेडर, फ़ुटर, मेनू, नेविगेशन
│       │   ├── product/         <-- प्रोडक्ट कार्ड और 6-Angle डिटेल पेज
│       │   ├── cart/            <-- शॉपिंग कार्ट ड्रॉअर
│       │   ├── checkout/        <-- चेकआउट व पेमेंट मॉडल
│       │   └── customer/        <-- लॉगिन पॉपअप व प्रोफाइल
│       ├── context/             <-- ग्लोबल स्टेट (StoreContext.jsx)
│       ├── data/                <-- बैकअप डिफ़ॉल्ट डेटा (initialData.js)
│       └── services/            <-- बैकएंड API कॉल्स (api.js)
│
└── backend/                     <-- सर्वर और डेटाबेस (REST API)
    ├── server.js                <-- मुख्य एक्सप्रेस सर्वर (Port 5000)
    ├── data/                    <-- JSON डेटाबेस फ़ाइल्स (Products, Categories, Orders)
    └── routes/                  <-- API राउट्स (Products, Orders, Coupons, Admin)
```

---

## 🎨 2. डिज़ाइन, रंग और फ़ॉन्ट्स कहाँ बदलें? (CSS Files)

| फ़ाइल का पाथ (File Path) | किसलिए है (Purpose) | इसमें आप क्या-क्या बदल सकते हैं? |
| :--- | :--- | :--- |
| **`frontend/src/style.css`** | मुख्य वेबसाइट की पूरी CSS | • **रंग (Colors)**: प्राइमरी पिंक (`#FF5B7F`), हेडर का डार्क ब्लू (`#1A253C`), ग्रीन प्राइस (`#22c55e`).<br>• **फ़ॉन्ट (Fonts)**: Google Fonts 'Outfit' और 'Inter'.<br>• **बटन स्टाइल**: Add to Cart, Buy Now, कार्ड होवर इफेक्ट्स.<br>• **कार्ड्स और पैडिंग**: प्रोडक्ट कार्ड की परछाई, बॉर्डर, स्पेसिंग.<br>• **मोबाइल रिस्पॉन्सिव**: मोबाइल स्क्रीन के लिए ग्रिड कॉलम्स (1fr, 2fr). |
| **`frontend/src/admin.css`** | एडमिन बैक पैनल की CSS | • एडमिन का डार्क साइडबार कलर (`#1A253C`).<br>• टेबल की डिज़ाइन, हेडर रो, और बटन कलर्स.<br>• 6-Angle फ़ोटो स्लॉट्स और मॉडल की बॉर्डर व शैडो.<br>• स्टेटस बैज के रंग (Active, In Stock, SALE!). |
| **`frontend/src/index.css`** | बेसिक बेस रीसेट | • ग्लोबल बॉडी मार्जिन, बॉक्स-साइज़िंग और बैकग्राउंड कलर. |

---

## 🖥️ 3. वेबसाइट के दिखने वाले सेक्शंस (Storefront Components)

### A. हेडर, मेनू व फ़ुटर (Header & Navigation)

| फ़ाइल का पाथ | क्या है इसमें? | क्या बदल सकते हैं? |
| :--- | :--- | :--- |
| **`frontend/src/components/common/Header.jsx`** | टॉप हेडर, अनाउंसमेंट बार, लोगो, सर्च बार | • ऊपर की घोषणा पट्टी का टेक्स्ट (Announcement Bar Text).<br>• लोगो (Logo Image) और ब्रांड नाम.<br>• कस्टमर केयर नंबर व ईमेल.<br>• सर्च बार का प्लेसहोल्डर और कार्ट/विशलिस्ट आइकन. |
| **`frontend/src/components/common/Navigation.jsx`** | मुख्य नेविगेशन मेनू | • मेनू के लिंक्स (Home, Categories, Latest, Deals, Contact).<br>• लिंक्स के ड्रॉपडाउन मेनू. |
| **`frontend/src/components/common/CategoryStrip.jsx`** | फ्लिपकार्ट स्टाइल कैटेगरी स्ट्रिप | • गोल आइकन वाली कैटेगरी स्ट्रिप (Resin Art, DIY Kit, Candle आदि).<br>• ऊपर दिखने वाले क्विक कैटेगरी आइकन्स. |
| **`frontend/src/components/common/Footer.jsx`** | वेबसाइट का फ़ुटर (निचला हिस्सा) | • कंपनी का परिचय, पता, सोशल मीडिया लिंक्स (Instagram, Facebook).<br>• कॉपीराइट टेक्स्ट, क्विक लिंक्स.<br>• एडमिन पैनल में जाने का "Back Panel" लिंक. |

---

### B. होमपेज के सेक्शंस (Homepage Sections - क्रम अनुसार)

ये सभी सेक्शंस **`frontend/src/App.jsx`** में इसी क्रम में जुड़े हुए हैं:

| फ़ाइल का पाथ | सेक्शन का नाम | क्या बदल सकते हैं? |
| :--- | :--- | :--- |
| **`frontend/src/components/home/HeroBanner.jsx`** | **1. Hero Carousel Banner** | • ऑटो-स्लाइडिंग बड़े बैनर्स के टेक्स्ट और बटन लिंक.<br>• स्लाइड बदलने की स्पीड (4 सेकंड का टाइमर). |
| **`frontend/src/components/home/ValueProps.jsx`** | **2. Value Props Strip** | • 4 फ़ीचर्स के नाम व आइकन्स:<br>  1. Free Express Shipping<br>  2. 100% Authentic Handcrafted<br>  3. Secure Checkout<br>  4. 24/7 Dedicated Support |
| **`frontend/src/components/home/CategorySlider.jsx`** | **3. Shop by Category** | • कैटेगरी स्लाइडर का शीर्षक और उप-शीर्षक.<br>• कैटेगरी कार्ड्स का लेआउट. |
| **`frontend/src/components/home/LatestProducts.jsx`** | **4. Our Latest Products** | • "Fresh Arrivals & New Launches" हेडिंग.<br>• नए प्रोडक्ट्स (जैसे **COASTAL TRAY**, **WAVE TRAY**, **LOTUS DUO**) की लिस्ट.<br>• कितने प्रोडक्ट्स दिखाने हैं (डिफ़ॉल्ट: टॉप 8). |
| **`frontend/src/components/home/FeaturedProducts.jsx`** | **5. Featured Collections** | • होमपेज पर स्टार ⭐ वाले फ़ीचर्ड प्रोडक्ट्स की ग्रिड.<br>• "Handpicked Masterpieces" हेडिंग. |
| **`frontend/src/components/home/DealCountdown.jsx`** | **6. Exclusive Deals & Coupons** | • "Deal of the Day" का लाइव काउंटडाउन टाइमर.<br>• कूपन कोड्स (जैसे `PRETUTE20`, `FREESHIP`). |
| **`frontend/src/components/home/PhilosophySection.jsx`** | **7. Philosophy & Craft Story** | • "Our Craft Philosophy" और ब्रांड स्टोरी का टेक्स्ट.<br>• हैंडमेड कारीगरी के बारे में जानकारी. |
| **`frontend/src/components/home/ReviewsSection.jsx`** | **8. Customer Reviews & Ratings** | • ग्राहकों के टेस्टीमोनियल्स, रिव्यू टेक्स्ट, 5-स्टार रेटिंग्स. |

---

### C. प्रोडक्ट डिटेल और गैलरी (Product Page & Cards)

| फ़ाइल का पाथ | क्या है इसमें? | क्या बदल सकते हैं? |
| :--- | :--- | :--- |
| **`frontend/src/components/product/ProductDetailModal.jsx`** | **6-Angle Product Page (WordPress Style)** | • **6 Photos Gallery**: मुख्य बड़ी तस्वीर और नीचे 6 थंबनेल कोण.<br>• **SALE! Badge**: कुआकुआ लोगो वाला गोल सेल बैज.<br>• **Price Row**: कटा हुआ मूल्य और हरा सेलिंग प्राइस.<br>• **COLOUR Swatches**: 6 रंगों के क्लिकेबल बॉक्सेज़.<br>• **Quantity Counter**: `[-] 1 [+]` बटन.<br>• **Action Buttons**: `ADD TO CART` और `BUY NOW`.<br>• **Metadata**: SKU, Categories, Subcategories, Tags, Brand.<br>• **Related Products**: नीचे अपने आप दिखने वाले सम्बंधित प्रोडक्ट्स. |
| **`frontend/src/components/product/ProductCard.jsx`** | ग्रिड में दिखने वाला प्रोडक्ट कार्ड | • कार्ड पर दिखने वाली फ़ोटो, फ्लिपकार्ट `F-Assured` बैज, स्टार रेटिंग, डिस्काउंट % बैज, दिल वाला विशलिस्ट बटन, और `Quick View` बटन. |
| **`frontend/src/components/product/CategoryView.jsx`** | कैटेगरी व्यू पेज (फ़िल्टर व सॉर्टिंग) | • प्राइस फ़िल्टर, रेटिंग फ़िल्टर, सॉर्टिंग (Price: Low to High, Newest First). |

---

### D. कार्ट, चेकआउट व कस्टमर पॉपअप (Cart & Auth)

| फ़ाइल का पाथ | क्या है इसमें? | क्या बदल सकते हैं? |
| :--- | :--- | :--- |
| **`frontend/src/components/cart/CartDrawer.jsx`** | साइड स्लाइडिंग शॉपिंग कार्ट | • कार्ट में जोड़े गए प्रोडक्ट्स, क्वांटिटी बदलना, कूपन कोड लगाना, टोटल बिल की गणना. |
| **`frontend/src/components/checkout/CheckoutModal.jsx`** | चेकआउट व ऑर्डर पेमेंट | • ग्राहक का नाम, पता, फोन नंबर, पेमेंट विकल्प (UPI, COD, Card). |
| **`frontend/src/components/customer/CustomerAuthModal.jsx`** | **10-Second Auto Login Popup** | • 10 सेकंड बाद आने वाला लॉगिन/साइनअप पॉपअप.<br>• पॉपअप का टाइम बदलना हो तो `frontend/src/App.jsx` में लाइन 63 पर `10000` (10 सेकंड) को बदल सकते हैं. |
| **`frontend/src/components/customer/ProfileView.jsx`** | कस्टमर प्रोफाइल और ऑर्डर्स | • ग्राहक के पुराने ऑर्डर्स, डिलीवरी स्टेटस और पता. |

---

## ⚙️ 4. एडमिन पैनल (Admin Panel Architecture)

एडमिन पैनल की मुख्य फ़ाइल: **`frontend/src/components/admin/AdminLayout.jsx`**

इस अकेली फ़ाइल में एडमिन पैनल के सभी कंट्रोल्स हैं:

| फ़ीचर (Feature) | `AdminLayout.jsx` में कहाँ है? | कैसे बदलें? |
| :--- | :--- | :--- |
| **Admin Login PIN** | लाइन 11-14 और `loginAdmin` फंक्शन | डिफ़ॉल्ट पिन `2570` है (बैकएंड में `backend/routes/admin.js` में भी PIN सेट होता है). |
| **6-Angle Photo Slots** | Tab 1: `productModalTab === 'photos'` | हर एंगल के लिए 6 स्लॉट्स (फ़ोटो अपलोड बटन, WordPress URL पेस्ट इनपुट, और प्रीव्यू). |
| **1-Click Coastal Tray Template** | `handleFillCoastalTemplate` फंक्शन | 1-क्लिक में Coastal Tray की 6 तस्वीरें स्लॉट्स में भरने का लॉजिक. |
| **WordPress Catalog Fields** | Tab 2: `productModalTab === 'info'` | Product Title, SKU (e.g. `G118`), Brand, Category, Sub-Category, Tags. |
| **Pricing & Colour Palette** | Tab 3: `productModalTab === 'pricing'` | सेलिंग प्राइस, MRP, डिस्काउंट कैलकुलेटर, और लाइव कलर बॉक्सेज़ (Blue, Cream, Green...). |
| **Description & Specs** | Tab 4: `productModalTab === 'details'` | Short Description, Detailed Story, Dimensions, Material, Care Instructions. |
| **Our Latest Products Tab** | `activeTab === 'latest_products'` | "Our Latest Products" में प्रोडक्ट्स जोड़ने और मैनेज करने की टेबल. |
| **Shop by Category Manager** | `activeTab === 'categories'` | नई कैटेगरी जोड़ने, नाम, फ़ोटो और स्लग बदलने का फॉर्म. |
| **Hero Banners Manager** | `activeTab === 'banners'` | होमपेज के बड़े स्लाइडर बैनर्स बदलने का फॉर्म. |
| **Coupons & Deals Manager** | `activeTab === 'coupons'` | नए डिस्काउंट कूपन बनाने का फॉर्म (जैसे 20% OFF). |
| **Orders & Inquiries** | `activeTab === 'orders'`, `'inquiries'` | ग्राहकों के ऑर्डर्स और मैसेज देखने का सेक्शन. |

---

## 📦 5. डेटा फ़ाइल्स: बिना कोड छुए डेटा कहाँ बदलें? (JSON Database)

अगर आप कोड नहीं बदलना चाहते, केवल प्रोडक्ट्स, कैटेगरी, कूपन या कीमतें बदलना चाहते हैं, तो इन JSON फ़ाइल्स में बदलाव करें:

| फ़ाइल का पाथ | डेटा का प्रकार | उदाहरण |
| :--- | :--- | :--- |
| **`backend/data/products.json`** | **सारे प्रोडक्ट्स का डेटाबेस** | यहाँ **COASTAL TRAY**, **WAVE TRAY**, **LOTUS DUO** आदि की कीमतें, 6 तस्वीरें, स्टॉक और विवरण हैं. |
| **`backend/data/categories.json`** | **सारी कैटेगरीज** | Resin Art, Corporate Gifts, Home Decor आदि की लिस्ट. |
| **`backend/data/banners.json`** | **होमपेज बैनर्स** | बैनर की इमेज, हेडलाइन और बटन लिंक. |
| **`backend/data/coupons.json`** | **कूपन कोड्स** | `PRETUTE20`, डिस्काउंट प्रतिशत, मिनिमम खरीद आदि. |
| **`backend/data/orders.json`** | **कस्टमर ऑर्डर्स** | सभी डिलीवर व पेंडिंग ऑर्डर्स का रिकॉर्ड. |
| **`frontend/src/data/initialData.js`** | **फ़्रंटएंड का फ़ॉलबैक डेटा** | अगर कभी बैकएंड सर्वर बंद हो, तो वेबसाइट इस फ़ाइल से डेटा दिखाती है. |

---

## 🖼️ 6. फ़ोटो और इमेज फ़ाइल्स कहाँ रखें? (Assets)

सारी तस्वीरें इस फ़ोल्डर में रखी जाती हैं:
📁 **`frontend/public/assets/`**

| इमेज फ़ाइल का नाम | कहाँ इस्तेमाल होती है? |
| :--- | :--- |
| `coastal_tray_1.jpg` | Coastal Tray का मुख्य कोण (स्टारफ़िश सामने से) |
| `coastal_tray_2.jpg` | Coastal Tray का 45° साइड कोण |
| `coastal_tray_3.jpg` | Coastal Tray का रिम / किनारा कोण |
| `coastal_tray_4.jpg` | Coastal Tray का बैक टेक्सचर कोण |
| `coastal_tray_5.jpg` | Coastal Tray का स्काई ब्लू कलर वैरिएंट |
| `coastal_tray_6.jpg` | Coastal Tray का येलो कलर वैरिएंट |
| `wave_tray.jpg` | Wave Tray प्रोडक्ट इमेज |
| `lotus_duo.jpg` | Lotus Duo प्रोडक्ट इमेज |
| `oval_pearl_tray.jpg` | Oval Pearl Tray प्रोडक्ट इमेज |
| `pebble_bowl.jpg` | Pebble Bowl प्रोडक्ट इमेज |
| `Logo.png` / `kuakua-logo.png` | ब्रांड लोगो |
| `candle.jpg`, `Resin Art.jpg`, `DIY KIT.jpg` | कैटेगरी इमेजेस |

> 💡 **टिप**: जब भी कोई नई फ़ोटो लगानी हो, उसे `frontend/public/assets/` फ़ोल्डर में कॉपी करें और कोड या एडमिन पैनल में उसका पाथ `assets/apna_photo.jpg` लिख दें!

---

## 🚀 7. बैकएंड API और सर्वर कोड (Backend Routes)

| फ़ाइल का पाथ | काम क्या है? |
| :--- | :--- |
| **`backend/server.js`** | मुख्य सर्वर फ़ाइल (Port 5000 पर रन होता है). CORS, JSON पार्सिंग और राउट्स यहाँ लोड होते हैं. |
| **`backend/routes/products.js`** | प्रोडक्ट्स की API (`GET /api/products`, `POST /api/products`, `PUT`, `DELETE`). 6 इमेजेस और नए फील्ड्स को यहीं प्रोसेस किया जाता है. |
| **`backend/routes/categories.js`** | कैटेगरीज की API (`/api/categories`). |
| **`backend/routes/banners.js`** | बैनर्स की API (`/api/banners`). |
| **`backend/routes/orders.js`** | ऑर्डर्स प्लेस करने और स्टेटस बदलने की API. |
| **`backend/routes/coupons.js`** | कूपन कोड वैलिडेट करने की API. |
| **`backend/routes/admin.js`** | एडमिन ऑथेंटिकेशन और डैशबोर्ड स्टेटिस्टिक्स की API. |

---

## ⚡ 8. क्विक चीट शीट: "मुझे X बदलना है, तो मैं कहाँ जाऊं?"

### 1. "मुझे वेबसाइट का कोई रंग (Color) बदलना है":
👉 फ़ाइल खोलें: `frontend/src/style.css`
- मुख्य पिंक कलर: सर्च करें `--color-primary` (इसे `#FF5B7F` से बदलकर अपना मनपसंद हेक्स कोड दे सकते हैं).

### 2. "मुझे 10 सेकंड वाले लॉगिन पॉपअप का टाइम कम या ज्यादा करना है":
👉 फ़ाइल खोलें: `frontend/src/App.jsx`
- लाइन 63 पर जाएं: `10000` (यह 10 सेकंड यानी 10000ms है, 5 सेकंड करने के लिए `5000` कर दें).

### 3. "मुझे एडमिन का पासवर्ड / PIN बदलना है":
👉 फ़ाइल खोलें: `backend/routes/admin.js`
- यहाँ एडमिन का PIN चेक होता है, आप `2570` को अपने मनपसंद 4 अंकों के PIN में बदल सकते हैं.

### 4. "मुझे नया प्रोडक्ट सीधे कोड में डालना है":
👉 फ़ाइल खोलें: `backend/data/products.json`
- सबसे ऊपर नए प्रोडक्ट का JSON ऑब्जेक्ट जोड़ें और फ़ोटो का नाम `assets/...` दे दें.

### 5. "मुझे 'Our Latest Products' सेक्शन में कुछ टेक्स्ट बदलना है":
👉 फ़ाइल खोलें: `frontend/src/components/home/LatestProducts.jsx`
- यहाँ हेडिंग, सब-हेडिंग या बटन का नाम बदल सकते हैं.

### 6. "मुझे फ़ुटर का फोन नंबर या पता बदलना है":
👉 फ़ाइल खोलें: `frontend/src/components/common/Footer.jsx`

---

## 🖥️ 9. प्रोजेक्ट को रन और टेस्ट कैसे करें?

टर्मिनल (Command Prompt / PowerShell) में:

```bash
# 1. पूरा प्रोजेक्ट एक साथ चलाने के लिए (Root Directory me):
npm run dev

# 2. अगर सिर्फ Backend चलाना हो:
cd backend
npm start

# 3. अगर सिर्फ Frontend चलाना हो:
cd frontend
npm run dev

# 4. प्रोडक्शन बिल्ड चेक करने के लिए:
cd frontend
npm run build
```

- **वेबसाइट का URL**: [http://localhost:5173/](http://localhost:5173/)
- **एडमिन बैक पैनल का URL**: [http://localhost:5173/#admin](http://localhost:5173/#admin) (PIN: `2570`)
