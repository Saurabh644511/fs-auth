import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { LeftPanel } from "./components/LeftPanel.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import VerifyPage from "./pages/VerifyPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import "./styles/global.css";

function Router() {
  const { token, logout, fetchProfile } = useAuth();

  // ✅ If URL has ?token= (user clicked email link), go straight to verify page
  const hasVerifyToken = new URLSearchParams(window.location.search).has(
    "token",
  );
  const [page, setPage] = useState(hasVerifyToken ? "verify" : "login");

  // Restore session on mount
  useEffect(() => {
    if (token && !hasVerifyToken) {
      fetchProfile(token).then((ok) => {
        if (ok) setPage("profile");
      });
    }
  }, []);

  function handleLogout() {
    logout();
    setPage("login");
  }

  const isProfile = page === "profile";

  return (
    <div className="layout">
      <div className="orb orb1" />
      <div className="orb orb2" />

      {!isProfile && <LeftPanel page={page} />}

      <div className="layout__right">
        {page === "register" && <RegisterPage onNavigate={setPage} />}
        {page === "verify" && <VerifyPage onNavigate={setPage} />}
        {page === "login" && <LoginPage onNavigate={setPage} />}
        {page === "profile" && <ProfilePage onLogout={handleLogout} />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
