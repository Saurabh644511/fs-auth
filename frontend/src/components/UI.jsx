// ── Alert ─────────────────────────────────────────────────────────────────────
export function Alert({ type = "err", msg }) {
  const styles = {
    ok:   { background:"#0d2e24", border:"1px solid #22d3a544", color:"#22d3a5" },
    err:  { background:"#2e0d0d", border:"1px solid #f8717144", color:"#f87171" },
    warn: { background:"#2e200d", border:"1px solid #fbbf2444", color:"#fbbf24" },
  };
  const icon = { ok: "✓", err: "✕", warn: "⚠" }[type];
  return (
    <div style={{
      ...styles[type],
      padding:"11px 15px", borderRadius:"10px", fontSize:"13px",
      marginBottom:"18px", display:"flex", alignItems:"flex-start",
      gap:"9px", lineHeight:"1.5",
    }}>
      <span>{icon}</span><span>{msg}</span>
    </div>
  );
}

// ── FormField ─────────────────────────────────────────────────────────────────
export function FormField({ label, type = "text", placeholder, value, onChange, disabled }) {
  return (
    <div className="field" style={{ marginBottom: 16 }}>
      <label style={{
        display:"block", fontSize:"11px", fontWeight:500,
        letterSpacing:".9px", textTransform:"uppercase",
        color:"var(--muted)", marginBottom:"7px",
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          width:"100%", background:"var(--bg)", border:"1px solid var(--border)",
          borderRadius:"10px", padding:"13px 16px", color:"var(--text)",
          fontFamily:"'DM Sans',sans-serif", fontSize:"15px", outline:"none",
          transition:".2s", opacity: disabled ? .5 : 1,
        }}
        onFocus={e  => { e.target.style.borderColor="var(--acc)"; e.target.style.boxShadow="0 0 0 3px var(--acc-glow)"; }}
        onBlur={e   => { e.target.style.borderColor="var(--border)"; e.target.style.boxShadow="none"; }}
      />
    </div>
  );
}

// ── Brand ─────────────────────────────────────────────────────────────────────
export function Brand() {
  return (
    <div style={{
      fontFamily:"'Syne',sans-serif", fontSize:"12px", fontWeight:700,
      letterSpacing:"3px", textTransform:"uppercase", color:"var(--acc)",
      marginBottom:"72px", display:"flex", alignItems:"center", gap:"8px",
    }}>
      <div style={{ width:6, height:6, background:"var(--acc)", borderRadius:"50%", boxShadow:"0 0 8px var(--acc)" }} />
      AuthFlow
    </div>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────────
export function Spinner() {
  return <div className="spin" />;
}
