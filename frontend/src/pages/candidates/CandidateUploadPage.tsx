import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Brain, CloudUpload, FileText, Network, Rocket, Trash2 } from "lucide-react"
import { useRecruitment } from "../../context/RecruitmentContext"

export default function CandidateUploadPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const { uploadedFiles, addUploadedFile, removeUploadedFile, loadMockFiles, clearAll } = useRecruitment()

  const addFiles = async (files: File[]) => {
    for (const file of files) {
      await addUploadedFile(file)
    }
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) await addFiles(Array.from(event.target.files))
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragActive(false)
    if (event.dataTransfer.files) await addFiles(Array.from(event.dataTransfer.files))
  }

  return (
    <div className="tm-shell">
      <TopBar />
      <SideNav active="upload" />
      <main className="tm-content-with-sidebar tm-topbar-offset min-h-screen px-4 py-8 md:px-12">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() => navigate("/job")}
            className="mb-8 flex items-center gap-2 text-sm text-[var(--tm-muted)] transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to job requirements
          </button>

          <header className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-white">Resume Intelligence</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-[var(--tm-muted)]">
              Upload candidate resumes to extract structured data, analyze skills, and match them against the active role.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-12">
            <section className="lg:col-span-7">
              <input ref={fileInputRef} type="file" className="hidden" multiple accept=".txt,.pdf,.docx" onChange={handleFileSelect} />
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault()
                  setIsDragActive(true)
                }}
                onDragLeave={(event) => {
                  event.preventDefault()
                  setIsDragActive(false)
                }}
                onDrop={handleDrop}
                className={`tm-card flex min-h-[330px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition ${
                  isDragActive ? "border-[var(--tm-primary)] bg-indigo-400/10" : "border-white/15"
                }`}
              >
                <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-indigo-300/20 bg-indigo-400/10">
                  <CloudUpload className="h-8 w-8 text-[var(--tm-primary)]" />
                </span>
                <h2 className="text-2xl font-bold text-white">{isDragActive ? "Drop resumes now" : "Drag and drop resumes"}</h2>
                <p className="mt-2 text-[var(--tm-muted)]">Supports PDF, DOCX, and TXT files</p>
                <button className="tm-secondary-btn mt-8 rounded-lg px-7 py-3 font-bold">Browse Files</button>
              </div>

              <div className="tm-card mt-6 flex items-start gap-4 rounded-xl p-6">
                <Brain className="h-6 w-6 shrink-0 text-[var(--tm-primary)]" />
                <div>
                  <p className="font-bold text-white">Deep Text Extraction</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--tm-muted)]">
                    PDF and DOCX files are simulated into readable candidate profiles for this local demo, while TXT files are read directly.
                  </p>
                </div>
              </div>
            </section>

            <aside className="lg:col-span-5">
              <div className="tm-card rounded-xl p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Upload Queue</h2>
                    <p className="tm-label mt-1">{uploadedFiles.length} files ready</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={loadMockFiles} className="tm-secondary-btn rounded-lg px-3 py-2 text-xs font-bold">
                      Load Demo
                    </button>
                    {uploadedFiles.length > 0 && (
                      <button onClick={clearAll} className="rounded-lg px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-400/10">
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-[360px] space-y-3 overflow-y-auto pr-1">
                  {uploadedFiles.length === 0 ? (
                    <div className="rounded-xl border border-white/10 bg-black/25 px-5 py-14 text-center text-[var(--tm-muted)]">
                      <FileText className="mx-auto mb-3 h-8 w-8 opacity-60" />
                      Queue is empty
                    </div>
                  ) : (
                    uploadedFiles.map((file) => (
                      <div key={file.name} className="rounded-xl border border-white/10 bg-black/25 p-4">
                        <div className="flex items-center gap-4">
                          <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-md border border-indigo-300/20 bg-indigo-400/10 text-[var(--tm-primary)]">
                            <FileText className="h-5 w-5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-white">{file.name}</p>
                            <p className="tm-mono text-xs text-[var(--tm-muted)]">{formatSize(file.size)} - Ready</p>
                          </div>
                          <button
                            onClick={() => removeUploadedFile(file.name)}
                            className="tm-icon-btn flex h-9 w-9 items-center justify-center rounded-full"
                            aria-label={`Remove ${file.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <button
                    disabled={uploadedFiles.length === 0}
                    onClick={() => navigate("/processing")}
                    className="tm-primary-btn flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Start Analysis <Rocket className="h-5 w-5" />
                  </button>
                  <p className="tm-label mt-4 text-center">Estimated time: 12 seconds</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

function formatSize(bytes: number) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function TopBar() {
  return (
    <header className="tm-topbar">
      <div className="flex h-full items-center justify-between px-4 md:px-12">
        <div className="flex items-center gap-3">
          <Network className="h-7 w-7 text-[var(--tm-primary)]" />
          <span className="tm-gradient-text text-2xl font-bold">TalentMind AI</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2">
          <span className="tm-status-dot" />
          <span className="tm-label text-[var(--tm-tertiary)]">System Online</span>
        </div>
      </div>
    </header>
  )
}

function SideNav({ active }: { active: "job" | "upload" | "dashboard" }) {
  const navigate = useNavigate()
  const itemClass = (key: string) =>
    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
      active === key ? "border-r-2 border-[var(--tm-primary)] bg-indigo-400/10 text-[var(--tm-primary)]" : "text-[var(--tm-muted)] hover:bg-white/5 hover:text-white"
    }`

  return (
    <aside className="tm-sidebar px-4 py-6 pt-24">
      <nav className="flex flex-col gap-2">
        <button onClick={() => navigate("/dashboard")} className={itemClass("dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/job")} className={itemClass("job")}>Job Analysis</button>
        <button onClick={() => navigate("/candidates")} className={itemClass("upload")}>Resume Parser</button>
        <span className="rounded-lg px-3 py-3 text-sm text-[var(--tm-muted)]">Talent Pipeline</span>
        <span className="rounded-lg px-3 py-3 text-sm text-[var(--tm-muted)]">Settings</span>
      </nav>
    </aside>
  )
}
