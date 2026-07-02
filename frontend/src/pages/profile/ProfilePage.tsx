import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BarChart3, Bell, BriefcaseBusiness, Camera, Lock, Network, Search, Settings, UploadCloud, User } from "lucide-react"

export default function ProfilePage() {
  
  // Mock settings state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [autoAnalyze, setAutoAnalyze] = useState(false)
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  
  return (
    <div className="tm-page bg-black text-white min-h-screen">
      <TopBar />
      <SideNav active="profile" />
      <main className="tm-content-with-sidebar tm-topbar-offset flex min-h-screen flex-col">
        <div className="mx-auto w-full max-w-[1440px] flex-1 p-4 md:p-8 lg:p-12">
          
          <div className="tm-slide-up mb-10">
            <h1 className="text-3xl font-bold text-[var(--tm-text)] md:text-4xl">Profile & Settings</h1>
            <p className="mt-2 text-lg leading-8 text-[var(--tm-muted)]">Manage your account preferences and recruitment workspace.</p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-12">
            
            {/* Left Column: Profile Card */}
            <section className="tm-slide-up flex flex-col gap-6 lg:col-span-4">
              <div className="tm-card rounded-3xl p-8 text-center">
                <div className="relative mx-auto mb-6 h-32 w-32">
                  <div className="flex h-full w-full items-center justify-center rounded-full border border-[var(--tm-border)] bg-[var(--tm-surface-mid)] font-bold text-[var(--tm-primary)] text-4xl">
                    A
                  </div>
                  <button className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--tm-primary)] text-white shadow-lg transition hover:scale-105">
                    <Camera className="h-5 w-5" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-[var(--tm-text)]">Alex Sterling</h2>
                <p className="mt-1 font-semibold text-[var(--tm-muted)]">Lead Recruiter</p>
                <div className="mt-6 flex flex-col gap-3 text-left">
                  <div className="rounded-xl border border-[var(--tm-border)] bg-[var(--tm-surface-low)] p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--tm-muted)]">Email</p>
                    <p className="mt-1 font-medium text-[var(--tm-text)]">alex.sterling@talentmind.ai</p>
                  </div>
                  <div className="rounded-xl border border-[var(--tm-border)] bg-[var(--tm-surface-low)] p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--tm-muted)]">Workspace</p>
                    <p className="mt-1 font-medium text-[var(--tm-text)]">Enterprise Global</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column: Settings */}
            <section className="tm-slide-up lg:col-span-8" style={{ animationDelay: "120ms" }}>
              <div className="tm-card rounded-3xl p-8 md:p-10">
                <h2 className="mb-8 text-2xl font-bold text-[var(--tm-text)]">General Settings</h2>
                
                <div className="space-y-8">
                  {/* Personal Info Form */}
                  <div>
                    <h3 className="mb-4 text-lg font-bold text-[var(--tm-text)] flex items-center gap-2">
                      <User className="h-5 w-5 text-[var(--tm-muted)]" /> Personal Information
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-bold text-[var(--tm-muted)]">First Name</label>
                        <input type="text" defaultValue="Alex" className="w-full rounded-xl border border-[var(--tm-border)] bg-[var(--tm-surface-low)] px-4 py-3 outline-none transition focus:border-[var(--tm-primary)] focus:bg-[var(--tm-surface)]" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-bold text-[var(--tm-muted)]">Last Name</label>
                        <input type="text" defaultValue="Sterling" className="w-full rounded-xl border border-[var(--tm-border)] bg-[var(--tm-surface-low)] px-4 py-3 outline-none transition focus:border-[var(--tm-primary)] focus:bg-[var(--tm-surface)]" />
                      </div>
                    </div>
                    <button className="tm-secondary-btn mt-4 rounded-xl px-6 py-2.5 font-bold">Save Changes</button>
                  </div>
                  
                  <div className="h-px w-full bg-[var(--tm-border)]" />

                  {/* Preferences */}
                  <div>
                    <h3 className="mb-4 text-lg font-bold text-[var(--tm-text)] flex items-center gap-2">
                      <Settings className="h-5 w-5 text-[var(--tm-muted)]" /> Preferences
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-xl border border-[var(--tm-border)] p-4">
                        <div>
                          <p className="font-bold text-[var(--tm-text)]">Email Notifications</p>
                          <p className="text-sm text-[var(--tm-muted)]">Receive daily pipeline summaries and updates.</p>
                        </div>
                        <button 
                          onClick={() => setEmailNotifications(!emailNotifications)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifications ? 'bg-[var(--tm-primary)]' : 'bg-[var(--tm-border)]'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between rounded-xl border border-[var(--tm-border)] p-4">
                        <div>
                          <p className="font-bold text-[var(--tm-text)]">Auto-Analyze Resumes</p>
                          <p className="text-sm text-[var(--tm-muted)]">Automatically start AI evaluation on upload.</p>
                        </div>
                        <button 
                          onClick={() => setAutoAnalyze(!autoAnalyze)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoAnalyze ? 'bg-[var(--tm-primary)]' : 'bg-[var(--tm-border)]'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoAnalyze ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-[var(--tm-border)]" />

                  {/* Security */}
                  <div>
                    <h3 className="mb-4 text-lg font-bold text-[var(--tm-text)] flex items-center gap-2">
                      <Lock className="h-5 w-5 text-[var(--tm-muted)]" /> Security
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between rounded-xl border border-[var(--tm-border)] p-4">
                        <div>
                          <p className="font-bold text-[var(--tm-text)]">Two-Factor Authentication</p>
                          <p className="text-sm text-[var(--tm-muted)]">Protect your account with an extra layer of security.</p>
                        </div>
                        <button 
                          onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactorAuth ? 'bg-[var(--tm-primary)]' : 'bg-[var(--tm-border)]'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      <button className="tm-secondary-btn self-start rounded-xl px-6 py-2.5 font-bold text-[var(--tm-error)] hover:bg-[var(--tm-error-soft)] hover:border-transparent">Change Password</button>
                    </div>
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

function SideNav({ active }: { active: string }) {
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
        <button onClick={() => navigate("/job")} className={`tm-shell-link ${active === "job" ? "tm-shell-link-active" : ""}`}><BriefcaseBusiness className="h-5 w-5" /> Jobs</button>
        <button onClick={() => navigate("/candidates")} className={`tm-shell-link ${active === "upload" ? "tm-shell-link-active" : ""}`}><UploadCloud className="h-5 w-5" /> Resumes</button>
        <button onClick={() => navigate("/profile")} className={`tm-shell-link ${active === "profile" ? "tm-shell-link-active" : ""}`}><User className="h-5 w-5" /> Profile</button>
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
      <button onClick={() => navigate("/dashboard")} className="flex flex-col items-center text-[var(--tm-muted)]"><BarChart3 className="h-5 w-5" /><small>Dashboard</small></button>
      <button onClick={() => navigate("/candidates")} className="flex flex-col items-center text-[var(--tm-muted)]"><UploadCloud className="h-5 w-5" /><small>Resumes</small></button>
      <button onClick={() => navigate("/profile")} className="flex flex-col items-center font-bold text-[var(--tm-primary)]"><User className="h-5 w-5" /><small>Profile</small></button>
    </nav>
  )
}
