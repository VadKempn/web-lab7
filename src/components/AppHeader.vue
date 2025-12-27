<template>
  <header>
    <div class="brand">
      <h1>AnimeReviews</h1>
    </div>
    <nav>
      <ul>
        <li><router-link to="/" :class="{ active: $route.path === '/' }">Главная</router-link></li>
        <li><router-link to="/news" :class="{ active: $route.path === '/news' }">Новости</router-link></li>
        <li><router-link to="/top" :class="{ active: $route.path === '/top' }">Топ</router-link></li>
        <li><router-link to="/reviews" :class="{ active: $route.path === '/reviews' }">Рецензии</router-link></li>
        <li><router-link to="/about" :class="{ active: $route.path === '/about' }">О нас</router-link></li>
        <li><router-link to="/contacts" :class="{ active: $route.path === '/contacts' }">Контакты</router-link></li>
        <li><router-link to="/watchlist" :class="{ active: $route.path === '/watchlist' }">Мой список</router-link></li>
      </ul>
    </nav>
    <button id="openAuth" class="btn btn--primary" @click="openAuthModal">Вход</button>
  </header>
</template>

<script setup>
import { inject } from 'vue';

const openAuthModal = () => {
  const modalCtx = inject('authModal');
  if (modalCtx) modalCtx.isOpen = true;
};
</script>

<style scoped>
header {
  background: #1e1e1e;
  color: var(--text);
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.brand h1 {
  margin: 0;
  color: var(--brand);
  text-transform: uppercase;
  font-size: 1.5rem;
}

nav ul {
  display: flex;
  gap: 22px;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  color: var(--text);
  font-weight: 500;
  font-size: 1.05rem;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
}

nav a:hover {
  color: var(--brand);
  transform: translateY(-2px);
}

nav a.active {
  color: var(--brand);
  text-decoration: underline;
  text-underline-offset: 4px;
}

@media (max-width: 720px) {
  header {
    flex-direction: column;
    gap: 8px;
    text-align: center;
    padding: 10px 40px 10px 40px;
  }

  nav ul {
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  #openAuth {
    position: absolute;
    top: 16px;
    right: 18px;
    margin: 0;
  }
}
</style>
