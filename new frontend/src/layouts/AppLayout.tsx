import { ReactNode } from "react"
import { Link } from "react-router-dom"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-surface text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-lg h-16 bg-surface border-b border-outline-variant">
        <div className="flex items-center gap-md">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">TalentMind AI</Link>
        </div>
        <nav className="hidden md:flex gap-lg">
          <Link to="/" className="font-label-md text-label-md text-primary font-medium hover:text-primary transition-colors">Home</Link>
          <a href="#features" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Features</a>
          <a href="#stats" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Performance</a>
        </nav>
        <div className="flex items-center gap-md">
          <Link to="/job" className="bg-primary text-on-primary font-label-md text-label-md px-lg py-sm rounded-lg active:scale-95 transition-all shadow-sm">
            Launch Platform
          </Link>
        </div>
      </header>
      
      <main className="pt-16 flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full py-xl px-lg flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container-lowest border-t border-outline-variant mt-auto">
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
