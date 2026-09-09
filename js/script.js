// Canal de comunicación para OBS
const channel = new BroadcastChannel("bibleVerseChannel");

// Mapa de abreviaturas canónicas de libros bíblicos en español
const BIBLE_ABBREVIATIONS = {
    // Antiguo Testamento
    "gn": "Génesis", "gen": "Génesis", "genesis": "Génesis",
    "ex": "Éxodo", "exo": "Éxodo", "exod": "Éxodo", "exodo": "Éxodo",
    "lv": "Levítico", "lev": "Levítico", "levitico": "Levítico",
    "nm": "Números", "num": "Números", "numeros": "Números",
    "dt": "Deuteronomio", "deu": "Deuteronomio", "deut": "Deuteronomio", "deuteronomio": "Deuteronomio",
    "jos": "Josué", "josue": "Josué",
    "jue": "Jueces", "juec": "Jueces", "jueces": "Jueces",
    "rt": "Rut", "rut": "Rut",
    "1s": "1 Samuel", "1sam": "1 Samuel", "1 sam": "1 Samuel", "1samuel": "1 Samuel", "1 samuel": "1 Samuel",
    "2s": "2 Samuel", "2sam": "2 Samuel", "2 sam": "2 Samuel", "2samuel": "2 Samuel", "2 samuel": "2 Samuel",
    "1r": "1 Reyes", "1re": "1 Reyes", "1 rey": "1 Reyes", "1reyes": "1 Reyes", "1 reyes": "1 Reyes",
    "2r": "2 Reyes", "2re": "2 Reyes", "2 rey": "2 Reyes", "2reyes": "2 Reyes", "2 reyes": "2 Reyes",
    "1cr": "1 Crónicas", "1cron": "1 Crónicas", "1 cronicas": "1 Crónicas", "1cronicas": "1 Crónicas",
    "2cr": "2 Crónicas", "2cron": "2 Crónicas", "2 cronicas": "2 Crónicas", "2cronicas": "2 Crónicas",
    "esd": "Esdras", "esdras": "Esdras",
    "neh": "Nehemías", "nehemias": "Nehemías",
    "est": "Ester", "ester": "Ester",
    "job": "Job",
    "sal": "Salmos", "salm": "Salmos", "salmo": "Salmos", "salmos": "Salmos", "ps": "Salmos",
    "pr": "Proverbios", "pro": "Proverbios", "prov": "Proverbios", "proverbios": "Proverbios",
    "ec": "Eclesiastés", "ecl": "Eclesiastés", "eclesiastes": "Eclesiastés",
    "cnt": "Cantares", "cant": "Cantares", "cantar": "Cantares", "cantares": "Cantares",
    "is": "Isaías", "isa": "Isaías", "isaias": "Isaías",
    "jr": "Jeremías", "jer": "Jeremías", "jeremias": "Jeremías",
    "lm": "Lamentaciones", "lam": "Lamentaciones", "lamentaciones": "Lamentaciones",
    "ez": "Ezequiel", "eze": "Ezequiel", "ezequiel": "Ezequiel",
    "dn": "Daniel", "dan": "Daniel", "daniel": "Daniel",
    "os": "Oseas", "ose": "Oseas", "oseas": "Oseas",
    "jl": "Joel", "joe": "Joel", "joel": "Joel",
    "am": "Amós", "amo": "Amós", "amos": "Amós",
    "abd": "Abdías", "abdias": "Abdías",
    "jon": "Jonás", "jonas": "Jonás",
    "miq": "Miqueas", "miqueas": "Miqueas",
    "nah": "Nahúm", "nahum": "Nahúm",
    "hab": "Habacuc", "habacuc": "Habacuc",
    "sof": "Sofonías", "sofonias": "Sofonías",
    "hag": "Hageo", "hageo": "Hageo",
    "zac": "Zacarías", "zacarias": "Zacarías",
    "mal": "Malaquías", "malaquias": "Malaquías",
    // Nuevo Testamento
    "mt": "Mateo", "mat": "Mateo", "mateo": "Mateo",
    "mc": "Marcos", "mar": "Marcos", "marcos": "Marcos",
    "lc": "Lucas", "luc": "Lucas", "lucas": "Lucas",
    "jn": "Juan", "jua": "Juan", "juan": "Juan",
    "hch": "Hechos", "hec": "Hechos", "hechos": "Hechos",
    "ro": "Romanos", "rom": "Romanos", "romanos": "Romanos",
    "1co": "1 Corintios", "1cor": "1 Corintios", "1 cor": "1 Corintios", "1corintios": "1 Corintios", "1 corintios": "1 Corintios",
    "2co": "2 Corintios", "2cor": "2 Corintios", "2 cor": "2 Corintios", "2corintios": "2 Corintios", "2 corintios": "2 Corintios",
    "ga": "Gálatas", "gal": "Gálatas", "galatas": "Gálatas",
    "ef": "Efesios", "efe": "Efesios", "efesios": "Efesios",
    "flp": "Filipenses", "fil": "Filipenses", "filipenses": "Filipenses",
    "col": "Colosenses", "colosenses": "Colosenses",
    "1ts": "1 Tesalonicenses", "1tes": "1 Tesalonicenses", "1 tes": "1 Tesalonicenses", "1tesalonicenses": "1 Tesalonicenses",
    "2ts": "2 Tesalonicenses", "2tes": "2 Tesalonicenses", "2 tes": "2 Tesalonicenses", "2tesalonicenses": "2 Tesalonicenses",
    "1ti": "1 Timoteo", "1tim": "1 Timoteo", "1 tim": "1 Timoteo", "1timoteo": "1 Timoteo",
    "2ti": "2 Timoteo", "2tim": "2 Timoteo", "2 tim": "2 Timoteo", "2timoteo": "2 Timoteo",
    "tit": "Tito", "tito": "Tito",
    "flm": "Filemón", "filemon": "Filemón",
    "heb": "Hebreos", "hebreos": "Hebreos",
    "stg": "Santiago", "san": "Santiago", "sant": "Santiago", "santiago": "Santiago",
    "1p": "1 Pedro", "1pe": "1 Pedro", "1 ped": "1 Pedro", "1pedro": "1 Pedro",
    "2p": "2 Pedro", "2pe": "2 Pedro", "2 ped": "2 Pedro", "2pedro": "2 Pedro",
    "1j": "1 Juan", "1jn": "1 Juan", "1 jn": "1 Juan", "1juan": "1 Juan",
    "2j": "2 Juan", "2jn": "2 Juan", "2 jn": "2 Juan", "2juan": "2 Juan",
    "3j": "3 Juan", "3jn": "3 Juan", "3 jn": "3 Juan", "3juan": "3 Juan",
    "jud": "Judas", "judas": "Judas",
    "ap": "Apocalipsis", "apo": "Apocalipsis", "apoc": "Apocalipsis", "apocalipsis": "Apocalipsis", "rev": "Apocalipsis"
};

// Estado Global de la Aplicación
let currentBook = null;
let currentChapter = 1;
let currentVerse = 1;
let currentVersion = 'RV1960';
let liveVerseData = null; // Versículo que actualmente está en el aire (o null)
let recentHistory = [];

// Cache y control de carga diferida de biblias
const loadedVersions = {};

function cleanString(str) {
    if (!str) return "";
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/gi, '')
        .toLowerCase();
}

// Obtener de forma segura el array de la Biblia independientemente de si se declaró con const, let o var
function getGlobalBible(version) {
    if (window[version] && Array.isArray(window[version])) {
        return window[version];
    }
    try {
        const val = Function(`return (typeof ${version} !== 'undefined') ? ${version} : null;`)();
        if (val && Array.isArray(val)) {
            window[version] = val; // Asegurar referencia en window para accesos subsecuentes
            return val;
        }
    } catch (e) {}
    return null;
}

// Cargar dinámicamente el script de la versión si no está en memoria
function loadBibleVersion(version) {
    const existing = getGlobalBible(version);
    if (existing) {
        return Promise.resolve(existing);
    }

    if (loadedVersions[version]) {
        return loadedVersions[version];
    }

    loadedVersions[version] = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `bibles/${version}.js`;
        script.async = true;
        script.onload = () => {
            const data = getGlobalBible(version);
            if (data) {
                resolve(data);
            } else {
                reject(new Error(`No se encontró el array de datos para ${version}`));
            }
        };
        script.onerror = () => {
            reject(new Error(`Error al cargar el archivo bibles/${version}.js`));
        };
        document.body.appendChild(script);
    });

    return loadedVersions[version];
}

// Resolver nombre del libro usando abreviaturas o búsqueda difusa
function resolveBook(inputName, books) {
    const cleaned = cleanString(inputName);

    // 1. Coincidencia directa con mapa de abreviaturas
    if (BIBLE_ABBREVIATIONS[cleaned]) {
        const canonical = cleanString(BIBLE_ABBREVIATIONS[cleaned]);
        const found = books.find(b => cleanString(b.name) === canonical);
        if (found) return found;
    }

    // 2. Coincidencia exacta con nombre del libro
    let found = books.find(b => cleanString(b.name) === cleaned);
    if (found) return found;

    // 3. Coincidencia si el nombre del libro empieza con la búsqueda
    found = books.find(b => cleanString(b.name).startsWith(cleaned));
    if (found) return found;

    // 4. Coincidencia parcial
    found = books.find(b => cleanString(b.name).includes(cleaned));
    return found || null;
}

// Parser inteligente de referencias bíblicas
function parseReference(refStr, books) {
    const text = refStr.trim();
    if (!text) return null;

    // Regex para: [Nombre de libro / abrev] [capítulo] : [versículo]-[fin]?
    // Ejemplos: "Jn 3:16", "1 Corintios 13:4-8", "Salmos 23", "Génesis 1:1"
    const match = text.match(/^([\d]?\s*[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)\s*(\d+)?(?:\s*[:.]\s*(\d+)(?:\s*-\s*(\d+))?)?$/);

    if (match) {
        const bookPart = match[1].trim();
        const chapter = match[2] ? parseInt(match[2], 10) : 1;
        const startVerse = match[3] ? parseInt(match[3], 10) : null;
        const endVerse = match[4] ? parseInt(match[4], 10) : startVerse;

        const book = resolveBook(bookPart, books);
        if (book) {
            return {
                book,
                chapter,
                startVerse,
                endVerse: endVerse || startVerse
            };
        }
    }

    // Fallback simple: separar última palabra si es numérica
    const parts = text.split(/\s+/);
    if (parts.length > 1) {
        const lastPart = parts[parts.length - 1];
        if (/^\d+(:\d+(-\d+)?)?$/.test(lastPart)) {
            const bookName = parts.slice(0, -1).join(' ');
            const book = resolveBook(bookName, books);
            if (book) {
                const cv = lastPart.split(':');
                const chapter = parseInt(cv[0], 10);
                let startVerse = null;
                let endVerse = null;
                if (cv[1]) {
                    const vr = cv[1].split('-');
                    startVerse = parseInt(vr[0], 10);
                    endVerse = vr[1] ? parseInt(vr[1], 10) : startVerse;
                }
                return { book, chapter, startVerse, endVerse };
            }
        }
    }

    return null;
}

// Gradientes predefinidos elegantes para streaming
const PRESET_GRADIENTS = {
    'gradient-blue': 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    'gradient-gold': 'linear-gradient(135deg, #2c1802 0%, #573809 50%, #78500c 100%)',
    'gradient-purple': 'linear-gradient(135deg, #1f0d3d 0%, #391369 50%, #5c208a 100%)',
    'gradient-emerald': 'linear-gradient(135deg, #052317 0%, #0c3e29 50%, #155e3e 100%)'
};

// Obtener los estilos seleccionados actualmente (fuente, tema, tamaño y fondo)
function getCurrentStyles() {
    const bgSelection = $('#bgSelect').val() || 'default';
    const bgDarkness = parseFloat($('#bgDarknessSlider').val()) || 0.65;
    let bgType = 'default';
    let bgValue = '';

    if (bgSelection === 'custom-image') {
        const customImg = localStorage.getItem('customUploadedBg');
        if (customImg) {
            bgType = 'image';
            bgValue = customImg;
        }
    } else if (PRESET_GRADIENTS[bgSelection]) {
        bgType = 'gradient';
        bgValue = PRESET_GRADIENTS[bgSelection];
    }

    return {
        fontFamily: $('#fontSelect').val(),
        theme: $('#themeSelect').val(),
        fontSize: $('#sizeSelect').val(),
        textColor: $('#textColorSelect').val() || 'text-light',
        backgroundType: bgType,
        backgroundValue: bgValue,
        backgroundDarkness: bgDarkness
    };
}

// Transmitir estilos en tiempo real al Overlay de OBS
function broadcastStyles() {
    const styles = getCurrentStyles();
    localStorage.setItem('selectedFont', styles.fontFamily);
    localStorage.setItem('selectedTheme', styles.theme);
    localStorage.setItem('selectedSize', styles.fontSize);
    localStorage.setItem('selectedTextColor', styles.textColor);
    localStorage.setItem('selectedBgType', styles.backgroundType);
    localStorage.setItem('selectedBgValue', styles.backgroundValue);
    localStorage.setItem('selectedBgDarkness', styles.backgroundDarkness);
    localStorage.setItem('selectedBgSelectVal', $('#bgSelect').val());

    channel.postMessage({
        action: 'UPDATE_STYLE',
        ...styles
    });
}

// Enviar versículo al Overlay de OBS
function broadcastVerse(verseData) {
    channel.postMessage(verseData);

    if (verseData.action === 'SHOW_VERSE') {
        localStorage.setItem('currentLiveVerse', JSON.stringify(verseData));
        updateLiveIndicator(true, verseData.citation);
        updateMonitor(verseData);
        addToRecentHistory(verseData);
    } else if (verseData.action === 'HIDE_VERSE') {
        localStorage.removeItem('currentLiveVerse');
        updateLiveIndicator(false);
        updateMonitor(null);
    }
}

// Actualizar el monitor interno del Dock
function updateMonitor(data) {
    if (data && data.text) {
        $('#monitor-citation').text(data.citation);
        $('#monitor-text').text(data.text);
        $('#live-version-tag').text(data.version || currentVersion);
        $('#monitor-box').addClass('is-live');
    } else {
        $('#monitor-citation').text('Ningún versículo en pantalla');
        $('#monitor-text').text('Selecciona un verso para proyectarlo en el stream.');
        $('#live-version-tag').text('');
        $('#monitor-box').removeClass('is-live');
    }
}

// Actualizar indicador visual EN EL AIRE
function updateLiveIndicator(isOnAir, citation = '') {
    const badge = $('#live-indicator');
    const statusText = $('#live-status-text');

    if (isOnAir) {
        badge.removeClass('badge-off').addClass('badge-on');
        statusText.text(`EN VIVO: ${citation}`);
    } else {
        badge.removeClass('badge-on').addClass('badge-off');
        statusText.text('OCULTO');
    }
}

// Agregar al historial reciente
function addToRecentHistory(verseData) {
    // Evitar duplicado inmediato
    if (recentHistory.length > 0 && recentHistory[0].citation === verseData.citation) {
        return;
    }

    recentHistory.unshift({
        citation: verseData.citation,
        version: verseData.version,
        text: verseData.text,
        bookName: currentBook ? currentBook.name : '',
        chapter: currentChapter,
        verse: currentVerse
    });

    if (recentHistory.length > 10) {
        recentHistory.pop();
    }

    try {
        localStorage.setItem('bibleRecentHistory', JSON.stringify(recentHistory));
    } catch (e) {}

    renderRecentHistory();
}

function renderRecentHistory() {
    const container = $('#recent-history-list');
    container.empty();

    if (recentHistory.length === 0) {
        container.html('<div class="text-muted text-center py-3" style="font-size: 12px;">Sin versículos recientes</div>');
        return;
    }

    recentHistory.forEach((item, index) => {
        const row = $(`
            <div class="history-item">
                <span class="fw-bold">${item.citation}</span>
                <span class="badge bg-secondary">${item.version}</span>
            </div>
        `);

        row.on('click', function () {
            const styles = getCurrentStyles();
            liveVerseData = {
                action: 'SHOW_VERSE',
                citation: item.citation,
                version: item.version,
                text: item.text,
                ...styles
            };
            broadcastVerse(liveVerseData);

            // Resaltar en la lista si coincide
            $('.verse-item').removeClass('selected');
            $(`.verse-item[data-verse="${item.verse}"]`).addClass('selected');
        });

        container.append(row);
    });
}

// Mostrar el contenido del capítulo en el panel de resultados
function renderChapterVerses(book, chapter, highlightVerse = null) {
    const container = $('#result');
    container.empty();

    if (!book || !book.chapters || !book.chapters[chapter - 1]) {
        container.html('<div class="alert alert-danger">Capítulo no disponible</div>');
        return;
    }

    const chapterData = book.chapters[chapter - 1];
    $('#chapter-title').text(`${book.name} - Capítulo ${chapter} (${currentVersion})`);

    chapterData.verses.forEach(v => {
        const verseNum = parseInt(v.number, 10);
        const isSelected = (liveVerseData && liveVerseData.citation.includes(`${book.name} ${chapter}:${verseNum}`));

        const item = $(`
            <div class="verse-item ${isSelected ? 'selected' : ''}" data-verse="${verseNum}">
                <span class="verse-num">${verseNum}</span>
                <span class="verse-content">${v.text}</span>
            </div>
        `);

        item.on('click', function () {
            currentVerse = verseNum;
            const citation = `${book.name} ${chapter}:${verseNum}`;

            // Si ya estaba en el aire este versículo, ocultarlo (toggle)
            if (liveVerseData && liveVerseData.citation === citation) {
                hideLiveVerse();
            } else {
                showLiveVerse(book, chapter, verseNum, v.text);
            }
        });

        container.append(item);
    });

    if (highlightVerse) {
        const target = $(`.verse-item[data-verse="${highlightVerse}"]`);
        if (target.length) {
            target[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Proyectar versículo específico
function showLiveVerse(book, chapter, verseNum, verseText) {
    currentBook = book;
    currentChapter = chapter;
    currentVerse = verseNum;

    const citation = `${book.name} ${chapter}:${verseNum}`;
    const styles = getCurrentStyles();

    liveVerseData = {
        action: 'SHOW_VERSE',
        citation: citation,
        version: currentVersion,
        text: verseText,
        ...styles
    };

    $('.verse-item').removeClass('selected');
    $(`.verse-item[data-verse="${verseNum}"]`).addClass('selected');
    $('#reference').val(`${book.name} ${chapter}:${verseNum}`);

    broadcastVerse(liveVerseData);
}

// Ocultar versículo
function hideLiveVerse() {
    liveVerseData = null;
    $('.verse-item').removeClass('selected');
    broadcastVerse({ action: 'HIDE_VERSE' });
}

// Ejecutar búsqueda
async function executeSearch() {
    const rawRef = $('#reference').val().trim();
    if (!rawRef) return;

    $('#autocomplete-list').hide();

    try {
        const books = await loadBibleVersion(currentVersion);
        const parsed = parseReference(rawRef, books);

        if (!parsed) {
            $('#result').html(`
                <div class="alert alert-warning m-2 text-center">
                    <i class="bi bi-exclamation-triangle me-1"></i>
                    No se encontró "<strong>${rawRef}</strong>". Intenta ej: <code>Jn 3:16</code> o <code>Génesis 1</code>.
                </div>
            `);
            return;
        }

        currentBook = parsed.book;
        currentChapter = parsed.chapter || 1;

        // Validar límites de capítulo
        if (currentChapter > currentBook.chapters.length) {
            currentChapter = currentBook.chapters.length;
        } else if (currentChapter < 1) {
            currentChapter = 1;
        }

        const chapterData = currentBook.chapters[currentChapter - 1];

        // Si se especificó versículo
        if (parsed.startVerse) {
            currentVerse = parsed.startVerse;
            if (currentVerse > chapterData.verses.length) currentVerse = chapterData.verses.length;

            renderChapterVerses(currentBook, currentChapter, currentVerse);

            // Si es un rango de versículos (ej: Juan 3:16-17)
            if (parsed.endVerse && parsed.endVerse > parsed.startVerse) {
                const versesInRange = chapterData.verses.filter(v => {
                    const n = parseInt(v.number, 10);
                    return n >= parsed.startVerse && n <= parsed.endVerse;
                });
                const combinedText = versesInRange.map(v => `${v.number}. ${v.text}`).join(' ');
                const citation = `${currentBook.name} ${currentChapter}:${parsed.startVerse}-${parsed.endVerse}`;
                const styles = getCurrentStyles();

                liveVerseData = {
                    action: 'SHOW_VERSE',
                    citation,
                    version: currentVersion,
                    text: combinedText,
                    ...styles
                };
                broadcastVerse(liveVerseData);
            } else {
                const vData = chapterData.verses.find(v => parseInt(v.number, 10) === currentVerse);
                if (vData) {
                    showLiveVerse(currentBook, currentChapter, currentVerse, vData.text);
                }
            }
        } else {
            // Mostrar todo el capítulo sin seleccionar uno de antemano
            currentVerse = 1;
            renderChapterVerses(currentBook, currentChapter);
        }

    } catch (err) {
        console.error("Error al buscar:", err);
        $('#result').html(`<div class="alert alert-danger">Error: ${err.message}</div>`);
    }
}

// Navegación: Versículo Siguiente
function nextVerse() {
    if (!currentBook) return;
    const chapterData = currentBook.chapters[currentChapter - 1];

    if (currentVerse < chapterData.verses.length) {
        currentVerse++;
    } else if (currentChapter < currentBook.chapters.length) {
        currentChapter++;
        currentVerse = 1;
        renderChapterVerses(currentBook, currentChapter, currentVerse);
    } else {
        return; // Fin del libro
    }

    const newChapterData = currentBook.chapters[currentChapter - 1];
    const vObj = newChapterData.verses.find(v => parseInt(v.number, 10) === currentVerse);
    if (vObj) {
        showLiveVerse(currentBook, currentChapter, currentVerse, vObj.text);
    }
}

// Navegación: Versículo Anterior
function prevVerse() {
    if (!currentBook) return;

    if (currentVerse > 1) {
        currentVerse--;
    } else if (currentChapter > 1) {
        currentChapter--;
        const prevChapterData = currentBook.chapters[currentChapter - 1];
        currentVerse = prevChapterData.verses.length;
        renderChapterVerses(currentBook, currentChapter, currentVerse);
    } else {
        return; // Principio del libro
    }

    const curChapterData = currentBook.chapters[currentChapter - 1];
    const vObj = curChapterData.verses.find(v => parseInt(v.number, 10) === currentVerse);
    if (vObj) {
        showLiveVerse(currentBook, currentChapter, currentVerse, vObj.text);
    }
}

// Navegación: Capítulo Siguiente
function nextChapter() {
    if (!currentBook) return;
    if (currentChapter < currentBook.chapters.length) {
        currentChapter++;
        currentVerse = 1;
        renderChapterVerses(currentBook, currentChapter, 1);
        $('#reference').val(`${currentBook.name} ${currentChapter}`);
    }
}

// Navegación: Capítulo Anterior
function prevChapter() {
    if (!currentBook) return;
    if (currentChapter > 1) {
        currentChapter--;
        currentVerse = 1;
        renderChapterVerses(currentBook, currentChapter, 1);
        $('#reference').val(`${currentBook.name} ${currentChapter}`);
    }
}

// Autocompletado de libros
async function handleAutocomplete(inputVal) {
    const list = $('#autocomplete-list');
    const cleaned = cleanString(inputVal);

    if (cleaned.length < 1) {
        list.hide().empty();
        return;
    }

    try {
        const books = await loadBibleVersion(currentVersion);
        const matches = books.filter(b => cleanString(b.name).includes(cleaned));

        if (matches.length > 0) {
            list.empty().show();
            matches.slice(0, 8).forEach(book => {
                const item = $('<div class="autocomplete-item"></div>').text(book.name);
                item.on('click', function () {
                    $('#reference').val(book.name + ' ');
                    list.hide().empty();
                    $('#reference').focus();
                });
                list.append(item);
            });
        } else {
            list.hide().empty();
        }
    } catch (e) {
        list.hide().empty();
    }
}

// =========================================================
// Inicialización y Event Listeners
// =========================================================
$(async function () {
    // 1. Cargar historial reciente guardado
    try {
        const savedHistory = localStorage.getItem('bibleRecentHistory');
        if (savedHistory) recentHistory = JSON.parse(savedHistory);
        renderRecentHistory();
    } catch (e) {}

    // 2. Cargar versión inicial
    currentVersion = $('#version').val() || 'RV1960';
    try {
        await loadBibleVersion(currentVersion);
    } catch (e) {
        console.error("Error al cargar versión inicial:", e);
    }

    // 3. Restaurar tema claro/oscuro del Dock
    function setDockTheme(theme) {
        $('html').attr('data-theme', theme);
        localStorage.setItem('dockTheme', theme);
        if (theme === 'light') {
            $('#themeIcon').removeClass('bi-sun-fill').addClass('bi-moon-stars-fill');
            $('#toggleThemeBtn').attr('title', 'Cambiar a Modo Oscuro');
        } else {
            $('#themeIcon').removeClass('bi-moon-stars-fill').addClass('bi-sun-fill');
            $('#toggleThemeBtn').attr('title', 'Cambiar a Modo Claro');
        }
    }

    const savedDockTheme = localStorage.getItem('dockTheme') || 'dark';
    setDockTheme(savedDockTheme);

    $('#toggleThemeBtn').on('click', function () {
        const currentTheme = $('html').attr('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setDockTheme(nextTheme);
    });

    // Panel colapsable de ajustes
    $('#toggleSettingsBtn').on('click', function () {
        $('#settingsCollapse').slideToggle(180);
        $(this).toggleClass('active');
    });

    $('#closeSettingsBtn').on('click', function () {
        $('#settingsCollapse').slideUp(180);
        $('#toggleSettingsBtn').removeClass('active');
    });

    // 4. Restaurar configuraciones de estilo
    const savedFont = localStorage.getItem('selectedFont');
    if (savedFont) $('#fontSelect').val(savedFont);

    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) $('#themeSelect').val(savedTheme);

    const savedSize = localStorage.getItem('selectedSize');
    if (savedSize) $('#sizeSelect').val(savedSize);

    const savedTextColor = localStorage.getItem('selectedTextColor');
    if (savedTextColor) $('#textColorSelect').val(savedTextColor);

    // Restaurar fondo personalizado
    const savedBgSelectVal = localStorage.getItem('selectedBgSelectVal');
    if (savedBgSelectVal) $('#bgSelect').val(savedBgSelectVal);

    const savedBgDarkness = localStorage.getItem('selectedBgDarkness');
    if (savedBgDarkness) {
        $('#bgDarknessSlider').val(savedBgDarkness);
        $('#bgDarknessLabel').text(Math.round(parseFloat(savedBgDarkness) * 100) + '%');
    }

    // Evento de búsqueda
    $('#searchBtn').on('click', executeSearch);
    $('#reference').on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeSearch();
        }
    });

    // Autocompletado con debounce simple
    let autocompleteTimeout;
    $('#reference').on('input', function () {
        clearTimeout(autocompleteTimeout);
        const val = $(this).val();
        autocompleteTimeout = setTimeout(() => handleAutocomplete(val), 150);
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.position-relative').length) {
            $('#autocomplete-list').hide();
        }
    });

    // Botones de navegación
    $('#nextVerseBtn').on('click', nextVerse);
    $('#prevVerseBtn').on('click', prevVerse);
    $('#nextChapterBtn').on('click', nextChapter);
    $('#prevChapterBtn').on('click', prevChapter);

    // Botón de pánico / Ocultar pantalla
    $('#clearScreenBtn').on('click', hideLiveVerse);

    // Limpiar historial
    $('#clearHistoryBtn').on('click', function () {
        recentHistory = [];
        localStorage.removeItem('bibleRecentHistory');
        renderRecentHistory();
    });

    // Cambios de configuración en vivo
    $('#version').on('change', async function () {
        currentVersion = $(this).val();
        try {
            const books = await loadBibleVersion(currentVersion);
            if (currentBook && books) {
                // Actualizar vista actual con la nueva versión
                const matchingBook = books.find(b => cleanString(b.name) === cleanString(currentBook.name));
                if (matchingBook) {
                    currentBook = matchingBook;
                    renderChapterVerses(currentBook, currentChapter, currentVerse);
                    if (liveVerseData) {
                        const chData = currentBook.chapters[currentChapter - 1];
                        const vObj = chData.verses.find(v => parseInt(v.number, 10) === currentVerse);
                        if (vObj) {
                            showLiveVerse(currentBook, currentChapter, currentVerse, vObj.text);
                        }
                    }
                }
            }
        } catch (e) {
            console.error("Error al cambiar versión:", e);
        }
    });

    // Cambios de estilos y tipografía
    $('#fontSelect, #themeSelect, #sizeSelect, #textColorSelect').on('change', function () {
        broadcastStyles();
    });

    // Manejo de Fondos Personalizados
    $('#uploadBgBtn').on('click', function () {
        $('#bgFileInput').click();
    });

    $('#bgFileInput').on('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (evt) {
            const base64Data = evt.target.result;
            try {
                localStorage.setItem('customUploadedBg', base64Data);
                $('#bgSelect').val('custom-image');
                broadcastStyles();
            } catch (err) {
                alert('La imagen seleccionada es demasiado pesada para la memoria local. Prueba con una imagen comprimida o de menor resolución.');
            }
        };
        reader.readAsDataURL(file);
    });

    $('#bgSelect').on('change', function () {
        const val = $(this).val();
        if (val === 'custom-image') {
            const customImg = localStorage.getItem('customUploadedBg');
            if (!customImg) {
                $('#bgFileInput').click();
                return;
            }
        }
        broadcastStyles();
    });

    $('#bgDarknessSlider').on('input', function () {
        const val = $(this).val();
        const percent = Math.round(parseFloat(val) * 100) + '%';
        $('#bgDarknessLabel').text(percent);
        broadcastStyles();
    });

    $('#resetBgBtn').on('click', function () {
        $('#bgSelect').val('default');
        $('#bgDarknessSlider').val(0.65);
        $('#bgDarknessLabel').text('65%');
        localStorage.removeItem('customUploadedBg');
        broadcastStyles();
    });

    // Atajos de Teclado Globales para Transmisión en Vivo
    $(document).on('keydown', function (e) {
        // Ignorar si el usuario está escribiendo en el campo de texto
        if ($(e.target).is('input, textarea, select')) {
            if (e.key === 'Escape') {
                $(e.target).blur();
                hideLiveVerse();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                nextVerse();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevVerse();
                break;
            case 'Escape':
                e.preventDefault();
                hideLiveVerse();
                break;
            case ' ':
                e.preventDefault();
                if (liveVerseData) {
                    hideLiveVerse();
                } else if (currentBook) {
                    const chData = currentBook.chapters[currentChapter - 1];
                    const vObj = chData.verses.find(v => parseInt(v.number, 10) === currentVerse);
                    if (vObj) {
                        showLiveVerse(currentBook, currentChapter, currentVerse, vObj.text);
                    }
                }
                break;
        }
    });
});
