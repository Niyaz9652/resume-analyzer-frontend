import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 120000
});

async function analyzeResume({ resume, jobDescription }) {
  const formData = new FormData();
  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription || "");

  const response = await api.post("/analyze", formData);
  return response.data.analysis;
}

async function getAnalyses() {
  const response = await api.get("/analyses");
  return response.data.analyses;
}

async function getAnalysisById(id) {
  const response = await api.get(`/analyses/${id}`);
  return response.data.analysis;
}

export { analyzeResume, getAnalyses, getAnalysisById };
