<template>
  <div class="trial-complete-wrapper">
    <h1 class="page-title">Data Visualization Questionnaire</h1>
    <div class="card">
      <div class="check">✓</div>
      <h2 class="heading">Trial complete!</h2>
      <p class="message">
        You are now familiar with the format. The real questionnaire is about to begin.
      </p>
      <button class="start-btn" @click="start">Begin Questionnaire</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function start() {
  router.push({ name: 'question-2', params: { type: route.params.type } })
}
</script>

<style scoped>
.trial-complete-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 2rem;
  box-sizing: border-box;
  gap: 2rem;
}

.page-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #4a90e2;
  margin: 0;
}

.card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2.5rem 3rem;
  max-width: 560px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  text-align: center;
}

.check {
  font-size: 3rem;
  color: #4caf50;
  line-height: 1;
}

.heading {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.message {
  font-size: 1rem;
  color: #555;
  margin: 0;
}

.detail {
  font-size: 0.95rem;
  color: #444;
  margin: 0;
  align-self: flex-start;
}

.steps {
  align-self: flex-start;
  padding-left: 1.4rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.steps li {
  font-size: 0.95rem;
  color: #333;
  line-height: 1.5;
}

.start-btn {
  margin-top: 0.5rem;
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

.start-btn:hover {
  background-color: #357abd;
}
</style>
