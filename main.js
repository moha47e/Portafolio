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

/* Táctil: tap para abrir/cerrar la MISMA pill */
if (island && pill){
  pill.addEventListener('click', (e)=>{
    if (e.target.closest('.switch')) return;        // no alternar si click en switch
    if (touchLike()){
      const open = island.classList.toggle('open'); // expande/colapsa
      pill.setAttribute('aria-expanded', String(open));
    }
  });

  // cerrar al tocar fuera en móvil
  document.addEventListener('click', (e)=>{
    if (!touchLike()) return;
    if (!island.classList.contains('open')) return;
    if (!island.contains(e.target)){
      island.classList.remove('open');
      pill.setAttribute('aria-expanded', 'false');
    }
  }, true);

  // si se pulsa un enlace del nav en móvil, cierra tras navegar
  island.querySelectorAll('.pill-nav a').forEach(a=>{
    a.addEventListener('click', ()=>{
      if (!touchLike()) return;
      setTimeout(()=>{
        island.classList.remove('open');
        pill.setAttribute('aria-expanded', 'false');
      }, 150);
    });
  });

  // accesible con teclado
  pill.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      pill.click();
    }
  });

  // cambio de modo interacción
  window.addEventListener('resize', ()=>{
    if (!touchLike() && island.classList.contains('open')){
      island.classList.remove('open');
      pill.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Scroll reveal opcional */
const revealTargets = document.querySelectorAll('.reveal');
if (revealTargets.length){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((en)=>{
      if (en.isIntersecting){ en.target.classList.add('show'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el=>io.observe(el));
}
// Skills: abrir/cerrar por tap en dispositivos sin hover
document.querySelectorAll('.skill-pill').forEach(pill=>{
  pill.addEventListener('click', ()=>{
    if (window.matchMedia('(hover: none)').matches) {
      const open = pill.classList.toggle('open');
      pill.setAttribute('aria-expanded', String(open));
    }
  });
});

// Idioma: persistencia y atributo lang en <html>
const langSel = document.getElementById('langSelect');
if (langSel){
  // valor inicial: localStorage o navegador
  const savedLang = localStorage.getItem('lang')
    || (navigator.language || 'es').slice(0,2);
  if ([...langSel.options].some(o=>o.value===savedLang)) langSel.value = savedLang;
  document.documentElement.setAttribute('lang', langSel.value);

  langSel.addEventListener('change', () => {
    const v = langSel.value;
    document.documentElement.setAttribute('lang', v);
    localStorage.setItem('lang', v);
    // hook opcional: actualizar textos si luego añades i18n
    // updateTexts(v)
  });
}
