<script setup>
import { ref } from 'vue'
import { navigationLinks } from '../data/siteData'
const props = defineProps({ activePage: { type: String, default: 'accueil' }, isAuthenticated: { type: Boolean, default: false }, isAdmin: { type: Boolean, default: false }, adminMode: { type: Boolean, default: false } })
const emit = defineEmits(['navigate', 'disconnect'])
const open = ref(false)
function go(page) { open.value = false; emit('navigate', page) }
</script>
<template>
	<nav v-if="props.adminMode" class="navbar navbar-expand-lg navbar-dark navbar-custom shadow-sm bg-light">
		<div class="container navbar-inner">
			<button class="brand border-0 bg-transparent p-0" aria-label="Tableau de bord admin" @click="go('admin')"><img src="../assets/img/logomayCult.png" alt="Logo May'Cult" class="brand-logo img-fluid"></button>
			<div class="d-flex flex-wrap justify-content-end gap-2 ms-auto">
				<button class="btn btn-warning fw-bold" @click="go('accueil')">Voir le site</button>
				<button v-if="props.isAdmin" class="btn btn-outline-dark" @click="emit('disconnect')">Se déconnecter</button>
			</div>
		</div>
	</nav>
	<nav v-else class="navbar navbar-expand-lg navbar-dark navbar-custom shadow-sm bg-light"><div class="container navbar-inner"><a href="#" aria-label="Retour à l’accueil" @click.prevent="go('accueil')"><img src="../assets/img/logomayCult.png" alt="Logo May'Cult" class="brand-logo img-fluid"></a><button class="navbar-toggler" type="button" :aria-expanded="open" aria-label="Ouvrir le menu" @click="open = !open"><span class="navbar-toggler-icon"></span></button><div class="navbar-collapse" :class="{ show: open }"><ul class="navbar-nav mx-auto"><li v-for="link in navigationLinks" :key="link.id" class="nav-item"><a class="nav-link text-black fw-bold" :class="{ active: activePage === link.id }" href="#" @click.prevent="go(link.id)">{{ link.label }}</a></li></ul><button v-if="!isAuthenticated" class="btn btn-warning fw-bold" @click="go('profil')">Se connecter</button><button v-if="activePage === 'profil'" class="btn btn-outline-danger fw-bold ms-2" @click="go('admin')">Espace admin</button><div v-else-if="isAuthenticated" class="navbar-actions"><button class="btn btn-warning fw-bold" @click="go('profil')">Mon profil</button><button v-if="isAdmin" class="btn btn-outline-danger" @click="go('admin')">Espace admin</button><button class="btn btn-outline-dark" @click="emit('disconnect')">Se déconnecter</button></div></div></div></nav>
</template>
