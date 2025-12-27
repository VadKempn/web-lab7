<template>
  <footer>
    <p>&copy; 2025 AnimeReviews. Все права защищены.</p>
    <div class="footer-banner">Ваша платформа для объективных рецензий на аниме</div>
  </footer>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.addEventListener('load', () => {
    let loadMs = 0;
    const nav = performance.getEntriesByType('navigation')[0];
    
    if (nav && nav.duration && nav.duration > 0) {
      loadMs = nav.duration;
    } else {
      const t = performance.timing;
      const end = t.loadEventEnd && t.loadEventEnd > 0 ? t.loadEventEnd : Date.now();
      const start = t.navigationStart && t.navigationStart > 0 ? t.navigationStart : t.fetchStart;
      loadMs = end - start;
    }
    
    if (!isFinite(loadMs) || loadMs < 0) loadMs = 0;
    const loadSec = (loadMs / 1000).toFixed(3);
    
    const footer = document.querySelector('footer');
    if (footer) {
      const p = document.createElement('p');
      p.id = 'loadTime';
      p.textContent = `Время загрузки: ${loadSec} сек.`;
      footer.appendChild(p);
    }
  });
});
</script>

<style scoped>
footer {
  background: #1e1e1e;
  color: var(--text);
  text-align: center;
  padding: 12px 20px;
  font-size: 0.9rem;
  margin-top: auto;
}

footer p {
  margin: 8px 0;
}

.footer-banner {
  margin: 16px auto 0;
  max-width: 1280px;
  height: 120px;
  background: #2b2b2b;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

#loadTime {
  font-size: 0.85rem;
  color: #999;
  margin-top: 10px;
}

@media (max-width: 720px) {
  .footer-banner {
    display: none;
  }
}
</style>
