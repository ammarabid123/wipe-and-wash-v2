export const site = {
  name: "Wipe & Wash",
  phoneDisplay: "0320-2112387",
  phoneTel: "+923202112387",
  whatsappNumber: "923202112387",
  facebook: "https://www.facebook.com/wipeandwashsolarpanelcleaningkarachi/",
  instagram: "https://www.instagram.com/wipeandwashofficial/",
};

export const areas = [
  "North Nazimabad",
  "Gulshan-e-Iqbal",
  "Gulistan-e-Jauhar",
  "PECHS",
  "DHA / Clifton",
  "Federal B Area",
  "Korangi",
  "Landhi",
  "SITE",
  "Port Qasim",
  "Other Karachi area",
];

export const capacities = ["1–8 kW", "9–12 kW", "13–17 kW", "18–20 kW", "Above 20 kW"];

// Number-of-panels ranges (edit freely; the form adds the word "panels" when sending)
export const panelRanges = ["Less than 5", "5–10", "11–15", "16–20", "21–25", "Above 25"];

export const steps = [
  {
    n: "01",
    title: "Pressure Wash",
    text: "Remove loose dust and dirt.",
    img: "/images/process-01.jpeg",
    alt: "Pressure washing solar panels",
  },
  {
    n: "02",
    title: "Apply Solar Shampoo",
    text: "Use our specially formulated, pH-neutral solar shampoo.",
    img: "/images/process-02.jpeg",
    alt: "Solar shampoo applied to panels",
  },
  {
    n: "03",
    title: "Gentle Scrubbing",
    text: "Soft-brush cleaning without any scratches.",
    img: "/images/process-03.jpeg",
    alt: "Soft brush cleaning solar panels",
  },
  {
    n: "04",
    title: "Final Pressure Wash",
    text: "Rinse and leave panels clean, clear and residue-free.",
    img: "/images/process-04.jpeg",
    alt: "Final rinse of solar panels",
  },
];

export const results = [
  {
    before: "/images/res-before.jpeg",
    after: "/images/res-after.jpeg",
    title: "Residential Project",
    meta: "45 kW System · North Nazimabad",
    icon: "home",
  },
  {
    before: "/images/com-before.jpeg",
    after: "/images/com-after.jpeg",
    title: "Commercial Project",
    meta: "120 kW System · SITE, Karachi",
    icon: "factory",
  },
  {
    before: "/images/ind-before.jpeg",
    after: "/images/ind-after.jpeg",
    title: "Industrial Project",
    meta: "444 kW System · Korangi, Karachi",
    icon: "factory",
  },
];

export const reviews = [
  {
    quote:
      "Very professional service. Clear difference in solar output after cleaning. Highly recommended!",
    name: "Farhan Ahmed",
    meta: "North Nazimabad, Karachi",
  },
  {
    quote:
      "Booked for our office system. The team was punctual, well-equipped and extremely professional.",
    name: "Ayesha Siddiqui",
    meta: "PECHS, Karachi",
  },
  {
    quote:
      "Excellent service and cooperative staff. Our panels are now much cleaner and performing better.",
    name: "Bilal Hashmi",
    meta: "Korangi, Karachi",
  },
];

export const faqs = [
  {
    q: "How much does solar panel cleaning cost in Karachi?",
    a: "Use the calculator above for an estimate based on the current residential rate slabs. Our team confirms the final price on WhatsApp.",
  },
  {
    q: "How often should I clean my solar panels?",
    a: "It depends on dust, nearby construction, bird activity and site conditions. Many Karachi rooftops benefit from a clean every few months. Contact us for a suitable schedule.",
  },
  {
    q: "Is your Solar Shampoo safe for solar panels?",
    a: "Yes. Wipe & Wash Solar Shampoo is non-acidic, ammonia-free and pH-neutral — formulated for glass modules without scratching or residue.",
  },
  {
    q: "Do you provide industrial / commercial cleaning?",
    a: "Yes. We clean factories, warehouses, plants and commercial rooftops across Karachi. Request a site-specific quotation.",
  },
  {
    q: "Are your staff verified?",
    a: "Wipe & Wash staff are Sindh Police verified. The company also provides backing in case of any loss.",
  },
];

export function estimateCost(kw, panels, type) {
  if (type !== "Residential") {
    return { amount: null, detail: "Commercial / industrial installations require a site-specific quotation." };
  }
  if (kw <= 8) return { amount: 1500, detail: "Residential rate slab: 1–8 kW" };
  if (kw <= 12) return { amount: 2000, detail: "Residential rate slab: 9–12 kW" };
  if (kw <= 17) return { amount: 2500, detail: "Residential rate slab: 13–17 kW" };
  if (kw <= 20) return { amount: 3000, detail: "Residential rate slab: 18–20 kW" };
  if (panels > 0) return { amount: panels * 100, detail: "Above 20 kW: PKR 100 per panel" };
  return { amount: null, detail: "Please enter your panel count for systems above 20 kW." };
}

export function openWhatsApp(message) {
  const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

export async function submitNetlify(formName, fields) {
  const body = new URLSearchParams({ "form-name": formName, ...fields }).toString();
  await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}
