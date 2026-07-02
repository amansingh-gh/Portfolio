import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Toaster, toast } from "sonner";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ExternalLink,
  Download,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  MapPin,
  Phone,
  Award,
  Code2,
  Database,
  Server,
  Cloud,
  GitBranch,
  Wrench,
  Terminal,
  Layers,
  CheckCircle,
  Send,
  Briefcase,
  ArrowUp,
} from "lucide-react";

import profileImage from "../assets/avatar.png";

// ─── Helper Components ───────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = 80;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round(end * (frame / totalFrames)));
      if (frame >= totalFrames) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/5 mb-5">
        {label}
      </span>
      <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Scroll Progress ─────────────────────────────────────────────────────────

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setP((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 z-[100] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        style={{ width: `${p}%`, transition: "width 80ms linear" }}
      />
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Education",
  "Contact",
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0B0F]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold font-display">
          <GradientText>AKS.</GradientText>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/resume/Aman_Singh_Resume.pdf"
            download="Aman_Singh_Resume.pdf"
            className="flex items-center gap-2 text-sm px-4 py-2 border border-blue-500/40 text-blue-400 rounded-lg hover:bg-blue-500/10 hover:border-blue-500/70 transition-all duration-200"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0D0D12]/95 backdrop-blur-2xl border-b border-white/5 px-6 py-4"
          >
            {NAV_LINKS.map((link) => (
              <a
                href="/resume/Aman_Singh_Resume.pdf"
                download
                className="mt-4 flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-xl z-50 relative"
              >
                <Download size={14} />
                Download Resume
              </a>
            ))}
            <a
              href="/resume/Aman_Singh_Resume.pdf"
              download="Aman_Singh_Resume.pdf"
              className="mt-4 flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors"
            >
              <Download size={14} />
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0F]"
    >
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-blob-1 absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="hero-blob-2 absolute bottom-[15%] right-[15%] w-[450px] h-[450px] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="hero-blob-3 absolute top-[55%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[80px]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0B0F]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          <FadeIn delay={0.05}>
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 hero-pulse" />
              Available for new opportunities
            </span>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="text-6xl lg:text-8xl font-bold text-white mb-3 leading-[1.05] font-display tracking-tight">
              Aman <GradientText>Kumar Singh</GradientText>
            </h1>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="text-xl lg:text-2xl text-blue-400 font-medium mb-5 font-display">
              Full Stack Developer, AI Engineer &amp; Generative AI
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed">
              Building elegant, scalable web applications and intelligent
              AI-powered experiences. Passionate about merging software
              engineering with generative AI to create products that truly
              matter.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/resume/Aman_Singh_Resume.pdf";
                  link.download = "Aman_Singh_Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download size={16} />
                Download Resume
              </button>
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 border border-white/15 text-white rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Mail size={16} /> Contact Me
              </a>
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-white transition-colors duration-200"
              >
                View Projects <ArrowRight size={16} />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.55}>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              {[
                {
                  icon: Github,
                  href: "https://github.com/amansingh-gh",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/amansingh-gh/",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:akamansingh07@gmail.com",
                  label: "Email",
                },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Avatar */}
        <FadeIn
          delay={0.2}
          direction="left"
          className="flex-shrink-0 order-1 lg:order-2"
        >
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl hero-pulse-slow" />
            {/* Gradient border */}
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full p-[3px] bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full p-[3px] bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900">
                  <img
                    src={profileImage}
                    alt="Aman Kumar Singh"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="badge-float-1 absolute -right-8 top-8 flex items-center gap-2 px-3.5 py-2.5 bg-[#16181D]/90 backdrop-blur-xl border border-white/10 rounded-xl text-xs text-white shadow-xl">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              1+ Years Exp
            </div>
            <div className="badge-float-2 absolute -left-10 bottom-10 flex items-center gap-2 px-3.5 py-2.5 bg-[#16181D]/90 backdrop-blur-xl border border-white/10 rounded-xl text-xs text-white shadow-xl">
              <CheckCircle size={12} className="text-emerald-400" />
              20+ Projects
            </div>
            <div className="badge-float-3 absolute left-4 -top-4 flex items-center gap-2 px-3.5 py-2.5 bg-[#16181D]/90 backdrop-blur-xl border border-white/10 rounded-xl text-xs text-white shadow-xl">
              <span className="text-yellow-400">⭐</span>
              Top Rated
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

const ABOUT_DETAILS = [
  { label: "Location", value: "New Delhi, India" },
  { label: "Email", value: "akamansingh07@gmail.com" },
  { label: "Available", value: "Immediately" },
  { label: "Preferred", value: "Remote / Hybrid" },
];

function About() {
  return (
    <section id="about" className="py-28 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn>
            <div>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/5 mb-6">
                About Me
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-display">
                Building Intelligent{" "}
                <GradientText>Digital Experiences</GradientText>
              </h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                I'm a Full Stack Developer and Gen AI Enthusiast with 1+ year of
                hands-on experience building scalable web applications and
                AI-powered solutions. I specialize in React, Node.js, and
                integrating LLMs into real-world products.
              </p>
              <p className="text-slate-400 mb-4 leading-relaxed">
                My passion lies at the intersection of software engineering and
                generative AI — from crafting smooth user interfaces to
                designing intelligent backends that leverage the latest
                foundation models and APIs.
              </p>
              <p className="text-slate-400 mb-10 leading-relaxed">
                When I'm not coding, I explore the latest in AI research,
                contribute to open-source projects, and experiment with
                LangChain, RAG pipelines, and multimodal models. Always curious,
                always building.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {ABOUT_DETAILS.map(({ label, value }) => (
                  <div
                    key={label}
                    className="p-4 rounded-xl bg-[#16181D] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <p className="text-[11px] text-slate-500 mb-1 uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-sm text-white font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="left">
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Concentric decorative rings */}
              {[0, 32, 64, 96].map((inset) => (
                <div
                  key={inset}
                  className="absolute rounded-full border border-white/5"
                  style={{ inset }}
                />
              ))}
              {/* Rotating outer ring */}
              <div className="absolute inset-0 rounded-full border border-blue-500/10 about-spin" />

              {/* Center card */}
              <div className="absolute inset-24 rounded-2xl bg-gradient-to-br from-blue-500/15 to-purple-500/15 border border-white/10 backdrop-blur flex flex-col items-center justify-center gap-1">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-display">
                  1+
                </div>
                <div className="text-xs text-slate-400">Years</div>
              </div>

              {/* Corner icons */}
              {[
                {
                  icon: Code2,
                  color: "text-blue-400",
                  pos: "top-3 left-1/2 -translate-x-1/2",
                },
                {
                  icon: Server,
                  color: "text-purple-400",
                  pos: "right-3 top-1/2 -translate-y-1/2",
                },
                {
                  icon: Database,
                  color: "text-cyan-400",
                  pos: "bottom-3 left-1/2 -translate-x-1/2",
                },
                {
                  icon: Cloud,
                  color: "text-indigo-400",
                  pos: "left-3 top-1/2 -translate-y-1/2",
                },
              ].map(({ icon: Icon, color, pos }) => (
                <div
                  key={pos}
                  className={`absolute ${pos} w-12 h-12 rounded-xl bg-[#16181D] border border-white/10 flex items-center justify-center ${color}`}
                >
                  <Icon size={20} />
                </div>
              ))}

              {/* Glow */}
              <div className="absolute inset-[30%] rounded-full bg-blue-500/10 blur-2xl" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────

const SKILL_CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Vue.js", level: 75 },
      // { name: "Redux / Zustand", level: 75 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 95 },
      { name: "Express", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "Django", level: 78 },
      // { name: "GraphQL", level: 82 },
      // { name: "tRPC", level: 80 },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    skills: [
      { name: "MongoDB", level: 95 },
      { name: "MySQL", level: 92 },
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 80 },
      // { name: "Prisma ORM", level: 88 },
      { name: "Firebase", level: 86 },
    ],
  },
  // {
  //   id: "cloud",
  //   label: "Cloud & DevOps",
  //   icon: Cloud,
  //   skills: [
  //     { name: "AWS", level: 80 },
  //     { name: "Docker", level: 88 },
  //     { name: "Kubernetes", level: 72 },
  //     { name: "Vercel / Railway", level: 93 },
  //     { name: "CI/CD Pipelines", level: 85 },
  //     { name: "Nginx", level: 78 },
  //   ],
  // },
  {
    id: "languages",
    label: "Languages",
    icon: Terminal,
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 90 },
      { name: "Java", level: 70 },
      { name: "SQL", level: 88 },
      { name: "Bash", level: 90 },
    ],
  },
  {
    id: "tools",
    label: "Tools & AI",
    icon: Wrench,
    skills: [
      { name: "Git / GitHub", level: 96 },
      { name: "Figma", level: 80 },
      { name: "OpenAI API", level: 86 },
      { name: "LangChain", level: 78 },
      { name: "Postman", level: 95 },
      // { name: "Jira / Linear", level: 85 },
    ],
  },
];

function Skills() {
  const [active, setActive] = useState("frontend");
  const current = SKILL_CATEGORIES.find((c) => c.id === active)!;

  return (
    <section id="skills" className="py-28 bg-[#0D0D12]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Technical Skills"
            title={
              <>
                My Tech <GradientText>Stack</GradientText>
              </>
            }
            subtitle="A comprehensive set of tools and technologies I use to build exceptional products"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {SKILL_CATEGORIES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active === id
                    ? "bg-blue-500 text-white shadow-[0_0_24px_rgba(59,130,246,0.35)]"
                    : "bg-[#16181D] text-slate-400 hover:text-white border border-white/5 hover:border-white/15"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {current.skills.map(({ name, level }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="group p-5 rounded-2xl bg-[#16181D] border border-white/5 hover:border-blue-500/30 hover:bg-[#1a1c23] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(59,130,246,0.1)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium text-sm">{name}</span>
                  <span className="text-xs text-blue-400 font-mono font-semibold">
                    {level}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.06 + 0.15,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    company: "Healthletic Lifestyle",
    role: "Backend Developer",
    duration: "Jun 2026 – Present",
    location: "Gurugram, India (Remote)",
    description:
      "Developing scalable backend solutions by building secure RESTful APIs, implementing authentication and database operations, validating and documenting APIs, integrating third-party services, and collaborating with engineering teams to deliver reliable, production-ready applications.",
    tech: ["Node.js", "MongoDB", "Swagger", "REST APIs", "Mongoose"],
    current: true,
  },
];

function Experience() {
  return (
    <section id="experience" className="py-28 bg-[#0B0B0F]">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Work History"
            title={
              <>
                Professional <GradientText>Experience</GradientText>
              </>
            }
            subtitle="My professional journey building full-stack apps and AI-powered products"
          />
        </FadeIn>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-purple-500/40 to-transparent" />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <FadeIn key={exp.company} delay={i * 0.1}>
                <div className="relative pl-20">
                  <div
                    className={`absolute left-6 top-6 w-4 h-4 rounded-full border-2 transition-all ${
                      exp.current
                        ? "border-blue-500 bg-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.7)]"
                        : "border-slate-600 bg-[#0B0B0F]"
                    }`}
                  />
                  <div className="group p-6 lg:p-7 rounded-2xl bg-[#16181D] border border-white/5 hover:border-blue-500/20 hover:bg-[#1a1c23] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(59,130,246,0.07)]">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-white font-display">
                            {exp.company}
                          </h3>
                          {exp.current && (
                            <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-blue-400 font-medium text-sm">
                          {exp.role}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">{exp.duration}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {exp.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs bg-blue-500/8 text-blue-300 border border-blue-500/20 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: "ResumeIQ AI",
    description:
      "An AI-powered resume intelligence platform that delivers ATS evaluation, contextual resume insights, resume-aware AI conversations, secure PDF processing, and personalized career recommendations through Large Language Models.",
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Groq",
      "Tailwind CSS",
    ],
    github: "https://github.com/amansingh-gh/ResumeIQ--Backend",
    demo: "https://resume-iq-frontend-seven.vercel.app/",
    featured: true,
    category: "Generative AI",
    gradient: "from-blue-500 to-cyan-400",
  },

  {
    title: "Heart-AI",
    description:
      "An intelligent cardiovascular diagnosis platform combining machine learning and deep learning to analyze clinical data and ECG images for real-time heart disease prediction with an interactive analytics dashboard.",
    tech: ["Python", "Flask", "TensorFlow", "XGBoost", "SQLite", "Chart.js"],
    github: "https://github.com/amansingh-gh/Heart-AI",
    demo: "https://heart-disease-pred-4z15.onrender.com/",
    featured: true,
    category: "Artificial Intelligence",
    gradient: "from-red-500 to-pink-500",
  },
  {
    title: "SimpleSolHub",
    description:
      "A full-stack service marketplace connecting customers with local professionals through role-based authentication, provider management, admin controls, and secure PHP-MySQL architecture. Built to simulate real-world service discovery and marketplace workflows.",
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap", "HTML/CSS"],
    github: "https://github.com/amansingh-gh/SimpleSolHub",
    demo: "https://simplesolhub.unaux.com/",
    featured: true,
    category: "Marketplace Platform",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "AirVision",
    description:
      "A predictive air quality analytics platform that monitors environmental conditions in real time and forecasts PM2.5 levels using deep learning, interactive dashboards, and public environmental datasets.",
    tech: ["Python", "Flask", "LSTM", "Pandas", "NumPy", "Chart.js"],
    github: "https://github.com/amansingh-gh/AirVision-Python",
    demo: "https://airvision-python.onrender.com/",
    featured: false,
    category: "Data Science",
    gradient: "from-emerald-500 to-teal-400",
  },

  {
    title: "Contact Vault Backend",
    description:
      "A secure contact management backend engineered with RESTful architecture, JWT authentication, MongoDB, and scalable Express.js services. Designed to demonstrate clean API development, protected routes, and production-ready backend engineering practices.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "Mongoose"],
    github: "https://github.com/amansingh-gh/ContactVault---Backend",
    demo: "https://github.com/amansingh-gh/ContactVault---Backend",
    featured: false,
    category: "Backend Engineering",
    gradient: "from-sky-500 to-blue-500",
  },

  {
    title: "JournalApp Backend",
    description:
      "Enterprise-grade journaling backend built with Spring Boot and Spring Security. Implements JWT authentication, RESTful APIs, layered architecture, and persistent data management to deliver a secure and scalable user experience.",
    tech: ["Spring Boot", "Spring Security", "Java", "JWT", "MySQL"],
    github: "https://github.com/amansingh-gh/JournalApp-Backend#",
    demo: "https://github.com/amansingh-gh/JournalApp-Backend",
    featured: false,
    category: "Backend Engineering",
    gradient: "from-green-500 to-emerald-400",
  },
];

function ProjectCard({
  project,
  featured = false,
}: {
  project: (typeof PROJECTS)[0];
  featured?: boolean;
}) {
  return (
    <div
      className={`group relative flex flex-col p-6 rounded-2xl bg-[#16181D] border border-white/5 hover:border-white/12 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Top gradient bar */}
      <div
        className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${project.gradient} opacity-70 group-hover:opacity-100 transition-opacity`}
      />

      <div className="flex items-start justify-between gap-4 mb-4 mt-2">
        <div>
          {featured && (
            <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full mb-2">
              ⭐ Featured
            </span>
          )}
          <span className="block text-[11px] text-slate-500 uppercase tracking-wider mb-1">
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors font-display">
            {project.title}
          </h3>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <a
            href={project.github}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
            aria-label="GitHub"
          >
            <Github size={14} />
          </a>
          <a
            href={project.demo}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
            aria-label="Live demo"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-xs bg-white/4 text-slate-300 border border-white/8 rounded-lg"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-28 bg-[#0D0D12]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Portfolio"
            title={
              <>
                Featured <GradientText>Projects</GradientText>
              </>
            }
            subtitle="A selection of projects I'm proud to have built — from idea to production"
          />
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.07}>
              <ProjectCard project={project} featured={project.featured} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25}>
          <div className="text-center mt-12">
            <a
              href="https://github.com/amansingh-gh/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-slate-400 hover:text-white hover:border-white/25 rounded-xl transition-all text-sm"
            >
              View All Projects on GitHub <Github size={16} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Education ───────────────────────────────────────────────────────────────

const EDUCATION = [
  {
    school: "Sharda University",
    degree: "MCA — Computer Science & Application",
    duration: "2024 – 2026",
    gpa: "9.27 / 10.0",
    highlights: [
      "Specialized in AI & Machine Learning",
      "Built AI-powered final year project using Deep Learning, Real time forecasting",
      "Active contributor to tech community",
      "Participated in college hackathon",
    ],
  },
  {
    school: "JIS College of Engineering",
    degree: "BCA — Computer Science & Application",
    duration: "2021 – 2024",
    gpa: "8.14 / 10.0",
    highlights: [
      "Specialized in Web Development",
      "Built a full-fledged final-year project that ranked among the top projects in the class.",
      "Active contributor to tech community",
      "Always learned things easily and adapt requirements.",
    ],
  },
];

function Education() {
  return (
    <section id="education" className="py-28 bg-[#0B0B0F]">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Academic Background"
            title={
              <>
                My <GradientText>Education</GradientText>
              </>
            }
          />
        </FadeIn>

        <div className="relative pl-20">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 to-transparent" />
          {EDUCATION.map((edu, i) => (
            <FadeIn key={edu.school} delay={i * 0.1}>
              <div className="relative">
                <div className="absolute -left-12 top-6 w-4 h-4 rounded-full border-2 border-purple-500 bg-purple-500 shadow-[0_0_14px_rgba(139,92,246,0.6)]" />
                <div className="p-6 lg:p-7 rounded-2xl bg-[#16181D] border border-white/5 hover:border-purple-500/20 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 font-display">
                        {edu.school}
                      </h3>
                      <p className="text-purple-400 font-medium">
                        {edu.degree}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">{edu.duration}</p>
                      <p className="text-sm font-mono font-semibold text-blue-400 mt-0.5">
                        GPA: {edu.gpa}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((h) => (
                      <span
                        key={h}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-purple-500/8 text-purple-300 border border-purple-500/20 rounded-lg"
                      >
                        <CheckCircle size={10} />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Certifications ───────────────────────────────────────────────────────────

const CERTS = [
  {
    org: "Sharda Informatics",
    name: "Data Visualization using Power BI",
    date: "May 2025",
    gradient: "from-orange-500 to-amber-400",
    abbr: "SHARDA",
    verifyUrl:
      "https://drive.google.com/file/d/1-6055q-yzv4hNpHZ_rB48hbUfnrn6310/view?usp=drive_link",
  },
  {
    org: "Sharda Informatics",
    name: "Prompt Engineering",
    date: "Jan 2025",
    gradient: "from-blue-500 to-cyan-400",
    abbr: "SHARDA",
    verifyUrl:
      "https://drive.google.com/file/d/11s5OHjkKlr0vVAq2DD592i7jI0JctE3M/view?usp=drive_link",
  },
  {
    org: "TechSaksham",
    name: "AI: Transformative Learning",
    date: "Jan 2025",
    gradient: "from-blue-600 to-blue-400",
    abbr: "Microsoft",
    verifyUrl:
      "https://drive.google.com/file/d/1lCwNcZkV44ufedjv8JEiYVdD2raO-hoc/view?usp=sharing",
  },
  {
    org: "Udemy",
    name: "Python Pro",
    date: "Mar 2024",
    gradient: "from-indigo-500 to-violet-500",
    abbr: "Udemy",
    verifyUrl:
      "https://udemy-certificate.s3.amazonaws.com/pdf/UC-a1fde949-01e8-4ecd-9bd6-70d945faf198.pdf",
  },
  {
    org: "Udemy",
    name: "Mastering in C",
    date: "Jan 2022",
    gradient: "from-purple-600 to-violet-400",
    abbr: "Udemy",
    verifyUrl:
      "https://www.udemy.com/certificate/UC-e829b325-58d7-4f3d-959e-19f57cb6b74a/",
  },
];

function Certifications() {
  return (
    <section id="certifications" className="py-28 bg-[#0D0D12]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Credentials"
            title={
              <>
                <GradientText>Certifications</GradientText>
              </>
            }
            subtitle="Industry-recognized certifications validating my technical expertise"
          />
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTS.map((cert, i) => (
            <FadeIn key={cert.name} delay={i * 0.07}>
              <div className="group p-5 rounded-2xl bg-[#16181D] border border-white/5 hover:border-white/12 hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-lg`}
                  >
                    {cert.abbr}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-slate-500 mb-1 uppercase tracking-wider">
                      {cert.org}
                    </p>
                    <h4 className="text-sm font-semibold text-white leading-snug mb-3">
                      {cert.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-mono">
                        {cert.date}
                      </span>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink size={10} />
                        Verify
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────

const STATS = [
  {
    value: 20,
    suffix: "+",
    label: "Projects Completed",
    icon: Layers,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    value: 150,
    suffix: "+",
    label: "GitHub Contributions",
    icon: GitBranch,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    value: 300,
    suffix: "+",
    label: "Problems Solved",
    icon: Code2,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    value: 1,
    suffix: "+",
    label: "Years Experience",
    icon: Briefcase,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    value: 6,
    suffix: "",
    label: "Certifications",
    icon: Award,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    value: 5,
    suffix: "K+",
    label: "Lines Written Daily",
    icon: Terminal,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
];

function Achievements() {
  return (
    <section id="achievements" className="py-28 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="By The Numbers"
            title={
              <>
                Key <GradientText>Achievements</GradientText>
              </>
            }
            subtitle="A snapshot of my professional journey and contributions"
          />
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.07}>
              <div
                className={`group p-6 lg:p-7 rounded-2xl bg-[#16181D] border ${stat.border} hover:bg-[#1a1c23] hover:-translate-y-1 transition-all duration-200 text-center`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-5`}
                >
                  <stat.icon size={22} />
                </div>
                <div
                  className={`text-4xl font-bold ${stat.color} mb-2 font-mono`}
                >
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "akamansingh07@gmail.com",
    href: "mailto:akamansingh07@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6203553465",
    href: "tel:+916203553465",
  },
  { icon: MapPin, label: "Location", value: "New Delhi, India", href: "#" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/amansingh-gh",
    href: "https://www.linkedin.com/in/amansingh-gh/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/amansingh-gh",
    href: "https://github.com/amansingh-gh",
  },
];

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      toast.success("Message sent! I'll respond within 24 hours.", {
        description: "Looking forward to connecting with you.",
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-[#16181D] border border-white/8 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all text-sm";

  return (
    <section id="contact" className="py-28 bg-[#0D0D12]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionHeader
            label="Get In Touch"
            title={
              <>
                Let's <GradientText>Work Together</GradientText>
              </>
            }
            subtitle="Open to full-time roles, freelance projects, and consulting. Let's build something great."
          />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <FadeIn>
            <div>
              <p className="text-slate-400 leading-relaxed mb-8">
                Whether you have a specific project in mind, a job opportunity,
                or just want to say hello — my inbox is always open. I typically
                respond within 24 hours.
              </p>
              <div className="space-y-3">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-[#16181D] border border-white/5 hover:border-blue-500/25 hover:bg-[#1a1c23] transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-slate-500 uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm text-white truncate">{value}</p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all"
                    />
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="John Smith"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="john@company.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subject: e.target.value }))
                  }
                  placeholder="Project inquiry / Job opportunity / Consulting"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Tell me about your project or opportunity..."
                  required
                  rows={6}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-10 bg-[#0B0B0F] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold mb-1 font-display">
              <GradientText>AKS.</GradientText>
            </div>
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} Aman Kumar Singh · Built with React &
              Tailwind
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {[
              {
                icon: Github,
                href: "https://github.com/amansingh-gh",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/amansingh-gh/",
                label: "LinkedIn",
              },
              { icon: Twitter, href: "#", label: "Twitter" },
              {
                icon: Mail,
                href: "mailto:akamansingh07@gmail.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/8 text-slate-500 hover:text-white hover:border-white/25 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors group"
          >
            Back to top
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
const FAVICON_B64 = "";

export default function App() {
  useEffect(() => {
    const existing = document.querySelector(
      "link[rel~='icon']",
    ) as HTMLLinkElement | null;
    const link: HTMLLinkElement = existing ?? document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = FAVICON_B64;
    if (!existing) document.head.appendChild(link);
    document.title = "Aman Singh | Full Stack Developer & Gen AI";
  }, []);

  return (
    <div
      className="min-h-screen bg-[#0B0B0F]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        .font-display { font-family: 'Bricolage Grotesque', sans-serif; }

        @keyframes hero-blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, -60px) scale(1.12); }
          66%       { transform: translate(-25px, 30px) scale(0.92); }
        }
        @keyframes hero-blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-40px, 60px) scale(0.9); }
          66%       { transform: translate(25px, -30px) scale(1.1); }
        }
        @keyframes hero-blob-3 {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50%       { transform: translateX(-50%) scale(1.25); }
        }
        @keyframes badge-float-1 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes badge-float-2 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(7px); }
        }
        @keyframes badge-float-3 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes about-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes hero-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
          50%       { opacity: 0.7; box-shadow: 0 0 0 5px rgba(52,211,153,0); }
        }
        @keyframes hero-pulse-slow {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.5; }
        }

        .hero-blob-1 { animation: hero-blob-1 9s ease-in-out infinite; }
        .hero-blob-2 { animation: hero-blob-2 11s ease-in-out infinite; }
        .hero-blob-3 { animation: hero-blob-3 7s ease-in-out infinite; }
        .badge-float-1 { animation: badge-float-1 3.5s ease-in-out infinite; }
        .badge-float-2 { animation: badge-float-2 4.2s ease-in-out infinite; }
        .badge-float-3 { animation: badge-float-3 3.8s ease-in-out infinite 0.5s; }
        .about-spin { animation: about-spin 30s linear infinite; }
        .hero-pulse { animation: hero-pulse 2s ease-in-out infinite; }
        .hero-pulse-slow { animation: hero-pulse-slow 3.5s ease-in-out infinite; }

        html { scroll-behavior: smooth; }
        * { scroll-margin-top: 72px; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.35); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.6); }
      `}</style>

      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <Achievements />
      <Contact />
      <Footer />
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#16181D",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#F1F5F9",
          },
        }}
      />
    </div>
  );
}
