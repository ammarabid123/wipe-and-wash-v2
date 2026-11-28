export const site = {
  name: "Wipe & Wash",
  phoneDisplay: "0320-2112387",
  phoneTel: "+923202112387",
  whatsappNumber: "923202112387",
  facebook: "https://www.facebook.com/wipeandwashsolarpanelcleaningkarachi/",
  instagram: "https://www.instagram.com/wipeandwashofficial/",
  address: "G-33 Rajput Mall, Block G, North Nazimabad, Karachi, 74700",
  hours: "Mon–Sat, 6 am – 8 pm",
};

export const steps = [
  {
    n: "01",
    title: "Pressure Wash",
    text: "Remove loose dust and dirt.",
    img: "/images/process-01.webp",
    video: "/videos/process-01.mp4", // plays on hover; file lives in public/videos/
    alt: "Pressure washing solar panels",
  },
  {
    n: "02",
    title: "Apply Solar Shampoo",
    text: "Use our specially formulated, pH-neutral solar shampoo.",
    img: "/images/process-02.webp",
    video: "/videos/process-02.mp4", // plays on hover; file lives in public/videos/
    alt: "Solar shampoo applied to panels",
  },
  {
    n: "03",
    title: "Gentle Scrubbing",
    text: "Soft-brush cleaning without any scratches.",
    img: "/images/process-03.webp",
    video: "/videos/process-03.mp4", // plays on hover; file lives in public/videos/
    alt: "Soft brush cleaning solar panels",
  },
  {
    n: "04",
    title: "Final Pressure Wash",
    text: "Rinse and leave panels clean, clear and residue-free.",
    img: "/images/process-04.webp",
    video: "/videos/process-04.mp4", // plays on hover; file lives in public/videos/
    alt: "Final rinse of solar panels",
  },
];

export const results = [
  {
    before: "/images/res-before.webp",
    after: "/images/res-after.webp",
    title: "Residential Project",
    meta: "45 kW System · North Nazimabad",
    icon: "home",
  },
  {
    before: "/images/com-before.webp",
    after: "/images/com-after.webp",
    title: "Commercial Project",
    meta: "120 kW System · SITE, Karachi",
    icon: "factory",
  },
  {
    before: "/images/ind-before.webp",
    after: "/images/ind-after.webp",
    title: "Industrial Project",
    meta: "445 kW System · Korangi, Karachi",
    icon: "factory",
  },
];

// FAQs shown first. They are shuffled on every page load (see ContactSection.jsx).
// Use "\n\n" inside an answer to start a new paragraph.
export const faqs = [
  {
    q: "How much does solar panel cleaning cost in Karachi?",
    a: "Wipe & Wash offers fixed solar panel cleaning rates based on your solar system's capacity (kW). Our standard pricing applies to systems up to 40kW. For larger systems above 40kW, the quotation depends on the number of panels and the scope of work. Contact us on WhatsApp with your system details to receive a cleaning quotation.",
  },
  {
    q: "How often should solar panels be cleaned in Karachi?",
    a: "Solar panels in Karachi are exposed to dust, pollution, bird droppings and changing weather conditions. Cleaning frequency depends on your location and surrounding environment.\n\nFor commercial and industrial sites, we generally recommend cleaning every 7–10 days. For residential solar systems, cleaning every 15 days is generally recommended. Our team can help you choose a suitable solar panel maintenance schedule.",
  },
  {
    q: "Is Wipe & Wash Solar Shampoo safe for solar panels?",
    a: "Yes. Wipe & Wash Solar Shampoo is specially formulated for professional solar panel cleaning. It is non-acidic, ammonia-free and pH-neutral. It is designed to clean solar panels without harsh chemicals and has been tested across more than 1 million solar panels in Karachi.",
  },
  {
    q: "Do you provide industrial and commercial solar panel cleaning in Karachi?",
    a: "Yes. Wipe & Wash provides professional industrial and commercial solar panel cleaning services across Karachi. We serve factories, warehouses, manufacturing plants and commercial buildings. Whether you have a small commercial installation or a large industrial solar system, contact us for a site-specific cleaning quotation.",
  },
  {
    q: "Are Wipe & Wash cleaning staff verified?",
    a: "Yes. All Wipe & Wash cleaning staff are Sindh Police verified and professionally trained. We prioritise customer safety and responsible service. We also provide company backing in case of any loss during our service.",
  },
  {
    q: "Is it safe to clean solar panels during daylight?",
    a: "Yes, solar panel cleaning can be carried out during daylight when proper safety precautions are followed. With over 7 years of experience in solar panel cleaning, our trained team understands the correct cleaning procedures and takes the necessary precautions while working on solar installations.",
  },
  {
    q: "Can you clean solar panels if there is no electricity at my property?",
    a: "Yes. A regular electricity supply from your property is not always necessary for solar panel cleaning. Our team can arrange the cleaning process according to the site's requirements and available facilities. We will discuss any necessary arrangements before starting the service.",
  },
  {
    q: "Do I need to switch off my solar inverter before cleaning?",
    a: "Our team will guide you through the necessary precautions before starting the cleaning process. Your solar system will be handled according to the manufacturer's instructions and appropriate electrical safety procedures.",
  },
  {
    q: "What do you use to clean solar panels?",
    a: "We use water and our specially formulated Wipe & Wash Solar Shampoo for professional solar panel cleaning. Our cleaning process includes pressure washing, solar shampoo application, gentle brushing with suitable cleaning equipment and a final rinse to remove dirt and cleaning residue.",
  },
  {
    q: "Does professional solar panel cleaning improve solar panel efficiency?",
    a: "Yes. Dust, bird droppings and other dirt can block sunlight from reaching your solar panels, affecting their energy generation. Professional solar panel cleaning removes accumulated dirt and helps your system perform more efficiently. Regular cleaning also helps maintain your solar panels in good condition.",
  },
  {
    q: "What facilities do I need to provide for solar panel cleaning?",
    a: "Wipe & Wash brings all the necessary cleaning equipment, tools and cleaning materials. We only require access to an electricity connection and a water connection at your property. If necessary, the customer must also provide a suitable ladder or stool to ensure safe access to the cleaning area.",
  },
  {
    q: "How can I book a solar panel cleaning service in Karachi?",
    a: "Booking a solar panel cleaning service with Wipe & Wash is simple. Contact us on WhatsApp and share your location and solar system capacity. Our team will provide a quotation and confirm an available cleaning slot.",
  },
  {
    q: "Do your cleaners walk on solar panels?",
    a: "No. We strongly discourage walking on solar panels because it can cause physical damage, including cracks and other panel damage. Our team always tries to clean panels without stepping on them by using professional cleaning equipment and long-reach brushes.\n\nHowever, in certain situations, such as when there is no proper walkway or our 12-foot cleaning brush cannot reach specific panels, stepping on panels may sometimes be necessary. In such cases, we will discuss the situation with the site owner and proceed only after obtaining permission.",
  },
];

// Opens WhatsApp with a ready message. Call it straight from a click/submit handler (before any "await"),
// otherwise phone browsers treat the new tab as a blocked popup.
export function openWhatsApp(message) {
  const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
  const win = window.open(url, "_blank");
  if (win) {
    win.opener = null;
  } else {
    window.location.assign(url); // popup was blocked: open WhatsApp in this tab instead
  }
}

// Sends a backup copy of the quote request to public/api/send-quote.php (works on the Hostinger server).
// It runs in the background and never blocks or breaks the visitor's flow; on Vercel previews it simply does nothing.
const QUOTE_ENDPOINT = "/api/send-quote.php";

export function submitQuote(fields) {
  try {
    fetch(QUOTE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore: WhatsApp is the main channel */
  }
}