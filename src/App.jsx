import { useMemo, useState } from "react";
import Footer from "./Footer.jsx";
import SolarLossCalculator from "./components/Calculator/Calculator.jsx";
import {
  areas,
  capacities,
  faqs,
  openWhatsApp,
  results,
  reviews,
  site,
  steps,
  submitNetlify,
} from "./content.js";
import {
  IconArrow,
  IconBadge,
  IconBolt,
  IconBrush,
  IconCalc,
  IconCalendar,
  IconDrop,
  IconFactory,
  IconHome,
  IconMenu,
  IconPanels,
  IconPeople,
  IconPin,
  IconShield,
  IconSpark,
  IconWhatsApp,
} from "./icons.jsx";

const links = [
  ["#home", "Home"],
  ["#residential", "Residential"],
  ["#industrial", "Industrial"],
  ["#process", "Our Process"],
  ["#results", "Results"],
  ["#reviews", "Reviews"],
  ["#faq", "FAQ"],
];

function Brand() {
  return (
    <a className="brand" href="#home">
      <img src="/images/logo.png" alt="Wipe & Wash" />
    </a>
  );
}

function Header({ open, setOpen }) {
  return (
    <header className="topbar">
      <div className="wrap nav">
        <Brand />
        <nav className="navlinks">
          {links.map(([href, label], i) => (
            <a key={href} href={href} className={i === 0 ? "active" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="navactions">
          <a className="btn yellow navbtn" href="#calculator">
            <IconCalc /> Calculate Cost
          </a>
          <a className="green" href="#calculator">
            <IconWhatsApp /> Chat on WhatsApp
          </a>
        </div>
        <button className="hamb" type="button" aria-label="Open menu" onClick={() => setOpen((v) => !v)}>
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

function Hero() {
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
              <span>
                Up to 35%*
                <br />
                Higher Efficiency
              </span>
            </span>
            <span className="pill">
              <IconShield />
              <span>
                No Scratch
                <br />
                Cleaning
              </span>
            </span>
            <span className="pill">
              <IconDrop />
              <span>
                Residue Free
                <br />
                Results
              </span>
            </span>
            <span className="pill">
              <IconBadge />
              <span>
                Sindh Police
                <br />
                Verified Staff
              </span>
            </span>
          </div>
          <div className="hero-actions">
            <a className="btn yellow" href="#calculator">
              <IconCalc /> Calculate My Cleaning Cost
            </a>
            <a className="btn outline" href="#calculator">
              <IconWhatsApp /> Book on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="wrap stats">
      <div className="stat">
        <span className="ico">
          <IconPanels />
        </span>
        <div>
          <b>18,000+</b>
          <span>
            Solar Panels Cleaned
            <br />
            in Karachi
          </span>
        </div>
      </div>
      <div className="stat">
        <span className="ico">
          <IconPeople />
        </span>
        <div>
          <b>1,000+</b>
          <span>
            Satisfied Residential
            <br />
            Clients
          </span>
        </div>
      </div>
      <div className="stat">
        <span className="ico">
          <IconFactory />
        </span>
        <div>
          <b>Industrial</b>
          <span>
            Cleaning Services
            <br />
            (Factories, Warehouses, Plants)
          </span>
        </div>
      </div>
      <div className="stat">
        <span className="ico">
          <IconShield />
        </span>
        <div>
          <b>Company Backing</b>
          <span>
            In Case of Any Loss
          </span>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process" id="process">
      <div className="wrap process-layout">
        <div className="section-title">
          <h2>
            Our Cleaning
            <br />
            Process
          </h2>
          <p>A professional, safe and panel-friendly 4-step process.</p>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <article className="step" key={s.n}>
              <img src={s.img} alt={s.alt} />
              <span className="num">{s.n}</span>
              <div className="step-copy">
                <b>{s.title}</b>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  const [i, setI] = useState(0);
  const visible = useMemo(() => {
    return [0, 1, 2].map((offset) => results[(i + offset) % results.length]);
  }, [i]);

  return (
    <section className="section" id="results">
      <div className="wrap">
        <div className="center">
          <h2>
            The Difference Is Visible. <em>The Results Matter.</em>
          </h2>
          <p>Real cleaning results from our Karachi projects.</p>
        </div>
        <div className="results-wrap">
          <button className="results-nav prev" type="button" aria-label="Previous" onClick={() => setI((n) => (n + results.length - 1) % results.length)}>
            <IconArrow dir="left" />
          </button>
          <div className="results-grid">
            {visible.map((r) => (
              <article className="result" key={r.title}>
                <div className="compare">
                  <img className="before" src={r.before} alt={`${r.title} before cleaning`} />
                  <img src={r.after} alt={`${r.title} after cleaning`} />
                  <label>Before</label>
                  <label>After</label>
                </div>
                <div className="result-meta">
                  <b>
                    {r.icon === "home" ? <IconHome /> : <IconFactory />} {r.title}
                  </b>
                  <span>{r.meta}</span>
                </div>
              </article>
            ))}
          </div>
          <button className="results-nav next" type="button" aria-label="Next" onClick={() => setI((n) => (n + 1) % results.length)}>
            <IconArrow />
          </button>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  const [ok, setOk] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await submitNetlify("quote", data);
    } catch {
      /* WhatsApp is the live channel */
    }
    const lines = Object.entries(data)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`);
    openWhatsApp(`Assalam-o-Alaikum Wipe & Wash.\nFree cleaning quotation request\n${lines.join("\n")}\nPlease contact me to confirm.`);
    setOk("Quote request sent on WhatsApp.");
    form.reset();
  }

  return (
    <form className="final-form" name="quote" method="POST" data-netlify="true" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value="quote" />
      <h3>
        <IconCalc /> Get a Free Cleaning Quote
      </h3>
      <label className="field">
        Full Name *
        <input name="name" required placeholder="Your name" />
      </label>
      <label className="field">
        WhatsApp Number *
        <input name="phone" required type="tel" placeholder="03XX XXXXXXX" />
      </label>
      <label className="field">
        Solar Capacity (kW)
        <select name="capacity">
          <option value="">Select capacity</option>
          {capacities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="field">
        Area in Karachi *
        <input name="location" required placeholder="Your area" />
      </label>
      <button className="btn yellow" type="submit">
        <IconWhatsApp /> Get My Quote on WhatsApp →
      </button>
      {ok ? <p className="form-ok">{ok}</p> : null}
    </form>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header open={open} setOpen={setOpen} />
      <main id="main">
        <Hero />
        <Stats />
        <Process />
        <section className="conversion" id="calculator">
          <div className="wrap calculator-layout">
            <SolarLossCalculator quoteHref="#contact" />
          </div>
        </section>
        <section className="wrap impact">
          <h2>
            Dust Doesn't Just Sit
            <br />
            on Your Solar Panels.
            <br />
            <em>It Can Cost You.</em>
          </h2>
          <div className="impact-item">
            <b>
              <IconFactory /> UPTO 35%
            </b>
            <span>
              Lower Efficiency
              <br />
              Due to Dust
            </span>
          </div>
          <div className="impact-item">
            <b>
              <IconBolt /> UPTO 80%
            </b>
            <span>
              Reduction in Electricity Bills
              <br />
              (Our Client's Claim)
            </span>
          </div>
          <div className="impact-item">
            <b>
              <IconCalendar /> Regular Cleaning
            </b>
            <span>
              Keeps Your Panels
              <br />
              Working at Their Best
            </span>
          </div>
        </section>
        <Results />
        <section className="why" id="residential">
          <div className="wrap why-layout">
            <div className="why-title">
              Why Choose
              <br />
              Wipe & Wash?
            </div>
            <div className="why-item">
              <i>
                <IconDrop />
              </i>
              <b>Dedicated Solar Shampoo</b>
              <small>Non-acidic, Ammonia-free, pH Neutral</small>
            </div>
            <div className="why-item">
              <i>
                <IconBrush />
              </i>
              <b>No Scratch Cleaning</b>
              <small>Soft & Safe Method</small>
            </div>
            <div className="why-item">
              <i>
                <IconSpark />
              </i>
              <b>Residue Free Results</b>
              <small>Clean & Clear Panels</small>
            </div>
            <div className="why-item">
              <i>
                <IconBadge />
              </i>
              <b>Sindh Police Verified Staff</b>
              <small>Trusted & Screened Team</small>
            </div>
            <div className="why-item">
              <i>
                <IconShield />
              </i>
              <b>Company Backing</b>
              <small>In Case of Any Loss</small>
            </div>
            <img className="bottle" src="/images/shampoo.jpeg" alt="Wipe & Wash Solar Shampoo bottle" />
          </div>
        </section>
        <section className="reviews" id="reviews">
          <div className="wrap reviews-layout">
            <div className="section-title">
              <h2>
                What Our
                <br />
                Customers Say
              </h2>
              <p>Trusted by homeowners and businesses across Karachi.</p>
            </div>
            <div className="review-grid">
              {reviews.map((r) => (
                <article className="review" key={r.name}>
                  <div className="stars">★★★★★</div>
                  <p>“{r.quote}”</p>
                  <b>{r.name}</b>
                  <small>{r.meta}</small>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="wrap bottom">
          <div className="faq" id="faq">
            <h2>Frequently Asked Questions</h2>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <div className="final" id="industrial">
            <div className="final-copy">
              <h2>
                Ready to <em>Get Your
                <br />
                Solar Panels Cleaned?</em>
              </h2>
              <p>Get a free quote today and keep your solar system performing at its best.</p>
              <div className="proof">
                <span>
                  <IconPanels /> 18,000+ Panels Cleaned
                </span>
                <span>
                  <IconPin /> All Over Karachi
                </span>
              </div>
            </div>
            <Quote />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
