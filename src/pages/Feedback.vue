<template>
  <div class="question-wrapper">
    <h1 class="page-title">Data Visualization Questionnaire</h1>
    <SurveyComponent :model="survey" />
  </div>
</template>

<script setup>
import { SurveyComponent } from 'survey-vue3-ui'
import { Model } from 'survey-core'
import 'survey-core/survey-core.min.css'
import { useRoute, useRouter } from 'vue-router'
import { userName, selectedType, answers, timings, recallAnswers, recallTimings, feedbackData } from '../store/survey.js'
import { SHEETS_URL } from '../config.js'

const route = useRoute()
const router = useRouter()

const questionNumber = Number(route.params.questionNumber)
const type = route.params.type

const imageSrc = `/src/assets/images/${type}/question${questionNumber}.png`

const survey = new Model({
  showQuestionNumbers: false,
  showNavigationButtons: 'bottom',
  showCompletedPage: false,
  completeText: questionNumber === 5 ? 'Submit' : 'Next Question',
  pages: [
    {
      elements: [
        {
          type: 'html',
          name: `q${questionNumber}_takeaways_image`,
          html: `<img src="${imageSrc}" alt="Question ${questionNumber} image" style="max-width:100%;max-height:350px;display:block;margin:0 auto 1rem;border-radius:8px;" />`,
        },
        {
          type: 'rating',
          name: `q${questionNumber}_presentation`,
          title: 'How much did you like the way data was presented?',
          isRequired: true,
          rateMin: 1,
          rateMax: 5,
          minRateDescription: 'Not at all',
          maxRateDescription: 'Very much',
        },
        {
          type: 'rating',
          name: `q${questionNumber}_confidence`,
          title: 'How confident are you about your answer?',
          isRequired: true,
          rateMin: 1,
          rateMax: 5,
          minRateDescription: 'Not confident',
          maxRateDescription: 'Very confident',
        },
        {
          type: 'comment',
          name: `q${questionNumber}_takeaways`,
          title: 'What are the takeaways from what you just read?',
          isRequired: true,
          rows: 5,
        },
      ],
    },
  ],
})

survey.onComplete.add((sender) => {
  feedbackData[questionNumber] = {
    presentation: sender.data[`q${questionNumber}_presentation`] ?? '',
    confidence:   sender.data[`q${questionNumber}_confidence`]   ?? '',
    takeaways:    sender.data[`q${questionNumber}_takeaways`]    ?? '',
  }

  if (questionNumber === 5) {
    const payload = {
      firstName:     userName.first,
      lastName:      userName.last,
      type:          selectedType.value ?? type,
      answers:       { ...answers },
      timings:       { ...timings },
      recallAnswers: { ...recallAnswers },
      recallTimings: { ...recallTimings },
      feedback:      { ...feedbackData },
    }
    fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    router.push({ name: 'home' })
  } else {
    router.push({ name: `question-${questionNumber + 1}`, params: { type } })
  }
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
  margin-bottom: 2rem;
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
  min-height: 120px;
}
</style>
