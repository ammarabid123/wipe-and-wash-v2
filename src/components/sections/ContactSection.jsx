import { useState } from "react";
import { faqs, openWhatsApp, submitNetlify } from "../../content.js";
import { IconCalc, IconPanels, IconPin, IconWhatsApp } from "../../icons.jsx";

// Allowed values for the capacity box (change here if the limits ever change)
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
  mainEntity: [...faqs ].map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a.replace(/\n\n/g, " ") },
  })),
};

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [capacityType, setCapacityType] = useState("panels"); // "panels" | "kw"
  const [capacity, setCapacity] = useState("");
  const isPanels = capacityType === "panels";
  const limit = isPanels ? LIMITS.panels : LIMITS.kw;

  function chooseType(type) {
    setCapacityType(type);
    setCapacity(""); // limits differ, so clear the old number
  }

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    delete data.capacityType;
    if (data.capacity) data.capacity = `${data.capacity} ${isPanels ? "panels" : "kW"}`;

    try {
      await submitNetlify("quote", data);
    } catch (error) {
      console.error("Netlify quote submission failed:", error);
    }

    const labels = [
      ["name", "Name"],
      ["phone", "WhatsApp"],
      ["capacity", "Solar capacity"],
      ["location", "Area"],
    ];
    const lines = labels.filter(([key]) => data[key]).map(([key, label]) => `${label}: ${data[key]}`);
    openWhatsApp(`Assalam-o-Alaikum Wipe & Wash.\nFree cleaning quotation request\n${lines.join("\n")}\nPlease contact me to confirm.`);
    setSubmitted(true);
    form.reset();
    setCapacityType("panels");
    setCapacity("");
  }

  return (
    <form className="final-form" name="quote" method="POST" data-netlify="true" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value="quote" />
      <h3><IconCalc /> Get a Free Cleaning Quote</h3>
      <label className="field">Full Name *<input name="name" required placeholder="Your name" /></label>
      <label className="field">WhatsApp Number *<input name="phone" required type="tel" placeholder="03XX XXXXXXX" /></label>

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
      <label className="field">Area In Karachi *<input name="location" required placeholder="Your area" /></label>
      <button className="btn yellow" type="submit"><IconWhatsApp /> Get My Quote on WhatsApp →</button>
      {submitted ? <p className="form-ok">Quote Request Sent On WhatsApp.</p> : null}
    </form>
  );
}

export default function ContactSection() {
  // Shuffled once per page load: the new FAQs in random order, then the older ones in their fixed order
  const [faqList] = useState(() => [...shuffled(faqs) ]);

  return (
    <section className="wrap bottom">
      <div className="faq" id="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-scroll-container">
          {faqList.map((faq) => (
                <details key={faq.q}>
                <summary>{faq.q}</summary>
            {faq.a.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                 </details>
               ))}
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </div>        
      </div>
      <div className="final" id="clean-quote">
        <div className="final-copy">
          <h2>Ready to <em>Get Your<br />Solar Panels Cleaned?</em></h2>
          <p>Get A Free Quote Today And Keep Your Solar System Performing At Its Best.</p>
          <div className="proof"><span><IconPanels /> 1 Million+ Panels Cleaned</span><span><IconPin /> All Over Karachi</span></div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}