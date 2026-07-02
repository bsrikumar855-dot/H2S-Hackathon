export default function Footer() {
  return (
    <footer className="w-full py-xl px-lg flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container-lowest border-t border-outline-variant">
      <div className="flex flex-col gap-xs">
        <span className="font-headline-sm text-headline-sm text-primary font-bold">TalentMind AI</span>
        <p className="font-body-sm text-body-sm text-on-surface-variant">© {new Date().getFullYear()} TalentMind AI. Human-Centric Intelligence.</p>
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
        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container/20 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-sm">share</span>
        </div>
      </div>
    </footer>
  )
}
