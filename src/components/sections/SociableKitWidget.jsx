import { useEffect, useRef } from "react";
import "./SociableKitWidget.css";

/*
  Reviews section: heading + short line + SociableKit Google reviews widget.
  This file replaces Reviews.jsx, so Reviews.jsx can be deleted.
  In App.jsx use:  import Reviews from "./components/sections/SociableKitWidget.jsx";  (and keep <Reviews />)

  SociableKit gives you an embed code that looks like this:
    <div class="sk-ww-google-reviews" data-embed-id="25732264"></div>
    <script src="https://widgets.sociablekit.com/google-reviews/widget.js" defer></script>

  React does not run <script> tags written in JSX, so the code below adds them itself.
  The values from your embed code are in the SK object:
    className -> the class name of the <div>
    embedId   -> the number in data-embed-id
    scriptSrc -> the src of the <script>

  The script is loaded only when this section is close to the screen, so the first page load stays fast
  (good for SEO / Core Web Vitals). The heading text is normal HTML, so search engines can read it.
*/
const SK = {
  className: "sk-ww-google-reviews",
  embedId: "25732264",
  scriptSrc: "https://widgets.sociablekit.com/google-reviews/widget.js",
};

export default function SociableKitReviews() {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;

    let observer;
    function load() {
      if (box.firstChild) return; // already added
      const widget = document.createElement("div");
      widget.className = SK.className;
      widget.setAttribute("data-embed-id", SK.embedId);
      const script = document.createElement("script");
      script.src = SK.scriptSrc;
      script.async = true;
      script.defer = true;
      box.append(widget, script); // the script finds the div by its class and fills it
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            load();
            observer.disconnect();
          }
        },
        { rootMargin: "400px 0px" },
      );
      observer.observe(box);
    } else {
      load();
    }

    return () => {
      observer?.disconnect();
      box.innerHTML = ""; // removes the widget and script (also needed for React's development double-run)
    };
  }, []);

  return (
    <section className="reviews" id="reviews">
      <div className="wrap">
        <div className="section-title">
          <h2>What Our Customers Say</h2>
          <p>Trusted by homeowners and businesses across Karachi.</p>
        </div>
      </div>
      <div className="wrap rw-wrap">
        <div className="rw-widget" ref={boxRef} aria-label="Customer reviews from Google" />
      </div>
    </section>
  );
}