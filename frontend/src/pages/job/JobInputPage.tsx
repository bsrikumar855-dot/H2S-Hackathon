import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle2, Save, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRecruitment } from "../../context/RecruitmentContext"
import AppLayout from "../../layouts/AppLayout"
import { cn } from "../../lib/utils"

export default function JobInputPage() {
  const navigate = useNavigate()
  const { jobTitle, setJobTitle, jobDescription, setJobDescription, loadMockFiles } = useRecruitment()
  const [error, setError] = useState("")

  const charCount = jobDescription.length
  const wordCount = useMemo(() => (jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0), [jobDescription])

  const handleContinue = () => {
    if (!jobTitle.trim()) {
      setError("Please specify a job title before proceeding.")
      return
    }
    if (jobDescription.trim().length < 100) {
      setError("Please enter a valid job description with at least 100 characters.")
      return
    }
    navigate("/candidates")
  }

  const handlePreFill = () => {
    loadMockFiles()
    setError("")
  }

  return (
    <AppLayout showNewJobBtn={false} showCapacityWidget={false}>
      <div className="flex-1 max-w-container-max mx-auto w-full px-lg py-3xl flex flex-col lg:flex-row gap-xl items-start">
        {/* Left Sidebar Guide */}
        <aside className="w-full lg:w-sidebar-width flex-shrink-0 space-y-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-low p-md rounded-xl space-y-md"
          >
            <h3 className="text-headline-sm font-bold text-primary">Writing Guide</h3>
            <p className="text-body-sm text-on-surface-variant">Effective job descriptions attract 40% more qualified candidates.</p>
            <div className="space-y-sm">
              <Tip title="Be Specific" text="Outline day-to-day tasks clearly." />
              <Tip title="Culture Matters" text="Mention your company values." />
              <Tip title="Inclusion" text="Use gender-neutral language." />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-xl overflow-hidden h-48 group cursor-pointer"
            onClick={handlePreFill}
          >
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-md">
              <p className="text-on-primary text-label-md font-bold">
                Need inspiration? Click to use our AI generator for a head start.
              </p>
            </div>
          </motion.div>
        </aside>

        {/* Central Workspace */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-grow w-full max-w-3xl flex flex-col items-center gap-lg"
        >
          <div className="w-full glass-card rounded-2xl p-xl shadow-md bg-white/80">
            <header className="mb-xl">
              <h2 className="text-headline-lg font-bold text-on-surface mb-xs">Job Description</h2>
              <p className="text-body-md text-on-surface-variant">
                Define the role, expectations, and why someone should join your team.
              </p>
            </header>

            <div className="space-y-xl">
              {/* Job Title Input */}
              <div className="relative floating-label-container group">
                <input
                  id="job-title"
                  type="text"
                  placeholder=" "
                  value={jobTitle}
                  onChange={(e) => {
                    setJobTitle(e.target.value)
                    setError("")
                  }}
                  className="peer w-full bg-transparent border border-outline-variant rounded-lg px-md py-md text-body-md outline-none focus:border-primary transition-all focus:ring-4 focus:ring-primary/10"
                />
                <label
                  htmlFor="job-title"
                  className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-body-md peer-focus:-translate-y-8 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-xs bg-white px-1 transition-all pointer-events-none"
                >
                  Job Title
                </label>
              </div>

              {/* Job Description Textarea */}
              <div className="relative floating-label-container group">
                <textarea
                  id="job-description"
                  placeholder=" "
                  rows={12}
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value)
                    setError("")
                  }}
                  className="peer w-full bg-transparent border border-outline-variant rounded-lg px-md py-md text-body-md outline-none focus:border-primary transition-all focus:ring-4 focus:ring-primary/10 resize-none"
                />
                <label
                  htmlFor="job-description"
                  className="absolute left-md top-6 text-on-surface-variant text-body-md peer-focus:-translate-y-8 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-xs bg-white px-1 transition-all pointer-events-none"
                >
                  Detailed Description
                </label>

                {/* Counters */}
                <div className="absolute bottom-4 right-4 flex items-center gap-md text-label-sm text-on-surface-variant bg-surface/80 backdrop-blur-sm px-sm py-xs rounded-full border border-outline-variant/30">
                  <span>{wordCount} words</span>
                  <span className="w-px h-3 bg-outline-variant" />
                  <span className={cn(charCount > 5000 && "text-error")}>
                    {charCount} / 5000 chars
                  </span>
                </div>
              </div>

              {error && (
                <div className="p-sm bg-error-container text-on-error-container rounded-lg text-label-md font-medium">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-md gap-md">
                <button className="flex items-center gap-sm px-lg py-md rounded-full text-label-md text-secondary hover:bg-surface-container transition-colors w-full sm:w-auto justify-center">
                  <Save className="w-5 h-5" />
                  Save Draft
                </button>
                <button
                  onClick={handleContinue}
                  className="bg-primary text-on-primary px-3xl py-md rounded-full text-label-md font-bold shadow-md hover:shadow-lg active:scale-95 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-xl text-center opacity-60 mt-lg">
            <p className="italic text-body-sm text-on-surface-variant">
              "The way you describe the role is the first step in the candidate experience. Make it count."
            </p>
          </div>
        </motion.section>
      </div>
    </AppLayout>
  )
}

function Tip({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex items-start gap-sm p-sm rounded-lg transition-colors hover:bg-surface-container-high group">
      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
      <div>
        <p className="text-label-md font-bold">{title}</p>
        <p className="text-body-sm text-on-surface-variant">{text}</p>
      </div>
    </div>
  )
}
