# PRETUTE Premium E-Commerce Storefront

A modern, highly responsive e-commerce web application for **PRETUTE** (a premium baby, kids, and maternity lifestyle brand) inspired by the layout and structural flow of FirstCry.

🚀 **Live Demo Server**: Serve locally at `http://127.0.0.1:8080` or host statically on GitHub Pages.

---

## 🌟 Key Features

1. **Hash-Based SPA Routing**: Smooth navigation transitions across Home, Categories, Product Details, Cart, Wishlist, and Contact views without page refreshes.
2. **Interactive Carousel Banner**: Automatic slide transitions with manual dot controls.
3. **Live Search Suggestions**: Instant drop-down search suggestions linking directly to products.
4. **Deal Countdown Timer**: A real-time ticking flash sale countdown clock.
5. **Product Detail Magnifier**: Coordinating lens hover zoom effect scaling details by 2.5x.
6. **State Persistence**: Cart count, items list, and wishlist synchronized with the browser's `localStorage`.
7. **Coupon Rules Engine**: Apply custom promotion codes:
   - `PRETUTE20`: Flat 20% off total orders.
   - `GEAR25`: 25% off category specific strollers/gear.
   - `MOM15`: $15 off maternity wears with minimum purchase threshold of $80.
   - `PLAYFREE`: Flat $10 off toys.
8. **Contact Form Validation**: Real-time validation checks with floating labels and submit loaders.
9. **Fully Responsive Grid**: Styled for Desktop, Tablet, Mobile, and Tiny Mobile breakpoints.

---

## 🛠️ Technology Stack
- **HTML5**: Semantic nodes optimized for search ranking.
- **CSS3**: Layouts powered by CSS Grid and Flexbox with premium variables, backdrop filter blur, and custom animation keyframes.
- **JavaScript (ES6+)**: Custom SPA state engine.
- **Icons & Fonts**: Font Awesome Icons and Google Fonts (*Outfit* & *Playfair Display*).

---

## 📂 Project Structure
```text
├── index.html        # SPA views, headers, modal, and footer structure
├── style.css         # Typography, custom properties, and media queries
├── app.js            # Router logic, local storage state, and interactive handlers
├── README.md         # Project documentation
└── assets/           # High-fidelity generated logo and storefront images
    ├── logo.png
    ├── hero_fashion.png
    ├── hero_toys.png
    ├── prod_romper.png
    ├── prod_rainbow.png
    ├── prod_stroller.png
    └── prod_dress.png
```

---

## 💻 Local Setup & Development

### 1. Prerequisite
Ensure you have Node.js installed or a static web server utility.

### 2. Launch Local Server
To run the project locally, install a quick static web server:
```bash
# Using Node.js http-server
npx http-server -p 8080

# Or using Python
python -m http.server 8080
```
Open **[http://127.0.0.1:8080](http://127.0.0.1:8080)** in your browser.
