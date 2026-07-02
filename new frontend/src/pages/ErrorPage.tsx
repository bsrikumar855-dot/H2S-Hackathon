import { Link } from "react-router-dom"

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col items-center justify-center text-center">
      <h1 className="font-display text-display text-error mb-md">404</h1>
      <p className="font-body-lg text-on-surface-variant mb-xl">Page not found or an error occurred.</p>
      <Link to="/" className="px-lg py-sm bg-primary text-on-primary rounded-lg hover:opacity-90">
        Return Home
      </Link>
    </div>
  )
}
