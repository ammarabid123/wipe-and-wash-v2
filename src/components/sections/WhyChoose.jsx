import { IconBadge, IconBrush, IconDrop, IconShield, IconSpark } from "../../icons.jsx";

const reasons = [
  [IconDrop, "Dedicated Solar Shampoo", "Non-acidic, Ammonia-free, pH Neutral"],
  [IconBrush, "No Scratch Cleaning", "Soft & Safe Method"],
  [IconSpark, "Residue Free Results", "Clean & Clear Panels"],
  [IconBadge, "Sindh Police Verified Staff", "Trusted & Screened Team"],
  [IconShield, "Company Backing", "In Case of Any Loss"],
];

export default function WhyChoose() {
  return (
    <section className="why" id="residential">
      <div className="wrap why-layout">
        <div className="why-title">Why Choose<br />Wipe & Wash?</div>
        {reasons.map(([Icon, title, description]) => (
          <div className="why-item" key={title}>
            <i><Icon /></i><b>{title}</b><small>{description}</small>
          </div>
        ))}
        <picture>
          <source srcSet="/images/shampoo.webp" type="image/webp" />
          <img
            className="bottle"
            src="/images/shampoo.png"
            alt="Wipe & Wash Solar Shampoo bottle: non-acidic, pH-neutral solar panel cleaning shampoo"
            width="231"
            height="520"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  );
}