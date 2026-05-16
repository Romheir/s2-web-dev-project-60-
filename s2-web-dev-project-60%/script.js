// --- 1. TYPEWRITER EFFECT ---
const textElement = document.getElementById('typewriter');
if (textElement) {
    const phrases = ['Cybersecurity Student.', 'Multi-Instrumentalist.', 'Video Editor.', 'Scuba Diver.'];
    let phraseIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < phrases[phraseIndex].length) {
            textElement.textContent += phrases[phraseIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            textElement.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        }
    }
    type(); 
}

// --- 2. INTERSECTION OBSERVER (Scroll Animations) ---
const revealOptions = {
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px" 
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

// --- 3. DYNAMIC BACKGROUND COLOR SHIFT ---
const initColorShift = () => {
    const body = document.getElementById('main-body');
    if (!body) return;

    const scubaSection = document.getElementById('scuba');
    const musicSection = document.getElementById('music');
    const badmintonSection = document.getElementById('badminton');
    const cyberSection = document.getElementById('cyber');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + (window.innerHeight * 0.7);
        
        if (cyberSection && scrollPosition >= cyberSection.offsetTop) {
            body.className = 'in-cyber';
        } else if (badmintonSection && scrollPosition >= badmintonSection.offsetTop) {
            body.className = 'in-badminton';
        } else if (musicSection && scrollPosition >= musicSection.offsetTop) {
            body.className = 'in-music'; 
        } else if (scubaSection && scrollPosition >= scubaSection.offsetTop) {
            body.className = 'in-ocean'; 
        } else {
            body.className = ''; 
        }
    });
};

// --- 4. UNIVERSAL CINEMATIC CROSSFADE ENGINE (VIDEOS) ---
function setupCrossfade(sourcesArray, blurPrefix, clearPrefix = null) {
    const bVid1 = document.getElementById(`${blurPrefix}-1`);
    const bVid2 = document.getElementById(`${blurPrefix}-2`);
    
    if (!bVid1 || !bVid2) return; 

    let cVid1 = null, cVid2 = null;
    if (clearPrefix) {
        cVid1 = document.getElementById(`${clearPrefix}-1`);
        cVid2 = document.getElementById(`${clearPrefix}-2`);
    }

    let currentIdx = 1; 
    let activePlayer = 1; 

    setInterval(() => {
        const nextSource = sourcesArray[currentIdx];

        const hiddenBlur = activePlayer === 1 ? bVid2 : bVid1;
        const visibleBlur = activePlayer === 1 ? bVid1 : bVid2;

        hiddenBlur.src = nextSource;
        hiddenBlur.load();
        hiddenBlur.play().catch(e => console.log("Autoplay blocked:", e));

        let hiddenClear = null, visibleClear = null;
        if (clearPrefix && cVid1 && cVid2) {
            hiddenClear = activePlayer === 1 ? cVid2 : cVid1;
            visibleClear = activePlayer === 1 ? cVid1 : cVid2;
            hiddenClear.src = nextSource;
            hiddenClear.load();
            hiddenClear.play().catch(e => console.log("Autoplay blocked:", e));
        }

        setTimeout(() => {
            visibleBlur.classList.remove('active-vid');
            hiddenBlur.classList.add('active-vid');

            if (clearPrefix && visibleClear && hiddenClear) {
                visibleClear.classList.remove('active-vid');
                hiddenClear.classList.add('active-vid');
            }

            activePlayer = activePlayer === 1 ? 2 : 1;
            currentIdx = (currentIdx + 1) % sourcesArray.length;
        }, 200); 

    }, 6000); 
}

// --- 5. IMAGE CROSSFADE ENGINE (WITH SPEED CONTROL) ---
function setupImageCrossfade(sourcesArray, blurPrefix, clearPrefix = null, speed = 3000) {
    const bImg1 = document.getElementById(`${blurPrefix}-1`);
    const bImg2 = document.getElementById(`${blurPrefix}-2`);
    
    if (!bImg1 || !bImg2) return; 

    let cImg1 = null, cImg2 = null;
    if (clearPrefix) {
        cImg1 = document.getElementById(`${clearPrefix}-1`);
        cImg2 = document.getElementById(`${clearPrefix}-2`);
    }

    let currentIdx = 1; 
    let activePlayer = 1; 

    setInterval(() => {
        const nextSource = sourcesArray[currentIdx];

        const hiddenBlur = activePlayer === 1 ? bImg2 : bImg1;
        const visibleBlur = activePlayer === 1 ? bImg1 : bImg2;

        hiddenBlur.src = nextSource;

        let hiddenClear = null, visibleClear = null;
        if (clearPrefix && cImg1 && cImg2) {
            hiddenClear = activePlayer === 1 ? cImg2 : cImg1;
            visibleClear = activePlayer === 1 ? cImg1 : cImg2;
            hiddenClear.src = nextSource;
        }

        setTimeout(() => {
            visibleBlur.classList.remove('active-vid');
            hiddenBlur.classList.add('active-vid');

            if (clearPrefix && visibleClear && hiddenClear) {
                visibleClear.classList.remove('active-vid');
                hiddenClear.classList.add('active-vid');
            }

            activePlayer = activePlayer === 1 ? 2 : 1;
            currentIdx = (currentIdx + 1) % sourcesArray.length;
        }, 100); 

    }, speed); 
}


// --- 6. INITIALIZE ALL SCRIPTS ON LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    
    initColorShift(); 
    
    document.addEventListener('mousemove', (e) => {
        const amount = 20; 
        const x = (e.clientX / window.innerWidth - 0.5) * amount;
        const y = (e.clientY / window.innerHeight - 0.5) * amount;
        const masks = document.querySelectorAll('.scuba-mask-wrapper, .music-mask-wrapper, .badminton-mask-wrapper, .cyber-mask-wrapper');
        masks.forEach(mask => {
            mask.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Init Video Crossfades for Video pages
    setupCrossfade([
        'scubavideos/VideoEditor_DSCF3074.mp4',
        'musicvideos/VideoEditor_20231012_201704.mp4',
        'badmintonvideos/IMG_8233.mp4',
        'scubavideos/VideoEditor_VID_20230525_155442_00_079.mp4'
    ], 'hero-bg-vid');

    setupCrossfade([
        'scubavideos/VideoEditor_DSCF3074.mp4',
        'scubavideos/VideoEditor_DSCF3075.mp4',
        'scubavideos/VideoEditor_DSCF3072.mp4',
        'scubavideos/VideoEditor_DSCF3112.mp4'
    ], 'scuba-blur-vid', 'scuba-clear-vid');

    setupCrossfade([
        'musicvideos/VideoEditor_IMG_2123.mp4',
        'musicvideos/VideoEditor_20231012_201704.mp4',
        'musicvideos/IMG_2046 (online-video-cutter.com).mp4'
    ], 'music-blur-vid', 'music-clear-vid');

    setupCrossfade([
        'badmintonvideos/IMG_8233.mp4',
        'badmintonvideos/IMG_4253.mp4',
        'badmintonvideos/IMG_4256.mp4',
        'badmintonvideos/VideoEditor_IMG_8436 (1).mp4'
    ], 'badminton-blur-vid', 'badminton-clear-vid');

    // Init IMAGE Crossfade for Cyber page cover (FASTER: 3 seconds, No Clear Mask)
    setupImageCrossfade([
        'cyberpictures/WhatsApp Image 2026-05-12 at 10.01.41 PM.jpeg',
        'cyberpictures/Screenshot 2026-05-15 163524.png',
        'cyberpictures/Screenshot 2026-05-15 163558.png',
        'cyberpictures/Screenshot 2026-05-15 163644.png'
    ], 'cyber-hero-img', null, 3000);


    // --- 7. LIGHTBOX FUNCTIONALITY ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const clickableImages = document.querySelectorAll('.image-card img');

    if (lightbox && lightboxImg) {
        clickableImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src; 
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden'; 
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto'; 
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }
});

// --- 8. GEOMETRIC PARTICLE ENGINE (CONTACT PAGE) ---
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() * 1) - 0.5;
            this.speedY = (Math.random() * 1) - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

            // Mouse repulsion
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                this.x -= forceDirectionX * force * 5;
                this.y -= forceDirectionY * force * 5;
            }
        }
        draw() {
            ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const numParticles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance/120})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();
}

// --- 9. FAKE FORM SUBMISSION UX ---
function handleFormSubmit(e) {
    e.preventDefault(); 
    const btn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    
    // Simulate Loading State
    btnText.textContent = "Encrypting...";
    btn.style.opacity = "0.7";
    btn.style.pointerEvents = "none";

    // Simulate Success State after 1.5 seconds
    setTimeout(() => {
        btn.classList.add('success');
        btnText.textContent = "Transmission Successful!";
        btn.style.opacity = "1";
        document.getElementById('contact-form').reset(); // Clears the inputs
    }, 1500);

    // Reset button back to normal after 4 seconds
    setTimeout(() => {
        btn.classList.remove('success');
        btnText.textContent = "Transmit Data";
        btn.style.pointerEvents = "auto";
    }, 4000);
}