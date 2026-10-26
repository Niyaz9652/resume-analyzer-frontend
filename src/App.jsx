import { useEffect, useState } from "react";
import { BrainCircuit, Github, Sparkles } from "lucide-react";
import { analyzeResume, getAnalyses, getAnalysisById } from "./services/api.js";
import { UploadPanel } from "./components/UploadPanel.jsx";
import { AnalysisResults } from "./components/AnalysisResults.jsx";
import { HistoryPanel } from "./components/HistoryPanel.jsx";

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function refreshHistory() {
    setHistoryLoading(true);
    try {
      setHistory(await getAnalyses());
    } catch {
      setError("Could not load history. Check that the backend and MongoDB are running.");
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    refreshHistory();
  }, []);

  async function handleAnalyze() {
    setError("");
    setNotice("");
    if (!file) {
      setError("Please select a PDF or DOCX resume first.");
      return;
    }
    const extension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    if (![".pdf", ".docx"].includes(extension)) {
      setError("Only PDF and DOCX files are supported.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Your file is larger than 5 MB.");
      return;
    }

    setLoading(true);
    try {
      const saved = await analyzeResume({ resume: file, jobDescription });
      setAnalysis(saved);
      setNotice("Your resume was analyzed successfully.");
      await refreshHistory();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Analysis failed. Check the backend, Gemini API key, and MongoDB connection.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectHistory(id) {
    setError("");
    setNotice("");
    try {
      const saved = await getAnalysisById(id);
      setAnalysis({
        id: saved._id,
        fileName: saved.fileName,
        createdAt: saved.createdAt,
        result: saved.result
      });
      window.scrollTo({ top: document.querySelector(".results")?.offsetTop || 0, behavior: "smooth" });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not load this analysis.");
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="ResumeAI home">
          <span className="brand-mark"><BrainCircuit size={22} /></span>
          <span>Resume<span className="brand-accent">AI</span></span>
        </a>
        <span className="topbar-tag"><Sparkles size={14} /> AI career assistant</span>
      </header>

      <main className="page-container">
        <section className="hero">
          <div className="eyebrow"><Sparkles size={15} /> YOUR NEXT CAREER MOVE STARTS HERE</div>
          <h1>Make your resume<br /><span>work harder for you.</span></h1>
          <p>Get clear, practical feedback on your resume. Find strengths, spot gaps, and tailor your experience to the role you want.</p>
        </section>

        {error && <div className="alert error-alert" role="alert">{error}</div>}
        {notice && <div className="alert success-alert" role="status">{notice}</div>}

        <div className="main-grid">
          <UploadPanel
            file={file}
            onFileChange={setFile}
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
            onAnalyze={handleAnalyze}
            loading={loading}
          />
          <HistoryPanel
            items={history}
            loading={historyLoading}
            onRefresh={refreshHistory}
            onSelect={handleSelectHistory}
          />
        </div>

        <AnalysisResults analysis={analysis} />

        <footer className="footer">
          <span>ResumeAI · Built with React, Express, MongoDB & Gemini</span>
          <span><Github size={15} /> Portfolio project</span>
        </footer>
      </main>
    </div>
  );
}

export { App };
