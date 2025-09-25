/**
 * Navigation Menu Toggle
 */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/**
 * Sticky Header and Navigation Highlight on Scroll
 */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
            });
        }
    });

    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/**
 * Navbar Shrink on Scroll
 */
const navbarShrink = () => {
    const navbarCollapsible = document.body.querySelector('#header-navbar');
    if (navbarCollapsible) {
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('header-navbar_scrole');
        } else {
            navbarCollapsible.classList.add('header-navbar_scrole');
        }
    }
};

/**
 * Scroll to About Section
 */
function scrollToAbout(event) {
    event.preventDefault();
    const aboutSection = document.querySelector('#about-me-section');
    if (aboutSection) {
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        console.log('Section About Me non trouvée');
    }
}

/**
 * Image Carousel Class
 */
class ImageCarousel {
    constructor() {
        this.currentIndex = 2;
        this.items = document.querySelectorAll('#about-me-section .carousel-item');
        this.caption = document.getElementById('carouselCaption');
        this.captions = ['I Code', 'I Travel', 'I Lift'];
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.init();
    }

    init() {
        const carousel = document.getElementById('imageCarousel');
        
        // Mouse events
        carousel.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        
        // Touch events
        carousel.addEventListener('touchstart', this.handleTouchStart.bind(this));
        document.addEventListener('touchmove', this.handleTouchMove.bind(this));
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Click events on items
        this.items.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (!this.isDragging) {
                    this.goToSlide(index);
                }
            });
        });

        // Auto-rotate every 4 seconds
        setInterval(() => {
            if (!this.isDragging) {
                this.nextSlide();
            }
        }, 4000);
    }

    handleMouseDown(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        document.body.style.userSelect = 'none';
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.clientX;
    }

    handleMouseUp() {
        if (!this.isDragging) return;
        this.handleDragEnd();
    }

    handleTouchStart(e) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.touches[0].clientX;
        e.preventDefault();
    }

    handleTouchEnd() {
        if (!this.isDragging) return;
        this.handleDragEnd();
    }

    handleDragEnd() {
        const deltaX = this.currentX - this.startX;
        const threshold = 50;

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        }

        this.isDragging = false;
        document.body.style.userSelect = '';
        this.startX = 0;
        this.currentX = 0;
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        this.items.forEach((item, index) => {
            item.classList.remove('left', 'center', 'right');
            
            if (index === this.currentIndex) {
                item.classList.add('center');
            } else if (index === (this.currentIndex - 1 + this.items.length) % this.items.length) {
                item.classList.add('left');
            } else if (index === (this.currentIndex + 1) % this.items.length) {
                item.classList.add('right');
            } else {
                item.style.opacity = '0';
                item.style.visibility = 'hidden';
                setTimeout(() => {
                    if (!item.classList.contains('center') && 
                        !item.classList.contains('left') && 
                        !item.classList.contains('right')) {
                        item.style.opacity = '';
                        item.style.visibility = '';
                    }
                }, 600);
            }
        });

        this.caption.style.opacity = '0';
        setTimeout(() => {
            this.caption.textContent = this.captions[this.currentIndex];
            this.caption.style.opacity = '1';
        }, 300);
    }
}

/**
 * Intersection Observer for Timeline Animations
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationFillMode = 'forwards';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.experience-section-container .timeline-item').forEach(item => {
        observer.observe(item);
    });
}

/**
 * Hover Effects for Achievements
 */
function initHoverEffects() {
    const achievements = document.querySelectorAll('.experience-section-container .achievement-item');

    achievements.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.color = 'var(--text-primary)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = 'var(--text-secondary)';
        });
    });
}

/**
 * Timeline Progress Animation
 */
function initTimelineProgress() {
    const timeline = document.querySelector('.experience-section-container .timeline-progress');
    const profileIndicator = document.querySelector('.experience-section-container .profile-indicator');
    const timelineContainer = document.querySelector('.experience-section-container .timeline-container');
    const timelineLine = document.querySelector('.experience-section-container .timeline-line');

    if (!timeline || !profileIndicator || !timelineContainer || !timelineLine) return;

    let ticking = false;

    function updateProgress() {
        const rect = timelineContainer.getBoundingClientRect();
        const containerHeight = rect.height;
        const scrollY = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const containerTop = rect.top + scrollY;

        if (containerHeight <= 0) {
            ticking = false;
            return;
        }

        const viewportCenter = scrollY + windowHeight / 2;
        let progress = (viewportCenter - containerTop) / containerHeight;

        progress = Math.max(0, Math.min(1, progress));

        timeline.style.transform = `scaleY(${progress})`;

        const timelineLineHeight = timelineLine.offsetHeight;
        const progressHeight = timelineLineHeight * progress;
        const translateY = Math.max(0, progressHeight);

        profileIndicator.style.transform = `translateY(${translateY}px)`;

        ticking = false;
    }

    function requestUpdate() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateProgress);
        }
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    updateProgress();
}

/**
 * Create Floating Particles
 */
function createParticles() {
    const particles = document.getElementById('particles');
    const particleCount = 300;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particles.appendChild(particle);
    }
}

/**
 * Projects Scroll Update
 */
// Sélection des éléments
const projectCards = document.querySelectorAll('.project-card');
const projectDetails = document.querySelectorAll('.project-details-sidebar .project-detail-content');
const mobileProjectDetails = document.querySelectorAll('.project-detail-mobile');

let scrollTimeout;
let isMobile = window.innerWidth <= 768;

// Fonction de debounce pour optimiser les performances
function debounceUpdate() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveProject, 100);
}

// Fonction pour détecter si on est en mode mobile
function checkIfMobile() {
    return window.innerWidth <= 768;
}

// Fonction principale pour mettre à jour le projet actif
function updateActiveProject() {
    // Ne pas exécuter sur mobile car les détails sont toujours affichés
    if (checkIfMobile()) {
        return;
    }

    let activeIndex = 0;
    let maxIntersection = 0;

    // Trouver le projet le plus visible à l'écran
    projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const intersection = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (intersection > maxIntersection) {
            maxIntersection = intersection;
            activeIndex = index;
        }
    });

    // Mettre à jour les classes actives uniquement sur desktop
    projectCards.forEach(card => card.classList.remove('active'));
    projectDetails.forEach(detail => detail.classList.remove('active'));

    projectCards[activeIndex].classList.add('active');
    if (projectDetails[activeIndex]) {
        projectDetails[activeIndex].classList.add('active');
    }
}

// Fonction pour gérer le changement de taille d'écran
function handleResize() {
    const wasMobile = isMobile;
    isMobile = checkIfMobile();

    // Si on passe de mobile à desktop ou vice versa
    if (wasMobile !== isMobile) {
        if (isMobile) {
            // Passer en mode mobile : nettoyer les classes actives desktop
            projectCards.forEach(card => card.classList.remove('active'));
            projectDetails.forEach(detail => detail.classList.remove('active'));
        } else {
            // Passer en mode desktop : réactiver le système de scroll
            updateActiveProject();
        }
    }
}

// Fonction d'initialisation
function initializeProjects() {
    // Vérifier si on est sur mobile
    isMobile = checkIfMobile();

    if (!isMobile) {
        // Mode desktop : activer le premier projet
        if (projectCards[0]) {
            projectCards[0].classList.add('active');
        }
        if (projectDetails[0]) {
            projectDetails[0].classList.add('active');
        }

        // Ajouter l'écouteur de scroll
        window.addEventListener('scroll', debounceUpdate);
    }

    // Ajouter l'écouteur de redimensionnement
    window.addEventListener('resize', handleResize);
}

// Animation d'apparition pour les détails mobiles
function animateMobileDetails() {
    if (checkIfMobile()) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        mobileProjectDetails.forEach(detail => {
            // Initialiser l'état d'animation
            detail.style.opacity = '0';
            detail.style.transform = 'translateY(20px)';
            detail.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            observer.observe(detail);
        });
    }
}

// Fonction pour nettoyer les écouteurs d'événements
function cleanup() {
    window.removeEventListener('scroll', debounceUpdate);
    window.removeEventListener('resize', handleResize);
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    initializeProjects();
    animateMobileDetails();
});

// Nettoyage lors du déchargement de la page
window.addEventListener('beforeunload', cleanup);

// Gestion des clics sur les cartes de projet (optionnel, pour interaction manuelle)
projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (!checkIfMobile()) {
            // Comportement desktop : mettre à jour l'état actif
            projectCards.forEach(c => c.classList.remove('active'));
            projectDetails.forEach(d => d.classList.remove('active'));
            
            card.classList.add('active');
            if (projectDetails[index]) {
                projectDetails[index].classList.add('active');
            }
        }
        // Sur mobile, les détails sont déjà visibles, pas besoin d'action
    });
});

/**
 * Contact Dialog Handling
 */
const dialog = document.getElementById('contact-dialog');
const contactLink = document.getElementById('contactLink');
const contactLinkHome = document.getElementById('contactLinkHome');
const contactLinkFooter1 = document.getElementById('animated-link1');
const contactLinkFooter2 = document.getElementById('animated-link2');
const ctaButton = document.querySelector('.cta-button');

function openDialog(e) {
    if (e) e.stopPropagation();
    if (dialog) {
        dialog.classList.add('open');
    } else {
        console.error("L'élément #contact-dialog n'existe pas.");
    }
}

function closeDialog() {
    dialog.classList.remove('open');
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-trigger').forEach(trigger => {
        trigger.setAttribute('data-tab-state', 'inactive');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.setAttribute('data-tab-state', 'inactive');
        content.hidden = true;
    });

    const trigger = document.getElementById(tabId + '-trigger');
    const content = document.getElementById(tabId + '-content');
    if (trigger && content) {
        trigger.setAttribute('data-tab-state', 'active');
        content.setAttribute('data-tab-state', 'active');
        content.hidden = false;
    }
}

if (contactLink) {
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        openDialog();
    });
}

if (contactLinkHome) {
    contactLinkHome.addEventListener('click', (e) => {
        e.preventDefault();
        openDialog();
    });
}

if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        openDialog(e);
    });
}

if (contactLinkFooter1) {
    contactLinkFooter1.addEventListener('click', (e) => {
        e.preventDefault();
        openDialog(e);
    });
}

if (contactLinkFooter2) {
    contactLinkFooter2.addEventListener('click', (e) => {
        e.preventDefault();
        openDialog(e);
    });
}

document.addEventListener('click', (e) => {
    if (!dialog.contains(e.target) && !e.target.closest('#contactLink') && !e.target.closest('#contactLinkHome') && !e.target.closest('.cta-button') && !e.target.closest('#animated-link1') && !e.target.closest('#animated-link2')) {
        closeDialog();
    }
});

dialog.addEventListener('click', (e) => {
    e.stopPropagation();
});

/**
 * Form Submission with EmailJS
 */
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.init("TEMyHXJXN73myHW9A");

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_871ljca", "template_mykr8ni", formData)
        .then(
            function (response) {
                console.log("Email sent successfully:", response);
                Swal.fire({
                    title: "Succès !",
                    text: "Votre message a été envoyé avec succès !",
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#0000FF",
                    timer: 5000,
                    timerProgressBar: true,
                    customClass: {
                        popup: 'custom-swal-popup',
                        title: 'custom-swal-title',
                        content: 'custom-swal-content',
                        confirmButton: 'custom-swal-confirm'
                    }
                });
                document.getElementById("contact-form").reset();
            },
            function (error) {
                console.log("Email sending failed:", error);
                Swal.fire({
                    title: "Erreur",
                    text: "Échec de l'envoi du message. Veuillez réessayer plus tard.",
                    icon: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#dc3545",
                    timer: 5000,
                    timerProgressBar: true,
                    customClass: {
                        popup: 'custom-swal-popup',
                        title: 'custom-swal-title',
                        content: 'custom-swal-content',
                        confirmButton: 'custom-swal-confirm'
                    }
                });
            }
        );
});

/**
 * Call-to-Action Section Animations
 */
document.addEventListener('DOMContentLoaded', function() {
    const rotatingBadge = document.querySelector('.call-to-action-section-wrapper .rotating-badge');
    let isHovered = false;

    if (rotatingBadge) {
        rotatingBadge.addEventListener('mouseenter', () => {
            isHovered = true;
            rotatingBadge.style.animationPlayState = 'paused';
        });

        rotatingBadge.addEventListener('mouseleave', () => {
            isHovered = false;
            rotatingBadge.style.animationPlayState = 'running';
        });
    }

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (rotatingBadge && !isHovered) {
            const currentTransform = rotatingBadge.style.transform || '';
            const newTransform = currentTransform.replace(/translateY\([^)]*\)/, '') + ` translateY(${rate}px)`;
            rotatingBadge.style.transform = newTransform;
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.call-to-action-section-wrapper, .call-to-action-section-wrapper .main-heading, .call-to-action-section-wrapper .cta-button-container, .call-to-action-section-wrapper .description, .call-to-action-section-wrapper .sub-description');
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});


/** partie animations */
// partie homepage

    const observerOptionshome = {
        threshold: 0.1, // 10% de l'élément visible
        rootMargin: '0px 0px -100px 0px' // Marge pour déclencher un peu avant
    };

    const homeContentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Sélectionner les éléments à animer
                const elements = entry.target.querySelectorAll('h2, h3, p, .social-icons, .btn-group');
                elements.forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.5}s`; 
                    el.style.animationPlayState = 'running'; 
                });
                homeContentObserver.unobserve(entry.target);
            }
        });
    }, observerOptionshome);

    // Observer la div .home-content
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
        
        homeContent.querySelectorAll('h2, h3, p, .social-icons, .btn-group').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
        homeContentObserver.observe(homeContent);
    }


// Animation des paragraphes dans la section "About Me" avec Intersection Observer
const observerOptions = {
    threshold: 0.1, 
    rootMargin: '0px 0px -100px 0px' 
};

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            entry.target.querySelectorAll('p').forEach((p, index) => {
                p.style.animationDelay = `${index * 0.4}s`; 
                p.style.animationPlayState = 'running';
            });
            textObserver.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Observer la div .text-content
const textContent = document.querySelector('#about-me-section .text-content');
if (textContent) {
    // Initialement, mettre l'animation en pause
    textContent.querySelectorAll('p').forEach(p => {
        p.style.animationPlayState = 'paused';
    });
    textObserver.observe(textContent);
}

/**
 * Initialize All Features on DOM Load
 */
document.addEventListener('DOMContentLoaded', function () {
    new ImageCarousel();
    window.addEventListener('scroll', navbarShrink);
    window.addEventListener('scroll', debounceUpdate);
    window.addEventListener('resize', debounceUpdate);
    
    initTimelineProgress();
    navbarShrink();
    createParticles();
    updateActiveProject();
});
