<script setup>
const props = defineProps({
  isAdmin: { type: Boolean, default: false },
  contributors: { type: Array, default: () => [] },
})
const emit = defineEmits(['navigate'])
</script>

<template>
  <main class="page-shell p-4 p-lg-5">
    <div v-if="!props.isAdmin" class="alert alert-warning border-0 shadow-sm">
      Accès réservé aux administrateurs du DAC Mayotte.
    </div>
    <template v-else>
      <div class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <span class="badge rounded-pill eyebrow mb-3">ESPACE ADMINISTRATEUR</span>
          <h1 class="fw-bold mb-2">Profils de la communauté</h1>
          <p class="text-secondary mb-0">Consultez les contributeurs dont les récits ont été validés.</p>
        </div>
        <button class="btn btn-outline-dark" @click="emit('navigate', 'admin')">Retour au tableau de bord</button>
      </div>

      <section class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="h4 fw-bold mb-0">Membres enregistrés</h2>
            <span class="badge text-bg-danger">{{ props.contributors.length }}</span>
          </div>
          <div v-if="props.contributors.length" class="row g-3">
            <div v-for="person in props.contributors" :key="person.name" class="col-md-6 col-xl-4">
              <article class="border rounded-3 p-3 h-100">
                <div class="d-flex align-items-center gap-3">
                  <span class="avatar">{{ person.initials }}</span>
                  <div>
                    <h3 class="h6 fw-bold mb-1">{{ person.name }}</h3>
                    <p class="small text-secondary mb-0">{{ person.role }}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <p v-else class="text-secondary mb-0">Aucun profil de communauté pour le moment.</p>
        </div>
      </section>
    </template>
  </main>
</template>
