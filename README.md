# Laboratorio-5
Eye Tracking & Heatmap Demo
Una aplicación web interactiva que utiliza la cámara web para rastrear el movimiento ocular del usuario y genera un mapa de calor (heatmap) en tiempo real sobre la interfaz.

Este proyecto utiliza WebGazer.js para el seguimiento ocular y Heatmap.js para la visualización de datos, funcionando de manera completamente local para evitar problemas de carga de recursos externos (CORS/404).

📋 Características
Seguimiento Ocular: Calibración y predicción de la mirada en tiempo real.

Mapa de Calor: Visualización de las zonas donde el usuario fija la vista.

Temporizador Automático: La sesión de grabación se detiene automáticamente a los 30 segundos.

Modo Local: Configurado para cargar los modelos de Inteligencia Artificial (MediaPipe Face Mesh) desde carpetas locales.

## 📂 Estructura del Proyecto

    ```
    Nombre-Del-Proyecto/
    │
    ├── index.html           # Estructura principal
    ├── eye-tracking.js      # Lógica de WebGazer y Heatmap
    ├── styles.css           # Estilos personalizados
    ├── bootstrap.css        # Framework CSS
    │
    └── mediapipe/           # ⚠️ CARPETA CRÍTICA PARA LA IA
    └── face_mesh/
        ├── face_mesh.binarypb
        ├── face_mesh_solution_packed_assets.data
        ├── face_mesh_solution_packed_assets_loader.js
        ├── face_mesh_solution_simd_wasm_bin.js
        └── face_mesh_solution_simd_wasm_bin.wasm

        
Nota: La carpeta mediapipe/face_mesh contiene los binarios necesarios para que el motor de detección facial funcione sin conexión a internet o sin depender de CDNs externos que pueden fallar.

🚀 Instalación y Ejecución
1. Requisitos Previos
Un navegador moderno (Chrome, Edge, Firefox).

Visual Studio Code (recomendado).

Extensión Live Server instalada en VS Code.

2. Configuración
Asegúrate de tener descargados los 5 archivos esenciales dentro de mediapipe/face_mesh/. Si falta alguno, la consola mostrará errores de tipo 404 o RuntimeError: abort.

3. Ejecutar
No abras el archivo index.html directamente haciendo doble clic (protocolo file://), ya que bloqueará el acceso a la cámara y a los archivos .wasm.

Abre la carpeta del proyecto en VS Code.

Haz clic derecho en index.html.

Selecciona "Open with Live Server".

El navegador se abrirá (usualmente en http://127.0.0.1:5500).

🎮 Cómo Usar
Al cargar la página, el navegador pedirá permiso para usar la cámara. Haz clic en "Permitir".

Verás un recuadro de video (feedback) en la pantalla.

Haz clic en el botón verde "Iniciar (30s)".

Mira diferentes partes de la pantalla. El mapa de calor se irá dibujando en tiempo real.

A los 30 segundos, el rastreo se detendrá automáticamente.

Usa el botón "Limpiar mapa" para reiniciar la visualización.

🛠️ Tecnologías Utilizadas
WebGazer.js - Eye Tracking en el navegador.

Heatmap.js - Generación de mapas de calor dinámicos.

MediaPipe Face Mesh - Malla facial de alta precisión (Google).

Bootstrap - Estilizado de la interfaz.

🐛 Solución de Problemas Comunes
Error: RuntimeError: abort(both async and sync fetching of the wasm failed)

Causa: Faltan archivos .wasm o .data en la carpeta local, o la ruta de la carpeta mediapipe está mal escrita.

Solución: Revisa la sección "Estructura del Proyecto" y asegúrate de que los 5 archivos existen.

Error: No stream o Pantalla negra

Causa: No se dieron permisos de cámara o se está ejecutando sin un servidor local.

Solución: Usa "Live Server" y permite el acceso a la cámara cuando el navegador lo solicite.
