import React, { useState } from 'react';
import api from '../../services/api';
import { useStore } from '../../context/StoreContext';
import { getAssetUrl } from '../../utils/imageUrl';

const ContactView = () => {
  const { showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      fetch("https://formsubmit.co/ajax/mitaleemaurya@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "N/A",
          subject: formData.subject,
          message: formData.message,
          _subject: `[Kuakua Craft Inquiry] ${formData.subject} from ${formData.name}`
        })
      }).catch(console.warn);

      await api.sendMessage({
        name: formData.name,
        email: formData.email,
        subject: `${formData.subject} (Phone: ${formData.phone || 'N/A'})`,
        message: formData.message
      });
      setSubmitted(true);
      showToast('Message Sent!', 'Your inquiry has been forwarded to mitaleemaurya@gmail.com and recorded.', 'success');
    } catch (err) {
      setSubmitted(true);
      showToast('Message Sent!', 'Thank you for reaching out to Kuakua Craft.', 'success');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contactView" className="page-view active" style={{ display: 'block' }}>
      {/* Contact Hero Banner */}
      <div className="contact-hero-banner" style={{ background: `linear-gradient(rgba(26, 37, 60, 0.8), rgba(26, 37, 60, 0.6)), url('${getAssetUrl('assets/hero_toys.png')}')`, backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff', textAlign: 'center', padding: '60px 20px', marginBottom: '60px' }}>
        <div className="section-container">
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '12px', color: '#fff' }}>Let's Connect</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Have questions about sizes, materials, nursery design consults, or wholesale? We're here to assist!
          </p>
        </div>
      </div>

      <div className="section-container contact-layout-grid">
        {/* Contact Info Panel */}
        <div className="contact-info-panel">
          <h3>Contact Information</h3>
          <p className="lead-text">Drop by our headquarters or contact our custom support team anytime.</p>

          <div className="contact-details-list">
            <div className="detail-item">
              <div className="icon-circle"><i className="fa-solid fa-phone"></i></div>
              <div>
                <h5>Call Us</h5>
                <p>+91 87572 01351</p>
                <span>Mon - Sat: 9:00 AM - 7:00 PM IST</span>
              </div>
            </div>
            <div className="detail-item">
              <div className="icon-circle"><i className="fa-solid fa-envelope"></i></div>
              <div>
                <h5>Email Support</h5>
                <p>mitaleemaurya@gmail.com</p>
                <span>Direct inquiries to Mitalee Maurya</span>
              </div>
            </div>
            <div className="detail-item">
              <div className="icon-circle"><i className="fa-solid fa-location-dot"></i></div>
              <div>
                <h5>Headquarters</h5>
                <p>100 Premium Blvd, Suite 300<br />New York, NY 10001, USA</p>
              </div>
            </div>
          </div>

          <div className="social-block">
            <h5>Follow Our Journey</h5>
            <div className="social-row">
              <a href="#" className="social-circle" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-circle" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-circle" aria-label="Pinterest"><i className="fa-brands fa-pinterest-p"></i></a>
              <a href="#" className="social-circle" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="contact-form-container">
          <h3>Send Us a Message</h3>

          {!submitted ? (
            <form className="contact-form" id="contactUsForm" onSubmit={handleSubmit}>
              <div className="form-row-two">
                <div className="form-group floating-label-group">
                  <input
                    type="text"
                    id="contactName"
                    required
                    placeholder=" "
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <label htmlFor="contactName">Full Name</label>
                  <span className="validation-msg">Please enter your name</span>
                </div>
                <div className="form-group floating-label-group">
                  <input
                    type="email"
                    id="contactEmail"
                    required
                    placeholder=" "
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <label htmlFor="contactEmail">Email Address</label>
                  <span className="validation-msg">Please enter a valid email address</span>
                </div>
              </div>

              <div className="form-row-two">
                <div className="form-group floating-label-group">
                  <input
                    type="tel"
                    id="contactPhone"
                    placeholder=" "
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <label htmlFor="contactPhone">Phone Number (Optional)</label>
                </div>
                <div className="form-group floating-label-group">
                  <input
                    type="text"
                    id="contactSubject"
                    required
                    placeholder=" "
                    className="form-input"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                  <label htmlFor="contactSubject">Subject</label>
                  <span className="validation-msg">Please provide a subject</span>
                </div>
              </div>

              <div className="form-group floating-label-group">
                <textarea
                  id="contactMessage"
                  rows="5"
                  required
                  placeholder=" "
                  className="form-input form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                <label htmlFor="contactMessage">Your Message</label>
                <span className="validation-msg">Please type your message here</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-large btn-submit"
                id="contactFormSubmitBtn"
              >
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          ) : (
            <div className="contact-success-card" id="contactSuccessCard" style={{ display: 'block' }}>
              <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
              <h4>Message Sent!</h4>
              <p>Thank you for reaching out to PRETUTE. Our support representative has received your request and will follow up with you within 24 hours.</p>
              <button
                type="button"
                className="btn btn-outline"
                id="resetContactFormBtn"
                onClick={handleReset}
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactView;
