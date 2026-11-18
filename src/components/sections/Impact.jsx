import { IconBolt, IconCalendar, IconFactory } from "../../icons.jsx";

export default function Impact() {
  return (
    <section className="wrap impact">
      <h2>Dust Doesn't Just Sit<br />on Your Solar Panels.<br /><em>It Can Cost You.</em></h2>
      <div className="impact-item"><b><IconFactory /> UPTO 35%</b><span>Lower Efficiency<br />Due to Dust</span></div>
      <div className="impact-item"><b><IconBolt /> UPTO 80%</b><span>Reduction in Electricity Bills<br />(Our Client's Claim)</span></div>
      <div className="impact-item"><b><IconCalendar /> Regular Cleaning</b><span>Keeps Your Panels<br />Working at Their Best</span></div>
    </section>
  );
}
