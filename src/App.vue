<script setup>
import { computed, onMounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Footer from './components/Footer.vue'
import AccueilPage from './views/AccueilPage.vue'
import ExplorerPage from './views/ExplorerPage.vue'
import LieuxMemoirePage from './views/LieuxMemoirePage.vue'
import EvenementsPage from './views/EvenementsPage.vue'
import QuizPage from './views/QuizPage.vue'
import ProfilPage from './views/ProfilPage.vue'
import ArtistesPage from './views/ArtistesPage.vue'
import ContribuerPage from './views/ContribuerPage.vue'
import DiasporaPage from './views/DiasporaPage.vue'
import AProposPage from './views/AProposPage.vue'
import ModerationPage from './views/ModerationPage.vue'
import AdminPage from './views/AdminPage.vue'
import CommunityProfilesPage from './views/CommunityProfilesPage.vue'
import AdminEventsPage from './views/AdminEventsPage.vue'
import ContactPage from './views/ContactPage.vue'
import { articles as initialArticles, contributors as initialContributors, events as initialEvents, moderationItems } from './data/siteData'

function pageFromPath(path) {
  if (path === '/admin') return 'admin'
  if (path === '/admin/moderation') return 'moderation'
  if (path === '/admin/profils') return 'community-profiles'
  if (path === '/admin/explorer') return 'explorer'
  if (path === '/admin/evenements') return 'admin-events'
  return 'accueil'
}

const routePath = ref(window.location.pathname)
const activePage = ref(pageFromPath(routePath.value))
const isAdmin = ref(sessionStorage.getItem('culvite-admin-auth') === 'true')
const isAuthenticated = ref(isAdmin.value)
const adminLoginError = ref('')
const currentUser = ref(isAdmin.value ? { email: 'admin@maycult.fr', name: 'Administrateur' } : null)
const contributors = ref(initialContributors.map((contributor) => ({ ...contributor })))
const publishedArticles = ref(initialArticles.map((article) => ({ ...article })))
const managedEvents = ref(initialEvents.map((event) => ({ ...event })))
const selectedItem = ref(null)
const submittedContributions = ref(moderationItems.map((item) => ({ ...item })))
const pages = { accueil: AccueilPage, explorer: ExplorerPage, 'lieux-memoire': LieuxMemoirePage, artistes: ArtistesPage, evenements: EvenementsPage, contribuer: ContribuerPage, diaspora: DiasporaPage, apropos: AProposPage, moderation: ModerationPage, admin: AdminPage, 'community-profiles': CommunityProfilesPage, 'admin-events': AdminEventsPage, contact: ContactPage, quiz: QuizPage, profil: ProfilPage }
const currentPage = computed(() => pages[activePage.value] || AccueilPage)

function navigate(page) {
  const targetPath = page === 'admin' ? '/admin' : page === 'moderation' && routePath.value.startsWith('/admin') ? '/admin/moderation' : page === 'community-profiles' ? '/admin/profils' : page === 'explorer' && routePath.value.startsWith('/admin') ? '/admin/explorer' : page === 'admin-events' ? '/admin/evenements' : '/'
  if (routePath.value !== targetPath) {
    window.history.pushState({}, '', targetPath)
    routePath.value = targetPath
  }
  activePage.value = pages[page] ? page : 'accueil'
  selectedItem.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function connect(user) {
  currentUser.value = user
  isAuthenticated.value = true
  isAdmin.value = user.email.toLowerCase() === 'admin@maycult.fr'
  if (isAdmin.value) sessionStorage.setItem('culvite-admin-auth', 'true')
  navigate('profil')
}
function connectAdmin(credentials) {
  if (credentials.email.toLowerCase() !== 'admin@maycult.fr' || !credentials.password) {
    adminLoginError.value = 'Adresse admin ou mot de passe incorrect.'
    return
  }
  adminLoginError.value = ''
  currentUser.value = { email: credentials.email, name: 'Administrateur' }
  isAuthenticated.value = true
  isAdmin.value = true
  sessionStorage.setItem('culvite-admin-auth', 'true')
}
function disconnect() { currentUser.value = null; isAuthenticated.value = false; isAdmin.value = false; sessionStorage.removeItem('culvite-admin-auth'); navigate('accueil') }
function openItem(item) { selectedItem.value = item }
function addContribution(contribution) { submittedContributions.value.unshift(contribution); activePage.value = 'moderation' }
function addValidatedContributor(contribution) {
  const contributorName = contribution.author.trim()
  if (contributorName && !contributors.value.some((contributor) => contributor.name.toLowerCase() === contributorName.toLowerCase())) {
    contributors.value.push({
      name: contributorName,
      role: contribution.village ? `Contributeur, ${contribution.village}` : 'Contributeur culturel',
      initials: contributorName.slice(0, 2).toUpperCase(),
    })
  }
  if (!publishedArticles.value.some((article) => article.sourceContributionId === contribution.id)) {
    publishedArticles.value.push({
      id: `contribution-${contribution.id}`,
      sourceContributionId: contribution.id,
      category: 'Histoires',
      theme: 'Histoires',
      title: contribution.title,
      village: contribution.village || 'Mayotte',
      generation: `Récit de ${contributorName || 'la communauté'}`,
      type: contribution.type,
      image: initialArticles[0].image,
      description: contribution.content,
      excerpt: contribution.content,
      content: contribution.content,
    })
  }
}
function updateContribution(contribution) {
  const publishedArticle = publishedArticles.value.find((article) => article.sourceContributionId === contribution.id)
  if (publishedArticle) {
    Object.assign(publishedArticle, {
      title: contribution.title,
      village: contribution.village || 'Mayotte',
      type: contribution.type,
      description: contribution.content,
      excerpt: contribution.content,
      content: contribution.content,
    })
  }
}
function deleteContribution(contribution) {
  const contributionIndex = submittedContributions.value.findIndex((item) => item.id === contribution.id)
  if (contributionIndex !== -1) submittedContributions.value.splice(contributionIndex, 1)
  const publishedIndex = publishedArticles.value.findIndex((article) => article.sourceContributionId === contribution.id)
  if (publishedIndex !== -1) publishedArticles.value.splice(publishedIndex, 1)
}
function addEvent(event) { managedEvents.value.push(event) }
function updateEvent(event) {
  const index = managedEvents.value.findIndex((item) => item.id === event.id)
  if (index !== -1) managedEvents.value[index] = event
}
function deleteEvent(event) { managedEvents.value = managedEvents.value.filter((item) => item.id !== event.id) }
const allEvents = computed(() => managedEvents.value)
const isAdminRoute = computed(() => routePath.value.startsWith('/admin'))
onMounted(() => {
  window.addEventListener('popstate', () => {
    routePath.value = window.location.pathname
    activePage.value = pageFromPath(routePath.value)
  })
})
</script>

<template>
  <template v-if="isAdminRoute">
    <Navbar admin-mode :active-page="activePage" :is-authenticated="isAuthenticated" :is-admin="isAdmin" @navigate="navigate" @disconnect="disconnect" />
    <component :is="currentPage" :items="submittedContributions" :articles="publishedArticles" :events="allEvents" :contributors="contributors" :is-authenticated="isAuthenticated" :is-admin="isAdmin" :login-error="adminLoginError" :current-user="currentUser" @navigate="navigate" @connect="connect" @admin-login="connectAdmin" @event-created="addEvent" @event-updated="updateEvent" @event-deleted="deleteEvent" @open-article="openItem" @open-event="openItem" @open-place="openItem" @submit-contribution="addContribution" @contribution-validated="addValidatedContributor" @contribution-updated="updateContribution" @contribution-deleted="deleteContribution" />
    <Footer admin-mode />
  </template>
  <template v-else>
    <Navbar :active-page="activePage" :is-authenticated="isAuthenticated" :is-admin="isAdmin" @navigate="navigate" @disconnect="disconnect" />
    <Hero v-if="activePage === 'accueil'" @navigate="navigate" />
    <main class="container my-4"><component :is="currentPage" :items="submittedContributions" :articles="publishedArticles" :events="allEvents" :contributors="contributors" :is-authenticated="isAuthenticated" :is-admin="isAdmin" :current-user="currentUser" @navigate="navigate" @connect="connect" @open-article="openItem" @open-event="openItem" @open-place="openItem" @submit-contribution="addContribution" @contribution-validated="addValidatedContributor" @contribution-updated="updateContribution" @contribution-deleted="deleteContribution" /></main>
    <Footer @navigate="navigate" />
  </template>
  <div v-if="selectedItem" class="modal-backdrop-custom" @click.self="selectedItem = null">
    <div class="modal-card bg-white rounded-3 shadow p-4">
      <button class="btn-close float-end" @click="selectedItem = null"></button>
      <h2 class="h4 pe-4">{{ selectedItem.title || selectedItem.name }}</h2>
      <img v-if="selectedItem.image" :src="selectedItem.image" :alt="selectedItem.title || selectedItem.name" class="modal-image rounded-3 mb-3">
      <p class="text-secondary">{{ selectedItem.description || selectedItem.content }}</p>
      <p v-if="selectedItem.theme || selectedItem.type" class="small text-secondary mb-3">{{ selectedItem.theme }}<span v-if="selectedItem.theme && selectedItem.type"> · </span>{{ selectedItem.type }}</p>
      <p v-if="selectedItem.location" class="mb-3"><strong>Lieu :</strong> {{ selectedItem.location }}</p>
      <button class="btn btn-danger" @click="selectedItem = null">Fermer</button>
    </div>
  </div>
</template>
