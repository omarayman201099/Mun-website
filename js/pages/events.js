(function () {
  function initEventSliders() {
    const cards = document.querySelectorAll('.event-card');

    cards.forEach((card) => {
      const slider = card.querySelector('.event-slider');
      if (!slider) return;

      const images = slider.querySelectorAll('img');
      if (images.length <= 1) return;

      const prevBtn = card.querySelector('.event-slider-btn.prev');
      const nextBtn = card.querySelector('.event-slider-btn.next');
      if (!prevBtn || !nextBtn) return;

      let currentIndex = 0;
      const activeImage = slider.querySelector('img.active');
      if (activeImage) {
        currentIndex = Array.from(images).indexOf(activeImage);
      } else {
        images[0].classList.add('active');
      }

      const indexIndicator = document.createElement('span');
      indexIndicator.className = 'event-slider-index';
      slider.appendChild(indexIndicator);

      function showImage(index) {
        images.forEach((img) => img.classList.remove('active'));
        images[index].classList.add('active');
        indexIndicator.textContent = `${index + 1} / ${images.length}`;
      }

      showImage(currentIndex);

      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      });

      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });
    });
  }

  // Initialize sliders when events page is loaded
  if (window.AppPages) {
    window.AppPages.events = { init: initEventSliders };
  } else {
    window.AppPages = { events: { init: initEventSliders } };
  }
})();
