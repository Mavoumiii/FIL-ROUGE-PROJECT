<script setup>
import { ref } from 'vue'

const props = defineProps({
  isAuthenticated: { type: Boolean, default: false },
  currentUser: { type: Object, default: null },
})
const emit = defineEmits(['connect', 'navigate'])
const credentials = ref({ email: '', password: '' })
const loginError = ref('')
const submitted = ref(false)

function login() {
  if (!credentials.value.email || !credentials.value.password) {
    loginError.value = 'Renseignez votre adresse e-mail et votre mot de passe.'
    return
  }
  if (credentials.value.email.toLowerCase() === 'admin@maycult.fr') {
    loginError.value = 'Utilisez le bouton Espace admin pour vous connecter.'
    return
  }
  loginError.value = ''
  emit('connect', { email: credentials.value.email, name: credentials.value.email.split('@')[0] })
}

function submitContribution() {
  submitted.value = true
}
</script>

<template>
  <main class="page-shell p-4 p-lg-5">
    <span class="badge rounded-pill eyebrow mb-3">ESPACE COMMUNAUTAIRE</span>
    <h1>Votre profil culturel</h1>
    <p>Contribuez à la mémoire de Mayotte et retrouvez vos contenus favoris.</p>

    <section v-if="!props.isAuthenticated" class="login-section card border-0 shadow-sm">
        <form class="login-form p-4 p-lg-5" @submit.prevent="login">
            <span class="eyebrow align-self-start mb-2">CONNEXION</span>
            <h2 class="h3 fw-bold">Retrouvez votre communauté</h2>
            <p class="text-secondary">Connectez-vous pour partager vos histoires et suivre vos contributions.</p>

            <label class="form-label mt-3" for="login-email">Adresse e-mail</label>
            <input id="login-email" v-model="credentials.email" class="form-control" type="email" autocomplete="email" required placeholder="vous@exemple.com">

            <label class="form-label mt-3" for="login-password">Mot de passe</label>
            <input id="login-password" v-model="credentials.password" class="form-control" type="password" autocomplete="current-password" required placeholder="Votre mot de passe">

            <p v-if="loginError" class="text-danger small mt-3 mb-0">{{ loginError }}</p>

            <button class="btn btn-danger fw-bold mt-4" type="submit">Se connecter <span>↗</span></button>
        </form>
    </section>

    <section v-else class="profile-layout container-wide">
      <aside class="profile-card">
        <span class="profile-avatar">{{ props.currentUser?.name?.slice(0, 2).toUpperCase() || 'NM' }}</span>
        <h2>{{ props.currentUser?.name || 'Nouveau membre' }}</h2>
        <p>{{ props.currentUser?.email }}</p>
        <p class="text-success fw-bold">Connecté à la communauté</p>
        <div class="profile-stats"><span><strong>0</strong> contribution</span><span><strong>0</strong> favori</span></div>
      </aside>
      <div class="contribution-form">
        <span class="eyebrow">COMMUNAUTÉ</span>
        <h2>Bienvenue dans votre espace membre</h2>
        <p>Vous êtes connecté. Partagez un fragment de mémoire avec la communauté mahoraise.</p>
        <button class="btn btn-danger fw-bold" @click="emit('navigate', 'contribuer')">Contribuer maintenant <span>↗</span></button>
        <p v-if="submitted" class="success-message">Merci. Votre contribution est maintenant en attente de relecture.</p>
      </div>
    </section>
  </main>
</template>