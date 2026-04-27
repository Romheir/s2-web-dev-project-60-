// --- 1. TYPEWRITER EFFECT ---
const textElement = document.getElementById('typewriter');
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
    const scubaSection = document.getElementById('scuba');
    const musicSection = document.getElementById('music');
    const body = document.getElementById('main-body');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + (window.innerHeight * 0.7);
        
        const musicTop = musicSection ? musicSection.offsetTop : Infinity;
        const scubaTop = scubaSection ? scubaSection.offsetTop : Infinity;

        if (scrollPosition >= musicTop) {
            body.className = 'in-music'; 
        } else if (scrollPosition >= scubaTop) {
            body.className = 'in-ocean'; 
        } else {
            body.className = '';         
        }
    });
};

// --- 4. HERO BACKGROUND CYCLER ---
const bgVideoElement = document.getElementById('hero-bg-video');
const heroVideoSources = [
    'scubavideos/DSCF3074.mp4', 
    'videos/drumming.mp4',      
    'videos/guitar.mp4',        
    'videos/singing.mp4'
];

let heroIdx = 0;

function cycleHeroVideo() {
    if (!bgVideoElement) return;
    
    bgVideoElement.style.opacity = 0;
    setTimeout(() => {
        bgVideoElement.src = heroVideoSources[heroIdx];
        bgVideoElement.load();
        bgVideoElement.style.opacity = 1;
        heroIdx = (heroIdx + 1) % heroVideoSources.length;
    }, 1000); 
}

// --- 5. FIXED MUSIC DUAL-SYNC MASK CYCLER ---
const mBlurVid = document.getElementById('music-blur-vid');
const mClearVid = document.getElementById('music-clear-vid');

// Updated to match your exact filenames from the gallery
const musicSources = [
    'musicvideos/IMG_2123.mp4',
    'musicvideos/20231012_201704.mp4',
    'musicvideos/20251012_231226.mp4',
    'musicvideos/IMG_2046.mp4'
];

// Start at index 1 because the HTML is already playing index 0
let musicIdx = 1;

function cycleMusicEffect() {
    if (!mBlurVid || !mClearVid) return;

    // Drop to 0.5 for a quick crossfade blink instead of a full blackout
    mBlurVid.style.opacity = 0.5;
    mClearVid.style.opacity = 0.5;

    setTimeout(() => {
        const nextPath = musicSources[musicIdx];
        
        mBlurVid.src = nextPath;
        mClearVid.src = nextPath;

        mBlurVid.load();
        mClearVid.load();
        
        // Force the videos to play immediately to prevent stalling
        mBlurVid.play();
        mClearVid.play();

        mBlurVid.style.opacity = 1;
        mClearVid.style.opacity = 1;

        musicIdx = (musicIdx + 1) % musicSources.length;
    }, 400); // Shorter timeout for a smoother, faster transition
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
    type();
    initColorShift(); 
    document.addEventListener('mousemove', handleMouseMove);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    if (bgVideoElement) {
        cycleHeroVideo(); 
        setInterval(cycleHeroVideo, 5000); 
    }

    if (mBlurVid && mClearVid) {
        // We do NOT fire it immediately here because the HTML is already handling the first video.
        // Just set the interval to take over after 6 seconds.
        setInterval(cycleMusicEffect, 6000); 
    }
});