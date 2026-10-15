/**
 * Abdul Khaliq Portfolio - script.js
 * AI & Backend Systems Engineer
 * 
 * Features:
 * - Supabase Contact Form Integration (@supabase/supabase-js)
 * - Animated Metrics Counters (with prefers-reduced-motion support)
 * - Interactive Project Filter
 * - Mobile Navigation & Smooth Scrolling
 * - Copy to Clipboard & Toast Notifications
 * - Project Architecture Modal with Soft Violet AI Tagging
 */

// ============================================================================
// 1. SUPABASE CONFIGURATION
// Configure your Supabase Project URL and Anon Public Key below.
// ============================================================================
const SUPABASE_CONFIG = {
  url: window.SUPABASE_URL || 'https://vxqfteosjhhmgxqiamva.supabase.co',
  anonKey: window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cWZ0ZW9zamhobWd4cWlhbXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5ODQ0OTksImV4cCI6MjEwMzU2MDQ5OX0.SN1AoBj1cxr6lyY6Den6GuudAUeq50qVuwnssWOLEpk',
  tableName: 'contact_messages'
};

const isConfiguredSupabase = () => {
  return SUPABASE_CONFIG.url && 
         !SUPABASE_CONFIG.url.includes('YOUR_SUPABASE_PROJECT_ID') &&
         SUPABASE_CONFIG.anonKey &&
         !SUPABASE_CONFIG.anonKey.includes('YOUR_SUPABASE_ANON_PUBLIC_KEY');
};

let supabaseClient = null;
if (typeof window.supabase !== 'undefined' && isConfiguredSupabase()) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('⚡ Supabase client initialized.');
  } catch (err) {
    console.warn('Could not initialize Supabase client:', err);
  }
}

// ============================================================================
// 2. DOM CONTENT LOADED - CORE INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMetricsAnimation();
  initProjectFilters();
  initProjectLinks();
  initProjectMedia();
  initContactForm();
  initProjectModals();
  initCopyEmail();
  initCurrentYear();
  initScrollReveal();
});

// ============================================================================
// 3. NAVBAR & NAVIGATION
// ============================================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen 
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // Active section indicator
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
}

// ============================================================================
// 4. ANIMATED METRICS COUNTERS
// ============================================================================
function initMetricsAnimation() {
  const metricValues = document.querySelectorAll('.metric-val-num');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    metricValues.forEach(val => {
      val.textContent = val.getAttribute('data-target');
    });
    return;
  }

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metricValues.forEach(val => {
          const target = parseInt(val.getAttribute('data-target'), 10);
          const duration = 1200;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              val.textContent = target;
              clearInterval(timer);
            } else {
              val.textContent = Math.floor(current);
            }
          }, stepTime);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.getElementById('metrics');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

// ============================================================================
// 5. PROJECT FILTERING
// ============================================================================
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.querySelector('.projects-grid');
  if (!grid || !filterBtns.length) return;

  const cards = Array.from(grid.querySelectorAll('.project-card'));
  let activeFilter = 'all';
  let lastFirst = null;

  // Fisher–Yates shuffle (returns a new array)
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const matches = (card, filterValue) =>
    filterValue === 'all' || (card.dataset.category || '').split(' ').includes(filterValue);

  function render(filterValue) {
    let order = shuffle(cards.filter(c => matches(c, filterValue)));

    // Never show the same project at the top twice in a row (when there is a choice)
    if (order.length > 1 && order[0] === lastFirst) {
      const j = 1 + Math.floor(Math.random() * (order.length - 1));
      [order[0], order[j]] = [order[j], order[0]];
    }
    lastFirst = order[0] || null;

    // Hide non-matching cards
    cards.forEach(c => {
      c.classList.remove('featured-wide', 'is-entering');
      if (!order.includes(c)) c.style.display = 'none';
    });

    // Re-append in the new order and show
    order.forEach(c => {
      grid.appendChild(c);
      c.style.display = '';
    });

    // Odd number of cards: let the first card span both columns so the grid has no gap
    if (order.length % 2 === 1) order[0].classList.add('featured-wide');

    // Small fade-in
    order.forEach(c => c.classList.add('is-entering'));
    setTimeout(() => order.forEach(c => c.classList.remove('is-entering')), 320);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');
      if (filterValue === activeFilter) return;
      activeFilter = filterValue;

      filterBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      render(filterValue);
    });
  });

  // Initial order is shuffled on every page load too
  render(activeFilter);
}

// ============================================================================
// 5b. PROJECT LINKS & MEDIA (single source of truth: PROJECT_DETAILS below)
// ============================================================================
const isRealUrl = (u) => typeof u === 'string' && u.trim() !== '' && u.trim() !== '#';

function initProjectLinks() {
  const pending = new Set();

  document.querySelectorAll('[data-link]').forEach(a => {
    const key = a.getAttribute('data-project');
    const type = a.getAttribute('data-link'); // 'demo' | 'github'
    const url = PROJECT_DETAILS[key] && PROJECT_DETAILS[key][type];

    if (isRealUrl(url)) {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.classList.remove('link-pending');
      a.removeAttribute('aria-disabled');
    } else {
      a.href = '#';
      a.classList.add('link-pending');
      a.setAttribute('aria-disabled', 'true');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('This link is coming soon');
      });
      pending.add(`${key}.${type}`);
    }
  });

  if (pending.size) {
    console.info('[portfolio] Project links still set to "#" (fill them in PROJECT_DETAILS):', [...pending].join(', '));
  }
}

function initProjectMedia() {
  document.querySelectorAll('.project-media').forEach(fig => {
    const key = fig.getAttribute('data-media');
    const src = PROJECT_DETAILS[key] && PROJECT_DETAILS[key].image;
    if (!src) return; // no screenshot yet -> figure stays hidden
    const img = fig.querySelector('img');
    img.addEventListener('load', () => { fig.hidden = false; });
    img.addEventListener('error', () => {
      fig.hidden = true;
      console.warn('[portfolio] Could not load project image:', src);
    });
    img.src = src;
  });
}

// ============================================================================
// 6. SUPABASE CONTACT FORM SUBMISSION
// ============================================================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const alertBox = document.getElementById('contactAlert');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !subject || !message) {
      showAlert('error', 'Please fill out all required fields.');
      return;
    }

    setButtonLoading(true);
    hideAlert();

    try {
      if (supabaseClient) {
        const { error } = await supabaseClient
          .from(SUPABASE_CONFIG.tableName)
          .insert([
            {
              name: name,
              email: email,
              subject: subject,
              message: message,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) throw error;

        showAlert('success', `<strong>Thank you, ${escapeHtml(name)}!</strong><br />Your message has been sent successfully. I'll get back to you soon.`);
        form.reset();
      } else {
        throw new Error('Unable to establish connection. Please email me directly at engrrabdulkhaliq@gmail.com');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      showAlert('error', `Something went wrong while sending your message. Please try again or reach out directly at engrrabdulkhaliq@gmail.com.`);
    } finally {
      setButtonLoading(false);
    }
  });

  function setButtonLoading(isLoading) {
    if (isLoading) {
      submitBtn.classList.add('btn-loading');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner"></span> <span>Sending...</span>`;
    } else {
      submitBtn.classList.remove('btn-loading');
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Send Message</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      `;
    }
  }

  function showAlert(type, message) {
    alertBox.className = `form-alert ${type}`;
    const icon = type === 'success' 
      ? `<svg class="form-alert-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
      : `<svg class="form-alert-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    alertBox.innerHTML = `${icon} <div>${message}</div>`;
    alertBox.style.display = 'flex';
  }

  function hideAlert() {
    alertBox.style.display = 'none';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// ============================================================================
// 7. PROJECT DETAILS MODAL
// ============================================================================
/**
 * FILL YOUR LINKS HERE (one place for card buttons + modal):
 *   demo    -> live app / demo URL      ('#' = not available yet)
 *   github  -> repository URL           ('#' = not available yet)
 *   image   -> app screenshot, e.g. 'assets/projects/iconspire.png' ('' = no image)
 *   diagram -> architecture diagram, e.g. 'assets/projects/iconspire-arch.png' ('' = none)
 */
const PROJECT_DETAILS = {
  iconspire: {
    title: 'Iconspire — AI Icon Generator & Background Remover',
    category: 'Computer Vision & SaaS',
    pills: ['Node.js', 'Express', 'ONNX Runtime', 'Paddle API', 'Lemon Squeezy', 'ISNet Model'],
    description: 'An AI-driven image segmentation microservice that extracts background image layers locally and processes subscriptions seamlessly.',
    highlights: [
      'Built local background removal pipelines using Node.js/Express and ISNet ONNX models for image segmentation with zero third-party API costs.',
      'Integrated payment webhooks and sandbox checkouts via Paddle and Lemon Squeezy to handle subscription workflows.',
      'Managed asynchronous image buffers and optimized asset delivery pipelines.',
      'Containerized execution environment ensuring consistent model inference and sub-100ms segmentation dispatch.'
    ],
    github: '#',
    demo: '#',
    image: '',
    diagram: ''
  },
  commuteclear: {
    title: 'CommuteClear — Real-Time Traffic Alert & Navigation Pipeline',
    category: 'Real-Time Pipelines & Scrapers',
    pills: ['Python', 'FastAPI', 'Supabase', 'OCI A1 VM', 'Automated Scrapers', 'PostgreSQL'],
    description: 'An end-to-end incident monitoring infrastructure that harvests municipal traffic data, runs deduplication logic, and distributes push notifications.',
    highlights: [
      'Configured automated scrapers running on an OCI virtual machine to aggregate live traffic incidents continuously.',
      'Implemented incident deduplication algorithms, commute window alert filtering, and live routing integration.',
      'Designed database schemas and real-time state synchronization using Supabase (PostgreSQL).',
      'Engineered geofencing heuristics to filter incidents strictly relevant to active commuting corridors.'
    ],
    github: '#',
    demo: '#',
    image: '',
    diagram: ''
  },
  sigmarag: {
    title: 'Sigma RAG — Video Q&A AI Teaching Assistant',
    category: 'RAG Architecture & LLMs',
    pills: ['Python', 'LangChain', 'FAISS', 'Groq API (LLaMA 3)', 'FastAPI', 'Vector Search'],
    description: 'A context-aware Retrieval-Augmented Generation system designed for instructional video lectures with sub-2-second retrieval and timestamp mapping.',
    highlights: [
      'Built video transcript ingestion and vector embeddings for context-aware Q&A with sub-2-second retrieval speed.',
      'Mapped generated responses directly to exact video timestamps (MM:SS) for precise student navigation.',
      'Integrated Groq API LLaMA 3 acceleration with FAISS vector stores for ultra-low latency inference.',
      'Implemented vector search clustering in FAISS to rank top-k semantic passages accurately.'
    ],
    github: '#',
    demo: '#',
    image: '',
    diagram: ''
  },
  resumeranker: {
    title: 'AI Resume Screening & Candidate Ranker',
    category: 'NLP & Candidate Matching',
    pills: ['Python', 'NLP', 'Scikit-Learn', 'Streamlit', 'Vector Search'],
    description: 'An automated candidate matching engine that scores technical resumes against complex job requisitions with 87% accuracy.',
    highlights: [
      'Built NLP matching and skill extraction algorithms achieving 87% candidate screening accuracy, reducing evaluation time by 75%.',
      'Implemented candidate ranking mechanisms, skill extraction, and bias detection filters.',
      'Created an interactive Streamlit analytics dashboard for recruiters to visualize applicant rankings and candidate score distributions.',
      'Structured cosine similarity scoring pipelines with custom entity recognition for tech skills.'
    ],
    github: '#',
    demo: '#',
    image: '',
    diagram: ''
  },
  studentperf: {
    title: 'Student Performance Predictor & Model Explainability',
    category: 'Machine Learning & Explainability',
    pills: ['Python', 'Machine Learning', 'XGBoost', 'SHAP', 'Pandas'],
    description: 'A predictive modeling platform assessing student academic risk while providing explainable AI insights via SHAP values.',
    highlights: [
      'Trained classification models on historical academic data to predict pass/fail risk with 84% accuracy.',
      'Integrated SHAP explainability visualizations to provide transparent feature-importance insights for educators.',
      'Identified key socio-academic indicators to recommend proactive interventions prior to final exams.',
      'Deployed live interactive dashboard on Streamlit Community Cloud with instant real-time inference.'
    ],
    github: 'https://github.com/engrrabdulkhaliq/student-perfomance-predictor',
    demo: 'https://student-perfomance-predictor.streamlit.app/',
    image: '',
    diagram: ''
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  if (!modalOverlay || !modalBody) return;

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = PROJECT_DETAILS[projKey];
      if (!data) return;

      const pillsHtml = data.pills.map(p => `<span class="tech-pill">${p}</span>`).join('');

      const highlightsHtml = data.highlights.map(h => `
        <li>
          <span class="highlight-bullet">▹</span>
          <span>${h}</span>
        </li>
      `).join('');

      const demoLinkHtml = isRealUrl(data.demo)
        ? `<a href="${data.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
             <span>Live Demo</span>
             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
           </a>`
        : `<span class="btn btn-secondary btn-sm link-pending" aria-disabled="true">Live Demo (coming soon)</span>`;

      const githubLinkHtml = isRealUrl(data.github)
        ? `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
             <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
             <span>GitHub Repository</span>
           </a>`
        : `<span class="btn btn-secondary btn-sm link-pending" aria-disabled="true">GitHub (coming soon)</span>`;

      const diagramHtml = isRealUrl(data.diagram)
        ? `<figure class="modal-diagram">
             <img src="${data.diagram}" alt="${data.title} — architecture diagram" onerror="this.parentElement.remove()" />
           </figure>`
        : '';

      modalBody.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <span class="project-category-tag cyan" style="margin-bottom: 0.6rem;">${data.category}</span>
          <h2 style="color: var(--text-primary); font-size: 1.45rem; font-weight: 600; margin-top: 0.4rem; line-height: 1.3;">${data.title}</h2>
          <p style="color: var(--text-secondary); margin-top: 0.5rem; font-size: 0.9rem;">${data.description}</p>
        </div>

        ${diagramHtml}

        <div style="margin-bottom: 1.25rem;">
          <h4 style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-cyan); margin-bottom: 0.6rem;">Architecture & Engineering Highlights</h4>
          <ul class="project-highlights">
            ${highlightsHtml}
          </ul>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 0.5rem;">Technology Stack</h4>
          <div class="tech-pills">
            ${pillsHtml}
          </div>
        </div>

        <div style="display: flex; gap: 0.85rem; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 1.15rem;">
          ${demoLinkHtml}
          ${githubLinkHtml}
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

// ============================================================================
// 8. TOAST NOTIFICATION & COPY EMAIL
// ============================================================================
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'engrrabdulkhaliq@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email address copied to clipboard');
      copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Copied!</span>
      `;
      setTimeout(() => {
        copyBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>Copy</span>
        `;
      }, 2000);
    }).catch(err => {
      console.warn('Clipboard write error:', err);
    });
  });
}

// ============================================================================
// 9. DYNAMIC COPYRIGHT YEAR
// ============================================================================
function initCurrentYear() {
  const yearElem = document.getElementById('currentYear');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}

// ============================================================================
// 10. SCROLL REVEAL ANIMATIONS
// ============================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}
