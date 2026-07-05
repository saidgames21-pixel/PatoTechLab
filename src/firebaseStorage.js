import { doc, getDoc, setDoc, deleteField } from "firebase/firestore";
import { db } from "./firebase.js";

// Hace que window.storage funcione exactamente igual que dentro de Claude,
// pero guardando/leyendo de Firestore en vez de localStorage.
// App.jsx no necesita ningún cambio: sigue llamando a
// window.storage.get/set/delete/list tal cual.
//
// Todo se guarda en un solo documento por usuario: users/{uid}
// con un campo "entries" tipo mapa: { "patotechlab-orders": "...json...", ... }

export function attachFirebaseStorage(uid) {
  const ref = doc(db, "users", uid);

  window.storage = {
    async get(key, _shared) {
      try {
        const snap = await getDoc(ref);
        const entries = snap.exists() ? snap.data().entries || {} : {};
        if (!(key in entries)) return null;
        return { key, value: entries[key], shared: false };
      } catch (e) {
        console.error("Error leyendo de Firestore:", e);
        throw e;
      }
    },

    async set(key, value, _shared) {
      try {
        await setDoc(ref, { entries: { [key]: value } }, { merge: true });
        return { key, value, shared: false };
      } catch (e) {
        console.error("Error guardando en Firestore:", e);
        return null;
      }
    },

    async delete(key, _shared) {
      try {
        await setDoc(ref, { entries: { [key]: deleteField() } }, { merge: true });
        return { key, deleted: true, shared: false };
      } catch (e) {
        console.error("Error borrando de Firestore:", e);
        return null;
      }
    },

    async list(prefix = "", _shared) {
      const snap = await getDoc(ref);
      const entries = snap.exists() ? snap.data().entries || {} : {};
      const keys = Object.keys(entries).filter((k) => k.startsWith(prefix));
      return { keys, prefix, shared: false };
    },
  };
}

export function detachFirebaseStorage() {
  delete window.storage;
}
