import React from "react"
import { cn } from "@/lib/utils"

export interface ProgressBarProps {
  value: number // 0 to 100
  label?: string
  variant?: "primary" | "success" | "warning"
  animate?: boolean
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  variant = "primary",
  animate = true
}) => {
  const percentage = Math.min(100, Math.max(0, value))

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <div className="flex justify-between text-xs font-medium text-gray-400">
          <span>{label}</span>
          <span className="font-semibold text-gray-200">{Math.round(percentage)}%</span>
        </div>
      )}
      
      {/* Progress container track */}
      <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden border border-white/5">
        {/* Active progress indicator fill */}
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            {
              "bg-gradient-to-r from-violet-600 to-blue-600": variant === "primary",
              "bg-gradient-to-r from-emerald-600 to-cyan-500": variant === "success",
              "bg-gradient-to-r from-amber-600 to-orange-500": variant === "warning",
              "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer": animate
            }
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
