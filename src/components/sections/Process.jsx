import { useEffect, useRef, useState } from "react";
import { steps } from "../../content.js";

// Scrolls the interactive demo into view, then asks it to play the chosen step (see panelWasher.js)
function watchStep(index) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stage = document.querySelector(".hw-stage") || document.getElementById("home");
  stage?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  window.setTimeout(
    () => window.dispatchEvent(new CustomEvent("ww-run-step", { detail: index })),
    reduce ? 0 : 550,
  );
}

/*
  One process card.
  - The <img> stays in the page at all times (good for SEO and as the fallback).
  - Mouse: hovering the picture plays the video on top of it; moving away stops it and the picture is back.
  - Touch screens have no hover, so a tap on the picture plays/stops the video instead.
  - The video downloads only when first needed (preload="none"), so page speed is not affected.
*/
function StepCard({ step, index }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const pointerType = useRef("mouse");
  const [playing, setPlaying] = useState(false);

  function start() {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {}); // ignore "interrupted by pause" errors
  }

  function stop() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    try { video.currentTime = 0; } catch { /* video not loaded yet */ }
    setPlaying(false);
  }

  // Stop the video when the card scrolls out of view (saves battery and data on phones)
  useEffect(() => {
    const card = cardRef.current;
    if (!card || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="step" ref={cardRef}>
      <img
        src={step.img}
        alt={step.alt}
        width="800"
        height="600"
        loading="lazy"
        decoding="async"
        onPointerDown={(event) => { pointerType.current = event.pointerType; }}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") start(); }}
        onPointerLeave={(event) => { if (event.pointerType === "mouse") stop(); }}
        onClick={() => { if (pointerType.current !== "mouse") (playing ? stop() : start()); }}
      />
      <div className={playing ? "step-video is-playing" : "step-video"} aria-hidden="true">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={step.img}
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
        >
          <source src={step.video} type="video/mp4" />
        </video>
        <span className="step-play">▶</span>
      </div>
      <span className="num">{step.n}</span>
      <div className="step-copy">
        <b>{step.title}</b>
        <p>{step.text}</p>
        <button
          type="button"
          className="step-watch"
          onClick={() => watchStep(index)}
          aria-label={`Watch step ${index + 1}, ${step.title}, in the cleaning demo on this page`}
        >
          ▶ Watch this step
        </button>
      </div>
    </article>
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
            <StepCard key={step.n} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}