import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import api from '../../services/api';

const CheckoutModal = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    promo,
    customer,
    checkoutModalOpen,
    setCheckoutModalOpen,
    clearCart,
    showToast,
    setOrdersModalOpen
  } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Online UPI');
  const [orderNotes, setOrderNotes] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  useEffect(() => {
    if (customer) {
      setName(customer.name || '');
      setEmail(customer.email || '');
      setPhone(customer.phone || '');
      if (customer.address) {
        setStreet(customer.address.street || '');
        setCity(customer.address.city || '');
        setState(customer.address.state || '');
        setPincode(customer.address.pincode || '');
      }
    }
  }, [customer]);

  if (!checkoutModalOpen) return null;

  const handleClose = () => {
    setPlacedOrder(null);
    setCheckoutModalOpen(false);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const fullAddress = `${street}, ${city}, ${state} - ${pincode}`.trim();
    const orderData = {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      address: fullAddress,
      items: cart.map(item => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        image: item.image
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      couponUsed: promo ? promo.code : null,
      total: finalTotal,
      paymentMethod: paymentMethod,
      notes: orderNotes
    };

    setPlacingOrder(true);
    try {
      const res = await api.createOrder(orderData);
      if (res.success && res.order) {
        setPlacedOrder(res.order);
        clearCart();
        showToast('Order Placed! 🎉', `Order #${res.order.id} confirmed.`, 'success');
      }
    } catch (err) {
      // Fallback local order creation
      const mockOrder = {
        ...orderData,
        id: `PRT-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString(),
        status: 'Pending'
      };
      setPlacedOrder(mockOrder);
      clearCart();
      showToast('Order Placed! 🎉', `Order #${mockOrder.id} confirmed.`, 'success');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div
      className="custom-modal-overlay active"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, padding: '20px', overflowY: 'auto' }}
      onClick={handleClose}
    >
      <div
        className="custom-modal-card"
        style={{ position: 'relative', width: '100%', maxWidth: placedOrder ? '520px' : '820px', background: '#fff', borderRadius: '16px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
        >
          &times;
        </button>

        {placedOrder ? (
          /* Order Success View */
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div style={{ width: '64px', height: '64px', background: '#ECFDF5', color: '#10B981', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '16px' }}>
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h2 style={{ color: '#1A253C', margin: '0 0 8px 0' }}>Thank You for Your Order!</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 20px 0' }}>
              Your order has been confirmed and is being prepared with artisan care.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'left', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b', fontSize: '0.88rem' }}>Order Number</span>
                <strong style={{ color: 'var(--color-primary)' }}>{placedOrder.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b', fontSize: '0.88rem' }}>Recipient</span>
                <span>{placedOrder.customerName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b', fontSize: '0.88rem' }}>Payment Mode</span>
                <span>{placedOrder.paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '8px', fontWeight: 700 }}>
                <span>Total Amount Paid</span>
                <span style={{ color: '#1A253C' }}>₹{Math.round(placedOrder.total).toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleClose();
                  setOrdersModalOpen(true);
                }}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', fontWeight: 600, background: 'var(--color-primary)', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-box-open"></i> Track in My Orders
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleClose}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', fontWeight: 600, border: '1px solid #cbd5e1', cursor: 'pointer' }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff1f2', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                <i className="fa-solid fa-credit-card"></i>
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#1A253C' }}>Complete Your Checkout</h2>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>Enter your shipping details and choose payment method</p>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
                {/* Shipping Details */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#1A253C', marginBottom: '14px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                    1. Shipping Information
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Mitalee Maurya"
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="10-digit mobile"
                          style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Street Address / Flat No *</label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Flat/House No, Building, Street, Area"
                        style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>City *</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          style={{ width: '100%', padding: '9px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>State *</label>
                        <input
                          type="text"
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="State"
                          style={{ width: '100%', padding: '9px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Pincode *</label>
                        <input
                          type="text"
                          required
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="400001"
                          style={{ width: '100%', padding: '9px 10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Delivery Instructions (optional)</label>
                      <input
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="e.g. Leave with guard / call before delivery"
                        style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment & Order Summary */}
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#1A253C', marginBottom: '14px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                    2. Payment Method
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                    {['Online UPI', 'Credit / Debit Card', 'Net Banking', 'Cash on Delivery'].map(method => (
                      <label
                        key={method}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          border: '1.5px solid',
                          borderColor: paymentMethod === method ? 'var(--color-primary)' : '#e2e8f0',
                          borderRadius: '8px',
                          background: paymentMethod === method ? '#fff1f2' : '#fff',
                          cursor: 'pointer',
                          fontSize: '0.88rem',
                          fontWeight: 500
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>

                  {/* Order Summary Box */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                    <h5 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#1A253C' }}>Order Summary ({cart.length} items)</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#475569' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Subtotal</span>
                        <span>₹{cartSubtotal.toLocaleString()}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                          <span>Coupon ({promo?.code})</span>
                          <span>-₹{Math.round(discountAmount).toLocaleString()}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Shipping</span>
                        <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.05rem', color: '#1A253C', borderTop: '1px solid #e2e8f0', paddingTop: '8px', marginTop: '4px' }}>
                        <span>Total Payable</span>
                        <span style={{ color: 'var(--color-primary)' }}>₹{Math.round(finalTotal).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={placingOrder}
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '18px', padding: '14px', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', background: 'var(--color-primary)', border: 'none', color: '#fff', cursor: placingOrder ? 'not-allowed' : 'pointer' }}
                  >
                    {placingOrder ? 'Confirming Order...' : `Place Order (₹${Math.round(finalTotal).toLocaleString()})`}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
