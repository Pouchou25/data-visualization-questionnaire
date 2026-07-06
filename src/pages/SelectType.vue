<template>
  <div class="select-container">
    <h1 class="page-title">Data Visualization Questionnaire</h1>

    <!-- Step 1: pick a type -->
    <template v-if="step === 'select'">
      <div class="cards">
        <div
          v-for="option in options"
          :key="option"
          class="card"
          :class="{ selected: selected === option }"
          @click="selected = option"
        >
          {{ option }}
        </div>
      </div>
      <button class="confirm-btn" :disabled="!selected" @click="confirm">
        Confirm
      </button>
    </template>

    <!-- Step 2: instructions -->
    <template v-else-if="step === 'instructions'">
      <div class="instructions-box">
        <h2 class="instructions-title">Instructions</h2>
        <ul class="instructions-list">
          <li>You will start with a <strong>trial question</strong> to get familiar with the interface — it will not be recorded.</li>
          <li>You will then answer <strong>4 real questions</strong>, each following the same 3-step format:</li>
          <li style="list-style:none;padding-left:1rem;">
            <ol class="substeps">
              <li><strong>Reading</strong> — a visualization is shown, read it carefully and answer the question.</li>
              <li><strong>Recall</strong> — the image disappears, answer the same question from memory.</li>
              <li><strong>Feedback</strong> — rate the visualization and share your takeaways.</li>
            </ol>
          </li>
          <li>A <strong>timer</strong> runs during each question — take your time but answer as accurately as possible.</li>
        </ul>
        <p class="instructions-type">Your visualization type: <strong>{{ selected }}</strong></p>
        <button class="start-btn" @click="start">Start</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const typeSlug = {
  'Word Scale': 'word-scale',
  'Full Size': 'full-size',
  'Written': 'written',
}

const options = ['Word Scale', 'Full Size', 'Written']
const selected = ref(null)
const step = ref('select')
const router = useRouter()

function confirm() {
  step.value = 'instructions'
}

function start() {
  router.push({ name: 'question-1', params: { type: typeSlug[selected.value] } })
}
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

.cards {
  display: flex;
  gap: 2rem;
}

.card {
  width: 160px;
  height: 160px;
  background: #fff;
  border: 2px solid #d0d0d0;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a2e;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  user-select: none;
}

.card:hover {
  border-color: #4a90e2;
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.2);
  transform: translateY(-3px);
}

.card.selected {
  border-color: #4a90e2;
  background-color: #eaf2fd;
  color: #4a90e2;
}

.confirm-btn {
  padding: 0.75rem 2.5rem;
  background-color: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #357abd;
}

.confirm-btn:disabled {
  background-color: #b0c8e8;
  cursor: not-allowed;
}

.instructions-box {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2.5rem 3rem;
  max-width: 640px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.instructions-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  text-align: center;
}

.instructions-list {
  padding-left: 1.4rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.instructions-list li {
  font-size: 1rem;
  color: #333;
  line-height: 1.55;
}

.substeps {
  padding-left: 1.2rem;
  margin: 0.5rem 0 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.substeps li {
  font-size: 0.95rem;
  color: #444;
}

.instructions-type {
  font-size: 0.95rem;
  color: #666;
  text-align: center;
  margin: 0;
}

.start-btn {
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

.start-btn:hover {
  background-color: #357abd;
}
</style>
