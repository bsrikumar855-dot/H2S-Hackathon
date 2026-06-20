import React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning"
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-all duration-200",
          {
            // Primary - Violet neon glow
            "bg-violet-950/40 border-violet-500/30 text-violet-300 shadow-sm shadow-violet-500/5":
              variant === "primary",
            
            // Secondary - Neutral dark glass
            "bg-white/5 border-white/10 text-gray-300":
              variant === "secondary",

            // Success - Emerald/Cyan match
            "bg-emerald-950/40 border-emerald-500/30 text-emerald-300":
              variant === "success",

            // Danger - Red/Rose missing blocker
            "bg-rose-950/40 border-rose-500/30 text-rose-300":
              variant === "danger",

            // Warning - Transferable skill highlight
            "bg-amber-950/40 border-amber-500/30 text-amber-300":
              variant === "warning",
          },
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"
