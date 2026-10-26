import { CheckCircle2, CircleAlert, Lightbulb, Sparkles, Target, TrendingUp } from "lucide-react";

function ListSection({ title, items, icon: Icon, emptyText }) {
  return (
    <section className="panel result-panel">
      <h3><Icon size={19} /> {title}</h3>
      {items?.length ? (
        <ul className="insight-list">
          {items.map((item, index) => <li key={`${title}-${index}`}>{item}</li>)}
        </ul>
      ) : <p className="muted">{emptyText || "No items to show."}</p>}
    </section>
  );
}

function AnalysisResults({ analysis }) {
  if (!analysis) return null;
  const result = analysis.result;

  return (
    <section className="results">
      <div className="results-title">
        <div>
          <span className="eyebrow"><Sparkles size={15} /> YOUR REPORT</span>
          <h2>Resume analysis</h2>
          <p className="muted">{analysis.fileName}</p>
        </div>
        <div className="score-circle" style={{ "--score": `${result.score}%` }}>
          <div><strong>{result.score}</strong><span>/100</span></div>
          <small>Resume score</small>
        </div>
      </div>

      <section className="panel summary-panel">
        <h3><Target size={19} /> Summary</h3>
        <p>{result.summary}</p>
        <small className="muted">AI-generated estimate; not an official ATS score.</small>
      </section>

      <div className="results-grid">
        <ListSection title="Strengths" items={result.strengths} icon={CheckCircle2} />
        <ListSection title="Areas to improve" items={result.improvements} icon={CircleAlert} />
        <ListSection title="Matching skills" items={result.matchedSkills} icon={CheckCircle2} emptyText="Add a job description to compare skills." />
        <ListSection title="Skills to consider" items={result.missingSkills} icon={Target} emptyText="Add a job description to compare skills." />
      </div>

      <ListSection title="Recommended next steps" items={result.recommendations} icon={Lightbulb} />
      <div className="disclaimer"><TrendingUp size={17} /> Use these suggestions as guidance and verify that every resume claim accurately reflects your experience.</div>
    </section>
  );
}

export { AnalysisResults };
