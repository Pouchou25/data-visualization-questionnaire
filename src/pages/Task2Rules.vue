<template>
  <div class="rules-container">
    <h1 class="page-title">Data Visualization Questionnaire</h1>
    <div class="rules-box">
      <h2 class="rules-title">Task 2 — Instructions</h2>
      <ul class="rules-list">
        <li>A data visualization will be displayed on screen.</li>
        <li>After <strong>5 seconds</strong>, the image will become blurry.</li>
        <li>Answer the question based on what you remember from the visualization.</li>
      </ul>
      <button class="ready-btn" @click="goToCountdown">Ready ?</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function goToCountdown() {
  router.push({ name: 'task-2-intro', params: { type: route.params.type } })
}
</script>

<style scoped>
.rules-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem;
  box-sizing: border-box;
}

.page-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #4a90e2;
  letter-spacing: 0.5px;
  margin-bottom: 2rem;
}

.rules-box {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.rules-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.rules-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.rules-list li {
  font-size: 1rem;
  color: #444;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
}

.rules-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #4a90e2;
  font-weight: 700;
}

.ready-btn {
  align-self: center;
  padding: 0.75rem 3rem;
  background-color: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.ready-btn:hover {
  background-color: #357abd;
}
</style>
