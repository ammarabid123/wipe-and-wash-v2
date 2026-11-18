import { useMemo, useState } from "react";
import "./Calculator.css";

/*
  Wipe & Wash Solar Loss Assessment
  Keep Calculator.jsx and Calculator.css together in src/components/Calculator/.
  Import the component from "./components/Calculator/Calculator.jsx" in App.jsx.

  Model assumptions:
  - 4.65 kWh per kW per day (illustrative average production assumption).
  - Soiling-loss benchmarks: 0% at day 0, 15% at day 15,
    27.5% at day 30, and 35% at day 60 and beyond.
  - The selected duration's interpolated loss percentage is applied
    to the estimated generation over that duration. This is a simplified
    estimate, not a measured Karachi benchmark or a bill-saving guarantee.
*/

const PRODUCTION_PER_KW_PER_DAY = 4.65;
const DEFAULT_TARIFF = 40;

const DURATION_OPTIONS = [
  { label: "7 days", days: 7 },
  { label: "15 days", days: 15 },
  { label: "23 days", days: 23 },
  { label: "30 days", days: 30 },
  { label: "2 months", days: 60 },
  { label: "3 months", days: 90 },
  { label: "4 months", days: 120 },
  { label: "5 months", days: 150 },
  { label: "6 months", days: 180 },
];

const KARACHI_AREAS = [
  { name: "DHA", frequency: "15 days", note: "Coastal air and dust can settle on panels." },
  { name: "Clifton", frequency: "15 days", note: "Coastal exposure can leave deposits on glass." },
  { name: "Gulberg", frequency: "15 days", note: "A practical starting schedule for a residential system." },
  { name: "Gulshan-e-Iqbal", frequency: "15 days", note: "Road and construction dust can build up on panels." },
  { name: "Gulistan-e-Johar", frequency: "15 days", note: "Dust exposure can vary with nearby roads and construction." },
  { name: "Bahria Town", frequency: "23 days", note: "A starting point for areas with comparatively less coastal exposure." },
  { name: "PECHS", frequency: "15 days", note: "Urban dust and nearby traffic can contribute to soiling." },
  { name: "North Nazimabad", frequency: "15 days", note: "Urban dust levels and site conditions should guide scheduling." },
  { name: "Korangi", frequency: "15 days", note: "Industrial and road dust may require more frequent checks." },
  { name: "Other Karachi area", frequency: "15 days", note: "We recommend checking actual panel condition regularly." },
];

const LOSS_BENCHMARKS = [
  { days: 0, loss: 0 },
  { days: 15, loss: 15 },
  { days: 30, loss: 27.5 },
  { days: 60, loss: 35 },
  { days: 180, loss: 35 },
];

function getInterpolatedLoss(days) {
  const upperIndex = LOSS_BENCHMARKS.findIndex((point) => point.days >= days);
  if (upperIndex <= 0) return LOSS_BENCHMARKS[0].loss;

  const lower = LOSS_BENCHMARKS[upperIndex - 1];
  const upper = LOSS_BENCHMARKS[upperIndex];
  if (lower.days === upper.days) return upper.loss;

  const progress = (days - lower.days) / (upper.days - lower.days);
  return lower.loss + progress * (upper.loss - lower.loss);
}

function formatPKR(value) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export default function Calculator({ quoteHref = "#contact" }) {
  const [capacity, setCapacity] = useState(10);
  const [area, setArea] = useState("DHA");
  const [durationIndex, setDurationIndex] = useState(3);
  const [tariff, setTariff] = useState(DEFAULT_TARIFF);
  const [showTariff, setShowTariff] = useState(false);
  const [result, setResult] = useState(null);

  const selectedDuration = DURATION_OPTIONS[durationIndex];
  const liveEstimate = useMemo(() => {
    const lossPercent = getInterpolatedLoss(selectedDuration.days);
    const estimatedGeneration =
      capacity * PRODUCTION_PER_KW_PER_DAY * selectedDuration.days;
    const lostUnits = estimatedGeneration * (lossPercent / 100);
    const financialLoss = lostUnits * Math.max(0, Number(tariff) || 0);

    return { lossPercent, lostUnits, financialLoss };
  }, [capacity, selectedDuration.days, tariff]);

  function calculateLoss(event) {
    event.preventDefault();
    setResult({
      capacity,
      area,
      days: selectedDuration.days,
      durationLabel: selectedDuration.label,
      tariff: Math.max(0, Number(tariff) || 0),
      ...liveEstimate,
    });
    window.setTimeout(() => {
      document.getElementById("ww-calculator-result")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 80);
  }

  const rangePosition = ((durationIndex) / (DURATION_OPTIONS.length - 1)) * 100;
  const capacityPosition = ((capacity - 1) / 999) * 100;

  return (
    <section className="ww-loss-section ww-compact" id="solar-loss-calculator">
      <div className="ww-loss-shell">
        <form className="ww-assessment-card" onSubmit={calculateLoss}>
          <div className="ww-card-topline">
            <div>
              <p className="ww-eyebrow">FREE SOLAR LOSS ASSESSMENT</p>
              <h3>Calculate Your Solar Loss</h3>
            </div>
            <span className="ww-step-count">3 SIMPLE QUESTIONS</span>
          </div>

          <div className="ww-question">
            <div className="ww-question-heading">
              <span className="ww-step-number">01</span>
              <div>
                <h4>What's Your Solar System Capacity?</h4>
                <p>Move The Slider To Match Your Installed System Size.</p>
              </div>
            </div>
            <div className="ww-capacity-value">
              <strong>{formatNumber(capacity)}</strong>
              <span>kW</span>
            </div>
            <input
              className="ww-range ww-capacity-range"
              type="range"
              min="1"
              max="1000"
              step="1"
              value={capacity}
              style={{ "--ww-range-progress": `${capacityPosition}%` }}
              onChange={(event) => {
                setCapacity(Number(event.target.value));
                setResult(null);
              }}
              aria-label="Solar system capacity in kilowatts"
            />
            <div className="ww-range-labels">
              <span>1 kW</span>
              <span>500 kW</span>
              <span>1,000 kW (1 MW)</span>
            </div>
          </div>

          <div className="ww-question">
            <div className="ww-question-heading">
              <span className="ww-step-number">02</span>
              <div>
                <h4>Where Is Your Solar System Located?</h4>
                <p>Choose Your Karachi Area For A Suggested Cleaning Interval.</p>
              </div>
            </div>
            <label className="ww-select-wrap">
              <span className="ww-sr-only">Select your area</span>
              <select
                value={area}
                onChange={(event) => {
                  setArea(event.target.value);
                  setResult(null);
                }}
              >
                {KARACHI_AREAS.map((item) => (
                  <option value={item.name} key={item.name}>{item.name}</option>
                ))}
              </select>
              <span className="ww-select-chevron" aria-hidden="true">⌄</span>
            </label>
          </div>

          <div className="ww-question ww-duration-question">
            <div className="ww-question-heading">
              <span className="ww-step-number">03</span>
              <div>
                <h4>When Did You Last Clean Your Panels?</h4>
                <p>How Long Have They Been Operating Without A Clean?</p>
              </div>
            </div>
            <div className="ww-duration-value">{selectedDuration.label}</div>
            <input
              className="ww-range ww-duration-range"
              type="range"
              min="0"
              max={DURATION_OPTIONS.length - 1}
              step="1"
              value={durationIndex}
              style={{ "--ww-range-progress": `${rangePosition}%` }}
              onChange={(event) => {
                setDurationIndex(Number(event.target.value));
                setResult(null);
              }}
              aria-label="Time since last solar panel cleaning"
            />
          </div>

          <div className="ww-tariff-row">
            <div>
              <strong>ELECTRICITY RATE</strong>
              <p>Default Estimate: Rs. 40 Per Unit</p>
            </div>
            <button
              type="button"
              className="ww-text-button"
              onClick={() => setShowTariff((current) => !current)}
              aria-expanded={showTariff}
            >
              {showTariff ? "Hide option −" : "Change rate +"}
            </button>
          </div>
          {showTariff && (
            <label className="ww-tariff-input">
              <span>ELECTRICITY TARIFF (Rs. Per kWh)</span>
              <div>
                <span>Rs.</span>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  step="0.01"
                  value={tariff}
                  onChange={(event) => {
                    setTariff(event.target.value);
                    setResult(null);
                  }}
                />
                <span>/ unit</span>
              </div>
            </label>
          )}

          <button className="ww-calculate-button" type="submit">
            CALCULATE MY SOLAR LOSS <span aria-hidden="true">→</span>
          </button>
          <p className="ww-form-footnote">
            Your Estimate Is Calculated From The Details You Enter. No Signup Required.
          </p>
        </form>

        {result && (
          <section className="ww-result-card" id="ww-calculator-result" aria-live="polite">
            <div className="ww-result-top">
              <p className="ww-eyebrow">YOUR SOLAR LOSS ESTIMATE</p>
              <span className="ww-result-badge">ESTIMATE</span>
            </div>
            <p className="ww-result-lead">Your Uncleaned Panels Could Be Costing You</p>
            <div className="ww-money-result">
              <span>Rs.</span> {formatPKR(result.financialLoss)}
            </div>
            <p className="ww-result-caption">
              Estimated Value Of Lost Electricity Over {result.days} days
            </p>

            <div className="ww-result-metrics">
              <div>
                <strong>{formatNumber(result.lostUnits)}</strong>
                <span>Estimated Lost Units (kWh)</span>
              </div>
              <div>
                <strong>{Math.max(0, result.lossPercent - 2.5).toFixed(0)}–{Math.min(35, result.lossPercent + 2.5).toFixed(0)}%</strong>
                <span>Illustrative Soiling-Loss Range</span>
              </div>
              <div>
                <strong>Rs. {formatPKR(result.tariff)}</strong>
                <span>Electricity Rate Per Unit</span>
              </div>
            </div>

            <div className="ww-loss-range">
              <span>Estimated Financial Loss Range</span>
              <strong>
                Rs. {formatPKR(result.financialLoss * 0.9)} – {formatPKR(result.financialLoss * 1.1)}
              </strong>
            </div>

            <div className="ww-result-message">
              <h3>Why Keep Losing When You Can Clean?</h3>
              <p>
                Professional Solar Panel Cleaning Helps Remove Dust And Deposits.
                That Can Reduce The Sunlight Reaching Your Panels.
              </p>
            </div>
            <a className="ww-quote-button" href={quoteHref}>
              GET MY WIPE &amp; WASH QUOTATION <span aria-hidden="true">→</span>
            </a>
            <p className="ww-disclaimer">
              This is an illustrative estimate, not a guaranteed electricity-bill saving.
              It assumes 4.65 kWh of daily generation per installed kW and applies the
              modelled soiling-loss percentage to generation over the selected period.
              Loss is capped at 35% after 60 days in this model. Actual results depend on
              system orientation, weather, shading, cleaning history, self-consumption
              and billing arrangements. The location frequency is a starting suggestion,
              not a site inspection or measured local benchmark.
            </p>
          </section>
        )}

      </div>
    </section>
  );
}
