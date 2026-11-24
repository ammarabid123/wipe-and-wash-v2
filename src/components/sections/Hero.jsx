import {
  IconBadge,
  IconBolt,
  IconCalc,
  IconDrop,
  IconShield,
  IconWhatsApp,
} from "../../icons.jsx";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <video className="hero-video" autoPlay muted loop playsInline poster="/images/hero.jpg" aria-hidden="true">
        <source src="/videos/montage-mwm.mp4" type="video/mp4" />
      </video>
      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow">Karachi's Solar Panel Cleaning Specialists</span>
          <h1>
            Clean Panels,
            <br />
            Higher Performance,
            <br />
            <em>Lower Electricity Bills.</em>
          </h1>
          <p>Professional solar panel cleaning service for homes, businesses and industries across Karachi.</p>
          <div className="pills">
            <span className="pill">
              <IconBolt />
              <span>Up to 35%<br />Higher Efficiency</span>
            </span>
            <span className="pill">
              <IconShield />
              <span>No Scratch<br />Cleaning</span>
            </span>
            <span className="pill">
              <IconDrop />
              <span>Residue Free<br />Results</span>
            </span>
            <span className="pill">
              <IconBadge />
              <span>Sindh Police<br />Verified Staff</span>
            </span>
          </div>
          <div className="hero-actions">
            <a className="btn yellow" href="#calculator">
              <IconCalc /> Calculate My Energy Loss
            </a>
            <a className="btn outline" href="https://wa.me/923202112387" target="_blank" rel="noopener noreferrer">
              <IconWhatsApp /> Book on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}