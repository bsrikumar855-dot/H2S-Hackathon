import { useRef } from "react"
import { useInView } from "framer-motion"

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      ref={ref}
      id="about"
      className="relative overflow-hidden bg-black px-6 pb-10 pt-32 md:pb-14 md:pt-44"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="relative mx-auto max-w-6xl">
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)"
          }}
        >
          <span className="text-sm tracking-widest text-white/40 uppercase">About Us</span>
        </div>
        
        <h2 
          className="mt-6 text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl transition-all duration-1000 delay-100 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(40px)"
          }}
        >
          Multi-agent AI <span className="font-serif italic text-white/60">workflows</span> for <br className="hidden md:block" />
          teams that <span className="font-serif italic text-white/60">analyze, rank, and scale.</span>
        </h2>
      </div>
    </section>
  )
}
