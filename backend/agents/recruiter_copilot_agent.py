from backend.graph.state import RecruitmentState

class RecruiterCopilotAgent:
    """
    Agent responsible for processing recruiter feedback and updating weights/queries.
    """
    def run(self, state: RecruitmentState) -> RecruitmentState:
        print("[Recruiter Copilot Agent] Executing placeholder run")
        return state

# Expose instance and run method
_agent = RecruiterCopilotAgent()
def run(state: RecruitmentState) -> RecruitmentState:
    return _agent.run(state)
