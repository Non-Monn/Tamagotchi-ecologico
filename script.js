// Gestión de Pestañas Principales
function switchTab(tabId, evt) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));

    if (tabId === 'actual') {
        document.getElementById('tab-actual').classList.add('active');
    } else if (tabId === 'extintas') {
        document.getElementById('tab-extintas').classList.add('active');
    } else if (tabId === 'apps') {
        document.getElementById('tab-apps').classList.add('active');
    } else if (tabId === 'foro') {
        document.getElementById('tab-foro').classList.add('active');
        renderComments();
    }

    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
}

// Datos de Especies Extintas (Actualizado con más especies)
const extinctData = {
    steller: {
        name: "Vaca Marina de Steller (Hydrodamalis gigas)",
        meta: "🗓️ Año de Extinción: 1768 (Extinta 27 años después de ser documentada)",
        desc: "Un mamífero marino gigante emparentado con los manatíes, capaz de medir hasta 9 metros de longitud y pesar más de 10 toneladas.",
        habitat: "Aguas costeras frías del Mar de Bering, Islas Commander y la costa norte del Pacífico.",
        diet: "Herbívora estricta. Se alimentaba exclusivamente de bosques de algas marinas (kelp).",
        causes: "Caza intensiva por parte de cazadores de pieles y balleneros rusos que aprovecharon su carne y grasa flotante."
    },
    megalodon: {
        name: "Tiburón Megalodón (Otodus megalodon)",
        meta: "🗓️ Año de Extinción: Hace aprox. 3.6 millones de años (Plioceno)",
        desc: "El tiburón depredador más grande de los océanos, alcanzando longitudes de 15 a 20 metros.",
        habitat: "Aguas templadas y tropicales en todo el globo terráqueo.",
        diet: "Carnívora hipercarnívora. Se alimentaba de ballenas y cetáceos grandes.",
        causes: "Cambio climático global, reducción de presas principales y competencia con nuevos depredadores."
    },
    monje: {
        name: "Foca Monje del Caribe (Neomonachus tropicalis)",
        meta: "🗓️ Año de Extinción: Declarada extinta en 2008 (Último avistamiento en 1952)",
        desc: "La única especie de foca nativa de las aguas tropicales del Mar Caribe y el Golfo de México.",
        habitat: "Playas de arena aisladas y arrecifes de coral en el Caribe.",
        diet: "Carnívora costera. Se alimentaba de peces de arrecife, pulpos y crustáceos.",
        causes: "Explotación comercial para extraer aceite corporal y destrucción de su hábitat costero."
    },
    alca: {
        name: "Alca Gigante (Pinguinus impennis)",
        meta: "🗓️ Año de Extinción: 1844 (Últimos ejemplares matados en la isla de Eldey, Islandia)",
        desc: "Una gran ave marina no voladora del Atlántico Norte, de aspecto robusto, considerada ecológicamente el equivalente norteño a los pingüinos.",
        habitat: "Islas rocosas costeras y aguas frías del Atlántico Norte (Canadá, Groenlandia, Islandia, Gran Bretaña).",
        diet: "Carnívora marina. Se alimentaba buceando en busca de peces y crustáceos.",
        causes: "Caza excesiva por parte de marineros y coleccionistas por su carne, plumas y huevos, además de la alteración de sus colonias."
    },
    baiji: {
        name: "Delfín de Río Chino o Baiji (Lipotes vexillifer)",
        meta: "🗓️ Año de Extinción: Declarado extinto funcionalmente en 2006 (Río Yangtsé)",
        desc: "Un delfín de agua dulce endémico del río Yangtsé en China, conocido por su color azul pálido, hocico largo y adaptado a aguas turbias.",
        habitat: "Aguas dulces del río Yangtsé y sus lagos adyacentes en China.",
        diet: "Carnívora de agua dulce. Se alimentaba de una gran variedad de peces fluviales.",
        causes: "Contaminación extrema, tráfico fluvial masivo, construcción de presas (como la presa de las Tres Gargantas) y pesca incidental con redes."
    }
};

function switchExtinct(key, evt) {
    document.querySelectorAll('.extinct-btn').forEach(btn => btn.classList.remove('active'));
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }
    const data = extinctData[key];
    document.getElementById('extinct-title').innerText = data.name;
    document.getElementById('extinct-meta').innerText = data.meta;
    document.getElementById('extinct-desc').innerText = data.desc;
    document.getElementById('extinct-habitat').innerText = data.habitat;
    document.getElementById('extinct-diet').innerText = data.diet;
    document.getElementById('extinct-causes').innerText = data.causes;
}
switchExtinct('steller');

// Foro y Comentarios
const defaultComments = [
    {
        id: 1,
        author: "Dra. Elena Valdés",
        date: "Hace 2 días",
        text: "Es alarmante ver la situación de la vaquita marina. Debemos apoyar las alternativas pesqueras sostenibles.",
        likes: 12
    }
];

function getComments() {
    const stored = localStorage.getItem('santuario_comments');
    if (!stored) {
        localStorage.setItem('santuario_comments', JSON.stringify(defaultComments));
        return defaultComments;
    }
    try { return JSON.parse(stored); } catch(e) { return defaultComments; }
}

function saveComments(comments) {
    localStorage.setItem('santuario_comments', JSON.stringify(comments));
}

function renderComments() {
    const comments = getComments();
    const listEl = document.getElementById('commentsList');
    listEl.innerHTML = '';
    comments.forEach(c => {
        const item = document.createElement('div');
        item.className = 'comment-item';
        item.innerHTML = `
            <span class="comment-date">${c.date}</span>
            <div class="comment-author">${escapeHtml(c.author)}</div>
            <div class="comment-text">${escapeHtml(c.text)}</div>
            <div class="comment-footer">
                <button class="like-btn" onclick="likeComment(${c.id})">❤️ Me gusta (${c.likes})</button>
            </div>
        `;
        listEl.appendChild(item);
    });
}

function handleCommentSubmit(e) {
    e.preventDefault();
    const author = document.getElementById('authorName').value.trim();
    const text = document.getElementById('commentText').value.trim();
    if (!author || !text) return;
    const comments = getComments();
    comments.unshift({ id: Date.now(), author, date: "Hace un momento", text, likes: 0 });
    saveComments(comments);
    document.getElementById('authorName').value = '';
    document.getElementById('commentText').value = '';
    renderComments();
}

function likeComment(id) {
    const comments = getComments();
    const comment = comments.find(c => c.id === id);
    if (comment) { comment.likes += 1; saveComments(comments); renderComments(); }
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Tanque Interactivo y Nuevas Funciones (Iluminación & Dormir)
const canvas = document.getElementById('seaCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let interactiveItems = [];
let currentLighting = 'amanecer';
let isSleeping = false;

const lightingGradients = {
    amanecer: "linear-gradient(180deg, #f2cfad 0%, #73a9ad 65%, #3d6061 100%)",
    mediodia: "linear-gradient(180deg, #ade8f4 0%, #0077b6 65%, #03045e 100%)",
    atardecer: "linear-gradient(180deg, #e76f51 0%, #2a9d8f 65%, #264653 100%)",
    noche: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 65%, #020617 100%)"
};

function setLighting(mode, el) {
    currentLighting = mode;
    document.querySelectorAll('.lighting-btn').forEach(btn => btn.classList.remove('active'));
    if (el) el.classList.add('active');
    document.getElementById('artFrame').style.background = lightingGradients[mode];
}

function toggleSleep() {
    isSleeping = !isSleeping;
    const btn = document.getElementById('sleepBtn');
    if (isSleeping) {
        btn.innerText = "⏰ Despertar Especie";
        btn.style.background = "#d8b26e";
        btn.style.color = "#fff";
    } else {
        btn.innerText = "💤 Hacer Dormir / Despertar";
        btn.style.background = "#f3e8ff";
        btn.style.color = "#7e22ce";
    }
}

const speciesData = {
    vaquita: {
        name: "Vaquita Marina (Phocoena sinus)",
        statusClass: "status-critico",
        statusText: "🚨 Estado: En Peligro Crítico de Extinción (UICN) - Menos de 10 individuos",
        habitat: "Alto Golfo de California (Endémica de México)",
        habitatTitle: "Alto Golfo de California (Reserva de la Biosfera)",
        habitatDesc: "Aguas turbias, turbulentas y poco profundas (< 40m) ricas en nutrientes donde convergen las mareas del Mar de Cortés.",
        locationTag: "Ubicación: San Felipe / Puerto Peñasco, México",
        habitatSvg: `<svg class="habitat-art-svg" viewBox="0 0 220 140"><rect width="220" height="50" fill="#f2cfad"/><rect y="50" width="220" height="90" fill="#3d6061"/><ellipse cx="110" cy="85" rx="32" ry="14" fill="#586773"/><circle cx="128" cy="83" r="3.5" fill="#2c2825"/></svg>`,
        foodName: "Peces bentónicos y calamares pequeños",
        foodIcon: "🦑", foodBar: 60, habitatBar: 70, safetyBar: 30,
        dietInfo: "Alimentación: Carnívora. Consume curvina y pequeños calamares.",
        threatInfo: "Amenaza Crítica: Pesca furtiva con redes de enmalle ilícitas.",
        traits: ["Cetáceo más pequeño y amenazado del mundo.", "Parches oscuros en ojos parecidos a un antifaz."],
        cares: ["Eliminación de redes de enmalle.", "Monitoreo acústico y vigilancia por drones."]
    },
    totoaba: {
        name: "Totoaba (Totoaba macdonaldi)",
        statusClass: "status-critico",
        statusText: "🚨 Estado: En Peligro Crítico de Extinción (UICN) - Protegida",
        habitat: "Estuario y Canales del Delta del Río Colorado",
        habitatTitle: "Zona Estuarina del Delta del Río Colorado",
        habitatDesc: "Ecosistema marino-costero donde el río Colorado se une con el Golfo.",
        locationTag: "Ubicación: Delta del Río Colorado / Mar de Cortés",
        habitatSvg: `<svg class="habitat-art-svg" viewBox="0 0 220 140"><rect width="220" height="40" fill="#edd0be"/><rect y="40" width="220" height="100" fill="#2a4d52"/><ellipse cx="115" cy="80" rx="42" ry="16" fill="#8c8d8f"/></svg>`,
        foodName: "Sardinas, cangrejos y camarones",
        foodIcon: "🦐", foodBar: 65, habitatBar: 60, safetyBar: 35,
        dietInfo: "Alimentación: Carnívora bentónica.",
        threatInfo: "Amenaza Crítica: Pesca ilegal masiva para extraer su vejiga natatoria ('buche').",
        traits: ["Pez gigante de hasta 2 metros y más de 100 kg.", "Vive hasta 25 años."],
        cares: ["Patrullaje de la Marina.", "Impulso a la acuicultura legal."]
    },
    golfina: {
        name: "Tortuga Golfina (Lepidochelys olivacea)",
        statusClass: "status-vulnerable",
        statusText: "⚠️ Estado: Vulnerable (UICN) - En Peligro en México",
        habitat: "Playas de Anidación Costeras de Baja California Sur",
        habitatTitle: "Playas Doradas & Arrecifes del Pacífico Mexicano",
        habitatDesc: "Playas de arena cálida flanqueadas por dunas costeras.",
        locationTag: "Ubicación: Todos Santos / Los Cabos, BCS",
        habitatSvg: `<svg class="habitat-art-svg" viewBox="0 0 220 140"><rect width="220" height="45" fill="#f8c390"/><rect y="45" width="220" height="95" fill="#1d3557"/><ellipse cx="125" cy="80" rx="26" ry="20" fill="#5b8c5a"/></svg>`,
        foodName: "Medusas, moluscos y crustáceos",
        foodIcon: "🪼", foodBar: 70, habitatBar: 65, safetyBar: 55,
        dietInfo: "Alimentación: Omnívora.",
        threatInfo: "Amenazas: Ingesta de plásticos y destrucción de playas de anidación.",
        traits: ["Tortuga marina conocida por sus arribadas masivas.", "Caparazón verde oliva."],
        cares: ["Protección de campos tortugueros.", "Uso obligatorio de DETs en barcos."]
    },
    tiburon: {
        name: "Tiburón Ballena (Rhincodon typus)",
        statusClass: "status-vulnerable",
        statusText: "⚠️ Estado: En Peligro / Vulnerable (UICN) - Amenazada",
        habitat: "Aguas Someras y Nutritivas de la Bahía de La Paz",
        habitatTitle: "Bahía de La Paz (Santuario de Alimentación)",
        habitatDesc: "Bahía protegida con abundantes floraciones de plancton.",
        locationTag: "Ubicación: Bahía de La Paz / Archipiélago Revillagigedo",
        habitatSvg: `<svg class="habitat-art-svg" viewBox="0 0 220 140"><rect width="220" height="25" fill="#ade8f4"/><rect y="25" width="220" height="115" fill="#0077b6"/><ellipse cx="110" cy="80" rx="58" ry="22" fill="#3d5a80"/></svg>`,
        foodName: "Plancton, krill y microcrustáceos",
        foodIcon: "🌊", foodBar: 80, habitatBar: 55, safetyBar: 60,
        dietInfo: "Alimentación: Filtrador.",
        threatInfo: "Amenazas: Colisiones con embarcaciones turísticas y plásticos.",
        traits: ["El pez más grande del mundo (12-18m).", "Inofensivo para los humanos."],
        cares: ["Regulación de velocidad para embarcaciones.", "Protección de hélices."]
    },
    leon: {
        name: "León Marino de California (Zalophus californianus)",
        statusClass: "status-preocupacion",
        statusText: "ℹ️ Estado: Preocupación Menor (UICN) - Protegido",
        habitat: "Islotes Rocosos y Arrecifes de la Isla Espíritu Santo",
        habitatTitle: "Lobera de Los Islotes (Isla Espíritu Santo)",
        habitatDesc: "Formaciones rocosas volcánicas rodeadas de profundos arrecifes.",
        locationTag: "Ubicación: Parque Nacional Isla Espíritu Santo, BCS",
        habitatSvg: `<svg class="habitat-art-svg" viewBox="0 0 220 140"><rect width="220" height="35" fill="#caf0f8"/><rect y="35" width="220" height="105" fill="#0096c7"/><ellipse cx="120" cy="85" rx="38" ry="20" fill="#7c5c43"/></svg>`,
        foodName: "Pescados, pulpos y calamares",
        foodIcon: "🐟", foodBar: 85, habitatBar: 70, safetyBar: 65,
        dietInfo: "Alimentación: Carnívora activa.",
        threatInfo: "Amenazas: Enredos en redes fantasma y plásticos.",
        traits: ["Mamífero marino altamente inteligente y social.", "Habita en colonias o 'loberas'."],
        cares: ["Regulación del turismo en loberas.", "Rescate de individuos atrapados."]
    }
};

let currentKey = 'vaquita';
let currentAnimFrame = 0;

function switchSpecies(key) {
    currentKey = key;
    document.querySelectorAll('.selector-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.currentTarget) event.currentTarget.classList.add('active');

    const data = speciesData[key];
    document.body.className = data.statusClass;
    document.getElementById('species-name').innerText = data.name;
    document.getElementById('threatBanner').innerText = data.statusText;
    document.getElementById('habitat-text').innerText = `Tanque: ${data.name}`;
    document.getElementById('feed-icon').innerText = data.foodIcon;

    document.getElementById('habitatArtViewport').innerHTML = data.habitatSvg;
    document.getElementById('habitatBoxTitle').innerText = data.habitatTitle;
    document.getElementById('habitatBoxDesc').innerText = data.habitatDesc;
    document.getElementById('habitatBoxLocation').innerText = data.locationTag;

    interactiveItems = [];
    spawnInitialGameItems();
    updateUI();
    updateLore('diet');
    updateInfoSection();
}

// DISEÑO ADORABLE CON OJOS DE PUNTOS NEGROS Y COLA CORREGIDA
function drawCreature(x, y, type) {
    ctx.save();
    ctx.translate(x, y);

    const floatOffset = isSleeping ? 0 : Math.sin(currentAnimFrame * 0.05) * 8;
    const tailWag = isSleeping ? 0 : Math.sin(currentAnimFrame * 0.2) * 0.22;
    ctx.translate(0, floatOffset);

    if (isSleeping) {
        ctx.rotate(0.2); // Inclinación tierna al dormir
    }

    if (type === 'vaquita') {
        // Cuerpo regordete
        ctx.fillStyle = '#7a8e9f';
        ctx.beginPath(); ctx.ellipse(0, 0, 60, 40, 0, 0, Math.PI * 2); ctx.fill();

        // Vientre suave
        ctx.fillStyle = '#d2dfea';
        ctx.beginPath(); ctx.ellipse(8, 12, 38, 22, 0, 0, Math.PI * 2); ctx.fill();

        // Aleta caudal
        ctx.save();
        ctx.rotate(tailWag);
        ctx.fillStyle = '#5c6f80';
        ctx.beginPath(); ctx.moveTo(-54, 0); ctx.lineTo(-82, -22); ctx.lineTo(-82, 22); ctx.closePath(); ctx.fill();
        ctx.restore();

        // Aleta dorsal
        ctx.fillStyle = '#5c6f80';
        ctx.beginPath(); ctx.arc(4, -38, 11, 0, Math.PI * 2); ctx.fill();

        // Antifaz y Ojo (Punto negro limpio)
        ctx.fillStyle = '#32404b';
        ctx.beginPath(); ctx.arc(28, -4, 15, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#111822';
        ctx.beginPath(); ctx.arc(32, -6, 3.5, 0, Math.PI * 2); ctx.fill(); // Ojo punto negro

        // Mejilla sonrosada
        ctx.fillStyle = 'rgba(255, 140, 140, 0.55)';
        ctx.beginPath(); ctx.arc(38, 5, 6.5, 0, Math.PI * 2); ctx.fill();

        // Sonrisa tierna
        ctx.strokeStyle = '#2c2825'; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(33, 9, 5, 0.1, Math.PI * 0.8); ctx.stroke();

    } else if (type === 'totoaba') {
        // Cuerpo de pez
        ctx.fillStyle = '#8b8d90';
        ctx.beginPath(); ctx.ellipse(0, 0, 68, 44, 0, 0, Math.PI * 2); ctx.fill();

        // Lomo dorado
        ctx.fillStyle = '#e2c585';
        ctx.beginPath(); ctx.ellipse(-2, -18, 50, 21, -0.08, 0, Math.PI * 2); ctx.fill();

        // Aleta caudal
        ctx.save();
        ctx.rotate(tailWag * 1.3);
        ctx.fillStyle = '#6c6e72';
        ctx.beginPath(); ctx.moveTo(-62, 0); ctx.lineTo(-95, -30); ctx.lineTo(-95, 30); ctx.closePath(); ctx.fill();
        ctx.restore();

        // Aletas pectorales
        ctx.fillStyle = '#a2a4a8';
        ctx.beginPath(); ctx.ellipse(8, 24, 18, 10, 0.35, 0, Math.PI * 2); ctx.fill();

        // Ojo (Punto negro limpio)
        ctx.fillStyle = '#1c1a18';
        ctx.beginPath(); ctx.arc(35, -8, 4, 0, Math.PI * 2); ctx.fill();

        // Mejilla sonrosada
        ctx.fillStyle = 'rgba(255, 130, 130, 0.5)';
        ctx.beginPath(); ctx.arc(45, 3, 6.5, 0, Math.PI * 2); ctx.fill();

    } else if (type === 'golfina') {
        // Caparazón
        ctx.fillStyle = '#4c8a4a';
        ctx.beginPath(); ctx.arc(0, 0, 44, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = '#2d5e2b'; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.arc(0, 0, 33, 0, Math.PI * 2); ctx.stroke();

        // Aletas
        ctx.save();
        const flipperMove = Math.sin(currentAnimFrame * 0.12) * 0.28;
        ctx.rotate(flipperMove);
        ctx.fillStyle = '#4c8a4a';
        ctx.beginPath(); ctx.ellipse(28, -30, 24, 11, -0.45, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(28, 30, 24, 11, 0.45, 0, Math.PI * 2); ctx.fill();
        ctx.restore();

        // Cabeza
        ctx.fillStyle = '#5ca259';
        ctx.beginPath(); ctx.arc(48, 0, 19, 0, Math.PI * 2); ctx.fill();

        // Ojos (Puntos negros limpios)
        ctx.fillStyle = '#1c1a18';
        ctx.beginPath(); ctx.arc(55, -6, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(55, 6, 3, 0, Math.PI * 2); ctx.fill();

    } else if (type === 'tiburon') {
        // Cuerpo de tiburón ballena
        ctx.fillStyle = '#39577a';
        ctx.beginPath(); ctx.ellipse(0, 0, 78, 46, 0, 0, Math.PI * 2); ctx.fill();

        // Vientre
        ctx.fillStyle = '#edf4fd';
        ctx.beginPath(); ctx.ellipse(-8, 15, 54, 25, 0, 0, Math.PI * 2); ctx.fill();

        // Aleta caudal (CORREGIDA: situada al lado izquierdo, lejos del ojo derecho)
        ctx.save();
        ctx.rotate(-tailWag);
        ctx.fillStyle = '#263b54';
        ctx.beginPath(); ctx.moveTo(-68, 0); ctx.lineTo(-105, -28); ctx.lineTo(-105, 28); ctx.closePath(); ctx.fill();
        ctx.restore();

        // Manchitas blancas estelares
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(22, -16, 4.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(-12, -22, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(42, 6, 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(-22, -6, 4.2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(5, -8, 3.8, 0, Math.PI * 2); ctx.fill();

        // Ojo (Punto negro limpio en el extremo derecho, alejado de la cola)
        ctx.fillStyle = '#152538';
        ctx.beginPath(); ctx.arc(48, -8, 4.2, 0, Math.PI * 2); ctx.fill();

        // Mejilla sonrosada
        ctx.fillStyle = 'rgba(255, 140, 140, 0.45)';
        ctx.beginPath(); ctx.arc(42, 2, 6.5, 0, Math.PI * 2); ctx.fill();

    } else if (type === 'leon') {
        // Cuerpo de león marino
        ctx.fillStyle = '#825c42';
        ctx.beginPath(); ctx.ellipse(-5, 6, 54, 38, 0, 0, Math.PI * 2); ctx.fill();

        // Aleta delantera
        ctx.fillStyle = '#65442f';
        ctx.beginPath(); ctx.ellipse(12, 28, 19, 10, 0.5, 0, Math.PI * 2); ctx.fill();

        // Cabeza
        ctx.fillStyle = '#946c50';
        ctx.beginPath(); ctx.arc(40, -12, 28, 0, Math.PI * 2); ctx.fill();

        // Hocico y nariz
        ctx.fillStyle = '#ab8263';
        ctx.beginPath(); ctx.ellipse(53, -6, 13, 10, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#2c2825'; ctx.beginPath(); ctx.arc(60, -8, 3.8, 0, Math.PI * 2); ctx.fill();

        // Ojo (Punto negro limpio)
        ctx.fillStyle = '#2c2825';
        ctx.beginPath(); ctx.arc(45, -18, 4, 0, Math.PI * 2); ctx.fill();

        // Mejillas sonrosadas
        ctx.fillStyle = 'rgba(255, 130, 130, 0.55)';
        ctx.beginPath(); ctx.arc(55, -2, 6.5, 0, Math.PI * 2); ctx.fill();
    }

    // Indicador de descanso (Zzz)
    if (isSleeping) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px Georgia';
        ctx.fillText('Z z z...', 25, -45 + Math.sin(currentAnimFrame * 0.1) * 4);
    }

    ctx.restore();
}

function spawnInitialGameItems() {
    const data = speciesData[currentKey];
    for (let i = 0; i < 4; i++) {
        interactiveItems.push({
            x: Math.random() * (canvas.width - 80) + 40,
            y: Math.random() * (canvas.height - 120) + 60,
            type: 'food', icon: data.foodIcon, size: 26,
            speedX: (Math.random() - 0.5) * 1.2, speedY: (Math.random() - 0.5) * 1.2
        });
    }
    if (data.safetyBar < 60 || data.habitatBar < 60) {
        for (let j = 0; j < 3; j++) {
            interactiveItems.push({
                x: Math.random() * (canvas.width - 80) + 40,
                y: Math.random() * (canvas.height - 120) + 60,
                type: 'trash', icon: Math.random() > 0.5 ? '🛍️' : '🕸️', size: 28,
                speedX: (Math.random() - 0.5) * 0.8, speedY: (Math.random() - 0.5) * 0.8
            });
        }
    }
}

function spawnFoodBatch() {
    if (isSleeping) return;
    const data = speciesData[currentKey];
    for (let i = 0; i < 3; i++) {
        interactiveItems.push({
            x: Math.random() * (canvas.width - 80) + 40, y: 20,
            type: 'food', icon: data.foodIcon, size: 26,
            speedX: (Math.random() - 0.5) * 1, speedY: Math.random() * 1.5 + 0.5
        });
    }
}

function cleanAllDebris() {
    const data = speciesData[currentKey];
    interactiveItems = interactiveItems.filter(item => item.type !== 'trash');
    data.habitatBar = Math.min(100, data.habitatBar + 30);
    data.safetyBar = Math.min(100, data.safetyBar + 25);
    updateUI();
    updateLore('habitat');
}

canvas.addEventListener('click', function(e) {
    if (isSleeping) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const data = speciesData[currentKey];

    for (let i = interactiveItems.length - 1; i >= 0; i--) {
        let item = interactiveItems[i];
        let dist = Math.hypot(clickX - item.x, clickY - item.y);
        if (dist < item.size + 10) {
            if (item.type === 'food') {
                data.foodBar = Math.min(100, data.foodBar + 15);
                updateLore('diet');
            } else if (item.type === 'trash') {
                data.safetyBar = Math.min(100, data.safetyBar + 20);
                data.habitatBar = Math.min(100, data.habitatBar + 15);
                updateLore('threat');
            }
            interactiveItems.splice(i, 1);
            updateUI();
            break;
        }
    }
});

function renderScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentLighting === 'noche') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        for (let i = 0; i < 18; i++) {
            let bx = (i * 67 + currentAnimFrame * 0.2) % canvas.width;
            let by = (i * 31) % (canvas.height / 2);
            ctx.fillRect(bx, by, 2.5, 2.5);
        }
    }

    interactiveItems.forEach(item => {
        ctx.font = `${item.size}px serif`;
        ctx.fillText(item.icon, item.x, item.y);
        if (!isSleeping) {
            item.x += item.speedX;
            item.y += item.speedY;
            if (item.x < 20 || item.x > canvas.width - 30) item.speedX *= -1;
            if (item.y < 30 || item.y > canvas.height - 30) item.speedY *= -1;
        }
    });

    drawCreature(canvas.width / 2, canvas.height / 2, currentKey);

    currentAnimFrame++;
    requestAnimationFrame(renderScene);
}

function updateLore(topic) {
    const data = speciesData[currentKey];
    const titleEl = document.getElementById('lore-title');
    const bodyEl = document.getElementById('lore-body');
    if (topic === 'diet') {
        titleEl.innerText = `Dieta: ${data.foodName}`;
        bodyEl.innerText = data.dietInfo;
    } else if (topic === 'threat') {
        titleEl.innerText = "Amenaza Principal";
        bodyEl.innerText = data.threatInfo;
    } else {
        titleEl.innerText = "Hábitat y Entorno";
        bodyEl.innerText = `El hábitat en ${data.habitat} necesita mantenerse libre de plásticos y contaminación.`;
    }
}

function updateInfoSection() {
    const data = speciesData[currentKey];
    document.getElementById('info-species-title').innerText = `Ficha de Conservación: ${data.name}`;
    document.getElementById('info-traits').innerHTML = data.traits.map(t => `<li>${t}</li>`).join('');
    document.getElementById('info-cares').innerHTML = data.cares.map(c => `<li>${c}</li>`).join('');
}

function updateUI() {
    const data = speciesData[currentKey];
    document.getElementById('food-val').innerText = `${data.foodBar}%`;
    document.getElementById('food-bar').style.width = `${data.foodBar}%`;
    document.getElementById('habitat-val').innerText = `${data.habitatBar}%`;
    document.getElementById('habitat-bar').style.width = `${data.habitatBar}%`;
    document.getElementById('safety-val').innerText = `${data.safetyBar}%`;
    document.getElementById('safety-bar').style.width = `${data.safetyBar}%`;

    const overlay = document.getElementById('overlayMsg');
    if (data.safetyBar < 25 || data.foodBar < 20 || data.habitatBar < 20) {
        overlay.innerText = `¡Alerta Crítica! ${data.name} se encuentra en peligro inminente. Atiende sus necesidades.`;
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
    }
}

setInterval(() => {
    if (!isSleeping) {
        Object.keys(speciesData).forEach(k => {
            speciesData[k].foodBar = Math.max(0, speciesData[k].foodBar - 2);
            speciesData[k].habitatBar = Math.max(0, speciesData[k].habitatBar - 1);
            speciesData[k].safetyBar = Math.max(0, speciesData[k].safetyBar - 1);
        });
        updateUI();
    }
}, 6000);

switchSpecies('vaquita');
renderScene();