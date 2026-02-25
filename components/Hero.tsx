// components/Hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Customer Satisfaction", value: "98%" },
  { label: "Projects Delivered", value: "120+" },
  { label: "Active Users", value: "50K+" },
  { label: "Average Rating", value: "4.9" },
];

const headline = "W E L C O M E  I T Z  F I Z Z";

export default function Hero() {
  const [isDark, setIsDark] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const carRef = useRef<HTMLDivElement | null>(null);
  const bgLayerBackRef = useRef<HTMLDivElement | null>(null);
  const bgLayerMidRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Initial entrance timeline (runs on load only)
      const introTl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      const headlineChars = headlineRef.current?.querySelectorAll(".headline-char");
      const statItems = statsRef.current?.querySelectorAll(".stat-item");

      if (headlineChars && headlineChars.length > 0) {
        introTl.from(headlineChars, {
          yPercent: 100,
          opacity: 0,
          stagger: 0.035,
        });
      }

      introTl.from(
        ".hero-subtitle",
        {
          y: 10,
          opacity: 0,
        },
        "-=0.4"
      );

      if (statItems && statItems.length > 0) {
        introTl.from(
          statItems,
          {
            y: 12,
            opacity: 0,
            stagger: 0.08,
          },
          "-=0.3"
        );
      }

      introTl.from(
        scrollIndicatorRef.current,
        {
          y: -8,
          opacity: 0,
        },
        "-=0.4"
      );

      // Scroll-driven timeline (pinned hero)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
        defaults: {
          ease: "power2.out",
        },
      });

      // Car trajectory and scale as user scrolls
      if (carRef.current) {
        scrollTl.fromTo(
          carRef.current,
          {
            yPercent: 40,
            xPercent: -40,
            scale: 0.8,
            rotate: -12,
          },
          {
            yPercent: -20,
            xPercent: 30,
            scale: 1.15,
            rotate: 6,
          },
          0
        );
      }

      // Parallax background layers
      if (bgLayerBackRef.current) {
        scrollTl.to(
          bgLayerBackRef.current,
          {
            yPercent: -25,
          },
          0
        );
      }

      if (bgLayerMidRef.current) {
        scrollTl.to(
          bgLayerMidRef.current,
          {
            yPercent: -40,
          },
          0
        );
      }

      // Dim headline slightly and lift stats as scroll progresses
      if (headlineRef.current) {
        scrollTl.to(
          headlineRef.current,
          {
            yPercent: -10,
            opacity: 0.7,
          },
          0
        );
      }

      if (statsRef.current) {
        scrollTl.to(
          statsRef.current,
          {
            yPercent: -10,
            opacity: 0.95,
          },
          0
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const letters = headline.split("");

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen w-full overflow-hidden ${
        isDark
          ? "bg-black text-white"
          : "bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900"
      }`}
    >
      {/* Parallax background layers */}
      <div
        ref={bgLayerBackRef}
        className="pointer-events-none absolute inset-0 opacity-40"
      >
        <div
          className={`absolute -left-40 -top-40 h-80 w-80 rounded-full blur-3xl ${
            isDark ? "bg-emerald-500/40" : "bg-emerald-300/60"
          }`}
        />
        <div
          className={`absolute right-0 bottom-[-6rem] h-96 w-96 rounded-full blur-3xl ${
            isDark ? "bg-cyan-500/40" : "bg-cyan-300/70"
          }`}
        />
      </div>

      <div
        ref={bgLayerMidRef}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className={`absolute inset-y-0 left-1/2 w-[1px] opacity-40 ${
            isDark ? "bg-slate-700" : "bg-slate-200"
          }`}
        />
        <div
          className={`absolute inset-x-10 top-1/3 h-px opacity-40 ${
            isDark ? "bg-slate-800" : "bg-slate-200"
          }`}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top bar with logo + theme toggle */}
        <header className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
          <div className="flex items-center gap-3">
            <div
              className={`h-9 w-9 rounded-2xl border text-xs font-semibold uppercase tracking-[0.18em] flex items-center justify-center ${
                isDark
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                  : "border-emerald-400/70 bg-emerald-50 text-emerald-700"
              }`}
            >
              IF
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-[0.32em] uppercase">
                ItzFizz
              </span>
              <span
                className={`text-[10px] tracking-[0.2em] uppercase ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Digital Experiences
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className={`relative flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors ${
              isDark
                ? "border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-600"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
            }`}
          >
            <span
              className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                isDark
                  ? "bg-yellow-400 text-black"
                  : "bg-slate-900 text-yellow-300"
              }`}
            >
              {isDark ? "☾" : "☼"}
            </span>
            <span>{isDark ? "Dark" : "Light"}</span>
          </button>
        </header>

        {/* Main hero row */}
        <div className="relative flex flex-1 flex-col px-6 pb-10 pt-8 md:flex-row md:items-center md:justify-between md:px-10 md:pb-14 md:pt-10">
          {/* Left: Headline + stats */}
          <div className="relative z-10 max-w-xl">
            <div
              ref={headlineRef}
              className="mb-4 flex flex-wrap text-[10px] md:text-[12px] tracking-[0.5em] uppercase text-slate-400"
              aria-label={headline.replace(/\s+/g, " ")}
            >
              {letters.map((char, index) => (
                <span
                  key={`${char}-${index}-${Math.random()}`}
                  className={`headline-char inline-block ${
                    char === " " ? "w-[0.6em]" : ""
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>

            <h1 className="hero-subtitle text-3xl leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight font-semibold tracking-tight mb-4 md:mb-6">
              Scroll to drive
              <br />
              the <span className="text-brand">ItzFizz</span> experience.
            </h1>

            <p
              className={`hero-subtitle mb-8 max-w-md text-sm md:text-base ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Precision-crafted hero motion powered by GSAP ScrollTrigger,
              tuned for 60fps and built to feel effortlessly premium.
            </p>

            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-4 md:gap-6 max-w-md"
            >
              {stats.map((item) => (
                <div
                  key={item.label}
                  className={`stat-item rounded-2xl border px-4 py-3 md:px-5 md:py-4 transition-colors ${
                    isDark
                      ? "border-slate-800/90 bg-slate-900/60"
                      : "border-slate-200 bg-white/80"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-lg md:text-2xl font-semibold">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Car visual */}
          <div className="pointer-events-none relative mt-10 flex flex-1 items-center justify-center md:mt-0">
            <div
              ref={carRef}
              className="relative w-[240px] md:w-[320px] lg:w-[360px] aspect-[4/2.3]"
            >
              <div
                className={`absolute inset-4 rounded-[32px] ${
                  isDark
                    ? "bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/40"
                    : "bg-gradient-to-br from-white via-slate-50 to-slate-100"
                } shadow-soft-glow`}
              />
              <div
                className={`absolute -inset-x-4 -bottom-8 h-16 rounded-full blur-2xl ${
                  isDark ? "bg-emerald-500/30" : "bg-emerald-300/50"
                }`}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/car.png.jpg"
                  alt="ItzFizz performance car"
                  width={800}
                  height={400}
                  className="drop-shadow-[0_24px_60px_rgba(0,0,0,0.75)] object-contain"
                  priority
                />
              </div>

              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-200 backdrop-blur">
                Live Scroll Sync
              </div>
              <div className="absolute right-4 bottom-4 flex flex-col items-end gap-1 text-[10px] tracking-[0.16em] uppercase text-slate-400">
                <span>GSAP ScrollTrigger</span>
                <span className="text-emerald-400">Pinned Hero · 60fps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator at bottom center */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <div
            ref={scrollIndicatorRef}
            className={`flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] ${
              isDark ? "text-slate-500" : "text-slate-500"
            }`}
          >
            <span>Scroll</span>
            <div
              className={`flex h-10 w-[1px] flex-col items-center justify-end rounded-full ${
                isDark ? "bg-slate-700" : "bg-slate-300"
              }`}
            >
              <div
                className={`scroll-indicator-dot h-2 w-2 rounded-full ${
                  isDark ? "bg-emerald-400" : "bg-emerald-500"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}