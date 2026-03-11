import { useState, useEffect } from "react";
import { Alert, FormField } from "../components/UI.jsx";
import { apiGetVerify } from "../api/auth.api.js";

export default function VerifyPage({ email, onNavigate }) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  async function handleVerifyToken(tkn) {
    if (!tkn?.trim())
      return setAlert({
        type: "err",
        msg: "Paste the token from your email link.",
      });
    setLoading(true);
    setAlert(null);
    const { ok, data } = await apiGetVerify(tkn.trim());
    setLoading(false);
    if (ok) {
      setAlert({
        type: "ok",
        msg: "Email verified successfully! Redirecting to login…",
      });
      // Clean token from URL bar
      window.history.replaceState({}, document.title, "/");
      setTimeout(() => {
        setAlert(null);
        onNavigate("login");
      }, 2000);
    } else {
      setAlert({
        type: "err",
        msg: data.message || "Verification failed. Token may be expired.",
      });
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
      handleVerifyToken(urlToken);
    }
  }, []);

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#1a1a2e,#2a1a4e)",
          border: "1px solid var(--acc)33",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
          margin: "0 auto 22px",
          boxShadow: "0 0 28px var(--acc-glow)",
        }}
      >
        {loading ? "⏳" : "✉️"}
      </div>

      <div className="card__title">
        {loading ? "Verifying…" : "Verify your email"}
      </div>
      <div
        className="card__subtitle"
        style={{ maxWidth: 300, margin: "0 auto 24px" }}
      >
        {loading ? (
          "Please wait while we verify your email address."
        ) : (
          <>
            A link was sent to{" "}
            <strong style={{ color: "var(--acc-lt)" }}>
              {email || "your email"}
            </strong>
            . Paste the token below or click the email link.
          </>
        )}
      </div>

      {alert && <Alert {...alert} />}

      {!loading && (
        <div style={{ textAlign: "left" }}>
          <FormField
            label="Verification Token (from email link)"
            placeholder="Paste JWT token here…"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={loading}
          />
        </div>
      )}

      {!loading && (
        <button
          className="btn btn--primary"
          onClick={() => handleVerifyToken(token)}
          disabled={!token.trim()}
        >
          Verify Email →
        </button>
      )}

      <div className="divider">
        <button className="link-btn" onClick={() => onNavigate("login")}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
