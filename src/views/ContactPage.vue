<script setup>
import { ref } from 'vue'

const sent = ref(false)
const form = ref({ name: '', email: '', subject: '', message: '' })

function submit() {
  sent.value = true
}
</script>

<template>
  <main class="page-shell p-4 p-lg-5">
    <span class="badge rounded-pill eyebrow mb-3">Échangeons</span>
    <h1 class="fw-bold mb-2">Contactez May’Cult</h1>
    <p class="text-secondary mb-4">Une question sur le projet, une suggestion ou un besoin d’accompagnement ? Écrivez-nous.</p>
    <div class="row g-4">
      <section class="col-lg-7">
        <form v-if="!sent" class="card border-0 shadow-sm p-4" @submit.prevent="submit">
          <div class="row g-3">
            <div class="col-md-6"><label class="form-label" for="contact-name">Votre nom</label><input id="contact-name" v-model="form.name" required class="form-control" placeholder="Prénom ou nom d’usage"></div>
            <div class="col-md-6"><label class="form-label" for="contact-email">Votre adresse e-mail</label><input id="contact-email" v-model="form.email" required type="email" class="form-control" placeholder="vous@exemple.fr"></div>
            <div class="col-12"><label class="form-label" for="contact-subject">Objet</label><input id="contact-subject" v-model="form.subject" required class="form-control" placeholder="Le sujet de votre message"></div>
            <div class="col-12"><label class="form-label" for="contact-message">Message</label><textarea id="contact-message" v-model="form.message" required rows="6" class="form-control" placeholder="Écrivez votre message…"></textarea></div>
          </div>
          <button class="btn btn-danger mt-4 px-4">Envoyer le message</button>
        </form>
        <div v-else class="alert alert-success border-0 shadow-sm"><h2 class="h5 fw-bold">Votre message a bien été envoyé.</h2><p class="mb-0">Nous reviendrons vers vous prochainement.</p></div>
      </section>
      <aside class="col-lg-5">
        <div class="card border-0 shadow-sm p-4 h-100"><h2 class="h5 fw-bold">Nous retrouver</h2><p class="text-secondary">Pour toute demande liée à la validation des contenus, la DAC Mayotte reste votre interlocutrice.</p><a class="btn btn-outline-danger" href="mailto:contact@maycult.yt">contact@maycult.yt</a></div>
      </aside>
    </div>
  </main>
</template>
