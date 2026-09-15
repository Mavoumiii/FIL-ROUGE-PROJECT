<script setup>
import { ref, computed } from 'vue'
import { articles as defaultArticles, themes, places } from '../data/siteData.js'
const props = defineProps({ articles: { type: Array, default: () => defaultArticles }, isAdmin: { type: Boolean, default: false } })
const emit = defineEmits(['open-item', 'navigate'])
const activeTheme = ref('Tous')
const search = ref('')
const filteredArticles = computed(() => props.articles.filter((article) => (activeTheme.value === 'Tous' || article.theme === activeTheme.value) && `${article.title} ${article.village}`.toLowerCase().includes(search.value.toLowerCase())))
</script>

<template>
  <main class="page-shell p-4 p-lg-5">
        <span class="badge rounded-pill eyebrow mb-3">Bibliothèque culturelle</span>
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-3">
          <div>
            <h1 class="fw-bold mb-2">Explorer la culture</h1>
            <p class="text-secondary mb-4">Des histoires, des gestes et des visages classés pour vous accompagner dans votre découverte.</p>
          </div>
          <button v-if="props.isAdmin" class="btn btn-outline-dark" @click="emit('navigate', 'admin')">Retour au tableau de bord</button>
        </div>
    <section class="filter-panel rounded-4 p-3 p-lg-4 mb-4">
      <div class="filter-bar"><input v-model="search" type="search" placeholder="Rechercher un contenu...">
            <div class="chips">
                <button v-for="theme in themes" :key="theme" :class="{ active: activeTheme === theme }" @click="activeTheme = theme">{{ theme }}</button>
            </div>
        </div>
    </section>
    <p class="small text-secondary">{{ filteredArticles.length }} contenu{{ filteredArticles.length > 1 ? 's' : '' }} trouvé{{ filteredArticles.length > 1 ? 's' : '' }}</p>
    <div class="row g-3">
      <div v-for="item in filteredArticles" :key="item.id" class="col-sm-6 col-lg-4">
        <article class="card border-0 shadow-sm h-100 content-card" tabindex="0" @click="$emit('open-article', item)" @keyup.enter="$emit('open-article', item)">
          <img :src="item.image" :alt="item.title" class="card-img-top object-fit-cover" style="height:180px">
          <div class="card-body"><div class="d-flex gap-1 flex-wrap mb-2"><span class="badge badge-tradition">{{ item.theme }}</span></div><h2 class="h6 fw-bold">{{ item.title }}</h2><p class="small text-secondary mb-0">{{ item.village }} · {{ item.generation }}</p></div>
        </article>
      </div>
    </div>
    <p v-if="!filteredArticles.length" class="text-secondary py-4">Aucun contenu ne correspond à ces filtres.</p>
  </main>
</template>
