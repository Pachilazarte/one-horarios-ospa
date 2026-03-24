/**
 * MARCA.JS — OSPA / STA
 * Proyecto independiente — una sola empresa
 */
const EMPRESA_ID = "ospa";
const EMPRESA = {
  id:             "ospa",
  nombre:         "OSPA",
  nombreCompleto: "OSPA — SOEAIL",
  bodyClass:      "empresa-ospa",
  colores: { primario:"#11308C", secundario:"#79BF0F", acento:"#79BF0F" },
  logos: {
    full:     "assets/logos/ospa/logo-full.png",
    blanco:   "assets/logos/ospa/logo-blanco.png",
    negro:    "assets/logos/ospa/logo-negro.png",
    cuadrado: "assets/logos/ospa/logo-cuadrado.png",
    favicon:  "assets/logos/ospa/logo-favicon.png",
  },
  supabase: {
    url: "https://tcgxprrrgyrwyenaaxff.supabase.co",
    key: "sb_publishable_hEQiC8xzzLvjG-qWh8iBag_YhrQPeON",
  },
  admin: { user: "admin", pass: "ospa2026" },
};

const MARCA = {
  empresas: { ospa: EMPRESA },
  superAdmin: { user: "superadmin", pass: "SuperAdmin2026!" },
  // Las áreas y colores vienen de la BD — no se hardcodean acá
  areaColors: {},   // se llena con cargarColoresAreas()
  areasCache: [],   // lista de áreas activas desde BD
  dias:      ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"],
  diasLabel: ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],
  diasFull:  ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
};

function aplicarMarca(empresaId) {
  document.body.classList.remove("empresa-ospa","empresa-ospa");
  document.body.classList.add("empresa-ospa");
  let fav = document.querySelector("link[rel='icon']");
  if (!fav) { fav = document.createElement("link"); fav.rel = "icon"; document.head.appendChild(fav); }
  fav.href = EMPRESA.logos.favicon;
  sessionStorage.setItem("empresaActiva", EMPRESA_ID);
}

// ── Carga áreas y colores desde BD ──
// Llamar una vez al iniciar cada página, después de initSB()
async function cargarColoresAreas() {
  if (!SB) return;
  try {
    const { data } = await SB.from('areas').select('nombre,color').eq('activa', true).order('nombre');
    if (!data?.length) return;
    MARCA.areasCache = data.map(a => a.nombre);
    data.forEach(a => {
      if (a.nombre && a.color) {
        MARCA.areaColors[a.nombre.toUpperCase()] = a.color;
      }
    });
  } catch (e) {
    console.warn('No se pudieron cargar colores de áreas:', e);
  }
}

// ── Devuelve el color del área desde la caché ──
function areaColor(area) {
  if (!area) return "#6be1e3";
  const upper = area.toUpperCase();
  return MARCA.areaColors[upper] || MARCA.areaColors[Object.keys(MARCA.areaColors).find(k => upper.includes(k))||''] || "#6be1e3";
}