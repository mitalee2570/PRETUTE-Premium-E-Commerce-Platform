import React from 'react';
import { useStore } from '../../context/StoreContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, navigateTo } = useStore();

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stockStatus === 'out_of_stock' || product.stock <= 0;
  const imgSrc = product.image.startsWith('assets/') ? `/${product.image}` : product.image;

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`} data-id={product.id}>
      {/* Product Badges */}
      <div className="product-badges-container" style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 3, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {product.badge && (
          <span className="prod-badge" style={{ background: 'var(--color-primary)', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
            {product.badge}
          </span>
        )}
        {product.discount > 0 && (
          <span className="discount-badge" style={{ background: '#10B981', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '4px 8px', borderRadius: '4px' }}>
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        className={`wishlist-heart-btn ${isFavorited ? 'favorited' : ''}`}
        aria-label="Add to Wishlist"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 3, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <i
          className={`${isFavorited ? 'fa-solid' : 'fa-regular'} fa-heart`}
          style={{ color: isFavorited ? '#FF5B7F' : '#4D586F', fontSize: '1rem' }}
        ></i>
      </button>

      {/* Image Container with Quick View Button */}
      <div
        className="prod-image-wrapper"
        onClick={() => navigateTo('details', product.id)}
        style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', height: '260px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img
          src={imgSrc}
          alt={product.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px', transition: 'transform 0.4s ease' }}
        />
        <button
          type="button"
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(26,37,60,0.9)', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', opacity: 0.9 }}
        >
          <i className="fa-regular fa-eye"></i> Quick View
        </button>
      </div>

      {/* Product Details */}
      <div className="prod-info" style={{ padding: '16px' }}>
        <span className="prod-category" style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
          {product.categoryLabel || product.category}
        </span>
        <h3
          className="prod-title"
          onClick={() => navigateTo('details', product.id)}
          style={{ fontSize: '1rem', fontWeight: 600, color: '#1A253C', margin: '6px 0', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Rating Stars */}
        <div className="prod-rating" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
          <div style={{ color: '#FFAE19', fontSize: '0.85rem' }}>
            <i className="fa-solid fa-star"></i>
          </div>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A253C' }}>{product.rating || 4.8}</span>
          <span style={{ fontSize: '0.78rem', color: '#999' }}>({product.reviewsCount || 24})</span>
        </div>

        {/* Pricing */}
        <div className="prod-pricing" style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
          <span className="current-price" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FF5B7F' }}>
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="original-price" style={{ fontSize: '0.9rem', color: '#999', textDecoration: 'line-through' }}>
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Bag Action */}
        <button
          type="button"
          className="btn btn-primary add-to-cart-btn"
          disabled={isOutOfStock}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOutOfStock) addToCart(product, product.sizes?.[0] || 'Standard', 1);
          }}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '8px', fontWeight: 600, cursor: isOutOfStock ? 'not-allowed' : 'pointer', background: isOutOfStock ? '#cbd5e1' : 'var(--color-primary)', border: 'none', color: '#fff' }}
        >
          <i className="fa-solid fa-bag-shopping"></i>
          {isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
