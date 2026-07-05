# PatoTechLab · Bitácora

App para administrar pedidos, consumibles, finanzas y métricas de PatoTechLab.

## ☁️ Cómo funciona el guardado (Firebase)

Esta versión guarda tus datos en **Firebase (Firestore)**, no en el navegador. Eso significa:

- Inicias sesión **una sola vez por dispositivo** (con un correo y contraseña que tú eliges — se crea la primera vez que entras).
- Después de ese primer inicio de sesión, la app recuerda que eres tú en ese navegador, así que no te lo vuelve a pedir.
- Todo lo que agregues, edites o borres se guarda solo, automáticamente, y aparece igual sin importar desde qué celular o computadora entres (mientras inicies sesión con el mismo correo).

### ⚠️ Muy importante: activa las reglas de seguridad

Por default, cualquiera con tus llaves de Firebase (que están en `src/firebaseConfig.js`, y **no son secretas**) podría intentar leer la base de datos si no configuras las reglas. Para que **solo tú** puedas leer/escribir tus propios datos:

1. Ve a [console.firebase.google.com](https://console.firebase.google.com) → tu proyecto → **Firestore Database** → pestaña **Reglas** (Rules).
2. Borra lo que haya y pega esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Dale **Publicar** (Publish).

Esto dice: "solo un usuario que inició sesión puede leer/escribir el documento que tiene su mismo ID" — nadie más puede ver tus pedidos ni tus finanzas, ni siquiera con las llaves públicas.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o más reciente.
- Una cuenta de [GitHub](https://github.com).
- Un proyecto de [Firebase](https://console.firebase.google.com) con **Firestore** y **Authentication (Email/Password)** activados (ya lo tienes si seguiste los pasos con Claude).

## Cómo probarla en tu computadora

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`, crea tu cuenta la primera vez (correo + contraseña), y ya puedes usarla.

## Cómo publicar cambios nuevos

Cada vez que Claude te dé un `App.jsx` actualizado:

1. Reemplaza `src/App.jsx` con el nuevo archivo.
2. En la terminal, dentro de esta carpeta:

```bash
git add .
git commit -m "Actualización"
git push
npm run deploy
```

Espera 1-2 minutos y actualiza la página de tu app.

## Estructura del proyecto

```
patotech-app/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              ← punto de entrada
│   ├── firebaseConfig.js     ← llaves de tu proyecto de Firebase
│   ├── firebase.js           ← inicializa Firebase (auth + Firestore)
│   ├── firebaseStorage.js    ← hace que window.storage funcione con Firestore
│   ├── AuthGate.jsx          ← pantalla de inicio de sesión / registro
│   └── App.jsx               ← tu app completa (pedidos, consumibles, finanzas, métricas)
```

## Si algún día quieres agregar más gente a tu cuenta

Ahora mismo, cualquiera que sepa tu correo y contraseña puede entrar a los mismos datos (por ejemplo, si quieres que un empleado también anote pedidos). Si más adelante quieres varias cuentas independientes o permisos distintos, dile a Claude — es un cambio adicional a las reglas y la estructura de datos.
