import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle2, Brain, BarChart2 } from "lucide-react"

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[920px] flex flex-col items-center justify-center text-center px-lg overflow-hidden">
      {/* Floating background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary-container rounded-full blur-[120px] mix-blend-multiply animate-float" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-tertiary-fixed rounded-full blur-[100px] mix-blend-multiply animate-float-reverse" />
      </div>

      <div className="z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
        {/* Left column: Hero Content */}
        <div className="text-left flex flex-col items-start">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-block bg-primary-container/10 text-primary text-label-sm px-md py-1 rounded-full mb-md"
          >
            V2.4 Powered by Neural Match
          </motion.span>

          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-display font-display text-on-surface mb-md tracking-tight leading-[1.1]"
          >
            Hire Smarter. <br /> Hire Faster.
          </motion.h1>

          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-body-lg text-on-surface-variant max-w-lg mb-xl text-left"
          >
            Find the most relevant candidates with intelligent resume analysis. Our human-centric AI
            identifies talent depth where others see keywords.
          </motion.p>

          <motion.div
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-md justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,74,198,0.25)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/job")}
              className="bg-primary text-on-primary text-label-md px-3xl py-md rounded-lg shadow-lg transition-all"
            >
              Start Analysis
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="bg-surface border border-outline-variant text-on-surface text-label-md px-3xl py-md rounded-lg hover:bg-surface-container-low transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* API Status Card */}
          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-2xl"
          >
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-md flex items-center gap-md max-w-xs shadow-sm">
              <div className="relative flex h-3 w-3 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-label-sm font-bold text-on-surface">API Status</span>
                <span className="text-body-sm text-on-surface-variant flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Systems Operational
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right column: Neural Engine View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="relative hidden lg:block"
        >
          <div className="bg-white border border-outline-variant p-md rounded-2xl shadow-2xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.05)] transition-all duration-300">
            <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-md">
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="text-label-md font-bold">Neural Engine View</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-outline-variant" />
                <div className="w-2 h-2 rounded-full bg-outline-variant" />
              </div>
            </div>
            <div className="space-y-md">
              <div className="flex items-center gap-md p-sm bg-surface-container rounded-lg">
                <div
                  className="w-10 h-10 rounded bg-outline-variant flex-shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOmAfVlN-_S11GAg9sE5eO5L_CIpudnewlQ8gS0-fMLjRqxk5Jj-_Q20-fp3q7VwJhGAHH8SqKn-69ViHtPFuDEcnuRN5kaDmbwi4NxgZ_VweyIn-DNg8ge4nQC5Axdna9rHMDOpK-TfSoUy21ZNxvzXudpBMoLD5UQ-7AkALOqTP2zbM012LJP3wi5XrAkEonNes5lhJvihvAMBhfzItO25yxbOsOWaYaNVfdVDqZo_FXHIbFHOZ2WtZfrn1psZwlRcSMcGsngwmo')" }}
                />
                <div className="flex-grow h-4 bg-outline-variant/30 rounded w-2/3" />
                <div className="h-6 w-12 bg-primary rounded-full flex items-center justify-center text-[10px] text-white">
                  98%
                </div>
              </div>
              <div className="flex items-center gap-md p-sm bg-surface-container rounded-lg opacity-80">
                <div
                  className="w-10 h-10 rounded bg-outline-variant flex-shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBanbrGdbJSwwRqbWC0RgV4P0-IrBwku5lim5cOSZyYULiVSvAzKXUhRbCHwuX9oLFbmt6ROIctGa8a95vtxCfYOtzAIrZV8ePbhtOUiFtUR5BEsG2-SHP2e-NzNkA6a19PfkBiMveQ4-qsF_2ATqf5sQrFhB23LE28VgoGorgS15evdPPSDzI1pTxTmVgYh-beeBf-sHLUP7uNPPbpw5HHkjnKdHzikv6iJx1yQoOP6dR3voa7rRYicv8oX7DpwCHlvR7pu4p868Pa')" }}
                />
                <div className="flex-grow h-4 bg-outline-variant/30 rounded w-1/2" />
                <div className="h-6 w-12 bg-secondary rounded-full flex items-center justify-center text-[10px] text-white">
                  82%
                </div>
              </div>
              <div className="grid grid-cols-2 gap-md">
                <div className="h-32 bg-primary-fixed/20 rounded-lg border border-primary-fixed p-sm">
                  <div className="h-2 w-1/2 bg-primary-fixed rounded mb-sm" />
                  <div className="flex flex-col gap-1">
                    <div className="h-1 w-full bg-primary-fixed/40 rounded" />
                    <div className="h-1 w-3/4 bg-primary-fixed/40 rounded" />
                  </div>
                </div>
                <div className="h-32 bg-surface-container-high rounded-lg p-sm">
                  <div className="h-2 w-1/2 bg-outline-variant rounded mb-sm" />
                  <div className="flex items-center justify-center h-20">
                    <BarChart2 className="w-8 h-8 text-outline" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
