<script setup>
import { computed } from 'vue'
import { categoryLabels, events as defaultEvents } from '../data/siteData'

const props = defineProps({ events: { type: Array, default: () => defaultEvents } })
defineEmits(['open-event'])
const upcomingEvents = computed(() => [...props.events].filter((event) => new Date(`${event.end}T00:00:00`) >= today()).sort((a, b) => a.start.localeCompare(b.start)))
function today() { const date = new Date(); return new Date(date.getFullYear(), date.getMonth(), date.getDate()) }
function formatDate(event) { return new Date(`${event.start}T00:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }
function formatDay(value) { return new Date(`${value}T00:00:00`).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }).replace('.', '').toUpperCase() }
function badgeClass(category) { return `badge-${category}` }
</script>

<template>
  <main class="page-shell page-agenda p-4 p-lg-5">
    <span class="badge rounded-pill eyebrow mb-3">Agenda culturel</span>
    <h1 class="fw-bold mb-2">Les prochains rendez-vous</h1>
    <p class="text-secondary mb-5">Festivals, cérémonies et traditions à venir partout à Mayotte.</p>
    <h2 class="h5 fw-bold mb-3">À venir</h2>
    <div v-if="upcomingEvents.length" class="row g-3">
      <div v-for="event in upcomingEvents" :key="event.id" class="col-12">
        <article class="card border-0 shadow-sm mycult-card">
          <div class="card-body d-md-flex gap-3 align-items-start">
            <span class="badge rounded-2 event-date" :class="badgeClass(event.category)">{{ formatDay(event.start) }}</span>
            <div class="flex-grow-1 mt-3 mt-md-0">
                <h3 class="h5 fw-bold mb-2">{{ event.title }}</h3>
                <p class="small text-secondary mb-2">{{ formatDate(event) }} · {{ event.location }}</p>
                <p class="mb-0">{{ event.description }}</p>
            </div>
            <button class="btn btn-outline-danger btn-sm rounded-pill mt-3 mt-md-0" @click="$emit('open-event', event)">Détails</button>
          </div>
        </article>
      </div>
    </div>
    <p v-else class="fst-italic text-secondary">Aucun événement à venir pour le moment. Revenez bientôt.</p>
  </main>
</template>
