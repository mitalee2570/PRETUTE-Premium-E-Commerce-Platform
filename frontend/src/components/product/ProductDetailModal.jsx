import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

const ProductDetailModal = ({ product, isModal = true, onClose = null }) => {
  const { addToCart, toggleWishlist, isInWishlist, setCartDrawerOpen, setCheckoutModalOpen } = useStore();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc'); // 'desc' | 'specs' | 'reviews'

  useEffect(() => {
    if (product) {
      setActiveImgIndex(0);
      setSelectedSize(product.sizes?.[0] || 'Standard');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stockStatus === 'out_of_stock' || product.stock <= 0;
  const imageList = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentImage = imageList[activeImgIndex] || product.image;
  const imgSrc = currentImage.startsWith('assets/') ? `/${currentImage}` : currentImage;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, quantity);
    if (isModal && onClose) onClose();
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, quantity);
    if (isModal && onClose) onClose();
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  const content = (
    <div className="product-details-container" style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', padding: '28px' }}>
        {/* Left Column: Image Gallery */}
        <div>
          <div style={{ position: 'relative', background: '#f8fafc', borderRadius: '12px', height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <img
              src={imgSrc}
              alt={product.title}
              style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }}
            />
            {product.discount > 0 && (
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#10B981', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
                {product.discount}% OFF
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              style={{ position: 'absolute', top: '12px', right: '12px', background: '#fff', border: 'none', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <i className={`${isFavorited ? 'fa-solid' : 'fa-regular'} fa-heart`} style={{ color: isFavorited ? '#FF5B7F' : '#64748b' }}></i>
            </button>
          </div>

          {/* Thumbnails */}
          {imageList.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px', overflowX: 'auto' }}>
              {imageList.map((img, idx) => {
                const thumbSrc = img.startsWith('assets/') ? `/${img}` : img;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      border: '2px solid',
                      borderColor: activeImgIndex === idx ? 'var(--color-primary)' : '#e2e8f0',
                      padding: '4px',
                      background: '#f8fafc',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <img src={thumbSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Information & Actions */}
        <div>
          <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
            {product.categoryLabel || product.category}
          </span>
          <h1 style={{ fontSize: '1.6rem', color: '#1A253C', margin: '8px 0 12px 0', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>
            {product.title}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <div style={{ color: '#FFAE19', fontSize: '0.9rem' }}>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke"></i>
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1A253C' }}>{product.rating || 4.8}</span>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>({product.reviewsCount || 42} Customer Reviews)</span>
          </div>

          {/* Pricing */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FF5B7F' }}>
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span style={{ fontSize: '1.1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 600, background: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
              Inclusive of all taxes
            </span>
          </div>

          {/* Short Description */}
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
            {product.shortDesc}
          </p>

          {/* Size / Variant Options */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1A253C', marginBottom: '8px' }}>
                Select Size / Variant: <span style={{ color: 'var(--color-primary)' }}>{selectedSize}</span>
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1.5px solid',
                      borderColor: selectedSize === size ? 'var(--color-primary)' : '#cbd5e1',
                      background: selectedSize === size ? '#fff1f2' : '#fff',
                      color: selectedSize === size ? 'var(--color-primary)' : '#1A253C',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Stock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                style={{ width: '36px', height: '36px', background: '#f8fafc', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}
              >
                -
              </button>
              <span style={{ width: '40px', textAlign: 'center', fontWeight: 600, fontSize: '0.95rem' }}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
                style={{ width: '36px', height: '36px', background: '#f8fafc', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}
              >
                +
              </button>
            </div>
            <span style={{ fontSize: '0.85rem', color: isOutOfStock ? '#ef4444' : '#10B981', fontWeight: 600 }}>
              {isOutOfStock ? 'Currently Out of Stock' : `In Stock (${product.stock || 25} available)`}
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-primary"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              style={{ flex: 1, padding: '14px', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
            >
              <i className="fa-solid fa-bag-shopping"></i> Add to Bag
            </button>
            <button
              type="button"
              className="btn btn-outline"
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              style={{ flex: 1, padding: '14px', borderRadius: '8px', fontWeight: 700, border: '2px solid var(--color-primary)', color: 'var(--color-primary)', background: '#fff', cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Specs & Reviews */}
      <div style={{ borderTop: '1px solid #e2e8f0', padding: '24px 28px' }}>
        <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('desc')}
            style={{
              padding: '8px 12px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'desc' ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab === 'desc' ? 'var(--color-primary)' : '#64748b',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Full Description
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            style={{
              padding: '8px 12px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'specs' ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab === 'specs' ? 'var(--color-primary)' : '#64748b',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Care & Details
          </button>
        </div>

        {activeTab === 'desc' && (
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7 }}>
            {product.longDesc || product.shortDesc}
          </p>
        )}
        {activeTab === 'specs' && (
          <div style={{ fontSize: '0.9rem', color: '#475569', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div><strong>Material:</strong> 100% Certified Organic / Artisan Grade</div>
            <div><strong>Safety:</strong> Non-toxic, Toxin-free standards</div>
            <div><strong>Dispatch:</strong> Same day dispatch before 2 PM</div>
            <div><strong>Care:</strong> Gentle handwash or damp wipe</div>
          </div>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div
        className="custom-modal-overlay active"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, padding: '20px', overflowY: 'auto' }}
        onClick={onClose}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: '960px' }} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          >
            &times;
          </button>
          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default ProductDetailModal;
