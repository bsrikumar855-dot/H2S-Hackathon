import type { ReactNode } from "react"
import Sidebar from "../components/Sidebar"
import AppTopBar from "../components/AppTopBar"
import MobileNav from "../components/MobileNav"
import AppFooter from "../components/AppFooter"
import { cn } from "../lib/utils"

interface AppLayoutProps {
  children: ReactNode
  showSearch?: boolean
  topBarRightSlot?: ReactNode
  mainClassName?: string
  showCapacityWidget?: boolean
  showNewJobBtn?: boolean
}

export default function AppLayout({
  children,
  showSearch = true,
  topBarRightSlot,
  mainClassName,
  showCapacityWidget = false,
  showNewJobBtn = true,
}: AppLayoutProps) {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Sidebar showCapacityWidget={showCapacityWidget} showNewJobBtn={showNewJobBtn} />
      <AppTopBar showSearch={showSearch} rightSlot={topBarRightSlot} />

      <main
        className={cn(
          "md:ml-sidebar-width pt-16 min-h-screen flex flex-col",
          mainClassName
        )}
      >
        {children}
        <AppFooter className="md:ml-0" />
      </main>

      <MobileNav />
    </div>
  )
}
