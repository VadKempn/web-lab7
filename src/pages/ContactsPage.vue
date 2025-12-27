<template>
  <section>
    <h2>Свяжитесь с нами</h2>
    
    <div style="margin: 20px 0;">
      <p><strong>Email:</strong> <a href="mailto:Drama@dram.ru">Drama@dram.ru</a></p>
      <p><strong>Телефон:</strong> +7 (444) 414-14-14</p>
      <p><strong>Telegram:</strong> <a href="https://t.me/AnimeReviewsSupport" target="_blank">@AnimeReviewsSupport</a></p>
      <p><strong>Чат:</strong> скоро</p>
    </div>

    <h3 style="margin-top: 24px;">Форма обратной связи</h3>
    <form @submit.prevent="handleSubmit" style="
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
    ">
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label for="name">Имя:</label>
        <input v-model="form.name" type="text" id="name" placeholder="Ваше имя" required />
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label for="email">Email:</label>
        <input v-model="form.email" type="email" id="email" placeholder="your@email.com" required />
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label for="message">Сообщение:</label>
        <textarea v-model="form.message" id="message" placeholder="Ваше сообщение..." rows="5" required></textarea>
      </div>
      <button type="submit" class="btn btn--primary">Отправить</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const handleSubmit = () => {
  alert(`Спасибо, ${form.value.name}! Ваше сообщение отправлено.`);
  form.value = { name: '', email: '', message: '' };
};
</script>

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
  margin: 0 0 16px 0;
  color: var(--text);
}

section p {
  margin: 8px 0;
  color: #ccc;
}

section a {
  color: var(--link);
  text-decoration: none;
}

section a:hover {
  text-decoration: underline;
}

input[type="text"],
input[type="email"],
textarea {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: var(--text);
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 2px rgba(26, 188, 156, 0.2);
}

label {
  font-weight: 600;
  color: var(--text);
}

.btn {
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn--primary {
  background: var(--brand);
  color: #082c25;
}

.btn--primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>
