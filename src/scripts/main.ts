/** Small, progressive enhancements only. Static content remains accessible without JS. */

const orbitDetails: Record<string, string> = {
  architecture: 'I shape clear boundaries and trade-offs that hold under real production pressure.',
  scalability: 'I scale capacity where load demands it — without unnecessary complexity.',
  reliability: 'I design for failure, recovery, and SLOs so systems stay dependable.',
  security: 'I bake identity, least privilege, and threat models into the architecture.',
  observability: 'I make every system diagnosable with metrics, logs, and traces that matter.',
  delivery: 'I ship safely in small increments, then improve from production evidence.',
};

const orbitOrder = ['architecture', 'scalability', 'reliability', 'security', 'observability', 'delivery'] as const;

function activateExclusive(group: ParentNode, selector: string, selected: HTMLElement): void {
  group.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    element.setAttribute('aria-pressed', String(element === selected));
  });
}

function applyTheme(theme: 'light' | 'dark'): void {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* ignore */
  }
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
  const meta = document.querySelector('meta[name="theme-color"]:not([media])');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0e1410' : '#f4f7f1');
}

function initTheme(): void {
  let theme: 'light' | 'dark' = 'dark';
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') theme = stored;
  } catch {
    /* ignore */
  }
  applyTheme(theme);

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });
}

function initOrbit(hero: HTMLElement): void {
  const caption = hero.querySelector<HTMLElement>('[data-orbit-caption]');
  const board = hero.querySelector<HTMLElement>('.orbit-board');
  const buttons = [...hero.querySelectorAll<HTMLButtonElement>('[data-orbit]')];
  const spokes = [...hero.querySelectorAll<SVGPathElement>('[data-spoke]')];
  const flows = [...hero.querySelectorAll<SVGPathElement>('[data-flow]')];
  const hubs = [...hero.querySelectorAll<SVGCircleElement>('[data-hub]')];
  let index = 0;
  let timer: number | undefined;
  let resumeTimer: number | undefined;
  let captionTimer: number | undefined;
  let paused = false;
  let locked = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const paint = (key: string): void => {
    activateExclusive(hero, '[data-orbit]', buttons.find((item) => item.dataset.orbit === key) ?? buttons[0]);
    spokes.forEach((spoke) => spoke.classList.toggle('is-active', spoke.dataset.spoke === key));
    flows.forEach((flow) => flow.classList.toggle('is-active', flow.dataset.flow === key));
    hubs.forEach((hub) => hub.classList.toggle('is-lit', hub.dataset.hub === key));
    if (board) board.dataset.activeOrbit = key;
  };

  const select = (key: string, userDriven = false): void => {
    const button = buttons.find((item) => item.dataset.orbit === key);
    if (!button) return;
    paint(key);
    index = Math.max(0, orbitOrder.indexOf(key as (typeof orbitOrder)[number]));

    if (!caption) return;
    window.clearTimeout(captionTimer);
    caption.classList.add('is-updating');
    captionTimer = window.setTimeout(() => {
      caption.textContent = orbitDetails[key] ?? '';
      caption.classList.remove('is-updating');
    }, userDriven ? 80 : 160);
  };

  const tick = (): void => {
    if (paused || locked || document.hidden) return;
    index = (index + 1) % orbitOrder.length;
    select(orbitOrder[index]);
  };

  const start = (): void => {
    if (reduceMotion || timer !== undefined) return;
    timer = window.setInterval(tick, 2600);
  };

  const stop = (): void => {
    if (timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };

  const resumeSoon = (): void => {
    window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      locked = false;
      paused = false;
    }, 4200);
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      locked = true;
      paused = true;
      select(button.dataset.orbit ?? 'architecture', true);
      resumeSoon();
    });
    button.addEventListener('pointerenter', () => {
      paused = true;
      select(button.dataset.orbit ?? 'architecture', true);
      board?.classList.add('is-hot');
    });
    button.addEventListener('pointerleave', () => {
      if (!locked) paused = false;
      board?.classList.remove('is-hot');
    });
    button.addEventListener('focus', () => {
      paused = true;
      select(button.dataset.orbit ?? 'architecture', true);
    });
  });

  if (board && !reduceMotion) {
    board.addEventListener('pointermove', (event) => {
      const rect = board.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
      const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
      board.style.setProperty('--orbit-x', `${Math.min(100, Math.max(0, x))}%`);
      board.style.setProperty('--orbit-y', `${Math.min(100, Math.max(0, y))}%`);
    });
  }

  hero.addEventListener('pointerleave', () => {
    if (!locked) paused = false;
    board?.classList.remove('is-hot');
    if (board) {
      board.style.setProperty('--orbit-x', '50%');
      board.style.setProperty('--orbit-y', '50%');
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  paint(orbitOrder[0]);
  start();
}

function openCalendly(url: string): void {
  const existing = document.querySelector<HTMLScriptElement>('script[data-calendly-widget]');
  const launch = (): void => {
    const calendly = (window as Window & { Calendly?: { initPopupWidget: (opts: { url: string }) => void } }).Calendly;
    if (calendly?.initPopupWidget) {
      calendly.initPopupWidget({ url });
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (existing) {
    launch();
    return;
  }

  if (!document.querySelector('link[data-calendly-css]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.setAttribute('data-calendly-css', 'true');
    document.head.appendChild(link);
  }

  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  script.setAttribute('data-calendly-widget', 'true');
  script.onload = launch;
  script.onerror = () => window.open(url, '_blank', 'noopener,noreferrer');
  document.body.appendChild(script);
}

function initCalendly(): void {
  document.querySelectorAll<HTMLAnchorElement>('[data-calendly-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const url = link.href;
      if (!url.startsWith('https://')) return;
      event.preventDefault();
      openCalendly(url);
    });
  });

  const embeds = document.querySelectorAll<HTMLIFrameElement>('[data-calendly-embed]');
  const syncEmbedTheme = (): void => {
    const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    embeds.forEach((frame) => {
      try {
        const current = new URL(frame.src);
        if (theme === 'dark') {
          current.searchParams.set('background_color', '0e1410');
          current.searchParams.set('text_color', 'e8efe6');
          current.searchParams.set('primary_color', '3c9650');
        } else {
          current.searchParams.set('background_color', 'f4f7f1');
          current.searchParams.set('text_color', '181e1a');
          current.searchParams.set('primary_color', '1c6d2e');
        }
        frame.src = current.toString();
      } catch {
        /* ignore */
      }
    });
  };

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => window.setTimeout(syncEmbedTheme, 0));
  });
}

function initHeroEntrance(): void {
  const hero = document.querySelector('.hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('is-ready');
    return;
  }
  requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));
}

function init(): void {
  initTheme();
  initHeroEntrance();
  initCalendly();

  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const nav = document.querySelector<HTMLElement>('[data-main-nav]');
  if (toggle && nav) {
    const close = (): void => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
    };
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
    document.addEventListener('click', (event) => {
      if (event.target instanceof Node && !nav.contains(event.target) && !toggle.contains(event.target)) close();
    });
  }

  const hero = document.querySelector<HTMLElement>('[data-hero-architecture]');
  if (hero) initOrbit(hero);

  document.querySelectorAll<HTMLElement>('[data-project-diagram]').forEach((diagram) => {
    const explanation = diagram.querySelector<HTMLElement>('.diagram-explanation');
    diagram.querySelectorAll<HTMLButtonElement>('[data-node-label]').forEach((button) => {
      button.addEventListener('click', () => {
        activateExclusive(diagram, '[data-node-label]', button);
        if (explanation) explanation.textContent = button.dataset.nodeDetail ?? '';
      });
    });
  });

  const architecture = document.querySelector<HTMLElement>('[data-architecture-stage]');
  if (architecture) {
    const summary = architecture.querySelector<HTMLElement>('[data-architecture-description]');
    architecture.querySelectorAll<HTMLButtonElement>('[data-architecture-step]').forEach((button) => {
      button.addEventListener('click', () => {
        activateExclusive(architecture, '[data-architecture-step]', button);
        const index = Number(button.dataset.architectureStep);
        if (summary && Number.isInteger(index)) summary.textContent = button.dataset.architectureDetail ?? '';
      });
    });
  }

  const process = document.querySelector<HTMLElement>('[data-process]');
  if (process) {
    const summary = process.querySelector<HTMLElement>('[data-process-detail]');
    const number = process.querySelector<HTMLElement>('[data-process-number]');
    process.querySelectorAll<HTMLButtonElement>('[data-process-step]').forEach((button) => {
      button.addEventListener('click', () => {
        activateExclusive(process, '[data-process-step]', button);
        const index = Number(button.dataset.processStep);
        if (summary && Number.isInteger(index)) summary.textContent = button.dataset.processDetailText ?? '';
        if (number) number.textContent = String(index + 1).padStart(2, '0');
      });
    });
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
