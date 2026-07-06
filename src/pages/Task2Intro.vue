<template>
  <div class="select-container">
    <h1 class="page-title">Data Visualization Questionnaire</h1>
    <p class="task-label">Task 2 : Recall</p>
    <div class="countdown">{{ count }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const count = ref(5)

onMounted(() => {
  const timer = setInterval(() => {
    count.value--
    if (count.value === 0) {
      clearInterval(timer)
      router.push({ name: 'question-6', params: { type: route.params.type } })
    }
  }, 1000)
})
</script>

<style scoped>
.select-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  gap: 2.5rem;
}

.page-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #4a90e2;
  letter-spacing: 0.5px;
  margin: 0;
}

.task-label {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
  text-align: center;
  margin: 0;
}

.countdown {
  font-size: 6rem;
  font-weight: 700;
  color: #4a90e2;
  line-height: 1;
}
</style>
