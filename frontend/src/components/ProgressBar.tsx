import { motion } from "framer-motion"
import { cn } from "../lib/utils"

interface ProgressBarProps {
  value: number   // 0-100
  label?: string
  showValue?: boolean
  colorClass?: string
  className?: string
  animated?: boolean
}

export default function ProgressBar({
  value,
  label,
  showValue = false,
  colorClass = "bg-primary",
  className,
  animated = true,
}: ProgressBarProps) {
  return (
    <div className={cn("space-y-xs", className)}>
      {(label || showValue) && (
        <div className="flex justify-between text-label-md">
          {label && <span>{label}</span>}
          {showValue && <span className="font-bold">{value}%</span>}
        </div>
      )}
      <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
        {animated ? (
          <motion.div
            className={cn("h-full rounded-full", colorClass)}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          />
        ) : (
          <div className={cn("h-full rounded-full", colorClass)} style={{ width: `${value}%` }} />
        )}
      </div>
    </div>
  )
}
