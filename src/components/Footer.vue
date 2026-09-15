<script setup>
const props = defineProps({ adminMode: { type: Boolean, default: false } })
const emit = defineEmits(['navigate'])
</script>

<template>
  <footer class="site-footer footer-custom shadow-sm bg-light" :class="{ 'admin-footer': props.adminMode }">
    <div class="container footer-grid">
      <div>
        <button v-if="!props.adminMode" class="brand footer-brand" aria-label="Retour à l'accueil" @click="emit('navigate', 'accueil')">
          <span class="brand-mark"><img src="../assets/img/logomayCult.png" alt="Logo My’Cult"></span>
        </button>
        <span v-else class="brand footer-brand" aria-label="Logo My’Cult">
          <span class="brand-mark"><img src="../assets/img/logomayCult.png" alt="Logo My’Cult"></span>
        </span>
      </div>

      <div v-if="!props.adminMode" class="footer-links">
        <button @click="emit('navigate', 'explorer')">Explorer</button>
        <button @click="emit('navigate', 'lieux-memoire')">Lieux de mémoire</button>
        <button @click="emit('navigate', 'evenements')">Agenda</button>
        <button @click="emit('navigate', 'contribuer')">Contribuer</button>
        <a href="#" class="footer-link" @click.prevent="emit('navigate', 'apropos')">À propos & charte</a>
        <a href="mailto:contact@maycult.yt" class="footer-link">Contact</a>
      </div>

      <small>© 2026 My’Cult · Projet soutenu par la DAC Mayotte</small>
    </div>
  </footer>
</template>
