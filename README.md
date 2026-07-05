# PatoTechLab · Bitácora

App de escritorio/celular para administrar pedidos, consumibles, finanzas y métricas de PatoTechLab.

## ⚠️ Importante sobre tus datos

Esta versión guarda todo en el **localStorage de tu navegador** (a diferencia de la versión dentro de Claude, que usaba su propio almacenamiento). Eso significa:

- Los datos se quedan en el navegador y dispositivo donde la uses. Si la abres desde otro celular o computadora, vas a ver una app vacía (o con los datos de ejemplo).
- Si borras el caché/datos de navegación de tu navegador, se pierden.
- Usa el botón **"Respaldo"** dentro de la app seguido de **"Restaurar"** para mover tus datos de un dispositivo/navegador a otro, o como copia de seguridad periódica.

## Requisitos

- [Node.js](https://nodejs.org/) versión 18 o más reciente instalado en tu computadora.
- Una cuenta de [GitHub](https://github.com).
- [Git](https://git-scm.com/downloads) instalado.

## Cómo probarla en tu computadora (opcional, antes de publicar)

Abre una terminal dentro de esta carpeta y corre:

```bash
npm install
npm run dev
```

Esto abre la app en `http://localhost:5173` para que la veas funcionando antes de publicarla.

## Cómo publicarla en GitHub Pages

### 1. Crea el repositorio en GitHub

Entra a [github.com/new](https://github.com/new), ponle un nombre (ej. `patotech-bitacora`) y créalo **vacío** (sin README, sin .gitignore — ya los trae esta carpeta).

### 2. Sube el código

Dentro de esta carpeta, en la terminal:

```bash
git init
git add .
git commit -m "Primera versión de la bitácora"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

Cambia `TU-USUARIO` y `TU-REPOSITORIO` por los tuyos reales.

### 3. Instala las dependencias y publica

```bash
npm install
npm run deploy
```

Esto construye la app y la sube a una rama especial llamada `gh-pages` dentro de tu mismo repositorio.

### 4. Activa GitHub Pages

En GitHub, entra a tu repositorio → **Settings** → **Pages** (en el menú de la izquierda). En "Build and deployment", en la sección "Branch", selecciona `gh-pages` y guarda.

Después de uno o dos minutos, tu app va a estar disponible en:

```
https://TU-USUARIO.github.io/TU-REPOSITORIO/
```

### 5. Cada vez que quieras actualizarla

Si más adelante le pides más cambios a Claude y te da un `App.jsx` nuevo:

1. Reemplaza el archivo `src/App.jsx` de esta carpeta con el nuevo.
2. Corre de nuevo:

```bash
git add .
git commit -m "Actualización"
git push
npm run deploy
```

## Estructura del proyecto

```
patotech-app/
├── index.html          ← HTML base
├── package.json         ← dependencias y scripts
├── vite.config.js       ← configuración de Vite
├── src/
│   ├── main.jsx              ← punto de entrada
│   ├── storagePolyfill.js    ← hace que window.storage funcione con localStorage
│   └── App.jsx                ← tu app completa (pedidos, consumibles, finanzas, métricas)
```
