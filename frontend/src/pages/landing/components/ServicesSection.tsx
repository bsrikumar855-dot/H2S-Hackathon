import { useRef } from "react"
import { useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 md:px-12 lg:px-24">
      <div 
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
      >
        {/* INSIGHT CARD */}
        <div 
          className="group liquid-glass flex flex-col overflow-hidden rounded-[2rem] transition-all duration-1000 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)"
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/10]">
            <img
              src="/insight_card.png"
              alt="Insight - Person working on glowing laptop in a magical starry field"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          
          <div className="flex flex-1 flex-col p-8 md:p-10">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-bold tracking-[0.2em] text-white/70">
                INSIGHT
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md transition-colors group-hover:bg-white/10">
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <h3 className="mb-3 font-serif text-3xl tracking-tight text-white md:text-4xl">Semantic Analysis</h3>
            <p className="text-base leading-relaxed text-white/50">
              Beyond keywords: understand the nuance of experience, soft skills, and career progression to surface the insights that drive meaningful, lasting change.
            </p>
          </div>
        </div>

        {/* EXECUTION CARD */}
        <div 
          className="group liquid-glass flex flex-col overflow-hidden rounded-[2rem] transition-all duration-1000 delay-150 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)"
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/10]">
            <img
              src="/execution_card.png"
              alt="Execution - Serene twilight mountain scene"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          
          <div className="flex flex-1 flex-col p-8 md:p-10">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-bold tracking-[0.2em] text-white/70">
                EXECUTION
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md transition-colors group-hover:bg-white/10">
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>
            </div>

            <h3 className="mb-3 font-serif text-3xl tracking-tight text-white md:text-4xl">Bias Suppression</h3>
            <p className="text-base leading-relaxed text-white/50">
              Focus scoring on evidence, skills, and role fit throughout the screening funnel to deliver objective outcomes that feel effortless and look extraordinary.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
