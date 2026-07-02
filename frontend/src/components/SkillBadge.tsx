import { motion } from "framer-motion"
import { cn } from "../lib/utils"

interface SkillBadgeProps {
  label: string
  variant?: "default" | "primary" | "tertiary"
  className?: string
}

export default function SkillBadge({ label, variant = "default", className }: SkillBadgeProps) {
  const variants = {
    default: "bg-surface-container text-on-surface-variant",
    primary: "bg-primary-fixed text-primary",
    tertiary: "bg-tertiary-container/20 text-tertiary",
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "inline-flex items-center px-md py-1 rounded-full text-label-sm font-medium",
        variants[variant],
        className
      )}
    >
      {label}
    </motion.span>
  )
}
