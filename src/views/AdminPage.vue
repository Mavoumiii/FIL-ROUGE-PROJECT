<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  isAdmin: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
  contributors: { type: Array, default: () => [] },
  articles: { type: Array, default: () => [] },
  loginError: { type: String, default: '' },
})
const emit = defineEmits(['navigate', 'admin-login'])
const credentials = ref({ email: '', password: '' })
const pendingCount = computed(() => props.items.filter((item) => item.status === 'À relire' || item.status === 'À valider').length)
const validatedCount = computed(() => props.items.filter((item) => item.status === 'Validé').length)
function login() { emit('admin-login', { ...credentials.value }) }
</script>

<template>
  <main class="page-shell p-4 p-lg-5">
    <div v-if="!props.isAdmin" class="login-section card border-0 shadow-sm">
      <form class="login-form p-4 p-lg-5" @submit.prevent="login">
        <span class="badge rounded-pill eyebrow mb-3">DAC MAYOTTE</span>
        <h1 class="fw-bold mb-2">Connexion admin</h1>
        <p class="text-secondary">Connectez-vous pour gérer les récits et les contributions.</p>
        <label class="form-label mt-3" for="admin-email">Adresse e-mail</label>
        <input id="admin-email" v-model="credentials.email" class="form-control" type="email" autocomplete="username" required placeholder="admin@maycult.fr">
        <label class="form-label mt-3" for="admin-password">Mot de passe</label>
        <input id="admin-password" v-model="credentials.password" class="form-control" type="password" autocomplete="current-password" required placeholder="Votre mot de passe">
        <p v-if="props.loginError" class="text-danger small mt-3 mb-0">{{ props.loginError }}</p>
        <button class="btn btn-danger fw-bold mt-4" type="submit">Se connecter <span>↗</span></button>
      </form>
    </div>
    <template v-else>
      <div class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <span class="badge rounded-pill eyebrow mb-3">ESPACE ADMINISTRATEUR</span>
          <h1 class="fw-bold mb-2">Tableau de bord</h1>
          <p class="text-secondary mb-0">Gérez les contributions et surveillez la publication des contenus.</p>
        </div>
        <button class="btn btn-outline-dark" @click="emit('navigate', 'accueil')">Voir le site ↗</button>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-sm-6 col-xl-3"><div class="card border-0 shadow-sm h-100"><div class="card-body"><span class="text-secondary small">À traiter</span><strong class="d-block fs-2">{{ pendingCount }}</strong><span class="small text-secondary">contributions en attente</span></div></div></div>
        <div class="col-sm-6 col-xl-3"><div class="card border-0 shadow-sm h-100"><div class="card-body"><span class="text-secondary small">Validées</span><strong class="d-block fs-2">{{ validatedCount }}</strong><span class="small text-secondary">contributions validées</span></div></div></div>
        <div class="col-sm-6 col-xl-3"><div class="card border-0 shadow-sm h-100"><div class="card-body"><span class="text-secondary small">Bibliothèque</span><strong class="d-block fs-2">{{ props.articles.length }}</strong><span class="small text-secondary">contenus visibles</span></div></div></div>
        <div class="col-sm-6 col-xl-3"><div class="card border-0 shadow-sm h-100"><div class="card-body"><span class="text-secondary small">Communauté</span><strong class="d-block fs-2">{{ props.contributors.length }}</strong><span class="small text-secondary">contributeurs</span></div></div></div>
      </div>

      <section class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <span class="eyebrow">GESTION</span>
          <h2 class="h3 fw-bold mt-2 mb-3">Actions administrateur</h2>
          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-danger" @click="emit('navigate', 'moderation')">Gérer les contributions</button>
            <button class="btn btn-outline-danger" @click="emit('navigate', 'admin-events')">Gérer l’agenda</button>
            <button class="btn btn-outline-danger" @click="emit('navigate', 'explorer')">Voir la bibliothèque</button>
            <button class="btn btn-outline-dark" @click="emit('navigate', 'community-profiles')">Voir les profils</button>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>
