<template>
  <section>
    <h2>Топ 5 аниме</h2>
    <ul style="
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-auto-rows: 1fr;
      gap: 12px;
    ">
      <li v-for="(anime, idx) in topList" :key="idx" style="
        background: var(--panel-2);
        padding: 12px;
        border-radius: 8px;
        border-left: 4px solid var(--brand);
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <span style="font-weight: 600;">{{ anime.title }}</span>
        <span style="color: var(--brand); font-weight: 700;">{{ anime.rating }}/10</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const topList = ref([
  { title: 'Тетрадь смерти', rating: '10' },
  { title: 'Атака титанов', rating: '10' },
  { title: 'Что ты будешь делать во время апокалипсиса?', rating: '10' },
  { title: 'Твоя апрельская ложь', rating: '10' },
  { title: 'Восемьдесят шесть', rating: '10' }
]);
</script>

<style scoped>
section {
  background: var(--panel);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  max-width: 600px;
  margin: 0 auto;
}

section h2 {
  margin: 0 0 20px 0;
  color: var(--text);
}
</style>
