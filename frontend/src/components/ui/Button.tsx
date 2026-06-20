import React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          
          // Variants
          {
            // Primary - Purple/Blue gradient with neon glow
            "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-900/20 hover:from-violet-500 hover:to-blue-500 hover:shadow-violet-800/40 hover:scale-[1.01]": 
              variant === "primary",
            
            // Secondary - Dark glass overlay
            "bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20": 
              variant === "secondary",
            
            // Outline - Transparent border glow
            "bg-transparent border border-violet-500/30 text-violet-400 hover:border-violet-500/60 hover:bg-violet-950/20": 
              variant === "outline",
            
            // Ghost - Simple text hover effect
            "bg-transparent text-gray-400 hover:text-white hover:bg-white/5": 
              variant === "ghost",
          },
          
          // Sizes
          {
            "px-3 py-1.5 text-xs": size === "sm",
            "px-4 py-2 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
