import { IconCalc, IconMenu, IconWhatsApp } from "../../icons.jsx";

const links = [
  ["#home", "Home"],
  ["#try-it", "Try It Yourself"],
  ["#process", "Our Process"],
 // ["#calculator", "Calculate Loss"],
  ["#why-choose", "Why Choose Us"],
  ["#reviews", "Reviews"],
  ["#faq", "FAQ"],
  ["#clean-quote", "Contact"],
];

function Brand() {
  return (
    <a className="brand" href="#home">
      <img src="/images/logo.png" alt="Wipe & Wash" />
    </a>
  );
}

export default function Header({ open, setOpen }) {
  return (
    <header className="topbar">
      <div className="wrap nav">
        <Brand />
        <nav className="navlinks">
          {links.map(([href, label], index) => (
            <a key={href} href={href} className={index === 0 ? "active" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="navactions">
          <a className="btn yellow navbtn" href="#calculator">
            <IconCalc /> Calculate Loss
          </a>
          <a className="green" href="https://wa.me/923202112387" target="_blank" rel="noopener noreferrer">
            <IconWhatsApp /> Chat on WhatsApp
          </a>
        </div>
        <button
          className="hamb"
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
        >
          <IconMenu />
        </button>
      </div>
      <nav className={open ? "mobile-menu open" : "mobile-menu"}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="#calculator" onClick={() => setOpen(false)}>
          Calculate Cost
        </a>
      </nav>
    </header>
  );
}
