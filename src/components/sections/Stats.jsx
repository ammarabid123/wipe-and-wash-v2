import { IconFactory, IconPanels, IconPeople, IconShield } from "../../icons.jsx";

const stats = [
  [IconPanels, "1 Million+", <>Solar Panels Cleaned in Karachi</>],
  [IconPeople, "5,000+", <>Satisfied Clients</>],
  [IconFactory, "Residential & Industrial", <>Cleaning Services<br />(Factories, Warehouses, Plants)</>],
  [IconShield, "Company Backing", <>In Case of Any Loss</>],
];

export default function Stats() {
  return (
    <section className="wrap stats">
      {stats.map(([Icon, title, description]) => (
        <div className="stat" key={title}>
          <span className="ico"><Icon /></span>
          <div><b>{title}</b><span>{description}</span></div>
        </div>
      ))}
    </section>
  );
}
