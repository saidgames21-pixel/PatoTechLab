// Este archivo hace que window.storage funcione fuera de Claude.ai,
// usando localStorage del navegador como respaldo.
// La app (App.jsx) no necesita ningún cambio: sigue llamando a
// window.storage.get/set/delete/list exactamente igual que antes.
//
// IMPORTANTE: localStorage guarda los datos SOLO en este navegador y
// este dispositivo. Si abres la app desde otro celular/computadora,
// o borras los datos del navegador, no vas a ver la misma información.
// Usa el botón "Respaldo" dentro de la app seguido de "Restaurar" si
// necesitas mover tus datos de un dispositivo a otro.

const PREFIX = "patotechlab:";

if (!window.storage) {
  window.storage = {
    async get(key, _shared) {
      const raw = localStorage.getItem(PREFIX + key);
      if (raw === null) return null;
      return { key, value: raw, shared: false };
    },

    async set(key, value, _shared) {
      try {
        localStorage.setItem(PREFIX + key, value);
        return { key, value, shared: false };
      } catch (e) {
        console.error("No se pudo guardar en localStorage:", e);
        return null;
      }
    },

    async delete(key, _shared) {
      const existed = localStorage.getItem(PREFIX + key) !== null;
      localStorage.removeItem(PREFIX + key);
      return { key, deleted: existed, shared: false };
    },

    async list(prefix = "", _shared) {
      const keys = Object.keys(localStorage)
        .filter((k) => k.startsWith(PREFIX + prefix))
        .map((k) => k.slice(PREFIX.length));
      return { keys, prefix, shared: false };
    },
  };
}
