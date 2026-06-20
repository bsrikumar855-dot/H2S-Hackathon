import hashlib
import numpy as np
import google.generativeai as genai
from backend.settings import settings

class EmbeddingService:
    """
    Generates 768-dimension embeddings for job summaries and candidate profiles.
    Automatically switches to deterministic seeded mock embeddings if keys are missing.
    """
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.use_mock = not self.api_key or self.api_key.startswith("mock")
        if not self.use_mock:
            genai.configure(api_key=self.api_key)

    def get_embedding(self, text: str) -> list[float]:
        """
        Generate embedding vector for input text.
        """
        if not text:
            return [0.0] * 768

        if self.use_mock:
            return self._generate_mock_embedding(text)

        try:
            # text-embedding-004 yields 768 dimension float array
            response = genai.embed_content(
                model="models/text-embedding-004",
                content=text,
                task_type="retrieval_document"
            )
            return response["embedding"]
        except Exception as e:
            print(f"[EmbeddingService] Gemini embedding call failed, falling back to mock: {e}")
            return self._generate_mock_embedding(text)

    def _generate_mock_embedding(self, text: str) -> list[float]:
        """
        Produce a deterministic 768-dimensional float vector based on the string seed.
        Enables test executions to match consistently without external network calls.
        """
        hasher = hashlib.sha256(text.encode("utf-8")).digest()
        seed = int.from_bytes(hasher, byteorder="big") % (2**32 - 1)
        rng = np.random.default_rng(seed)
        
        # Draw from standard normal distribution
        vec = rng.normal(loc=0.0, scale=1.0, size=768)
        norm = np.linalg.norm(vec)
        if norm > 0:
            vec = vec / norm
        return vec.tolist()

# Unified instantiated singleton instance
embedding_service = EmbeddingService()
