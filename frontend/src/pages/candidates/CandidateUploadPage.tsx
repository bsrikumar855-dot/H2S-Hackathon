import React, { useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BarChart3, Bell, Bolt, CloudUpload, FileText, Home, Network, Search, Settings, Trash2, UploadCloud, User, Verified } from "lucide-react"
import { useRecruitment } from "../../context/RecruitmentContext"

export default function CandidateUploadPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const { uploadedFiles, addUploadedFile, removeUploadedFile, loadMockFiles, clearAll, jobDescription } = useRecruitment()
  const totalSize = useMemo(() => uploadedFiles.reduce((sum, file) => sum + file.size, 0), [uploadedFiles])

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
    <div className="tm-page bg-black text-white min-h-screen">
      <TopBar />
      <SideNav active="upload" />
      <main className="tm-content-with-sidebar tm-topbar-offset flex min-h-screen flex-col">
        <div className="mx-auto w-full max-w-[1440px] flex-1 p-4 md:p-8 lg:p-12">
          <div className="tm-slide-up mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold text-[var(--tm-text)] md:text-4xl">Resume Upload</h1>
              <p className="mt-2 text-lg leading-8 text-[var(--tm-muted)]">Batch process and rank candidates using autonomous intelligence.</p>
            </div>
            <button
              disabled={uploadedFiles.length === 0}
              onClick={() => {
                if (!jobDescription.trim()) {
                  alert("Please provide a job description before analyzing resumes.")
                  navigate("/job")
                  return
                }
                navigate("/processing")
              }}
              className="tm-primary-btn flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold disabled:cursor-not-allowed disabled:bg-[var(--tm-border)] disabled:text-[var(--tm-muted)] disabled:shadow-none"
            >
              <Bolt className="h-5 w-5" /> Analyze Resumes
            </button>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-12">
            <section className="tm-slide-up flex flex-col gap-6 lg:col-span-5">
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
                className={`tm-card flex min-h-[400px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition duration-300 ${
                  isDragActive ? "scale-[1.01] border-[var(--tm-primary)] bg-[var(--tm-surface-low)]" : "border-[var(--tm-border)] bg-[var(--tm-surface)]"
                }`}
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-[var(--tm-primary-soft)] blur-2xl" />
                  <div className="relative flex h-32 w-32 rotate-3 items-center justify-center rounded-3xl border border-[var(--tm-border)] bg-[var(--tm-surface-mid)] shadow-sm transition group-hover:rotate-0">
                    <CloudUpload className="h-14 w-14 text-[var(--tm-primary)]" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-[var(--tm-text)]">{isDragActive ? "Drop resumes now" : "Drag and drop resumes"}</h2>
                <p className="mt-3 max-w-xs leading-7 text-[var(--tm-muted)]">Support for PDF, DOCX, and TXT files. Max 50 files per batch.</p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px w-8 bg-[var(--tm-border)]" />
                  <span className="text-sm font-bold text-[var(--tm-muted)]">OR</span>
                  <span className="h-px w-8 bg-[var(--tm-border)]" />
                </div>
                <button className="tm-primary-btn mt-6 rounded-lg px-7 py-3 font-bold">Browse Files</button>
              </div>

              <div className="tm-card flex items-center justify-between rounded-2xl p-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--tm-tertiary-soft)] text-[var(--tm-tertiary)]">
                    <Verified className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="tm-label">Quality Score</p>
                    <p className="text-xl font-bold text-[var(--tm-text)]">98.4% Accuracy</p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="text-[var(--tm-muted)]">OCR Engine v4.2</p>
                  <p className="font-bold text-[var(--tm-tertiary)]">Active</p>
                </div>
              </div>
            </section>

            <section className="tm-slide-up lg:col-span-7" style={{ animationDelay: "120ms" }}>
              <div className="tm-card flex min-h-[540px] flex-col overflow-hidden rounded-3xl">
                <div className="flex items-center justify-between border-b border-[var(--tm-border)] bg-[var(--tm-surface-low)] px-6 py-5">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">Queue Manager</h2>
                    <span className="rounded-full bg-[var(--tm-primary-soft)] px-2 py-1 text-[11px] font-extrabold text-[var(--tm-primary)]">{uploadedFiles.length} FILES</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={loadMockFiles} className="text-sm font-bold text-[var(--tm-primary)] hover:underline">Load Demo</button>
                    {uploadedFiles.length > 0 && (
                      <button onClick={clearAll} className="text-sm font-bold text-[var(--tm-error)] hover:underline">
                        Clear All
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                  {uploadedFiles.length === 0 ? (
                    <div className="flex h-full min-h-[310px] flex-col items-center justify-center py-12 text-[var(--tm-muted)]/55">
                      <UploadCloud className="mb-4 h-16 w-16" />
                      <p>Your upload queue is empty</p>
                    </div>
                  ) : (
                    uploadedFiles.map((file, index) => (
                      <div key={file.name} className="tm-slide-up group flex items-center gap-4 rounded-2xl border border-[var(--tm-border)] bg-[var(--tm-surface)] p-4 transition hover:shadow-md" style={{ animationDelay: `${index * 50}ms` }}>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--tm-surface-mid)] text-[var(--tm-primary)]">
                          <FileText className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <h3 className="truncate text-sm font-bold text-[var(--tm-text)]">{file.name}</h3>
                            <span className="text-xs font-extrabold text-[var(--tm-primary)]">Ready</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="whitespace-nowrap text-sm text-[var(--tm-muted)]">{fileType(file.name)} - {formatSize(file.size)}</span>
                            <div className="tm-progress flex-1">
                              <span style={{ width: "100%" }} />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeUploadedFile(file.name)}
                          className="rounded-lg p-2 text-[var(--tm-muted)] opacity-100 transition hover:bg-[var(--tm-error-soft)] hover:text-[var(--tm-error)] md:opacity-0 md:group-hover:opacity-100"
                          aria-label={`Remove ${file.name}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-auto border-t border-[var(--tm-border)] bg-[var(--tm-surface-low)] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[var(--tm-muted)]">Total Size</span>
                    <span className="font-bold text-[var(--tm-text)]">{formatSize(totalSize)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--tm-muted)]">Processing Time (Est.)</span>
                    <span className="font-bold text-[var(--tm-text)]">{uploadedFiles.length > 0 ? `${Math.max(1, Math.ceil(uploadedFiles.length * 0.4))} min` : "-- min"}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  )
}

function formatSize(bytes: number) {
  if (bytes === 0) return "0.0 MB"
  const mb = bytes / 1024 / 1024
  if (mb >= 1) return `${mb.toFixed(2)} MB`
  return `${(bytes / 1024).toFixed(1)} KB`
}

function fileType(name: string) {
  return name.split(".").pop()?.toUpperCase() || "FILE"
}

function TopBar() {
  const navigate = useNavigate()
  return (
    <header className="tm-topbar">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        <button onClick={() => navigate("/")} className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Network className="h-6 w-6 text-[var(--tm-primary)]" />
          <span className="text-xl font-extrabold text-[var(--tm-primary)]">TalentMind AI</span>
        </button>
        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 text-[var(--tm-muted)] transition hover:bg-[var(--tm-surface-low)]" aria-label="Search"><Search className="h-5 w-5" /></button>
          <button className="rounded-full p-2 text-[var(--tm-muted)] transition hover:bg-[var(--tm-surface-low)]" aria-label="Notifications"><Bell className="h-5 w-5" /></button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--tm-border)] bg-[var(--tm-primary-soft)] font-bold text-[var(--tm-primary)]">A</div>
        </div>
      </div>
    </header>
  )
}

function SideNav({ active }: { active: "job" | "upload" | "dashboard" }) {
  const navigate = useNavigate()
  return (
    <aside className="tm-sidebar hidden flex-col p-5 pt-20 md:flex">
      <div className="mb-8 px-2">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--tm-primary)] text-white">
            <Network className="h-4 w-4" />
          </span>
          <span className="font-bold text-[var(--tm-primary)]">Premium Recruiter</span>
        </div>
        <p className="text-xl font-bold text-[var(--tm-text)]">Alex Sterling</p>
        <p className="text-sm text-[var(--tm-muted)]">Lead Recruiter</p>
      </div>
      <nav className="flex flex-col gap-1">
        <button onClick={() => navigate("/dashboard")} className={`tm-shell-link ${active === "dashboard" ? "tm-shell-link-active" : ""}`}><BarChart3 className="h-5 w-5" /> Dashboard</button>
        <button onClick={() => navigate("/job")} className={`tm-shell-link ${active === "job" ? "tm-shell-link-active" : ""}`}><FileText className="h-5 w-5" /> Jobs</button>
        <button onClick={() => navigate("/candidates")} className={`tm-shell-link ${active === "upload" ? "tm-shell-link-active" : ""}`}><UploadCloud className="h-5 w-5" /> Resumes</button>
        <button onClick={() => navigate("/profile")} className="tm-shell-link"><User className="h-5 w-5" /> Profile</button>
      </nav>
      <div className="mt-auto rounded-2xl bg-[var(--tm-surface-low)] p-5">
        <p className="tm-label mb-3">AI Capacity</p>
        <div className="tm-progress mb-3">
          <span style={{ width: "75%" }} />
        </div>
        <p className="text-sm text-[var(--tm-text)]">75% of monthly tokens</p>
      </div>
    </aside>
  )
}

function MobileNav() {
  const navigate = useNavigate()
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t border-[var(--tm-border)] bg-[var(--tm-bg)] py-2 shadow-lg md:hidden">
      <button onClick={() => navigate("/dashboard")} className="flex flex-col items-center text-[var(--tm-muted)]"><Home className="h-5 w-5" /><small>Home</small></button>
      <button onClick={() => navigate("/candidates")} className="flex flex-col items-center font-bold text-[var(--tm-primary)]"><UploadCloud className="h-5 w-5" /><small>Resumes</small></button>
      <button onClick={() => navigate("/profile")} className="flex flex-col items-center text-[var(--tm-muted)]"><User className="h-5 w-5" /><small>Profile</small></button>
    </nav>
  )
}
