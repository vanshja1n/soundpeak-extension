import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ChevronDown,
  Download,
  Gem,
  Github,
  MousePointerClick,
  Shield,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";
import logo from "@/assets/logo.png";
import banner from "@/assets/soundpeak-banner.png";
import popup from "@/assets/popup-screenshot.png";

const DOWNLOAD = "https://github.com/vanshja1n/soundpeak-extension/archive/refs/heads/main.zip";
const REPO = "https://github.com/vanshja1n/soundpeak-extension";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SoundPeak — Volume Booster & Audio Enhancer for Chrome" },
      {
        name: "description",
        content:
          "Boost any tab's volume up to 600% and enjoy richer, crystal clear sound. Free, open-source Chrome extension.",
      },
      { property: "og:title", content: "SoundPeak — Volume Booster & Audio Enhancer" },
      {
        property: "og:description",
        content: "Turn up the volume. Enjoy richer sound. Boost Chrome audio up to 600%.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

function DownloadButton({
  label = "Download free",
  tone = "gold",
}: {
  label?: string;
  tone?: "gold" | "ink";
}) {
  const base =
    "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-8 py-4 font-display text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5";
  const skin =
    tone === "gold"
      ? "bg-gold text-ink shadow-gold hover:brightness-[1.06]"
      : "bg-ink text-foreground ring-1 ring-ink/50 hover:ring-foreground/30";
  return (
    <a href={DOWNLOAD} className={`${base} ${skin}`}>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/35 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
      <Download className="h-5 w-5" />
      {label}
    </a>
  );
}

function Equalizer() {
  const bars = [34, 58, 82, 46, 100, 66, 90, 40, 72, 54, 86, 30];
  return (
    <div className="flex h-9 items-end gap-[5px]" aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className="eq-bar"
          style={{ height: `${h}%`, animationDelay: `${i * 110}ms` }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#showcase", label: "Showcase" },
  { href: "#install", label: "Install" },
  { href: "#faq", label: "FAQ" },
];

const stats = [
  { value: "600%", label: "Peak boost" },
  { value: "4", label: "One-click presets" },
  { value: "0", label: "Accounts or tracking" },
  { value: "1 min", label: "To install" },
];

const features = [
  {
    icon: Volume2,
    title: "Boost up to 600%",
    text: "Push quiet videos, calls and music far past Chrome's normal ceiling.",
  },
  {
    icon: Sparkles,
    title: "Enhance audio",
    text: "A richer, fuller presentation that lifts voices and fine detail.",
  },
  {
    icon: Gem,
    title: "Crystal clear",
    text: "High quality output that keeps the harsh edge off when you push it.",
  },
  {
    icon: MousePointerClick,
    title: "One-click presets",
    text: "Jump straight to 100%, 200%, 400% or 600% — no fiddling.",
  },
  {
    icon: Zap,
    title: "Lightweight",
    text: "A tiny footprint that stays out of the way of your browser.",
  },
  {
    icon: Shield,
    title: "Open source",
    text: "The code is public on GitHub. No accounts, no tracking, no ads.",
  },
];

const steps = [
  {
    title: "Download and unzip",
    text: "Grab the ZIP from GitHub and extract the folder anywhere.",
  },
  { title: "Open the extensions page", text: "Visit chrome://extensions in a Chrome tab." },
  { title: "Enable Developer mode", text: "Flip the switch in the top-right corner of the page." },
  {
    title: "Load unpacked",
    text: "Click “Load unpacked” and select the unzipped SoundPeak folder.",
  },
];

const faqs = [
  {
    q: "Is SoundPeak free?",
    a: "Yes. It is free and open source — the full code lives on GitHub and you can read it before you install.",
  },
  {
    q: "Do I need an account or a login?",
    a: "No. There is nothing to sign up for and nothing to connect. Install it and it works.",
  },
  {
    q: "Which browsers does it work on?",
    a: "Any Chromium-based browser: Chrome, Edge, Brave, Opera and their siblings.",
  },
  {
    q: "Why is it loaded manually instead of from the Web Store?",
    a: "It ships as an unpacked extension. You download the folder and load it in Chrome's developer mode — the four steps above take under a minute.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background font-sans text-foreground antialiased">
      <header className="sticky top-0 z-50 glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl ring-1 ring-primary/30">
              <img src={logo} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              Sound<span className="text-gold">Peak</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={REPO}
              aria-label="SoundPeak on GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
            <a
              href={DOWNLOAD}
              className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-display text-sm font-semibold text-ink shadow-gold transition-all hover:-translate-y-0.5 hover:brightness-[1.06] sm:inline-flex"
            >
              <Download className="h-4 w-4" /> Get it free
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------------- Hero ---------------- */}
        <section className="relative">
          <div className="aura -top-32 left-1/2 h-[560px] w-[900px] -translate-x-1/2" />
          <div className="aura -right-40 top-40 h-[420px] w-[520px]" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-20 pt-16 md:grid-cols-[1.05fr_0.95fr] md:pb-28 md:pt-24">
            <div>
              <Reveal>
                <Eyebrow>Free · Open source · Chrome &amp; Chromium</Eyebrow>
              </Reveal>

              <Reveal delay={90}>
                <h1 className="mt-7 font-display text-[clamp(2.9rem,6.2vw,4.9rem)] font-semibold leading-[1.03] tracking-[-0.02em]">
                  Sound, raised
                  <br />
                  to its <span className="text-gold">peak</span>.
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Volume Booster &amp; Audio Enhancer
                </p>
              </Reveal>

              <Reveal delay={220}>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
                  Push any tab past Chrome's ceiling — up to{" "}
                  <b className="font-semibold text-foreground">600%</b> — with richer, clearer
                  audio, in a single click. No accounts, nothing to configure.
                </p>
              </Reveal>

              <Reveal delay={280}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <DownloadButton />
                  <a
                    href="#install"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 font-display text-lg font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary/60"
                  >
                    How it installs <ArrowDown className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={340}>
                <div className="mt-10 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  <Equalizer />
                  <span>Works on any Chromium browser</span>
                </div>
              </Reveal>
            </div>

            {/* Product window */}
            <Reveal delay={200} className="relative">
              <div className="drift relative mx-auto max-w-md">
                <div className="panel gold-edge rounded-[1.75rem] p-3">
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <span className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                    </span>
                    <span className="flex-1 truncate rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground">
                      chrome://extensions — SoundPeak
                    </span>
                  </div>
                  <img
                    src={popup}
                    alt="The SoundPeak extension popup showing the volume level and presets"
                    className="w-full rounded-[1.15rem] ring-1 ring-foreground/10"
                  />
                </div>

                <div className="absolute -bottom-6 -left-8 hidden sm:block">
                  <div className="panel rounded-2xl px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Presets
                    </p>
                    <p className="mt-1 font-display text-base font-semibold">
                      <span className="text-gold">100 · 200 · 400 · 600</span>
                    </p>
                  </div>
                </div>

                <div className="absolute -top-8 -right-4 hidden sm:block">
                  <div className="panel rounded-2xl px-4 py-3 text-center">
                    <p className="font-display text-2xl font-semibold text-gold">600%</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Ceiling
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stat strip */}
          <div className="relative mx-auto max-w-6xl px-6">
            <Reveal>
              <dl className="panel grid grid-cols-2 divide-border rounded-3xl md:grid-cols-4 md:divide-x">
                {stats.map((s) => (
                  <div key={s.label} className="px-6 py-7 text-center">
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-semibold text-gold">
                        {s.value}
                      </span>
                      <span className="mt-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Features ---------------- */}
        <section id="features" className="relative scroll-mt-24 py-24 md:py-32">
          <div className="aura -left-52 top-24 h-[460px] w-[520px]" />
          <div className="relative mx-auto max-w-6xl px-6">
            <Reveal className="max-w-2xl">
              <Eyebrow>What you get</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2.1rem,4vw,3.2rem)] font-semibold leading-tight tracking-[-0.02em]">
                Feel the <span className="text-gold">difference</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Six things SoundPeak does well, and nothing it doesn't need to do.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 70}>
                  <div className="group h-full rounded-3xl panel p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold shadow-gold">
                      <f.icon className="h-[22px] w-[22px] text-ink" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold">{f.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-muted-foreground">{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Showcase ---------------- */}
        <section id="showcase" className="relative scroll-mt-24 pb-24 md:pb-32">
          <div className="aura left-1/2 top-1/4 h-[420px] w-[760px] -translate-x-1/2" />
          <div className="relative mx-auto max-w-6xl px-6">
            <Reveal>
              <div className="panel gold-edge rounded-[2rem] p-4 md:p-8">
                <img
                  src={banner}
                  alt="SoundPeak — Volume Booster & Audio Enhancer"
                  className="w-full rounded-[1.35rem] ring-1 ring-foreground/10"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-center text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                The whole idea, on one card
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Install ---------------- */}
        <section id="install" className="relative scroll-mt-24 pb-20 md:pb-28">
          <div className="aura right-0 top-10 h-[380px] w-[460px]" />
          <div className="relative mx-auto max-w-3xl px-6">
            <Reveal className="text-center">
              <Eyebrow>Setup</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.02em]">
                Installed in under a minute
              </h2>
            </Reveal>

            <ol className="relative mt-14 space-y-5">
              <span
                className="gold-rule absolute left-[27px] top-4 h-[calc(100%-2rem)] w-px"
                aria-hidden
              />
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <li className="relative flex items-start gap-5 rounded-3xl panel p-6">
                    <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold font-display text-lg font-semibold text-ink shadow-gold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                      <p className="mt-1 text-muted-foreground">{s.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section id="faq" className="relative scroll-mt-24 pb-24 md:pb-32">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal className="text-center">
              <Eyebrow>Good to know</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.02em]">
                Questions, answered
              </h2>
            </Reveal>

            <div className="mt-12 space-y-3">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <details className="group panel overflow-hidden rounded-2xl px-6 py-5">
                    <summary className="no-marker flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold">
                      {f.q}
                      <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Final CTA ---------------- */}
        <section className="relative px-6 pb-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gold px-8 py-16 text-center md:px-16 md:py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,oklch(1_0_0/35%),transparent_55%)]" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/70">
                    Free · Open source · No tracking
                  </p>
                  <h2 className="mt-5 font-display text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
                    Turn it up.
                  </h2>
                  <p className="mx-auto mt-4 max-w-md text-ink/70">
                    Download the folder, load it in Chrome, and give every tab the volume it should
                    have had.
                  </p>
                  <div className="mt-9 flex flex-wrap justify-center gap-4">
                    <DownloadButton label="Download SoundPeak" tone="ink" />
                    <a
                      href={REPO}
                      className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-4 font-display text-lg font-semibold text-ink transition-colors hover:bg-ink/10"
                    >
                      <Github className="h-5 w-5" /> View source
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg ring-1 ring-primary/25">
              <img src={logo} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-base font-semibold text-foreground">
              Sound<span className="text-gold">Peak</span>
            </span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-7">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            ))}
            <a href={REPO} className="transition-colors hover:text-foreground">
              GitHub
            </a>
          </nav>
          <p>© {new Date().getFullYear()} SoundPeak. Turn up the volume.</p>
        </div>
      </footer>
    </div>
  );
}
