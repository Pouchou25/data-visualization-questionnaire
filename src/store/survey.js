import { ref, reactive } from 'vue'

export const selectedType = ref(null)
export const userName = reactive({ first: '', last: '' })
export const answers = reactive({})       // reading answers { 1..5: 'text' }
export const timings = reactive({})       // reading timings { 1..5: ms }
export const recallAnswers = reactive({}) // recall answers  { 1..5: 'text' }
export const recallTimings = reactive({}) // recall timings  { 1..5: ms }
export const feedbackData = reactive({})  // { 1..5: { likeability, presentation, confidence, takeaways } }
