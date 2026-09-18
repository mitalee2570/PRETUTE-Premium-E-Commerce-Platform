import React from 'react';
import { useStore } from '../../context/StoreContext';

const ToastContainer = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '360px',
        width: '100%'
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            style={{
              background: '#fff',
              borderLeft: `4px solid ${isSuccess ? '#10B981' : isError ? '#ef4444' : 'var(--color-primary)'}`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            <div style={{ fontSize: '1.2rem', color: isSuccess ? '#10B981' : isError ? '#ef4444' : 'var(--color-primary)' }}>
              {isSuccess ? <i className="fa-solid fa-circle-check"></i> : isError ? <i className="fa-solid fa-circle-exclamation"></i> : <i className="fa-solid fa-circle-info"></i>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1A253C' }}>{toast.title}</div>
              {toast.message && <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>{toast.message}</div>}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
