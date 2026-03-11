import { Brand } from "./UI.jsx";

const STEPS = [
  { label: "Register",     desc: "Create your account" },
  { label: "Verify Email", desc: "Check your inbox" },
  { label: "Login",        desc: "Enter credentials" },
  { label: "Profile",      desc: "View your details" },
];

export const PAGE_STEP = { register: 0, verify: 1, login: 2, profile: 3 };

export function LeftPanel({ page }) {
  const active = PAGE_STEP[page] ?? 2;
  return (
    <div className="layout__left">
      <Brand />
      <div style={{
        fontFamily:"'Syne',sans-serif", fontSize:"50px", fontWeight:800,
        lineHeight:1.05, marginBottom:"18px",
        background:"linear-gradient(135deg,var(--text) 0%,var(--acc-lt) 100%)",
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
      }}>
        Secure<br />Access<br />Simplified.
      </div>
      <p style={{ fontSize:"14px", color:"var(--muted)", lineHeight:1.7, maxWidth:320, marginBottom:44 }}>
        JWT authentication with email verification, protected routes, and TanStack Query data fetching.
      </p>

      <div style={{ display:"flex", flexDirection:"column" }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:16, padding:"14px 0", position:"relative" }}>
            {i < STEPS.length - 1 && (
              <div style={{
                position:"absolute", left:15, top:44, width:1,
                height:"calc(100% - 14px)",
                background:"linear-gradient(to bottom,var(--acc)55,transparent)",
              }} />
            )}
            <div style={{
              width:32, height:32, borderRadius:"50%",
              border: i === active ? "none" : "1.5px solid var(--acc)",
              background: i === active ? "var(--acc)" : i < active ? "#0d2e24" : "transparent",
              boxShadow: i === active ? "0 0 16px var(--acc)" : "none",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"'Syne',sans-serif", fontSize:"12px", fontWeight:700,
              color: i === active ? "#fff" : i < active ? "var(--ok)" : "var(--acc)",
              flexShrink:0, transition:".3s",
            }}>
              {i < active ? "✓" : i + 1}
            </div>
            <div style={{ fontSize:13, color:"var(--muted)", paddingTop:6 }}>
              <strong style={{ display:"block", color:"var(--text)", fontWeight:500, marginBottom:2 }}>{s.label}</strong>
              {s.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
