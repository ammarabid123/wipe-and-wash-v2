import { useEffect, useRef } from "react";
import { site } from "../../content.js";
import { initPanelWasher } from "./panelWasher.js";
import "./HeroWasher.css";

/*
  Hero with the interactive "wash a solar panel" demo (replaces the old video hero).
  - The headline, intro text and buttons are plain HTML, so search engines can read them.
  - The canvas demo is started in useEffect by panelWasher.js and cleaned up on unmount.
  - To change the WhatsApp number edit site.whatsappNumber in content.js.
*/
const STEP_LABELS = ["Pressure wash", "Solar shampoo", "Gentle brush scrubbing", "Final pressure wash"];
const WA_TEXT = "Hi Wipe & Wash, I want to book a solar panel cleaning.";

export default function Hero() {
  const rootRef = useRef(null);
  useEffect(() => initPanelWasher(rootRef.current), []);
  const wa = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(WA_TEXT)}`;

  return (
    <section className="hw" id="home" ref={rootRef} aria-labelledby="hw-title">
      <div className="wrap hw-grid">
        <div className="hw-copy">
          <span className="eyebrow">Karachi's Solar Panel Cleaning Specialists</span>
          <h1 id="hw-title">Dusty panels make less power. Wash one and see.</h1>
          <p>
            Professional solar panel cleaning for homes, offices and factories across Karachi. Use the
            pressure washer, shampoo and brush on this panel, the same way our crew does on your roof.
          </p>
          <div className="hw-ctas">
            <a className="btn yellow" href={wa} target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
            <a className="btn outline" href="#industrial">Get a quote</a>
          </div>
        </div>

        <div className="hw-demo">
          <div className="hw-stage" data-hw="stage">
            <canvas data-hw="base" aria-hidden="true" />
            <canvas data-hw="dust" aria-hidden="true" />
            <canvas data-hw="grime" aria-hidden="true" />
            <canvas data-hw="foam" aria-hidden="true" />
            <div className="hw-glare" />
            <canvas
              className="hw-fx"
              data-hw="fx"
              aria-label="Solar panels covered in dust and bird droppings. Drag to clean them."
            />
            <p className="hw-hint" data-hw="hint">Drag to spray, or tap a step below</p>
            <div className="hw-hud" data-hw="hud"><i /><span>Very dirty</span></div>
          </div>

          <div className="hw-ctl">
            <div className="hw-tools" role="group" aria-label="The four cleaning steps">
              {STEP_LABELS.map((label, i) => (
                <button key={label} type="button" className="hw-tool" data-hw-step={i} aria-pressed="false">
                  <b>{i + 1}</b>
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div className="hw-mrow">
              <span>Clean</span>
              <div className="hw-meter" data-hw="meter"><i /></div>
              <span data-hw="pct">0%</span>
            </div>
            <p className="hw-msg" data-hw="msg" aria-live="polite">Drag across the panel to start washing.</p>
            <div className="hw-row">
              <button type="button" className="hw-btn" data-hw="demo">Play all 4 steps</button>
              <button type="button" className="hw-btn" data-hw="reset">Make it dirty again</button>
              <a className="hw-btn hw-btn-y" data-hw="cta" hidden href={wa} target="_blank" rel="noopener noreferrer">
                Book a cleaning like this
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
