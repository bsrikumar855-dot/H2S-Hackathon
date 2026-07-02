import { Bell, MessageSquare, Search } from "lucide-react"
import { motion } from "framer-motion"

interface AppTopBarProps {
  showSearch?: boolean
  rightSlot?: React.ReactNode
}

export default function AppTopBar({ showSearch = true, rightSlot }: AppTopBarProps) {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-280px)] h-16 bg-surface border-b border-outline-variant flex items-center justify-between px-gutter z-40">
      {/* Search */}
      {showSearch && (
        <div className="relative w-full max-w-md">
          <Search className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input
            type="text"
            placeholder="Search candidates or jobs..."
            className="w-full bg-surface-container-low border border-outline-variant rounded-full py-sm pl-3xl pr-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
      )}

      {/* Right slot */}
      <div className="flex items-center gap-lg ml-auto">
        {rightSlot}

        {/* Notifications */}
        <button className="relative p-sm text-on-surface-variant hover:text-primary transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
        </button>

        {/* Chat */}
        <button className="p-sm text-on-surface-variant hover:text-primary transition-colors">
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-outline-variant" />

        {/* User */}
        <div className="flex items-center gap-md">
          <div className="text-right hidden lg:block">
            <p className="text-label-md font-bold leading-none">Alexander Reed</p>
            <p className="text-label-sm text-on-surface-variant">Lead Recruiter</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-full bg-secondary-container border border-outline-variant overflow-hidden cursor-pointer"
          >
            <div className="w-full h-full bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center text-primary font-bold text-sm">
              AR
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
