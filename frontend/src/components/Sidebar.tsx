import { NavLink, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Kanban,
  Settings,
  HelpCircle,
  Headphones,
  Plus,
  BadgeCheck,
  Brain,
} from "lucide-react"
import { cn } from "../lib/utils"

interface SidebarProps {
  activeItem?: string
  showNewJobBtn?: boolean
  showCapacityWidget?: boolean
  planLabel?: string
}

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/job", icon: BarChart3, label: "Job Analysis" },
  { to: "/candidates", icon: FileText, label: "Resumes" },
  { to: "/processing", icon: Kanban, label: "Pipeline" },
  { to: "/settings", icon: Settings, label: "Settings" },
]

export default function Sidebar({
  showNewJobBtn = true,
  showCapacityWidget = false,
  planLabel = "Premium Recruiter",
}: SidebarProps) {
  const navigate = useNavigate()

  return (
    <aside className="fixed left-0 top-0 h-full w-sidebar-width z-50 hidden md:flex flex-col p-lg bg-surface border-r border-outline-variant">
      {/* Brand */}
      <div className="mb-3xl">
        <div className="flex items-center gap-md mb-xs">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-headline-md font-bold text-primary leading-none">TalentMind AI</h1>
            <p className="text-label-sm text-on-surface-variant">Enterprise Recruitment</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-sm flex-grow">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-secondary-container text-on-secondary-container font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-on-secondary-container" : "group-hover:text-primary"
                  )}
                />
                <span className="text-label-md">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Capacity widget */}
      {showCapacityWidget && (
        <div className="mb-xl p-md bg-surface-container-low rounded-xl">
          <p className="text-label-sm text-on-surface-variant mb-sm">AI CAPACITY</p>
          <div className="h-1 w-full bg-outline-variant rounded-full overflow-hidden mb-base">
            <motion.div
              className="h-full bg-primary-container"
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          <p className="text-body-sm text-on-surface">75% of Monthly Tokens</p>
        </div>
      )}

      {/* New Job Button */}
      {showNewJobBtn && (
        <motion.button
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/job")}
          className="mb-xl bg-primary text-on-primary px-lg py-md rounded-xl font-bold flex items-center justify-center gap-sm transition-opacity"
        >
          <Plus className="w-5 h-5" />
          <span>New Job Post</span>
        </motion.button>
      )}

      {/* Bottom links */}
      <div className="pt-xl border-t border-outline-variant space-y-sm">
        <a
          href="#"
          className="flex items-center gap-md px-md py-xs text-on-surface-variant hover:text-primary transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-label-sm">Help Center</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-md px-md py-xs text-on-surface-variant hover:text-primary transition-colors"
        >
          <Headphones className="w-5 h-5" />
          <span className="text-label-sm">Support</span>
        </a>
      </div>

      {/* Plan badge */}
      {planLabel && (
        <div className="mt-md flex items-center gap-sm px-md py-xs">
          <BadgeCheck className="w-4 h-4 text-primary" />
          <span className="text-label-sm text-primary font-bold uppercase tracking-wider">
            {planLabel}
          </span>
        </div>
      )}
    </aside>
  )
}
