import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="py-3xl px-lg">
      <div className="max-w-container-max mx-auto">
        <div className="bg-inverse-surface text-inverse-on-surface rounded-3xl p-2xl md:p-3xl text-center relative overflow-hidden">
          {/* Decorative background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-tertiary/20 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-display font-display font-bold mb-md text-white">
              Ready to build your dream team?
            </h2>
            <p className="text-body-lg text-inverse-on-surface/80 mb-2xl max-w-2xl">
              Join 500+ enterprises using TalentMind AI to uncover hidden talent and reduce time-to-hire by 40%.
            </p>
            <div className="flex flex-col sm:flex-row gap-md">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/job")}
                className="bg-primary-container text-on-primary-container font-bold px-3xl py-lg rounded-xl shadow-lg flex items-center justify-center gap-sm transition-all hover:bg-white hover:text-primary"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-outline-variant text-white font-bold px-3xl py-lg rounded-xl hover:bg-white/10 transition-all"
              >
                Request Demo
              </motion.button>
            </div>
            <p className="text-label-sm text-inverse-on-surface/60 mt-lg">
              No credit card required. 14-day full access.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
