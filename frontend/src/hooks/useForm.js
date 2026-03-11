import { useState } from "react";

export function useForm(initial = {}) {
  const [values, setValues] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'ok'|'err'|'warn', msg }

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  const showAlert = (type, msg) => setAlert({ type, msg });
  const clearAlert = () => setAlert(null);
  const reset = () => { setValues(initial); setAlert(null); };

  return { values, set, loading, setLoading, alert, showAlert, clearAlert, reset };
}
