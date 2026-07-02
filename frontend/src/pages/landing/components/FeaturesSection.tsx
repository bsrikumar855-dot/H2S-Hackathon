import { motion } from "framer-motion"
import { Sparkles, LineChart, Network, ArrowRight } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section id="features" className="py-3xl px-lg relative bg-background">
      <div className="max-w-container-max mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-2xl">
          <h2 className="text-headline-lg font-headline-lg text-on-surface mb-md">Beyond Keyword Matching</h2>
          <p className="text-body-lg text-on-surface-variant">
            Traditional ATS systems look for exact words. TalentMind AI understands context, nuance, and the actual depth of candidate experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl">
          {[
            {
              icon: <Sparkles className="w-6 h-6 text-primary" />,
              title: "Contextual AI Parsing",
              desc: "Understands the difference between 'managed a team using React' and 'read about React'.",
            },
            {
              icon: <Network className="w-6 h-6 text-tertiary" />,
              title: "Behavioral Graph",
              desc: "Connects the dots between past projects, career velocity, and cultural fit markers.",
            },
            {
              icon: <LineChart className="w-6 h-6 text-secondary" />,
              title: "Predictive Success",
              desc: "Ranks candidates based on actual historical data of successful hires in similar roles.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-surface border border-outline-variant rounded-2xl p-xl hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center mb-lg group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-headline-sm font-bold text-on-surface mb-sm">{feature.title}</h3>
              <p className="text-body-md text-on-surface-variant">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bento Grid Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary-container text-on-primary-container rounded-3xl p-2xl flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="relative z-10">
              <h3 className="text-headline-lg font-bold mb-md text-white">Generate Executive Briefs in Seconds</h3>
              <p className="text-body-lg text-white/80 mb-lg max-w-md">
                Stop writing summary emails to hiring managers. Our AI generates comprehensive, data-backed candidate briefs ready to share.
              </p>
              <button className="flex items-center gap-sm font-bold text-white hover:opacity-80 transition-opacity">
                Explore Reporting <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
          </motion.div>

          <div className="grid grid-rows-2 gap-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-outline-variant rounded-3xl p-xl flex items-center gap-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex-1">
                <h4 className="text-headline-sm font-bold mb-sm">Unbiased Screening</h4>
                <p className="text-body-sm text-on-surface-variant">Blind evaluation mode removes PII to ensure diverse, merit-based candidate pipelines.</p>
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-surface-container-high border-t-tertiary flex items-center justify-center flex-shrink-0 animate-[spin_4s_linear_infinite]">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-label-sm font-bold text-tertiary">
                  100%
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-surface border border-outline-variant rounded-3xl p-xl flex items-center gap-lg hover:border-primary/50 transition-colors overflow-hidden relative"
            >
              <div className="relative z-10">
                <h4 className="text-headline-sm font-bold mb-sm">Seamless Integration</h4>
                <p className="text-body-sm text-on-surface-variant">Connects with Workday, Greenhouse, and Lever out of the box.</p>
              </div>
              <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-surface-container-high to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
