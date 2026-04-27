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

// --- 2. INTERSECTION OBSERVER ---
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
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + (window.innerHeight * 0.7);
        
        if (musicSection && scrollPosition >= musicSection.offsetTop) {
            body.className = 'in-music'; 
        } else if (scubaSection && scrollPosition >= scubaSection.offsetTop) {
            body.className = 'in-ocean'; 
        } else {
            body.className = ''; 
        }
    });
};

// --- 4. HERO BACKGROUND CYCLER ---
const bgVideoElement = document.getElementById('hero-bg-video');
if (bgVideoElement) {
    const heroVideoSources = [
        'scubavideos/VideoEditor_DSCF3074.mp4', 
        'videos/drumming.mp4',      
        'videos/guitar.mp4',        
        'videos/singing.mp4'
    ];
    let heroIdx = 0;

    function cycleHeroVideo() {
        bgVideoElement.style.opacity = 0;
        setTimeout(() => {
            bgVideoElement.src = heroVideoSources[heroIdx];
            bgVideoElement.load();
            bgVideoElement.style.opacity = 1;
            heroIdx = (heroIdx + 1) % heroVideoSources.length;
        }, 1000); 
    }
    cycleHeroVideo(); 
    setInterval(cycleHeroVideo, 5000); 
}

// --- 5. MUSIC DUAL-SYNC MASK CYCLER ---
const mBlurVid = document.getElementById('music-blur-vid');
const mClearVid = document.getElementById('music-clear-vid');

if (mBlurVid && mClearVid) {
    // REMOVED the portrait video from the background cycle
    const musicSources = [
        'musicvideos/VideoEditor_20231012_201704.mp4',
        'musicvideos/VideoEditor_20251012_231226.mp4',
        'musicvideos/IMG_2046 (online-video-cutter.com).mp4'
    ];
    
    // Starts at index 1 because the HTML already plays index 0 natively
    let musicIdx = 1;

    function cycleMusicEffect() {
        mBlurVid.style.opacity = 0.1;
        mClearVid.style.opacity = 0.1;

        setTimeout(() => {
            const nextPath = musicSources[musicIdx];
            mBlurVid.src = nextPath;
            mClearVid.src = nextPath;

            mBlurVid.load();
            mClearVid.load();
            
            setTimeout(() => {
                mBlurVid.play();
                mClearVid.play();
                mBlurVid.style.opacity = 1;
                mClearVid.style.opacity = 1;
            }, 200);

            musicIdx = (musicIdx + 1) % musicSources.length;
        }, 800); 
    }
    setInterval(cycleMusicEffect, 6000); 
}

// --- 6. PARALLAX MOUSE EFFECT ---
const handleMouseMove = (e) => {
    const amount = 20; 
    const x = (e.clientX / window.innerWidth - 0.5) * amount;
    const y = (e.clientY / window.innerHeight - 0.5) * amount;
    
    const masks = document.querySelectorAll('.scuba-mask-wrapper, .music-mask-wrapper');
    masks.forEach(mask => {
        mask.style.transform = `translate(${x}px, ${y}px)`;
    });
};

// --- 7. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initColorShift(); 
    document.addEventListener('mousemove', handleMouseMove);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});