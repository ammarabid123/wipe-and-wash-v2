import { useState } from "react";
import { capacities, faqs, openWhatsApp, panelRanges, submitNetlify } from "../../content.js";
import { IconCalc, IconPanels, IconPin, IconWhatsApp } from "../../icons.jsx";

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [capacityType, setCapacityType] = useState("panels"); // "panels" | "kw"
  const [capacity, setCapacity] = useState("");
  const isPanels = capacityType === "panels";
  const options = isPanels ? panelRanges : capacities;

  function chooseType(type) {
    setCapacityType(type);
    setCapacity(""); // ranges differ, so clear the old selection
  }

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    delete data.capacityType;
    if (data.capacity && isPanels) data.capacity = `${data.capacity} panels`;

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
        <select name="capacity" value={capacity} onChange={(event) => setCapacity(event.target.value)}>
          <option value="">{isPanels ? "Select number of panels" : "Select kW range"}</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
      <label className="field">Area in Karachi *<input name="location" required placeholder="Your area" /></label>
      <button className="btn yellow" type="submit"><IconWhatsApp /> Get My Quote on WhatsApp →</button>
      {submitted ? <p className="form-ok">Quote request sent on WhatsApp.</p> : null}
    </form>
  );
}

export default function ContactSection() {
  return (
    <section className="wrap bottom">
      <div className="faq" id="faq">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq) => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}
      </div>
      <div className="final" id="industrial">
        <div className="final-copy">
          <h2>Ready to <em>Get Your<br />Solar Panels Cleaned?</em></h2>
          <p>Get a free quote today and keep your solar system performing at its best.</p>
          <div className="proof"><span><IconPanels /> 18,000+ Panels Cleaned</span><span><IconPin /> All Over Karachi</span></div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
