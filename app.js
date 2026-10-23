// Grammar-Pro Masterclass Engine
// Scholarly, Interactive, Offline-ready, Zero Dependencies

let currentSection = 'summary';
let soundEnabled = true;
let examMode = 'interactive'; // 'interactive' or 'study-key'

// State for the Exam
let examState = {
  answers: {}, // qId -> selectedOptionIndex
  filter: 'all'
};

// State for Sorter Game
let sorterState = {
  index: 0,
  score: 0,
  streak: 0,
  items: [...TIME_EXPRESSIONS]
};

// Web Audio API Chimes
class AcademicSound {
  constructor() {
    this.ctx = null;
  }

  ensureContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
  }

  playCorrect() {
    if (!soundEnabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, t); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, t + 0.12); // G5
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    } catch (e) {
      console.warn("Sound error:", e);
    }
  }

  playWrong() {
    if (!soundEnabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, t); // A3
      osc.frequency.linearRampToValueAtTime(164.81, t + 0.22); // E3
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } catch (e) {
      console.warn("Sound error:", e);
    }
  }

  playFanfare() {
    if (!soundEnabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + (idx * 0.1);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      });
    } catch (e) {
      console.warn("Fanfare error:", e);
    }
  }
}

const audioFX = new AcademicSound();

// ==========================================================
// Initialization
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupThemeToggle();
  setupSoundToggle();
  setupSearchFilter();
  renderDualVerbsMatrix();
  initSinceForSorter();
  renderExamStudio();
  renderOfficialDossierKey();
});

// Primary Tab Navigation
function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-section');
      switchSection(target);
    });
  });
}

function switchSection(sectionId) {
  currentSection = sectionId;
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-section') === sectionId);
  });
  document.querySelectorAll('.editorial-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `section-${sectionId}`);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Light / Dark Theme Toggle
function setupThemeToggle() {
  const btn = document.getElementById('theme-toggle-btn');
  const html = document.documentElement;
  const saved = localStorage.getItem('grammar_pro_theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('grammar_pro_theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle-btn i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

// Sound Toggle
function setupSoundToggle() {
  const btn = document.getElementById('sound-toggle-btn');
  btn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const icon = btn.querySelector('i');
    icon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    btn.style.color = soundEnabled ? '' : 'var(--ink-crimson)';
  });
}

// Live Keyword Search
function setupSearchFilter() {
  const input = document.getElementById('master-search-input');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const searchableCards = document.querySelectorAll('.rule-card, .question-item-card, .dual-card, .dossier-card');
    
    searchableCards.forEach(card => {
      if (!term) {
        card.style.display = '';
        return;
      }
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(term) ? '' : 'none';
    });
  });
}

// ==========================================================
// Dual Verbs Lab (Stative vs Action)
// ==========================================================
function renderDualVerbsMatrix() {
  const container = document.getElementById('dual-verbs-matrix');
  if (!container) return;

  container.innerHTML = DUAL_VERBS_DATA.map(item => `
    <div class="dual-card">
      <div class="dual-card-title">${item.verb.toUpperCase()}</div>

      <!-- Stative Dimension -->
      <div class="dual-dimension dim-stative">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
          <strong style="color:var(--ink-crimson); font-size:0.85rem;"><i class="fa-solid fa-lock"></i> STATIVE SENSE</strong>
          <span style="font-size:0.75rem; font-weight:700; color:var(--ink-crimson);">No -ing</span>
        </div>
        <div class="ar-font" style="font-weight:700; font-size:0.9rem; margin-bottom:0.2rem;">
          ${item.stative.meaning}
        </div>
        <div style="font-size:0.85rem; color:var(--text-muted); font-style:italic;">
          "${item.stative.example}"
        </div>
      </div>

      <!-- Action Dimension -->
      <div class="dual-dimension dim-action">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
          <strong style="color:var(--ink-emerald); font-size:0.85rem;"><i class="fa-solid fa-bolt"></i> ACTION SENSE</strong>
          <span style="font-size:0.75rem; font-weight:700; color:var(--ink-emerald);">Continuous OK</span>
        </div>
        <div class="ar-font" style="font-weight:700; font-size:0.9rem; margin-bottom:0.2rem;">
          ${item.action.meaning}
        </div>
        <div style="font-size:0.85rem; color:var(--text-muted); font-style:italic;">
          "${item.action.example}"
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================
// Interactive Verb Workbench
// ==========================================================
const VERB_DICTIONARY = {
  know: {
    status: 'stative',
    title: 'Stative Verb (فعل حالة وإدراك)',
    canCont: false,
    en: '"Know" is a stative verb describing a mental state; it cannot be used in continuous forms.',
    ar: 'فعل حالة وإدراك يصف حالة ذهنية دائمة، يمتنع استخدامه في الأزمنة المستمرة تماماً.',
    simple: 'We have known each other for ten years.',
    cont: 'We have been knowing (Grammatically Incorrect)'
  },
  break: {
    status: 'momentary',
    title: 'Momentary Verb (فعل لحظي خاطف)',
    canCont: false,
    en: '"Break" is an instantaneous action that cannot have a prolonged continuous duration.',
    ar: 'فعل لحظي يحدث في ثانية خاطفة ولا يستغرق فترة زمنية ممتدة، فيمتنع التام المستمر.',
    simple: 'Omar has broken his leg.',
    cont: 'Omar has been breaking his leg (Incorrect)'
  },
  arrive: {
    status: 'momentary',
    title: 'Momentary Verb (فعل وصول لحظي)',
    canCont: false,
    en: '"Arrive" describes a punctual event that occurs at a specific point in time.',
    ar: 'فعل وصول لحظي يقع في نقطة زمنية محددة ولا يستمر كفترة.',
    simple: 'He has just arrived home.',
    cont: 'He has been arriving home (Incorrect)'
  },
  work: {
    status: 'flexible',
    title: 'Prolonged Activity (أفعال العمل والمعيشة)',
    canCont: true,
    en: 'Verbs representing long-term activities like "work" and "live" can be used in either the present perfect simple or continuous with "since/for" with essentially the same meaning.',
    ar: 'أفعال المعيشة والعمل تقبل كلا الزمنين مع since/for للتعبير عن نشاط طويل الأمد دون فارق جوهري.',
    simple: 'I have worked with this team since 2014.',
    cont: 'I have been working with this team since 2014.'
  },
  live: {
    status: 'flexible',
    title: 'Prolonged Activity (إقامة ومعيشة)',
    canCont: true,
    en: 'Both simple and continuous are valid for expressing extended residence with "since" or "for".',
    ar: 'يجوز استخدام المضارع التام البسيط أو التام المستمر للتعبير عن الإقامة الممتدة.',
    simple: 'She has lived here since 1999.',
    cont: 'She has been living here since 1999.'
  },
  contain: {
    status: 'stative',
    title: 'Stative Verb (سعة وملكية)',
    canCont: false,
    en: '"Contain" describes an ongoing physical capacity/state and cannot take the continuous aspect.',
    ar: 'فعل حالة يعبر عن السعة أو المكونات، لا يأتي في صيغة الاستمرار.',
    simple: 'The tank has contained 50 liters of fuel.',
    cont: 'The tank has been containing 50 liters (Incorrect)'
  },
  taste: {
    status: 'dual',
    title: 'Dual-Meaning Verb (حالة أو حركة بحسب المعنى)',
    canCont: 'dual',
    en: 'Stative: when describing flavor quality (No -ing). Action: when describing the physical sampling of food.',
    ar: 'إذا قصد به أن الطعام ذو مذاق طيب (حالة بدون ing)، وإذا قصد به أن الطاهي يتذوق الأكل باللسان (حركة يقبل ing).',
    simple: 'The soup has tasted delicious.',
    cont: 'The chef has been tasting the soup.'
  },
  think: {
    status: 'dual',
    title: 'Dual-Meaning Verb (رأي أو تفكير)',
    canCont: 'dual',
    en: 'Stative: when it means "believe/have an opinion" (No -ing). Action: when it means "ponder/consider mentally".',
    ar: 'يعتقد (رأي قاطع) = حالة بدون ing | يفكر في (نشاط ذهني مستمر) = حركة يقبل ing.',
    simple: 'I have thought about what you said.',
    cont: 'I have been thinking about your offer all day.'
  },
  have: {
    status: 'dual',
    title: 'Dual-Meaning Verb (ملكية أو تناول)',
    canCont: 'dual',
    en: 'Stative: possess/own (No -ing). Action: eat/drink/spend time (Continuous).',
    ar: 'يمتلك = حالة بدون ing | يتناول وجبة أو يقضي وقتاً = حركة يقبل ing.',
    simple: 'I have had this car for five years.',
    cont: 'He has been having lunch for thirty minutes.'
  }
};

function queryVerbWorkbench() {
  const input = document.getElementById('workbench-verb-input');
  const resultBox = document.getElementById('workbench-result');
  if (!input || !resultBox) return;

  const rawVerb = input.value.trim().toLowerCase();
  if (!rawVerb) return;

  const match = VERB_DICTIONARY[rawVerb];
  resultBox.style.display = 'block';

  if (match) {
    let colorBorder = 'var(--ink-cobalt)';
    let badgeClass = 'var(--ink-cobalt)';
    let badgeLabel = 'Continuous OK';

    if (match.canCont === false) {
      colorBorder = 'var(--ink-crimson)';
      badgeClass = 'var(--ink-crimson)';
      badgeLabel = 'Simple Only (No -ing)';
      audioFX.playWrong();
    } else if (match.canCont === true) {
      colorBorder = 'var(--ink-emerald)';
      badgeClass = 'var(--ink-emerald)';
      badgeLabel = 'Simple & Continuous Both Valid';
      audioFX.playCorrect();
    } else {
      colorBorder = 'var(--ink-amber)';
      badgeClass = 'var(--ink-amber)';
      badgeLabel = 'Dual Meaning (Depends on context)';
      audioFX.playCorrect();
    }

    resultBox.style.border = `2px solid ${colorBorder}`;
    resultBox.style.background = 'var(--bg-elevated)';

    resultBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
        <span style="font-family:var(--font-mono); font-size:1.35rem; font-weight:800; color:var(--text-headline);">${rawVerb.toUpperCase()}</span>
        <span style="background:${badgeClass}; color:white; font-size:0.75rem; font-weight:800; padding:0.25rem 0.6rem; border-radius:4px;">${badgeLabel}</span>
      </div>
      <div style="font-size:0.95rem; font-weight:600; color:var(--text-headline); margin-bottom:0.35rem;">${match.en}</div>
      <div class="ar-font" style="font-size:0.95rem; color:var(--text-muted); margin-bottom:1rem;">${match.ar}</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; font-size:0.88rem;">
        <div style="background:var(--bg-well); padding:0.75rem; border-radius:4px; border-left:3px solid var(--ink-cobalt);">
          <strong>Simple:</strong> <em>${match.simple}</em>
        </div>
        <div style="background:var(--bg-well); padding:0.75rem; border-radius:4px; border-left:3px solid ${match.canCont === false ? 'var(--ink-crimson)' : 'var(--ink-emerald)'};">
          <strong>Continuous:</strong> <em>${match.cont}</em>
        </div>
      </div>
    `;
  } else {
    resultBox.style.border = '1px solid var(--border-hairline)';
    resultBox.style.background = 'var(--bg-elevated)';
    resultBox.innerHTML = `
      <div style="font-family:var(--font-mono); font-size:1.15rem; font-weight:700; color:var(--ink-cobalt); margin-bottom:0.4rem;">VERB: "${rawVerb}"</div>
      <p style="font-size:0.92rem; margin-bottom:0.4rem;">
        For dynamic action verbs with continuous duration (e.g., <em>read, study, run, paint</em>), <strong>Present Perfect Continuous</strong> is fully accepted unless a specific count or frequency of completed units is stated.
      </p>
      <p class="ar-font" style="font-size:0.92rem; color:var(--text-muted);">
        إذا كان الفعل يدل على حركة ونشاط مستمر، فهو يقبل التام المستمر طالما لم نذكر عدد المرات أو كمية المفعول المنجز.
      </p>
    `;
    audioFX.playCorrect();
  }
}

function setAndRunWorkbench(verb) {
  const input = document.getElementById('workbench-verb-input');
  if (input) input.value = verb;
  queryVerbWorkbench();
}

// ==========================================================
// Been to vs Gone to Travel Simulator
// ==========================================================
const TRAVEL_MODES = {
  'been-to': {
    title: 'have / has been to + مكان',
    subtitle: 'ذهب إلى مكان وعاد منه (Back Now)',
    en: 'Lean has been to New York. (She completed the journey and is no longer there; she has returned).',
    ar: 'المعنى: زارت نيويورك وعادت بالفعل إلى موطنها، وهي موجودة هنا الآن وليست هناك.',
    left: '25%',
    icon: '🏠🚶‍♂️',
    homeStatus: 'Currently Here (موجود هنا)',
    destStatus: 'Visited & Returned (زارها وعاد)'
  },
  'gone-to': {
    title: 'have / has gone to + مكان',
    subtitle: 'ذهب إلى مكان ولم يعد حتى الآن (Still There)',
    en: 'You cannot meet the manager because he has gone to Paris. (He is still in Paris or en route).',
    ar: 'المعنى: ذهب إلى باريس ولم يرجع حتى هذه اللحظة، لذلك لا يمكن مقابلته هنا.',
    left: '75%',
    icon: '🗼🚶‍♂️',
    homeStatus: 'Away (غائب)',
    destStatus: 'Currently There (موجود هناك الآن)'
  },
  'been-in': {
    title: 'have / has been in + مكان',
    subtitle: 'مقيم في المكان منذ فترة (Residing / Staying)',
    en: 'I have been in Cairo since last Friday. (Still residing or staying in Cairo).',
    ar: 'المعنى: لا يزال مقيماً وموجوداً في هذا المكان منذ فترة زمنية محددة.',
    left: '75%',
    icon: '🏨🧳',
    homeStatus: 'Away',
    destStatus: 'Living / Staying There (يقيم هناك)'
  }
};

function selectTravelMode(mode) {
  document.querySelectorAll('.travel-toggle-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`travel-btn-${mode}`);
  if (activeBtn) activeBtn.classList.add('active');

  const config = TRAVEL_MODES[mode];
  if (!config) return;

  const token = document.getElementById('traveler-token');
  if (token) {
    token.style.left = config.left;
    token.innerHTML = config.icon;
  }

  const homeStatus = document.getElementById('travel-home-status');
  const destStatus = document.getElementById('travel-dest-status');
  if (homeStatus) homeStatus.textContent = config.homeStatus;
  if (destStatus) destStatus.textContent = config.destStatus;

  const title = document.getElementById('travel-panel-title');
  const en = document.getElementById('travel-panel-en');
  const ar = document.getElementById('travel-panel-ar');

  if (title) title.innerHTML = `${config.title} &mdash; <span style="font-size:0.85rem; color:var(--text-muted);">${config.subtitle}</span>`;
  if (en) en.textContent = config.en;
  if (ar) ar.textContent = config.ar;

  audioFX.playCorrect();
}

// ==========================================================
// Since vs For Sorter
// ==========================================================
function initSinceForSorter() {
  sorterState.index = 0;
  sorterState.score = 0;
  sorterState.streak = 0;
  sorterState.items.sort(() => Math.random() - 0.5);
  renderSorterCard();
}

function renderSorterCard() {
  const current = sorterState.items[sorterState.index];
  const wordEl = document.getElementById('sorter-active-word');
  const hintEl = document.getElementById('sorter-active-hint');
  const scoreEl = document.getElementById('sorter-score-tracker');
  const streakEl = document.getElementById('sorter-streak-tracker');

  if (!current) {
    if (wordEl) wordEl.textContent = 'Challenge Completed!';
    if (hintEl) hintEl.textContent = `Final Score: ${sorterState.score} / ${sorterState.items.length}`;
    audioFX.playFanfare();
    return;
  }

  if (wordEl) wordEl.textContent = current.text;
  if (hintEl) hintEl.textContent = current.hint;
  if (scoreEl) scoreEl.textContent = `${sorterState.score} / ${sorterState.items.length}`;
  if (streakEl) streakEl.textContent = `${sorterState.streak}`;
}

function submitSorterChoice(choice) {
  const current = sorterState.items[sorterState.index];
  if (!current) return;

  const wordEl = document.getElementById('sorter-active-word');

  if (choice === current.type) {
    sorterState.score++;
    sorterState.streak++;
    audioFX.playCorrect();
    if (wordEl) {
      wordEl.style.color = 'var(--ink-emerald)';
      setTimeout(() => { wordEl.style.color = ''; }, 250);
    }
  } else {
    sorterState.streak = 0;
    audioFX.playWrong();
    if (wordEl) {
      wordEl.style.color = 'var(--ink-crimson)';
      setTimeout(() => { wordEl.style.color = ''; }, 250);
    }
  }

  sorterState.index++;
  setTimeout(renderSorterCard, 280);
}

function resetSinceForSorter() {
  initSinceForSorter();
}

// ==========================================================
// Exam Studio: 17 Questions with Exact User Notes
// ==========================================================
function renderExamStudio() {
  const container = document.getElementById('exam-questions-container');
  if (!container) return;

  // Filter chips listeners
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      examState.filter = chip.getAttribute('data-filter');
      applyExamFilter();
    });
  });

  const letters = ['a', 'b', 'c', 'd'];

  container.innerHTML = QUIZ_QUESTIONS.map(q => `
    <div class="question-item-card" id="question-card-${q.id}" data-category="${q.category}">
      <div class="question-meta-header">
        <span class="q-index-badge">Item ${q.id.toString().padStart(2, '0')} / 17</span>
        <span class="q-category-tag">${q.category}</span>
      </div>

      <div class="question-prompt-text">${escapeHtml(q.question)}</div>

      <div class="options-stack">
        ${q.options.map((opt, optIdx) => `
          <button 
            type="button" 
            class="option-chip-btn" 
            id="q-${q.id}-opt-${optIdx}"
            onclick="handleExamOptionClick(${q.id}, ${optIdx})"
          >
            <span class="option-letter-badge">(${letters[optIdx]})</span>
            <span class="option-text-span">${escapeHtml(opt)}</span>
          </button>
        `).join('')}
      </div>

      <!-- The Official Note Key Callout (Revealed upon answer) -->
      <div class="official-note-box" id="official-note-${q.id}">
        <div class="note-header-line">
          <div class="note-title-badge">
            <i class="fa-solid fa-graduation-cap"></i>
            <span>Official Answer & Grammatical Rationale &bull; (${q.correctLetter}) ${escapeHtml(q.correctText)}</span>
          </div>
          <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">${q.ruleTag}</span>
        </div>
        
        <!-- Exact User Note verbatim -->
        <div class="note-body-text">
          <strong>Note:</strong> ${escapeHtml(q.officialNote)}
        </div>

        <div class="note-arabic-synthesis ar-font">
          <strong>الشرح بالعربية:</strong> ${escapeHtml(q.explanation_ar)}
        </div>
      </div>
    </div>
  `).join('');

  updateExamProgress();
}

function handleExamOptionClick(questionId, selectedIdx) {
  // If already answered, ignore further clicks
  if (examState.answers[questionId] !== undefined) return;

  const q = QUIZ_QUESTIONS.find(item => item.id === questionId);
  if (!q) return;

  examState.answers[questionId] = selectedIdx;

  const selectedBtn = document.getElementById(`q-${questionId}-opt-${selectedIdx}`);
  const correctBtn = document.getElementById(`q-${questionId}-opt-${q.answer}`);
  const noteBox = document.getElementById(`official-note-${questionId}`);

  // Disable all buttons in this question
  for (let i = 0; i < q.options.length; i++) {
    const btn = document.getElementById(`q-${questionId}-opt-${i}`);
    if (btn) btn.disabled = true;
  }

  if (selectedIdx === q.answer) {
    if (selectedBtn) selectedBtn.classList.add('correct');
    audioFX.playCorrect();
  } else {
    if (selectedBtn) selectedBtn.classList.add('wrong');
    if (correctBtn) correctBtn.classList.add('correct');
    audioFX.playWrong();
  }

  // Reveal the official note box
  if (noteBox) noteBox.classList.add('revealed');

  updateExamProgress();
  checkExamCompletion();
}

function updateExamProgress() {
  const answered = Object.keys(examState.answers).length;
  const percent = Math.round((answered / QUIZ_QUESTIONS.length) * 100);
  const track = document.getElementById('exam-progress-track');
  const countDisplay = document.getElementById('exam-answered-count');
  if (track) track.style.width = `${percent}%`;
  if (countDisplay) countDisplay.textContent = `${answered} / 17`;
}

function applyExamFilter() {
  const cards = document.querySelectorAll('.question-item-card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-category');
    if (examState.filter === 'all' || cat === examState.filter) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function checkExamCompletion() {
  const answered = Object.keys(examState.answers).length;
  if (answered === QUIZ_QUESTIONS.length) {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (examState.answers[q.id] === q.answer) correctCount++;
    });

    const percent = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    const ledger = document.getElementById('score-ledger-card');
    const figure = document.getElementById('score-figure-val');
    const msg = document.getElementById('score-msg-lead');

    if (figure) figure.textContent = `${percent}%`;
    if (msg) {
      msg.textContent = `Completed: ${correctCount} of 17 correct answers. Examine the official notes below to reinforce your grasp on every distinction.`;
    }
    if (ledger) ledger.style.display = 'block';

    if (percent >= 75) {
      audioFX.playFanfare();
    }
  }
}

function resetExam() {
  examState.answers = {};
  const ledger = document.getElementById('score-ledger-card');
  if (ledger) ledger.style.display = 'none';
  renderExamStudio();
}

function toggleExamMode(mode) {
  examMode = mode;
  document.getElementById('btn-mode-interactive').classList.toggle('active', mode === 'interactive');
  document.getElementById('btn-mode-study').classList.toggle('active', mode === 'study');

  if (mode === 'study') {
    // Reveal all correct options and notes
    QUIZ_QUESTIONS.forEach(q => {
      const correctBtn = document.getElementById(`q-${q.id}-opt-${q.answer}`);
      const noteBox = document.getElementById(`official-note-${q.id}`);
      if (correctBtn) correctBtn.classList.add('correct');
      if (noteBox) noteBox.classList.add('revealed');
      // Disable buttons
      for (let i = 0; i < q.options.length; i++) {
        const btn = document.getElementById(`q-${q.id}-opt-${i}`);
        if (btn) btn.disabled = true;
      }
    });
  } else {
    resetExam();
  }
}

// ==========================================================
// Official Answer Key Dossier (Dedicated Reference Section)
// ==========================================================
function renderOfficialDossierKey() {
  const container = document.getElementById('official-dossier-container');
  if (!container) return;

  container.innerHTML = QUIZ_QUESTIONS.map(q => `
    <div class="dossier-card" style="background:var(--bg-surface); border:1px solid var(--border-hairline); border-left:4px solid var(--ink-cobalt); border-radius:var(--radius-md); padding:1.6rem; margin-bottom:1.5rem; box-shadow:var(--shadow-subtle);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem; border-bottom:1px solid var(--border-hairline); padding-bottom:0.5rem;">
        <span style="font-family:var(--font-mono); font-weight:700; color:var(--ink-cobalt); font-size:0.9rem;">QUESTION ${q.id.toString().padStart(2, '0')}</span>
        <span style="font-size:0.8rem; text-transform:uppercase; font-weight:700; color:var(--text-muted);">${q.category} &bull; ${q.ruleTag}</span>
      </div>

      <div style="font-family:var(--font-serif); font-size:1.2rem; font-weight:600; color:var(--text-headline); margin-bottom:0.8rem;">
        ${escapeHtml(q.question)}
      </div>

      <div style="background:var(--ink-cobalt-soft); border:1px solid rgba(59,130,246,0.25); border-radius:var(--radius-sm); padding:0.6rem 0.9rem; margin-bottom:1rem; display:inline-flex; align-items:center; gap:0.6rem;">
        <strong style="color:var(--ink-cobalt);">Correct Answer:</strong>
        <span style="font-weight:700; color:var(--text-headline);">(${q.correctLetter}) ${escapeHtml(q.correctText)}</span>
      </div>

      <!-- User's Exact Note verbatim -->
      <div style="font-size:0.98rem; line-height:1.65; color:var(--text-headline); margin-bottom:0.8rem; background:var(--bg-well); padding:1rem; border-radius:var(--radius-sm);">
        <strong style="color:var(--ink-amber);"><i class="fa-solid fa-feather-pointed"></i> Master Note:</strong> ${escapeHtml(q.officialNote)}
      </div>

      <div class="ar-font" style="font-size:0.92rem; color:var(--text-muted); padding-top:0.4rem;">
        <strong style="color:var(--text-headline);">التحليل الإيضاحي:</strong> ${escapeHtml(q.explanation_ar)}
      </div>
    </div>
  `).join('');
}

// Escaping
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}
