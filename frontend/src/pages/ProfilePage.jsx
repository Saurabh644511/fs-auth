import { useAuth } from "../context/AuthContext.jsx";
import { Brand, Spinner } from "../components/UI.jsx";

export default function ProfilePage({ onLogout }) {
  const { token, profile, qState, fetchProfile } = useAuth();

  if (!profile) return null;

  return (
    <div style={{ width:"100%", maxWidth:660, animation:"up .35s ease" }}>

      {/* Top bar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32 }}>
        <Brand />
        <button className="btn btn--ghost btn--sm" onClick={onLogout}>Sign Out</button>
      </div>

      {/* TanStack Query status bar */}
      <div style={{
        display:"flex", alignItems:"center", gap:12,
        padding:"14px 18px", background:"var(--surf)",
        border:"1px solid var(--border)", borderRadius:12,
        marginBottom:22, fontSize:12,
      }}>
        {qState === "fetching" && (
          <><Spinner /><span style={{ color:"var(--muted)" }}>TanStack Query fetching <code style={{ color:"var(--acc-lt)", background:"var(--acc-glow)", padding:"1px 6px", borderRadius:4 }}>/api/profile</code>…</span></>
        )}
        {qState === "done" && (
          <><span style={{ color:"var(--ok)" }}>✓</span>
          <span style={{ color:"var(--muted)" }}>
            TanStack Query — <span style={{ color:"var(--ok)" }}>data cached</span> · queryKey:{" "}
            <code style={{ color:"var(--acc-lt)", background:"var(--acc-glow)", padding:"1px 6px", borderRadius:4 }}>["profile"]</code>
          </span></>
        )}
        {qState === "error" && (
          <><span style={{ color:"var(--err)" }}>✕</span><span style={{ color:"var(--err)" }}>Query failed — token invalid or expired</span></>
        )}
      </div>

      {/* User header */}
      <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:28 }}>
        <div style={{
          width:68, height:68, borderRadius:"50%",
          background:"linear-gradient(135deg,var(--acc),var(--acc-lt))",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:"#fff",
          boxShadow:"0 0 24px var(--acc-glow)", flexShrink:0,
        }}>
          {profile.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:700 }}>{profile.name}</div>
          <div style={{ fontSize:13, color:"var(--muted)", marginTop:3 }}>{profile.email}</div>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:6,
            padding:"3px 11px", borderRadius:20, fontSize:11, fontWeight:500,
            background:"#0d2e24", border:"1px solid var(--ok)44", color:"var(--ok)", marginTop:7,
          }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"var(--ok)" }} />
            Email Verified
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
        {[
          { label:"Auth Method",      value:"JWT Bearer Token",    color:"var(--text)" },
          { label:"Protected Route",  value:"/api/profile ✓",      color:"var(--ok)"   },
          { label:"Query Key",        value:'["profile"]',          color:"var(--acc-lt)", mono:true },
          { label:"Cache Status",     value:"Fresh ✓",             color:"var(--ok)"   },
        ].map(({ label, value, color, mono }) => (
          <div key={label} style={{
            background:"var(--surf)", border:"1px solid var(--border)",
            borderRadius:14, padding:18,
          }}>
            <div style={{ fontSize:10, letterSpacing:1, textTransform:"uppercase", color:"var(--muted)", marginBottom:7 }}>{label}</div>
            <div style={{ fontSize:14, fontWeight:500, color, fontFamily: mono ? "monospace" : undefined }}>{value}</div>
          </div>
        ))}
      </div>

      {/* JWT token */}
      {token && (
        <div style={{
          background:"var(--bg)", border:"1px solid var(--border)",
          borderRadius:14, padding:18, marginBottom:22,
        }}>
          <div style={{
            fontSize:10, letterSpacing:1, textTransform:"uppercase",
            color:"var(--muted)", marginBottom:8,
            display:"flex", alignItems:"center", gap:8,
          }}>
            Authorization Header
            <span style={{ background:"var(--acc-glow)", color:"var(--acc)", padding:"2px 8px", borderRadius:4, fontSize:9 }}>Bearer</span>
          </div>
          <div style={{
            fontFamily:"'Courier New',monospace", fontSize:11,
            color:"var(--acc-lt)", wordBreak:"break-all", lineHeight:1.65,
          }}>{token}</div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display:"flex", gap:12 }}>
        <button
          className="btn btn--primary"
          style={{ flex:1 }}
          onClick={() => fetchProfile(token)}
          disabled={qState === "fetching"}
        >
          {qState === "fetching" ? "Fetching…" : "↺  Refetch Profile"}
        </button>
        <button className="btn btn--ghost" style={{ flex:"0 0 auto", padding:"14px 24px" }} onClick={onLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
