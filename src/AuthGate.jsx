import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase.js";
import { attachFirebaseStorage, detachFirebaseStorage } from "./firebaseStorage.js";

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, sans-serif",
    background: "#F6F7F6",
    padding: 20,
  },
  card: {
    background: "#fff",
    border: "1px solid #E0E3DF",
    borderRadius: 18,
    padding: 28,
    width: "100%",
    maxWidth: 360,
  },
  h1: { fontSize: 20, fontWeight: 800, color: "#2D741C", margin: "0 0 4px" },
  p: { fontSize: 13, color: "#8A9698", margin: "0 0 20px" },
  label: { display: "block", fontSize: 12, fontWeight: 600, color: "#8A9698", margin: "0 0 4px" },
  input: {
    width: "100%",
    border: "1px solid #E0E3DF",
    borderRadius: 9,
    padding: "10px 12px",
    fontSize: 14,
    marginBottom: 14,
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    background: "#76D360",
    color: "#fff",
    border: "none",
    borderRadius: 11,
    padding: "11px 0",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    marginBottom: 10,
  },
  btnGhost: {
    width: "100%",
    background: "transparent",
    color: "#2D741C",
    border: "1px solid #E0E3DF",
    borderRadius: 11,
    padding: "11px 0",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
  error: { color: "#E2665B", fontSize: 12.5, marginBottom: 12 },
  loading: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, sans-serif",
    color: "#8A9698",
  },
  signout: {
    position: "fixed",
    top: 10,
    right: 10,
    background: "#fff",
    border: "1px solid #E0E3DF",
    borderRadius: 9,
    padding: "6px 12px",
    fontSize: 12,
    color: "#8A9698",
    cursor: "pointer",
    zIndex: 999,
  },
};

export default function AuthGate({ children }) {
  const [user, setUser] = useState(undefined); // undefined = checking, null = no user, object = logged in
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        attachFirebaseStorage(u.uid);
      } else {
        detachFirebaseStorage();
      }
      setUser(u);
    });
    return unsub;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err) {
      setError(traducirError(err.code));
    } finally {
      setBusy(false);
    }
  };

  if (user === undefined) {
    return <div style={styles.loading}>Cargando…</div>;
  }

  if (user === null) {
    return (
      <div style={styles.wrap}>
        <div style={styles.card}>
          <h1 style={styles.h1}>PatoTechLab</h1>
          <p style={styles.p}>
            {mode === "login"
              ? "Inicia sesión para ver tu bitácora."
              : "Crea tu cuenta (solo necesitas hacerlo una vez por dispositivo)."}
          </p>
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Correo</label>
            <input
              style={styles.input}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
            />
            <label style={styles.label}>Contraseña</label>
            <input
              style={styles.input}
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
            {error && <p style={styles.error}>{error}</p>}
            <button style={styles.btn} type="submit" disabled={busy}>
              {busy ? "Un momento…" : mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </button>
          </form>
          <button
            style={styles.btnGhost}
            onClick={() => {
              setError("");
              setMode(mode === "login" ? "register" : "login");
            }}
          >
            {mode === "login" ? "¿No tienes cuenta? Créala aquí" : "Ya tengo cuenta, iniciar sesión"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button style={styles.signout} onClick={() => signOut(auth)} title={user.email}>
        Cerrar sesión
      </button>
      {children}
    </>
  );
}

function traducirError(code) {
  const mapa = {
    "auth/invalid-email": "Ese correo no es válido.",
    "auth/user-not-found": "No existe una cuenta con ese correo.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/email-already-in-use": "Ya existe una cuenta con ese correo. Intenta iniciar sesión.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  };
  return mapa[code] || "Ocurrió un error. Intenta de nuevo.";
}
