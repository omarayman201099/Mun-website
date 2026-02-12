(function () {
  async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) {
      throw new Error(`Missing mount element: #${id}`);
    }

    const res = await fetch(file);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${file}: ${res.status} ${res.statusText}`);
    }

    el.innerHTML = await res.text();
  }

  async function loadPage(page) {
    const mainContent = document.getElementById('main-content');
    const res = await fetch(`pages/${page}.html`);
    if (!res.ok) {
      throw new Error(`Failed to fetch page ${page}: ${res.status} ${res.statusText}`);
    }

    mainContent.innerHTML = await res.text();
  }

  function loadPageStyles(page) {
    const styleId = 'page-stylesheet';
    let link = document.getElementById(styleId);

    if (!link) {
      link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    link.href = `css/pages/${page}.css`;
  }

  function loadPageScript(page) {
    return new Promise((resolve) => {
      const scriptId = 'page-script';
      let script = document.getElementById(scriptId);

      if (script) {
        script.remove();
      }

      script = document.createElement('script');
      script.id = scriptId;
      script.src = `js/pages/${page}.js`;
      script.onload = () => resolve();
      script.onerror = () => resolve(); // Resolve even on error (page might not have custom JS)
      document.head.appendChild(script);
    });
  }

  function initPageScripts(page) {
    if (window.AppPages && window.AppPages[page] && window.AppPages[page].init) {
      window.AppPages[page].init();
    }
  }

  window.AppComponents = {
    loadComponent,
    loadPage,
    loadPageStyles,
    loadPageScript,
    initPageScripts,
  };
})();
