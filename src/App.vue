<template>
  <div class="app">
    <AppHeader />
    <main>
      <router-view />
      <AuthModal />
      <ChatStub />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AuthModal from './components/AuthModal.vue';
import ChatStub from './components/ChatStub.vue';

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
    console.log(`⏱️ Время загрузки: ${loadSec} сек.`);
  });
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

main {
  flex: 1;
  overflow-y: auto;
}
</style>
