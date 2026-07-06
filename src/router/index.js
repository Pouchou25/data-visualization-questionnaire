import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import SelectType from '../pages/SelectType.vue'
import Question1 from '../pages/Question1.vue'
import Question2 from '../pages/Question2.vue'
import Question3 from '../pages/Question3.vue'
import Question4 from '../pages/Question4.vue'
import Question5 from '../pages/Question5.vue'
import RecallQuestion from '../pages/RecallQuestion.vue'
import TrialComplete from '../pages/TrialComplete.vue'
import Feedback from '../pages/Feedback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/select-type', name: 'select-type', component: SelectType },
    { path: '/question/:type/1',               name: 'question-1',     component: Question1 },
    { path: '/question/:type/trial-complete',  name: 'trial-complete', component: TrialComplete },
    { path: '/question/:type/2', name: 'question-2', component: Question2 },
    { path: '/question/:type/3', name: 'question-3', component: Question3 },
    { path: '/question/:type/4', name: 'question-4', component: Question4 },
    { path: '/question/:type/5', name: 'question-5', component: Question5 },
    { path: '/question/:type/:questionNumber/recall',   name: 'recall',    component: RecallQuestion },
    { path: '/question/:type/:questionNumber/feedback', name: 'feedback',  component: Feedback },
  ],
})

export default router
