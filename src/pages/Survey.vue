<template>
  <div class="survey-wrapper">
    <h1 class="page-title">Data Visualization Questionnaire</h1>
    <SurveyComponent :model="survey" />
  </div>
</template>

<script setup>
import { SurveyComponent } from 'survey-vue3-ui'
import { Model } from 'survey-core'
import 'survey-core/survey-core.min.css'

const surveyJson = {
  title: '',
  showProgressBar: 'top',
  pages: [
    {
      name: 'question1',
      elements: [
        {
          type: 'html',
          name: 'image1',
          html: '<img src="" alt="Question 1 image" style="max-width:100%;max-height:400px;display:block;margin:0 auto;border-radius:8px;" />',
        },
        {
          type: 'comment',
          name: 'answer1',
          title: 'Question 1 goes here?',
          isRequired: false,
          rows: 4,
        },
      ],
    },
    {
      name: 'question2',
      elements: [
        {
          type: 'html',
          name: 'image2',
          html: '<img src="" alt="Question 2 image" style="max-width:100%;max-height:400px;display:block;margin:0 auto;border-radius:8px;" />',
        },
        {
          type: 'comment',
          name: 'answer2',
          title: 'Question 2 goes here?',
          isRequired: false,
          rows: 4,
        },
      ],
    },
    {
      name: 'question3',
      elements: [
        {
          type: 'html',
          name: 'image3',
          html: '<img src="" alt="Question 3 image" style="max-width:100%;max-height:400px;display:block;margin:0 auto;border-radius:8px;" />',
        },
        {
          type: 'comment',
          name: 'answer3',
          title: 'Question 3 goes here?',
          isRequired: false,
          rows: 4,
        },
      ],
    },
    {
      name: 'question4',
      elements: [
        {
          type: 'html',
          name: 'image4',
          html: '<img src="" alt="Question 4 image" style="max-width:100%;max-height:400px;display:block;margin:0 auto;border-radius:8px;" />',
        },
        {
          type: 'comment',
          name: 'answer4',
          title: 'Question 4 goes here?',
          isRequired: false,
          rows: 4,
        },
      ],
    },
    {
      name: 'question5',
      elements: [
        {
          type: 'html',
          name: 'image5',
          html: '<img src="" alt="Question 5 image" style="max-width:100%;max-height:400px;display:block;margin:0 auto;border-radius:8px;" />',
        },
        {
          type: 'comment',
          name: 'answer5',
          title: 'Question 5 goes here?',
          isRequired: false,
          rows: 4,
        },
      ],
    },
  ],
}

const survey = new Model(surveyJson)

survey.onComplete.add((sender) => {
  console.log('Survey results:', sender.data)
})
</script>

<style scoped>
.survey-wrapper {
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
  letter-spacing: 0.5px;
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
</style>
