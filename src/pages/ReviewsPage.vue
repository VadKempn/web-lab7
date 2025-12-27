<template>
  <section>
    <h2>Рецензии на аниме</h2>
    
    <div class="table-wrap">
      <table class="fin">
        <thead>
          <tr>
            <th>Жанр</th>
            <th>Количество сериалов</th>
            <th>Средняя оценка</th>
            <th>Просмотры (млн)</th>
            <th>Рост популярности</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in tableData" :key="row.genre">
            <td>{{ row.genre }}</td>
            <td>{{ row.count }}</td>
            <td>{{ row.rating }}</td>
            <td>{{ row.views }}</td>
            <td :style="{ color: row.growth.includes('-') ? '#ff5459' : 'var(--brand)' }">
              {{ row.growth }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <article style="margin-top: 24px;">
      <h3>Токийский гуль — 8/10</h3>
      <p>Очень увлекательное аниме с <strong>интересным сюжетом</strong> и неожиданными поворотами.</p>
      <blockquote style="border-left: 3px solid var(--brand); padding-left: 12px; margin: 12px 0; color: #999;">
        «Эта история держит в напряжении с первой до последней серии.» — AnimeLover77
      </blockquote>
      <p>Классика жанра, где каждая сцена захватывает внимание.</p>
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const tableData = ref([
  { genre: 'Экшен', count: '135', rating: '9.1', views: '14.3', growth: '+12%' },
  { genre: 'Фэнтези', count: '112', rating: '8.9', views: '12.7', growth: '+9%' },
  { genre: 'Романтика', count: '78', rating: '8.4', views: '9.1', growth: '+5%' },
  { genre: 'Драма', count: '66', rating: '8.8', views: '8.6', growth: '+90%' },
  { genre: 'Комедия', count: '59', rating: '7.9', views: '6.4', growth: '-2%' },
  { genre: 'Мистика', count: '42', rating: '8.6', views: '5.8', growth: '+4%' },
  { genre: 'Сёнен', count: '51', rating: '9.0', views: '11.2', growth: '+8%' }
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

.table-wrap {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 20px;
}

table.fin {
  display: grid;
  grid-template-columns: 180px 180px 160px 180px 180px;
  width: max-content;
  min-width: 900px;
  border-collapse: collapse;
  border-radius: 10px;
  box-shadow: var(--shadow);
}

table.fin thead,
table.fin tbody,
table.fin tr {
  display: contents;
}

table.fin th,
table.fin td {
  padding: 8px 10px;
  border-bottom: 1px solid #303030;
  white-space: nowrap;
  line-height: 1.3;
  font-size: 0.95rem;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

table.fin th {
  background: #262626;
  color: #fff;
  font-weight: 700;
  position: sticky;
  top: 0;
  z-index: 1;
}

table.fin tbody tr:nth-child(odd) td {
  background: #232323;
}

table.fin tbody tr:nth-child(even) td {
  background: #1e1e1e;
}

article {
  background: var(--panel-2);
  padding: 15px;
  border-left: 5px solid var(--brand);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}

article h3 {
  margin: 0 0 12px 0;
  color: var(--text);
}

article p {
  margin: 0 0 12px 0;
  color: #ccc;
  line-height: 1.6;
}

@media (max-width: 720px) {
  table.fin {
    grid-template-columns: 120px 120px 100px 120px 120px;
    min-width: 600px;
  }

  table.fin th,
  table.fin td {
    padding: 6px 6px;
    font-size: 0.85rem;
  }
}
</style>
