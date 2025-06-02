document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  const intro = document.getElementById('intro');
  const gallery = document.getElementById('galeri');
  const template = document.getElementById('template-memori');

  // Buat isi template
  const wrap = document.createElement('div');
  wrap.classList.add('memori-wrap');

  for (let i = 1; i <= 100; i++) {
    const img = document.createElement('img');
    const ext = i >= 99 ? 'JPEG' : 'jpg';
    img.src = `img/${i}.${ext}`;
    img.className = 'memori-item';
    img.loading = 'lazy';
    img.alt = `Memori ${i}`;
    wrap.appendChild(img);
  }

  template.content.appendChild(wrap);

  // Ulang beberapa kali
  const repeatCount = 3;
  for (let i = 0; i < repeatCount; i++) {
    const clone = template.content.cloneNode(true);
    gallery.appendChild(clone);
  }

  const items = gallery.querySelectorAll('.memori-item');

  // Intro fade-out
  setTimeout(() => {
    intro.classList.add('fade-out');
  }, 4000);

  setTimeout(() => {
    intro.style.display = 'none';
  }, 5000);

  setTimeout(() => {
    gallery.classList.add('show');

    setTimeout(() => {
      items.forEach((item) => {
        const offsetX = Math.random() * 400 - 200;
        const offsetY = Math.random() * 400 - 200;
        const rotate = Math.random() * 60 - 30;
        item.style.transition = 'transform 1s ease, opacity 1s ease';
        item.style.opacity = '1';
        item.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg) scale(1.1)`;
      });

      // Rapihin satu-satu
      setTimeout(() => {
        items.forEach((item, i) => {
          setTimeout(() => {
            item.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
          }, i * 800);
        });

        // Auto-scroll
        let currentScroll = 0;
        let scrollSpeed = 0.2;
        let scrolling = true;

        function autoScroll() {
          if (!scrolling) return;
          currentScroll += scrollSpeed;
          if (currentScroll < document.body.scrollHeight - window.innerHeight) {
            window.scrollTo(0, currentScroll);
            requestAnimationFrame(autoScroll);
          }
        }

        setTimeout(() => autoScroll(), 500);
        window.addEventListener('wheel', () => (scrolling = false));
        window.addEventListener('touchstart', () => (scrolling = false));
      }, 2000);
    }, 1000);
  }, 5200);
});

// Cek preferensi unmute
window.addEventListener('load', () => {
  const video = document.getElementById('memoryVideo');
  if (localStorage.getItem('unmute') === 'true' && video) {
    video.muted = false;
    video.play().catch((err) => console.log('Autoplay gagal:', err));
  }
});
