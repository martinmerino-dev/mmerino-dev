/* ==========================================
   mmerinodev Portfolio - JavaScript
   Clean i18n implementation with data-i18n attributes
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLanguageToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initNavbarScroll();
    initCarousels();
    initImageLightbox();
});

/* ==========================================
   Translations - Centralized Object
   ========================================== */
const translations = {
    en: {
        // Navigation
        nav_about: 'About',
        nav_projects: 'Projects',
        nav_contact: 'Contact',
        
        // Hero
        hero_subtitle: 'Full-Stack Developer',
        hero_description: 'Passionate about building modern web applications, SaaS platforms, and data-driven solutions. I focus on clean code, performance, and real-world impact.',
        btn_view_projects: 'View Projects',
        btn_get_in_touch: 'Get in Touch',
        
        // Projects
        projects_title: 'Projects',
        category_software: 'Software Development',
        category_ml: 'ML & Data',
        label_problem: 'Problem:',
        label_approach: 'Approach:',
        label_results: 'Results:',
        btn_view_code: 'View Code',
        
        // Project 1: Warehouse Inventory
        proj1_title: 'Warehouse Inventory System || Inservio Home || Sydney Australia',
        proj1_problem: 'Replacing manual Excel-based inventory tracking with a dynamic software system that enables real-time stock monitoring, order tracking, and automated low-stock alerts.',
        proj1_approach: 'Full-stack app with auth, role-based access, stock management, and reporting features.',
        proj1_result1: 'Real-time tracking',
        proj1_result2: 'Weekly reports',
        proj1_result3: 'Admin system',
        
        // Project 2: Soil Fertility
        proj2_title: 'Soil Fertility Prediction',
        proj2_problem: 'Predict soil fertility from chemical properties.',
        proj2_approach: 'Random Forest with GridSearchCV tuning and cross-validation.',
        proj2_result1: '~91% accuracy',
        proj2_result2: 'Stable across folds',
        proj2_result3: 'Key: N, P, pH, Cu',
        
        // Project 3: Time Series
        proj3_title: 'Time Series Forecasting',
        proj3_problem: 'Predict future values from time series data.',
        proj3_approach: 'Naive Forecasting and Simple Moving Average with MAE evaluation.',
        proj3_result1: 'Multiple methods compared',
        proj3_result2: 'MAE evaluation',
        proj3_result3: 'Visual trend analysis',
        
        // Contact
        contact_title: 'Get in Touch',
        contact_subtitle: "Let's work together",
        contact_text: "I'm always open to discussing new projects, opportunities, or collaborations. Feel free to reach out!",
        
        // Footer
        footer_text: '© 2026 mmerinodev. All rights reserved.'
    },
    es: {
        // Navigation
        nav_about: 'Sobre Mí',
        nav_projects: 'Proyectos',
        nav_contact: 'Contacto',
        
        // Hero
        hero_subtitle: 'Desarrollador Full-Stack',
        hero_description: 'Apasionado por construir aplicaciones web modernas, plataformas SaaS y soluciones basadas en datos. Me enfoco en código limpio, rendimiento e impacto real.',
        btn_view_projects: 'Ver Proyectos',
        btn_get_in_touch: 'Contáctame',
        
        // Projects
        projects_title: 'Proyectos',
        category_software: 'Desarrollo de Software',
        category_ml: 'ML & Datos',
        label_problem: 'Problema:',
        label_approach: 'Enfoque:',
        label_results: 'Resultados:',
        btn_view_code: 'Ver Código',
        
        // Project 1: Warehouse Inventory
        proj1_title: 'Sistema de Inventario || Inservio Home || Sydney Australia',
        proj1_problem: 'Reemplazar el seguimiento manual de inventario basado en Excel con un sistema de software dinámico que permite monitoreo de stock en tiempo real, seguimiento de pedidos y alertas automáticas de bajo stock.',
        proj1_approach: 'App full-stack con auth, control de roles, gestión de stock y reportes.',
        proj1_result1: 'Seguimiento en tiempo real',
        proj1_result2: 'Reportes semanales',
        proj1_result3: 'Sistema admin',
        
        // Project 2: Soil Fertility
        proj2_title: 'Predicción de Fertilidad del Suelo',
        proj2_problem: 'Predecir fertilidad del suelo desde propiedades químicas.',
        proj2_approach: 'Random Forest con GridSearchCV y validación cruzada.',
        proj2_result1: '~91% precisión',
        proj2_result2: 'Estable entre folds',
        proj2_result3: 'Clave: N, P, pH, Cu',
        
        // Project 3: Time Series
        proj3_title: 'Pronóstico de Series Temporales',
        proj3_problem: 'Predecir valores futuros de series temporales.',
        proj3_approach: 'Pronóstico Ingenuo y Media Móvil Simple con evaluación MAE.',
        proj3_result1: 'Múltiples métodos comparados',
        proj3_result2: 'Evaluación MAE',
        proj3_result3: 'Análisis visual de tendencias',
        
        // Contact
        contact_title: 'Contacto',
        contact_subtitle: 'Trabajemos juntos',
        contact_text: 'Siempre estoy abierto a discutir nuevos proyectos, oportunidades o colaboraciones. ¡No dudes en contactarme!',
        
        // Footer
        footer_text: '© 2026 mmerinodev. Todos los derechos reservados.'
    }
};

/* ==========================================
   Language Toggle System
   ========================================== */
function initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const savedLang = localStorage.getItem('language') || 'en';
    
    // Apply saved language
    setLanguage(savedLang);
    
    // Add click handlers
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });
}

function setLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            // Handle elements with SVG children (like category titles and buttons with icons)
            const svg = el.querySelector('svg');
            if (svg) {
                el.innerHTML = '';
                el.appendChild(svg);
                el.appendChild(document.createTextNode(' ' + t[key]));
            } else {
                el.textContent = t[key];
            }
        }
    });
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update html lang attribute
    document.documentElement.lang = lang;
}

/* ==========================================
   Mobile Menu Toggle
   ========================================== */
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ==========================================
   Smooth Scrolling
   ========================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ==========================================
   Scroll Reveal Animation
   ========================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.expertise-card, .project-card, .about-content, .contact-content'
    );

    // Add reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll, { passive: true });
}

/* ==========================================
   Navbar Background on Scroll
   ========================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 11, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 11, 0.8)';
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ==========================================
   Active Navigation Link
   ========================================== */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const navHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ==========================================
   Image Carousel
   ========================================== */
function initCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        if (slides.length === 0) return;
        
        let currentIndex = 0;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        
        function goToSlide(index) {
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            
            currentIndex = index;
            if (currentIndex >= slides.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = slides.length - 1;
            
            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(currentIndex - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(currentIndex + 1);
            });
        }
    });
}

/* ==========================================
   Image Lightbox with Navigation
   ========================================== */
let currentLightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(imageSrc, allImages = [], startIndex = 0) {
    // Store images for navigation
    currentLightboxImages = allImages.length > 0 ? allImages : [imageSrc];
    currentLightboxIndex = startIndex;
    
    // Create lightbox if it doesn't exist
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <button class="lightbox-nav lightbox-nav-desktop lightbox-prev" aria-label="Previous image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <div class="lightbox-content">
                <img class="lightbox-image" src="" alt="Full size image">
                <div class="lightbox-arrows-mobile">
                    <button class="lightbox-nav lightbox-prev-mobile" aria-label="Previous image">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button class="lightbox-nav lightbox-next-mobile" aria-label="Next image">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
            <button class="lightbox-nav lightbox-nav-desktop lightbox-next" aria-label="Next image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        `;
        document.body.appendChild(lightbox);
        
        // Close on button click
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        
        // Navigation buttons (desktop)
        lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(-1);
        });
        
        lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(1);
        });
        
        // Navigation buttons (mobile)
        lightbox.querySelector('.lightbox-prev-mobile').addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(-1);
        });
        
        lightbox.querySelector('.lightbox-next-mobile').addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox(1);
        });
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        });
    }
    
    // Update navigation buttons visibility
    updateLightboxNav();
    
    // Set image and show
    lightbox.querySelector('.lightbox-image').src = currentLightboxImages[currentLightboxIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = currentLightboxImages.length - 1;
    if (currentLightboxIndex >= currentLightboxImages.length) currentLightboxIndex = 0;
    
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.querySelector('.lightbox-image').src = currentLightboxImages[currentLightboxIndex];
    }
}

function updateLightboxNav() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    
    // Show/hide navigation based on number of images
    const showNav = currentLightboxImages.length > 1;
    
    // Desktop arrows
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    prevBtn.style.display = showNav ? '' : 'none';
    nextBtn.style.display = showNav ? '' : 'none';
    
    // Mobile arrows container
    const mobileArrows = lightbox.querySelector('.lightbox-arrows-mobile');
    if (mobileArrows) {
        mobileArrows.style.display = showNav ? '' : 'none';
    }
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ==========================================
   Init Lightbox for Static Images
   ========================================== */
function initImageLightbox() {
    // Add expand hotspot and icon to all project images
    document.querySelectorAll('.project-image').forEach(container => {
        // Add hotspot if not already present
        if (!container.querySelector('.expand-hotspot')) {
            const hotspot = document.createElement('div');
            hotspot.className = 'expand-hotspot';
            container.appendChild(hotspot);
        }
        
        // Add expand icon if not already present
        if (!container.querySelector('.expand-icon')) {
            const icon = document.createElement('div');
            icon.className = 'expand-icon';
            icon.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
            `;
            container.appendChild(icon);
        }
        
        // Get the clickable elements
        const hotspot = container.querySelector('.expand-hotspot');
        const icon = container.querySelector('.expand-icon');
        
        // Function to get all images and current index
        const getImagesInfo = () => {
            const slides = container.querySelectorAll('.carousel-slide');
            if (slides.length > 0) {
                // For carousels, get all images and find the active one
                const allImages = Array.from(slides).map(slide => slide.src);
                const activeSlide = container.querySelector('.carousel-slide.active');
                const currentIndex = activeSlide ? Array.from(slides).indexOf(activeSlide) : 0;
                return { images: allImages, index: currentIndex };
            }
            // For static images
            const img = container.querySelector('img');
            return img ? { images: [img.src], index: 0 } : { images: [], index: 0 };
        };
        
        // Add click handlers to hotspot and icon
        [hotspot, icon].forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const { images, index } = getImagesInfo();
                if (images.length > 0) {
                    openLightbox(images[index], images, index);
                }
            });
        });
    });
}
