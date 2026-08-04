/* ==========================================================================
   Goluguri Venkata Nagi Reddy - Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     1. Theme Switcher (Dark / Light)
     -------------------------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Retrieve stored theme or default to dark
  const storedTheme = localStorage.getItem('gvnr_portfolio_theme') || 'dark';
  htmlElement.setAttribute('data-theme', storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('gvnr_portfolio_theme', newTheme);
    });
  }

  /* --------------------------------------------------------------------------
     2. Sticky Navigation Bar & Active Link Observer
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Scroll Back to Top Button visibility
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'all';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }
  });

  // Intersection Observer for Active Section Highlighting
  const sectionObserverOptions = {
    threshold: 0.3
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, sectionObserverOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* --------------------------------------------------------------------------
     3. Mobile Navigation Menu Toggle
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Hero Section Typewriter Text Effect
     -------------------------------------------------------------------------- */
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const roles = [
      'Electronics & Communication Engineer',
      'VLSI & Hardware Description Developer',
      'AI/ML Predictive Modeling Specialist',
      'Software Engineer Aspirant'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at full word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  /* --------------------------------------------------------------------------
     5. Hero Section Canvas - Dynamic VLSI Signal & Neural Matrix Simulation
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let step = 0;

    function drawSignalWave() {
      ctx.clearRect(0, 0, width, height);

      // Draw Grid Background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw VLSI Digital Clock Pulse (Digital Signal 1)
      ctx.beginPath();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#3b82f6';
      ctx.shadowBlur = 8;

      const yBase1 = 70;
      const pulseWidth = 30;
      const amplitude = 35;
      ctx.moveTo(0, yBase1);

      for (let x = 0; x < width; x += 10) {
        const adjustedX = (x + step * 2) % (pulseWidth * 2);
        const y = adjustedX < pulseWidth ? yBase1 - amplitude : yBase1;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Sine Wave (Analog/DSP Waveform)
      ctx.beginPath();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;
      const yBase2 = 150;

      for (let x = 0; x < width; x++) {
        const y = yBase2 + Math.sin((x + step * 3) * 0.04) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Neural Network Network Nodes & Connections
      const nodes = [
        { x: 50, y: 220 }, { x: 120, y: 240 }, { x: 190, y: 210 },
        { x: 260, y: 235 }, { x: 330, y: 215 }
      ];

      ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 0;

      for (let i = 0; i < nodes.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
        ctx.stroke();
      }

      nodes.forEach((node, idx) => {
        const pulseFactor = Math.sin(step * 0.1 + idx) * 3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5 + pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = idx % 2 === 0 ? '#8b5cf6' : '#10b981';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.fill();
      });

      step++;
      requestAnimationFrame(drawSignalWave);
    }

    drawSignalWave();
  }

  /* --------------------------------------------------------------------------
     6. Projects Filter Tabs
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     7. Resume PDF Viewer Modal
     -------------------------------------------------------------------------- */
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');

  function openResume() {
    if (resumeModal) resumeModal.classList.add('active');
  }

  function closeResume() {
    if (resumeModal) resumeModal.classList.remove('active');
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  /* --------------------------------------------------------------------------
     8. Verilog FSM Traffic Light Simulator Modal
     -------------------------------------------------------------------------- */
  const fsmModal = document.getElementById('fsmModal');
  const openFsmBtns = document.querySelectorAll('.open-fsm-modal');
  const closeFsmBtn = document.getElementById('closeFsmBtn');
  const toggleFsmAuto = document.getElementById('toggleFsmAuto');
  const stepFsm = document.getElementById('stepFsm');

  // Traffic Light LED elements
  const nsRed = document.getElementById('nsRed');
  const nsYellow = document.getElementById('nsYellow');
  const nsGreen = document.getElementById('nsGreen');
  const ewRed = document.getElementById('ewRed');
  const ewYellow = document.getElementById('ewYellow');
  const ewGreen = document.getElementById('ewGreen');

  const clkCount = document.getElementById('clkCount');
  const stateBadge = document.getElementById('stateBadge');

  const codeS0 = document.getElementById('codeS0');
  const codeS1 = document.getElementById('codeS1');
  const codeS2 = document.getElementById('codeS2');
  const codeS3 = document.getElementById('codeS3');

  let currentState = 0; // 0: S0_NS_GREEN, 1: S1_NS_YELLOW, 2: S2_EW_GREEN, 3: S3_EW_YELLOW
  let clockTime = 0;
  let autoTimer = null;

  const fsmStates = [
    { name: 'S0 (NS GREEN / EW RED)', timerMax: 5, ns: 'green', ew: 'red', codeEl: codeS0 },
    { name: 'S1 (NS YELLOW / EW RED)', timerMax: 2, ns: 'yellow', ew: 'red', codeEl: codeS1 },
    { name: 'S2 (NS RED / EW GREEN)', timerMax: 5, ns: 'red', ew: 'green', codeEl: codeS2 },
    { name: 'S3 (NS RED / EW YELLOW)', timerMax: 2, ns: 'red', ew: 'yellow', codeEl: codeS3 }
  ];

  function updateFsmUI() {
    const stateObj = fsmStates[currentState];

    // Reset Lights
    [nsRed, nsYellow, nsGreen, ewRed, ewYellow, ewGreen].forEach(el => {
      if (el) el.classList.remove('active');
    });

    if (stateObj.ns === 'green' && nsGreen) nsGreen.classList.add('active');
    if (stateObj.ns === 'yellow' && nsYellow) nsYellow.classList.add('active');
    if (stateObj.ns === 'red' && nsRed) nsRed.classList.add('active');

    if (stateObj.ew === 'green' && ewGreen) ewGreen.classList.add('active');
    if (stateObj.ew === 'yellow' && ewYellow) ewYellow.classList.add('active');
    if (stateObj.ew === 'red' && ewRed) ewRed.classList.add('active');

    if (clkCount) clkCount.textContent = `${clockTime}s`;
    if (stateBadge) stateBadge.textContent = `STATE: ${stateObj.name}`;

    // Highlight code lines
    [codeS0, codeS1, codeS2, codeS3].forEach(line => {
      if (line) line.classList.remove('active');
    });
    if (stateObj.codeEl) stateObj.codeEl.classList.add('active');
  }

  function tickFsm() {
    clockTime++;
    const stateObj = fsmStates[currentState];
    if (clockTime >= stateObj.timerMax) {
      clockTime = 0;
      currentState = (currentState + 1) % fsmStates.length;
    }
    updateFsmUI();
  }

  openFsmBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (fsmModal) fsmModal.classList.add('active');
      currentState = 0;
      clockTime = 0;
      updateFsmUI();
    });
  });

  if (closeFsmBtn) {
    closeFsmBtn.addEventListener('click', () => {
      if (fsmModal) fsmModal.classList.remove('active');
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
        if (toggleFsmAuto) toggleFsmAuto.innerHTML = '<i data-lucide="play"></i> Auto Clock';
      }
    });
  }

  if (stepFsm) {
    stepFsm.addEventListener('click', () => {
      tickFsm();
    });
  }

  if (toggleFsmAuto) {
    toggleFsmAuto.addEventListener('click', () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
        toggleFsmAuto.innerHTML = '<i data-lucide="play"></i> Auto Clock';
      } else {
        autoTimer = setInterval(tickFsm, 1000);
        toggleFsmAuto.innerHTML = '<i data-lucide="pause"></i> Pause Clock';
      }
      if (window.lucide) lucide.createIcons();
    });
  }

  /* --------------------------------------------------------------------------
     9. AI/ML Loan Eligibility Predictor Modal
     -------------------------------------------------------------------------- */
  const loanModal = document.getElementById('loanModal');
  const openLoanBtns = document.querySelectorAll('.open-loan-modal');
  const closeLoanBtn = document.getElementById('closeLoanBtn');
  const runMlPredict = document.getElementById('runMlPredict');

  const applicantIncome = document.getElementById('applicantIncome');
  const creditScore = document.getElementById('creditScore');
  const loanAmount = document.getElementById('loanAmount');
  const loanTerm = document.getElementById('loanTerm');

  const resBadge = document.getElementById('resBadge');
  const probNum = document.getElementById('probNum');

  function calculateLoanMl() {
    const income = parseFloat(applicantIncome.value) || 50000;
    const cScore = parseFloat(creditScore.value) || 700;
    const amount = parseFloat(loanAmount.value) || 200000;
    const term = parseFloat(loanTerm.value) || 36;

    // Simulated Classification Decision Engine logic
    let score = 50; // base probability

    // Credit score impact (+/- 35 points)
    score += ((cScore - 600) / 300) * 35;

    // Debt-to-Income ratio impact
    const monthlyPayment = (amount / term) * 1.08;
    const dtiRatio = monthlyPayment / income;

    if (dtiRatio < 0.2) score += 20;
    else if (dtiRatio < 0.4) score += 10;
    else score -= 25;

    // Clamp score between 10% and 98%
    score = Math.min(Math.max(Math.round(score), 10), 98);

    if (probNum) probNum.textContent = `${score}%`;

    if (resBadge) {
      if (score >= 60) {
        resBadge.className = 'result-status-badge approved';
        resBadge.innerHTML = '<i data-lucide="check-circle-2"></i> LOAN APPROVED';
      } else {
        resBadge.className = 'result-status-badge rejected';
        resBadge.innerHTML = '<i data-lucide="alert-triangle"></i> HIGH RISK / MANUAL REVIEW';
      }
      if (window.lucide) lucide.createIcons();
    }
  }

  openLoanBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (loanModal) loanModal.classList.add('active');
      calculateLoanMl();
    });
  });

  if (closeLoanBtn) {
    closeLoanBtn.addEventListener('click', () => {
      if (loanModal) loanModal.classList.remove('active');
    });
  }

  if (runMlPredict) {
    runMlPredict.addEventListener('click', calculateLoanMl);
  }

  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        if (autoTimer) {
          clearInterval(autoTimer);
          autoTimer = null;
        }
      }
    });
  });

  // ESC key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }
  });

  /* --------------------------------------------------------------------------
     10. Contact Form Validation & Toast Notification
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(message) {
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 4000);
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');
      const submitBtn = document.getElementById('submitBtn');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('error');
        isValid = false;
      } else {
        nameInput.closest('.form-group').classList.remove('error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('error');
        isValid = false;
      } else {
        emailInput.closest('.form-group').classList.remove('error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.closest('.form-group').classList.add('error');
        isValid = false;
      } else {
        messageInput.closest('.form-group').classList.remove('error');
      }

      if (isValid) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Sending...';
        if (window.lucide) lucide.createIcons();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i data-lucide="send"></i> Send Message';
          if (window.lucide) lucide.createIcons();

          contactForm.reset();
          showToast('Thank you! Your message has been sent successfully.');
        }, 1200);
      }
    });
  }

  /* --------------------------------------------------------------------------
     11. Back to Top Button
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
