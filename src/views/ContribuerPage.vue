<script setup>
import { ref } from 'vue'

const props = defineProps({ isAuthenticated: { type: Boolean, default: false } })
const emit = defineEmits(['submit-contribution', 'navigate'])
const sent = ref(false)
const loginRequired = ref(false)
const form = ref({ type: 'Récit', title: '', name: '', village: '', content: '' })

function submit() {
  if (!props.isAuthenticated) {
    loginRequired.value = true
    return
  }
  emit('submit-contribution', { id: Date.now(), title: form.value.title, author: form.value.name, type: form.value.type, village: form.value.village, content: form.value.content, status: 'À relire' })
  sent.value = true
}
</script>

<template>
  <main class="page-shell p-4 p-lg-5">
    <span class="badge rounded-pill eyebrow mb-3">ESPACE COMMUNAUTAIRE</span>
    <h1 class="fw-bold mb-2">Partagez votre histoire</h1>
    <p class="text-secondary mb-4">Contribuez à la mémoire de Mayotte et retrouvez vos contenus favoris.</p>
    <div class="row g-4">
      <section class="col-lg-7">
        <div v-if="loginRequired" class="alert alert-warning border-0 shadow-sm">
          <h2 class="h5">Connexion requise pour envoyer</h2>
          <p class="mb-3">Votre contenu est prêt, mais vous devez vous connecter avant de l’envoyer à la modération.</p>
          <button class="btn btn-danger" @click="emit('navigate', 'profil')">Se connecter</button>
        </div>
        <form v-if="!sent" class="card border-0 shadow-sm p-4" @submit.prevent="submit">
          <div class="row g-3">
            <div class="col-12"><label class="form-label" for="contributor-name">Votre nom</label><input id="contributor-name" v-model="form.name" required class="form-control" placeholder="Prénom ou nom d’usage"></div>
            <div class="col-12"><label class="form-label" for="content-type">Type de contenu</label><select id="content-type" v-model="form.type" class="form-select"><option>Récit</option><option>Histoire</option><option>Savoir-faire</option><option>Photo</option><option>Vidéo</option><option>Témoignage audio</option></select></div>
            <div class="col-12"><label class="form-label" for="content-title">Titre de contenu</label><input id="content-title" v-model="form.title" required class="form-control" placeholder="Donnez un titre à votre contribution"></div>
            <div class="col-12"><label class="form-label" for="village">Village concerné</label><input id="village" v-model="form.village" class="form-control" placeholder="Ex. Sada"></div>
            <div class="col-12"><label class="form-label" for="media">Ajouter un média</label><input id="media" type="file" class="form-control" accept="image/*,video/*,audio/*"></div>
            <div class="col-12"><label class="form-label" for="story">Votre récit</label><textarea id="story" v-model="form.content" required rows="5" class="form-control" placeholder="Racontez, décrivez ou transmettez ce savoir…"></textarea></div>
          </div>
          <div class="form-check mt-3"><input id="agreement" required class="form-check-input" type="checkbox"><label for="agreement" class="form-check-label small">Je confirme pouvoir partager ce contenu et accepte la charte de validation.</label></div>
          <button class="btn btn-danger fw-bold mt-2 w-auto" type="submit">Envoyer à la modération <span>↗</span></button>
        </form>
        <div v-else class="alert alert-success border-0 shadow-sm"><h2 class="h5 fw-bold">Merci pour votre contribution !</h2><p class="mb-0">Elle a été transmise à l’équipe de modération DAC Mayotte. Vous serez informé de son traitement.</p></div>
      </section>
      <aside class="col-lg-5"><div class="card border-0 shadow-sm p-4"><h2 class="h5 fw-bold">Comment cela fonctionne ?</h2><ol class="small mb-0"><li class="mb-2">Vous déposez un récit ou un média.</li><li class="mb-2">La DAC vérifie le contenu et peut demander une précision.</li><li>Après validation, il rejoint la bibliothèque culturelle.</li></ol></div></aside>
    </div>
  </main>
</template>