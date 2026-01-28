// eye-tracking.js
// WebGazer + Heatmap.js demo para registrar fijaciones 30s y mostrar heatmap

const heatmapContainer = document.getElementById("heatmapContainer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");

// Heatmap overlay
const heatmapInstance = h337.create({
  container: heatmapContainer,
  radius: 35,
  maxOpacity: 0.65,
  minOpacity: 0.05,
  blur: 0.85
});

heatmapInstance.addData({ x: 200, y: 200, value: 50 });

// Guardamos puntos para análisis simple
let points = [];
let isTracking = false;
let stopTimeoutId = null;

// Ajusta el overlay al tamaño de la ventana
function resizeOverlay() {
  heatmapContainer.style.width = window.innerWidth + "px";
  heatmapContainer.style.height = window.innerHeight + "px";
}
window.addEventListener("resize", resizeOverlay);
resizeOverlay();

// Función para agregar punto al heatmap
function addPoint(x, y) {
  // Limitar a viewport
  if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) return;

  // Guardar
  points.push({ x, y, t: Date.now() });

  // Pintar en heatmap
  heatmapInstance.addData({ x, y, value: 1 });
}

// Suavizado simple: solo registra 1 punto cada X ms para evitar ruido
let lastSampleTime = 0;
const SAMPLE_EVERY_MS = 80;

// Inicia WebGazer
async function initWebgazer() {
  webgazer.setGazeListener((data) => {
    if (!data || !isTracking) return;

    const now = Date.now();
    if (now - lastSampleTime < SAMPLE_EVERY_MS) return;
    lastSampleTime = now;

    addPoint(Math.round(data.x), Math.round(data.y));
  });

  // Configuración básica
  webgazer
    .showVideo(true)
    .showPredictionPoints(true)
    .applyKalmanFilter(true);

  await webgazer.begin();
}

// Start tracking for 30s
startBtn.addEventListener("click", async () => {
  if (!window.webgazer) {
    alert("No se pudo cargar WebGazer. Revisa tu conexión.");
    return;
  }
  if (!window.h337) {
    alert("No se pudo cargar Heatmap.js.");
    return;
  }

  startBtn.disabled = true;
  stopBtn.disabled = false;

  // Limpia datos previos
  points = [];
  heatmapInstance.setData({ max: 1, data: [] });

  // Inicia si aún no está iniciado
  if (!webgazer.isReady()) {
    await initWebgazer();
  }

  isTracking = true;

  // Auto-detener a los 30s
  stopTimeoutId = setTimeout(() => {
    stopTracking();
  }, 30000);
});

// Stop tracking
function stopTracking() {
  isTracking = false;
  stopBtn.disabled = true;
  startBtn.disabled = false;

  if (stopTimeoutId) clearTimeout(stopTimeoutId);

  // Resumen simple en consola para tu análisis
  console.log("Puntos registrados:", points.length);
}

stopBtn.addEventListener("click", stopTracking);

clearBtn.addEventListener("click", () => {
  points = [];
  heatmapInstance.setData({ max: 1, data: [] });
});

// Limpia WebGazer al cerrar la página
window.addEventListener("beforeunload", () => {
  try { webgazer.end(); } catch (e) {}
});