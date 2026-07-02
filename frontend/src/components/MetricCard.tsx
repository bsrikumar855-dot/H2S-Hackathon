import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../lib/utils"

interface MetricCardProps {
  label: string
  value: number
  suffix?: string
  prefix?: string
  isFloat?: boolean
  trend?: { value: string; positive: boolean }
  icon?: React.ReactNode
  iconBgClass?: string
  footerText?: string
  progressValue?: number
  animationDelay?: number
  className?: string
}

export default function MetricCard({
  label,
  value,
  suffix = "",
  prefix = "",
  isFloat = false,
  trend,
  icon,
  iconBgClass = "bg-primary-fixed",
  footerText,
  progressValue,
  animationDelay = 0,
  className,
}: MetricCardProps) {
  const [display, setDisplay] = useState(0)
  const animating = useRef(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      animating.current = true
      const start = performance.now()
      const duration = 1500

      const step = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(eased * value)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, animationDelay)
    return () => clearTimeout(timeout)
  }, [value, animationDelay])

  const formatted = isFloat ? display.toFixed(1) : Math.floor(display).toString()

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: animationDelay / 1000 }}
      className={cn(
        "bg-surface border border-outline-variant p-lg rounded-xl flex flex-col justify-between hover:shadow-sm transition-all duration-300 cursor-default",
        className
      )}
    >
      <div className="flex justify-between items-start mb-md">
        {icon && (
          <div className={cn("p-sm rounded-lg", iconBgClass)}>
            {icon}
          </div>
        )}
        {trend && (
          <span
            className={cn(
              "flex items-center font-bold text-label-sm",
              trend.positive ? "text-tertiary" : "text-error"
            )}
          >
            {trend.value}
          </span>
        )}
      </div>

      <div>
        <p className="text-label-md font-medium text-on-surface-variant">{label}</p>
        <div className="flex items-baseline gap-xs">
          <h3 className="text-headline-lg font-bold">
            {prefix}{formatted}{suffix}
          </h3>
        </div>
      </div>

      {progressValue !== undefined && (
        <div className="mt-md h-1 bg-surface-container-high rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progressValue}%` }}
            transition={{ duration: 1, delay: animationDelay / 1000 + 0.3 }}
          />
        </div>
      )}

      {footerText && (
        <p className="text-label-sm text-on-surface-variant mt-md">{footerText}</p>
      )}
    </motion.div>
  )
}
