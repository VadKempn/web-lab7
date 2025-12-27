<template>
  <div id="chatStub">
    <span> Чат (скоро)</span>
  </div>
</template>

<style scoped>
#chatStub {
  position: fixed;
  right: 18px;
  bottom: 18px;
  background: var(--panel);
  border: 1px solid #333;
  border-radius: 14px;
  padding: 12px 14px;
  box-shadow: var(--shadow);
  z-index: 1100;
  cursor: pointer;
  transition: all 0.3s ease;
}

#chatStub:hover {
  background: var(--panel-2);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.7);
}
</style>
