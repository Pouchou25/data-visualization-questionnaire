<template>
  <div class="question-wrapper">
    <h1 class="page-title">Data Visualization Questionnaire</h1>
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
import { timings, answers } from '../store/survey.js'

const route = useRoute()
const router = useRouter()
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

const images = {
  'word-scale': '/src/assets/images/word-scale/question2.png',
  'full-size':  '/src/assets/images/full-size/question2.png',
  'written':    '/src/assets/images/written/question2.png',
}

const imageSrc = images[route.params.type] ?? ''

const survey = new Model({
  showQuestionNumbers: false,
  showNavigationButtons: 'bottom',
  showCompletedPage: false,
  completeText: 'Next',
  pages: [
    {
      elements: [
        {
          type: 'html',
          name: 'image2',
          html: `<img src="${imageSrc}" alt="Question 2 image" style="max-width:100%;max-height:400px;display:block;margin:0 auto;border-radius:8px;" />`,
        },
        {
          type: 'comment',
          name: 'answer2',
          title: 'Question 2 :                                                                                           How many women have a learning difficulty score of 2 ?',
          isRequired: true,
          rows: 8,
        },
      ],
    },
  ],
})

survey.onComplete.add(() => {
  answers[2] = survey.data.answer2 ?? ''
  timings[2] = Date.now() - startTime
  router.push({ name: 'recall', params: { type: route.params.type, questionNumber: '2' } })
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
