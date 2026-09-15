<script setup>
import { ref } from 'vue'
import { articles, events } from '../data/siteData'
import ankImage from '../assets/img/ANK.jpg'

const mapZoom = ref(1)
const mapPosition = ref({ x: 0, y: 0 })
const isDraggingMap = ref(false)
const dragStart = ref({ x: 0, y: 0 })
function zoomMap(amount) { mapZoom.value = Math.min(3, Math.max(1, Number((mapZoom.value + amount).toFixed(1)))) }
function resetMapZoom() { mapZoom.value = 1; mapPosition.value = { x: 0, y: 0 } }
function zoomMapWithWheel(event) { zoomMap(event.deltaY < 0 ? .5 : -.5) }
function startMapDrag(event) { isDraggingMap.value = true; dragStart.value = { x: event.clientX - mapPosition.value.x, y: event.clientY - mapPosition.value.y }; event.currentTarget.setPointerCapture(event.pointerId) }
function moveMap(event) { if (isDraggingMap.value) mapPosition.value = { x: event.clientX - dragStart.value.x, y: event.clientY - dragStart.value.y } }
function stopMapDrag() { isDraggingMap.value = false }

function formatShortDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).toUpperCase()
}
defineProps({ contributors: { type: Array, required: true } })
const emit = defineEmits(['open-article', 'open-event', 'navigate'])
</script>

<template>
  <div class="row g-4">
    <section class="col-lg-8">
      <div class="section-heading"><div><span class="section-kicker">À la une</span><h2 class="h3 fw-bold mb-0">Fil culturel</h2></div><button class="btn btn-link text-danger fw-bold px-0" @click="$emit('navigate', 'explorer')">Tout explorer →</button></div>
      <div class="row g-3">
        <div v-for="article in articles" :key="article.id" class="col-md-4">
          <article class="card border-0 shadow-sm h-100 content-card" role="button" @click="$emit('open-article', article)">
            <img :src="article.image" :alt="article.title" class="card-img-top object-fit-cover" style="height: 180px">
            <div class="card-body"><span class="badge text-bg-danger mb-2">{{ article.category }}</span><h3 class="h6 fw-bold">{{ article.title }}</h3><p class="small text-secondary mb-0">{{ article.description }}</p></div>
          </article>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center mt-5 mb-3"><h2 class="h3 fw-bold mb-0">Événements à venir</h2><button class="btn btn-link text-danger fw-bold px-0" @click="$emit('navigate', 'evenements')">Tout voir</button></div>
      <div class="row g-3">
        <div v-for="event in events" :key="event.id" class="col-md-4">
          <article class="card border-0 shadow-sm h-100 content-card" role="button" @click="$emit('open-event', event)">
            <img :src="event.image" :alt="event.title" class="card-img-top object-fit-cover" style="height: 180px">
            <div class="card-body"><span class="badge text-bg-danger mb-2">{{ formatShortDate(event.start) }}</span><h3 class="h6 fw-bold">{{ event.title }}</h3><p class="small text-secondary mb-0">{{ event.location }}</p></div>
          </article>
        </div>
      </div>
    </section>

    <aside class="col-lg-4">
      <div class="card border-0 shadow-sm mb-4"><div class="card-body"><h2 class="h4">Explorer les lieux de mémoire</h2><p class="text-secondary">Découvrez les lieux culturels, monuments et traditions.</p><div class="map-preview mb-3" :class="{ dragging: isDraggingMap }" title="Utilisez la molette pour zoomer, puis glissez la carte pour la déplacer" @wheel.prevent="zoomMapWithWheel" @pointerdown="startMapDrag" @pointermove="moveMap" @pointerup="stopMapDrag" @pointercancel="stopMapDrag" @pointerleave="stopMapDrag"><img src="../assets/img/carteYT.png" alt="Carte des lieux de mémoire" class="home-aside-image" :style="{ transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapZoom})` }"><div class="map-controls" aria-label="Contrôles de zoom de la carte" @pointerdown.stop><button type="button" class="btn btn-light btn-sm" title="Zoomer" aria-label="Zoomer" @click="zoomMap(.5)">+</button><button type="button" class="btn btn-light btn-sm" title="Dézoomer" aria-label="Dézoomer" @click="zoomMap(-.5)">−</button><button type="button" class="btn btn-light btn-sm" title="Réinitialiser le zoom" aria-label="Réinitialiser le zoom" @click="resetMapZoom">1:1</button></div></div><button class="btn btn-outline-danger w-100" @click="$emit('navigate', 'lieux-memoire')">Voir la carte</button></div></div>
      <div class="card border-0 shadow-sm"><div class="card-body"><h2 class="h4">Quiz & défis</h2><p class="text-secondary">Testez vos connaissances sur Mayotte.</p><button class="btn btn-outline-danger w-100" @click="$emit('navigate', 'quiz')">Commencer le quiz</button></div></div>
    </aside>

    <section class="community-band container my-5">
      <div class="community-content">
        <span class="text-warning fw-bold">LA PAROLE EST À VOUS</span>
        <h2>Votre histoire mérite<br>d'être entendue.</h2>
        <p>Partagez un récit, une photo ou un savoir-faire avec la communauté mahoraise.</p>
        <button class="button button-yellow" @click="emit('navigate', 'contribuer')">
          Contribuer maintenant <span>↗</span>
        </button>
      </div>
      <div
        class="community-image"
        :style="{ backgroundImage: `url(${ankImage})` }"
      ></div>
    </section>  
    <section class="container my-5">
      <div class="section-heading mb-3">
        <div>
          <span class="badge rounded-pill eyebrow mb-3">ILS FONT VIVRE LA CULTURE</span>
          <h2>La communauté</h2>
        </div>
        <button class="text-button" @click="emit('navigate', 'profil')">
          Voir le profil <span>→</span>
        </button>
      </div>

      <div class="people-row mt-5">
        <div v-for="person in contributors" :key="person.name" class="person">
          <span class="avatar">{{ person.initials }}</span>
          <div>
            <strong>{{ person.name }}</strong>
            <small>{{ person.role }}</small>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
