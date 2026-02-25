// app/page.tsx
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Extra spacer section to show scroll continuation */}
      <section className="h-[120vh] bg-gradient-to-b from-black via-slate-950 to-slate-900 flex items-center justify-center">
        <div className="max-w-xl text-center px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-3">
            B E Y O N D  T H E  F O L D
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Built for performance, crafted for experiences.
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            This spacer section simply demonstrates that the hero pins
            and then releases naturally as you scroll through the page.
          </p>
        </div>
      </section>
    </main>
  );
}