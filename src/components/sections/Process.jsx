import { steps } from "../../content.js";

// Scrolls the hero demo into view, then asks it to play the chosen step (see panelWasher.js)
function watchStep(index) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stage = document.querySelector(".hw-stage") || document.getElementById("home");
  stage?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  window.setTimeout(
    () => window.dispatchEvent(new CustomEvent("ww-run-step", { detail: index })),
    reduce ? 0 : 550,
  );
}

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="wrap process-layout">
        <div className="section-title">
          <h2>Our Cleaning<br />Process</h2>
          <p>A professional, safe and panel-friendly 4-step process.</p>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <article className="step" key={step.n}>
              <img src={step.img} alt={step.alt} />
              <span className="num">{step.n}</span>
              <div className="step-copy">
                <b>{step.title}</b>
                <p>{step.text}</p>
                <button
                  type="button"
                  className="step-watch"
                  onClick={() => watchStep(index)}
                  aria-label={`Watch step ${index + 1}, ${step.title}, in the cleaning demo at the top of the page`}
                >
                  ▶ Watch this step
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}