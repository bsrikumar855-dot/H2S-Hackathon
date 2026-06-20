import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { RecruitmentContextProvider } from "./context/RecruitmentContext"
import LandingPage from "./pages/landing/LandingPage"
import JobInputPage from "./pages/job/JobInputPage"
import CandidateUploadPage from "./pages/candidates/CandidateUploadPage"
import AIProcessingPage from "./pages/processing/AIProcessingPage"
import RankedDashboardPage from "./pages/dashboard/RankedDashboardPage"
import "./App.css"

function App() {
  return (
    <RecruitmentContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/job" element={<JobInputPage />} />
          <Route path="/candidates" element={<CandidateUploadPage />} />
          <Route path="/processing" element={<AIProcessingPage />} />
          <Route path="/dashboard" element={<RankedDashboardPage />} />
        </Routes>
      </Router>
    </RecruitmentContextProvider>
  )
}

export default App
