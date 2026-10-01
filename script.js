const canvas = document.getElementById('seaCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let interactiveItems = [];

// Base de Datos Ampliada con Ilustraciones Vectoriales de Hábitats
const speciesData = {
    vaquita: {
        name: "Vaquita Marina (Phocoena sinus)",
        statusClass: "status-critico",
        statusText: "🚨 Estado: En Peligro Crítico de Extinción (UICN) - Menos de 10 individuos",
        habitat: "Alto Golfo de California (Endémica de México)",
        habitatTitle: "Alto Golfo de California (Reserva de la Biosfera)",
        habitatDesc: "Aguas turbias, turbulentas y poco profundas (< 40m) ricas en nutrientes donde convergen las mareas del Mar de Cortés. El fondo marino arenoso y limoso es crucial para sus presas.",
        locationTag: "Ubicación: San Felipe / Puerto Peñasco, México",
        habitatSvg: `
            <svg class="habitat-art-svg" viewBox="0 0 220 140">
                <defs>
                    <linearGradient id="skyVaquita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#f2cfad"/>
                        <stop offset="100%" stop-color="#e8b88a"/>
                    </linearGradient>
                    <linearGradient id="seaVaquita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#73a9ad"/>
                        <stop offset="100%" stop-color="#3d6061"/>
                    </linearGradient>
                </defs>
                <!-- Cielo y Costa del Alto Golfo -->
                <rect width="220" height="50" fill="url(#skyVaquita)"/>
                <path d="M 0 50 Q 50 35 110 45 T 220 40 L 220 50 Z" fill="#c29b6c"/>
                <!-- Agua Salobre Turbia -->
                <rect y="50" width="220" height="90" fill="url(#seaVaquita)"/>
                <!-- Fondo Arenoso -->
                <path d="M 0 120 Q 60 115 120 128 T 220 118 L 220 140 L 0 140 Z" fill="#8a7356"/>
                <!-- Silueta Vaquita en Hábitat -->
                <ellipse cx="110" cy="85" rx="32" ry="14" fill="#586773"/>
                <path d="M 80 85 L 68 76 L 73 85 L 68 94 Z" fill="#586773"/>
                <path d="M 105 71 Q 110 60 118 72 Z" fill="#586773"/>
                <circle cx="128" cy="83" r="3.5" fill="#2c2825"/>
            </svg>
        `,
        foodName: "Peces bentónicos y calamares pequeños",
        foodIcon: "🦑",
        foodBar: 60,
        habitatBar: 70,
        safetyBar: 30,
        dietInfo: "Alimentación: Carnívora. Consume curvina, truchas marinas y pequeños calamares en el fondo marino poco profundo.",
        threatInfo: "Amenaza Crítica: Pesca furtiva del pez Totoaba mediante redes de enmalle ilícitas donde la vaquita queda atrapada incidentalmente.",
        traits: [
            "Es el cetáceo más pequeño y más amenazado del mundo (1.5 m de longitud max).",
            "Posee parches oscuros en ojos y labios parecidos a un antifaz.",
            "Dieta: Se alimenta de peces del fondo marino y calamares pequeños.",
            "Endémica exclusiva de las aguas cálidas del Alto Golfo de California."
        ],
        cares: [
            "Eliminación total y permanente de redes de enmalle en su santuario.",
            "Monitoreo con tecnología acústica y drones de vigilancia marítima.",
            "Apoyo económico y alternativas pesqueras sostenibles para pescadores locales.",
            "Combate directo al tráfico ilegal de buche de totoaba."
        ]
    },
    totoaba: {
        name: "Totoaba (Totoaba macdonaldi)",
        statusClass: "status-critico",
        statusText: "🚨 Estado: En Peligro Crítico de Extinción (UICN) - Especie Protegida",
        habitat: "Estuario y Canales del Delta del Río Colorado",
        habitatTitle: "Zona Estuarina del Delta del Río Colorado",
        habitatDesc: "Ecosistema marino-costero de transición salobre donde el río Colorado se une con el Golfo. Aguas ricas en sedimentos vitales para la reproducción y refugio de alevines.",
        locationTag: "Ubicación: Delta del Río Colorado / Mar de Cortés",
        habitatSvg: `
            <svg class="habitat-art-svg" viewBox="0 0 220 140">
                <defs>
                    <linearGradient id="seaTotoaba" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#4a8585"/>
                        <stop offset="100%" stop-color="#2a4d52"/>
                    </linearGradient>
                </defs>
                <rect width="220" height="40" fill="#edd0be"/>
                <rect y="40" width="220" height="100" fill="url(#seaTotoaba)"/>
                <path d="M 0 115 Q 70 100 140 120 T 220 110 L 220 140 L 0 140 Z" fill="#6e5c47"/>
                <!-- Estructuras bentónicas / algas -->
                <path d="M 30 140 Q 20 110 35 90 Q 40 110 35 140 Z" fill="#2d4231"/>
                <path d="M 180 140 Q 190 105 175 85 Q 170 110 185 140 Z" fill="#2d4231"/>
                <!-- Silueta Totoaba Gigante -->
                <ellipse cx="115" cy="80" rx="42" ry="16" fill="#8c8d8f"/>
                <polygon points="157,80 142,68 142,92" fill="#8c8d8f"/>
                <path d="M 110 64 Q 115 52 125 66 Z" fill="#d8b26e"/>
                <circle cx="95" cy="76" r="3" fill="#2c2825"/>
            </svg>
        `,
        foodName: "Sardinas, cangrejos, camarones y peces pequeños",
        foodIcon: "🦐",
        foodBar: 65,
        habitatBar: 60,
        safetyBar: 35,
        dietInfo: "Alimentación: Carnívora bentónica. Se alimenta de crustáceos, cangrejos, camarones y peces juveniles.",
        threatInfo: "Amenaza Crítica: Pesca ilegal masiva para extraer su vejiga natatoria ('buche'), vendida en mercados negros internacionales a miles de dólares.",
        traits: [
            "Pez marino gigante que puede alcanzar hasta 2 metros de largo y superar los 100 kg.",
            "Pueden vivir hasta 25 años, pero su madurez sexual tardía las hace muy vulnerables.",
            "Dieta: Cangrejos, camarones, sardinas y peces pequeños del bentos.",
            "Famosa por su vejiga natatoria (buche), objeto de intensa pesca ilegal."
        ],
        cares: [
            "Intensificación del patrullaje de la Marina Armada en las zonas de desove.",
            "Impulso a la acuicultura legal (piscifactorías sostenibles de Totoaba).",
            "Sanciones severas al tráfico internacional de vejigas natatorias.",
            "Protección de las zonas estuarinas del Delta del Río Colorado donde se crían sus alevines."
        ]
    },
    golfina: {
        name: "Tortuga Golfina (Lepidochelys olivacea)",
        statusClass: "status-vulnerable",
        statusText: "⚠️ Estado: Vulnerable (UICN) - En Peligro de Extinción en México",
        habitat: "Playas de Anidación Costeras de Baja California Sur",
        habitatTitle: "Playas Doradas & Arrecifes del Pacífico Mexicano",
        habitatDesc: "Playas de arena cálida flanqueadas por dunas costeras donde realizan sus emblemáticas arribadas para desovar, conectadas con aguas pelágicas templadas.",
        locationTag: "Ubicación: Todos Santos / Los Cabos, BCS",
        habitatSvg: `
            <svg class="habitat-art-svg" viewBox="0 0 220 140">
                <defs>
                    <linearGradient id="skyGolfina" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#f8c390"/>
                        <stop offset="100%" stop-color="#e28e69"/>
                    </linearGradient>
                    <linearGradient id="seaGolfina" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#2a9d8f"/>
                        <stop offset="100%" stop-color="#1d3557"/>
                    </linearGradient>
                </defs>
                <rect width="220" height="45" fill="url(#skyGolfina)"/>
                <circle cx="180" cy="30" r="12" fill="#fff3b0" opacity="0.8"/>
                <rect y="45" width="220" height="95" fill="url(#seaGolfina)"/>
                <path d="M 0 45 L 80 45 L 0 110 Z" fill="#e9c46a"/> <!-- Playa -->
                <!-- Silueta Tortuga Golfina -->
                <ellipse cx="125" cy="80" rx="26" ry="20" fill="#5b8c5a"/>
                <circle cx="150" cy="78" r="8" fill="#5b8c5a"/>
                <path d="M 135 62 Q 150 45 125 60 Z" fill="#5b8c5a"/>
                <path d="M 135 98 Q 150 115 125 100 Z" fill="#5b8c5a"/>
            </svg>
        `,
        foodName: "Medusas, moluscos, crustáceos y algas",
        foodIcon: "🪼",
        foodBar: 70,
        habitatBar: 65,
        safetyBar: 55,
        dietInfo: "Alimentación: Omnívora. Ingiere medusas, caracoles, cangrejos y vegetación marina.",
        threatInfo: "Amenazas: Ingesta de bolsas de plástico (confundidas con medusas), destrucción de playas de anidación y captura incidental en redes.",
        traits: [
            "Una de las tortugas marinas más pequeñas, conocida por sus 'arribadas' masivas a la playa.",
            "Su caparazón en forma de corazón es de color verde oliva.",
            "Dieta: Medusas, peces pequeños, moluscos y algas marinas.",
            "Anida cada año en las costas cálidas de la península de Baja California."
        ],
        cares: [
            "Protección de campos tortugueros durante la época de desove y eclosión.",
            "Uso obligatorio de Dispositivos Excluidores de Tortugas (DETs) en barcos camaroneros.",
            "Eliminación de bolsas y plásticos de un solo uso en municipios costeros.",
            "Prohibición de vehículos 4x4 en playas de anidación."
        ]
    },
    tiburon: {
        name: "Tiburón Ballena (Rhincodon typus)",
        statusClass: "status-vulnerable",
        statusText: "⚠️ Estado: En Peligro / Vulnerable (UICN) - Especie Amenazada",
        habitat: "Aguas Someras y Nutritivas de la Bahía de La Paz",
        habitatTitle: "Bahía de La Paz (Santuario de Alimentación)",
        habitatDesc: "Bahía protegida con abundantes floraciones de fitoplancton y zooplancton arrastrados por las corrientes del Golfo de California en aguas cristalinas y templadas.",
        locationTag: "Ubicación: Bahía de La Paz / Archipiélago Revillagigedo",
        habitatSvg: `
            <svg class="habitat-art-svg" viewBox="0 0 220 140">
                <defs>
                    <linearGradient id="seaTiburon" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#48cae4"/>
                        <stop offset="60%" stop-color="#0077b6"/>
                        <stop offset="100%" stop-color="#023e8a"/>
                    </linearGradient>
                </defs>
                <rect width="220" height="25" fill="#ade8f4"/>
                <rect y="25" width="220" height="115" fill="url(#seaTiburon)"/>
                <!-- Rayos de Luz Solar -->
                <polygon points="20,25 40,25 80,140 40,140" fill="#ffffff" opacity="0.15"/>
                <polygon points="110,25 130,25 170,140 140,140" fill="#ffffff" opacity="0.12"/>
                <!-- Silueta Tiburón Ballena con Pintas -->
                <ellipse cx="110" cy="80" rx="58" ry="22" fill="#3d5a80"/>
                <polygon points="168,80 145,62 145,98" fill="#3d5a80"/>
                <!-- Manchas Blancas caracteristicas -->
                <circle cx="80" cy="76" r="2" fill="#fff"/>
                <circle cx="95" cy="84" r="2" fill="#fff"/>
                <circle cx="110" cy="74" r="2" fill="#fff"/>
                <circle cx="125" cy="82" r="2" fill="#fff"/>
                <circle cx="140" cy="76" r="2" fill="#fff"/>
            </svg>
        `,
        foodName: "Plancton, krill, microcrustáceos y peces pequeños",
        foodIcon: "🌊",
        foodBar: 80,
        habitatBar: 55,
        safetyBar: 60,
        dietInfo: "Alimentación: Filtrador. Succiona miles de litros de agua para filtrar krill, plancton y huevecillos de pez.",
        threatInfo: "Amenazas: Colisiones y heridas graves provocadas por hélices de embarcaciones turísticas y contaminación marina por plásticos.",
        traits: [
            "El pez más grande del mundo (alcanza hasta 12 a 18 metros de longitud).",
            "Completamente inofensivo; filtra alimento a través de sus agallas.",
            "Dieta: Plancton, krill, larvas de peces y microcrustáceos.",
            "Su piel presenta un patrón único de manchas blancas parecido a un mapa estelar."
        ],
        cares: [
            "Regulación estricta de velocidad (máx 7 nudos) para embarcaciones en la Bahía de La Paz.",
            "Uso obligatorio de protectores de hélice en lanchas de avistamiento.",
            "Capacidad de carga máxima diaria de visitantes turísticos.",
            "Monitoreo constante de la calidad del agua en zonas de alimentación."
        ]
    },
    leon: {
        name: "León Marino de California (Zalophus californianus)",
        statusClass: "status-preocupacion",
        statusText: "ℹ️ Estado: Preocupación Menor (UICN) - Protegido en Reservas de BCS",
        habitat: "Islotes Rocosos y Arrecifes de la Isla Espíritu Santo",
        habitatTitle: "Lobera de Los Islotes (Isla Espíritu Santo)",
        habitatDesc: "Formaciones rocosas volcánicas rodeadas de profundos arrecifes coralinos y bosques de sargazo donde las colonias descansan al sol y los juveniles juegan en el agua.",
        locationTag: "Ubicación: Parque Nacional Isla Espíritu Santo, BCS",
        habitatSvg: `
            <svg class="habitat-art-svg" viewBox="0 0 220 140">
                <defs>
                    <linearGradient id="seaLeon" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#90e0ef"/>
                        <stop offset="100%" stop-color="#0096c7"/>
                    </linearGradient>
                </defs>
                <rect width="220" height="35" fill="#caf0f8"/>
                <!-- Rocas de Los Islotes -->
                <path d="M 10 35 L 45 10 L 80 35 Z" fill="#8d7966"/>
                <path d="M 60 35 L 105 5 L 150 35 Z" fill="#6b5b4d"/>
                <rect y="35" width="220" height="105" fill="url(#seaLeon)"/>
                <!-- Silueta León Marino nadando -->
                <ellipse cx="120" cy="85" rx="38" ry="20" fill="#7c5c43"/>
                <circle cx="152" cy="72" r="13" fill="#7c5c43"/>
                <ellipse cx="163" cy="74" rx="6" ry="4" fill="#5a402d"/>
                <path d="M 110 85 Q 98 112 80 100 Z" fill="#7c5c43"/>
            </svg>
        `,
        foodName: "Pescados (Sardinas, macarelas, pulpos y calamares)",
        foodIcon: "🐟",
        foodBar: 85,
        habitatBar: 70,
        safetyBar: 65,
        dietInfo: "Alimentación: Carnívora activa. Caza sardinas, macarelas, pulpos y calamares nadando hábilmente.",
        threatInfo: "Amenazas: Enredos en redes fantasma abandonadas, ingesta de plásticos, brotes de bacterias por aguas contaminadas y molestia turística en loberas.",
        traits: [
            "Mamífero marino altamente inteligente, social y nadador ágil.",
            "Los machos adultos poseen una cresta sagital elevada y son más oscuros que las hembras.",
            "Dieta: Sardinas, calamares, pulpos y variedad de peces de arrecife.",
            "Habita en colonias o 'loberas' sobre islotes rocosos de Baja California Sur."
        ],
        cares: [
            "Regulación de buceo y nado con lobos marinos durante época de reproducción.",
            "Rescate y desenredo de individuos atrapados en redes fantasma o plásticos.",
            "Prevención de vertidos de aguas negras en archipiélagos costeros.",
            "Protección de las áreas de parideras en islotes protegidos."
        ]
    }
};

let currentKey = 'vaquita';
let currentAnimFrame = 0;

// Cambiar Especie e Interfaz
function switchSpecies(key) {
    currentKey = key;
    document.querySelectorAll('.selector-btn').forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }

    const data = speciesData[key];
    
    // Cambiar paleta de colores global
    document.body.className = data.statusClass;

    document.getElementById('species-name').innerText = data.name;
    document.getElementById('threatBanner').innerText = data.statusText;
    document.getElementById('habitat-text').innerText = `Tanque: ${data.name}`;
    document.getElementById('feed-icon').innerText = data.foodIcon;

    // Actualizar Recuadro Ilustrativo del Hábitat
    document.getElementById('habitatArtViewport').innerHTML = data.habitatSvg;
    document.getElementById('habitatBoxTitle').innerText = data.habitatTitle;
    document.getElementById('habitatBoxDesc').innerText = data.habitatDesc;
    document.getElementById('habitatBoxLocation').innerText = data.locationTag;

    // Reiniciar elementos del minijuego
    interactiveItems = [];
    spawnInitialGameItems();

    updateUI();
    updateLore('diet');
    updateInfoSection();
}

// Dibujar criaturas con estilo en Canvas
function drawCreature(x, y, type) {
    ctx.save();
    ctx.translate(x, y);

    const floatOffset = Math.sin(currentAnimFrame * 0.05) * 8;
    ctx.translate(0, floatOffset);

    if (type === 'vaquita') {
        ctx.fillStyle = 'rgba(122, 139, 153, 0.9)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 65, 30, 0, 0, Math.PI * 2); ctx.fill();

        ctx.beginPath(); // Cola
        ctx.moveTo(-55, 0); ctx.lineTo(-85, -18); ctx.lineTo(-75, 0); ctx.lineTo(-85, 18); ctx.closePath(); ctx.fill();

        ctx.beginPath(); // Dorsal
        ctx.moveTo(-5, -28); ctx.quadraticCurveTo(5, -50, 20, -25); ctx.fill();

        ctx.fillStyle = 'rgba(44, 40, 37, 0.8)'; // Antifaz
        ctx.beginPath(); ctx.arc(38, -2, 9, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(48, 8, 12, 5, -0.2, 0, Math.PI * 2); ctx.fill();

    } else if (type === 'totoaba') {
        ctx.fillStyle = 'rgba(140, 141, 143, 0.9)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 80, 32, 0, 0, Math.PI * 2); ctx.fill();

        ctx.beginPath(); // Aleta dorsal plateada/dorada
        ctx.fillStyle = '#d8b26e';
        ctx.moveTo(-20, -30); ctx.quadraticCurveTo(10, -50, 30, -28); ctx.fill();

        ctx.fillStyle = 'rgba(140, 141, 143, 0.9)';
        ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-95, -22); ctx.lineTo(-85, 0); ctx.lineTo(-95, 22); ctx.closePath(); ctx.fill();

        ctx.fillStyle = '#2c2825'; ctx.beginPath(); ctx.arc(50, -6, 5, 0, Math.PI * 2); ctx.fill();

    } else if (type === 'golfina') {
        ctx.fillStyle = 'rgba(91, 140, 90, 0.9)';
        ctx.beginPath(); ctx.ellipse(0, 0, 50, 40, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(48, -5, 15, 0, Math.PI * 2); ctx.fill();

        ctx.beginPath(); ctx.moveTo(20, -20); ctx.quadraticCurveTo(40, -60, 5, -50); ctx.fill();
        ctx.beginPath(); ctx.moveTo(20, 20); ctx.quadraticCurveTo(40, 60, 5, 50); ctx.fill();

    } else if (type === 'tiburon') {
        ctx.fillStyle = 'rgba(61, 90, 128, 0.9)';
        ctx.beginPath(); ctx.ellipse(0, 0, 100, 38, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(75, -32); ctx.lineTo(110, 0); ctx.lineTo(75, 32); ctx.closePath(); ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        for (let i = -60; i < 60; i += 20) {
            for (let j = -15; j <= 15; j += 15) {
                ctx.beginPath(); ctx.arc(i, j, 3, 0, Math.PI * 2); ctx.fill();
            }
        }

    } else if (type === 'leon') {
        ctx.fillStyle = 'rgba(124, 92, 67, 0.9)';
        ctx.beginPath(); ctx.ellipse(-10, 5, 55, 30, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(38, -15, 20, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(52, -10, 10, 7, 0, 0, Math.PI * 2); ctx.fill();

        ctx.beginPath(); ctx.moveTo(10, 15); ctx.quadraticCurveTo(25, 55, -15, 45); ctx.fill();
    }

    ctx.restore();
}

// Minijuego: Crear items flotantes
function spawnInitialGameItems() {
    const data = speciesData[currentKey];
    for (let i = 0; i < 4; i++) {
        interactiveItems.push({
            x: Math.random() * (canvas.width - 80) + 40,
            y: Math.random() * (canvas.height - 120) + 60,
            type: 'food',
            icon: data.foodIcon,
            size: 26,
            speedX: (Math.random() - 0.5) * 1.2,
            speedY: (Math.random() - 0.5) * 1.2
        });
    }
    if (data.safetyBar < 60 || data.habitatBar < 60) {
        for (let j = 0; j < 3; j++) {
            interactiveItems.push({
                x: Math.random() * (canvas.width - 80) + 40,
                y: Math.random() * (canvas.height - 120) + 60,
                type: 'trash',
                icon: Math.random() > 0.5 ? '🛍️' : '🕸️',
                size: 28,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: (Math.random() - 0.5) * 0.8
            });
        }
    }
}

function spawnFoodBatch() {
    const data = speciesData[currentKey];
    for (let i = 0; i < 3; i++) {
        interactiveItems.push({
            x: Math.random() * (canvas.width - 80) + 40,
            y: 20,
            type: 'food',
            icon: data.foodIcon,
            size: 26,
            speedX: (Math.random() - 0.5) * 1,
            speedY: Math.random() * 1.5 + 0.5
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

// Interacción al hacer clic en Canvas
canvas.addEventListener('click', function(e) {
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

// Render principal
function renderScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    interactiveItems.forEach(item => {
        ctx.font = `${item.size}px serif`;
        ctx.fillText(item.icon, item.x, item.y);

        item.x += item.speedX;
        item.y += item.speedY;

        if (item.x < 20 || item.x > canvas.width - 30) item.speedX *= -1;
        if (item.y < 30 || item.y > canvas.height - 30) item.speedY *= -1;
    });

    drawCreature(canvas.width / 2, canvas.height / 2, currentKey);

    currentAnimFrame++;
    requestAnimationFrame(renderScene);
}

function careAction(type) {
    const data = speciesData[currentKey];
    if (type === 'protect') {
        data.safetyBar = Math.min(100, data.safetyBar + 35);
        updateLore('threat');
    }
    updateUI();
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
        bodyEl.innerText = `El hábitat en ${data.habitat} necesita mantenerse libre de plásticos, redes y contaminación para garantizar la supervivencia de la especie.`;
    }
}

function updateInfoSection() {
    const data = speciesData[currentKey];
    document.getElementById('info-species-title').innerText = `Ficha de Conservación: ${data.name}`;

    const traitsList = document.getElementById('info-traits');
    traitsList.innerHTML = data.traits.map(t => `<li>${t}</li>`).join('');

    const caresList = document.getElementById('info-cares');
    caresList.innerHTML = data.cares.map(c => `<li>${c}</li>`).join('');
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
        overlay.innerText = `¡Alerta Crítica! ${data.name} se encuentra en peligro inminente en su hábitat. Atiende sus necesidades para salvarla.`;
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
    }
}

// Degeneración progresiva
setInterval(() => {
    Object.keys(speciesData).forEach(k => {
        speciesData[k].foodBar = Math.max(0, speciesData[k].foodBar - 2);
        speciesData[k].habitatBar = Math.max(0, speciesData[k].habitatBar - 1);
        speciesData[k].safetyBar = Math.max(0, speciesData[k].safetyBar - 1);
    });
    updateUI();
}, 6000);

// Inicialización
switchSpecies('vaquita');
renderScene();