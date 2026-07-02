import { useParams } from "react-router-dom"
import { useRecruitmentContext } from "../context/RecruitmentContext"

export default function ExecutiveReportPage() {
  const { id } = useParams()
  const { rankingResults } = useRecruitmentContext()
  const decodedId = id ? decodeURIComponent(id) : ""
  
  const candidateResult = rankingResults.find(r => r.candidate.candidate_name === decodedId)

  return (
    <div className="p-xl max-w-container-max mx-auto">
      <h2 className="text-headline-lg font-headline-lg mb-md">Executive Report</h2>
      {candidateResult ? (
        <div>
          <h3 className="font-bold text-headline-sm">{candidateResult.candidate.candidate_name}</h3>
          <p className="mt-md font-bold">Explanation:</p>
          <p>{candidateResult.explanation.explanation}</p>
        </div>
      ) : (
        <p>Candidate not found.</p>
      )}
    </div>
  )
}
