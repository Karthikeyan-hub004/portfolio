// Contact Section Advanced Animations and Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for contact animations
    const contactObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-visible');
                
                // Special handling for contact cards staggered animation
                if (entry.target.classList.contains('contact-info-grid')) {
                    animateContactCards();
                }
                
                // Special handling for social links staggered animation
                if (entry.target.classList.contains('social-links-container')) {
                    animateSocialLinks();
                }
            }
        });
    }, contactObserverOptions);

    // Observe contact animated elements
    const contactAnimatedElements = document.querySelectorAll([
        '.animate-contact-header',
        '.animate-social-links', 
        '.animate-contact-info',
        '.animate-cta'
    ].join(','));

    contactAnimatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        contactObserver.observe(el);
    });

    // Staggered animation for contact cards
    function animateContactCards() {
        const cards = document.querySelectorAll('.contact-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = `
                    animate-contact-info 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both,
                    card-entrance 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both
                `;
            }, index * 200);
        });
    }

    // Staggered animation for social links
    function animateSocialLinks() {
        const links = document.querySelectorAll('.social-link');
        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.animation = `
                    animate-social-links 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both,
                    social-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both
                `;
            }, index * 150);
        });
    }

    // Enhanced social link interactions
    function enhanceSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            // Magnetic effect
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                link.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-8px) scale(1.02)`;
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
            });

            // Click ripple effect
            link.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
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
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: social-ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 10;
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

    // Contact card hover effects
    function enhanceContactCards() {
        const cards = document.querySelectorAll('.contact-card');
        
        cards.forEach(card => {
            // 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateY(-5px)
                    scale(1.02)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });

            // Glowing border animation
            card.addEventListener('mouseenter', () => {
                card.style.boxShadow = `
                    0 0 30px rgba(74, 144, 226, 0.3),
                    0 20px 40px rgba(74, 144, 226, 0.2),
                    inset 0 0 0 1px rgba(74, 144, 226, 0.2)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '';
            });
        });
    }

    // CTA button advanced effects
    function enhanceCTAButton() {
        const ctaButton = document.querySelector('.cta-button');
        if (!ctaButton) return;

        // Pulse effect on scroll into view
        const pulseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ctaButton.style.animation = `
                        animate-cta 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both,
                        cta-pulse 2s ease-in-out infinite 1.5s
                    `;
                }
            });
        }, { threshold: 0.5 });

        pulseObserver.observe(ctaButton);

        // Magnetic effect
        ctaButton.addEventListener('mousemove', (e) => {
            const rect = ctaButton.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            ctaButton.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-3px) scale(1.02)`;
        });

        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = '';
        });
    }

    // Parallax effect for contact particles
    function addContactParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const particles = document.querySelectorAll('.particle');
            
            particles.forEach((particle, index) => {
                const speed = 0.05 + (index * 0.02);
                const yPos = -(scrolled * speed);
                particle.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Contact links enhanced interactions
    function enhanceContactLinks() {
        const contactLinks = document.querySelectorAll('.contact-link');
        
        contactLinks.forEach(link => {
            // Typing effect on hover (for email)
            if (link.href && link.href.includes('mailto:')) {
                link.addEventListener('mouseenter', () => {
                    link.style.animation = 'contact-link-glow 1s ease-in-out infinite alternate';
                });

                link.addEventListener('mouseleave', () => {
                    link.style.animation = '';
                });
            }

            // Phone number formatting animation
            if (link.href && link.href.includes('tel:')) {
                link.addEventListener('mouseenter', () => {
                    link.style.letterSpacing = '1px';
                    link.style.transition = 'letter-spacing 0.3s ease';
                });

                link.addEventListener('mouseleave', () => {
                    link.style.letterSpacing = '';
                });
            }
        });
    }

    // Add CSS animations dynamically
    const contactAnimationCSS = `
        @keyframes card-entrance {
            0% {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes social-bounce {
            0% {
                transform: scale(0.3) rotate(-180deg);
            }
            50% {
                transform: scale(1.1) rotate(-90deg);
            }
            100% {
                transform: scale(1) rotate(0deg);
            }
        }

        @keyframes social-ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }

        @keyframes cta-pulse {
            0%, 100% {
                box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
            }
            50% {
                box-shadow: 
                    0 10px 30px rgba(74, 144, 226, 0.5),
                    0 0 50px rgba(74, 144, 226, 0.3);
            }
        }

        @keyframes contact-link-glow {
            0% {
                text-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
            }
            100% {
                text-shadow: 
                    0 0 10px rgba(74, 144, 226, 0.8),
                    0 0 20px rgba(74, 144, 226, 0.6);
            }
        }

        .animate-visible {
            animation-play-state: running !important;
        }
    `;
    
    const contactStyle = document.createElement('style');
    contactStyle.textContent = contactAnimationCSS;
    document.head.appendChild(contactStyle);

    // Initialize all enhancements
    setTimeout(() => {
        enhanceSocialLinks();
        enhanceContactCards();
        enhanceCTAButton();
        addContactParallax();
        enhanceContactLinks();
    }, 100);

    // Email copy to clipboard functionality
    function addEmailCopyFeature() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        
        emailLinks.forEach(emailLink => {
            emailLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                const email = this.href.replace('mailto:', '');
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(email).then(() => {
                        showCopyNotification('Email copied to clipboard!');
                    });
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showCopyNotification('Email copied to clipboard!');
                }
                
                // Still open email client after a delay
                setTimeout(() => {
                    window.location.href = this.href;
                }, 1000);
            });
        });
    }

    // Show copy notification
    function showCopyNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 10000;
            animation: notification-slide 0.3s ease-out;
            box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'notification-slide 0.3s ease-out reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }

    // Add notification animation CSS
    const notificationCSS = `
        @keyframes notification-slide {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            100% {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = notificationCSS;
    document.head.appendChild(notificationStyle);

    // Initialize email copy feature
    addEmailCopyFeature();
});