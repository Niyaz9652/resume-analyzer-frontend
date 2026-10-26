import { FileText, UploadCloud } from "lucide-react";

function UploadPanel({ file, onFileChange, jobDescription, onJobDescriptionChange, onAnalyze, loading }) {
  return (
    <section className="panel upload-panel">
      <div className="section-heading">
        <div className="heading-icon"><FileText size={20} /></div>
        <div>
          <h2>Analyze your resume</h2>
          <p>Upload your resume and optionally add a target job description.</p>
        </div>
      </div>

      <label className="dropzone">
        <UploadCloud size={32} />
        <strong>{file ? file.name : "Choose your resume"}</strong>
        <span>PDF or DOCX · Maximum 5 MB</span>
        <input
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(event) => onFileChange(event.target.files?.[0] || null)}
        />
      </label>

      <label className="field-label" htmlFor="jobDescription">Job description <span>(optional)</span></label>
      <textarea
        id="jobDescription"
        value={jobDescription}
        onChange={(event) => onJobDescriptionChange(event.target.value)}
        placeholder="Paste the job description here to compare skills..."
        rows={6}
        maxLength={20000}
      />
      <div className="character-count">{jobDescription.length}/20,000</div>

      <button className="primary-button" onClick={onAnalyze} disabled={loading}>
        {loading ? <span className="spinner" /> : <UploadCloud size={18} />}
        {loading ? "Analyzing resume..." : "Analyze resume"}
      </button>
      <p className="privacy-note">Your resume is processed by the backend AI service. Review the privacy notes in the README before using real personal data.</p>
    </section>
  );
}

export { UploadPanel };
