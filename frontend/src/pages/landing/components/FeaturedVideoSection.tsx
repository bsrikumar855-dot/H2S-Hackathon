import { useRef } from "react"
import { useInView, motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function FeaturedVideoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigate = useNavigate()

  return (
    <section className="bg-black overflow-hidden px-6 pb-20 pt-6 md:pb-32 md:pt-10">
      <div className="mx-auto max-w-6xl">
        <div 
          ref={ref}
          className="relative aspect-video overflow-hidden rounded-3xl transition-all duration-1000 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(60px)"
          }}
        >
          <video
            className="h-full w-full object-cover"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:p-10">
            <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
              <span className="mb-3 block text-xs tracking-widest text-white/50 uppercase">Our Approach</span>
              <p className="text-sm leading-relaxed text-white md:text-base">
                We believe in the power of objective, AI-driven exploration. Every candidate is evaluated fairly, ensuring you scale fast and recruit better without losing quality.
              </p>
            </div>
            
            <motion.button 
              onClick={() => navigate("/dashboard")}
              className="liquid-glass whitespace-nowrap rounded-full px-8 py-3 text-sm font-medium text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore more
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
