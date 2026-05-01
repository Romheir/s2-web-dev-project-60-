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

// --- 4. UNIVERSAL CINEMATIC CROSSFADE ENGINE ---
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

// --- 5. INITIALIZE THE CROSSFADES FOR ALL PAGES ---
document.addEventListener('DOMContentLoaded', () => {
    initColorShift(); 
    
    document.addEventListener('mousemove', (e) => {
        const amount = 20; 
        const x = (e.clientX / window.innerWidth - 0.5) * amount;
        const y = (e.clientY / window.innerHeight - 0.5) * amount;
        const masks = document.querySelectorAll('.scuba-mask-wrapper, .music-mask-wrapper, .badminton-mask-wrapper');
        masks.forEach(mask => {
            mask.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 1. Home Page Hero Fade (NOW A PORTFOLIO MIX!)
    setupCrossfade([
        'scubavideos/VideoEditor_DSCF3074.mp4',             // 1. Scuba Diving
        'musicvideos/VideoEditor_20231012_201704.mp4',      // 2. Music (Drums)
        'badmintonvideos/IMG_8233.mp4',                     // 3. Badminton
        'scubavideos/VideoEditor_VID_20230525_155442_00_079.mp4' // 4. Boracay Adventure
    ], 'hero-bg-vid');

    // 2. Scuba Page Fade
    setupCrossfade([
        'scubavideos/VideoEditor_DSCF3074.mp4',
        'scubavideos/VideoEditor_DSCF3075.mp4',
        'scubavideos/VideoEditor_DSCF3072.mp4',
        'scubavideos/VideoEditor_DSCF3112.mp4'
    ], 'scuba-blur-vid', 'scuba-clear-vid');

    // 3. Music Page Fade
    setupCrossfade([
        'musicvideos/VideoEditor_IMG_2123.mp4',
        'musicvideos/VideoEditor_20231012_201704.mp4',
        'musicvideos/IMG_2046 (online-video-cutter.com).mp4'
    ], 'music-blur-vid', 'music-clear-vid');

    // 4. Badminton Page Fade
    setupCrossfade([
        'badmintonvideos/IMG_8233.mp4',
        'badmintonvideos/IMG_4253.mp4',
        'badmintonvideos/IMG_4256.mp4',
        'badmintonvideos/VideoEditor_IMG_8436 (1).mp4'
    ], 'badminton-blur-vid', 'badminton-clear-vid');
});