import { useState } from "react";
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import SolarLossCalculator from "./components/Calculator/Calculator.jsx";
import ContactSection from "./components/sections/ContactSection.jsx";
import Hero from "./components/sections/Hero.jsx";
import Impact from "./components/sections/Impact.jsx";
import Process from "./components/sections/Process.jsx";
import Results from "./components/sections/Results.jsx";
import Reviews from "./components/sections/SociableKitWidget.jsx";
import Stats from "./components/sections/Stats.jsx";
import WashDemo from "./components/sections/WashDemo.jsx";
import WhyChoose from "./components/sections/WhyChoose.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header open={menuOpen} setOpen={setMenuOpen} />
      <main id="main">
        <Hero />
        <Stats />
        <WashDemo />
        <Process />
        <section className="conversion" id="calculator">
          <div className="wrap calculator-layout">
            <SolarLossCalculator />
          </div>
        </section>
        <Impact />
        <Results />
        <WhyChoose />
        <Reviews />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}