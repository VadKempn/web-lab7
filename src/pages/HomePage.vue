<template>
  <section>
    <h2>Лучшие аниме</h2>
    <div class="grid-gallery">
      <figure v-for="anime in animeList" :key="anime.id">
        <img :src="anime.image" :alt="anime.title" />
        <figcaption>{{ anime.title }} — {{ anime.rating }}/10</figcaption>
      </figure>
    </div>
  </section>
  <aside>
    <h3>Топ 5 рейтинга</h3>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li v-for="anime in topAnime" :key="anime.id" style="padding: 8px 0; border-bottom: 1px solid #333;">
        {{ anime.title }} — {{ anime.rating }}/10
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const animeList = ref([
  {
    id: 1,
    title: 'Атака титанов',
    image: '/images/attack_on_titan.jpg',
    rating: 10
  },
  {
    id: 2,
    title: 'Наруто',
    image: '/images/naruto.jpg',
    rating: 9
  },
  {
    id: 3,
    title: 'Тетрадь смерти',
    image: '/images/death_note.jpg',
    rating: 10
  },
  {
    id: 4,
    title: 'Твоя апрельская ложь',
    image: '/images/your_lie_in_april.jpg',
    rating: 10
  },
  {
    id: 5,
    title: 'Восемьдесят шесть',
    image: '/images/86.jpg',
    rating: 10
  },
  {
    id: 6,
    title: 'Демоница',
    image: '/images/Demon.jpg',
    rating: 8
  },
  {
    id: 7,
    title: 'Что будешь делать во время апокалипсиса?',
    image: '/images/sukasuka.jpg',
    rating: 10
  }
]);

const topAnime = ref([
  { id: 1, title: 'Тетрадь смерти', rating: 10 },
  { id: 2, title: 'Атака титанов', rating: 10 },
  { id: 3, title: 'Что ты будешь делать во время апокалипсиса?', rating: 10 },
  { id: 4, title: 'Твоя апрельская ложь', rating: 10 },
  { id: 5, title: 'Восемьдесят шесть', rating: 10 }
]);
</script>

<style scoped>
section {
  background: var(--panel);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--shadow);
}

section h2 {
  margin: 0 0 20px 0;
  color: var(--text);
}

.grid-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.grid-gallery figure {
  margin: 0;
  background: #1f1f1f;
  border-radius: 14px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.grid-gallery figure:hover {
  transform: scale(1.02);
}

.grid-gallery img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.grid-gallery figcaption {
  padding: 10px 12px;
  font-weight: 600;
  border-top: 1px solid #2c2c2c;
}

aside {
  background: var(--panel);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  height: fit-content;
}

aside h3 {
  margin: 0 0 16px 0;
  color: var(--text);
}

aside li {
  color: var(--text);
  font-size: 0.95rem;
}

@media (max-width: 720px) {
  .grid-gallery {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
  }

  .grid-gallery img {
    height: 150px;
  }
}

@media (min-width: 1366px) {
  .grid-gallery {
    grid-template-columns: repeat(4, minmax(240px, 1fr));
  }
}

@media (min-width: 1920px) {
  .grid-gallery {
    grid-template-columns: repeat(5, minmax(240px, 1fr));
  }
}
</style>
