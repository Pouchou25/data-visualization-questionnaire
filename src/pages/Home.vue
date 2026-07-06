<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="page-title">Data Visualization Questionnaire</h1>
      <h2>Welcome</h2>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          id="firstName"
          v-model="firstName"
          type="text"
          placeholder="Enter your first name"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input
          id="lastName"
          v-model="lastName"
          type="text"
          placeholder="Enter your last name"
        />
      </div>
      <button class="next-btn" :disabled="!firstName || !lastName" @click="handleNext">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userName } from '../store/survey.js'

const firstName = ref('')
const lastName = ref('')
const router = useRouter()

function handleNext() {
  userName.first = firstName.value
  userName.last = lastName.value
  router.push({ name: 'select-type' })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.login-box {
  background: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.page-title {
  margin: 0;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #4a90e2;
  letter-spacing: 0.5px;
}

h2 {
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
  color: #1a1a2e;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #444;
}

input {
  padding: 0.65rem 0.9rem;
  border: 1.5px solid #d0d0d0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #4a90e2;
}

.next-btn {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.next-btn:hover:not(:disabled) {
  background-color: #357abd;
}

.next-btn:disabled {
  background-color: #b0c8e8;
  cursor: not-allowed;
}
</style>
