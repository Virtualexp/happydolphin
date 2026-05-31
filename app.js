// Audio elements
const seaSound = new Audio('underwatersound.mp3');
seaSound.loop = true;
seaSound.volume = 0.4;

// --- AUDIO TOGGLE LOGIC ---
const audioToggleBtn = document.getElementById('audio-toggle');
let isAudioPlaying = false;

if (audioToggleBtn) {
  const iconMuted = audioToggleBtn.querySelector('.icon-muted');
  const iconPlaying = audioToggleBtn.querySelector('.icon-playing');

  audioToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isAudioPlaying) {
      seaSound.pause();
      if(iconMuted) iconMuted.style.display = 'block';
      if(iconPlaying) iconPlaying.style.display = 'none';
      isAudioPlaying = false;
    } else {
      seaSound.play().catch(e => console.log("Audio play failed:", e));
      if(iconMuted) iconMuted.style.display = 'none';
      if(iconPlaying) iconPlaying.style.display = 'block';
      isAudioPlaying = true;
    }
  });
}

// --- EVENT LISTENERS ---

// Hero buttons
document.getElementById('btn-start').addEventListener('click', (e) => {
  e.stopPropagation();
  window.location.href = 'trial.html';
});

document.getElementById('btn-docs').addEventListener('click', (e) => {
  e.stopPropagation();
  window.location.href = 'whitepaper.html';
});

// Nav items - Runaway Joke
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('mouseover', (e) => {
    const moveX = (Math.random() - 0.5) * 200;
    const moveY = (Math.random() - 0.5) * 100;
    
    item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    item.style.color = '#00f2fe';
    
    setTimeout(() => {
      item.style.color = '';
    }, 500);
  });
});

// Main Image click easter egg
document.getElementById('main-dolphin').addEventListener('click', (e) => {
  e.stopPropagation();
  const img = e.target;
  img.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  img.style.transform = "scale(0.9) rotate(5deg)";
  setTimeout(() => {
    img.style.transform = "scale(1) rotate(0deg)";
  }, 500);
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const item = btn.closest('.faq-item');
    
    // Close others
    document.querySelectorAll('.faq-item').forEach(other => {
      if(other !== item) other.classList.remove('active');
    });
    
    item.classList.toggle('active');
  });
});

// --- SCROLL REVEAL ANIMATIONS ---
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  rootMargin: '0px 0px -50px 0px',
  threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));

// --- MOBILE MENU LOGIC ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileItems = document.querySelectorAll('.mobile-item');

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    // Prevent background scrolling when menu is open
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Bottom Sticky CTA logic
const btnMobileStart = document.getElementById('btn-mobile-start');
if (btnMobileStart) {
  btnMobileStart.addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.href = 'trial.html';
  });
}
