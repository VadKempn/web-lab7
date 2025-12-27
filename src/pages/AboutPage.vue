<template>
  <section>
    <h2>Наша миссия</h2>
    <p>Мы создаем платформу для <strong>объективных</strong> рецензий на аниме, где каждый пользователь может <em>поделиться своим мнением</em> и найти новые интересные тайтлы.</p>

    <h3>Команда проекта</h3>
    <ul>
      <li><strong>Vidmi</strong> — разработка фронтенда</li>
      <li><strong>Vidmi</strong> — дизайн и UX</li>
      <li><strong>Vidmi</strong> — backend и база данных</li>
    </ul>
    <p><em>Как же жаль, что ничего из этого пока нет🙂</em></p>

    <h3>Цитата о творчестве</h3>
    <blockquote>
      «Аниме — это окно в другой мир, где каждый найдёт что-то своё.» — Команда AnimeReviews
    </blockquote>
  </section>
</template>

<style scoped>
section {
  background: var(--panel);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  max-width: 700px;
  margin: 0 auto;
}

section h2,
section h3 {
  margin: 24px 0 12px 0;
  color: var(--text);
}

section p {
  margin: 0 0 12px 0;
  color: #ccc;
  line-height: 1.6;
}

section ul {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
}

section li {
  padding: 6px 0;
  color: #ccc;
}

blockquote {
  border-left: 4px solid var(--brand);
  padding-left: 16px;
  margin: 12px 0;
  color: #999;
  font-style: italic;
}
</style>
