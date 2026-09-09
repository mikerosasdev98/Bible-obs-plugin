# Bible OBS Plugin 📖🎬

Plugin interactivo para buscar y proyectar versículos de la Biblia en transmisiones en vivo con **OBS Studio**.

Cuenta con un **Panel de Control (Dock)** moderno para el operador y un **Overlay transparente (Browser Source)** de alto contraste con animaciones fluidas para el streaming.

---

## 🚀 Características Nuevas y Mejoras

- **Comunicación en Tiempo Real:** Sincronización instantánea mediante `BroadcastChannel` usando datos estructurados en JSON (soporta textos con comillas y diálogos sin romperse).
- **Carga Rápida y Ligera (Lazy Loading):** Se carga `RV1960` por defecto y las demás versiones bíblicas solo se cargan si las seleccionas, ahorrando más de **40 MB de memoria RAM** en OBS.
- **Soporte de Abreviaturas Bíblicas:** Puedes escribir `Jn 3:16`, `Gn 1:1`, `Sal 23`, `1 Co 13:4-8`, `Rom 8:28` o nombres completos.
- **Overlay de Alto Contraste y Fondos Personalizados:** 
  - **Subida de Imágenes Propias:** El operador puede subir sus propias fotos o fondos desde el Dock (`.jpg`, `.png`, `.webp`) y se proyectan al instante en OBS.
  - **Degradados Premium Incluidos:** Azul Noche Celestial, Dorado / Luz Cálida, Púrpura Real, Esmeralda Profundo o Vidrio Oscuro por defecto.
  - **Control de Contraste y Oscurecimiento:** Control deslizante para regular la opacidad de la capa oscura sobre la imagen, garantizando que el texto blanco siempre sea perfectamente legible sobre cualquier cámara o imagen.
  - Soporta 3 temas de posición: **Tercio Inferior (Lower-Third)**, **Tarjeta Centrada** y **Minimalista con Sombra**.
- **Control "En el Aire" (On Air):** Indicador visual en el Dock para saber con certeza qué versículo está proyectándose en pantalla.
- **Botón de Pánico / Limpiar Pantalla:** Oculta el versículo al instante con un solo clic o con la tecla `[Esc]`.
- **Historial Reciente:** Registra los versículos citados durante el servicio para volver a proyectarlos con un clic.
- **Atajos de Teclado Globales:**
  - `[←]` / `[→]` : Versículo anterior / siguiente.
  - `[Espacio]` : Proyectar / Ocultar el versículo actual.
  - `[Esc]` : Ocultar pantalla de inmediato (Blackout).
  - `[Enter]` en la barra de búsqueda : Buscar al instante.

---

## 🛠️ Configuración en OBS Studio

### 1. Panel de Control (Custom Browser Dock)
1. En OBS Studio, ve al menú superior: **Docks (Paneles) ➔ Custom Browser Docks (Paneles de navegador personalizados)**.
2. Añade un nuevo dock:
   - **Nombre:** `Biblia Control`
   - **URL:** Ruta a tu archivo `index.html`, por ejemplo:
     - `file:///Ruta/a/Bible-obs-plugin/index.html` (o `http://localhost:PUERTO/index.html` si usas servidor local).
3. Haz clic en **Aplicar**. Podrás arrastrar y acoplar este panel en cualquier parte de la interfaz de OBS.
4. **Dimensiones recomendadas para el Dock:** Ancho aproximado de `400px` a `550px`.

### 2. Fuente de Superposición en Escenas (Browser Source)
1. En tu Escena de OBS, añade una nueva fuente: **`+` ➔ Navegador (Browser Source)**.
2. Configuración de la fuente:
   - Marca la casilla **Archivo local (Local file)** y selecciona `verso.html` (o ingresa la URL de `verso.html`).
   - **Ancho (Width):** `1920`
   - **Alto (Height):** `1080`
   - Deja el campo de CSS personalizado vacío o por defecto (el fondo es 100% transparente).
   - Marca la opción **"Actualizar el navegador cuando la escena se active"** si deseas resetear el estado al cambiar de escena.

---

## 📚 Versiones Bíblicas Incluidas
- **RV1960** (Reina-Valera 1960)
- **NVI** (Nueva Versión Internacional)
- **LBLA** (La Biblia de las Américas)
- **NTV** (Nueva Traducción Viviente)
- **TLA** (Traducción en Lenguaje Actual)
- **DHH** (Dios Habla Hoy)

---

## ⌨️ Desarrollado por
Miguel Rosas & José Rosas Jiménez - © 2024 - 2026.