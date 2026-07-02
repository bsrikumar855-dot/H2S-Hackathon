import { useRef } from "react"
import { useInView } from "framer-motion"

export default function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden px-6 pb-12 md:px-12 lg:px-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/our_approach_bg.png" 
          alt="Starry sky over glowing flower field" 
          className="h-full w-full object-cover"
        />
        {/* Gradient overlay to make text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div 
        ref={ref}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-end justify-between gap-8 md:flex-row md:items-end transition-all duration-1000 ease-out"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(40px)"
        }}
      >
        {/* Content Card (Bottom Left) */}
        <div className="liquid-glass max-w-xl rounded-2xl border border-white/20 bg-black/20 p-8 shadow-2xl backdrop-blur-md md:p-10">
          <span className="mb-4 block text-xs font-bold tracking-[0.2em] text-white/60">
            OUR APPROACH
          </span>
          <p className="text-lg leading-relaxed text-white md:text-xl">
            We believe in the power of objective, AI-driven exploration. Every candidate is evaluated fairly, ensuring you scale fast and recruit better without losing quality.
          </p>
        </div>

        {/* Explore More Button (Bottom Right) */}
        <button className="flex shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/40 px-8 py-3 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/10 md:px-10 md:py-4">
          Explore more
        </button>
      </div>
    </section>
  )
}
