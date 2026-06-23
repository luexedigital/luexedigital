import {
  TrendingUp,
  Code2,
  Palette,
  Target,
  Search,
  Lightbulb,
  PenTool,
  Hammer,
  Rocket,
  BarChart3,
  Building2,
  ShoppingBag,
  Hotel,
  HeartPulse,
  Landmark,
  Gem,
  Car,
  UtensilsCrossed,
  Gauge,
  Users,
  ShieldCheck,
  Sparkles,
  Zap,
  LineChart,
} from "lucide-react";

export const STATS = [
  { value: 250, suffix: "+", label: "Projects Delivered", sub: "Across Kuwait & the GCC" },
  { value: 4.2, suffix: "x", label: "Average ROI Uplift", sub: "Within the first 90 days" },
  { value: 40, prefix: "$", suffix: "M+", label: "Revenue Generated", sub: "For partner brands" },
  { value: 98, suffix: "%", label: "Client Retention", sub: "Long-term partnerships" },
];

export const SERVICES = [
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    desc: "ROAS-obsessed paid media across Meta, Google, TikTok & programmatic. Every dinar engineered to convert.",
    tags: ["Paid Social", "Google Ads", "Programmatic"],
    span: "lg:col-span-3",
    accent: "royal",
  },
  {
    icon: Code2,
    title: "Website Development",
    desc: "Lightning-fast, high-converting websites & web apps. Built on modern stacks, engineered for scale.",
    tags: ["React", "Headless", "Core Web Vitals"],
    span: "lg:col-span-3",
    accent: "electric",
  },
  {
    icon: Palette,
    title: "Branding & Creative",
    desc: "Identity systems, art direction and motion that make ambitious brands impossible to ignore.",
    tags: ["Identity", "Art Direction", "Motion"],
    span: "lg:col-span-2",
    accent: "electric",
  },
  {
    icon: Target,
    title: "Lead Generation",
    desc: "Full-funnel pipelines, CRM automation and qualified demand that fills your sales team's calendar.",
    tags: ["Funnels", "CRM", "Automation"],
    span: "lg:col-span-2",
    accent: "royal",
  },
  {
    icon: Search,
    title: "SEO & Conversion",
    desc: "Technical SEO and CRO that compound — turning organic traffic into measurable, durable revenue.",
    tags: ["Technical SEO", "CRO", "Analytics"],
    span: "lg:col-span-2",
    accent: "royal",
  },
];

export const PROCESS = [
  { icon: Search, step: "01", title: "Discover", desc: "Deep market, audience and competitor research to map the real opportunity." },
  { icon: Lightbulb, step: "02", title: "Strategize", desc: "A data-backed growth roadmap with clear KPIs and revenue targets." },
  { icon: PenTool, step: "03", title: "Design", desc: "Cinematic, conversion-led design systems crafted for your brand." },
  { icon: Hammer, step: "04", title: "Build", desc: "Engineering fast, scalable websites, funnels and campaign infrastructure." },
  { icon: Rocket, step: "05", title: "Launch", desc: "Coordinated go-to-market with rigorous QA and real-time monitoring." },
  { icon: BarChart3, step: "06", title: "Scale", desc: "Relentless optimization — compounding returns month over month." },
];

export const INDUSTRIES = [
  { icon: Building2, name: "Real Estate" },
  { icon: ShoppingBag, name: "E-Commerce" },
  { icon: Hotel, name: "Hospitality" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Landmark, name: "Fintech" },
  { icon: Gem, name: "Luxury Retail" },
  { icon: Car, name: "Automotive" },
  { icon: UtensilsCrossed, name: "Food & Beverage" },
];

export const CASE_STUDIES = [
  {
    name: "Website Transformation",
    sector: "Tech · GCC",
    result: "Complete Re-platforming",
    desc: "A cinematic brand refresh and conversion-first booking experience that reduced dependence on third-party platforms.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000",
    metrics: [
      { k: "Conversion Increase", v: "+220%" },
      { k: "Load Time", v: "-40%" },
    ],
  },
  {
    name: "Lead Generation Campaign",
    sector: "Real Estate · Kuwait",
    result: "Hyper-Targeted Acquisition",
    desc: "Full-funnel performance marketing that turned browsers into a loyal, repeat customer base.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    metrics: [
      { k: "Leads Generated", v: "14,500+" },
      { k: "CPL", v: "-46%" },
    ],
  },
  {
    name: "Brand Growth Project",
    sector: "E-Commerce · Global",
    result: "Market Expansion",
    desc: "Identity systems, art direction and motion that make ambitious brands impossible to ignore.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000",
    metrics: [
      { k: "Engagement Growth", v: "5.4x" },
      { k: "Revenue", v: "+US$3.1M" },
    ],
  },
];

export const WHY_US = [
  {
    icon: Users,
    title: "Senior, Embedded Team",
    desc: "No juniors learning on your budget. Strategists, engineers and designers who've scaled real brands.",
  },
  {
    icon: LineChart,
    title: "Data-Driven, Always",
    desc: "Every decision tied to a metric. Transparent dashboards, weekly reporting, zero vanity numbers.",
  },
  {
    icon: Landmark,
    title: "GCC Market Expertise",
    desc: "Deep fluency in Kuwait and Gulf audiences, culture, channels and buying behaviour.",
  },
  {
    icon: Zap,
    title: "Built for Speed",
    desc: "Sub-second load times and rapid execution. We ship while competitors are still in meetings.",
  },
  {
    icon: ShieldCheck,
    title: "Partners, Not Vendors",
    desc: "We win when you win. Long-term relationships built on accountability and outcomes.",
  },
  {
    icon: Sparkles,
    title: "Design-Led Engineering",
    desc: "Awwwards-grade craft meets performance engineering — beauty that actually converts.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Luexe rebuilt our entire digital presence in eight weeks. Qualified leads nearly tripled and the brand finally feels world-class.",
    name: "Yousef Al-Sabah",
    role: "CEO, Skyline Properties",
  },
  {
    quote:
      "The most strategic team we've worked with in the Gulf. They obsess over ROAS the way we obsess over our product. 5.4x and climbing.",
    name: "Layla Haddad",
    role: "Founder, Aurum Commerce",
  },
  {
    quote:
      "From branding to booking flow, every detail felt intentional and premium. Direct bookings are up over 200%. Genuine growth partners.",
    name: "Omar Khalil",
    role: "Director, Meridian Hospitality",
  },
];

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Our Edge", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];
