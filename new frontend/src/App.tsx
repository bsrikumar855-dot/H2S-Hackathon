import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { RecruitmentContextProvider } from "./context/RecruitmentContext"
import MainLayout from "./layouts/MainLayout"
import LandingPage from "./pages/LandingPage"
import JobInputPage from "./pages/JobInputPage"
import CandidateUploadPage from "./pages/CandidateUploadPage"
import AIProcessingPage from "./pages/AIProcessingPage"
import RankedDashboardPage from "./pages/RankedDashboardPage"
import ProfilePage from "./pages/ProfilePage"
import ExecutiveReportPage from "./pages/ExecutiveReportPage"
import ErrorPage from "./pages/ErrorPage"

function App() {
  return (
    <RecruitmentContextProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/job" element={<JobInputPage />} />
            <Route path="/candidates" element={<CandidateUploadPage />} />
            <Route path="/processing" element={<AIProcessingPage />} />
            <Route path="/dashboard" element={<RankedDashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/report/:id" element={<ExecutiveReportPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </RecruitmentContextProvider>
  )
}

export default App
