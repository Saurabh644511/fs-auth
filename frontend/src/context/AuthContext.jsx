import { createContext, useContext, useState } from "react";
import { getToken, saveToken, clearToken } from "../api/token.js";
import { apiGet } from "../api/auth.api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token,   setTokenState] = useState(getToken);
  const [profile, setProfile]    = useState(null);
  const [qState,  setQState]     = useState("idle"); // idle | fetching | done | error

  async function fetchProfile(tkn) {
    setQState("fetching");
    const { ok, data } = await apiGet("/profile", tkn);
    if (ok) {
      setProfile(data);
      setQState("done");
      return true;
    } else {
      setQState("error");
      logout();
      return false;
    }
  }

  function login(tkn) {
    saveToken(tkn);
    setTokenState(tkn);
    return fetchProfile(tkn);
  }

  function logout() {
    clearToken();
    setTokenState(null);
    setProfile(null);
    setQState("idle");
  }

  return (
    <AuthContext.Provider value={{ token, profile, qState, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
