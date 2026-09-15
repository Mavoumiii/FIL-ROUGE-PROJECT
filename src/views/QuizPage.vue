<script setup>
import { computed, ref } from 'vue'
import { quizQuestions } from '../data/siteData'

const index = ref(0)
const selectedAnswer = ref(null)
const score = ref(0)
const finished = ref(false)
const question = computed(() => quizQuestions[index.value])

function answer(answerIndex) {
  if (selectedAnswer.value !== null) return
  selectedAnswer.value = answerIndex
  if (answerIndex === question.value.answer) score.value++
}
function next() { if (index.value === quizQuestions.length - 1) finished.value = true; else { index.value++; selectedAnswer.value = null } }
function restart() { index.value = 0; selectedAnswer.value = null; score.value = 0; finished.value = false }
</script>

<template>
  <main class="page-shell page-agenda p-4 p-lg-5">
    <span class="badge rounded-pill eyebrow mb-3">Culture</span>
    <h1 class="fw-bold mb-2">Quiz culturel</h1>
    <p class="text-secondary mb-5">Testez vos connaissances sur Mayotte.</p>
    <h2 class="h5 fw-bold mb-3">Votre défi</h2>

    <article class="card border-0 shadow-sm mycult-card col-lg-8 mx-auto">
      <div v-if="!finished" class="card-body p-4 p-lg-5">
        <span class="badge rounded-pill badge-tradition mb-3">Question {{ index + 1 }} / {{ quizQuestions.length }}</span>
        <h3 class="h4 fw-bold mb-4">{{ question.question }}</h3>
        <div class="d-grid gap-2"><button v-for="(option, answerIndex) in question.options" :key="option" class="btn text-start quiz-option" :class="selectedAnswer === answerIndex ? (answerIndex === question.answer ? 'btn-success' : 'btn-danger') : 'btn-outline-secondary'" @click="answer(answerIndex)">{{ option }}</button></div>
        <button v-if="selectedAnswer !== null" class="btn btn-danger rounded-pill px-4 mt-4" @click="next">{{ index === quizQuestions.length - 1 ? 'Voir le résultat' : 'Question suivante' }}</button>
      </div>
      <div v-else class="card-body text-center p-5"><span class="badge rounded-pill badge-festival mb-3">Quiz terminé</span><h3 class="h4 fw-bold">Résultat : {{ score }}/{{ quizQuestions.length }}</h3><p class="text-secondary">Merci d’avoir participé !</p><button class="btn btn-danger rounded-pill px-4" @click="restart">Recommencer</button></div>
    </article>
  </main>
</template>
