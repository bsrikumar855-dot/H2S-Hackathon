import { cn } from "../lib/utils"

interface LoadingSkeletonProps {
  className?: string
  rounded?: "sm" | "md" | "full"
}

export function LoadingSkeleton({ className, rounded = "md" }: LoadingSkeletonProps) {
  const roundedMap = { sm: "rounded", md: "rounded-lg", full: "rounded-full" }
  return (
    <div className={cn("skeleton-shimmer", roundedMap[rounded], className)} />
  )
}

export function CandidateRowSkeleton() {
  return (
    <div className="flex items-center gap-md p-md">
      <div className="w-12 h-12 rounded-full skeleton-shimmer flex-shrink-0" />
      <div className="flex-1 space-y-sm">
        <div className="h-4 w-1/2 skeleton-shimmer rounded" />
        <div className="h-3 w-3/4 skeleton-shimmer rounded opacity-60" />
      </div>
      <div className="w-10 h-6 skeleton-shimmer rounded-full" />
    </div>
  )
}
