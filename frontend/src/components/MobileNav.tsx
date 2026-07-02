import { NavLink } from "react-router-dom"
import { LayoutDashboard, BarChart2, Upload, Settings } from "lucide-react"
import { cn } from "../lib/utils"

const mobileNavItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { to: "/job", icon: BarChart2, label: "Jobs" },
  { to: "/candidates", icon: Upload, label: "Resumes" },
  { to: "/settings", icon: Settings, label: "Settings" },
]

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface py-2 pb-safe md:hidden border-t border-outline-variant shadow-lg">
      {mobileNavItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center transition-colors",
              isActive ? "text-primary font-semibold" : "text-on-surface-variant hover:text-primary"
            )
          }
        >
          <Icon className="w-6 h-6" />
          <span className="text-label-sm mt-0.5">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
