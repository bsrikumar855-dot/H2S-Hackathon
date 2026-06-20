from backend.graph.state import RecruitmentState

class BehavioralSignalAgent:
    """
    Agent responsible for analyzing candidate activity and engagement logs,
    and computing intent, engagement, activity, and total behavior scores.
    """
    def run(self, state: RecruitmentState) -> RecruitmentState:
        print("[Behavioral Signal Agent] Evaluating candidate activity logs...")
        candidates = state.get("candidates")
        scores = state.get("scores")
        # Optional behavioral_signals input from api/state
        behavior_signals_map = state.get("behavioral_signals") or {}

        if not candidates or not scores:
            # Short-circuit if candidates or scores are not yet set
            return state

        for cand in candidates:
            cand_name = cand.get("candidate_name", "Unknown")
            
            # Fetch behavior logs mapped to candidate name
            b_data = behavior_signals_map.get(cand_name)
            
            if not b_data:
                # Default baseline values if none provided
                b_data = {
                    "profile_updates_last_30_days": 0,
                    "login_frequency": 0,
                    "response_rate": 0.0,
                    "application_count": 0,
                    "certification_activity": 0,
                    "github_activity": 0
                }

            # 1. Extract values
            updates = int(b_data.get("profile_updates_last_30_days", 0))
            logins = int(b_data.get("login_frequency", 0))
            rate = float(b_data.get("response_rate", 0.0))
            apps = int(b_data.get("application_count", 0))
            certs = int(b_data.get("certification_activity", 0))
            github = int(b_data.get("github_activity", 0))

            # 2. Calculate dimension scores (normalized to [0.0, 100.0])
            intent = (0.5 * min(100.0, updates * 25.0)) + (0.5 * (rate * 100.0))
            engagement = (0.5 * min(100.0, logins * 5.0)) + (0.5 * min(100.0, certs * 30.0))
            activity = (0.5 * min(100.0, github * 8.0)) + (0.5 * min(100.0, apps * 10.0))

            # 3. Calculate unified behavior score
            behavior_score = (0.40 * intent) + (0.30 * engagement) + (0.30 * activity)

            # Ensure candidate has a dictionary in scores mapping
            if cand_name not in scores:
                scores[cand_name] = {}

            # 4. Save results to state scores
            scores[cand_name]["behavior"] = {
                "intent": round(intent, 2),
                "engagement": round(engagement, 2),
                "activity": round(activity, 2),
                "score": round(behavior_score, 2),
                "raw_signals": b_data,
                "has_data": len(behavior_signals_map) > 0  # Tag if behavior data was supplied
            }

        return state

# Expose instance and run helper
_agent = BehavioralSignalAgent()
def run(state: RecruitmentState) -> RecruitmentState:
    return _agent.run(state)
