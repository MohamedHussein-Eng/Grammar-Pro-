// Grammar Master Unit 1 - Main Interactive Engine
// Vanilla JS with zero external dependencies for maximum speed and offline support

// State Management
let currentTab = 'summary';
let soundEnabled = true;
let gameState = {
  currentIndex: 0,
  score: 0,
  streak: 0,
  items: [...TIME_EXPRESSIONS]
};

let quizState = {
  answers: {}, // questionId -> chosenOptionIndex
  filter: 'all',
  totalQuestions: QUIZ_QUESTIONS.length
};

// Web Audio API Synthesizer for instant rich audio feedback
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playCorrect() {
    if (!soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      
      // Happy two-tone chord
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5
      
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn("Audio unavailable", e);
    }
  }

  playWrong() {
    if (!soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.linearRampToValueAtTime(146.83, now + 0.25); // D3
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn("Audio unavailable", e);
    }
  }

  playFanfare() {
    if (!soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const now = this.ctx.currentTime + (i * 0.12);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      });
    } catch (e) {
      console.warn("Fanfare error", e);
    }
  }
}

const sfx = new SoundFX();

// Canvas Confetti System
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#4f46e5', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98;
      p.rotation += p.vRot;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  update();
}

// ==========================================
// Initialization & Navigation
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupThemeToggle();
  setupSoundToggle();
  setupSearch();
  renderDualVerbsLab();
  initSortingGame();
  renderQuiz();
});

// Tab Switcher
function setupNavigation() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabId}`);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Light / Dark Theme Toggle
function setupThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('gm_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('gm_theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

// Sound Toggle
function setupSoundToggle() {
  const btn = document.getElementById('sound-toggle');
  btn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const icon = btn.querySelector('i');
    icon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    btn.style.color = soundEnabled ? 'var(--text-main)' : 'var(--danger)';
  });
}

// Global Quick Search
function setupSearch() {
  const input = document.getElementById('global-search');
  input.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    if (!term) {
      document.querySelectorAll('.card, .question-card, .example-box').forEach(el => {
        el.style.display = '';
      });
      return;
    }

    // Filter question cards and grammar cards
    document.querySelectorAll('.card, .question-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(term) ? '' : 'none';
    });
  });
}

// ==========================================
// Verb Analyzer Tool
// ==========================================
const VERB_KNOWLEDGE_BASE = {
  know: {
    type: "Stative Verb (فعل حالة وإدراك)",
    canContinuous: false,
    reason_en: "'know' is a stative verb describing mental state. It is NEVER used in continuous forms.",
    reason_ar: "فعل 'know' من أفعال الحالة والإدراك، لا يقبل الاستمرار إطلاقاً. نستخدم المضارع التام البسيط فقط.",
    simpleEx: "We have known each other for 10 years. (✓)",
    contEx: "We have been knowing each other. (✗ WRONG)"
  },
  break: {
    type: "Momentary Verb (فعل لحظي)",
    canContinuous: false,
    reason_en: "'break' happens in a split second. Momentary verbs cannot describe ongoing duration unless repeated.",
    reason_ar: "فعل 'break' (يكسر) فعل لحظي لا يستغرق مدة زمنية ليحدث، لذا يمتنع المضارع التام المستمر.",
    simpleEx: "Omar has broken his leg. (✓)",
    contEx: "Omar has been breaking his leg. (✗ WRONG)"
  },
  arrive: {
    type: "Momentary Verb (فعل لحظي)",
    canContinuous: false,
    reason_en: "'arrive' happens at an exact point in time. It cannot take continuous aspect for duration.",
    reason_ar: "فعل 'arrive' (يصل) لحظي، يحدث في ثانية ولا يقبل الاستمرار للتعبير عن مدة.",
    simpleEx: "My father has just arrived home. (✓)",
    contEx: "He has been arriving home. (✗ WRONG)"
  },
  lose: {
    type: "Momentary Verb (فعل لحظي)",
    canContinuous: false,
    reason_en: "'lose' is instantaneous. You either have lost something or not.",
    reason_ar: "فعل 'lose' (يفقد / يضيع) لحظي لا يقبل الاستمرار.",
    simpleEx: "I have lost my passport. (✓)",
    contEx: "I have been losing my passport. (✗ WRONG)"
  },
  work: {
    type: "Duration Verb (فعل استغراق وعمل)",
    canContinuous: true,
    reason_en: "'work' expresses duration. Both Present Perfect Simple and Continuous are completely correct with 'since' / 'for'.",
    reason_ar: "فعل 'work' (يعمل) يجوز فيه المضارع التام البسيط أو المستمر دون اختلاف في المعنى مع (since / for).",
    simpleEx: "I have worked with this team since 2014. (✓)",
    contEx: "I have been working with this team since 2014. (✓ Also correct!)"
  },
  live: {
    type: "Duration Verb (فعل معيشة وإقامة)",
    canContinuous: true,
    reason_en: "'live' expresses prolonged residence. Both Simple and Continuous are valid with 'since' / 'for'.",
    reason_ar: "فعل 'live' (يعيش) يجوز فيه كِلا الزمنين للتعبير عن الإقامة المستمرة حتى الآن.",
    simpleEx: "She has lived in Aswan for 17 years. (✓)",
    contEx: "She has been living in Aswan for 17 years. (✓ Also correct!)"
  },
  study: {
    type: "Action / Duration Verb",
    canContinuous: true,
    reason_en: "'study' can be used in both. Continuous emphasizes the ongoing activity and routine.",
    reason_ar: "فعل 'study' (يذاكر / يدرس) يقبل التام المستمر للتركيز على استمرار المذاكرة طوال الوقت.",
    simpleEx: "Nada has studied Arabic since morning. (✓)",
    contEx: "Nada has been studying Arabic since 5 o'clock. (✓)"
  },
  contain: {
    type: "Stative Verb (فعل حالة وسعة)",
    canContinuous: false,
    reason_en: "'contain' is a stative verb of capacity/possession. It cannot take '-ing'.",
    reason_ar: "فعل 'contain' (يحتوي على) من أفعال الحالة الدائمة، لا يأتي في الأزمنة المستمرة مطلقاً.",
    simpleEx: "The tank has contained 50 liters of fuel. (✓)",
    contEx: "The tank has been containing 50 liters. (✗ WRONG)"
  },
  think: {
    type: "Dual-Meaning Verb (ذو معنيين)",
    canContinuous: "depends",
    reason_en: "Stative (No -ing): when it means 'believe/have an opinion'. Action (Accepts -ing): when it means 'mentally ponder/consider'.",
    reason_ar: "يعتقد (رأي) = حالة بدون ing | يفكر في (نشاط ذهني مستمر) = حركة يقبل ing.",
    simpleEx: "I have thought he was right. (Opinion)",
    contEx: "I have been thinking about your offer all day. (Mental process)"
  },
  have: {
    type: "Dual-Meaning Verb (ذو معنيين)",
    canContinuous: "depends",
    reason_en: "Stative (No -ing): when it means 'possess/own'. Action (Accepts -ing): when it means 'eat, drink, take, spend'.",
    reason_ar: "يمتلك = حالة بدون ing | يتناول وجبة أو يقضي وقتاً = حركة يقبل ing.",
    simpleEx: "I have had this phone for 3 years. (Ownership)",
    contEx: "He has been having lunch for 20 minutes. (Eating)"
  },
  see: {
    type: "Dual-Meaning Verb (ذو معنيين)",
    canContinuous: "depends",
    reason_en: "Stative (No -ing): when it means 'perceive with eyes / understand'. Action (Accepts -ing): when it means 'meet / date / consult'.",
    reason_ar: "يرى / يفهم = حالة بدون ing | يقابل / يستشير طبيباً = حركة يقبل ing.",
    simpleEx: "I have seen that movie. (Perception)",
    contEx: "She has been seeing a specialist recently. (Meeting/Consulting)"
  },
  taste: {
    type: "Dual-Meaning Verb (ذو معنيين)",
    canContinuous: "depends",
    reason_en: "Stative (No -ing): when it means 'has a certain flavor'. Action (Accepts -ing): when it means 'the physical act of sampling food'.",
    reason_ar: "ذو مذاق معين = حالة بدون ing | يتذوق الطعام بلسانه = حركة يقبل ing.",
    simpleEx: "The soup has tasted delicious. (Flavor quality)",
    contEx: "The chef has been tasting the soup. (Physical tasting)"
  }
};

function setAndTestVerb(verb) {
  const input = document.getElementById('verb-tester-input');
  if (input) input.value = verb;
  testVerb();
}

function testVerb() {
  const input = document.getElementById('verb-tester-input');
  const resultBox = document.getElementById('verb-result-box');
  if (!input || !resultBox) return;

  const verb = input.value.trim().toLowerCase();
  if (!verb) return;

  const data = VERB_KNOWLEDGE_BASE[verb];

  resultBox.style.display = 'block';

  if (data) {
    let statusBadge = '';
    let bgColor = '';
    let borderColor = '';

    if (data.canContinuous === true) {
      statusBadge = '<span class="badge badge-green">✓ Accepts Continuous (يقبل المستمر)</span>';
      bgColor = 'rgba(16, 185, 129, 0.08)';
      borderColor = '#10b981';
      sfx.playCorrect();
    } else if (data.canContinuous === false) {
      statusBadge = '<span class="badge badge-rose">✗ Simple Only (البسيط فقط - ممنوع المستمر)</span>';
      bgColor = 'rgba(239, 68, 68, 0.08)';
      borderColor = '#ef4444';
      sfx.playWrong();
    } else {
      statusBadge = '<span class="badge badge-purple">⚡ Dual Meaning (يتغير بحسب المعنى)</span>';
      bgColor = 'rgba(168, 85, 247, 0.08)';
      borderColor = '#a855f7';
      sfx.playCorrect();
    }

    resultBox.style.background = bgColor;
    resultBox.style.border = `2px solid ${borderColor}`;

    resultBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; flex-wrap:wrap; gap:0.5rem;">
        <span style="font-size:1.3rem; font-weight:800; font-family:monospace; color:var(--text-main);">${verb.toUpperCase()}</span>
        <div>${statusBadge} <span class="badge badge-blue">${data.type}</span></div>
      </div>
      <div style="font-size:0.92rem; color:var(--text-main); margin-bottom:0.4rem;">${data.reason_en}</div>
      <div class="ar-text" style="font-size:0.95rem; color:var(--text-muted); margin-bottom:0.8rem;">${data.reason_ar}</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; font-size:0.85rem; text-align:left;">
        <div style="background:rgba(255,255,255,0.04); padding:0.6rem; border-radius:8px; border-left:3px solid #38bdf8;">
          <strong>Simple:</strong> <em>${data.simpleEx}</em>
        </div>
        <div style="background:rgba(255,255,255,0.04); padding:0.6rem; border-radius:8px; border-left:3px solid ${data.canContinuous === false ? '#ef4444' : '#10b981'};">
          <strong>Continuous:</strong> <em>${data.contEx}</em>
        </div>
      </div>
    `;
  } else {
    // Generic fallback analysis
    resultBox.style.background = 'rgba(56, 189, 248, 0.08)';
    resultBox.style.border = '2px solid #38bdf8';
    resultBox.innerHTML = `
      <div style="font-size:1.1rem; font-weight:800; color:#38bdf8; margin-bottom:0.4rem;">
        Verb: "${verb}"
      </div>
      <p style="font-size:0.92rem; margin-bottom:0.4rem;">
        If <strong>"${verb}"</strong> is an action verb describing an activity with duration (like <em>play, cook, read, run, write</em>), it naturally takes <strong>Present Perfect Continuous</strong> (<code>have/has been ${verb}ing</code>).
      </p>
      <p class="ar-text" style="font-size:0.92rem; color:var(--text-muted);">
        إذا كان الفعل يدل على حركة أو نشاط يستغرق وقتاً، فهو يقبل المضارع التام المستمر للتعبير عن الاستمرار وبذل الجهد طوال الفترة، ويستخدم في التام البسيط فقط إذا ذكرت عدد مرات الحدوث أو كمية المفعول.
      </p>
    `;
    sfx.playCorrect();
  }
}

// ==========================================
// Dual-Meaning Verbs Lab (Stative vs Action)
// ==========================================
function renderDualVerbsLab() {
  const container = document.getElementById('dual-verbs-container');
  if (!container) return;

  container.innerHTML = DUAL_VERBS_DATA.map((item, idx) => `
    <div class="dual-verb-card" id="verb-card-${idx}">
      <div class="dual-verb-header">
        <span class="dual-verb-name">${item.verb}</span>
        <span class="badge badge-purple">Dual Sense</span>
      </div>

      <!-- Stative Meaning Box -->
      <div class="dual-sense dual-stative">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
          <strong style="color: #ef4444;"><i class="fa-solid fa-lock"></i> Stative (حالة):</strong>
          <span class="badge badge-rose" style="font-size:0.65rem;">No -ing</span>
        </div>
        <div class="ar-text" style="font-weight:700; color:var(--text-main); margin-bottom:0.2rem;">
          ${item.stative.meaning}
        </div>
        <div style="font-size:0.85rem; color:var(--text-muted); font-style:italic;">
          "${item.stative.example}"
        </div>
      </div>

      <!-- Action Meaning Box -->
      <div class="dual-sense dual-action">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
          <strong style="color: #10b981;"><i class="fa-solid fa-bolt"></i> Action (حركة):</strong>
          <span class="badge badge-green" style="font-size:0.65rem;">Accepts -ing</span>
        </div>
        <div class="ar-text" style="font-weight:700; color:var(--text-main); margin-bottom:0.2rem;">
          ${item.action.meaning}
        </div>
        <div style="font-size:0.85rem; color:var(--text-muted); font-style:italic;">
          "${item.action.example}"
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================
// Been to vs Gone to vs Been in Visualizer
// ==========================================
const TRAVEL_DATA = {
  'been-to': {
    title: 'have / has been to + مكان (ذهب وعاد)',
    en: 'He has been to the supermarket. You can see the bags on the table.',
    ar: 'المعنى: ذهب إلى المكان وعاد منه وهو موجود هنا الآن! الدليل: أكياس المشتريات موجودة أمامه.',
    leftPos: '25%',
    icon: '🏠🚶‍♂️',
    homeText: 'Currently Here (موجود هنا)',
    destText: 'Visited & Returned (زارها وعاد)'
  },
  'gone-to': {
    title: 'have / has gone to + مكان (ذهب ولم يعد حتى الآن)',
    en: 'You can’t meet the manager because he has gone to Paris.',
    ar: 'المعنى: ذهب إلى المكان ولم يرجع حتى الآن (لا يزال في باريس أو في الطريق إليها). لا يمكن مقابلته هنا.',
    leftPos: '75%',
    icon: '🗼🚶‍♂️',
    homeText: 'Not Here (ليس هنا)',
    destText: 'Currently There (موجود هناك الآن)'
  },
  'been-in': {
    title: 'have / has been in + مكان (لا يزال مقيماً في المكان)',
    en: 'I have been in Cairo since last Friday.',
    ar: 'المعنى: لا يزال مقيماً وموجوداً في هذا المكان منذ فترة زمنية محددة.',
    leftPos: '75%',
    icon: '🏨🧳',
    homeText: 'Away',
    destText: 'Living / Staying There (يقيم هناك)'
  }
};

function setTravelMode(mode) {
  // Update Buttons
  document.querySelectorAll('.sim-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-${mode}`);
  if (activeBtn) activeBtn.classList.add('active');

  const data = TRAVEL_DATA[mode];
  if (!data) return;

  // Move traveler avatar
  const avatar = document.getElementById('traveler');
  if (avatar) {
    avatar.style.left = data.leftPos;
    avatar.innerHTML = data.icon;
  }

  // Update Status text
  const homeStatus = document.getElementById('home-status');
  const destStatus = document.getElementById('dest-status');
  if (homeStatus) homeStatus.textContent = data.homeText;
  if (destStatus) destStatus.textContent = data.destText;

  // Update Explanation Text
  const title = document.getElementById('sim-title');
  const en = document.getElementById('sim-en');
  const ar = document.getElementById('sim-ar');
  if (title) title.textContent = data.title;
  if (en) en.textContent = data.en;
  if (ar) ar.textContent = data.ar;

  sfx.playCorrect();
}

// ==========================================
// Since vs For Sorting Mini-Game
// ==========================================
function initSortingGame() {
  gameState.currentIndex = 0;
  gameState.score = 0;
  gameState.streak = 0;
  // Shuffle items
  gameState.items.sort(() => Math.random() - 0.5);
  updateGameDisplay();
}

function updateGameDisplay() {
  const currentItem = gameState.items[gameState.currentIndex];
  const wordEl = document.getElementById('game-word');
  const hintEl = document.getElementById('game-hint');
  const scoreEl = document.getElementById('game-score');
  const streakEl = document.getElementById('game-streak');

  if (!currentItem) {
    // Game completed!
    if (wordEl) wordEl.textContent = '🎉 Awesome Job! All Done!';
    if (hintEl) hintEl.textContent = `Final Score: ${gameState.score} / ${gameState.items.length}`;
    triggerConfetti();
    sfx.playFanfare();
    return;
  }

  if (wordEl) wordEl.textContent = currentItem.text;
  if (hintEl) hintEl.textContent = currentItem.hint;
  if (scoreEl) scoreEl.textContent = `${gameState.score} / ${gameState.items.length}`;
  if (streakEl) streakEl.textContent = `🔥 ${gameState.streak}`;
}

function handleGameChoice(choice) {
  const currentItem = gameState.items[gameState.currentIndex];
  if (!currentItem) return;

  const wordEl = document.getElementById('game-word');

  if (choice === currentItem.type) {
    // Correct!
    gameState.score++;
    gameState.streak++;
    sfx.playCorrect();
    if (wordEl) {
      wordEl.style.color = '#34d399';
      setTimeout(() => { wordEl.style.color = '#38bdf8'; }, 300);
    }
  } else {
    // Wrong!
    gameState.streak = 0;
    sfx.playWrong();
    if (wordEl) {
      wordEl.style.color = '#ef4444';
      setTimeout(() => { wordEl.style.color = '#38bdf8'; }, 300);
    }
  }

  gameState.currentIndex++;
  setTimeout(updateGameDisplay, 320);
}

function resetGame() {
  initSortingGame();
}

// ==========================================
// Master 17-Question Interactive Exam Engine
// ==========================================
function renderQuiz() {
  const container = document.getElementById('questions-list');
  if (!container) return;

  // Setup category filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      quizState.filter = btn.getAttribute('data-filter');
      filterQuestions();
    });
  });

  // Render question cards
  container.innerHTML = QUIZ_QUESTIONS.map((q, index) => {
    const letters = ['A', 'B', 'C', 'D'];
    return `
      <div class="question-card" id="q-card-${q.id}" data-category="${q.category}">
        <div class="q-top-row">
          <span class="q-number">Question ${q.id} of 17</span>
          <span class="q-category">${q.category}</span>
        </div>

        <div class="q-text">${escapeHtml(q.question)}</div>

        <div class="options-list">
          ${q.options.map((opt, optIndex) => `
            <button 
              type="button"
              class="option-btn" 
              id="q-${q.id}-opt-${optIndex}" 
              onclick="handleAnswer(${q.id}, ${optIndex})"
            >
              <span class="option-letter">${letters[optIndex]}</span>
              <span class="option-text">${escapeHtml(opt)}</span>
            </button>
          `).join('')}
        </div>

        <!-- Explanation Drawer -->
        <div class="q-explanation" id="q-${q.id}-exp">
          <div class="exp-title">
            <i class="fa-solid fa-lightbulb" style="color: #fbbf24;"></i>
            <span>Grammar Rule & Analysis: ${q.ruleTag}</span>
          </div>
          <div class="exp-text-en">${q.explanation_en}</div>
          <div class="exp-text-ar ar-text">${q.explanation_ar}</div>
        </div>
      </div>
    `;
  }).join('');

  updateQuizProgress();
}

function filterQuestions() {
  const cards = document.querySelectorAll('.question-card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-category');
    if (quizState.filter === 'all' || cat === quizState.filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function handleAnswer(questionId, chosenIndex) {
  // If already answered, do nothing
  if (quizState.answers[questionId] !== undefined) return;

  const question = QUIZ_QUESTIONS.find(q => q.id === questionId);
  if (!question) return;

  quizState.answers[questionId] = chosenIndex;

  const chosenBtn = document.getElementById(`q-${questionId}-opt-${chosenIndex}`);
  const correctBtn = document.getElementById(`q-${questionId}-opt-${question.answer}`);
  const expBox = document.getElementById(`q-${questionId}-exp`);

  // Disable all options for this question
  for (let i = 0; i < question.options.length; i++) {
    const btn = document.getElementById(`q-${questionId}-opt-${i}`);
    if (btn) btn.disabled = true;
  }

  if (chosenIndex === question.answer) {
    // Correct!
    if (chosenBtn) chosenBtn.classList.add('correct');
    sfx.playCorrect();
  } else {
    // Wrong!
    if (chosenBtn) chosenBtn.classList.add('wrong');
    if (correctBtn) correctBtn.classList.add('correct');
    sfx.playWrong();
  }

  // Reveal explanation
  if (expBox) expBox.classList.add('show');

  updateQuizProgress();
  checkQuizCompletion();
}

function updateQuizProgress() {
  const answeredCount = Object.keys(quizState.answers).length;
  const percentage = Math.round((answeredCount / quizState.totalQuestions) * 100);
  const fill = document.getElementById('quiz-progress-fill');
  if (fill) fill.style.width = `${percentage}%`;
}

function checkQuizCompletion() {
  const answeredCount = Object.keys(quizState.answers).length;
  if (answeredCount === quizState.totalQuestions) {
    // Calculate total score
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (quizState.answers[q.id] === q.answer) {
        correctCount++;
      }
    });

    const finalPercent = Math.round((correctCount / quizState.totalQuestions) * 100);
    const modal = document.getElementById('score-summary-modal');
    const scoreVal = document.getElementById('final-score-val');
    const title = document.getElementById('final-score-title');
    const msg = document.getElementById('final-score-msg');

    if (scoreVal) scoreVal.textContent = `${finalPercent}%`;
    if (title) {
      if (finalPercent >= 85) title.textContent = '🌟 Outstanding Mastery!';
      else if (finalPercent >= 60) title.textContent = '👍 Good Effort!';
      else title.textContent = 'Keep Practicing & Reviewing!';
    }
    if (msg) {
      msg.textContent = `You scored ${correctCount} out of ${quizState.totalQuestions} questions correctly (${finalPercent}%). راجع القواعد والشروحات أسفل الأسئلة لتثبيت كافة الأفكار.`;
    }

    if (modal) modal.style.display = 'block';

    if (finalPercent >= 70) {
      triggerConfetti();
      sfx.playFanfare();
    }
  }
}

function resetQuiz() {
  quizState.answers = {};
  document.getElementById('score-summary-modal').style.display = 'none';
  renderQuiz();
  window.scrollTo({ top: document.getElementById('tab-quiz').offsetTop - 60, behavior: 'smooth' });
}

// Utility: HTML Escaping
function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}
