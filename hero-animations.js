// Hero Section Advanced Animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll([
        '.animate-slide-in',
        '.animate-fade-up', 
        '.animate-typing',
        '.animate-glow',
        '.animate-fade-in',
        '.animate-bounce-in'
    ].join(','));

    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Enhanced typing animation for greeting
    function createTypingEffect() {
        const greetingElement = document.querySelector('.animate-typing');
        if (!greetingElement) return;

        const originalText = greetingElement.textContent;
        greetingElement.textContent = '';
        greetingElement.style.borderRight = '3px solid var(--primary-color)';
        
        let charIndex = 0;
        const typingSpeed = 100;
        
        function typeCharacter() {
            if (charIndex < originalText.length) {
                greetingElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    greetingElement.style.borderRight = 'none';
                }, 500);
            }
        }
        
        setTimeout(typeCharacter, 500);
    }

    // Particle system for floating shapes
    function enhanceFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            // Add random movement variations
            shape.style.setProperty('--random-x', Math.random() * 100 + 'px');
            shape.style.setProperty('--random-y', Math.random() * 100 + 'px');
            
            // Mouse interaction
            shape.addEventListener('mouseenter', () => {
                shape.style.transform = 'scale(1.2) rotate(45deg)';
                shape.style.opacity = '0.8';
            });
            
            shape.addEventListener('mouseleave', () => {
                shape.style.transform = '';
                shape.style.opacity = '';
            });
        });
    }

    // Profile image 3D tilt effect
    function addProfileTiltEffect() {
        const profileImg = document.querySelector('.profile-img');
        if (!profileImg) return;

        profileImg.addEventListener('mousemove', (e) => {
            const rect = profileImg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            profileImg.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.05)
            `;
        });

        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = '';
        });
    }

    // Parallax effect for background shapes
    function addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Button ripple effect
    function addButtonRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple-effect 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Add CSS for ripple animation
    const rippleCSS = `
        @keyframes ripple-effect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);

    // Text scramble effect for name
    function addTextScrambleEffect() {
        const nameElement = document.querySelector('.name');
        if (!nameElement) return;

        const originalText = nameElement.textContent;
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        function scrambleText() {
            let iteration = 0;
            const interval = setInterval(() => {
                nameElement.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                iteration += 1/3;
                
                if (iteration >= originalText.length) {
                    nameElement.textContent = originalText;
                    clearInterval(interval);
                }
            }, 30);
        }
        
        // Trigger scramble on hover
        nameElement.addEventListener('mouseenter', scrambleText);
    }

    // Initialize all animations
    setTimeout(() => {
        createTypingEffect();
        enhanceFloatingShapes();
        addProfileTiltEffect();
        addParallaxEffect();
        addButtonRippleEffect();
        addTextScrambleEffect();
    }, 100);

    // Add smooth scroll behavior for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});