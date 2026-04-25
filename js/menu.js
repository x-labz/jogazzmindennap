document.addEventListener('DOMContentLoaded', () => {

    // ═══════ Premium Navbar: scroll effect ═══════
    const navbar = document.getElementById('navbar');
    const navMenuRef = document.getElementById('navMobile');
    if (navbar) {
        const onScroll = () => {
            // Don't change nav state while hamburger menu is open
            if (navMenuRef && navMenuRef.classList.contains('open')) return;
            if (window.scrollY > 40) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ═══════ Hamburger menu ═══════
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('navMobile');
    if (hamburger && mobileMenu) {
        const openMenu = () => {
            hamburger.classList.add('active');
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        };
        const closeMenu = () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
        });
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // ═══════ Scroll-to-top button ═══════
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        document.addEventListener('scroll', () => {
            const value = window.scrollY;
            if (value > 60) {
                scrollTopBtn.style.opacity = 1;
            }
            if (value < 50) {
                scrollTopBtn.style.opacity = 0;
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ═══════ Cookie consent ═══════
    const cookieElem = document.querySelector('.cookie');
    if (cookieElem) {
        cookieElem.addEventListener('click', () => {
            window.localStorage.setItem('cookie', true);
            cookieElem.style.display = 'none';
        });
        const newVisitor = !window.localStorage.getItem('cookie');
        if (newVisitor) {
            cookieElem.style.display = 'block';
        }
    }

    // ═══════ Scroll reveal (IntersectionObserver) ═══════
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length > 0) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => obs.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('visible'));
    }

    // ═══════ Smooth scroll for anchor links ═══════
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        // Check if target is hidden (e.g. inside hidden landingSections)
        const isTargetHidden = target.closest('.hidden') || getComputedStyle(target).display === 'none';

        if (!isTargetHidden) {
            e.preventDefault();
            e.stopPropagation(); // prevent router.js from handling it
            const navH = navbar ? navbar.offsetHeight : 70;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 20;
            window.scrollTo({ top: top, behavior: 'smooth' });
        } else {
            // If target is hidden (we are on a SPA page but link is for landing), navigate to home
            e.preventDefault();
            window.location.href = "/" + href;
        }
    });
});
