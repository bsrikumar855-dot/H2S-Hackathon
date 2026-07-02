import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

export default function MainLayout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const path = location.pathname

  if (path === "/") {
    return <LandingShell>{children}</LandingShell>
  }

  if (path === "/job") {
    return <SimpleShell>{children}</SimpleShell>
  }

  return <AppShell>{children}</AppShell>
}

function LandingShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <header className="flex justify-between items-center px-2xl h-[72px] bg-transparent absolute top-0 left-0 w-full z-50">
        <Link to="/" className="font-headline-sm text-headline-sm font-bold text-primary">TalentMind AI</Link>
        <nav className="hidden md:flex gap-xl absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="font-label-md text-label-md text-primary font-medium hover:text-primary transition-colors">Home</Link>
          <a href="#features" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Features</a>
          <a href="#performance" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Performance</a>
          <a href="#pricing" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-lg">
          <Link to="/job" className="text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors">Sign In</Link>
          <Link to="/job" className="bg-primary text-on-primary font-label-md text-label-md px-lg py-sm rounded-lg active:scale-95 transition-all shadow-sm">
            Get Started
          </Link>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="w-full py-xl px-2xl flex flex-col md:flex-row justify-between items-center gap-md border-t border-outline-variant mt-auto">
        <div className="flex flex-col gap-xs">
          <span className="font-headline-sm text-headline-sm text-primary font-bold">TalentMind AI</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 TalentMind AI. Human-Centric Intelligence.</p>
        </div>
        <div className="flex flex-wrap gap-xl">
          <a className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors" href="#">Contact Support</a>
        </div>
        <div className="flex gap-md">
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container/20 cursor-pointer transition-colors">
            <span className="material-symbols-outlined text-sm">public</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SimpleShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      <header className="flex justify-between items-center px-lg h-16 bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-md">
          <button className="p-sm hover:bg-surface-container-high rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">menu</span>
          </button>
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">TalentMind AI</Link>
        </div>
        <div className="flex gap-md items-center">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
            <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="w-full py-lg px-2xl flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container-lowest border-t border-outline-variant mt-auto">
        <span className="font-headline-sm text-label-md text-primary font-bold">TalentMind AI</span>
        <p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 TalentMind AI. Human-Centric Intelligence.</p>
        <div className="flex flex-wrap gap-xl">
          <a className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="font-body-sm text-body-sm text-secondary hover:text-primary transition-colors" href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  )
}

function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const path = location.pathname

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "space_dashboard" },
    { name: "Job Analysis", path: "/job", icon: "analytics" },
    { name: "Resumes", path: "/candidates", icon: "description" },
    { name: "Pipeline", path: "/processing", icon: "view_kanban" },
    { name: "Profile", path: "/profile", icon: "person" },
  ]

  return (
    <div className="min-h-screen bg-background text-on-surface flex">
      {/* Sidebar */}
      <aside className="w-[260px] flex-shrink-0 bg-surface border-r border-outline-variant flex flex-col">
        <div className="h-16 px-lg flex items-center gap-sm border-b border-outline-variant">
          <button className="p-sm hover:bg-surface-container-high rounded-full transition-colors flex items-center justify-center md:hidden">
            <span className="material-symbols-outlined text-primary">menu</span>
          </button>
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary truncate">TalentMind AI</Link>
        </div>
        
        <div className="p-md mt-sm">
          <p className="text-[11px] font-bold text-primary-fixed-dim uppercase tracking-wider mb-sm px-md">Enterprise Recruitment</p>
        </div>

        <nav className="flex-1 px-md flex flex-col gap-xs mt-sm">
          {navItems.map((item) => {
            const isActive = path === item.path
            return (
              <Link 
                key={item.name}
                to={item.path} 
                className={`flex items-center gap-md px-md py-sm rounded-lg font-label-md text-label-md transition-colors ${isActive ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.name}
              </Link>
            )
          })}

          <button className="mt-xl mx-md bg-primary text-on-primary font-bold text-label-md py-sm rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Job Post
          </button>
        </nav>

        <div className="p-md border-t border-outline-variant space-y-xs mt-auto">
          <a href="#" className="flex items-center gap-md px-md py-xs text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[18px]">help</span>
            Help Center
          </a>
          <a href="#" className="flex items-center gap-md px-md py-xs text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            Support
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-surface border-b border-outline-variant px-xl flex justify-between items-center flex-shrink-0">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
              <input type="text" placeholder="Search candidates or jobs..." className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-1.5 pl-10 pr-4 text-body-sm focus:border-primary focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-lg ml-md">
            <button className="relative p-1 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <div className="flex items-center gap-sm border-l border-outline-variant pl-lg">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="font-label-sm text-label-sm font-bold">Alexander Reed</span>
                <span className="text-[10px] text-on-surface-variant">Lead Recruiter</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-surface">
          {children}
        </main>
      </div>
    </div>
  )
}
