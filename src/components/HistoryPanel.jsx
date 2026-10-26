import { Clock3, FileText, RefreshCw } from "lucide-react";

function HistoryPanel({ items, loading, onRefresh, onSelect }) {
  return (
    <section className="panel history-panel">
      <div className="history-heading">
        <div className="section-heading">
          <div className="heading-icon"><Clock3 size={20} /></div>
          <div><h2>Recent analyses</h2><p>Latest 20 saved reports on this database.</p></div>
        </div>
        <button className="icon-button" onClick={onRefresh} title="Refresh history" aria-label="Refresh history">
          <RefreshCw size={17} />
        </button>
      </div>
      {loading ? <p className="muted">Loading history...</p> : items.length === 0 ? (
        <p className="muted">No saved analyses yet.</p>
      ) : (
        <div className="history-list">
          {items.map((item) => (
            <button className="history-item" key={item._id} onClick={() => onSelect(item._id)}>
              <FileText size={19} />
              <span className="history-name"><strong>{item.fileName}</strong><small>{new Date(item.createdAt).toLocaleString()}</small></span>
              <span className="history-score">{item.result?.score ?? "—"}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export { HistoryPanel };
