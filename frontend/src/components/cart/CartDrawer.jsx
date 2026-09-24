import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { getAssetUrl } from '../../utils/imageUrl';

const CartDrawer = () => {
  const {
    cart,
    cartSubtotal,
    cartTotalItems,
    discountAmount,
    shippingFee,
    isFreeShipping,
    freeShippingThreshold,
    finalTotal,
    removeFromCart,
    updateCartQuantity,
    cartDrawerOpen,
    setCartDrawerOpen,
    promo,
    applyPromo,
    removePromo,
    customer,
    setAuthModalState,
    setPendingPurchaseAction,
    setCheckoutModalOpen
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  if (!cartDrawerOpen) return null;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await applyPromo(couponInput);
    setCouponLoading(false);
    setCouponInput('');
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <>
      <div
        className="cart-drawer-overlay active"
        id="cartDrawerOverlay"
        style={{ display: 'block', zIndex: 9990 }}
        onClick={() => setCartDrawerOpen(false)}
      ></div>

      <div
        className="cart-drawer active open"
        id="cartDrawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
        style={{ zIndex: 9991, display: 'flex', flexDirection: 'column', right: 0 }}
      >
        {/* Header */}
        <div className="drawer-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1A253C' }}>
            Shopping Bag (<span id="cartDrawerCount">{cartTotalItems}</span>)
          </h3>
          <button
            type="button"
            className="close-drawer-btn"
            id="closeDrawerBtn"
            aria-label="Close Cart"
            onClick={() => setCartDrawerOpen(false)}
            style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div style={{ padding: '12px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px', fontWeight: 600, color: isFreeShipping ? '#10B981' : '#1A253C' }}>
            <span>
              {isFreeShipping ? (
                <span><i className="fa-solid fa-circle-check"></i> You unlocked FREE Shipping!</span>
              ) : (
                <span>Add ₹{remainingForFreeShipping.toLocaleString()} more for FREE shipping</span>
              )}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: isFreeShipping ? '#10B981' : 'var(--color-primary)',
                transition: 'width 0.4s ease'
              }}
            ></div>
          </div>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: '#64748b' }}>
              <i className="fa-solid fa-bag-shopping" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '14px' }}></i>
              <h4 style={{ margin: '0 0 6px 0', color: '#1A253C' }}>Your bag is empty</h4>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>Explore our luxury collections and add your favorites!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => {
                const itemImg = getAssetUrl(item.image);
                return (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    style={{ display: 'flex', gap: '14px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}
                  >
                    <img
                      src={itemImg}
                      alt={item.title}
                      style={{ width: '64px', height: '64px', objectFit: 'contain', background: '#f8fafc', borderRadius: '8px', padding: '4px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.9rem', color: '#1A253C', margin: '0 0 4px 0', fontWeight: 600 }}>{item.title}</h4>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '6px' }}>
                        Size: <span style={{ fontWeight: 600 }}>{item.selectedSize}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, item.selectedSize, -1)}
                            style={{ width: '26px', height: '26px', background: '#f8fafc', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                          >
                            -
                          </button>
                          <span style={{ width: '28px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, item.selectedSize, 1)}
                            style={{ width: '26px', height: '26px', background: '#f8fafc', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove Item"
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px' }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Calculations & Checkout */}
        {cart.length > 0 && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="Enter Promo Code (e.g. PRETUTE20)"
                style={{ flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', textTransform: 'uppercase' }}
              />
              <button
                type="submit"
                disabled={couponLoading}
                className="btn btn-outline"
                style={{ padding: '8px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, border: '1px solid var(--color-primary)', color: 'var(--color-primary)', background: '#fff', cursor: 'pointer' }}
              >
                {couponLoading ? 'Checking...' : 'Apply'}
              </button>
            </form>

            {/* Active Promo Tag */}
            {promo && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ECFDF5', padding: '6px 10px', borderRadius: '6px', marginBottom: '12px', fontSize: '0.8rem', color: '#047857' }}>
                <span><i className="fa-solid fa-tag"></i> <strong>{promo.code}</strong> applied (-₹{Math.round(discountAmount).toLocaleString()})</span>
                <button
                  type="button"
                  onClick={removePromo}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 600 }}
                >
                  Remove
                </button>
              </div>
            )}

            {/* Price Breakdown */}
            <div style={{ fontSize: '0.88rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                  <span>Discount</span>
                  <span>-₹{Math.round(discountAmount).toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>{isFreeShipping ? <strong style={{ color: '#10B981' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: '#1A253C', borderTop: '1px solid #e2e8f0', paddingTop: '8px', marginTop: '4px' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--color-primary)' }}>₹{Math.round(finalTotal).toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => {
                setCartDrawerOpen(false);
                if (!customer) {
                  setPendingPurchaseAction({ type: 'checkout' });
                  setAuthModalState('signin');
                } else {
                  setCheckoutModalOpen(true);
                }
              }}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', background: '#ffd814', color: '#0f1111', border: '1px solid #fcd200', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 2px 5px rgba(213,217,217,0.5)' }}
            >
              <span>Proceed to Checkout</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
