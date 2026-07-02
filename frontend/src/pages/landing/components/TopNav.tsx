import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "../../../lib/utils"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Performance", href: "#stats" },
  { label: "Pricing", href: "#pricing" },
]

export default function TopNav() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex justify-between items-center px-lg h-16 bg-surface border-b border-outline-variant transition-shadow duration-300",
        scrolled && "shadow-sm"
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-md">
        <span className="text-headline-md font-bold text-primary">TalentMind AI</span>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-lg">
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={cn(
              "text-label-md transition-colors hover:text-primary",
              label === "Home" ? "text-primary font-medium" : "text-on-surface-variant"
            )}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-md">
        <button className="hidden md:block text-label-md text-on-surface font-medium px-md py-sm hover:bg-surface-container-low rounded-lg transition-all">
          Sign In
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/job")}
          className="bg-primary text-on-primary text-label-md px-lg py-sm rounded-lg shadow-sm transition-all"
        >
          Get Started
        </motion.button>
        {/* Mobile menu */}
        <button
          className="md:hidden p-sm rounded-lg hover:bg-surface-container-low transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-0 w-full bg-surface border-b border-outline-variant shadow-md flex flex-col py-md px-lg gap-sm md:hidden"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-label-md text-on-surface-variant hover:text-primary py-sm transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <button className="text-label-md text-on-surface font-medium py-sm">Sign In</button>
        </motion.div>
      )}
    </header>
  )
}
