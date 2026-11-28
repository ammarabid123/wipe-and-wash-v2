import { useLayoutEffect, useRef, useState } from "react";
import { faqs, openWhatsApp, site, submitQuote } from "../../content.js";
import { IconCalc, IconPanels, IconPin, IconWhatsApp } from "../../icons.jsx";

// Allowed values for the capacity box (change here if the limits ever change)
// Pakistani mobile numbers: 03XX XXXXXXX, 923XX XXXXXXX or +923XX XXXXXXX (spaces and dashes are allowed)
const PK_MOBILE = /^(?:92|0)?3\d{9}$/;
const phoneDigits = (value) => value.replace(/\D/g, "").replace(/^00/, "");

const LIMITS = { panels: { min: 1, max: 5000 }, kw: { min: 1, max: 3000 } };

// Fisher-Yates shuffle (returns a new array)
function shuffled(list) {
  const items = [...list];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

// FAQPage structured data for search engines (always in the original order, so it never changes between visits)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a.replace(/\n\n/g, " ") },
  })),
};

// How many questions are visible before the list scrolls
const VISIBLE_FAQS = 5;

/*
  FAQ list that shows VISIBLE_FAQS questions and scrolls inside its own box for the rest.
  - Every answer stays in the page HTML, so search engines still read all of them.
  - The box height is measured from the real rows (closed), so it fits any font size or screen width.
  - It is a keyboard-focusable scroll region (arrow keys work).
*/
function FaqList({ items }) {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = () => [...box.querySelectorAll(":scope > details")];
    const updateEnd = () => box.classList.toggle("at-end", box.scrollTop + box.clientHeight >= box.scrollHeight - 4);

    function measure() {
      const list = rows();
      if (list.some((row) => row.open)) return; // measure only while every question is closed
      if (list.length <= VISIBLE_FAQS) {
        box.style.setProperty("--faq-h", "none");
        box.classList.remove("has-more");
        return;
      }
      const last = list[VISIBLE_FAQS - 1];
      box.style.setProperty("--faq-h", `${last.offsetTop + last.offsetHeight - list[0].offsetTop}px`);
      box.classList.add("has-more");
      updateEnd();
    }

    // "toggle" does not bubble, so it is caught in the capture phase
    function onToggle(event) {
      const row = event.target;
      if (row.tagName !== "DETAILS") return;
      if (row.open) {
        box.scrollTo({ top: row.offsetTop - rows()[0].offsetTop, behavior: reduce ? "auto" : "smooth" });
      } else {
        measure();
      }
    }

    measure();
    box.addEventListener("toggle", onToggle, true);
    box.addEventListener("scroll", updateEnd, { passive: true });
    const observer = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    rows().forEach((row) => observer?.observe(row));
    document.fonts?.ready.then(measure);

    return () => {
      box.removeEventListener("toggle", onToggle, true);
      box.removeEventListener("scroll", updateEnd);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="faq-scroll" ref={boxRef} tabIndex={0} role="region" aria-label="Frequently asked questions">
      {items.map((faq) => (
        <details key={faq.q}>
          <summary>{faq.q}</summary>
          {faq.a.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </details>
      ))}
    </div>
  );
}

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const phoneRef = useRef(null);
  const [capacityType, setCapacityType] = useState("panels"); // "panels" | "kw"
  const [capacity, setCapacity] = useState("");
  const isPanels = capacityType === "panels";
  const limit = isPanels ? LIMITS.panels : LIMITS.kw;

  function chooseType(type) {
    setCapacityType(type);
    setCapacity(""); // limits differ, so clear the old number
  }

  function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    delete data.capacityType;
    if (data.website) return; // hidden spam-trap field: only bots fill it in

    if (!PK_MOBILE.test(phoneDigits(data.phone || ""))) {
      setPhoneError("Please enter a valid mobile number, for example 0320 1234567.");
      phoneRef.current?.focus();
      return;
    }
    setPhoneError("");
    if (data.capacity) data.capacity = `${data.capacity} ${isPanels ? "panels" : "kW"}`;

    const labels = [
      ["name", "Name"],
      ["phone", "WhatsApp"],
      ["capacity", "Solar capacity"],
      ["location", "Area"],
    ];
    const lines = labels.filter(([key]) => data[key]).map(([key, label]) => `${label}: ${data[key]}`);

    // 1) Open WhatsApp first, straight from the click (phone browsers block it after an "await")
    openWhatsApp(`Assalam-o-Alaikum Wipe & Wash.\nFree cleaning quotation request\n${lines.join("\n")}\nPlease contact me to confirm.`);
    // 2) Then send a backup copy to the business email in the background
    submitQuote({ ...data, website: "" });

    setSubmitted(true);
    form.reset();
    setCapacityType("panels");
    setCapacity("");
  }

  return (
    <form className="final-form" onSubmit={onSubmit}>
      <h3><IconCalc /> Get a Free Cleaning Quote</h3>
      <label className="field">Full Name *<input name="name" required placeholder="Your name" /></label>
      <label className="field">WhatsApp Number *
        <input
          ref={phoneRef}
          name="phone"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="03XX XXXXXXX"
          aria-invalid={phoneError ? "true" : "false"}
          aria-describedby={phoneError ? "phone-error" : undefined}
          onChange={() => phoneError && setPhoneError("")}
        />
        {phoneError ? <small id="phone-error" className="field-error" role="alert">{phoneError}</small> : null}
      </label>
      <div className="hp-field" aria-hidden="true">
        <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <fieldset className="cap-type">
        <legend>Solar Capacity (choose one)</legend>
        <div className="radio-row">
          <label className="radio">
            <input type="radio" name="capacityType" value="panels" checked={isPanels} onChange={() => chooseType("panels")} />
            <span>No. of Solar Panels</span>
          </label>
          <label className="radio">
            <input type="radio" name="capacityType" value="kw" checked={!isPanels} onChange={() => chooseType("kw")} />
            <span>No. of kW</span>
          </label>
        </div>
      </fieldset>

      <label className="field">{isPanels ? "Number of Solar Panels" : "System Size (kW)"}
        <span className="unit-input">
          <input
            name="capacity"
            type="number"
            inputMode={isPanels ? "numeric" : "decimal"}
            min={limit.min}
            max={limit.max}
            step={isPanels ? 1 : "any"}
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
            placeholder={isPanels ? "e.g. 24" : "e.g. 10"}
            aria-describedby="capacity-hint"
          />
          <span className="unit" aria-hidden="true">{isPanels ? "panels" : "kW"}</span>
        </span>
        <small id="capacity-hint" className="field-hint">Enter a number from {limit.min} to {limit.max.toLocaleString("en-US")}</small>
      </label>
      <label className="field">Area in Karachi *<input name="location" required placeholder="Your area" /></label>
      <button className="btn yellow" type="submit"><IconWhatsApp /> Get My Quote on WhatsApp →</button>
      <small className="field-hint form-note">We use your details only to reply to your quote request.</small>
      {submitted ? (
        <p className="form-ok" role="status">
          Thank you! WhatsApp opened with your request. If it did not open, please call {site.phoneDisplay}.
        </p>
      ) : null}
    </form>
  );
}

export default function ContactSection() {
  // Shuffled once per page load
  const [faqList] = useState(() => shuffled(faqs));

  return (
    <section className="wrap bottom">
      <div className="faq" id="faq">
        <h2>Frequently Asked Questions</h2>
        <FaqList items={faqList} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </div>
      <div className="final" id="clean-quote">
        <div className="final-copy">
          <h2>Ready to <em>Get Your<br />Solar Panels Cleaned?</em></h2>
          <p>Get a free quote today and keep your solar system performing at its best.</p>
          <div className="proof"><span><IconPanels /> 1 Million+ Panels Cleaned</span><span><IconPin /> All Over Karachi</span></div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}