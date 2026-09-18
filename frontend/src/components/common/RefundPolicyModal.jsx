import React from 'react';
import { useStore } from '../../context/StoreContext';

const RefundPolicyModal = () => {
  const { refundPolicyModalOpen, setRefundPolicyModalOpen } = useStore();

  if (!refundPolicyModalOpen) return null;

  return (
    <div
      className="custom-modal-overlay active"
      id="refundPolicyModal"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, padding: '20px' }}
      onClick={() => setRefundPolicyModalOpen(false)}
    >
      <div
        className="custom-modal-card"
        style={{ position: 'relative', width: '100%', maxWidth: '620px', background: '#fff', borderRadius: '16px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="custom-modal-close"
          id="closeRefundPolicyBtn"
          aria-label="Close Policy Modal"
          onClick={() => setRefundPolicyModalOpen(false)}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
        >
          &times;
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255, 91, 127, 0.12)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <h3 style={{ color: 'var(--color-navy)', margin: 0, fontSize: '1.3rem' }}>
              Return, Refund & Damage Policy
            </h3>
            <p style={{ color: 'var(--color-navy-light)', fontSize: '0.85rem', margin: 0 }}>
              Transparent, fair terms for our parents and families
            </p>
          </div>
        </div>

        <div className="policy-pillars-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
          <div className="policy-pillar-card" style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div className="pillar-icon" style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginBottom: '6px' }}><i className="fa-solid fa-calendar-check"></i></div>
            <h5 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#1A253C' }}>7-Day Return Window</h5>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>You have 7 days from delivery date to report transit damage or initiate a return.</p>
          </div>
          <div className="policy-pillar-card" style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div className="pillar-icon" style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginBottom: '6px' }}><i className="fa-solid fa-video"></i></div>
            <h5 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#1A253C' }}>Mandatory Unboxing Video</h5>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>Continuous video showing sealed package opening is required for damage or missing claims.</p>
          </div>
          <div className="policy-pillar-card" style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div className="pillar-icon" style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginBottom: '6px' }}><i className="fa-solid fa-bolt-lightning"></i></div>
            <h5 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#1A253C' }}>24h Fast Inspection</h5>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>Our claims team reviews uploaded video evidence within 24 business hours.</p>
          </div>
          <div className="policy-pillar-card" style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div className="pillar-icon" style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginBottom: '6px' }}><i className="fa-solid fa-hand-holding-dollar"></i></div>
            <h5 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#1A253C' }}>100% Full Refund</h5>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>Refunds are credited directly to your bank account, UPI, or original card within 3-5 days.</p>
          </div>
        </div>

        <div className="policy-guidelines-box" style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.92rem', color: '#9f1239', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fa-solid fa-circle-info"></i> How to Record a Valid Unboxing Video:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.82rem', color: '#881337', lineHeight: 1.6 }}>
            <li><strong>Start before opening:</strong> Record all 4 sides of the shipping box showing it is sealed and untampered.</li>
            <li><strong>Shipping label clear:</strong> Point the camera at the label so your Name and Order ID are clearly readable.</li>
            <li><strong>Continuous recording:</strong> Cut open the tape and unbox the products in one uninterrupted video.</li>
            <li><strong>Show the issue:</strong> If an item is damaged, zoom in on the defect while recording.</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            className="btn btn-primary"
            id="policyAcknowledgeBtn"
            onClick={() => setRefundPolicyModalOpen(false)}
            style={{ padding: '10px 28px', borderRadius: '8px', background: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyModal;
