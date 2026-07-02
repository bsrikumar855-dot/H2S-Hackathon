import { cn } from "../lib/utils"

interface AppFooterProps {
  className?: string
}

export default function AppFooter({ className }: AppFooterProps) {
  return (
    <footer
      className={cn(
        "w-full py-xl px-lg flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container-lowest border-t border-outline-variant mt-auto",
        className
      )}
    >
      <div className="font-bold text-headline-sm text-primary">TalentMind AI</div>
      <p className="text-body-sm text-secondary">© 2024 TalentMind AI. Human-Centric Intelligence.</p>
      <div className="flex gap-lg">
        {["Privacy Policy", "Terms of Service", "Support", "Security"].map((link) => (
          <a
            key={link}
            href="#"
            className="text-label-sm text-on-surface-variant hover:text-primary underline transition-all duration-200"
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  )
}
