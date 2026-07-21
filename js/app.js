/* ==========================================================================
   ALMA SERENA - SCRIPT COMPLETO (js/app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. PRELOADER Y MENÚ MÓVIL
       ---------------------------------------------------------------------- */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        });
    }

    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.className = menu.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                if (menuBtn.querySelector('i')) {
                    menuBtn.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. MODO OSCURO / CLARO
       ---------------------------------------------------------------------- */
    const darkModeBtn = document.getElementById('darkMode');
    const body = document.body;

    if (darkModeBtn) {
        const icon = darkModeBtn.querySelector('i');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            if (icon) icon.className = 'fa-solid fa-sun';
        }

        darkModeBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            if (icon) icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        });
    }

    /* ----------------------------------------------------------------------
       3. BOTÓN VOLVER ARRIBA
       ---------------------------------------------------------------------- */
    const topBtn = document.getElementById('top');
    if (topBtn) {
        window.addEventListener('scroll', () => {
            topBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
