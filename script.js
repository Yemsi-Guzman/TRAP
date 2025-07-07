// Advanced Music Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeParticles();
    initializeNavigation();
    initializeHeroAnimations();
    initializeScrollEffects();
    initializeInteractiveElements();
    initializeMusicPlayer();
    initializeAudioVisualizer();
    initializeGlitchEffects();
    
    // Show loading complete message
    setTimeout(() => {
        showNotification('🎵 ¡Bienvenido al mundo del Trap Dominicano! 🎵', 'success');
    }, 2000);
}

// Particle System
function initializeParticles() {
    const particleContainer = document.querySelector('.particle-container');
    
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
    
    // Add new particles periodically
    setInterval(() => {
        if (document.querySelectorAll('.particle').length < 50) {
            createParticle(particleContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #ff0000, transparent);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        opacity: 0;
        animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
    `;
    
    container.appendChild(particle);
    
    // Remove particles after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        50% {
            transform: translateY(-100px) rotate(180deg);
            opacity: 0.8;
        }
        90% {
            opacity: 1;
        }
    }
`;
document.head.appendChild(particleStyles);

// Navigation System
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.querySelector('.nav');
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Scroll-based navigation styling
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.boxShadow = '0 2px 20px rgba(255, 0, 0, 0.2)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
            nav.style.boxShadow = 'none';
        }
        
        // Update active link based on scroll position
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Hero Animations
function initializeHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroBtn = document.querySelector('.hero-btn');
    
    // Enhanced typing animation
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }
    
    // Hero button interaction
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Advanced Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateElement(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const vinyl = document.querySelector('.vinyl-record');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (vinyl) {
            vinyl.style.transform = `rotate(${scrolled * 0.5}deg)`;
        }
    });
}

function animateElement(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    // Add specific animations based on element type
    if (element.classList.contains('song-card')) {
        element.style.animation = 'slideInUp 0.6s ease forwards';
    } else if (element.classList.contains('artist-card-3d')) {
        element.style.animation = 'scaleIn 0.8s ease forwards';
    } else if (element.classList.contains('quote-card')) {
        element.style.animation = 'fadeInScale 1s ease forwards';
    }
}

// Interactive Elements
function initializeInteractiveElements() {
    // Song cards interaction
    const songCards = document.querySelectorAll('.song-card');
    songCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(255, 0, 0, 0.3)';
            
            // Animate wave bars
            const waveBars = this.querySelectorAll('.wave-bar');
            waveBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animation = 'waveAnimation 0.5s ease forwards';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Platform buttons
    const platformBtns = document.querySelectorAll('.platform-btn');
    platformBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const platform = this.getAttribute('data-platform');
            const songCard = this.closest('.song-card');
            const songTitle = songCard.querySelector('.song-title').textContent;
            const songArtist = songCard.querySelector('.song-artist').textContent;
            
            // Create ripple effect
            createRipple(this, e);
            
            // Show notification
            showNotification(`🎵 Abriendo "${songTitle}" por ${songArtist} en ${platform.toUpperCase()}`, 'info');
            
            // Update floating player
            updateFloatingPlayer(songTitle, songArtist);
        });
    });
    
    // Artist social buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.getAttribute('data-platform');
            createRipple(this, e);
            showNotification(`🔗 Abriendo perfil de Huan62 en ${platform.toUpperCase()}`, 'info');
        });
    });
    
    // Play buttons
    const playBtns = document.querySelectorAll('.song-play-btn');
    playBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            this.style.background = 'linear-gradient(45deg, #cc0000, #ff0000)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.background = 'linear-gradient(45deg, #ff0000, #cc0000)';
            }, 200);
            
            // Toggle play/pause icon
            const icon = this.querySelector('svg path');
            if (icon.getAttribute('d') === 'M8 5v14l11-7z') {
                // Change to pause icon
                icon.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
            } else {
                // Change to play icon
                icon.setAttribute('d', 'M8 5v14l11-7z');
            }
        });
    });
}

// Music Player
function initializeMusicPlayer() {
    const playerBtns = document.querySelectorAll('.player-btn');
    
    playerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            if (this.classList.contains('play')) {
                togglePlayPause();
            } else if (this.classList.contains('prev')) {
                showNotification('⏮️ Canción anterior', 'info');
            } else if (this.classList.contains('next')) {
                showNotification('⏭️ Siguiente canción', 'info');
            }
        });
    });
}

function togglePlayPause() {
    const playBtn = document.querySelector('.player-btn.play');
    const icon = playBtn.querySelector('svg path');
    
    if (icon.getAttribute('d') === 'M8 5v14l11-7z') {
        // Change to pause
        icon.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
        showNotification('▶️ Reproduciendo...', 'success');
    } else {
        // Change to play
        icon.setAttribute('d', 'M8 5v14l11-7z');
        showNotification('⏸️ Pausado', 'info');
    }
}

function updateFloatingPlayer(title, artist) {
    const playerTrack = document.querySelector('.player-track');
    const playerArtist = document.querySelector('.player-artist');
    
    if (playerTrack && playerArtist) {
        playerTrack.textContent = title;
        playerArtist.textContent = artist;
        
        // Add animation
        const player = document.querySelector('.floating-player');
        player.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            player.style.animation = '';
        }, 500);
    }
}

// Audio Visualizer
function initializeAudioVisualizer() {
    const bars = document.querySelectorAll('.audio-visualizer .bar');
    
    function animateBars() {
        bars.forEach(bar => {
            const height = Math.random() * 40 + 20;
            bar.style.height = `${height}px`;
            
            // Random color variation
            const intensity = Math.random() * 0.3 + 0.7;
            bar.style.background = `linear-gradient(to top, 
                rgba(255, 0, 0, ${intensity}), 
                rgba(255, 68, 68, ${intensity * 0.8})
            )`;
        });
    }
    
    // Animate bars continuously
    setInterval(animateBars, 200);
}

// Glitch Effects
function initializeGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'glitch 0.3s ease';
            }, 50);
        }, 3000 + Math.random() * 2000);
    });
}

// Utility Functions
function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 100;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: 'linear-gradient(45deg, #00ff00, #00cc00)',
        info: 'linear-gradient(45deg, #ff0000, #cc0000)',
        warning: 'linear-gradient(45deg, #ffaa00, #ff8800)',
        error: 'linear-gradient(45deg, #ff0000, #cc0000)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add additional CSS animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
`;
document.head.appendChild(additionalStyles);

// Enhanced keyboard controls
document.addEventListener('keydown', function(e) {
    // Space bar to play/pause
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        togglePlayPause();
    }
    
    // Arrow keys for navigation
    if (e.code === 'ArrowLeft') {
        showNotification('⏮️ Canción anterior', 'info');
    } else if (e.code === 'ArrowRight') {
        showNotification('⏭️ Siguiente canción', 'info');
    }
});

// Console Easter Egg
console.log(`
🎵 ============================================ 🎵
    TRAP DOMINICANO - PÁGINA INTERACTIVA
    
    Artista Favorito: Huan62
    Género: Trap RD
    Edad: 19 años
    
    Canciones Top:
    1. Chiquita - Huan62
    2. KTEDE - LilNaay  
    3. Lipo - Luis Brown
    
    Filosofía: "TWTD los niños no hablan"
    
    ¡Disfruta la experiencia musical! 🎧
🎵 ============================================ 🎵
`);

// Performance optimization
window.addEventListener('load', function() {
    // Lazy load images and optimize performance
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
});

// Touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Swipe detection
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50) {
            // Swipe right
            showNotification('⏮️ Canción anterior', 'info');
        } else if (deltaX < -50) {
            // Swipe left
            showNotification('⏭️ Siguiente canción', 'info');
        }
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}