import { Alert, FormField } from "../components/UI.jsx";
import { useForm } from "../hooks/useForm.js";
import { useAuth } from "../context/AuthContext.jsx";
import { apiPost } from "../api/auth.api.js";

export default function LoginPage({ onNavigate }) {
  const { login } = useAuth();
  const { values, set, loading, setLoading, alert, showAlert, clearAlert } = useForm({
    email: "", password: "",
  });

  async function handleLogin() {
    if (!values.email || !values.password)
      return showAlert("err", "Email and password required.");

    setLoading(true); clearAlert();
    const { ok, data } = await apiPost("/auth/login", values);
    setLoading(false);

    if (ok && data.token) {
      const success = await login(data.token);
      if (success) onNavigate("profile");
    } else {
      showAlert("err", data.message || "Login failed.");
    }
  }

  return (
    <div className="card">
      <div className="card__title">Welcome back</div>
      <div className="card__subtitle">Sign in to your account</div>

      {alert && <Alert {...alert} />}

      <FormField label="Email"    type="email"    placeholder="you@example.com" value={values.email}    onChange={set("email")}    disabled={loading} />
      <FormField label="Password" type="password" placeholder="••••••••"        value={values.password} onChange={set("password")} disabled={loading} />

      <button className="btn btn--primary" onClick={handleLogin} disabled={loading}>
        {loading ? "Authenticating…" : "Sign In →"}
      </button>

      <div className="divider">
        No account?{" "}
        <button className="link-btn" onClick={() => { clearAlert(); onNavigate("register"); }}>Register</button>
        {" · "}
        <button className="link-btn" onClick={() => { clearAlert(); onNavigate("verify"); }}>Verify email</button>
      </div>
    </div>
  );
}
