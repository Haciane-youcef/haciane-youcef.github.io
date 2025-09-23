let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');


menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');


        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#header-navbar');

    if (navbarCollapsible) {
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('header-navbar_scrole');
        } else {
            navbarCollapsible.classList.add('header-navbar_scrole');
        }
    }
};


// Scroll to About section
function scrollToAbout(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    
    // Cherche la section About Me avec votre ID exact
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

                    // Update caption with fade effect
                    this.caption.style.opacity = '0';
                    setTimeout(() => {
                        this.caption.textContent = this.captions[this.currentIndex];
                        this.caption.style.opacity = '1';
                    }, 300);
                }
            }

            


    // Intersection Observer for timeline-item animations
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

    // Hover effects
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

    // Timeline progress
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


// Create floating particles
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

// Projects scroll update
const projectCards = document.querySelectorAll('.project-card');
const projectDetails = document.querySelectorAll('.project-detail-content');

let scrollTimeout;
function debounceUpdate() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveProject, 100);
}

function updateActiveProject() {
    let activeIndex = 0;
    let maxIntersection = 0;

    projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const intersection = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        if (intersection > maxIntersection) {
            maxIntersection = intersection;
            activeIndex = index;
        }
    });

    projectCards.forEach(card => card.classList.remove('active'));
    projectDetails.forEach(detail => detail.classList.remove('active'));

    projectCards[activeIndex].classList.add('active');
    projectDetails[activeIndex].classList.add('active');
}

// Initialize when DOM is ready
  

    


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



