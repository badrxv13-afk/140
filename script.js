/* ==========================================================================
   11/11 Interactive Experience for Wazna (Studio Ghibli / Howl's Moving Castle)
   Refined Libyan Dialect & Authentic Psychological Attunement
   ========================================================================== */

(() => {
  'use strict';

  // --- 11 Authentic Libyan Messages (Psychological Attunement & Observation) ---
  const STAR_MESSAGES = [
    {
      theme: "طبعك الهادي ✨",
      text: "فيك طبع غريب ومميز.. حتى وإنتِ في قمّة الكسل وما تبي تديري شي، حضورك بروحه يغيّر الجو ويخلّيه أهدى وأحلى."
    },
    {
      theme: "مساحة راحتك 👑",
      text: "النوم والراحة والهدوء متاعك خط أحمر.. يعجبني كيف تاخذي في وقتك عالآخر، والدلال هذا كله لايق عليك يا كتكوتة."
    },
    {
      theme: "عفويتك الحلوة 💫",
      text: "أكثر حاجة تشدّ فيك هي عفويتك لمّا تطلبي الاهتمام.. تطلبيه بطبيعتك وكأنه حقك الرسمي، وبصراحة؟ عندك كل الحق."
    },
    {
      theme: "روحك الخفيفة 🏰",
      text: "لو فيه مكان في الدنيا يشبه سحر (قلعة هاول)، أكيد حيكون الجو اللي تديريه إنتِ بضحكتك وروحك الخفيفة."
    },
    {
      theme: "حتى في الزعل 🐰",
      text: "حتى لمّا تبرّمي وتزعلي وتعاندي شوية.. ما نقدرش ناخذ الموضوع بجدية واجد، لأنك في عزّ زعلك تقعدي قنينة وتنحبّي."
    },
    {
      theme: "تأثير ضحكتك ☀️",
      text: "ابتسامة الأرنوبة لمّا تطلع من القلب في وسط اليوم، كفيلة بأنها تمسح أي تعب وتعدّل المزاج في ثواني."
    },
    {
      theme: "تفاصيل ما تفوتنيش 🔍",
      text: "نركز في تفاصيلك الصغيرة اللي ممكن تحسبي محد ينتبهلها.. طريقتك في الكلام، ردود فعلك، والحاجات البسيطة اللي تفرّحك من غير ما تقوليها."
    },
    {
      theme: "ذوقك الرايق 🍫",
      text: "صاحبة الذوق الحلو في كل شي.. في الوكال، في الحلو، وفي اختيار اللحظات الرايقة اللي ديما ليها طعمة ثانية معاك."
    },
    {
      theme: "مساحة أمان 🌙",
      text: "بعيد على دوشة اليوم وزحمة الدنيا، هدرزتك ووجودك هما المساحة الهادية اللي الواحد يلقى فيها راحته وهدوء باله."
    },
    {
      theme: "قيمتك الحقيقية 💎",
      text: "عشر نجوم ما يكفّوش بيش يوصفوا غلاوتك، بس حبّيت كل نجمة تذكّرك إنك مميزة عندي بطريقة ما تشبهش أي حد."
    },
    {
      theme: "لحظة 11/11 🌠",
      text: "توّا كملوا الـ 11 نجمة.. ارفعي عيونك للسماء، لأن ليلة 11/11 ما تكملش إلا بأمنية صادقة تطلع من قلبك."
    }
  ];

  const ARABIC_ORDINALS = [
    "النجمة الأولى",
    "النجمة الثانية",
    "النجمة الثالثة",
    "النجمة الرابعة",
    "النجمة الخامسة",
    "النجمة السادسة",
    "النجمة السابعة",
    "النجمة الثامنة",
    "النجمة التاسعة",
    "النجمة العاشرة",
    "النجمة الحادية عشرة"
  ];

  // Ascending Ghibli-inspired Celesta / Music Box Scale (11 notes)
  const MUSIC_BOX_SCALE = [
    'G4', 'A4', 'B4', 'D5', 'E5', 'F#5', 'G5', 'A5', 'B5', 'D6', 'G6'
  ];

  // Constellation coordinates (x%, y%) forming a royal celestial crown/heart arc
  const STAR_COORDINATES = [
    { x: 82, y: 76 }, // 1
    { x: 64, y: 84 }, // 2
    { x: 38, y: 82 }, // 3
    { x: 18, y: 72 }, // 4
    { x: 14, y: 50 }, // 5
    { x: 28, y: 34 }, // 6
    { x: 50, y: 44 }, // 7 (center heart/crown jewel)
    { x: 72, y: 34 }, // 8
    { x: 86, y: 48 }, // 9
    { x: 68, y: 18 }, // 10
    { x: 34, y: 16 }  // 11 (zenith star)
  ];

  // --- State ---
  let audioInitialized = false;
  let audioMuted = false;
  let celestaSynth = null;
  let harpSynth = null;

  let gateStep = 0; // 0 -> waiting for 1, 1 -> waiting for 2, 2 -> unlocked
  let discoveredCount = 0;
  const starOrderMap = new Map(); // starElementIndex -> assigned message index (0..10)

  let userWishText = '';
  let isWishPrivate = true; // Default to private for psychological safety & trust
  let selectedGiftTreat = 'شوكولاتة فاخرة على ذوقي 🍫';

  // =========================================================================
  // 1. AUDIO ENGINE (Tone.js Music Box / Celesta & Harp Chimes)
  // =========================================================================
  async function initAudioEngine() {
    if (audioInitialized) return;
    try {
      await Tone.start();

      const reverb = new Tone.Reverb({
        decay: 4.2,
        preDelay: 0.03,
        wet: 0.45
      }).toDestination();

      const delay = new Tone.FeedbackDelay({
        delayTime: '8n.',
        feedback: 0.22,
        wet: 0.2
      }).connect(reverb);

      // Warm Music Box / Celesta FM Synth
      celestaSynth = new Tone.PolySynth(Tone.FMSynth, {
        maxPolyphony: 12,
        volume: -6,
        voice: {
          harmonicity: 3.01,
          modulationIndex: 4.5,
          oscillator: { type: 'sine' },
          envelope: {
            attack: 0.006,
            decay: 1.4,
            sustain: 0.05,
            release: 2.2
          },
          modulation: { type: 'triangle' },
          modulationEnvelope: {
            attack: 0.002,
            decay: 0.45,
            sustain: 0.0,
            release: 0.6
          }
        }
      }).connect(delay);

      // Dreamy Harp / Chime Synth for transitions & wish sending
      harpSynth = new Tone.PolySynth(Tone.Synth, {
        maxPolyphony: 12,
        volume: -9,
        voice: {
          oscillator: { type: 'triangle8' },
          envelope: {
            attack: 0.015,
            decay: 1.8,
            sustain: 0.1,
            release: 2.8
          }
        }
      }).connect(reverb);

      audioInitialized = true;
      updateAudioUI();
    } catch (err) {
      console.warn('Tone.js initialization deferred:', err);
    }
  }

  function playMusicBoxNote(noteIndex) {
    if (audioMuted) return;
    initAudioEngine().then(() => {
      if (!celestaSynth) return;
      const note = MUSIC_BOX_SCALE[noteIndex % MUSIC_BOX_SCALE.length];
      const now = Tone.now();
      celestaSynth.triggerAttackRelease(note, '2n', now, 0.85);

      // Subtle warm fifth/octave grace note on later stars
      if (noteIndex >= 4 && harpSynth) {
        const harmonyNotes = ['B3', 'D4', 'G4', 'A4', 'D5', 'G5'];
        const hNote = harmonyNotes[noteIndex % harmonyNotes.length];
        harpSynth.triggerAttackRelease(hNote, '1n', now + 0.08, 0.35);
      }
    });
  }

  function playMagicalChime(type = 'transition') {
    if (audioMuted) return;
    initAudioEngine().then(() => {
      if (!celestaSynth || !harpSynth) return;
      const now = Tone.now();

      if (type === 'twist') {
        const notes = ['D5', 'F#5', 'A5', 'B5', 'D6'];
        notes.forEach((n, idx) => {
          celestaSynth.triggerAttackRelease(n, '8n', now + idx * 0.075, 0.75);
        });
      } else if (type === 'transition') {
        const notes = ['G4', 'B4', 'D5', 'F#5', 'A5', 'D6'];
        notes.forEach((n, idx) => {
          harpSynth.triggerAttackRelease(n, '2n', now + idx * 0.09, 0.6);
        });
        celestaSynth.triggerAttackRelease('G6', '1n', now + 0.55, 0.7);
      } else if (type === 'wish') {
        const gliss = ['G3', 'B3', 'D4', 'F#4', 'G4', 'B4', 'D5', 'E5', 'F#5', 'G5', 'B5', 'D6', 'G6'];
        gliss.forEach((n, idx) => {
          harpSynth.triggerAttackRelease(n, '1n', now + idx * 0.07, 0.55);
        });
        celestaSynth.triggerAttackRelease(['G5', 'B5', 'D6', 'G6'], '1n', now + 0.95, 0.7);
      } else if (type === 'royal') {
        const fanfare = ['D5', 'F#5', 'A5', 'D6', 'F#6'];
        fanfare.forEach((n, idx) => {
          celestaSynth.triggerAttackRelease(n, '2n', now + idx * 0.1, 0.85);
        });
      }
    });
  }

  function updateAudioUI() {
    const iconEl = document.getElementById('audio-icon');
    const labelEl = document.getElementById('audio-label');
    if (!iconEl || !labelEl) return;
    if (audioMuted) {
      iconEl.textContent = '🔇';
      labelEl.textContent = 'الصوت مكتوم';
    } else {
      iconEl.textContent = '🎵';
      labelEl.textContent = 'صندوق الموسيقى';
    }
  }

  // =========================================================================
  // 2. PARTICLES & INTERACTIVE GOLDEN FAIRY DUST + PARALLAX
  // =========================================================================
  function initAmbientParticles() {
    if (typeof tsParticles === 'undefined') return;
    tsParticles.load('tsparticles', {
      fullScreen: { enable: false },
      fpsLimit: 60,
      particles: {
        number: {
          value: 38,
          density: { enable: true, area: 800 }
        },
        color: {
          value: ['#fef08a', '#fbbf24', '#f59e0b', '#ffffff']
        },
        shape: {
          type: ['circle', 'star']
        },
        opacity: {
          value: { min: 0.15, max: 0.85 },
          animation: {
            enable: true,
            speed: 1.1,
            sync: false
          }
        },
        size: {
          value: { min: 1, max: 3.6 },
          animation: {
            enable: true,
            speed: 2,
            sync: false
          }
        },
        move: {
          enable: true,
          speed: 0.45,
          direction: 'top',
          random: true,
          straight: false,
          outModes: { default: 'out' }
        }
      },
      detectRetina: true
    });
  }

  const dustParticles = [];
  let dustCanvas, dustCtx;

  function initFairyDustCanvas() {
    dustCanvas = document.getElementById('fairy-dust-canvas');
    if (!dustCanvas) return;
    dustCtx = dustCanvas.getContext('2d');

    const resize = () => {
      dustCanvas.width = window.innerWidth;
      dustCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnTrail = (x, y, count = 3) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.6 + 0.3;
        dustParticles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.35,
          size: Math.random() * 3.2 + 1.2,
          alpha: 1,
          decay: Math.random() * 0.022 + 0.015,
          color: Math.random() > 0.3 ? '#fde047' : '#fffbeb'
        });
      }
    };

    window.addEventListener('pointermove', (e) => {
      spawnTrail(e.clientX, e.clientY, 3);
      updateParallax(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('pointerdown', (e) => {
      burstGoldenDust(e.clientX, e.clientY, 18);
    }, { passive: true });

    function renderDust() {
      dustCtx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
      for (let i = dustParticles.length - 1; i >= 0; i--) {
        const p = dustParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          dustParticles.splice(i, 1);
          continue;
        }

        dustCtx.save();
        dustCtx.globalAlpha = Math.max(0, p.alpha);
        dustCtx.fillStyle = p.color;
        dustCtx.shadowColor = '#fbbf24';
        dustCtx.shadowBlur = 8;
        dustCtx.beginPath();
        dustCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        dustCtx.fill();
        dustCtx.restore();
      }
      requestAnimationFrame(renderDust);
    }
    requestAnimationFrame(renderDust);
  }

  function burstGoldenDust(x, y, count = 28, upwardLift = false) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.8 + 0.8;
      dustParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed * (upwardLift ? 0.6 : 1),
        vy: upwardLift ? -(Math.random() * 4.5 + 1.8) : Math.sin(angle) * speed,
        size: Math.random() * 4 + 1.5,
        alpha: 1,
        decay: upwardLift ? (Math.random() * 0.01 + 0.008) : (Math.random() * 0.02 + 0.012),
        color: i % 2 === 0 ? '#fde047' : '#fef9c3'
      });
    }
  }

  function updateParallax(clientX, clientY) {
    const skyLayer = document.getElementById('sky-bg-layer');
    if (!skyLayer) return;
    const normX = (clientX / window.innerWidth - 0.5) * 16;
    const normY = (clientY / window.innerHeight - 0.5) * 16;
    gsap.to(skyLayer, {
      x: -normX,
      y: -normY,
      duration: 1.2,
      ease: 'power2.out'
    });
  }

  // =========================================================================
  // 3. STAGE 1: THE PLAYFUL GATE (بوابة 11/11 الخاصة بيك)
  // =========================================================================
  function initStage1Gate() {
    const grid = document.getElementById('numbers-grid');
    const hint = document.getElementById('gate-status-hint');
    const modal = document.getElementById('ego-bypass-modal');
    const instruction = document.getElementById('gate-instruction');
    const enterBtn = document.getElementById('enter-world-btn');
    const mascot = document.getElementById('mascot-container');

    gsap.to(mascot, {
      y: -7,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    grid.innerHTML = '';
    for (let num = 1; num <= 11; num++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'num-circle-btn';
      btn.dataset.number = String(num);
      btn.textContent = String(num);
      btn.addEventListener('click', () => handleGateNumberClick(num, btn));
      grid.appendChild(btn);
    }

    function handleGateNumberClick(num, btnEl) {
      if (gateStep >= 2) return;

      const rect = btnEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      burstGoldenDust(centerX, centerY, 20);

      initAudioEngine();

      if (gateStep === 0) {
        if (num === 1) {
          gateStep = 1;
          btnEl.classList.add('clicked-num');
          playMusicBoxNote(0);
          gsap.fromTo(btnEl, { scale: 0.85 }, { scale: 1.1, duration: 0.3, ease: 'back.out(2)' });
          hint.textContent = 'تمام بكل.. توّا اضغطي عالرقم (2) ✨';
        } else {
          playMusicBoxNote(0);
          gsap.fromTo(btnEl, { x: -4 }, { x: 4, duration: 0.07, repeat: 3, yoyo: true });
          hint.textContent = 'ابدي بالرقم (1) الأول يا أرنوبة 🐰✨';
        }
      } else if (gateStep === 1) {
        if (num !== 1) {
          gateStep = 2;
          btnEl.classList.add('clicked-num');
          playMusicBoxNote(1);
          triggerEgoBypassTwist();
        }
      }
    }

    function triggerEgoBypassTwist() {
      hint.textContent = 'باهي خلاص، سادّك تعب.. ✨';
      setTimeout(() => playMagicalChime('twist'), 180);

      const allButtons = grid.querySelectorAll('.num-circle-btn');
      const tl = gsap.timeline();

      tl.to(grid, {
        x: -9,
        rotation: -1.5,
        duration: 0.06,
        repeat: 7,
        yoyo: true,
        ease: 'power1.inOut'
      })
      .to(allButtons, {
        scale: 0,
        opacity: 0,
        y: () => (Math.random() - 0.5) * 70,
        x: () => (Math.random() - 0.5) * 70,
        rotation: () => (Math.random() - 0.5) * 90,
        stagger: 0.03,
        duration: 0.55,
        ease: 'back.in(1.8)',
        onStart: () => {
          const gridRect = grid.getBoundingClientRect();
          burstGoldenDust(
            gridRect.left + gridRect.width / 2,
            gridRect.top + gridRect.height / 2,
            45
          );
        },
        onComplete: () => {
          grid.style.display = 'none';
          hint.style.display = 'none';
          gsap.to(instruction, {
            opacity: 0.4,
            scale: 0.96,
            duration: 0.3
          });

          modal.classList.remove('hidden');
          modal.classList.add('flex');
          gsap.fromTo(
            modal,
            { opacity: 0, y: 22, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'elastic.out(1, 0.75)' }
          );
        }
      });
    }

    enterBtn.addEventListener('click', async () => {
      await initAudioEngine();
      playMagicalChime('transition');
      transitionToStage('stage-1', 'stage-2', () => {
        initStage2Constellation();
      });
    });
  }

  // =========================================================================
  // 4. STAGE 2: THE 11 STARS OF ATTUNEMENT (سماء الـ 11 نجمة)
  // =========================================================================
  function initStage2Constellation() {
    const starsContainer = document.getElementById('stars-container');
    const guideLinesGroup = document.getElementById('constellation-guide-lines');
    const activeLinesGroup = document.getElementById('constellation-active-lines');
    const counterText = document.getElementById('star-counter-text');
    const messageCard = document.getElementById('star-message-card');
    const messageText = document.getElementById('star-message-text');
    const cardBadge = document.getElementById('star-card-badge');
    const themeBadge = document.getElementById('star-theme-badge');
    const summonBtn = document.getElementById('summon-meteor-btn');

    starsContainer.innerHTML = '';
    guideLinesGroup.innerHTML = '';
    activeLinesGroup.innerHTML = '';

    for (let i = 0; i < STAR_COORDINATES.length - 1; i++) {
      const p1 = STAR_COORDINATES[i];
      const p2 = STAR_COORDINATES[i + 1];
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', p1.x);
      line.setAttribute('y1', p1.y);
      line.setAttribute('x2', p2.x);
      line.setAttribute('y2', p2.y);
      guideLinesGroup.appendChild(line);
    }

    const starElements = [];

    STAR_COORDINATES.forEach((coord, idx) => {
      const starBtn = document.createElement('button');
      starBtn.type = 'button';
      starBtn.className = 'constellation-star';
      if (idx === 0) starBtn.classList.add('next-hint');
      starBtn.style.left = `${coord.x}%`;
      starBtn.style.top = `${coord.y}%`;
      starBtn.setAttribute('aria-label', `نجمة رقم ${idx + 1}`);

      starBtn.innerHTML = `
        <div class="star-core">
          <svg class="star-svg" viewBox="0 0 24 24">
            <path d="M12 1.5l2.9 6.26 6.85.82-5.05 4.72 1.32 6.75L12 16.67l-6.02 3.38 1.32-6.75L2.25 8.58l6.85-.82L12 1.5z"/>
          </svg>
        </div>
        <span class="star-num-badge">${idx + 1}</span>
      `;

      gsap.fromTo(
        starBtn,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          delay: idx * 0.06,
          ease: 'back.out(1.8)'
        }
      );

      gsap.to(starBtn.querySelector('.star-core'), {
        scale: 1.14,
        duration: 1.4 + (idx % 4) * 0.35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      starBtn.addEventListener('click', () => handleStarClick(idx, starBtn));
      starsContainer.appendChild(starBtn);
      starElements.push(starBtn);
    });

    function handleStarClick(starIdx, starEl) {
      const rect = starEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      burstGoldenDust(centerX, centerY, 32);

      let msgIndex;

      if (starOrderMap.has(starIdx)) {
        msgIndex = starOrderMap.get(starIdx);
      } else {
        msgIndex = discoveredCount;
        starOrderMap.set(starIdx, msgIndex);
        discoveredCount++;

        starEl.classList.add('discovered');
        starEl.classList.remove('next-hint');

        const nextUndiscovered = starElements.find((_, i) => !starOrderMap.has(i));
        starElements.forEach(el => el.classList.remove('next-hint'));
        if (nextUndiscovered) {
          nextUndiscovered.classList.add('next-hint');
        }

        const badgeEl = starEl.querySelector('.star-num-badge');
        if (badgeEl) badgeEl.textContent = `${msgIndex + 1} ✨`;

        gsap.fromTo(
          starEl,
          { scale: 1.6, rotation: -20 },
          { scale: 1.15, rotation: 0, duration: 0.65, ease: 'elastic.out(1.1, 0.5)' }
        );

        if (discoveredCount > 1) {
          const entries = Array.from(starOrderMap.keys());
          const prevStarIdx = entries[entries.length - 2];
          const p1 = STAR_COORDINATES[prevStarIdx];
          const p2 = STAR_COORDINATES[starIdx];

          const activeLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          activeLine.setAttribute('x1', p1.x);
          activeLine.setAttribute('y1', p1.y);
          activeLine.setAttribute('x2', p1.x);
          activeLine.setAttribute('y2', p1.y);
          activeLinesGroup.appendChild(activeLine);

          gsap.to(activeLine, {
            attr: { x2: p2.x, y2: p2.y },
            duration: 0.65,
            ease: 'power2.out'
          });
        }

        counterText.textContent = `(${discoveredCount} / 11 نجمة مضوية)`;
        gsap.fromTo(counterText, { scale: 1.15 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' });
      }

      playMusicBoxNote(msgIndex);

      const starItem = STAR_MESSAGES[msgIndex];
      cardBadge.textContent = `✨ ${ARABIC_ORDINALS[msgIndex]} (${msgIndex + 1}/11)`;
      themeBadge.textContent = starItem.theme;
      messageText.textContent = `"${starItem.text}"`;

      messageCard.classList.remove('pointer-events-none');
      gsap.killTweensOf(messageCard);
      gsap.fromTo(
        messageCard,
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.7)' }
      );

      if (discoveredCount === 11 && summonBtn.classList.contains('hidden')) {
        setTimeout(() => {
          playMagicalChime('transition');
          summonBtn.classList.remove('hidden');
          summonBtn.classList.add('flex');
          gsap.fromTo(
            summonBtn,
            { opacity: 0, y: 24, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'elastic.out(1, 0.75)' }
          );
        }, 550);
      }
    }

    summonBtn.addEventListener('click', () => {
      playMagicalChime('transition');
      transitionToStage('stage-2', 'stage-3', () => {
        initStage3ShootingStar();
      });
    });
  }

  // =========================================================================
  // 5. STAGE 3: THE SHOOTING STAR WISH (مشهد الشهاب والأمنية)
  // =========================================================================
  let meteorAnimId = null;

  function initStage3ShootingStar() {
    document.body.classList.add('dimmed-sky');

    const meteorCanvas = document.getElementById('meteor-canvas');
    const ctx = meteorCanvas.getContext('2d');
    const wishCard = document.getElementById('wish-box-card');
    const sendWishBtn = document.getElementById('send-wish-btn');
    const wishInput = document.getElementById('wish-input');
    const privateBtn = document.getElementById('wish-mode-private');
    const sharedBtn = document.getElementById('wish-mode-shared');

    // Privacy mode toggle handlers (respecting her autonomy)
    function updatePrivacyToggleUI() {
      if (isWishPrivate) {
        privateBtn.className = 'wish-privacy-btn active-privacy-mode py-2.5 px-3 rounded-xl border border-amber-300/70 bg-amber-400/25 text-amber-50 font-bold flex items-center justify-center gap-1.5 transition';
        sharedBtn.className = 'wish-privacy-btn py-2.5 px-3 rounded-xl border border-amber-300/25 bg-slate-950/45 text-amber-200/70 font-medium flex items-center justify-center gap-1.5 transition';
      } else {
        sharedBtn.className = 'wish-privacy-btn active-privacy-mode py-2.5 px-3 rounded-xl border border-amber-300/70 bg-amber-400/25 text-amber-50 font-bold flex items-center justify-center gap-1.5 transition';
        privateBtn.className = 'wish-privacy-btn py-2.5 px-3 rounded-xl border border-amber-300/25 bg-slate-950/45 text-amber-200/70 font-medium flex items-center justify-center gap-1.5 transition';
      }
    }

    privateBtn.addEventListener('click', () => {
      isWishPrivate = true;
      playMusicBoxNote(4);
      updatePrivacyToggleUI();
    });

    sharedBtn.addEventListener('click', () => {
      isWishPrivate = false;
      playMusicBoxNote(6);
      updatePrivacyToggleUI();
    });

    const resizeMeteorCanvas = () => {
      meteorCanvas.width = window.innerWidth;
      meteorCanvas.height = window.innerHeight;
    };
    resizeMeteorCanvas();
    window.addEventListener('resize', resizeMeteorCanvas);

    const trailSparkles = [];
    const meteor = {
      x: meteorCanvas.width * 0.92,
      y: meteorCanvas.height * 0.12,
      vx: -3.2,
      vy: 1.55,
      active: true,
      alpha: 1
    };

    function launchHeroMeteor() {
      meteor.x = meteorCanvas.width * 0.95;
      meteor.y = meteorCanvas.height * (0.1 + Math.random() * 0.14);
      const durationFrames = 175;
      meteor.vx = -(meteorCanvas.width * 0.88) / durationFrames;
      meteor.vy = (meteorCanvas.height * 0.34) / durationFrames;
      meteor.active = true;
      meteor.alpha = 1;
    }

    launchHeroMeteor();

    gsap.to(wishCard, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      delay: 1.1,
      ease: 'power3.out'
    });

    function renderMeteorScene() {
      ctx.clearRect(0, 0, meteorCanvas.width, meteorCanvas.height);

      if (meteor.active) {
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;

        for (let i = 0; i < 4; i++) {
          trailSparkles.push({
            x: meteor.x + (Math.random() - 0.5) * 8,
            y: meteor.y + (Math.random() - 0.5) * 8,
            vx: -meteor.vx * (Math.random() * 0.25) + (Math.random() - 0.5) * 0.6,
            vy: -meteor.vy * (Math.random() * 0.25) + (Math.random() - 0.5) * 0.6,
            size: Math.random() * 3.2 + 1,
            alpha: 1,
            decay: Math.random() * 0.018 + 0.01
          });
        }

        const tailLen = 180;
        const angle = Math.atan2(meteor.vy, meteor.vx);
        const tailX = meteor.x - Math.cos(angle) * tailLen;
        const tailY = meteor.y - Math.sin(angle) * tailLen;

        const grad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        grad.addColorStop(0, 'rgba(255, 251, 235, 1)');
        grad.addColorStop(0.25, 'rgba(253, 224, 71, 0.85)');
        grad.addColorStop(0.6, 'rgba(245, 158, 11, 0.35)');
        grad.addColorStop(1, 'rgba(245, 158, 11, 0)');

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 4.5;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (meteor.x < -220 || meteor.y > meteorCanvas.height + 150) {
          meteor.active = false;
          setTimeout(launchHeroMeteor, 3200);
        }
      }

      for (let i = trailSparkles.length - 1; i >= 0; i--) {
        const s = trailSparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;
        if (s.alpha <= 0) {
          trailSparkles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = '#fde047';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      meteorAnimId = requestAnimationFrame(renderMeteorScene);
    }

    meteorAnimId = requestAnimationFrame(renderMeteorScene);

    sendWishBtn.addEventListener('click', () => {
      userWishText = wishInput.value.trim();

      playMagicalChime('wish');

      const rect = wishCard.getBoundingClientRect();
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          const rx = rect.left + Math.random() * rect.width;
          const ry = rect.top + Math.random() * rect.height;
          burstGoldenDust(rx, ry, 18, true);
        }, i * 55);
      }

      gsap.to(wishCard, {
        y: -140,
        scale: 0.75,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.15,
        ease: 'power2.in',
        onComplete: () => {
          if (meteorAnimId) cancelAnimationFrame(meteorAnimId);
          ctx.clearRect(0, 0, meteorCanvas.width, meteorCanvas.height);
          document.body.classList.remove('dimmed-sky');

          transitionToStage('stage-3', 'stage-4', () => {
            initStage4RoyalCoupon();
          });
        }
      });
    });
  }

  // =========================================================================
  // 6. STAGE 4: THE SENSORY REWARD & ROYAL COUPON (بطاقة الدلال الخاصة بـ وزنة)
  // =========================================================================
  function initStage4RoyalCoupon() {
    const savedWishEl = document.getElementById('saved-wish-text');
    const claimBtn = document.getElementById('claim-coupon-btn');
    const feedbackBox = document.getElementById('claim-feedback');
    const couponCard = document.getElementById('royal-coupon-card');
    const giftButtons = document.querySelectorAll('.gift-choice-btn');
    const specialRequestInput = document.getElementById('special-request-input');

    // Display wish status respecting her privacy choice
    if (savedWishEl) {
      if (isWishPrivate || !userWishText) {
        savedWishEl.textContent = 'محفوظة سرّاً في قلبك وبين نجوم 11/11 🔒✨';
      } else {
        savedWishEl.textContent = `"${userWishText}"`;
      }
    }

    // Gift choice selection
    giftButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedGiftTreat = btn.dataset.gift || 'شوكولاتة فاخرة على ذوقي 🍫';
        playMusicBoxNote(7);

        giftButtons.forEach((b) => {
          b.className = 'gift-choice-btn p-2.5 rounded-xl border border-amber-300/30 bg-slate-950/50 text-amber-100/80 font-medium flex flex-col items-center gap-1 transition';
        });
        btn.className = 'gift-choice-btn active-gift-choice p-2.5 rounded-xl border border-amber-300/75 bg-amber-400/25 text-amber-50 font-bold flex flex-col items-center gap-1 transition';
      });
    });

    playMagicalChime('royal');
    launchGoldenConfetti();

    gsap.fromTo(
      couponCard,
      { scale: 0.88, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: 'back.out(1.6)' }
    );

    claimBtn.addEventListener('click', async () => {
      playMagicalChime('royal');
      launchGoldenConfetti();

      const customRequest = specialRequestInput ? specialRequestInput.value.trim() : '';
      const wishLine = (!isWishPrivate && userWishText)
        ? `🌠 أمنيتي في 11/11: "${userWishText}"\n`
        : `🌠 أمنيتي في 11/11: خلّيتها سر في قلبي للسماء 🔒✨\n`;

      const requestLine = customRequest
        ? `✨ وطلبي الخاص: "${customRequest}"\n`
        : `✨ ومعاها طلبي الخاص محفوظ وقت ما نبي!\n`;

      const shareMessage =
        `👑 فعّلت بطاقة الدلال الخاصة بيا (11/11) ✨\n` +
        `${wishLine}` +
        `🎁 الحاجة اللي خاطري فيها: ${selectedGiftTreat}\n` +
        `${requestLine}` +
        `وتوّا نستنى في تنفيذ الوعد يا سيدي 🐰💖`;

      try {
        await navigator.clipboard.writeText(shareMessage);
      } catch (_) {
        const tempArea = document.createElement('textarea');
        tempArea.value = shareMessage;
        document.body.appendChild(tempArea);
        tempArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempArea);
      }

      feedbackBox.classList.remove('hidden');
      gsap.fromTo(
        feedbackBox,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );

      claimBtn.querySelector('span').textContent = 'تم نسخ البطاقة.. أرسليها ليا توّا ✨💌';
    });
  }

  function launchGoldenConfetti() {
    if (typeof confetti !== 'function') return;

    const goldColors = ['#fde047', '#fbbf24', '#f59e0b', '#fef9c3', '#ffffff'];

    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.62 },
      colors: goldColors,
      shapes: ['star', 'circle'],
      scalar: 1.15
    });

    setTimeout(() => {
      confetti({
        particleCount: 55,
        angle: 60,
        spread: 55,
        origin: { x: 0.05, y: 0.65 },
        colors: goldColors
      });
      confetti({
        particleCount: 55,
        angle: 120,
        spread: 55,
        origin: { x: 0.95, y: 0.65 },
        colors: goldColors
      });
    }, 320);
  }

  // =========================================================================
  // 7. CINEMATIC STAGE TRANSITION HELPER
  // =========================================================================
  function transitionToStage(fromId, toId, onReadyCallback) {
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);

    gsap.to(fromEl, {
      opacity: 0,
      y: -25,
      scale: 0.96,
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete: () => {
        fromEl.classList.remove('active-stage');
        toEl.classList.add('active-stage');

        if (typeof onReadyCallback === 'function') {
          onReadyCallback();
        }

        gsap.fromTo(
          toEl,
          { opacity: 0, y: 25, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
        );
      }
    });
  }

  // =========================================================================
  // 8. BOOTSTRAP ON DOM READY
  // =========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    initAmbientParticles();
    initFairyDustCanvas();
    initStage1Gate();

    const audioBtn = document.getElementById('audio-toggle-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', async () => {
        if (!audioInitialized) {
          await initAudioEngine();
          playMusicBoxNote(0);
          return;
        }
        audioMuted = !audioMuted;
        updateAudioUI();
        if (!audioMuted) {
          playMusicBoxNote(2);
        }
      });
    }
  });
})();
