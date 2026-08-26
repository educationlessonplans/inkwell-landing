(() => {
  const root = document.documentElement;
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  root.classList.add('js');
  if (!reducedMotionQuery.matches) root.classList.add('motion-ok');

  const header = document.querySelector('[data-header]');
  const hero = document.querySelector('[data-hero]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');

  if (header && hero && 'IntersectionObserver' in window) {
    const headerObserver = new IntersectionObserver(
      ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
      { rootMargin: '-78px 0px 0px 0px', threshold: 0 }
    );
    headerObserver.observe(hero);
  } else if (header) {
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 64);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  if (navToggle && navLinks) {
    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
    };

    navToggle.addEventListener('click', () => {
      const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(willOpen));
      navLinks.classList.toggle('is-open', willOpen);
    });

    navLinks.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  const revealElements = [...document.querySelectorAll('.reveal')];

  function revealEverything() {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  if (!reducedMotionQuery.matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' }
    );
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealEverything();
  }

  const bindingDemo = document.querySelector('[data-binding]');
  if (bindingDemo && !reducedMotionQuery.matches && 'IntersectionObserver' in window) {
    const bindingObserver = new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-bound');
        observer.unobserve(entry.target);
      },
      { threshold: 0.42 }
    );
    bindingObserver.observe(bindingDemo);
  }

  function createWordRotator(element, delay = 2600) {
    if (!element || reducedMotionQuery.matches) return () => {};
    const words = (element.dataset.words || '')
      .split('|')
      .map((word) => word.trim())
      .filter(Boolean);
    if (words.length < 2) return () => {};

    let index = Math.max(0, words.indexOf(element.textContent.trim()));
    let timeoutId;
    let stopped = false;

    const rotate = () => {
      if (stopped) return;
      element.classList.remove('swap-in');
      element.classList.add('swap-out');
      timeoutId = window.setTimeout(() => {
        index = (index + 1) % words.length;
        element.textContent = words[index];
        element.classList.remove('swap-out');
        element.classList.add('swap-in');
        timeoutId = window.setTimeout(rotate, delay);
      }, 280);
    };

    timeoutId = window.setTimeout(rotate, delay);
    return () => {
      stopped = true;
      window.clearTimeout(timeoutId);
      element.classList.remove('swap-in', 'swap-out');
    };
  }

  let stopHeroWords = createWordRotator(document.querySelector('.word-swap'), 3100);
  let stopStatementWords = createWordRotator(document.querySelector('.statement-swap'), 2300);

  const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
  let parallaxFrame = 0;

  function renderParallax() {
    parallaxFrame = 0;
    const viewportCenter = window.innerHeight / 2;
    parallaxItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const factor = Number(item.dataset.parallax || 0);
      const delta = (rect.top + rect.height / 2 - viewportCenter) * factor;
      item.style.translate = `0 ${Math.max(-32, Math.min(32, delta))}px`;
    });
  }

  function requestParallax() {
    if (parallaxFrame || reducedMotionQuery.matches) return;
    parallaxFrame = window.requestAnimationFrame(renderParallax);
  }

  if (parallaxItems.length && !reducedMotionQuery.matches) {
    renderParallax();
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax, { passive: true });
  }

  reducedMotionQuery.addEventListener?.('change', (event) => {
    if (event.matches) {
      root.classList.remove('motion-ok');
      stopHeroWords();
      stopStatementWords();
      revealEverything();
      parallaxItems.forEach((item) => { item.style.translate = ''; });
      bindingDemo?.classList.remove('is-bound');
      return;
    }

    root.classList.add('motion-ok');
    stopHeroWords = createWordRotator(document.querySelector('.word-swap'), 3100);
    stopStatementWords = createWordRotator(document.querySelector('.statement-swap'), 2300);
    requestParallax();
  });
})();
