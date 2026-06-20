import { api, type RankingRunRequest, type RankingRunItem } from "./api"

export const rankingService = {
  /**
   * Run the end-to-end recruiter evaluation pipeline:
   * JD parsing -> Resume parsing -> Vector search -> Match ranking -> Explanation generation
   */
  async runRanking(payload: RankingRunRequest): Promise<RankingRunItem[]> {
    const response = await api.post<RankingRunItem[]>("/v1/rankings/run", payload)
    return response.data
  },
}
