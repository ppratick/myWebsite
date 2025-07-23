//
// Pratick Kafley Portfolio Website Main JavaScript
// Handles all visual effects, animations, and interactivity
// Each function and logic block is described for maintainability
//
function createMatrixRain() {
    // Create and configure the canvas for the matrix effect
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-2';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    function resizeCanvas() {
        // Adjust canvas size to window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        // Matrix animation logic
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = `${fontSize}px 'Courier New'`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillStyle = Math.random() > 0.95 ? '#ffffff' : '#00ff88';
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);
}

// Particle class for animated background particles
class Particle {
    constructor(x, y) {
        // Initialize particle properties
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = 1.0;
        this.decay = Math.random() * 0.02 + 0.005;
        this.size = Math.random() * 3 + 1;
        this.color = Math.random() > 0.5 ? '#00ff88' : '#00aaff';
    }
    
    update() {
        // Update particle position and life
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.vy += 0.01;
    }
    
    draw(ctx) {
        // Draw particle with neon glow
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    isDead() {
        // Check if particle should be removed
        return this.life <= 0;
    }
}

// Advanced Particle System for animated background
function createAdvancedParticleSystem() {
    // Create and configure the canvas for the advanced particle system
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    let particles = [];
    let mouse = { x: 0, y: 0 };
    
    function resizeCanvas() {
        // Adjust canvas size to window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse movement spawns particles
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        if (Math.random() > 0.8) {
            particles.push(new Particle(
                mouse.x + (Math.random() - 0.5) * 20,
                mouse.y + (Math.random() - 0.5) * 20
            ));
        }
    });
    
    function animate() {
        // Animate and draw all particles
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles = particles.filter(particle => {
            particle.update();
            particle.draw(ctx);
            return !particle.isDead();
        });
        
        if (Math.random() > 0.95 && particles.length < 100) {
            particles.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Enhanced Cursor Trail Effect
function createEnhancedCursorTrail() {
    // Create and manage cursor trail elements
    const trails = [];
    const maxTrails = 20;
    
    document.addEventListener('mousemove', (e) => {
        // Track mouse position for trail spawning
        trails.push({
            x: e.clientX,
            y: e.clientY,
            life: 1.0
        });
        
        if (trails.length > maxTrails) {
            trails.shift();
        }
        
        trails.forEach((trail, index) => {
            // Update trail life and position
            trail.life -= 0.05;
            
            // Create or reuse trail element
            const trailElement = document.querySelector(`#trail-${index}`) || 
                document.createElement('div');
            trailElement.id = `trail-${index}`;
            trailElement.style.cssText = `
                // Style cursor trail
                position: fixed;
                width: ${trail.life * 10}px;
                height: ${trail.life * 10}px;
                background: radial-gradient(circle, rgba(0, 255, 136, ${trail.life}), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                left: ${trail.x - trail.life * 5}px;
                top: ${trail.y - trail.life * 5}px;
                box-shadow: 0 0 ${trail.life * 20}px rgba(0, 255, 136, ${trail.life * 0.5});
            `;
            
            // Append to body if not already there
            if (!document.body.contains(trailElement)) {
                document.body.appendChild(trailElement);
            }
            
            // Remove trail element if life is over
            if (trail.life <= 0) {
                trailElement.remove();
            }
        });
    });
}

// Navbar link click: smooth scroll and active state
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent default link behavior
        e.preventDefault();
        // Remove active class from all links
        document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
        // Add active class to the clicked link
        this.classList.add('active');
        
        // Get the target section to scroll to
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Update navbar active state on scroll
function updateActiveNavbar() {
    // Determine the current active section based on scroll position
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset + 150;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Set current section to 'contact' if near the bottom of the page
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 100) {
        currentSection = 'contact';
    }
    
    // Update active navbar links based on current section
    if (currentSection) {
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
}

// Throttle scroll event for navbar update
let scrollTimeout;
window.addEventListener('scroll', () => {
    // Clear any pending updates to prevent multiple calls
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    // Set a new timeout to update the navbar after a short delay
    scrollTimeout = setTimeout(updateActiveNavbar, 10);
});

// Typing animation for intro text
function typeWriter() {
    // Animate text character by character
    const text = "Hello, I'm Pratick, a Computer Science student at Carnegie Mellon University";
    const introElement = document.querySelector('.intro-text h1');
    if (!introElement) return;
    
    introElement.innerHTML = '';
    let i = 0;
    
    function typing() {
        if (i < text.length) {
            introElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 50);
        } else {
            // Add a blinking cursor at the end of the text
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            cursor.style.color = '#00ff88';
            cursor.style.textShadow = '0 0 10px #00ff88';
            introElement.appendChild(cursor);
        }
    }
    
    // Start typing after a delay
    setTimeout(typing, 1000);
}

// Enhance navbar blur on scroll
function enhanceNavbar() {
    // Add a blur effect to the header when scrolling
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Calculate blur amount based on scroll position
        const blurAmount = Math.min(currentScrollY / 100 * 20, 20);
        header.style.backdropFilter = `blur(${blurAmount}px) saturate(180%)`;
    });
}

// Start all main animations and effects
function startMainAnimations() {
    // Delay the start of animations to allow intro text to type
    setTimeout(() => {
        typeWriter();
        createMatrixRain();
        createAdvancedParticleSystem();
        createEnhancedCursorTrail();
        enhanceNavbar();
        
        // Add keyframe animations for cursor blinking
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            
            // Animate sections with a slight delay
            section {
                animation-delay: ${Math.random() * 0.5}s;
            }
        `;
        document.head.appendChild(style);
    }, 2000);
}

// On window load, initialize everything
window.addEventListener('load', () => {
    // Set the active navbar link to 'home' on load
    document.querySelector('nav ul li a[href="#home"]').classList.add('active');
    // Start all main animations and effects
    startMainAnimations();
    // Update navbar active state on load
    updateActiveNavbar();
});

// Contact form submission using EmailJS
document.querySelector('#contact-form').addEventListener('submit', function(event) {
    // Prevent default form submission
    event.preventDefault();

    const serviceID = 'service_zpxoshs';
    const templateID = 'template_9dtkn18';

    const button = this.querySelector('button');
    const originalText = button.innerHTML;
    button.innerHTML = 'TRANSMITTING...';
    button.disabled = true;

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            alert('Message transmitted successfully!');
            button.innerHTML = originalText;
            button.disabled = false;
            this.reset();
        }, (err) => {
            alert('Transmission failed. Please try again.');
            console.error('Error:', err);
            button.innerHTML = originalText;
            button.disabled = false;
        });
});
