import workAudit from "@/assets/work-audit.jpg";
import workRedesign from "@/assets/work-redesign.jpg";
import workUgc from "@/assets/work-ugc.jpg";
import workCommercial from "@/assets/work-commercial.jpg";

export const CONTACT = {
  whatsapp: "https://wa.me/2347042220359",
  whatsappDisplay: "+234 704 222 0359",
  email: "mrbrightugc@gmail.com",
  fiverr: "https://fiverr.com/mrolabright",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/* Editable placeholders — update these numbers anytime. */
export const STATS = [
  { label: "Projects Completed", value: 120, suffix: "+" },
  { label: "Clients Served", value: 60, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Revenue Generated", value: 4.2, suffix: "M+", prefix: "$", decimals: 1 },
];

export const SERVICE_GROUPS = [
  {
    title: "Shopify Design & Build",
    blurb: "Stores engineered to sell, not just to look good.",
    items: [
      "Shopify Store Design",
      "Shopify Store Redesign",
      "Shopify Store Audits",
      "Speed Optimization",
    ],
  },
  {
    title: "Conversion Optimization",
    blurb: "Systematic testing that lifts revenue per visitor.",
    items: [
      "Shopify Conversion Optimization",
      "Landing Page Optimization",
      "Product Page Optimization",
      "Checkout Experience Improvements",
    ],
  },
  {
    title: "Growth & Retention",
    blurb: "Traffic, funnels and email that compound.",
    items: [
      "Klaviyo Email Marketing",
      "TikTok Advertising",
      "Conversion Funnel Optimization",
    ],
  },
  {
    title: "AI Video Creation",
    blurb: "Scroll-stopping creative produced at scale.",
    items: [
      "AI UGC Videos",
      "Product Commercial Videos",
      "TikTok Video Ads",
      "Social Media Video Content",
      "AI Product Demonstrations",
    ],
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Shopify Audits",
  "Shopify Redesigns",
  "AI UGC Ads",
  "Product Commercials",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export const PROJECTS = [
  {
    id: "luxe-skin-audit",
    title: "Luxe Skin — Full Store Audit",
    category: "Shopify Audits" as const,
    image: workAudit,
    challenge: "High traffic from paid ads but a 1.1% conversion rate and heavy mobile drop-off.",
    solution:
      "42-point conversion audit covering speed, product page hierarchy, trust signals and checkout friction.",
    results: "+68% conversion rate in 6 weeks, mobile bounce down 24%.",
  },
  {
    id: "north-supply-redesign",
    title: "North Supply — Store Redesign",
    category: "Shopify Redesigns" as const,
    image: workRedesign,
    challenge: "Dated theme, inconsistent branding and a confusing 6-step buying journey.",
    solution:
      "Complete redesign with a modular section system, refined typography and a 3-step purchase flow.",
    results: "+42% AOV, +31% add-to-cart rate, 2.1s faster load time.",
  },
  {
    id: "glowlab-ugc",
    title: "GlowLab — AI UGC Ad Sprint",
    category: "AI UGC Ads" as const,
    image: workUgc,
    challenge: "Creative fatigue after 3 weeks; CPA climbing on every TikTok campaign.",
    solution: "18 AI UGC variations across 4 hooks and 3 angles, refreshed weekly from winning data.",
    results: "-38% CPA, 3.4x hook retention, 2.8x ROAS sustained.",
  },
  {
    id: "aurum-commercial",
    title: "Aurum Fragrance — Product Commercial",
    category: "Product Commercials" as const,
    image: workCommercial,
    challenge: "A premium product presented with flat, low-trust product photography.",
    solution: "Cinematic AI-generated commercial suite for PDP, paid social and email.",
    results: "+54% PDP engagement, +22% email click-through.",
  },
  {
    id: "trailhead-audit",
    title: "Trailhead Gear — Speed & UX Audit",
    category: "Shopify Audits" as const,
    image: workAudit,
    challenge: "6.8s mobile load time crushing paid traffic performance.",
    solution: "App audit, image pipeline rebuild, lazy loading and critical CSS restructuring.",
    results: "1.9s load time, +27% mobile revenue.",
  },
  {
    id: "vela-redesign",
    title: "Vela Home — Conversion Redesign",
    category: "Shopify Redesigns" as const,
    image: workRedesign,
    challenge: "Strong brand, weak merchandising — visitors never reached collection depth.",
    solution: "New navigation architecture, bundle merchandising and social-proof-led PDPs.",
    results: "+59% revenue per session over one quarter.",
  },
];

export const CASE_STUDIES = [
  {
    id: "luxe-skin",
    client: "Luxe Skin",
    tag: "Shopify Conversion Optimization",
    problem:
      "Luxe Skin was spending heavily on paid acquisition while converting just 1.1% of sessions. Mobile shoppers abandoned on the product page, and checkout required six steps with no trust reinforcement.",
    strategy:
      "I ran a full conversion audit, rebuilt the product page hierarchy around benefit-led content and reviews, compressed the checkout to three steps, and shipped a speed pass that removed four redundant apps. Every change was tracked with event-level analytics.",
    outcome:
      "Within six weeks the store converted at 1.85% with materially lower mobile drop-off, and paid campaigns became profitable at a higher spend ceiling.",
    metrics: [
      { value: "+68%", label: "Conversion rate" },
      { value: "-24%", label: "Mobile bounce" },
      { value: "2.4x", label: "Return on ad spend" },
    ],
  },
  {
    id: "glowlab",
    client: "GlowLab",
    tag: "AI UGC Video System",
    problem:
      "GlowLab's TikTok campaigns burned through creative in under three weeks. Production costs made weekly refreshes impossible, so CPA climbed month over month.",
    strategy:
      "I built an AI UGC production system: four validated hooks, three narrative angles and a weekly refresh loop driven by retention data. Winning frames were reused across paid social, email and the product page.",
    outcome:
      "Creative supply stopped being the bottleneck. CPA fell sharply while spend increased, and the same assets lifted on-site engagement.",
    metrics: [
      { value: "-38%", label: "Cost per acquisition" },
      { value: "3.4x", label: "Hook retention" },
      { value: "2.8x", label: "Sustained ROAS" },
    ],
  },
];

export const WHY_ME = [
  {
    title: "Conversion-Focused",
    body: "Every decision is measured against revenue per visitor — not opinion, not trends.",
  },
  {
    title: "Shopify Expertise",
    body: "Deep platform knowledge across themes, apps, speed, checkout and merchandising.",
  },
  {
    title: "AI-Powered Creativity",
    body: "High-volume, on-brand video creative produced in days instead of months.",
  },
  {
    title: "Data-Driven Decisions",
    body: "Event tracking, heatmaps and structured testing behind every recommendation.",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Store Analysis",
    body: "A deep audit of analytics, user behaviour, speed and the full purchase journey to find where revenue leaks.",
  },
  {
    step: "02",
    title: "Strategy Development",
    body: "A prioritised roadmap ranked by revenue impact versus effort, with clear success metrics agreed upfront.",
  },
  {
    step: "03",
    title: "Implementation",
    body: "Design, development and creative production shipped in focused sprints with zero disruption to live sales.",
  },
  {
    step: "04",
    title: "Growth Optimization",
    body: "Continuous testing, creative refreshes and reporting so results compound long after launch.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Amara Okafor",
    role: "Founder",
    company: "Luxe Skin",
    rating: 5,
    quote:
      "Ola rebuilt our product pages and checkout in six weeks. Our conversion rate nearly doubled and paid traffic finally became profitable. He thinks like a business owner, not a contractor.",
  },
  {
    name: "Daniel Reyes",
    role: "Head of Growth",
    company: "North Supply",
    rating: 5,
    quote:
      "The redesign was the cleanest handoff we've ever had. AOV climbed 42% and the team can now update sections without touching code.",
  },
  {
    name: "Sofia Marchetti",
    role: "Marketing Director",
    company: "GlowLab",
    rating: 5,
    quote:
      "The AI UGC system solved our biggest bottleneck. We went from two ads a month to eighteen, and our cost per acquisition dropped by nearly 40%.",
  },
  {
    name: "James Whitfield",
    role: "Ecommerce Manager",
    company: "Trailhead Gear",
    rating: 5,
    quote:
      "Our store went from 6.8 seconds to under 2. Mobile revenue jumped 27% without spending an extra cent on ads.",
  },
];

export const FAQS = [
  {
    q: "What exactly does a Shopify conversion optimization specialist do?",
    a: "I find and fix the reasons visitors leave your store without buying. That covers speed, product page structure, trust signals, navigation, merchandising and checkout friction — all measured against revenue per visitor rather than surface-level design changes.",
  },
  {
    q: "How long does a typical project take?",
    a: "A store audit takes 5–7 days. A conversion optimization sprint runs 3–6 weeks. A full redesign typically takes 4–8 weeks depending on catalogue size and how much custom functionality you need.",
  },
  {
    q: "What results can I realistically expect?",
    a: "Most stores see a 20–70% lift in conversion rate within the first quarter. I set target metrics before starting and report against them, so you always know what the work is producing.",
  },
  {
    q: "Do you work with new stores or only established brands?",
    a: "Both. New stores get a conversion-ready foundation from day one. Established brands get audits, redesigns and ongoing optimization built on their existing data.",
  },
  {
    q: "What are AI UGC videos and how are they different?",
    a: "They're user-generated-style video ads produced with AI creators and product footage. You get the authentic feel of UGC with the speed and cost profile of AI, so you can test far more creative angles per month.",
  },
  {
    q: "How much do you charge?",
    a: "Audits start in the low hundreds, optimization sprints and redesigns are quoted per scope, and video packages are priced per volume. Book a free audit call and you'll get a fixed quote with no obligation.",
  },
  {
    q: "How do we get started?",
    a: "Book a free audit. I review your store, share the three biggest opportunities I find, and if it's a fit we scope the project from there.",
  },
];

export const PROJECT_TYPES = [
  "Shopify Store Design",
  "Shopify Store Redesign",
  "Conversion Optimization",
  "Store Audit",
  "Speed Optimization",
  "Klaviyo Email Marketing",
  "TikTok Advertising",
  "AI UGC Videos",
  "Product Commercial Videos",
  "Other",
];

export const BUDGET_RANGES = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
];
