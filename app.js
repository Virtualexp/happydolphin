    // Audio elements
    const seaSound = new Audio('underwatersound.mp3');
    seaSound.loop = true;
    seaSound.volume = 0.4;
    
    const dolphinSound = new Audio('dolphinsound.mp3');
    dolphinSound.volume = 0.6;

    let audioInitialized = false;

    // Corporate Jargon Generator
    const jargonList = [
      "Deploying quantum echolocation models...",
      "Optimizing aquatic synergy across edge nodes...",
      "Synergizing decentralized fish frameworks...",
      "Scaling oceanic machine learning pipelines...",
      "Your trial has been initiated in the Marianas Trench.",
      "Error: Insufficient krill detected in the database.",
      "Re-aligning dorsal paradigms...",
      "Executing sonar-based load balancing...",
      "Compiling Web3 underwater assets...",
      "Reticulating hydrodynamic splines..."
    ];

    function showToast(message) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast';
      
      toast.innerHTML = `
        <img src="dolphinmini.png" class="toast-icon" alt="icon">
        <div>${message}</div>
      `;
      
      container.appendChild(toast);
      
      // Trigger reflow to enable transition
      void toast.offsetWidth;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400); // match transition duration
      }, 4000);
    }

    function playSounds() {
      if (!audioInitialized) {
        seaSound.play().catch(e => console.log("Audio play failed:", e));
        audioInitialized = true;
      }
      
      // Play dolphin sound with a slight random pitch/volume for variety
      const clone = dolphinSound.cloneNode();
      clone.volume = 0.5 + Math.random() * 0.2;
      clone.play().catch(e => console.log("Audio play failed:", e));
    }

    function initInteraction() {
      playSounds();
      // Show random jargon
      const randomJargon = jargonList[Math.floor(Math.random() * jargonList.length)];
      showToast(randomJargon);
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

      item.addEventListener('click', (e) => {
        e.stopPropagation();
        initInteraction();
        showToast("Wow, you actually caught it! (Still no page though)");
      });
    });

    // Logo click
    document.getElementById('nav-logo').addEventListener('click', (e) => {
      e.stopPropagation();
      playSounds();
      showToast("Dolphin.corp HQ: Mariana Trench, Level 4.");
    });

    // Main Image click easter egg
    document.getElementById('main-dolphin').addEventListener('click', (e) => {
      e.stopPropagation();
      playSounds();
      showToast("Dolphin core temperature critical. Please feed.");
      
      const img = e.target;
      img.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      img.style.transform = "scale(0.9) rotate(5deg)";
      setTimeout(() => {
        img.style.transform = "scale(1) rotate(0deg)";
      }, 500);
    });

    // Career Apply Button Easter Egg
    document.getElementById('btn-apply').addEventListener('click', (e) => {
      e.stopPropagation();
      playSounds();
      showToast("Application rejected: Human DNA detected.");
    });

    // Pricing buttons easter egg
    document.querySelectorAll('.btn-pricing').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSounds();
        showToast("Error: Insufficient Krill balance. Please deposit more fish.");
      });
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSounds();
        const item = btn.closest('.faq-item');
        
        // Close others
        document.querySelectorAll('.faq-item').forEach(other => {
          if(other !== item) other.classList.remove('active');
        });
        
        item.classList.toggle('active');
      });
    });

    // Clicking anywhere on the glass cards (that aren't buttons)
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if(e.target.tagName.toLowerCase() === 'button' || e.target.closest('button')) return;
        e.stopPropagation();
        initInteraction();
      });
    });

    // Start background audio on first interaction anywhere on the page
    document.body.addEventListener('click', () => {
      if(!audioInitialized) {
        seaSound.play().catch(e => console.log("Audio play failed:", e));
        audioInitialized = true;
      }
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
