import React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, title, className }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose} 
      />
      
      {/* Side Sheet Drawer container */}
      <div className={cn("relative z-10 w-full max-w-xl h-full border-l border-white/10 bg-[#060413]/95 backdrop-blur-xl p-6 shadow-2xl overflow-y-auto flex flex-col animate-in slide-in-from-right duration-250", className)}>
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <h2 className="text-xl font-semibold text-white tracking-wide">{title || "Candidate Profile"}</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 text-gray-300 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}
