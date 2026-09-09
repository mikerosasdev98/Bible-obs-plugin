// Canal de comunicación para OBS
const channel = new BroadcastChannel("bibleVerseChannel");

const overlayWrapper = document.getElementById("overlay-wrapper");
const verseBox = document.getElementById("verse-box");
const verseCitation = document.getElementById("verse-citation");
const verseVersion = document.getElementById("verse-version");
const verseText = document.getElementById("verse-text");

// Cargar ajustes guardados en localStorage
function loadSavedSettings() {
    const savedFont = localStorage.getItem("selectedFont");
    if (savedFont) {
        document.body.style.fontFamily = savedFont;
    }

    const savedTheme = localStorage.getItem("selectedTheme") || "theme-lower-third";
    setTheme(savedTheme);

    const savedSize = localStorage.getItem("selectedSize") || "size-medium";
    setSize(savedSize);

    const savedBgType = localStorage.getItem("selectedBgType") || "default";
    const savedBgValue = localStorage.getItem("selectedBgValue") || "";
    const savedBgDarkness = localStorage.getItem("selectedBgDarkness") || "0.65";
    applyBackground(savedBgType, savedBgValue, savedBgDarkness);
}

function setTheme(theme) {
    overlayWrapper.classList.remove("theme-lower-third", "theme-card-center", "theme-minimal");
    overlayWrapper.classList.add(theme);
}

function setSize(size) {
    overlayWrapper.classList.remove("size-small", "size-medium", "size-large");
    overlayWrapper.classList.add(size);
}

function applyBackground(type, value, darkness) {
    if (!type || type === 'default') {
        verseBox.style.background = '';
        verseBox.style.backgroundImage = '';
        verseBox.style.backgroundColor = '';
        return;
    }

    const darkVal = (darkness !== undefined && darkness !== null) ? parseFloat(darkness) : 0.65;
    const overlayGradient = `linear-gradient(rgba(0, 0, 0, ${darkVal}), rgba(0, 0, 0, ${darkVal}))`;

    if (type === 'image' && value) {
        verseBox.style.background = `${overlayGradient}, url("${value}") center / cover no-repeat`;
    } else if (type === 'gradient' && value) {
        verseBox.style.background = `${overlayGradient}, ${value}`;
    } else if (type === 'color' && value) {
        verseBox.style.backgroundColor = value;
        verseBox.style.backgroundImage = 'none';
    }
}

function displayVerse(data) {
    if (!data || !data.text || data.text.trim() === "") {
        hideVerse();
        return;
    }

    // Actualizar contenidos
    verseCitation.textContent = data.citation || "";
    verseVersion.textContent = data.version || "";
    verseText.textContent = data.text;

    // Aplicar estilos si vienen en el payload
    if (data.fontFamily) {
        document.body.style.fontFamily = data.fontFamily;
    }
    if (data.theme) {
        setTheme(data.theme);
    }
    if (data.fontSize) {
        setSize(data.fontSize);
    }
    if (data.backgroundType) {
        applyBackground(data.backgroundType, data.backgroundValue, data.backgroundDarkness);
    }

    // Animar entrada
    verseBox.classList.remove("hidden");
    verseBox.classList.add("visible");
}

function hideVerse() {
    verseBox.classList.remove("visible");
    verseBox.classList.add("hidden");
}

// Procesar mensajes entrantes
function handleMessage(payload) {
    if (!payload) return;

    // Compatibilidad si llega string (JSON o formato anterior)
    let data = payload;
    if (typeof payload === "string") {
        try {
            data = JSON.parse(payload);
        } catch (e) {
            const parts = payload.split('"');
            if (parts.length >= 2 && parts[0].trim() !== '') {
                data = {
                    action: "SHOW_VERSE",
                    citation: parts[0].replace(/-/g, '').trim(),
                    text: parts[1].trim()
                };
            } else {
                data = { action: "HIDE_VERSE" };
            }
        }
    }

    switch (data.action) {
        case "SHOW_VERSE":
            displayVerse(data);
            break;
        case "HIDE_VERSE":
            hideVerse();
            break;
        case "UPDATE_STYLE":
            if (data.fontFamily) document.body.style.fontFamily = data.fontFamily;
            if (data.theme) setTheme(data.theme);
            if (data.fontSize) setSize(data.fontSize);
            if (data.backgroundType) {
                applyBackground(data.backgroundType, data.backgroundValue, data.backgroundDarkness);
            }
            break;
        default:
            if (data.text) {
                displayVerse(data);
            }
            break;
    }
}

// Event listener del canal de Broadcast
channel.onmessage = function (event) {
    handleMessage(event.data);
};

// Sincronización en caso de recarga o uso de localStorage
window.addEventListener("storage", function (event) {
    if (event.key === "currentLiveVerse") {
        if (event.newValue) {
            try {
                handleMessage(JSON.parse(event.newValue));
            } catch (e) {
                console.error("Error parsing currentLiveVerse", e);
            }
        } else {
            hideVerse();
        }
    } else if (event.key === "selectedBgType" || event.key === "selectedBgValue" || event.key === "selectedBgDarkness") {
        const savedBgType = localStorage.getItem("selectedBgType") || "default";
        const savedBgValue = localStorage.getItem("selectedBgValue") || "";
        const savedBgDarkness = localStorage.getItem("selectedBgDarkness") || "0.65";
        applyBackground(savedBgType, savedBgValue, savedBgDarkness);
    }
});

// Inicializar configuración al cargar
loadSavedSettings();
