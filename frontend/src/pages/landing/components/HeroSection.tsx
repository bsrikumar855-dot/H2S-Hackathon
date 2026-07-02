import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Network } from "lucide-react"

export default function HeroSection() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let animationFrameId: number

    const handleCanPlay = () => {
      video.play().catch(() => {})
      let start: number
      const duration = 500
      
      const fadeIn = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        video.style.opacity = progress.toString()
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(fadeIn)
        }
      }
      animationFrameId = requestAnimationFrame(fadeIn)
    }

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime <= 0.55) {
        let start: number
        const duration = 500
        const initialOpacity = parseFloat(video.style.opacity || "1")

        const fadeOut = (timestamp: number) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          video.style.opacity = (initialOpacity * (1 - progress)).toString()
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(fadeOut)
          }
        }
        requestAnimationFrame(fadeOut)
      }
    }

    const handleEnded = () => {
      video.style.opacity = "0"
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
        
        let start: number
        const duration = 500
        const fadeIn = (timestamp: number) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          video.style.opacity = progress.toString()
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(fadeIn)
          }
        }
        animationFrameId = requestAnimationFrame(fadeIn)
      }, 100)
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    return () => {
      cancelAnimationFrame(animationFrameId)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-bottom"
        style={{ opacity: 0 }}
        muted
        autoPlay
        playsInline
        preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
      />

      <div className="relative z-20 px-6 py-6">
        <nav className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <div className="flex items-center gap-3">
            <Network className="h-6 w-6 text-white" />
            <span className="text-lg font-semibold text-white">TalentMind AI</span>
            <div className="ml-8 hidden items-center gap-8 md:flex">
              <a href="#features" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Features</a>
              <a href="#about" className="text-sm font-medium text-white/80 transition-colors hover:text-white">About</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/dashboard")} className="text-sm font-medium text-white transition-opacity hover:opacity-80">Dashboard</button>
            <button onClick={() => navigate("/dashboard")} className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95">Login</button>
          </div>
        </nav>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center -translate-y-[5%]">
        <div className="mb-8 flex justify-center">
          <span className="liquid-glass flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-white/90">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            Agentic Pipeline v2.0 Live
          </span>
        </div>

        <h1 className="whitespace-normal md:whitespace-nowrap font-serif text-5xl tracking-tight text-white md:text-7xl drop-shadow-2xl">
          The Intelligent Way to <em className="italic">Hire</em>.
        </h1>
        
        <p className="mt-6 max-w-2xl px-4 text-base leading-relaxed text-white/80 md:text-lg drop-shadow-md">
          Automate screening, slash bias, and let specialized AI agents interview, rank, and shortlist your ideal candidates.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button onClick={() => navigate("/job")} className="liquid-glass flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Start Hiring <ArrowRight className="h-5 w-5" />
          </button>
          <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-black/40 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white/10 shadow-xl">
            Watch Demo
          </button>
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="text-sm font-bold tracking-widest text-white/40 uppercase drop-shadow">TRUSTED BY INNOVATIVE ENGINEERING TEAMS</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-white/50 md:gap-16">
            <div className="flex items-center gap-2 text-xl font-bold tracking-tighter drop-shadow-sm">StartupX</div>
            <div className="flex items-center gap-2 text-xl font-bold tracking-tighter drop-shadow-sm">ScaleCorp</div>
            <div className="flex items-center gap-2 text-xl font-bold tracking-tighter drop-shadow-sm">TalentFlow</div>
          </div>
        </div>
      </div>
    </section>
  )
}
