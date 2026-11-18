import { steps } from "../../content.js";

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="wrap process-layout">
        <div className="section-title">
          <h2>Our Cleaning<br />Process</h2>
          <p>A professional, safe and panel-friendly 4-step process.</p>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <article className="step" key={step.n}>
              <img src={step.img} alt={step.alt} />
              <span className="num">{step.n}</span>
              <div className="step-copy"><b>{step.title}</b><p>{step.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
