(function () {
  let revealObserver = null;

  function initScrollAnimations() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    const revealTargets = mainContent.querySelectorAll(
      '.event-card, .program-card, .conference-card, .conference-vertical-card, .letter-card, .hero .container, .events-section1-content, .content .container, [data-reveal]'
    );

    revealTargets.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 280)}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    if (revealObserver) {
      revealObserver.disconnect();
    }

    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -4% 0px',
      }
    );

    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  window.AppAnimations = {
    initScrollAnimations,
  };
})();
