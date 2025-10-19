/* Año */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Tema */
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
if (themeBtn){
  themeBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/* Helpers */
const island = document.getElementById('island');
const pill = document.getElementById('islandBtn');
const touchLike = () => window.matchMedia('(hover: none)').matches;

/* Táctil: abrir/cerrar pill */
if (island && pill){
  pill.addEventListener('click', (e)=>{
    if (e.target.closest('.switch') || e.target.closest('.lang')) return;
    if (touchLike()){
      const open = island.classList.toggle('open');
      pill.setAttribute('aria-expanded', String(open));
    }
  });

  document.addEventListener('click', (e)=>{
    if (!touchLike()) return;
    if (!island.classList.contains('open')) return;
    if (!island.contains(e.target)){
      island.classList.remove('open');
      pill.setAttribute('aria-expanded', 'false');
    }
  }, true);

  island.querySelectorAll('.pill-nav a').forEach(a=>{
    a.addEventListener('click', ()=>{
      if (!touchLike()) return;
      setTimeout(()=>{
        island.classList.remove('open');
        pill.setAttribute('aria-expanded', 'false');
      }, 150);
    });
  });

  pill.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter' || e.key === ' '){
      e.preventDefault(); pill.click();
    }
  });

  window.addEventListener('resize', ()=>{
    if (!touchLike() && island.classList.contains('open')){
      island.classList.remove('open');
      pill.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Reveal */
const revealTargets = document.querySelectorAll('.reveal');
if (revealTargets.length){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((en)=>{
      if (en.isIntersecting){ en.target.classList.add('show'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el=>io.observe(el));
}

/* Skills: tap en móvil */
document.querySelectorAll('.skill-pill').forEach(p=>{
  p.addEventListener('click', ()=>{
    if (window.matchMedia('(hover: none)').matches) {
      const open = p.classList.toggle('open');
      p.setAttribute('aria-expanded', String(open));
    }
  });
});

/* Contacto: abrir/cerrar por tap */
const contactCard = document.querySelector('.contact-card');
if (contactCard){
  contactCard.addEventListener('click', ()=>{
    if (window.matchMedia('(hover: none)').matches) {
      contactCard.classList.toggle('open');
    }
  });
}

/* =================== i18n =================== */
const I18N = {
  es: {
    nav:{projects:"Proyectos",experience:"Experiencia",skills:"Skills",contact:"Contacto"},
    hero:{title_prefix:"Hola, soy", subtitle:"Especialista en soporte y administración IT, con experiencia en entornos corporativos y públicos. Gestiono sistemas Linux y Windows, redes, Microsoft 365, hardware y bases de datos, asegurando operaciones estables y eficientes. Me motiva resolver incidencias técnicas y mejorar la experiencia del usuario."},
    cta:{view:"Ver proyectos",cv:"Descargar CV"},
    sections:{exp:"Experiencia",sk:"Skills",proj:"Proyectos",contact:"Contacto"},
    exp:{
      e1_place:"Junio 2025 - Presente", e1_role:"IT Workplace Intern",
      e1_t1:"Soporte técnico de segundo nivel (hardware, software y conectividad).",
      e1_t2:"Gestión de incidencias mediante Remedy y SmartIT.",
      e1_t3:"Preparación y despliegue de equipos (portátiles, IGEL, periféricos).",
      e1_t4:"Configuración de móviles iOS/Android, teléfonos Cisco y escáneres.",
      e1_t5:"Impresoras RFID y térmicas (Zebra, Honeywell).",
      e1_t6:"Gestión de garantías y reparaciones con proveedores.",
      e1_t7:"Colaboración en seguridad, parches y actualizaciones.",
      e2_place:"Noviembre 2023 – Abril 2024", e2_role:"IT Helpdesk Intern",
      e2_t1:"Soporte técnico presencial y remoto para personal municipal.",
      e2_t2:"Instalación y mantenimiento de equipos y periféricos.",
      e2_t3:"Administración básica de sistemas y permisos de usuario.",
      e2_t4:"Herramientas Linux para diagnóstico y resolución de fallos.",
      e2_t5:"Documentación de procedimientos y guías de usuario.",
      e2_t6:"Preparación y despliegue de equipos."
    },
    skills:{net:"Redes",sys:"Sistemas",cloud:"Cloud",code:"Programación",db:"BBDD",prod:"Productividad",hwvirt:"Hardware / <br> Virtualización",langs:"Idiomas"},
    projects:{
      p1_title:"iOS Glass Portfolio — Proyecto personal",
      p1_desc:"Portafolio inspirado en iOS26 con HTML, CSS y JS. Modo oscuro/claro, selector de idioma y Dynamic Island como navegación.",
      p2_desc:"Aplicación de gestión hotelera con Python + PostgreSQL. Reservas, usuarios, seguridad, replicación y backups automáticos.",
      p3_desc:"Juego de acción con tres tipos de enemigos y mejoras de personaje. Hecho en Unity.",
      p4_desc:"Shooter 2D con power-ups, sistema de puntuación y oleadas. Hecho en Unity.",
      github:"GitHub"
    },
    contact:{linkedin:"LinkedIn",email:"Email",github:"GitHub",whatsapp:"WhatsApp"}
  },
  en: {
    nav:{projects:"Projects",experience:"Experience",skills:"Skills",contact:"Contact"},
    hero:{title_prefix:"Hi, I'm", subtitle:"IT support and systems admin. Linux/Windows, networks, Microsoft 365, hardware and databases. Focused on reliability and user experience."},
    cta:{view:"View projects",cv:"Download CV"},
    sections:{exp:"Experience",sk:"Skills",proj:"Projects",contact:"Contact"},
    exp:{
      e1_place:"Jun 2025 - Present", e1_role:"IT Workplace Intern",
      e1_t1:"L2 support for hardware, software and connectivity.",
      e1_t2:"Incident management with Remedy / SmartIT.",
      e1_t3:"Staging and deployment of laptops, IGEL and peripherals.",
      e1_t4:"iOS/Android, Cisco phones and scanners setup.",
      e1_t5:"RFID and thermal printers (Zebra, Honeywell).",
      e1_t6:"Warranty and repairs with vendors.",
      e1_t7:"Security, patching and updates collaboration.",
      e2_place:"Nov 2023 – Apr 2024", e2_role:"IT Helpdesk Intern",
      e2_t1:"On-site and remote support for city staff.",
      e2_t2:"Installation and maintenance of devices.",
      e2_t3:"Basic systems admin and user permissions.",
      e2_t4:"Linux tools for troubleshooting.",
      e2_t5:"Process documentation and user guides.",
      e2_t6:"Device staging and rollout."
    },
    skills:{net:"Networking",sys:"Systems",cloud:"Cloud",code:"Programming",db:"Databases",prod:"Productivity",hwvirt:"Hardware / <br> Virtualization",langs:"Languages"},
    projects:{
      p1_title:"iOS Glass Portfolio — Personal project",
      p1_desc:"iOS26-inspired portfolio with HTML, CSS and JS. Dark/Light, language switch and Dynamic Island nav.",
      p2_desc:"Hotel management app with Python + PostgreSQL. Reservations, users, security, replication and automated backups.",
      p3_desc:"Action game with enemies and character upgrades. Built in Unity.",
      p4_desc:"2D shooter with power-ups, scoring and waves. Built in Unity.",
      github:"GitHub"
    },
    contact:{linkedin:"LinkedIn",email:"Email",github:"GitHub",whatsapp:"WhatsApp"}
  },
  ca:{
    nav:{projects:"Projectes",experience:"Experiència",skills:"Habilitats",contact:"Contacte"},
    hero:{title_prefix:"Hola, sóc", subtitle:"Suport IT i administració de sistemes. Linux/Windows, xarxes i Microsoft 365."},
    cta:{view:"Veure projectes",cv:"Descarregar CV"},
    sections:{exp:"Experiència",sk:"Habilitats",proj:"Projectes",contact:"Contacte"},
    exp:{
      e1_place:"Juny 2025 - Present", e1_role:"IT Workplace Intern",
      e1_t1:"Suport de nivell 2 per a maquinari i programari.",
      e1_t2:"Gestió d'incidències amb Remedy / SmartIT.",
      e1_t3:"Preparació i desplegament d'equips.",
      e1_t4:"Configuració iOS/Android, Cisco i escàners.",
      e1_t5:"Impressores RFID i tèrmiques.",
      e1_t6:"Garanties i reparacions amb proveïdors.",
      e1_t7:"Seguretat, pegats i actualitzacions.",
      e2_place:"Nov 2023 – Abr 2024", e2_role:"IT Helpdesk Intern",
      e2_t1:"Suport presencial i remot.",
      e2_t2:"Instal·lació i manteniment d'equips.",
      e2_t3:"Admin bàsica i permisos d'usuari.",
      e2_t4:"Eines Linux per resolució d'errors.",
      e2_t5:"Documentació de processos.",
      e2_t6:"Preparació i desplegament d'equips."
    },
    skills:{net:"Xarxes",sys:"Sistemes",cloud:"Cloud",code:"Programació",db:"BBDD",prod:"Productivitat",hwvirt:"Maquinari / <br> Virtualització",langs:"Idiomes"},
    projects:{
      p1_title:"iOS Glass Portfolio — Projecte personal",
      p1_desc:"Portafolis inspirat en iOS26 amb HTML, CSS i JS.",
      p2_desc:"App de gestió hotelera amb Python + PostgreSQL.",
      p3_desc:"Joc d'acció fet amb Unity.",
      p4_desc:"Shooter 2D amb power-ups. Unity.",
      github:"GitHub"
    },
    contact:{linkedin:"LinkedIn",email:"Email",github:"GitHub",whatsapp:"WhatsApp"}
  },
  fr:{
    nav:{projects:"Projets",experience:"Expérience",skills:"Compétences",contact:"Contact"},
    hero:{title_prefix:"Salut, je suis", subtitle:"Support IT et admin systèmes. Linux/Windows, réseaux et Microsoft 365."},
    cta:{view:"Voir les projets",cv:"Télécharger le CV"},
    sections:{exp:"Expérience",sk:"Compétences",proj:"Projets",contact:"Contact"},
    exp:{
      e1_place:"Juin 2025 - Présent", e1_role:"IT Workplace Intern",
      e1_t1:"Support N2 matériel/logiciel/connectivité.",
      e1_t2:"Incidents avec Remedy / SmartIT.",
      e1_t3:"Préparation et déploiement d’équipements.",
      e1_t4:"Config iOS/Android, Cisco et scanners.",
      e1_t5:"Imprimantes RFID et thermiques.",
      e1_t6:"Garanties et réparations fournisseurs.",
      e1_t7:"Sécurité, patchs et mises à jour.",
      e2_place:"Nov 2023 – Avr 2024", e2_role:"IT Helpdesk Intern",
      e2_t1:"Support sur site et à distance.",
      e2_t2:"Installation et maintenance.",
      e2_t3:"Admin basique et permissions.",
      e2_t4:"Outils Linux pour dépannage.",
      e2_t5:"Documentation et guides.",
      e2_t6:"Préparation et déploiement."
    },
    skills:{net:"Réseaux",sys:"Systèmes",cloud:"Cloud",code:"Programmation",db:"Bases de données",prod:"Productivité",hwvirt:"Hardware / <br> Virtualisation",langs:"Langues"},
    projects:{
      p1_title:"iOS Glass Portfolio — Projet personnel",
      p1_desc:"Portfolio inspiré d’iOS26 en HTML/CSS/JS.",
      p2_desc:"Gestion hôtelière Python + PostgreSQL.",
      p3_desc:"Jeu d’action sous Unity.",
      p4_desc:"Shooter 2D avec bonus. Unity.",
      github:"GitHub"
    },
    contact:{linkedin:"LinkedIn",email:"Email",github:"GitHub",whatsapp:"WhatsApp"}
  },
  de:{
    nav:{projects:"Projekte",experience:"Erfahrung",skills:"Skills",contact:"Kontakt"},
    hero:{title_prefix:"Hallo, ich bin", subtitle:"IT-Support und Systemadministration. Linux/Windows, Netzwerke und Microsoft 365."},
    cta:{view:"Projekte ansehen",cv:"Lebenslauf herunterladen"},
    sections:{exp:"Erfahrung",sk:"Skills",proj:"Projekte",contact:"Kontakt"},
    exp:{
      e1_place:"Juni 2025 - Heute", e1_role:"IT Workplace Intern",
      e1_t1:"2nd-Level-Support für Hardware/Software.",
      e1_t2:"Tickets mit Remedy / SmartIT.",
      e1_t3:"Vorbereitung und Rollout von Geräten.",
      e1_t4:"iOS/Android, Cisco-Telefone, Scanner.",
      e1_t5:"RFID/thermische Drucker.",
      e1_t6:"Garantie und Reparaturen mit Anbietern.",
      e1_t7:"Security, Patching, Updates.",
      e2_place:"Nov 2023 – Apr 2024", e2_role:"IT Helpdesk Intern",
      e2_t1:"Vor-Ort und Remote-Support.",
      e2_t2:"Installation und Wartung.",
      e2_t3:"Basis-Administration und Berechtigungen.",
      e2_t4:"Linux-Tools für Troubleshooting.",
      e2_t5:"Dokumentation und Anleitungen.",
      e2_t6:"Gerätevorbereitung und Rollout."
    },
    skills:{net:"Netzwerke",sys:"Systeme",cloud:"Cloud",code:"Programmierung",db:"Datenbanken",prod:"Produktivität",hwvirt:"Hardware / Virtualisierung",langs:"Sprachen"},
    projects:{
      p1_title:"iOS Glass Portfolio — Eigenes Projekt",
      p1_desc:"Von iOS26 inspiriertes Portfolio in HTML/CSS/JS.",
      p2_desc:"Hotelverwaltung mit Python + PostgreSQL.",
      p3_desc:"Action-Spiel mit Unity.",
      p4_desc:"2D-Shooter mit Power-ups. Unity.",
      github:"GitHub"
    },
    contact:{linkedin:"LinkedIn",email:"E-Mail",github:"GitHub",whatsapp:"WhatsApp"}
  }
};

/* aplicar traducciones */
function i18nSet(lang){
  const dict = I18N[lang] || I18N.es;
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const txt = key.split('.').reduce((o,k)=>o&&o[k], dict);
    if (typeof txt === 'string') el.textContent = txt;
  });
}

const langSel = document.getElementById('langSelect');
const prefLang = localStorage.getItem('lang') || (navigator.language||'es').slice(0,2);
if (langSel){
  if ([...langSel.options].some(o=>o.value===prefLang)) langSel.value = prefLang;
  i18nSet(langSel.value);
  langSel.addEventListener('change', ()=>{
    const v = langSel.value;
    localStorage.setItem('lang', v);
    i18nSet(v);
  });
} else {
  i18nSet(prefLang);
}
