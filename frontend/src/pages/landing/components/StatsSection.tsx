import { motion } from "framer-motion"

const stats = [
  {
    value: "10k+",
    label: "Resumes Processed",
  },
  {
    value: "94%",
    label: "Match Accuracy",
  },
  {
    value: "4.2x",
    label: "Faster Screening",
  },
  {
    value: "500+",
    label: "Enterprise Teams",
  },
]

export default function StatsSection() {
  return (
    <section id="stats" className="py-2xl bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className={`flex flex-col items-center p-xl border-outline-variant/50 ${
                i !== stats.length - 1 ? "md:border-r" : ""
              }`}
            >
              <span className="font-headline-lg text-headline-lg text-primary mb-xs">
                {stat.value}
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
