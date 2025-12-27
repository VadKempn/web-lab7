<template>
  <section>
    <h2>Свежие новости</h2>
    
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
      <button class="btn btn--primary" @click="loadAllNews">Загрузить все новости</button>
      <button class="btn btn--primary" @click="loadRandomNews">Случайные новости</button>
    </div>

    <div v-if="filterLabel" id="filterBadge" style="
      background: rgba(26, 188, 156, 0.15);
      color: var(--brand);
      padding: 8px 12px;
      border-radius: 8px;
      margin-bottom: 12px;
      font-size: 0.9rem;
    ">
      {{ filterLabel }}
    </div>

    <div v-if="isLoading" class="news-loader">
      <div class="spinner"></div>
      <p>Загрузка новостей с JSONPlaceholder...</p>
    </div>

    <div v-if="error" class="error-message">
      ️ {{ error }}
    </div>

    <div v-if="!isLoading && !error" class="news-list">
      <article v-for="post in posts" :key="post.id" class="post-card">
        <h3 class="post-title">{{ post.title }}</h3>
        <p class="post-body">{{ truncateText(post.body) }}</p>
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #999; margin-bottom: 10px;">
          <span class="post-id">#{{ post.id }}</span>
          <span class="post-author">Пользователь #{{ post.userId }}</span>
        </div>
        <button 
          class="btn btn--ghost" 
          @click="toggleComments(post.id)"
        >
          {{ expandedPostId === post.id ? ' Скрыть' : ' Комментарии' }}
          ({{ commentCounts[post.id] || 0 }})
        </button>

        <div v-if="expandedPostId === post.id" class="comments-section">
          <div class="comments-list">
            <div v-for="comment in comments[post.id] || []" :key="comment.id" style="
              background: #232323;
              padding: 12px;
              border-radius: 8px;
              margin-bottom: 8px;
              border-left: 3px solid var(--brand);
            ">
              <strong class="comment-author">{{ comment.name }}</strong>
              <div class="comment-email" style="font-size: 0.85rem; color: #999;">{{ comment.email }}</div>
              <p class="comment-body" style="margin: 8px 0 0 0;">{{ truncateText(comment.body, 100) }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { fetchPosts, fetchComments, getRandomUserId, truncateText } from '../services/newsService';

const posts = ref([]);
const comments = reactive({});
const commentCounts = reactive({});
const isLoading = ref(false);
const error = ref('');
const filterLabel = ref('');
const expandedPostId = ref(null);

async function loadAllNews() {
  isLoading.value = true;
  error.value = '';
  filterLabel.value = '';

  try {
    const data = await fetchPosts(null, 6);
    posts.value = data;
    filterLabel.value = ' Все новости';
    await loadCommentCounts();
  } catch (err) {
    error.value = err.message || 'Ошибка при загрузке новостей';
  } finally {
    isLoading.value = false;
  }
}

async function loadRandomNews() {
  isLoading.value = true;
  error.value = '';

  try {
    const userId = getRandomUserId();
    const data = await fetchPosts(userId, 6);
    
    if (!data || data.length === 0) {
      throw new Error('Новости не найдены для этого пользователя');
    }
    
    posts.value = data;
    filterLabel.value = `Новости пользователя #${userId} (${data.length} постов)`;
    await loadCommentCounts();
  } catch (err) {
    error.value = err.message || 'Ошибка при загрузке новостей';
  } finally {
    isLoading.value = false;
  }
}

async function toggleComments(postId) {
  if (expandedPostId.value === postId) {
    expandedPostId.value = null;
  } else {
    expandedPostId.value = postId;
    
    if (!comments[postId]) {
      try {
        const data = await fetchComments(postId, 3);
        comments[postId] = data;
        commentCounts[postId] = data.length;
      } catch (err) {
        console.error('Ошибка загрузки комментариев:', err);
      }
    }
  }
}

async function loadCommentCounts() {
  for (const post of posts.value) {
    if (!commentCounts[post.id]) {
      try {
        const data = await fetchComments(post.id, 100);
        commentCounts[post.id] = data.length;
      } catch (err) {
        commentCounts[post.id] = 0;
      }
    }
  }
}
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
}

.news-list {
  display: grid;
  grid-auto-rows: 1fr;
  gap: 16px;
}

.post-card {
  background: var(--panel-2);
  padding: 15px;
  border-left: 5px solid var(--brand);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}

.post-title {
  margin: 0 0 10px 0;
  color: var(--text);
  font-size: 1.1rem;
}

.post-body {
  margin: 0 0 10px 0;
  color: #ccc;
  line-height: 1.5;
}

.comments-section {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #333;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.news-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  transition: opacity 0.3s ease;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #ddd;
  border-top: 4px solid var(--brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background: rgba(255, 84, 89, 0.15);
  color: #ff5459;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #ff5459;
  margin-bottom: 20px;
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

.btn--ghost {
  background: transparent;
  color: var(--link);
  border: 1px solid var(--link);
}

.btn--ghost:hover {
  background: rgba(52, 152, 219, 0.1);
}
</style>
