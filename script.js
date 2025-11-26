// script.js — theme toggle, AOS init, skill animations, counters, back-to-top

(() => {
  // Theme
  const body = document.documentElement;
  const THEME_KEY = 'site-theme';

  function getStoredTheme(){ return localStorage.getItem(THEME_KEY) || 'light'; }
  function applyTheme(t){
    body.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
    updateIcons(t);
  }
  function updateIcons(t){
    // update all theme icons if present
    document.querySelectorAll('[id^="themeIcon"]').forEach(el=>{
      el.className = t === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    });
  }
  // Toggle handler (for multiple toggles across pages)
  document.addEventListener('click', (e) => {
    if (e.target && (e.target.id === 'themeToggle' || e.target.closest('#themeToggle') || e.target.id.startsWith('themeToggle'))) {
      const current = getStoredTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    }
  });

  // Initialize theme on load
  document.addEventListener('DOMContentLoaded', () => {
    const stored = getStoredTheme();
    applyTheme(stored);

    // AOS init (if available)
    if (window.AOS) AOS.init({ duration: 700, once: true });

    // Skill bars animation
    document.querySelectorAll('.skill-progress').forEach(el=>{
      const width = el.getAttribute('data-width');
      if (width) {
        setTimeout(()=> el.style.width = width + '%', 250);
      }
    });

    // Counters (simple)
    document.querySelectorAll('.stat-number').forEach(el=>{
      const target = +el.getAttribute('data-count') || 0;
      if (target > 0){
        let cur = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(()=>{
          cur += step;
          if (cur >= target) { el.textContent = target; clearInterval(timer); }
          else el.textContent = cur;
        }, 20);
      }
    });

    // Back to top
    const back = document.getElementById('backToTop');
    window.addEventListener('scroll', ()=>{
      if (!back) return;
      if (window.scrollY > 400) back.classList.remove('d-none'); else back.classList.add('d-none');
    });
    if (back) back.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

    // Form validation bootstrap
    document.querySelectorAll('.needs-validation').forEach(form=>{
      form.addEventListener('submit', function(e){
        if (!form.checkValidity()) { e.preventDefault(); e.stopPropagation(); }
        form.classList.add('was-validated');
      }, false);
    });
  });
})();
