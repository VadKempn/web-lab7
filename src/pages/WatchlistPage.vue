<template>
  <section>
    <h2>Мой список</h2>
    <p style="color: #999; margin: 0 0 20px 0;">Добавляй свои аниме♥️</p>

    <div class="wl-filters">
      <button 
        v-for="filter in filters"
        :key="filter"
        @click="currentFilter = filter"
        :class="['wl-filter', { active: currentFilter === filter }]"
      >
        {{ getFilterLabel(filter) }}
      </button>
    </div>

    <form @submit.prevent="addItem" class="wl-form">
      <input 
        v-model="newTitle"
        type="text"
        placeholder="Название аниме"
        required
      />
      <select v-model="newStatus">
        <option value="planning">Планирую</option>
        <option value="watching">Смотрю</option>
        <option value="done">Просмотрено</option>
      </select>
      <input 
        v-model.number="newScore"
        type="number"
        min="0"
        max="10"
        step="0.1"
        placeholder="Оценка"
      />
      <button type="submit" class="btn btn--primary">Добавить</button>
    </form>

    <ul v-if="filteredItems.length > 0" class="wl-list">
      <li v-for="item in filteredItems" :key="item.id" class="wl-item">
        <div class="wl-main">
          <div>
            <div :class="['wl-title', { 'is-done': item.status === 'done' }]">
              {{ item.title }}
            </div>
            <div class="wl-badges">
              <span class="wl-status">{{ getStatusLabel(item.status) }}</span>
              <span v-if="item.score" class="wl-score">⭐ {{ item.score }}/10</span>
            </div>
          </div>
        </div>
        <div class="wl-actions">
          <button 
            class="btn btn--ghost"
            @click="toggleStatus(item.id)"
          >
            {{ item.status === 'done' ? '↩' : '✓' }}
          </button>
          <button 
            class="btn btn--ghost"
            @click="deleteItem(item.id)"
          >
            🗑
          </button>
        </div>
      </li>
    </ul>

    <div v-else class="wl-empty">
      Здесь пока ничего нет. Добавьте первое аниме!
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { 
  loadWatchlist, 
  saveWatchlist, 
  getStatusLabel 
} from '../services/watchlistStore';

const items = ref(loadWatchlist());
const currentFilter = ref('all');
const newTitle = ref('');
const newStatus = ref('planning');
const newScore = ref(null);

const filters = ['all', 'planning', 'watching', 'done'];

const filteredItems = computed(() => {
  if (currentFilter.value === 'all') {
    return items.value;
  }
  return items.value.filter(x => x.status === currentFilter.value);
});

const getFilterLabel = (filter) => {
  const labels = {
    'all': 'Все',
    'planning': 'Планирую',
    'watching': 'Смотрю',
    'done': 'Просмотрено'
  };
  return labels[filter] || filter;
};

const addItem = () => {
  if (!newTitle.value.trim()) return;
  
  const item = {
    id: Date.now(),
    title: newTitle.value.trim(),
    status: newStatus.value,
    score: newScore.value ? Number(newScore.value) : null
  };
  
  items.value.unshift(item);
  saveWatchlist(items.value);
  
  newTitle.value = '';
  newStatus.value = 'planning';
  newScore.value = null;
};

const deleteItem = (id) => {
  if (confirm('Удалить это аниме?')) {
    items.value = items.value.filter(x => x.id !== id);
    saveWatchlist(items.value);
  }
};

const toggleStatus = (id) => {
  const item = items.value.find(x => x.id === id);
  if (item) {
    if (item.status === 'done') {
      item.status = 'watching';
    } else if (item.status === 'watching') {
      item.status = 'done';
    } else {
      item.status = 'watching';
    }
    saveWatchlist(items.value);
  }
};
</script>

<style scoped>
section {
  background: var(--panel);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--shadow);
}

section h2 {
  margin: 0 0 8px 0;
  color: var(--text);
}

.wl-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.wl-filter {
  padding: 6px 12px;
  border: 1px solid #333;
  background: transparent;
  color: var(--text);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.wl-filter:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.wl-filter.active {
  color: var(--brand);
  text-decoration: underline;
  border-color: var(--brand);
  background: rgba(26, 188, 156, 0.1);
}

.wl-form {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 10px;
  margin: 12px 0 20px;
}

.wl-form input,
.wl-form select {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #333;
  background: #2a2a2a;
  color: var(--text);
  font-family: inherit;
}

.wl-form input:focus,
.wl-form select:focus {
  outline: none;
  border-color: var(--brand);
}

.wl-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.wl-item {
  background: var(--panel-2);
  border: 1px solid #2f2f2f;
  border-radius: 12px;
  padding: 10px 12px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 12px;
}

.wl-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.wl-title {
  font-weight: 600;
  color: var(--text);
}

.wl-title.is-done {
  opacity: 0.7;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.wl-badges {
  display: flex;
  gap: 8px;
  font-size: 0.9rem;
  opacity: 0.9;
}

.wl-status,
.wl-score {
  background: #232323;
  padding: 3px 8px;
  border-radius: 999px;
  color: #ccc;
}

.wl-actions {
  display: flex;
  gap: 6px;
}

.wl-actions .btn {
  padding: 6px 8px;
  font-size: 0.9rem;
}

.btn {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  background: transparent;
  color: var(--link);
  border: 1px solid #333;
}

.btn:hover {
  background: rgba(52, 152, 219, 0.1);
  border-color: var(--link);
}

.btn--primary {
  background: var(--brand);
  color: #082c25;
  border: none;
}

.btn--primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.wl-empty {
  opacity: 0.7;
  padding: 20px;
  text-align: center;
  color: #999;
}

@media (max-width: 720px) {
  .wl-form {
    grid-template-columns: 1fr 1fr;
  }

  .wl-form input:nth-child(3),
  .wl-form button {
    grid-column: 1 / -1;
  }
}
</style>
