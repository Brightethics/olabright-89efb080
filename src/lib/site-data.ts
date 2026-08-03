export const CONTACT = {
  whatsapp: "https://wa.me/2347042220359",
  whatsappDisplay: "+234 704 222 0359",
  email: "mrbrightugc@gmail.com",
  fiverr: "https://fiverr.com/mrolabright",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const PLATFORMS = ["Shopify", "Wix", "WooCommerce", "WordPress", "Custom"] as const;

export const SERVICE_GROUPS = [
  {
    title: "Conversion Rate Optimization",
    blurb: "I find the reasons visitors leave without buying or enquiring — and fix them.",
    items: [
      "Conversion rate optimization",
      "Customer journey improvements",
      "Checkout & form friction removal",
      "Sales funnel optimization",
    ],
  },
  {
    title: "Audits & Strategy",
    blurb: "A prioritised, plain-English list of what is costing you money right now.",
    items: [
      "Full website audit",
      "Analytics & behaviour review",
      "Competitor and buyer-objection analysis",
      "Revenue-ranked action roadmap",
    ],
  },
  {
    title: "UX & Page Optimization",
    blurb: "The pages that make the money, rebuilt around how people actually buy.",
    items: [
      "UX optimization",
      "Landing page optimization",
      "Product page optimization",
      "Mobile experience improvements",
    ],
  },
  {
    title: "Performance, SEO & Retention",
    blurb: "Fast, findable websites that keep earning after the first visit.",
    items: [
      "Website performance optimization",
      "Technical SEO",
      "Klaviyo email marketing",
      "Website design & redesign",
    ],
  },
];

export const SERVICE_DETAILS = [
  {
    slug: "conversion-rate-optimization",
    title: "Conversion Rate Optimization",
    description:
      "I study how real people use your website, find where they hesitate or drop off, and fix those moments one by one. The goal is simple: more sales and enquiries from the traffic you already have.",
    benefits: [
      "More revenue without increasing ad spend",
      "Decisions based on your data, not my design taste",
      "Improvements that keep compounding month after month",
    ],
    deliverables: [
      "Prioritised optimization backlog",
      "Implemented page and journey changes",
      "Before/after metrics report",
    ],
    process: [
      "Review analytics, heatmaps and session recordings",
      "Build a prioritised list of fixes ranked by impact",
      "Implement changes in focused sprints",
      "Measure, keep the winners, repeat",
    ],
  },
  {
    slug: "website-audit",
    title: "Website Audit & Strategy",
    description:
      "A forensic review of your website across speed, UX, trust, mobile experience, SEO and checkout — delivered as a plain-English action plan you can hand to any developer, including me.",
    benefits: [
      "Know exactly where you are losing customers",
      "A ranked roadmap instead of vague advice",
      "Fast turnaround, usually within a week",
    ],
    deliverables: [
      "40+ checkpoint audit report",
      "Revenue-impact scoring for every finding",
      "Walkthrough call and 90-day roadmap",
    ],
    process: [
      "Access to your website and analytics",
      "Manual and technical evaluation across 40+ checkpoints",
      "Findings scored by revenue impact and effort",
      "Written report plus a walkthrough call",
    ],
  },
  {
    slug: "ux-optimization",
    title: "UX Optimization",
    description:
      "Most websites do not have a traffic problem — they have a clarity problem. I restructure navigation, page hierarchy and content order so visitors always know where they are and what to do next.",
    benefits: [
      "Less confusion, fewer abandoned sessions",
      "More pages per visit and deeper engagement",
      "A mobile experience that matches how most people browse",
    ],
    deliverables: [
      "UX findings with annotated screenshots",
      "Reworked navigation and page structure",
      "Mobile-first interaction improvements",
    ],
    process: [
      "Map the current customer journey end to end",
      "Identify friction, dead ends and unanswered objections",
      "Redesign the flow around the buying decision",
      "Validate with behaviour data after launch",
    ],
  },
  {
    slug: "landing-page-optimization",
    title: "Landing Page Optimization",
    description:
      "High-intent pages built for one job: turning paid or campaign traffic into customers, without the distractions of a full website.",
    benefits: [
      "Lower cost per acquisition on paid campaigns",
      "Clear, single-minded messaging that converts",
      "Pages you can duplicate for new offers",
    ],
    deliverables: [
      "Conversion-focused page copy structure",
      "Built and tracked landing page",
      "Test plan for headlines, proof and CTAs",
    ],
    process: [
      "Clarify the offer, audience and objection list",
      "Write and structure the page around one action",
      "Build, connect tracking and launch",
      "Test headlines, proof and calls to action",
    ],
  },
  {
    slug: "product-page-optimization",
    title: "Product Page Optimization",
    description:
      "The product page is where the decision happens. I rebuild it so the information appears in the order buyers actually think about it — and every objection is answered before it becomes a reason to leave.",
    benefits: [
      "Higher add-to-cart and checkout rates",
      "Fewer pre-sale questions and returns",
      "Templates that scale across your whole catalogue",
    ],
    deliverables: [
      "Restructured product page template",
      "Trust, proof and objection-handling blocks",
      "Mobile add-to-cart and gallery improvements",
    ],
    process: [
      "Review buyer questions, reviews and support tickets",
      "Reorder content around the decision sequence",
      "Implement the new template",
      "Measure add-to-cart and checkout movement",
    ],
  },
  {
    slug: "sales-funnel-optimization",
    title: "Sales Funnel Optimization",
    description:
      "I map every stage from first click to repeat purchase, find where the leaks are, and fix them in sequence so each improvement can be measured on its own.",
    benefits: [
      "Higher revenue per visitor across the whole journey",
      "Clarity on which stage is actually holding you back",
      "Improvements that compound instead of cancelling out",
    ],
    deliverables: [
      "Full funnel map with drop-off rates",
      "Stage-by-stage fix plan",
      "Post-purchase and repeat-purchase improvements",
    ],
    process: [
      "Instrument and measure every funnel stage",
      "Rank leaks by lost revenue",
      "Fix and test one stage at a time",
      "Report on movement, including what did not work",
    ],
  },
  {
    slug: "technical-seo",
    title: "Technical SEO",
    description:
      "The unglamorous work that helps search engines understand and rank your website: structure, indexing, schema, internal linking and page speed.",
    benefits: [
      "More organic traffic without paying per click",
      "Clean site structure that scales as you grow",
      "Fixes that support conversion work rather than fight it",
    ],
    deliverables: [
      "Crawl and indexation fix list",
      "Metadata, schema and internal linking updates",
      "Search Console monitoring setup",
    ],
    process: [
      "Crawl the site and find indexing and structure issues",
      "Fix metadata, schema and internal linking",
      "Resolve speed and mobile usability problems",
      "Monitor rankings and report on movement",
    ],
  },
  {
    slug: "speed-optimization",
    title: "Website Performance Optimization",
    description:
      "Slow websites lose sales, especially on mobile. I cut load times by fixing images, scripts, themes and third-party apps that are quietly dragging your site down.",
    benefits: [
      "Faster mobile experience where most of your traffic is",
      "Better Core Web Vitals and search visibility",
      "Lower bounce rates on paid traffic",
    ],
    deliverables: [
      "Core Web Vitals before/after benchmark",
      "App, script and image cleanup",
      "Performance maintenance checklist",
    ],
    process: [
      "Benchmark current performance on real devices",
      "Identify the heaviest scripts, images and apps",
      "Implement fixes and remove dead weight",
      "Re-test and document the before and after",
    ],
  },
  {
    slug: "klaviyo-email-marketing",
    title: "Klaviyo Email Marketing",
    description:
      "Automated email flows that recover abandoned revenue and bring customers back — set up once, earning quietly in the background.",
    benefits: [
      "Recover abandoned carts and browse sessions automatically",
      "Higher repeat purchase rate and customer lifetime value",
      "Revenue you own, independent of ad platforms",
    ],
    deliverables: [
      "Core automated flows built and live",
      "Segmentation and list health cleanup",
      "On-brand campaign templates",
    ],
    process: [
      "Audit list health, segmentation and deliverability",
      "Build the core automated flows",
      "Design on-brand campaign templates",
      "Test subject lines, offers and timing monthly",
    ],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    description:
      "A data-informed rebuild of your existing website. I keep what already works, fix what leaks revenue, and modernise the rest without losing your search rankings.",
    benefits: [
      "Protect your existing traffic and SEO",
      "Remove years of accumulated bloat and broken pages",
      "A faster, cleaner, higher-converting website",
    ],
    deliverables: [
      "Staging rebuild with phased launch plan",
      "Redirect map to protect rankings",
      "Post-launch monitoring report",
    ],
    process: [
      "Audit current performance and behaviour data",
      "Scope the redesign around revenue impact",
      "Phased build on a staging site",
      "Launch with monitoring and a rollback plan",
    ],
  },
  {
    slug: "website-design",
    title: "Website Design",
    description:
      "A new website built around how your customers actually buy — not a template with your logo dropped in. Built on Shopify, Wix, WooCommerce or WordPress, whichever suits your business.",
    benefits: [
      "Launch with a foundation that already converts",
      "Design that reflects your brand and builds trust",
      "Pages you can edit yourself afterwards",
    ],
    deliverables: [
      "Wireframes for revenue-critical pages",
      "Designed and built responsive website",
      "Handover walkthrough and editing guide",
    ],
    process: [
      "Discovery: your customers, offer and competitors",
      "Wireframes for the pages that make money",
      "Design and build",
      "Testing, speed pass and launch",
    ],
  },
];

export const WHY_ME = [
  {
    title: "I optimise for revenue, not applause",
    body: "Every change I make is measured against sales, enquiries and revenue per visitor — not how clever the design looks.",
  },
  {
    title: "I work across platforms",
    body: "Shopify, Wix, WooCommerce or WordPress. I meet your business where it already is instead of forcing a migration.",
  },
  {
    title: "You deal with me directly",
    body: "No account managers, no handovers. The person you brief is the person doing the work.",
  },
  {
    title: "I explain everything in plain English",
    body: "You will always understand what I changed, why I changed it, and what it did to your numbers.",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Website Analysis",
    body: "I dig into your analytics, user behaviour, speed and the full journey from landing page to checkout to find where revenue leaks.",
  },
  {
    step: "02",
    title: "Strategy",
    body: "You get a prioritised roadmap ranked by revenue impact versus effort, with the success metrics agreed before I touch anything.",
  },
  {
    step: "03",
    title: "Implementation",
    body: "Design and development shipped in focused sprints, on a staging environment, with no disruption to your live sales.",
  },
  {
    step: "04",
    title: "Measure & Improve",
    body: "I track what changed, report honestly on it, and keep optimising so the results compound long after launch.",
  },
];

export const FAQS = [
  {
    q: "What exactly do you do?",
    a: "I find and fix the reasons visitors leave your website without buying or enquiring. That covers speed, page structure, trust signals, navigation, mobile experience and checkout friction — all measured against sales rather than surface-level design changes.",
  },
  {
    q: "Which platforms do you work with?",
    a: "Shopify, Wix, WooCommerce and WordPress, plus custom-built sites. Shopify is where I do most of my work, but the conversion principles apply everywhere.",
  },
  {
    q: "How long does a project take?",
    a: "A website audit takes about 5–7 days. A conversion optimization sprint runs 3–6 weeks. A full redesign is typically 4–8 weeks depending on how many pages and features are involved.",
  },
  {
    q: "What results can I realistically expect?",
    a: "It depends on your starting point. Sites with clear, fixable problems often see a meaningful lift within the first quarter. I agree target metrics with you before starting and report against them honestly — including when something does not work.",
  },
  {
    q: "Do you work with new websites or only established ones?",
    a: "Both. New websites get a conversion-ready foundation from day one. Established businesses get audits, redesigns and ongoing optimization built on their existing data.",
  },
  {
    q: "How much does it cost?",
    a: "Audits start around $150. Optimization sprints and redesigns are quoted per project scope. Message me on WhatsApp with your website link and I will give you a fixed quote with no obligation.",
  },
  {
    q: "How do we get started?",
    a: "Send me your website link on WhatsApp or through the contact form. I will review it and tell you the three biggest opportunities I can see, free. If it is a fit, we scope the project from there.",
  },
];

export const PROJECT_TYPES = [
  "Website Audit & Strategy",
  "Conversion Rate Optimization",
  "UX Optimization",
  "Landing Page Optimization",
  "Product Page Optimization",
  "Sales Funnel Optimization",
  "Technical SEO",
  "Website Performance Optimization",
  "Klaviyo Email Marketing",
  "Website Redesign",
  "Website Design",
  "Other",
];

export const BUDGET_RANGES = [
  "$100 - $200",
  "$200 - $300",
  "$300 - $500",
  "$500 - $1000",
  "$1000+",
];
