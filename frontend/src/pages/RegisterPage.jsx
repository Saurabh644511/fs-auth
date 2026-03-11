import { Alert, FormField } from "../components/UI.jsx";
import { useForm } from "../hooks/useForm.js";
import { apiPost } from "../api/auth.api.js";

export default function RegisterPage({ onNavigate }) {
  const { values, set, loading, setLoading, alert, showAlert, clearAlert } = useForm({
    name: "", email: "", password: "",
  });

  async function handleRegister() {
    if (!values.name || !values.email || !values.password)
      return showAlert("err", "All fields are required.");

    setLoading(true); clearAlert();
    const { ok, data } = await apiPost("/auth/register", values);
    setLoading(false);

    if (ok) {
      showAlert("ok", data.message || "Registration successful! Check your email.");
      setTimeout(() => { clearAlert(); onNavigate("verify"); }, 1600);
    } else {
      showAlert("err", data.message || "Registration failed.");
    }
  }

  return (
    <div className="card">
      <div className="card__title">Create account</div>
      <div className="card__subtitle">You'll receive a verification email</div>

      {alert && <Alert {...alert} />}

      <FormField label="Full Name"  placeholder="Alice Smith"       value={values.name}     onChange={set("name")}     disabled={loading} />
      <FormField label="Email"      type="email" placeholder="alice@email.com" value={values.email}    onChange={set("email")}    disabled={loading} />
      <FormField label="Password"   type="password" placeholder="Min 6 characters" value={values.password} onChange={set("password")} disabled={loading} />

      <button className="btn btn--primary" onClick={handleRegister} disabled={loading}>
        {loading ? "Creating account…" : "Create Account →"}
      </button>

      <div className="divider">
        Already have an account?{" "}
        <button className="link-btn" onClick={() => { clearAlert(); onNavigate("login"); }}>Login</button>
      </div>
    </div>
  );
}
