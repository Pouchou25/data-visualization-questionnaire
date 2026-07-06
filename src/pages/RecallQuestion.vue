<template>
  <div class="question-wrapper">
    <h1 class="page-title">Data Visualization Questionnaire</h1>
    <div class="recall-notice">The image is no longer visible. Answer from memory.</div>
    <div class="timer">{{ formattedTime }}</div>
    <SurveyComponent :model="survey" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { SurveyComponent } from 'survey-vue3-ui'
import { Model } from 'survey-core'
import 'survey-core/survey-core.min.css'
import { useRoute, useRouter } from 'vue-router'
import { recallAnswers, recallTimings } from '../store/survey.js'
import { questionTitles, recallTitles } from '../data/questions.js'

const route = useRoute()
const router = useRouter()

const questionNumber = Number(route.params.questionNumber)
const elapsed = ref(0)
let startTime = 0
let timerInterval = null

const formattedTime = computed(() => {
  const s = Math.floor(elapsed.value / 1000)
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
})

onMounted(() => {
  startTime = Date.now()
  timerInterval = setInterval(() => { elapsed.value = Date.now() - startTime }, 1000)
})
onUnmounted(() => { clearInterval(timerInterval) })

const survey = new Model({
  showQuestionNumbers: false,
  showNavigationButtons: 'bottom',
  showCompletedPage: false,
  completeText: 'Next',
  pages: [
    {
      elements: [
        {
          type: 'comment',
          name: `recall_answer${questionNumber}`,
          title: recallTitles[questionNumber] ?? questionTitles[questionNumber] ?? `Recall Question ${questionNumber}`,
          isRequired: true,
          rows: 8,
        },
      ],
    },
  ],
})

survey.onComplete.add(() => {
  recallAnswers[questionNumber] = survey.data[`recall_answer${questionNumber}`] ?? ''
  recallTimings[questionNumber] = Date.now() - startTime
  router.push({ name: 'feedback', params: { type: route.params.type, questionNumber: String(questionNumber) } })
})
</script>

<style scoped>
.question-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f0f2f5;
  box-sizing: border-box;
}

.page-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 0.5rem;
}

.recall-notice {
  font-size: 0.95rem;
  color: #e07b39;
  font-weight: 600;
  background: #fff3ec;
  border: 1px solid #f5c9ae;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  margin-bottom: 1rem;
}

.timer {
  font-size: 1rem;
  font-weight: 600;
  color: #888;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
}

:deep(.sd-root-modern) {
  width: 100%;
  max-width: 750px;
  background: transparent;
}

:deep(.sd-body) {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

:deep(textarea) {
  min-height: 200px;
}
</style>
