(async function () {
  try {
    await Promise.all([
      window.AppComponents.loadComponent('navbar', 'components/navbar/navbar.html'),
      window.AppComponents.loadComponent('footer', 'components/footer/footer.html'),
    ]);

    if (typeof initNavbar === 'function') {
      initNavbar();
    }

    window.AppRouter.initRouter();
  } catch (err) {
    console.error('Failed to load app:', err);
  }
})();
