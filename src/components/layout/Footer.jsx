import { site } from "../../content.js";
import { IconFacebook, IconInstagram, IconWhatsApp } from "../../icons.jsx";

export default function Footer() {
  return (
    <>
      <footer className="footer site-footer">
        <div className="wrap footer-grid">
          <div className="footer-column footer-about">
            <a className="brand" href="#home">
              <img src="/images/logo-white.png" alt="Wipe & Wash" />
            </a>
            <p className="footer-tagline">Solar Lagaooo... Lekin Saaf Bhi Tou Rakhooo...</p>
            <p>Professional Solar Panel Cleaning Services For Homes, Businesses And Factories.</p>
            <p className="footer-muted">© {new Date().getFullYear()} Wipe &amp; Wash. Solar Panel Cleaning Services.</p>
          </div>
          <div className="footer-center">
          <div className="footer-column footer-quick-links">
            <h3><br/>Quick Links</h3>
            <nav className="footer-links" aria-label="Footer">
              <a href="#process">Our Process</a>
              <a href="#results">Our Results</a>
              <a href="#reviews">Our Reviews</a>
              <a href={site.facebook} target="_blank" rel="noreferrer">Facebook</a>
              <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
              <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp</a>
              <a className="footer-quote" href="https://wa.me/923202112387" target="_blank" rel="noreferrer">
                Get a Quote
              </a>
            </nav>
          </div>
          </div>
          <div className="footer-column footer-contact">
            <h3><br/>Contact</h3>
            <p>Serving Homes, Businesses And Factories Across Karachi.</p>
            <p>
              <a className="footer-phone" href={`tel:${site.phoneTel}`}>
                {site.phoneDisplay}
              </a>
            </p>
            <a
              className="footer-whatsapp"
              href={`https://wa.me/${site.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </footer>
      <nav className="social-float" aria-label="Social media links">
        <a className="social-float-facebook" href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
          <IconFacebook />
        </a>
        <a className="social-float-instagram" href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
          <IconInstagram />
        </a>
        <a
          className="social-float-whatsapp"
          href={`https://wa.me/${site.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
        >
          <IconWhatsApp />
        </a>
      </nav>
    </>
  );
}
