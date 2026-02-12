(function () {
  const LAST_PAGE_KEY = 'mun:lastPage';
  const DEFAULT_PAGE = 'home';

  function setActivePageLink(page) {
    document.querySelectorAll('[data-page]').forEach((link) => {
      const isActive = link.getAttribute('data-page') === page;
      link.classList.toggle('active', isActive);
    });
  }

  function getInitialPage() {
    const savedPage = localStorage.getItem(LAST_PAGE_KEY);
    if (!savedPage) return DEFAULT_PAGE;

    const hasMatchingLink = !!document.querySelector(`[data-page="${savedPage}"]`);
    return hasMatchingLink ? savedPage : DEFAULT_PAGE;
  }

  async function navigateToPage(page, persist = true) {
    window.AppComponents.loadPageStyles(page);
    await window.AppComponents.loadPage(page);
    await window.AppComponents.loadPageScript(page);

    setActivePageLink(page);
    window.AppAnimations.initScrollAnimations();
    window.AppComponents.initPageScripts(page);

    if (persist) {
      localStorage.setItem(LAST_PAGE_KEY, page);
    }
  }

  function initRouter() {
    const initialPage = getInitialPage();
    navigateToPage(initialPage, false).catch((err) => {
      console.error('Failed to load initial page:', err);
    });

    document.addEventListener('click', (e) => {
      const targetLink = e.target.closest('[data-page]');
      if (!targetLink) return;

      e.preventDefault();
      const page = targetLink.getAttribute('data-page');
      if (!page) return;

      navigateToPage(page).catch((err) => {
        console.error('Failed to navigate to page:', err);
      });
    });
  }

  window.AppRouter = {
    initRouter,
    navigateToPage,
  };
})();
