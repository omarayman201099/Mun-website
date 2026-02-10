async function loadComponent(id, file) {
  const el = document.getElementById(id);
  const res = await fetch(file);
  el.innerHTML = await res.text();
}

async function loadPage(page) {
  const mainContent = document.getElementById('main-content');
  const res = await fetch(`pages/${page}.html`);
  mainContent.innerHTML = await res.text();
}

function initRouter() {
  // Load initial page
  loadPage('home');

  // Add event listeners to navbar links
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-page]')) {
      e.preventDefault();
      const page = e.target.getAttribute('data-page');
      loadPage(page);

      // Update active class
      document.querySelectorAll('[data-page]').forEach(link => link.classList.remove('active'));
      e.target.classList.add('active');
    }
  });
}

loadComponent("navbar", "components/navbar/navbar.html");
loadComponent("footer", "components/footer/footer.html");



setTimeout(initRouter, 100);
