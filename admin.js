

/**
 * PRETUTE - Back Panel & Admin Dashboard Application Controller
 */

(function () {
    const STATE = {
        activeTab: "dashboard",
        editingBannerId: null,
        editingProductId: null,
        editingCategoryId: null,
        productSearch: "",
        productCategoryFilter: "all",
        productStockFilter: "all",
        productStatusFilter: "all",
        orderSearch: "",
        orderStatusFilter: "all"
    };

    // DOM Elements
    const elements = {
        authOverlay: document.getElementById("authOverlay"),
        adminLoginForm: document.getElementById("adminLoginForm"),
        adminPassInput: document.getElementById("adminPassInput"),
        adminLogoutBtn: document.getElementById("adminLogoutBtn"),
        sidebar: document.getElementById("adminSidebar"),
        sidebarToggleBtn: document.getElementById("sidebarToggleBtn"),
        sidebarCloseBtn: document.getElementById("sidebarCloseBtn"),
        viewTitle: document.getElementById("currentViewTitle"),
        viewSubtitle: document.getElementById("currentViewSubtitle"),
        toastContainer: document.getElementById("toastContainer"),

        // Badges
        sidebarBannerCount: document.getElementById("sidebarBannerCount"),
        sidebarProductCount: document.getElementById("sidebarProductCount"),
        sidebarOrderCount: document.getElementById("sidebarOrderCount"),
        sidebarInquiryCount: document.getElementById("sidebarInquiryCount"),

        // KPI
        kpiTotalRevenue: document.getElementById("kpiTotalRevenue"),
        kpiTotalOrders: document.getElementById("kpiTotalOrders"),
        kpiPendingOrdersText: document.getElementById("kpiPendingOrdersText"),
        kpiTotalProducts: document.getElementById("kpiTotalProducts"),
        kpiLowStockText: document.getElementById("kpiLowStockText"),
        kpiTotalInquiries: document.getElementById("kpiTotalInquiries"),
        kpiUnreadInquiriesText: document.getElementById("kpiUnreadInquiriesText"),

        // Tables & Grids
        dashboardOrdersTableBody: document.getElementById("dashboardOrdersTableBody"),
        bannersTableBody: document.getElementById("bannersTableBody"),
        productsTableBody: document.getElementById("productsTableBody"),
        productSearchInput: document.getElementById("productSearchInput"),
        productCategoryFilter: document.getElementById("productCategoryFilter"),
        productStockFilter: document.getElementById("productStockFilter"),
        productStatusFilter: document.getElementById("productStatusFilter"),
        categoriesGrid: document.getElementById("categoriesGrid"),
        ordersTableBody: document.getElementById("ordersTableBody"),
        orderSearchInput: document.getElementById("orderSearchInput"),
        orderStatusFilter: document.getElementById("orderStatusFilter"),
        couponsTableBody: document.getElementById("couponsTableBody"),
        inquiriesTableBody: document.getElementById("inquiriesTableBody"),

        // Modals
        bannerModalOverlay: document.getElementById("bannerModalOverlay"),
        bannerForm: document.getElementById("bannerForm"),
        bannerModalTitle: document.getElementById("bannerModalTitle"),
        bannerImageUrl: document.getElementById("bannerImageUrl"),
        bannerPresetImageSelect: document.getElementById("bannerPresetImageSelect"),
        bannerImagePreview: document.getElementById("bannerImagePreview"),

        productModalOverlay: document.getElementById("productModalOverlay"),
        productForm: document.getElementById("productForm"),
        productModalTitle: document.getElementById("productModalTitle"),
        prodCategorySelect: document.getElementById("prodCategory"),
        prodStockStatus: document.getElementById("prodStockStatus"),
        prodAvailability: document.getElementById("prodAvailability"),
        prodStatus: document.getElementById("prodStatus"),
        prodImageUrl: document.getElementById("prodImageUrl"),
        prodPresetImageSelect: document.getElementById("prodPresetImageSelect"),
        prodImagePreview: document.getElementById("prodImagePreview"),

        categoryModalOverlay: document.getElementById("categoryModalOverlay"),
        categoryForm: document.getElementById("categoryForm"),
        categoryModalTitle: document.getElementById("categoryModalTitle"),
        catStatus: document.getElementById("catStatus"),
        catAvailability: document.getElementById("catAvailability"),
        catShowOnHome: document.getElementById("catShowOnHome"),

        couponModalOverlay: document.getElementById("couponModalOverlay"),
        couponForm: document.getElementById("couponForm"),
        couponModalTitle: document.getElementById("couponModalTitle"),
        couponExpiryDate: document.getElementById("couponExpiryDate"),
        couponStatus: document.getElementById("couponStatus"),
        couponUsageLimit: document.getElementById("couponUsageLimit"),

        invoiceModalOverlay: document.getElementById("invoiceModalOverlay")
    };

    // Initialize Admin Application
    function init() {
        checkAuth();
        setupEventListeners();
        setupViewSwitching();
        renderAll();

        // Listen for storage sync across tabs
        window.addEventListener("pretute_data_sync", () => {
            renderAll();
        });
    }

    // ==========================================================================
    // AUTHENTICATION MANAGEMENT
    // ==========================================================================
    function checkAuth() {
        if (StoreData.isAdminLoggedIn()) {
            elements.authOverlay.classList.add("hidden");
        } else {
            elements.authOverlay.classList.remove("hidden");
            elements.adminPassInput.focus();
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        const entered = elements.adminPassInput.value.trim();
        if (StoreData.loginAdmin(entered)) {
            elements.authOverlay.classList.add("hidden");
            elements.adminPassInput.value = "";
            showToast("Welcome back to PRETUTE Back Panel!", "success");
            renderAll();
        } else {
            showToast("Invalid PIN or Password. Please try again.", "error");
            elements.adminPassInput.select();
        }
    }

    function handleLogout() {
        StoreData.logoutAdmin();
        checkAuth();
        showToast("Logged out successfully.", "info");
    }

    // ==========================================================================
    // TOAST NOTIFICATION UTILITY
    // ==========================================================================
    function showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = `adm-toast ${type}`;

        let icon = "fa-solid fa-circle-check";
        if (type === "error") icon = "fa-solid fa-circle-exclamation";
        if (type === "info") icon = "fa-solid fa-circle-info";

        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        elements.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(20px)";
            toast.style.transition = "all 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // ==========================================================================
    // NAVIGATION & TAB SWITCHING
    // ==========================================================================
    function setupViewSwitching() {
        document.querySelectorAll(".nav-link-btn[data-view]").forEach(btn => {
            btn.addEventListener("click", () => {
                const targetView = btn.getAttribute("data-view");
                switchTab(targetView);
                closeMobileSidebar();
            });
        });
    }

    function switchTab(viewName) {
        STATE.activeTab = viewName;

        // Update nav buttons
        document.querySelectorAll(".nav-link-btn").forEach(btn => {
            if (btn.getAttribute("data-view") === viewName) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Hide all panes & show target
        document.querySelectorAll(".admin-view-pane").forEach(pane => {
            pane.classList.remove("active");
        });
        const activePane = document.getElementById(`view-${viewName}`);
        if (activePane) activePane.classList.add("active");

        // Update Header Titles
        const titles = {
            dashboard: { title: "Dashboard Overview", subtitle: "Real-time metrics, product stock and recent sales" },
            banners: { title: "Homepage Banners & Hero Slider", subtitle: "Manage carousel slides, titles, imagery, button links, and active status" },
            products: { title: "Products Catalog", subtitle: "Manage store products, inventory, prices and descriptions" },
            categories: { title: "Categories & Collections", subtitle: "Organize storefront departments and crafts" },
            orders: { title: "Customer Orders", subtitle: "Track live customer purchases, status, and print invoices" },
            coupons: { title: "Promotions & Discounts", subtitle: "Create promotional codes, threshold rules, and percentage discounts" },
            inquiries: { title: "Customer Inquiries", subtitle: "Messages and bulk inquiries sent from website contact form" },
            settings: { title: "Store Settings & Backup", subtitle: "Configure announcement banner, contact details, and database backups" }
        };

        if (titles[viewName]) {
            elements.viewTitle.textContent = titles[viewName].title;
            elements.viewSubtitle.textContent = titles[viewName].subtitle;
        }

        renderCurrentTab();
    }

    function closeMobileSidebar() {
        elements.sidebar.classList.remove("open");
    }

    // ==========================================================================
    // RENDER FUNCTIONS
    // ==========================================================================
    function renderAll() {
        updateSidebarCounters();
        renderKPIs();
        renderCurrentTab();
    }

    function updateSidebarCounters() {
        const banners = StoreData.getBanners ? StoreData.getBanners() : [];
        const products = StoreData.getProducts();
        const orders = StoreData.getOrders();
        const messages = StoreData.getMessages();

        const pendingOrders = orders.filter(o => o.status === "Pending").length;
        const unreadMessages = messages.filter(m => !m.read).length;

        if (elements.sidebarBannerCount) elements.sidebarBannerCount.textContent = banners.length;
        if (elements.sidebarProductCount) elements.sidebarProductCount.textContent = products.length;
        if (elements.sidebarOrderCount) elements.sidebarOrderCount.textContent = pendingOrders;
        if (elements.sidebarInquiryCount) elements.sidebarInquiryCount.textContent = unreadMessages;
    }

    function renderCurrentTab() {
        switch (STATE.activeTab) {
            case "dashboard":
                renderDashboard();
                break;
            case "banners":
                renderBanners();
                break;
            case "products":
                renderProducts();
                break;
            case "categories":
                renderCategories();
                break;
            case "orders":
                renderOrders();
                break;
            case "coupons":
                renderCoupons();
                break;
            case "inquiries":
                renderInquiries();
                break;
            case "settings":
                renderSettings();
                break;
        }
    }

    // --- 1. DASHBOARD & KPIS ---
    function renderKPIs() {
        const products = StoreData.getProducts();
        const orders = StoreData.getOrders();
        const messages = StoreData.getMessages();

        const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
        const pendingOrders = orders.filter(o => o.status === "Pending").length;
        const lowStock = products.filter(p => (parseInt(p.stock) || 0) <= 15).length;
        const unreadMessages = messages.filter(m => !m.read).length;

        if (elements.kpiTotalRevenue) elements.kpiTotalRevenue.textContent = `₹${totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        if (elements.kpiTotalOrders) elements.kpiTotalOrders.textContent = orders.length;
        if (elements.kpiPendingOrdersText) elements.kpiPendingOrdersText.innerHTML = `<i class="fa-solid fa-clock"></i> ${pendingOrders} pending fulfillment`;
        if (elements.kpiTotalProducts) elements.kpiTotalProducts.textContent = products.length;
        if (elements.kpiLowStockText) elements.kpiLowStockText.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${lowStock} low in stock`;
        if (elements.kpiTotalInquiries) elements.kpiTotalInquiries.textContent = messages.length;
        if (elements.kpiUnreadInquiriesText) elements.kpiUnreadInquiriesText.innerHTML = `<i class="fa-solid fa-envelope"></i> ${unreadMessages} unread messages`;
    }

    function renderDashboard() {
        renderKPIs();
        const orders = StoreData.getOrders().slice(0, 5); // Recent 5
        const tbody = elements.dashboardOrdersTableBody;
        if (!tbody) return;

        if (orders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="empty-state"><i class="fa-solid fa-basket-shopping"></i><p>No orders placed yet.</p></td></tr>`;
            return;
        }

        tbody.innerHTML = orders.map(order => {
            const itemCount = (order.items || []).reduce((sum, it) => sum + it.quantity, 0);
            return `
                <tr>
                    <td><strong>${order.id}</strong></td>
                    <td>
                        <div style="font-weight: 600;">${order.customerName || "Customer"}</div>
                        <div style="font-size: 0.75rem; color: var(--adm-text-muted);">${order.customerPhone || ""}</div>
                    </td>
                    <td>${itemCount} items</td>
                    <td><strong style="color: var(--adm-primary);">₹${(parseFloat(order.total) || 0).toFixed(2)}</strong></td>
                    <td><span style="font-size: 0.8rem; background: #F1F5F9; padding: 2px 8px; border-radius: 4px;">${order.paymentMethod || "COD"}</span></td>
                    <td>
                        <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
                    </td>
                    <td>
                        <button class="adm-btn adm-btn-outline adm-btn-sm" onclick="window.AdminApp.viewInvoice('${order.id}')">
                            <i class="fa-solid fa-eye"></i> View
                        </button>
                    </td>
                </tr>
            `;
        }).join("");
    }

    // --- 2. BANNERS / HERO SLIDER ---
    function renderBanners() {
        const banners = StoreData.getBanners ? StoreData.getBanners() : [];
        const tbody = elements.bannersTableBody;
        if (!tbody) return;

        if (banners.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="empty-state"><i class="fa-solid fa-images"></i><p>No banners created yet. Click "Add New Banner" to create one.</p></td></tr>`;
            return;
        }

        tbody.innerHTML = banners.map(b => {
            const isActive = b.active !== false && b.status !== "deactivated";
            const btn1Display = b.btn1Text ? `<span style="font-size: 0.82rem; font-weight: 600; color: var(--adm-primary);">${b.btn1Text}</span><div style="font-size: 0.72rem; color: var(--adm-text-muted);">${b.btn1Link || '#'}</div>` : '<span style="color: #94A3B8;">-</span>';
            const btn2Display = b.btn2Text ? `<span style="font-size: 0.82rem; font-weight: 600; color: var(--adm-navy-700);">${b.btn2Text}</span><div style="font-size: 0.72rem; color: var(--adm-text-muted);">${b.btn2Link || '#'}</div>` : '<span style="color: #94A3B8;">-</span>';

            return `
                <tr style="${!isActive ? 'opacity: 0.75; background: #FAFBFD;' : ''}">
                    <td>
                        <img src="${b.image || 'assets/hero_fashion.png'}" alt="${b.title}" class="banner-cell-preview" onerror="this.src='assets/hero_fashion.png'">
                    </td>
                    <td>
                        <div style="font-weight: 700; color: var(--adm-navy-900);">${b.title}</div>
                        <div style="font-size: 0.78rem; color: var(--adm-primary); font-weight: 600;">${b.subtitle || ''}</div>
                    </td>
                    <td>${btn1Display}</td>
                    <td>${btn2Display}</td>
                    <td>
                        <span class="banner-order-pill">${b.order || 1}</span>
                    </td>
                    <td>
                        <span class="status-badge ${isActive ? 'active' : 'deactivated'}">
                            <i class="fa-solid ${isActive ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
                            ${isActive ? 'Active' : 'Deactivated'}
                        </span>
                    </td>
                    <td>
                        <div class="table-actions">
                            <button class="icon-action-btn edit" title="Edit Banner" onclick="window.AdminApp.openEditBannerModal(${b.id})">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="icon-action-btn ${isActive ? 'toggle-active' : 'toggle-deactivated'}" title="${isActive ? 'Deactivate Banner' : 'Activate Banner'}" onclick="window.AdminApp.toggleBannerStatus(${b.id})">
                                <i class="fa-solid ${isActive ? 'fa-toggle-on' : 'fa-toggle-off'}"></i>
                            </button>
                            <button class="icon-action-btn delete" title="Delete Banner" onclick="window.AdminApp.deleteBanner(${b.id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    // --- 3. PRODUCTS CATALOG ---
    function renderProducts() {
        const products = StoreData.getProducts();
        const categories = StoreData.getCategories();
        const tbody = elements.productsTableBody;
        if (!tbody) return;

        // Populate Category Filter
        elements.productCategoryFilter.innerHTML = `<option value="all">All Categories (${products.length})</option>` +
            categories.map(c => `<option value="${c.slug}" ${STATE.productCategoryFilter === c.slug ? "selected" : ""}>${c.name}</option>`).join("");

        // Filter products
        const filtered = products.filter(prod => {
            const matchesSearch = prod.title.toLowerCase().includes(STATE.productSearch.toLowerCase()) ||
                (prod.categoryLabel && prod.categoryLabel.toLowerCase().includes(STATE.productSearch.toLowerCase()));
            const matchesCat = STATE.productCategoryFilter === "all" || prod.category === STATE.productCategoryFilter;

            // Stock filter
            let matchesStock = true;
            const stock = parseInt(prod.stock) || 0;
            const isOutOfStock = prod.stockStatus === "out_of_stock" || stock <= 0;
            if (STATE.productStockFilter === "in_stock") {
                matchesStock = !isOutOfStock;
            } else if (STATE.productStockFilter === "out_of_stock") {
                matchesStock = isOutOfStock;
            } else if (STATE.productStockFilter === "low_stock") {
                matchesStock = stock > 0 && stock <= 15;
            }

            // Status filter
            let matchesStatus = true;
            if (STATE.productStatusFilter === "active") {
                matchesStatus = prod.status !== "deactivated";
            } else if (STATE.productStatusFilter === "deactivated") {
                matchesStatus = prod.status === "deactivated";
            }

            return matchesSearch && matchesCat && matchesStock && matchesStatus;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="empty-state"><i class="fa-solid fa-box-open"></i><p>No products found matching your search & filters.</p></td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(prod => {
            const stock = parseInt(prod.stock) || 0;
            const isOutOfStock = prod.stockStatus === "out_of_stock" || stock <= 0;
            const isBackorder = prod.stockStatus === "on_backorder";
            const isLowStock = !isOutOfStock && stock <= 15;

            let stockBadgeHtml = `<span class="stock-badge in-stock"><i class="fa-solid fa-circle-check"></i> In Stock (${stock})</span>`;
            if (isOutOfStock) {
                stockBadgeHtml = `<span class="stock-badge out-of-stock"><i class="fa-solid fa-circle-xmark"></i> Out of Stock</span>`;
            } else if (isBackorder) {
                stockBadgeHtml = `<span class="stock-badge backorder"><i class="fa-solid fa-clock"></i> Backorder (${stock})</span>`;
            } else if (isLowStock) {
                stockBadgeHtml = `<span class="stock-badge low-stock"><i class="fa-solid fa-triangle-exclamation"></i> Low: ${stock} left</span>`;
            }

            const isAvailable = prod.availability !== "unavailable";
            const isDeactivated = prod.status === "deactivated";

            return `
                <tr style="${isDeactivated ? 'opacity: 0.7; background: #FAFBFD;' : ''}">
                    <td>
                        <div class="product-cell">
                            <img src="${prod.image || 'assets/logo.png'}" alt="${prod.title}" class="prod-thumb" onerror="this.src='assets/logo.png'">
                            <div class="prod-details">
                                <h4>${prod.title}</h4>
                                <span style="display: flex; align-items: center; gap: 6px;">
                                    <span>ID: #${prod.id}</span>
                                    ${prod.badge ? `<span style="font-size: 0.7rem; padding: 1px 6px; background: #FFF0F3; color: var(--adm-primary); font-weight: 700; border-radius: 4px;">${prod.badge}</span>` : ''}
                                </span>
                            </div>
                        </div>
                    </td>
                    <td><span style="font-weight: 500;">${prod.categoryLabel || prod.category}</span></td>
                    <td>
                        <strong style="color: var(--adm-primary);">₹${(parseFloat(prod.price) || 0).toFixed(2)}</strong>
                        ${prod.originalPrice ? `<span style="font-size: 0.75rem; color: #94A3B8; text-decoration: line-through; margin-left: 4px;">₹${prod.originalPrice.toFixed(2)}</span>` : ""}
                    </td>
                    <td>${stockBadgeHtml}</td>
                    <td>
                        <span class="status-badge ${isAvailable ? 'available' : 'unavailable'}">
                            <i class="fa-solid ${isAvailable ? 'fa-circle-check' : 'fa-ban'}"></i>
                            ${isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                    </td>
                    <td>
                        <span class="status-badge ${isDeactivated ? 'deactivated' : 'active'}">
                            <i class="fa-solid ${isDeactivated ? 'fa-eye-slash' : 'fa-eye'}"></i>
                            ${isDeactivated ? 'Deactivated' : 'Active'}
                        </span>
                    </td>
                    <td>
                        <div class="table-actions">
                            <button class="icon-action-btn edit" title="Edit Product" onclick="window.AdminApp.openEditProductModal(${prod.id})">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="icon-action-btn stock-toggle" title="${isOutOfStock ? 'Change to In Stock' : 'Change to Out of Stock'}" onclick="window.AdminApp.toggleProductStock(${prod.id})">
                                <i class="fa-solid fa-boxes-stacked"></i>
                            </button>
                            <button class="icon-action-btn ${isDeactivated ? 'toggle-deactivated' : 'toggle-active'}" title="${isDeactivated ? 'Activate Product' : 'Deactivate Product'}" onclick="window.AdminApp.toggleProductStatus(${prod.id})">
                                <i class="fa-solid ${isDeactivated ? 'fa-toggle-off' : 'fa-toggle-on'}"></i>
                            </button>
                            <button class="icon-action-btn delete" title="Delete Product" onclick="window.AdminApp.deleteProduct(${prod.id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    // --- 4. CATEGORIES ---
    function renderCategories() {
        const categories = StoreData.getCategories();
        const products = StoreData.getProducts();
        const grid = elements.categoriesGrid;
        if (!grid) return;

        if (categories.length === 0) {
            grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><i class="fa-solid fa-tags"></i><p>No categories configured.</p></div>`;
            return;
        }

        grid.innerHTML = categories.map(cat => {
            const count = products.filter(p => p.category === cat.slug).length;
            const isDeactivated = cat.status === "deactivated";

            return `
                <div class="cat-admin-card" style="${isDeactivated ? 'opacity: 0.7;' : ''}">
                    <img src="${cat.image || 'assets/logo.png'}" alt="${cat.name}" class="cat-admin-img" onerror="this.src='assets/logo.png'">
                    <div class="cat-admin-body">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                            <h4>${cat.name}</h4>
                            <span class="status-badge ${isDeactivated ? 'deactivated' : 'active'}" style="font-size: 0.7rem; padding: 2px 8px;">
                                ${isDeactivated ? 'Deactivated' : 'Active'}
                            </span>
                        </div>
                        <span style="font-size: 0.75rem; color: var(--adm-primary); font-weight: 600;">slug: #${cat.slug}</span>
                        <p>${cat.description || "Collection items on storefront"}</p>
                        <div class="cat-admin-footer">
                            <span style="font-size: 0.8rem; font-weight: 600; color: var(--adm-text-muted);">${count} Products</span>
                            <div class="table-actions">
                                <button class="icon-action-btn edit" title="Edit Category" onclick="window.AdminApp.openEditCategoryModal('${cat.id || cat.slug}')">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button class="icon-action-btn ${isDeactivated ? 'toggle-deactivated' : 'toggle-active'}" title="${isDeactivated ? 'Activate Category' : 'Deactivate Category'}" onclick="window.AdminApp.toggleCategoryStatus('${cat.id || cat.slug}')">
                                    <i class="fa-solid ${isDeactivated ? 'fa-toggle-off' : 'fa-toggle-on'}"></i>
                                </button>
                                <button class="icon-action-btn delete" title="Delete Category" onclick="window.AdminApp.deleteCategory('${cat.id || cat.slug}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    // --- 5. ORDERS ---
    function renderOrders() {
        const orders = StoreData.getOrders();
        const tbody = elements.ordersTableBody;
        if (!tbody) return;

        // Filter orders
        const filtered = orders.filter(ord => {
            const matchesSearch = ord.id.toLowerCase().includes(STATE.orderSearch.toLowerCase()) ||
                (ord.customerName && ord.customerName.toLowerCase().includes(STATE.orderSearch.toLowerCase())) ||
                (ord.customerPhone && ord.customerPhone.includes(STATE.orderSearch));
            const matchesStatus = STATE.orderStatusFilter === "all" || ord.status === STATE.orderStatusFilter;
            return matchesSearch && matchesStatus;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="empty-state"><i class="fa-solid fa-receipt"></i><p>No orders match your criteria.</p></td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(order => {
            const formattedDate = new Date(order.date).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
            });
            const itemCount = (order.items || []).reduce((sum, it) => sum + it.quantity, 0);

            return `
                <tr>
                    <td>
                        <strong>${order.id}</strong>
                        <div style="font-size: 0.75rem; color: var(--adm-text-muted);">${formattedDate}</div>
                    </td>
                    <td>
                        <div style="font-weight: 600;">${order.customerName || "Customer"}</div>
                        <div style="font-size: 0.78rem; color: var(--adm-text-muted);">${order.customerPhone || ""}</div>
                        <div style="font-size: 0.75rem; color: #64748B; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${order.address || ''}">
                            ${order.address || ""}
                        </div>
                    </td>
                    <td>
                        <span style="font-weight: 600;">${itemCount} items</span>
                        <div style="font-size: 0.75rem; color: var(--adm-text-muted);">
                            ${order.items && order.items[0] ? order.items[0].title.substring(0, 20) + (order.items.length > 1 ? '...' : '') : ''}
                        </div>
                    </td>
                    <td>
                        <strong style="color: var(--adm-primary); font-size: 0.95rem;">₹${(parseFloat(order.total) || 0).toFixed(2)}</strong>
                        ${order.discount ? `<div style="font-size: 0.72rem; color: var(--adm-success);">(Saved ₹${order.discount.toFixed(0)})</div>` : ''}
                    </td>
                    <td>
                        <span style="font-size: 0.8rem; background: #F1F5F9; padding: 2px 8px; border-radius: 4px;">${order.paymentMethod || "COD"}</span>
                    </td>
                    <td>
                        <select class="filter-select" style="padding: 4px 8px; font-size: 0.8rem; font-weight: 600;" onchange="window.AdminApp.updateOrderStatus('${order.id}', this.value)">
                            <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                            <option value="Confirmed" ${order.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
                            <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>
                            <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
                            <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
                        </select>
                    </td>
                    <td>
                        <div class="table-actions">
                            <button class="adm-btn adm-btn-outline adm-btn-sm" title="View & Print Invoice" onclick="window.AdminApp.viewInvoice('${order.id}')">
                                <i class="fa-solid fa-file-invoice"></i> Invoice
                            </button>
                            <button class="icon-action-btn delete" title="Delete Order" onclick="window.AdminApp.deleteOrder('${order.id}')">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    // --- 6. COUPONS ---
    function renderCoupons() {
        const coupons = StoreData.getCoupons();
        const tbody = elements.couponsTableBody;
        if (!tbody) return;

        if (coupons.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="empty-state"><i class="fa-solid fa-ticket"></i><p>No coupons available.</p></td></tr>`;
            return;
        }

        tbody.innerHTML = coupons.map(coup => {
            const isPercent = coup.type === "percent" || coup.type === "flat_percent" || coup.type === "category_percent";
            const discountLabel = isPercent ? `${coup.value}% Off` : `₹${coup.value} Off`;
            const typeLabel = isPercent ? "Percentage Discount" : "Flat Amount Discount";

            const formattedExpiry = coup.expiryDate ? new Date(coup.expiryDate).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric"
            }) : "No Expiry";

            let statusBadge = `<span class="status-badge active"><i class="fa-solid fa-circle-check"></i> Active</span>`;
            if (coup.status === "expired") {
                statusBadge = `<span class="status-badge expired"><i class="fa-solid fa-clock-rotate-left"></i> Expired</span>`;
            } else if (coup.status === "deactivated") {
                statusBadge = `<span class="status-badge deactivated"><i class="fa-solid fa-ban"></i> Deactivated</span>`;
            }

            return `
                <tr style="${coup.status !== 'active' ? 'opacity: 0.75; background: #FAFBFD;' : ''}">
                    <td>
                        <strong style="font-size: 0.95rem; color: var(--adm-primary); letter-spacing: 0.5px;">${coup.code}</strong>
                        <div style="font-size: 0.75rem; color: var(--adm-text-muted);">${coup.description || ""}</div>
                    </td>
                    <td>${typeLabel}</td>
                    <td><strong>${discountLabel}</strong></td>
                    <td>${coup.minSpend > 0 ? `₹${coup.minSpend.toFixed(2)}` : "No Minimum"}</td>
                    <td>
                        <div style="font-weight: 600; font-size: 0.85rem;">${formattedExpiry}</div>
                        ${coup.status === 'expired' ? '<span style="font-size: 0.7rem; color: var(--adm-danger); font-weight: 700;">Date Passed</span>' : ''}
                    </td>
                    <td>${statusBadge}</td>
                    <td>
                        <div class="table-actions">
                            <button class="icon-action-btn ${coup.status === 'deactivated' ? 'toggle-deactivated' : 'toggle-active'}" title="${coup.status === 'deactivated' ? 'Activate Coupon' : 'Deactivate Coupon'}" onclick="window.AdminApp.toggleCouponStatus('${coup.code}')">
                                <i class="fa-solid ${coup.status === 'deactivated' ? 'fa-toggle-off' : 'fa-toggle-on'}"></i>
                            </button>
                            <button class="icon-action-btn delete" title="Delete Coupon" onclick="window.AdminApp.deleteCoupon('${coup.code}')">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    // --- 6. INQUIRIES & MESSAGES ---
    function renderInquiries() {
        const messages = StoreData.getMessages();
        const tbody = elements.inquiriesTableBody;
        if (!tbody) return;

        if (messages.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="empty-state"><i class="fa-solid fa-inbox"></i><p>No contact messages yet.</p></td></tr>`;
            return;
        }

        tbody.innerHTML = messages.map(msg => {
            const formattedDate = new Date(msg.date).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
            });
            return `
                <tr style="${!msg.read ? 'background-color: rgba(255, 91, 127, 0.03);' : ''}">
                    <td style="white-space: nowrap; font-size: 0.8rem; color: var(--adm-text-muted);">${formattedDate}</td>
                    <td>
                        <div style="font-weight: 600;">${msg.name}</div>
                        <a href="mailto:${msg.email}" style="font-size: 0.8rem; color: var(--adm-info);">${msg.email}</a>
                    </td>
                    <td><strong>${msg.subject || "Store Inquiry"}</strong></td>
                    <td style="max-width: 320px; font-size: 0.85rem; line-height: 1.4;">${msg.message}</td>
                    <td>
                        <span class="status-badge ${msg.read ? 'delivered' : 'pending'}">
                            ${msg.read ? 'Read' : 'New'}
                        </span>
                    </td>
                    <td>
                        <div class="table-actions">
                            ${!msg.read ? `
                                <button class="adm-btn adm-btn-outline adm-btn-sm" title="Mark as Read" onclick="window.AdminApp.markMessageRead('${msg.id}')">
                                    <i class="fa-solid fa-check"></i> Read
                                </button>
                            ` : ''}
                            <button class="icon-action-btn delete" title="Delete Message" onclick="window.AdminApp.deleteMessage('${msg.id}')">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    // --- 7. SETTINGS ---
    function renderSettings() {
        const settings = StoreData.getSettings();
        document.getElementById("settingStoreName").value = settings.storeName || "";
        document.getElementById("settingAnnouncementText").value = settings.announcementText || "";
        document.getElementById("settingContactEmail").value = settings.contactEmail || "";
        document.getElementById("settingContactPhone").value = settings.contactPhone || "";
        document.getElementById("settingAdminPin").value = settings.adminPin || "1234";
        document.getElementById("settingAdminPass").value = settings.adminPass || "admin123";
    }

    // ==========================================================================
    // MODALS & CRUD EVENT HANDLERS
    // ==========================================================================
    function setupEventListeners() {
        // Auth submit & logout
        elements.adminLoginForm.addEventListener("submit", handleLogin);
        elements.adminLogoutBtn.addEventListener("click", handleLogout);

        // Mobile sidebar toggles
        elements.sidebarToggleBtn.addEventListener("click", () => {
            elements.sidebar.classList.toggle("open");
        });
        elements.sidebarCloseBtn.addEventListener("click", closeMobileSidebar);

        // Dashboard quick action buttons
        document.getElementById("dashAddProductBtn")?.addEventListener("click", () => openAddProductModal());
        document.getElementById("dashAddCouponBtn")?.addEventListener("click", () => openAddCouponModal());

        // Products Search & Filter
        elements.productSearchInput?.addEventListener("input", (e) => {
            STATE.productSearch = e.target.value;
            renderProducts();
        });
        elements.productCategoryFilter?.addEventListener("change", (e) => {
            STATE.productCategoryFilter = e.target.value;
            renderProducts();
        });
        elements.productStockFilter?.addEventListener("change", (e) => {
            STATE.productStockFilter = e.target.value;
            renderProducts();
        });
        elements.productStatusFilter?.addEventListener("change", (e) => {
            STATE.productStatusFilter = e.target.value;
            renderProducts();
        });
        document.getElementById("openAddProductModalBtn")?.addEventListener("click", () => openAddProductModal());

        // Banners Modal Trigger & Submit
        document.getElementById("openAddBannerModalBtn")?.addEventListener("click", () => openAddBannerModal());
        elements.bannerForm?.addEventListener("submit", handleBannerFormSubmit);
        elements.bannerPresetImageSelect?.addEventListener("change", (e) => {
            if (e.target.value) {
                elements.bannerImageUrl.value = e.target.value;
                updateBannerImagePreview(e.target.value);
            }
        });
        elements.bannerImageUrl?.addEventListener("input", (e) => {
            updateBannerImagePreview(e.target.value);
        });
        document.getElementById("bannerImageFileInput")?.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const label = document.getElementById("bannerImageFileName");
                if (label) label.textContent = file.name;
                const reader = new FileReader();
                reader.onload = (event) => {
                    elements.bannerImageUrl.value = event.target.result;
                    updateBannerImagePreview(event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        // Orders Search & Filter
        elements.orderSearchInput?.addEventListener("input", (e) => {
            STATE.orderSearch = e.target.value;
            renderOrders();
        });
        elements.orderStatusFilter?.addEventListener("change", (e) => {
            STATE.orderStatusFilter = e.target.value;
            renderOrders();
        });

        // Categories Modal Trigger
        document.getElementById("openAddCategoryModalBtn")?.addEventListener("click", () => openAddCategoryModal());

        // Coupons Modal Trigger
        document.getElementById("openAddCouponModalBtn")?.addEventListener("click", () => openAddCouponModal());

        // Product Form Submit
        elements.productForm?.addEventListener("submit", handleProductFormSubmit);

        // Product Preset Image select change
        elements.prodPresetImageSelect?.addEventListener("change", (e) => {
            if (e.target.value) {
                elements.prodImageUrl.value = e.target.value;
                updateImagePreview(e.target.value);
            }
        });
        elements.prodImageUrl?.addEventListener("input", (e) => {
            updateImagePreview(e.target.value);
        });

        // Product Device File Upload
        document.getElementById("prodImageFileInput")?.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const label = document.getElementById("prodImageFileName");
                if (label) label.textContent = file.name;
                const reader = new FileReader();
                reader.onload = (event) => {
                    elements.prodImageUrl.value = event.target.result;
                    updateImagePreview(event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        // Category Form Submit
        elements.categoryForm?.addEventListener("submit", handleCategoryFormSubmit);

        // Coupon Form Submit
        elements.couponForm?.addEventListener("submit", handleCouponFormSubmit);

        // Settings Forms Submit
        document.getElementById("storeSettingsForm")?.addEventListener("submit", (e) => {
            e.preventDefault();
            StoreData.saveSettings({
                storeName: document.getElementById("settingStoreName").value.trim(),
                announcementText: document.getElementById("settingAnnouncementText").value.trim(),
                contactEmail: document.getElementById("settingContactEmail").value.trim(),
                contactPhone: document.getElementById("settingContactPhone").value.trim()
            });
            showToast("Store settings saved! Changes updated on storefront.", "success");
        });

        document.getElementById("adminSecurityForm")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const newPin = document.getElementById("settingAdminPin").value.trim();
            const newPass = document.getElementById("settingAdminPass").value.trim();
            if (!newPin || !newPass) {
                showToast("Please enter both PIN and Password.", "error");
                return;
            }
            StoreData.saveSettings({ adminPin: newPin, adminPass: newPass });
            showToast("Security credentials updated successfully!", "success");
        });

        // Export Database Backup JSON
        document.getElementById("exportDatabaseBtn")?.addEventListener("click", () => {
            const db = StoreData.exportDatabase();
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
            const downloadAnchor = document.createElement("a");
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `pretute_backup_${Date.now()}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            showToast("Store database backup downloaded!", "success");
        });

        // Import Database Backup JSON
        document.getElementById("importDatabaseInput")?.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);
                    StoreData.importDatabase(parsed);
                    showToast("Database restored successfully!", "success");
                    renderAll();
                } catch (err) {
                    showToast("Failed to parse JSON backup file.", "error");
                }
            };
            reader.readAsText(file);
        });

        // Reset Database
        document.getElementById("resetDefaultsBtn")?.addEventListener("click", () => {
            if (confirm("Are you sure you want to reset all products, categories, orders and settings back to initial defaults?")) {
                StoreData.resetToDefaults();
                showToast("Database reset to demo defaults.", "info");
                renderAll();
            }
        });
    }

    // --- PRODUCT MODAL LOGIC ---
    function openAddProductModal() {
        STATE.editingProductId = null;
        elements.productModalTitle.textContent = "Add New Product";
        elements.productForm.reset();
        document.getElementById("prodEditId").value = "";

        // Default WordPress/WooCommerce style stock & visibility
        if (document.getElementById("prodStockStatus")) document.getElementById("prodStockStatus").value = "in_stock";
        if (document.getElementById("prodAvailability")) document.getElementById("prodAvailability").value = "available";
        if (document.getElementById("prodStatus")) document.getElementById("prodStatus").value = "active";
        if (document.getElementById("prodStock")) document.getElementById("prodStock").value = 25;

        // Populate Categories in Select
        const categories = StoreData.getCategories();
        elements.prodCategorySelect.innerHTML = categories.map(c => `<option value="${c.slug}">${c.name}</option>`).join("");

        const fileLabel = document.getElementById("prodImageFileName");
        if (fileLabel) fileLabel.textContent = "or paste image URL above";
        const fileInput = document.getElementById("prodImageFileInput");
        if (fileInput) fileInput.value = "";

        updateImagePreview("");
        elements.productModalOverlay.classList.add("active");
    }

    function openEditProductModal(id) {
        const prod = StoreData.getProductById(id);
        if (!prod) return;

        STATE.editingProductId = id;
        elements.productModalTitle.textContent = "Edit Product: " + prod.title;
        document.getElementById("prodEditId").value = prod.id;
        document.getElementById("prodTitle").value = prod.title;

        // Populate Categories in Select
        const categories = StoreData.getCategories();
        elements.prodCategorySelect.innerHTML = categories.map(c => `<option value="${c.slug}" ${c.slug === prod.category ? 'selected' : ''}>${c.name}</option>`).join("");

        document.getElementById("prodBadge").value = prod.badge || "";
        document.getElementById("prodPrice").value = prod.price;
        document.getElementById("prodOriginalPrice").value = prod.originalPrice || "";
        document.getElementById("prodStock").value = prod.stock !== undefined ? prod.stock : 25;

        // WooCommerce style stock status, availability & active/deactivated
        if (document.getElementById("prodStockStatus")) {
            document.getElementById("prodStockStatus").value = prod.stockStatus || (prod.stock > 0 ? "in_stock" : "out_of_stock");
        }
        if (document.getElementById("prodAvailability")) {
            document.getElementById("prodAvailability").value = prod.availability || "available";
        }
        if (document.getElementById("prodStatus")) {
            document.getElementById("prodStatus").value = prod.status || "active";
        }

        document.getElementById("prodSizes").value = (prod.sizes || []).join(", ");
        document.getElementById("prodImageUrl").value = prod.image || "";
        document.getElementById("prodShortDesc").value = prod.shortDesc || "";
        document.getElementById("prodLongDesc").value = prod.longDesc || "";

        const fileLabel = document.getElementById("prodImageFileName");
        if (fileLabel) fileLabel.textContent = prod.image && prod.image.startsWith("data:") ? "Custom uploaded image" : "or paste image URL above";
        const fileInput = document.getElementById("prodImageFileInput");
        if (fileInput) fileInput.value = "";

        updateImagePreview(prod.image || "");
        elements.productModalOverlay.classList.add("active");
    }

    function closeProductModal() {
        elements.productModalOverlay.classList.remove("active");
    }

    function updateImagePreview(src) {
        if (!src) {
            elements.prodImagePreview.innerHTML = `<span style="color: var(--adm-text-muted); font-size: 0.85rem;">Image preview will appear here</span>`;
            return;
        }
        elements.prodImagePreview.innerHTML = `<img src="${src}" alt="Preview" onerror="this.src='assets/logo.png'">`;
    }

    function handleProductFormSubmit(e) {
        e.preventDefault();
        const id = document.getElementById("prodEditId").value;
        const categorySlug = elements.prodCategorySelect.value;
        const categoryObj = StoreData.getCategories().find(c => c.slug === categorySlug);
        const categoryLabel = categoryObj ? categoryObj.name : categorySlug;

        const price = parseFloat(document.getElementById("prodPrice").value) || 0;
        const originalPrice = parseFloat(document.getElementById("prodOriginalPrice").value) || price;
        const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

        const sizesInput = document.getElementById("prodSizes").value.trim();
        const sizes = sizesInput ? sizesInput.split(",").map(s => s.trim()).filter(Boolean) : ["Standard"];

        const stockCount = parseInt(document.getElementById("prodStock").value) || 0;
        const stockStatusVal = document.getElementById("prodStockStatus") ? document.getElementById("prodStockStatus").value : (stockCount > 0 ? "in_stock" : "out_of_stock");
        const availabilityVal = document.getElementById("prodAvailability") ? document.getElementById("prodAvailability").value : "available";
        const statusVal = document.getElementById("prodStatus") ? document.getElementById("prodStatus").value : "active";

        const productData = {
            id: id ? parseInt(id) : null,
            title: document.getElementById("prodTitle").value.trim(),
            category: categorySlug,
            categoryLabel: categoryLabel,
            price: price,
            originalPrice: originalPrice,
            discount: discount,
            stock: stockCount,
            stockStatus: stockStatusVal,
            availability: availabilityVal,
            status: statusVal,
            badge: document.getElementById("prodBadge").value.trim(),
            image: document.getElementById("prodImageUrl").value.trim() || "assets/logo.png",
            shortDesc: document.getElementById("prodShortDesc").value.trim(),
            longDesc: document.getElementById("prodLongDesc").value.trim(),
            sizes: sizes,
            rating: 4.8,
            reviewsCount: 15
        };

        StoreData.saveProduct(productData);
        closeProductModal();
        showToast(`Product "${productData.title}" saved successfully!`, "success");
        renderAll();
    }

    function deleteProduct(id) {
        const prod = StoreData.getProductById(id);
        if (!prod) return;
        if (confirm(`Are you sure you want to delete "${prod.title}"?`)) {
            StoreData.deleteProduct(id);
            showToast("Product deleted.", "info");
            renderAll();
        }
    }

    function toggleProductStatus(id) {
        const updated = StoreData.toggleProductStatus(id);
        if (updated) {
            const isNowActive = updated.status === "active";
            showToast(`Product "${updated.title}" is now ${isNowActive ? 'Active (Live)' : 'Deactivated (Hidden)'}`, isNowActive ? "success" : "info");
            renderAll();
        }
    }

    function toggleProductStock(id) {
        const updated = StoreData.toggleProductStock(id);
        if (updated) {
            const inStock = updated.stockStatus === "in_stock";
            showToast(`"${updated.title}" marked ${inStock ? 'In Stock' : 'Out of Stock'}`, inStock ? "success" : "warning");
            renderAll();
        }
    }

    // --- CATEGORY MODAL LOGIC ---
    function openAddCategoryModal() {
        STATE.editingCategoryId = null;
        elements.categoryModalTitle.textContent = "Add New Category";
        elements.categoryForm.reset();
        document.getElementById("catEditId").value = "";
        if (document.getElementById("catStatus")) document.getElementById("catStatus").value = "active";
        if (document.getElementById("catAvailability")) document.getElementById("catAvailability").value = "available";
        if (document.getElementById("catShowOnHome")) document.getElementById("catShowOnHome").checked = true;
        elements.categoryModalOverlay.classList.add("active");
    }

    function openEditCategoryModal(idOrSlug) {
        const cat = StoreData.getCategories().find(c => String(c.id) === String(idOrSlug) || c.slug === idOrSlug);
        if (!cat) return;

        STATE.editingCategoryId = cat.id;
        elements.categoryModalTitle.textContent = "Edit Category: " + cat.name;
        document.getElementById("catEditId").value = cat.id || "";
        document.getElementById("catName").value = cat.name;
        document.getElementById("catSlug").value = cat.slug;
        document.getElementById("catImage").value = cat.image || "";
        document.getElementById("catDesc").value = cat.description || "";

        if (document.getElementById("catStatus")) document.getElementById("catStatus").value = cat.status || "active";
        if (document.getElementById("catAvailability")) document.getElementById("catAvailability").value = cat.availability || "available";
        if (document.getElementById("catShowOnHome")) document.getElementById("catShowOnHome").checked = cat.showOnHome !== false;

        elements.categoryModalOverlay.classList.add("active");
    }

    function closeCategoryModal() {
        elements.categoryModalOverlay.classList.remove("active");
    }

    function handleCategoryFormSubmit(e) {
        e.preventDefault();
        const id = document.getElementById("catEditId").value;
        const catData = {
            id: id ? parseInt(id) : null,
            name: document.getElementById("catName").value.trim(),
            slug: document.getElementById("catSlug").value.trim().toLowerCase().replace(/\s+/g, '-'),
            image: document.getElementById("catImage").value.trim() || "assets/Home Decor.jpg",
            description: document.getElementById("catDesc").value.trim(),
            status: document.getElementById("catStatus") ? document.getElementById("catStatus").value : "active",
            availability: document.getElementById("catAvailability") ? document.getElementById("catAvailability").value : "available",
            showOnHome: document.getElementById("catShowOnHome") ? document.getElementById("catShowOnHome").checked : true
        };

        StoreData.saveCategory(catData);
        closeCategoryModal();
        showToast(`Category "${catData.name}" saved!`, "success");
        renderAll();
    }

    function deleteCategory(idOrSlug) {
        if (confirm("Are you sure you want to delete this category?")) {
            StoreData.deleteCategory(idOrSlug);
            showToast("Category removed.", "info");
            renderAll();
        }
    }

    function toggleCategoryStatus(idOrSlug) {
        const updated = StoreData.toggleCategoryStatus(idOrSlug);
        if (updated) {
            const isNowActive = updated.status === "active";
            showToast(`Category "${updated.name}" is now ${isNowActive ? 'Active' : 'Deactivated'}`, isNowActive ? "success" : "info");
            renderAll();
        }
    }

    // --- COUPON MODAL LOGIC ---
    function openAddCouponModal() {
        elements.couponForm.reset();
        // Default expiry date 3 months into the future
        const d = new Date();
        d.setDate(d.getDate() + 90);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        if (document.getElementById("couponExpiryDate")) {
            document.getElementById("couponExpiryDate").value = `${yyyy}-${mm}-${dd}`;
        }
        if (document.getElementById("couponStatus")) {
            document.getElementById("couponStatus").value = "active";
        }
        if (document.getElementById("couponUsageLimit")) {
            document.getElementById("couponUsageLimit").value = "500";
        }
        elements.couponModalOverlay.classList.add("active");
    }

    function closeCouponModal() {
        elements.couponModalOverlay.classList.remove("active");
    }

    function handleCouponFormSubmit(e) {
        e.preventDefault();
        const statusVal = document.getElementById("couponStatus") ? document.getElementById("couponStatus").value : "active";
        const couponData = {
            code: document.getElementById("couponCode").value.trim().toUpperCase(),
            type: document.getElementById("couponType").value,
            value: parseFloat(document.getElementById("couponValue").value) || 0,
            minSpend: parseFloat(document.getElementById("couponMinSpend").value) || 0,
            description: document.getElementById("couponDescription").value.trim(),
            expiryDate: document.getElementById("couponExpiryDate") ? document.getElementById("couponExpiryDate").value : null,
            status: statusVal,
            usageLimit: document.getElementById("couponUsageLimit") ? parseInt(document.getElementById("couponUsageLimit").value) || 0 : 500,
            active: statusVal === "active"
        };

        StoreData.saveCoupon(couponData);
        closeCouponModal();
        showToast(`Coupon "${couponData.code}" created successfully!`, "success");
        renderAll();
    }

    function deleteCoupon(code) {
        if (confirm(`Delete coupon ${code}?`)) {
            StoreData.deleteCoupon(code);
            showToast(`Coupon ${code} removed.`, "info");
            renderAll();
        }
    }

    function toggleCouponStatus(code) {
        const updated = StoreData.toggleCouponStatus(code);
        if (updated) {
            const isNowActive = updated.status === "active";
            showToast(`Coupon "${updated.code}" is now ${isNowActive ? 'Active' : 'Deactivated'}`, isNowActive ? "success" : "info");
            renderAll();
        }
    }

    // --- HOMEPAGE BANNER MODAL LOGIC ---
    function openAddBannerModal() {
        STATE.editingBannerId = null;
        elements.bannerModalTitle.textContent = "Add Homepage Hero Banner";
        elements.bannerForm.reset();
        document.getElementById("bannerEditId").value = "";

        // Auto-assign next order
        const existingBanners = StoreData.getBanners();
        document.getElementById("bannerOrder").value = existingBanners.length + 1;
        document.getElementById("bannerStatus").value = "active";

        const fileLabel = document.getElementById("bannerImageFileName");
        if (fileLabel) fileLabel.textContent = "or choose local image file";
        const fileInput = document.getElementById("bannerImageFileInput");
        if (fileInput) fileInput.value = "";

        updateBannerImagePreview("");
        elements.bannerModalOverlay.classList.add("active");
    }

    function openEditBannerModal(id) {
        const banner = StoreData.getBannerById(id);
        if (!banner) return;

        STATE.editingBannerId = banner.id;
        elements.bannerModalTitle.textContent = "Edit Banner: " + (banner.headline || "Slide #" + banner.order);
        document.getElementById("bannerEditId").value = banner.id;
        document.getElementById("bannerHeadline").value = banner.headline || "";
        document.getElementById("bannerSubtitle").value = banner.subtitle || "";
        document.getElementById("bannerOrder").value = banner.order || 1;
        document.getElementById("bannerStatus").value = banner.active === false ? "deactivated" : "active";
        document.getElementById("bannerImageUrl").value = banner.image || "";
        document.getElementById("bannerBtn1Text").value = banner.btn1Text || "";
        document.getElementById("bannerBtn1Link").value = banner.btn1Link || "";
        document.getElementById("bannerBtn2Text").value = banner.btn2Text || "";
        document.getElementById("bannerBtn2Link").value = banner.btn2Link || "";
        document.getElementById("bannerDesc").value = banner.description || "";

        const fileLabel = document.getElementById("bannerImageFileName");
        if (fileLabel) fileLabel.textContent = banner.image && banner.image.startsWith("data:") ? "Custom uploaded image" : "or choose local image file";
        const fileInput = document.getElementById("bannerImageFileInput");
        if (fileInput) fileInput.value = "";

        updateBannerImagePreview(banner.image || "");
        elements.bannerModalOverlay.classList.add("active");
    }

    function closeBannerModal() {
        elements.bannerModalOverlay.classList.remove("active");
    }

    function updateBannerImagePreview(src) {
        if (!src) {
            elements.bannerImagePreview.innerHTML = `<span style="color: var(--adm-text-muted); font-size: 0.85rem;">Banner preview will appear here</span>`;
            return;
        }
        elements.bannerImagePreview.innerHTML = `<img src="${src}" alt="Preview" onerror="this.src='assets/logo.png'">`;
    }

    function handleBannerFormSubmit(e) {
        e.preventDefault();
        const id = document.getElementById("bannerEditId").value;
        const bannerData = {
            id: id ? parseInt(id) : null,
            headline: document.getElementById("bannerHeadline").value.trim(),
            subtitle: document.getElementById("bannerSubtitle").value.trim(),
            order: parseInt(document.getElementById("bannerOrder").value) || 1,
            active: document.getElementById("bannerStatus").value === "active",
            image: document.getElementById("bannerImageUrl").value.trim() || "assets/hero1.jpg",
            btn1Text: document.getElementById("bannerBtn1Text").value.trim() || "Shop Collection",
            btn1Link: document.getElementById("bannerBtn1Link").value.trim() || "#products",
            btn2Text: document.getElementById("bannerBtn2Text").value.trim() || "Explore Offers",
            btn2Link: document.getElementById("bannerBtn2Link").value.trim() || "#coupons",
            description: document.getElementById("bannerDesc").value.trim()
        };

        StoreData.saveBanner(bannerData);
        closeBannerModal();
        showToast(`Banner slide saved successfully!`, "success");
        renderAll();
    }

    function deleteBanner(id) {
        const b = StoreData.getBannerById(id);
        if (!b) return;
        if (confirm(`Are you sure you want to delete this banner slide?`)) {
            StoreData.deleteBanner(id);
            showToast("Banner slide deleted.", "info");
            renderAll();
        }
    }

    function toggleBannerStatus(id) {
        const updated = StoreData.toggleBannerStatus(id);
        if (updated) {
            showToast(`Banner slide is now ${updated.active ? 'Active (Live)' : 'Deactivated (Hidden)'}`, updated.active ? "success" : "info");
            renderAll();
        }
    }

    // --- ORDER & INVOICE LOGIC ---
    function updateOrderStatus(orderId, newStatus) {
        StoreData.updateOrderStatus(orderId, newStatus);
        showToast(`Order ${orderId} status changed to ${newStatus}`, "success");
        renderAll();
    }

    function deleteOrder(orderId) {
        if (confirm(`Are you sure you want to delete Order ${orderId}?`)) {
            StoreData.deleteOrder(orderId);
            showToast("Order removed from records.", "info");
            renderAll();
        }
    }

    function viewInvoice(orderId) {
        const order = StoreData.getOrders().find(o => o.id === orderId);
        if (!order) return;

        document.getElementById("invoiceOrderId").textContent = order.id;
        document.getElementById("invoiceDate").textContent = new Date(order.date).toLocaleDateString("en-IN", {
            day: "numeric", month: "long", year: "numeric"
        });

        const statusBadge = document.getElementById("invoiceStatusBadge");
        statusBadge.className = `status-badge ${order.status.toLowerCase()}`;
        statusBadge.textContent = order.status;

        document.getElementById("invoiceCustomerName").textContent = order.customerName || "Customer";
        document.getElementById("invoiceCustomerEmail").textContent = order.customerEmail || "Not provided";
        document.getElementById("invoiceCustomerPhone").textContent = order.customerPhone || "Not provided";
        document.getElementById("invoiceShippingAddress").textContent = order.address || "Standard Storefront Delivery";
        document.getElementById("invoicePaymentMode").textContent = order.paymentMethod || "Cash on Delivery";
        document.getElementById("invoiceCouponUsed").textContent = order.couponUsed ? `Promo Code Applied: ${order.couponUsed}` : "No Coupon Applied";
        document.getElementById("invoiceOrderNotes").textContent = order.notes ? `Customer Note: "${order.notes}"` : "";

        // Item rows
        const itemsTbody = document.getElementById("invoiceItemsTableBody");
        const items = order.items || [];
        itemsTbody.innerHTML = items.map(it => `
            <tr>
                <td><strong>${it.title}</strong></td>
                <td>₹${parseFloat(it.price).toFixed(2)}</td>
                <td>x ${it.quantity}</td>
                <td style="text-align: right; font-weight: 600;">₹${(it.price * it.quantity).toFixed(2)}</td>
            </tr>
        `).join("");

        const subtotal = order.subtotal || items.reduce((s, it) => s + (it.price * it.quantity), 0);
        const discount = order.discount || 0;
        const grandTotal = order.total || Math.max(0, subtotal - discount);

        document.getElementById("invoiceSubtotal").textContent = `₹${subtotal.toFixed(2)}`;
        document.getElementById("invoiceDiscount").textContent = `-₹${discount.toFixed(2)}`;
        document.getElementById("invoiceGrandTotal").textContent = `₹${grandTotal.toFixed(2)}`;

        elements.invoiceModalOverlay.classList.add("active");
    }

    function closeInvoiceModal() {
        elements.invoiceModalOverlay.classList.remove("active");
    }

    // --- INQUIRIES ACTIONS ---
    function markMessageRead(id) {
        StoreData.markMessageRead(id);
        showToast("Message marked as read.", "success");
        renderAll();
    }

    function deleteMessage(id) {
        if (confirm("Delete this inquiry?")) {
            StoreData.deleteMessage(id);
            showToast("Message deleted.", "info");
            renderAll();
        }
    }

    // Expose functions globally to window.AdminApp
    window.AdminApp = {
        init,
        switchTab,
        openAddProductModal,
        openEditProductModal,
        closeProductModal,
        deleteProduct,
        toggleProductStatus,
        toggleProductStock,
        openAddCategoryModal,
        openEditCategoryModal,
        closeCategoryModal,
        deleteCategory,
        toggleCategoryStatus,
        openAddCouponModal,
        closeCouponModal,
        deleteCoupon,
        toggleCouponStatus,
        openAddBannerModal,
        openEditBannerModal,
        closeBannerModal,
        deleteBanner,
        toggleBannerStatus,
        updateOrderStatus,
        deleteOrder,
        viewInvoice,
        closeInvoiceModal,
        markMessageRead,
        deleteMessage
    };

    // Run on DOM load
    document.addEventListener("DOMContentLoaded", init);
})();
