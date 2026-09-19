import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

const ProductDetailModal = ({ product, isModal = true, onClose = null }) => {
  const { addToCart, toggleWishlist, isInWishlist, setCartDrawerOpen, setCheckoutModalOpen } = useStore();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc'); // 'desc' | 'specs' | 'reviews'
  const [pincodeInput, setPincodeInput] = useState('400705');
  const [deliveryResult, setDeliveryResult] = useState({
    checked: true,
    dateStr: getEstimatedDeliveryDate(3),
    freeDelivery: true,
    codAvailable: true
  });

  function getEstimatedDeliveryDate(daysFromNow = 3) {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-IN', options);
  }

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

  const originalPrice = product.originalPrice || Math.round(product.price * 1.25);
  const discountPercent = product.discount || (originalPrice > product.price
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : 20);

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

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincodeInput.trim())) {
      setDeliveryResult({
        checked: true,
        dateStr: getEstimatedDeliveryDate(3),
        freeDelivery: true,
        codAvailable: true
      });
    } else {
      setDeliveryResult({
        checked: false,
        error: 'Please enter a valid 6-digit pincode'
      });
    }
  };

  const content = (
    <div className="product-details-container fk-pdp-container" style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', maxWidth: '1080px', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px', padding: '28px' }}>
        
        {/* Left Column: Image Gallery & Sticky Dual Buttons */}
        <div className="fk-pdp-left">
          <div style={{ position: 'relative', background: '#f8fafc', borderRadius: '10px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
            <img
              src={imgSrc}
              alt={product.title}
              style={{ maxHeight: '88%', maxWidth: '88%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
            />
            {discountPercent > 0 && (
              <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#388e3c', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
                {discountPercent}% OFF
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              style={{ position: 'absolute', top: '12px', right: '12px', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <i className={`${isFavorited ? 'fa-solid' : 'fa-regular'} fa-heart`} style={{ color: isFavorited ? '#FF5B7F' : '#94a3b8', fontSize: '1.1rem' }}></i>
            </button>
          </div>

          {/* Thumbnails */}
          {imageList.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
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
                      borderRadius: '6px',
                      border: '2px solid',
                      borderColor: activeImgIndex === idx ? '#2874f0' : '#e2e8f0',
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

          {/* Flipkart Sticky Dual Action Buttons */}
          <div className="fk-pdp-buttons" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
            <button
              type="button"
              className="fk-btn-cart"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              style={{
                background: '#ff9f00',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '14px 16px',
                borderRadius: '4px',
                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(255, 159, 0, 0.4)',
                textTransform: 'uppercase'
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>

            <button
              type="button"
              className="fk-btn-buy"
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              style={{
                background: '#fb641b',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '14px 16px',
                borderRadius: '4px',
                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(251, 100, 27, 0.4)',
                textTransform: 'uppercase'
              }}
            >
              <i className="fa-solid fa-bolt"></i> Buy Now
            </button>
          </div>
        </div>

        {/* Right Column: Flipkart Product Information */}
        <div className="fk-pdp-right">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#878787', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
              {product.categoryLabel || product.category}
            </span>
            <span className="fk-assured-tag">
              <span className="fk-f">F</span>-Assured <i className="fa-solid fa-check"></i>
            </span>
          </div>

          <h1 style={{ fontSize: '1.45rem', color: '#212121', margin: '6px 0 10px 0', fontWeight: 600, lineHeight: 1.4 }}>
            {product.title}
          </h1>

          {/* Flipkart Rating Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span className="fk-rating-pill">
              {product.rating || '4.8'} <i className="fa-solid fa-star"></i>
            </span>
            <span style={{ fontSize: '0.88rem', color: '#878787', fontWeight: 500 }}>
              {product.reviewsCount || 128} Ratings & 34 Reviews
            </span>
          </div>

          {/* Flipkart Special Price Box */}
          <div className="fk-pdp-price-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', marginBottom: '18px' }}>
            <div style={{ fontSize: '0.78rem', color: '#388e3c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
              Special Price
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '1.9rem', fontWeight: 800, color: '#212121' }}>
                ₹{product.price.toLocaleString()}
              </span>
              {originalPrice > product.price && (
                <span style={{ fontSize: '1.05rem', color: '#878787', textDecoration: 'line-through' }}>
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
              {discountPercent > 0 && (
                <span style={{ fontSize: '1.05rem', color: '#388e3c', fontWeight: 700 }}>
                  {discountPercent}% off
                </span>
              )}
            </div>
          </div>

          {/* Flipkart Available Offers Card */}
          <div className="fk-offers-card" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px', marginBottom: '18px', background: '#ffffff' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#212121', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-tags" style={{ color: '#2874f0' }}></i> Available Offers
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#212121' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <i className="fa-solid fa-tag" style={{ color: '#388e3c', marginTop: '3px' }}></i>
                <span><strong>Bank Offer:</strong> 5% Unlimited Cashback on Flipkart Axis / HDFC Bank Credit Card <a href="#offers" onClick={(e) => e.preventDefault()} style={{ color: '#2874f0', textDecoration: 'none' }}>T&C</a></span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <i className="fa-solid fa-tag" style={{ color: '#388e3c', marginTop: '3px' }}></i>
                <span><strong>Special Price:</strong> Get extra ₹100 off on your first order with code <code>WELCOME100</code> <a href="#offers" onClick={(e) => e.preventDefault()} style={{ color: '#2874f0', textDecoration: 'none' }}>T&C</a></span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <i className="fa-solid fa-tag" style={{ color: '#388e3c', marginTop: '3px' }}></i>
                <span><strong>Partner Offer:</strong> Sign-up for PRETUTE Club & get free express shipping nationwide.</span>
              </li>
            </ul>
          </div>

          {/* Flipkart Pincode Delivery Checker */}
          <div className="fk-pincode-checker" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px', marginBottom: '18px', background: '#fcfdfe' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#878787' }}>Delivery</span>
              <form onSubmit={handlePincodeCheck} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  placeholder="Enter Pincode"
                  style={{ width: '120px', padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '0.85rem' }}
                />
                <button
                  type="submit"
                  style={{ background: '#2874f0', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Check
                </button>
              </form>
            </div>

            {deliveryResult.checked && (
              <div style={{ fontSize: '0.84rem', color: '#212121', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fa-solid fa-truck" style={{ color: '#388e3c' }}></i>
                  <span>Delivery by <strong>{deliveryResult.dateStr}</strong> | <span style={{ color: '#388e3c' }}>FREE</span> <del style={{ color: '#878787' }}>₹40</del></span>
                </div>
                <div style={{ display: 'flex', gap: '16px', marginTop: '4px', fontSize: '0.78rem', color: '#64748b' }}>
                  <span><i className="fa-solid fa-circle-check" style={{ color: '#388e3c' }}></i> Cash on Delivery available</span>
                  <span><i className="fa-solid fa-arrow-rotate-left" style={{ color: '#2874f0' }}></i> 7 Days Replacement</span>
                </div>
              </div>
            )}
            {deliveryResult.error && (
              <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{deliveryResult.error}</span>
            )}
          </div>

          {/* Size / Variant Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#878787', marginBottom: '8px' }}>
                Size: <span style={{ color: '#212121', fontWeight: 700 }}>{selectedSize}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: '1.5px solid',
                      borderColor: selectedSize === size ? '#2874f0' : '#e2e8f0',
                      background: selectedSize === size ? '#f0f5ff' : '#fff',
                      color: selectedSize === size ? '#2874f0' : '#212121',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      cursor: 'pointer'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Highlights List */}
          <div className="fk-highlights-box" style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#212121', marginBottom: '8px' }}>Highlights</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: '#212121' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-circle-check" style={{ color: '#388e3c', fontSize: '0.85rem' }}></i>
                <span>100% Certified Organic & Non-Toxic Artisan Grade</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-circle-check" style={{ color: '#388e3c', fontSize: '0.85rem' }}></i>
                <span>Designed for Gentle Skin & Child Safety Standards</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-circle-check" style={{ color: '#388e3c', fontSize: '0.85rem' }}></i>
                <span>Directly from Authentic Handcrafted Creators</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs: Description & Specs */}
      <div style={{ borderTop: '1px solid #f0f0f0', padding: '20px 28px' }}>
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('desc')}
            style={{
              padding: '8px 4px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'desc' ? '2px solid #2874f0' : '2px solid transparent',
              color: activeTab === 'desc' ? '#2874f0' : '#878787',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Product Description
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            style={{
              padding: '8px 4px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'specs' ? '2px solid #2874f0' : '2px solid transparent',
              color: activeTab === 'specs' ? '#2874f0' : '#878787',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Specifications
          </button>
        </div>

        {activeTab === 'desc' && (
          <p style={{ color: '#212121', fontSize: '0.88rem', lineHeight: 1.7 }}>
            {product.longDesc || product.shortDesc}
          </p>
        )}
        {activeTab === 'specs' && (
          <div style={{ fontSize: '0.85rem', color: '#212121', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '600px' }}>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}><span style={{ color: '#878787' }}>Material:</span> 100% Organic & Non-toxic</div>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}><span style={{ color: '#878787' }}>Origin:</span> Handcrafted in India</div>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}><span style={{ color: '#878787' }}>Dispatch:</span> Within 24 Hours</div>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}><span style={{ color: '#878787' }}>Warranty:</span> 1 Year Manufacturer Warranty</div>
          </div>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div
        className="custom-modal-overlay active"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', zIndex: 9999, padding: '20px', overflowY: 'auto' }}
        onClick={onClose}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: '1080px' }} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '50%', width: '38px', height: '38px', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
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
