<template>
  <div class="question-wrapper">
    <h1 class="page-title">Data Visualization Questionnaire</h1>
    <div class="image-container">
      <img :src="imageSrc" alt="Question 7 image" :class="{ blurry: isBlurred }" />
    </div>
    <template v-if="showQuestion">
      <div class="timer">{{ formattedTime }}</div>
      <SurveyComponent :model="survey" />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { SurveyComponent } from 'survey-vue3-ui'
import { Model } from 'survey-core'
import 'survey-core/survey-core.min.css'
import { useRoute, useRouter } from 'vue-router'
import { timings, answers } from '../store/survey.js'

const route = useRoute()
const router = useRouter()

const images = {
  'word-scale': '/src/assets/images/word-scale/question7.png',
  'full-size':  '/src/assets/images/full-size/question7.png',
  'written':    '/src/assets/images/written/question7.png',
}

const imageSrc = images[route.params.type] ?? ''
const isBlurred = ref(false)
const showQuestion = ref(false)
const elapsed = ref(0)
let startTime = 0
let timerInterval = null

const formattedTime = computed(() => {
  const s = Math.floor(elapsed.value / 1000)
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
})

onMounted(() => {
  setTimeout(() => { isBlurred.value = true }, 5000)
  setTimeout(() => {
    showQuestion.value = true
    startTime = Date.now()
    timerInterval = setInterval(() => { elapsed.value = Date.now() - startTime }, 1000)
  }, 6000)
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
          name: 'answer7',
          title: 'Question 7 : What rating did most participants give to blub ?',
          rows: 8,
        },
      ],
    },
  ],
})

survey.onComplete.add(() => {
  answers[7] = survey.data.answer7 ?? ''
  timings[7] = Date.now() - startTime
  router.push({ name: 'feedback', params: { type: route.params.type, questionNumber: '7' } })
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

.timer {
  font-size: 1rem;
  font-weight: 600;
  color: #888;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.image-container {
  width: 100%;
  max-width: 750px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.image-container img {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  object-fit: contain;
  transition: filter 1s ease;
}

.image-container img.blurry {
  filter: blur(8px);
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
