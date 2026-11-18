import { useMemo, useState } from "react";
import { results } from "../../content.js";
import { IconArrow, IconFactory, IconHome } from "../../icons.jsx";

export default function Results() {
  const [index, setIndex] = useState(0);
  const visible = useMemo(
    () => [0, 1, 2].map((offset) => results[(index + offset) % results.length]),
    [index],
  );

  return (
    <section className="section" id="results">
      <div className="wrap">
        <div className="center">
          <h2>The Difference Is Visible. <em>The Results Matter.</em></h2>
          <p>Real cleaning results from our Karachi projects.</p>
        </div>
        <div className="results-wrap">
          <button className="results-nav prev" type="button" aria-label="Previous" onClick={() => setIndex((value) => (value + results.length - 1) % results.length)}>
            <IconArrow dir="left" />
          </button>
          <div className="results-grid">
            {visible.map((result) => (
              <article className="result" key={result.title}>
                <div className="compare">
                  <img className="before" src={result.before} alt={`${result.title} before cleaning`} />
                  <img src={result.after} alt={`${result.title} after cleaning`} />
                  <label>Before</label><label>After</label>
                </div>
                <div className="result-meta">
                  <b>{result.icon === "home" ? <IconHome /> : <IconFactory />} {result.title}</b>
                  <span>{result.meta}</span>
                </div>
              </article>
            ))}
          </div>
          <button className="results-nav next" type="button" aria-label="Next" onClick={() => setIndex((value) => (value + 1) % results.length)}>
            <IconArrow />
          </button>
        </div>
      </div>
    </section>
  );
}
