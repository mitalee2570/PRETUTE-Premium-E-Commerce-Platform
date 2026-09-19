import React from 'react';
import { useStore } from '../../context/StoreContext';

const WishlistView = () => {
  const { wishlist, products, navigateTo, toggleWishlist, addToCart } = useStore();

  const resolvedItems = wishlist.map(item => {
    if (typeof item === 'object' && item !== null && item.title) return item;
    const id = typeof item === 'object' && item !== null ? item.id : item;
    return products.find(p => String(p.id) === String(id));
  }).filter(Boolean);

  return (
    <div className="section-container fk-wishlist-container" style={{ minHeight: '65vh' }}>
      <div className="fk-wishlist-header">
        <div className="fk-wishlist-header-left">
          <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', color: '#212121' }}>My Wishlist</h1>
          <span className="fk-wishlist-count-tag">({resolvedItems.length} items)</span>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="btn btn-outline btn-sm"
          style={{ padding: '6px 14px', borderRadius: '4px', fontSize: '0.85rem' }}
        >
          <i className="fa-solid fa-arrow-left"></i> Continue Shopping
        </button>
      </div>

      {resolvedItems.length === 0 ? (
        <div className="empty-wishlist-state" style={{ display: 'block', padding: '60px 20px', textAlign: 'center', background: '#fff', borderRadius: '0 0 4px 4px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div className="empty-message-box">
            <div className="wishlist-icon-circle" style={{ width: '80px', height: '80px', margin: '0 auto 16px', borderRadius: '50%', background: '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontSize: '2.2rem' }}>
              <i className="fa-regular fa-heart"></i>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#212121', margin: '0 0 8px 0' }}>Your Wishlist is Empty!</h2>
            <p style={{ color: '#878787', fontSize: '0.9rem', margin: '0 0 20px 0' }}>Explore our collections and save items you love by clicking the heart icon.</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigateTo('home')}
              style={{ padding: '10px 24px', borderRadius: '4px', fontWeight: 600 }}
            >
              <i className="fa-solid fa-bag-shopping" style={{ marginRight: '6px' }}></i> Explore Products
            </button>
          </div>
        </div>
      ) : (
        <div className="fk-wishlist-items-wrapper">
          {resolvedItems.map((prod) => {
            const discountPercent = prod.discount || (prod.originalPrice ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100) : 0);
            const inStock = (typeof prod.stock === 'undefined' || prod.stock > 0) && prod.stockStatus !== "out_of_stock";

            return (
              <div key={prod.id} className="fk-wishlist-item">
                <div
                  className="fk-wishlist-img-wrap"
                  onClick={() => navigateTo('details', prod.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={prod.image || 'assets/prod_romper.png'}
                    alt={prod.title}
                    onError={(e) => { e.target.src = 'assets/prod_romper.png'; }}
                  />
                </div>
                <div className="fk-wishlist-details">
                  <div className="fk-wishlist-category">{prod.categoryLabel || prod.category || 'PRETUTE Premium'}</div>
                  <h3
                    className="fk-wishlist-title"
                    onClick={() => navigateTo('details', prod.id)}
                  >
                    {prod.title}
                  </h3>
                  <div className="fk-wishlist-rating-row">
                    <span className="fk-wishlist-rating-pill">
                      {prod.rating || '4.8'} <i className="fa-solid fa-star" style={{ fontSize: '0.65rem' }}></i>
                    </span>
                    <span className="fk-wishlist-rating-count">({prod.reviewsCount || 124})</span>
                    <span className="fk-assured-tag" style={{ marginLeft: '8px' }}>
                      <span className="fk-f">PRETUTE</span><span className="fk-plus">Assured</span>
                    </span>
                  </div>
                  <div className="fk-wishlist-price-row">
                    <span className="fk-wishlist-price">₹{Number(prod.price).toLocaleString('en-IN')}</span>
                    {prod.originalPrice ? (
                      <span className="fk-wishlist-mrp">₹{Number(prod.originalPrice).toLocaleString('en-IN')}</span>
                    ) : null}
                    {discountPercent > 0 && (
                      <span className="fk-wishlist-discount">{discountPercent}% off</span>
                    )}
                  </div>
                  <div className={`fk-wishlist-stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                    <i className={`fa-solid ${inStock ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>{' '}
                    {inStock ? 'In Stock • Free Delivery by Tomorrow' : 'Currently Out of Stock'}
                  </div>
                </div>
                <div className="fk-wishlist-actions">
                  <button
                    type="button"
                    className="fk-wishlist-cart-btn"
                    onClick={() => {
                      addToCart(prod, prod.sizes ? prod.sizes[0] : 'Standard', 1);
                      toggleWishlist(prod);
                    }}
                  >
                    <i className="fa-solid fa-bag-shopping"></i>
                    <span>Move to Cart</span>
                  </button>
                  <button
                    type="button"
                    className="fk-wishlist-delete-btn"
                    onClick={() => toggleWishlist(prod)}
                    title="Remove from Wishlist"
                  >
                    <i className="fa-solid fa-trash"></i>
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishlistView;
