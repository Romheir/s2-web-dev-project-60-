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
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + (window.innerHeight * 0.7);
        
        if (badmintonSection && scrollPosition >= badmintonSection.offsetTop) {
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

// --- 4. HERO BACKGROUND CYCLER ---
const bgVideoElement = document.getElementById('hero-bg-video');
if (bgVideoElement) {
    const heroVideoSources = [
        'scubavideos/VideoEditor_DSCF3074.mp4', 
        'videos/drumming.mp4',      
        'videos/guitar.mp4',        
        'videos/singing.mp4'
    ];
    let heroIdx = 1;

    function cycleHeroVideo() {
        bgVideoElement.src = heroVideoSources[heroIdx];
        bgVideoElement.load();
        bgVideoElement.play();
        heroIdx = (heroIdx + 1) % heroVideoSources.length;
    }
    setInterval(cycleHeroVideo, 6000); 
}

// --- 5. SCUBA DUAL-SYNC MASK CYCLER ---
const sBlurVid = document.getElementById('scuba-blur-vid');
const sClearVid = document.getElementById('scuba-clear-vid');

if (sBlurVid && sClearVid) {
    const scubaSources = [
        'scubavideos/VideoEditor_DSCF3074.mp4',
        'scubavideos/VideoEditor_DSCF3075.mp4',
        'scubavideos/VideoEditor_DSCF3072.mp4',
        'scubavideos/VideoEditor_DSCF3112.mp4'
    ];
    let scubaIdx = 1; 

    function cycleScubaEffect() {
        sBlurVid.src = scubaSources[scubaIdx];
        sClearVid.src = scubaSources[scubaIdx];
        
        sBlurVid.load();
        sClearVid.load();
        sBlurVid.play();
        sClearVid.play();

        scubaIdx = (scubaIdx + 1) % scubaSources.length;
    }
    setInterval(cycleScubaEffect, 6000); 
}

// --- 6. MUSIC DUAL-SYNC MASK CYCLER ---
const mBlurVid = document.getElementById('music-blur-vid');
const mClearVid = document.getElementById('music-clear-vid');

if (mBlurVid && mClearVid) {
    const musicSources = [
        'musicvideos/VideoEditor_IMG_2123.mp4',
        'musicvideos/VideoEditor_20231012_201704.mp4',
        'musicvideos/IMG_2046 (online-video-cutter.com).mp4'
    ];
    let musicIdx = 1; 

    function cycleMusicEffect() {
        mBlurVid.src = musicSources[musicIdx];
        mClearVid.src = musicSources[musicIdx];

        mBlurVid.load();
        mClearVid.load();
        mBlurVid.play();
        mClearVid.play();

        musicIdx = (musicIdx + 1) % musicSources.length;
    }
    setInterval(cycleMusicEffect, 6000); 
}

// --- 7. BADMINTON DUAL-SYNC MASK CYCLER ---
const bBlurVid = document.getElementById('badminton-blur-vid');
const bClearVid = document.getElementById('badminton-clear-vid');

if (bBlurVid && bClearVid) {
    const badmintonSources = [
        'badmintonvideos/IMG_8233.mp4',
        'badmintonvideos/IMG_8432.mp4',
        'badmintonvideos/IMG_2941.mp4',
        'badmintonvideos/IMG_8436.mp4'
    ];
    let badmintonIdx = 1; 

    function cycleBadmintonEffect() {
        bBlurVid.src = badmintonSources[badmintonIdx];
        bClearVid.src = badmintonSources[badmintonIdx];

        bBlurVid.load();
        bClearVid.load();
        bBlurVid.play();
        bClearVid.play();

        badmintonIdx = (badmintonIdx + 1) % badmintonSources.length;
    }
    setInterval(cycleBadmintonEffect, 6000); 
}

// --- 8. PARALLAX MOUSE EFFECT ---
const handleMouseMove = (e) => {
    const amount = 20; 
    const x = (e.clientX / window.innerWidth - 0.5) * amount;
    const y = (e.clientY / window.innerHeight - 0.5) * amount;
    
    // Grabs all 3 wrappers and applies the depth shift
    const masks = document.querySelectorAll('.scuba-mask-wrapper, .music-mask-wrapper, .badminton-mask-wrapper');
    masks.forEach(mask => {
        mask.style.transform = `translate(${x}px, ${y}px)`;
    });
};

// --- 9. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initColorShift(); 
    document.addEventListener('mousemove', handleMouseMove);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});