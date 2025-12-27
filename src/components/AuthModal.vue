<template>
  <div id="authModal" class="modal" :class="{ open: isOpen }">
    <div class="modal__card">
      <div class="modal__header">
        <h2>Вход в AnimeReviews</h2>
        <button id="closeAuthBtn" class="modal__close" @click="closeModal">&times;</button>
      </div>
      <form id="authForm" @submit.prevent="handleSubmit">
        <div class="form-field">
          <label for="authEmail">Email</label>
          <input type="email" id="authEmail" placeholder="Drama@dram.ru" required />
        </div>
        <div class="form-field">
          <label for="authPassword">Пароль</label>
          <input type="password" id="authPassword" placeholder="••••••••" required />
        </div>
        <div class="auth-actions">
          <label>
            <input type="checkbox" id="rememberMe" />
            Запомнить меня
          </label>
          <button type="submit" class="btn btn--primary">Войти</button>
        </div>
      </form>
      <p style="margin-top: 12px; text-align: center; font-size: 0.9rem; color: #999;">
        Нет аккаунта? <a href="#" style="color: var(--link);">Регистрация</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const isOpen = ref(false);

const closeModal = () => {
  isOpen.value = false;
};

const handleSubmit = () => {
  alert('Вход выполнен (демо-версия)');
  closeModal();
};

provide('authModal', { isOpen });
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal.open {
  display: flex;
}

.modal__card {
  width: min(92vw, 420px);
  background: var(--panel);
  border-radius: 14px;
  padding: 22px;
  box-shadow: var(--shadow);
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.modal__header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.modal__close {
  background: transparent;
  border: none;
  color: #bbb;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 10px 0;
}

.form-field label {
  font-weight: 600;
  font-size: 0.95rem;
}

input[type="email"],
input[type="password"],
input[type="checkbox"] {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: var(--text);
  font-family: inherit;
}

input[type="checkbox"] {
  width: auto;
  padding: 0;
  margin-right: 6px;
}

.auth-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
}

.auth-actions label {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  margin: 0;
  font-weight: normal;
}
</style>
