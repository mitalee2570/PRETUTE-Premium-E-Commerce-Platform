import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import api from '../../services/api';

const CustomerOrdersModal = () => {
  const { ordersModalOpen, setOrdersModalOpen, customer } = useStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const allOrders = await api.getOrders();
      if (customer) {
        const myOrders = allOrders.filter(o =>
          (o.customerEmail && o.customerEmail.toLowerCase() === customer.email.toLowerCase()) ||
          (o.customerPhone && o.customerPhone === customer.phone)
        );
        setOrders(myOrders.length > 0 ? myOrders : allOrders.slice(0, 3));
      } else {
        setOrders(allOrders);
      }
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ordersModalOpen) {
      loadOrders();
    }
  }, [ordersModalOpen]);

  if (!ordersModalOpen) return null;

  return (
    <div
      className="custom-modal-overlay active"
      id="customerOrdersModal"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, padding: '20px' }}
      onClick={() => setOrdersModalOpen(false)}
    >
      <div
        className="custom-modal-card"
        style={{ position: 'relative', width: '100%', maxWidth: selectedInvoice ? '650px' : '680px', background: '#fff', borderRadius: '16px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="custom-modal-close"
          id="closeCustomerOrdersBtn"
          aria-label="Close Orders Modal"
          onClick={() => {
            if (selectedInvoice) setSelectedInvoice(null);
            else setOrdersModalOpen(false);
          }}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
        >
          &times;
        </button>

        {selectedInvoice ? (
          /* Invoice View */
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '14px', marginBottom: '18px' }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '1.4rem' }}>PRETUTE</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>TAX INVOICE / RECEIPT</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: '0.95rem' }}>{selectedInvoice.id}</strong>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{new Date(selectedInvoice.date).toLocaleDateString()}</div>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', marginBottom: '16px', color: '#475569' }}>
              <div><strong>Billed To:</strong> {selectedInvoice.customerName}</div>
              <div><strong>Address:</strong> {selectedInvoice.address}</div>
              <div><strong>Payment Mode:</strong> {selectedInvoice.paymentMethod}</div>
              <div><strong>Status:</strong> <span style={{ color: selectedInvoice.status === 'Delivered' ? '#10B981' : '#f59e0b', fontWeight: 600 }}>{selectedInvoice.status}</span></div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '18px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Item</th>
                  <th style={{ textAlign: 'center', padding: '8px' }}>Qty</th>
                  <th style={{ textAlign: 'right', padding: '8px' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice.items?.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px' }}>{item.title}</td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>₹{(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '10px', textAlign: 'right', fontSize: '0.9rem' }}>
              <div>Subtotal: ₹{selectedInvoice.subtotal?.toLocaleString()}</div>
              {selectedInvoice.discount > 0 && <div style={{ color: '#10B981' }}>Discount: -₹{selectedInvoice.discount?.toLocaleString()}</div>}
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '6px', color: '#1A253C' }}>
                Total: ₹{Math.round(selectedInvoice.total).toLocaleString()}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedInvoice(null)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', cursor: 'pointer' }}
              >
                Back to Orders
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => window.print()}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-print"></i> Print Invoice
              </button>
            </div>
          </div>
        ) : (
          /* Orders List View */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#fff1f2', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                <i className="fa-solid fa-box-open"></i>
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#1A253C' }}>My Orders</h2>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>Track packages and review your past orders</p>
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '30px' }}>Loading orders...</div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: '#64748b' }}>
                <i className="fa-solid fa-receipt" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '12px' }}></i>
                <h4 style={{ color: '#1A253C', margin: '0 0 6px 0' }}>No Orders Placed Yet</h4>
                <p style={{ fontSize: '0.85rem' }}>Your placed orders will appear here automatically.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#f8fafc' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div>
                        <strong style={{ color: '#1A253C', fontSize: '0.95rem' }}>{order.id}</strong>
                        <span style={{ fontSize: '0.78rem', color: '#64748b', marginLeft: '10px' }}>
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          background: order.status === 'Delivered' ? '#ECFDF5' : order.status === 'Shipped' ? '#EFF6FF' : '#FEF3C7',
                          color: order.status === 'Delivered' ? '#047857' : order.status === 'Shipped' ? '#1D4ED8' : '#B45309'
                        }}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '10px' }}>
                      {order.items?.map((it, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>{it.title} × {it.quantity}</span>
                          <span>₹{(it.price * it.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1A253C' }}>
                        Total: ₹{Math.round(order.total).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setSelectedInvoice(order)}
                        style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        <i className="fa-solid fa-file-invoice"></i> Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrdersModal;
