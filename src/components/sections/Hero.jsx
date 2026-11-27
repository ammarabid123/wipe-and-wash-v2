import { useEffect, useRef } from "react";
import {
  IconBadge,
  IconBolt,
  IconCalc,
  IconDrop,
  IconShield,
  IconWhatsApp,
} from "../../icons.jsx";

/*
  Background video.
  - The poster image shows straight away; the video file is only requested after the page has finished loading,
    so it can never slow down the first view (good for speed / SEO).
  - Phones get the small file (hero-mobile.mp4), bigger screens get hero.mp4. Both live in public/videos/.
  - People who asked their device to reduce motion, or who use Data Saver, only see the poster image.
*/
const VIDEO_DESKTOP = "/videos/hero.mp4";
const VIDEO_MOBILE = "/videos/hero-mobile.mp4";

function HeroVideo() {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData === true;
    if (reduceMotion || saveData) return undefined;

    let cancelled = false;
    function start() {
      if (cancelled) return;
      video.muted = true; // browsers only autoplay muted videos
      video.src = window.matchMedia("(max-width: 700px)").matches ? VIDEO_MOBILE : VIDEO_DESKTOP;
      video.play().catch(() => {}); // if the browser blocks autoplay, the poster simply stays
    }

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      video.pause();
      video.removeAttribute("src");
      video.load(); // stops any download that is still running
    };
  }, []);

  return <video ref={ref} className="hero-video" muted loop playsInline preload="none" poster="/images/hero.jpg" aria-hidden="true" />;
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <HeroVideo />
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
              <span>Up to 35%<br />Higher Efficiency</span>
            </span>
            <span className="pill">
              <IconShield />
              <span>No Scratch<br />Cleaning</span>
            </span>
            <span className="pill">
              <IconDrop />
              <span>Residue Free<br />Results</span>
            </span>
            <span className="pill">
              <IconBadge />
              <span>Sindh Police<br />Verified Staff</span>
            </span>
          </div>
          <div className="hero-actions">
            <a className="btn yellow" href="#calculator">
              <IconCalc /> Calculate My Energy Loss
            </a>
            <a className="btn outline" href="https://wa.me/923202112387" target="_blank" rel="noopener noreferrer">
              <IconWhatsApp /> Book on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}