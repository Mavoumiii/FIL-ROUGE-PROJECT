<script setup>
import { ref } from 'vue'

const props = defineProps({ items: { type: Array, default: () => [] }, isAdmin: { type: Boolean, default: false } })
const emit = defineEmits(['navigate', 'contribution-validated', 'contribution-updated', 'contribution-deleted'])
const contributions = ref(props.items)
const editingItem = ref(null)
const editForm = ref({ title: '', village: '', content: '' })

function decide(item, status) {
	item.status = status
	if (status === 'Validé') emit('contribution-validated', item)
}
function startEditing(item) {
	editingItem.value = item
	editForm.value = { title: item.title, village: item.village || '', content: item.content || '' }
}
function saveEdit() {
	if (!editingItem.value || !editForm.value.title.trim() || !editForm.value.content.trim()) return
	Object.assign(editingItem.value, {
		title: editForm.value.title.trim(),
		village: editForm.value.village.trim(),
		content: editForm.value.content.trim(),
	})
	emit('contribution-updated', editingItem.value)
	editingItem.value = null
}
function remove(item) {
	if (window.confirm(`Supprimer le récit « ${item.title} » ?`)) emit('contribution-deleted', item)
}
</script>
<template>
	<main class="page-shell p-4 p-lg-5">
		<div class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
			<div>
				<span class="badge rounded-pill eyebrow mb-3">DAC Mayotte · réservé</span>
				<h1 class="fw-bold mb-2">Modération des contributions</h1>
				<p v-if="props.isAdmin" class="text-secondary mb-0">Relisez chaque proposition avant sa publication dans la bibliothèque.</p>
			</div>
			<button v-if="props.isAdmin" class="btn btn-outline-dark" @click="emit('navigate', 'admin')">Retour au tableau de bord</button>
		</div>
		<div v-if="!props.isAdmin" class="alert alert-warning border-0 shadow-sm">Accès réservé aux administrateurs du DAC Mayotte.</div>
		<div v-if="props.isAdmin" class="card border-0 shadow-sm overflow-hidden"><div v-for="item in contributions" :key="item.id" class="p-4 border-bottom"><div class="d-md-flex align-items-center gap-3"><div class="flex-grow-1"><span class="badge badge-tradition mb-2">{{ item.type }}</span><h2 class="h6 fw-bold mb-1">{{ item.title }}</h2><p class="small text-secondary mb-0">Proposé par {{ item.author }} · <strong>{{ item.status }}</strong></p></div><div class="d-flex gap-2 mt-3 mt-md-0"><button class="btn btn-sm btn-outline-secondary" @click="startEditing(item)">Modifier</button><button class="btn btn-sm btn-outline-danger" @click="remove(item)">Supprimer</button><button v-if="item.status !== 'Refusé'" class="btn btn-sm btn-outline-danger" @click="decide(item, 'Refusé')">Refuser</button><button v-if="item.status !== 'Validé'" class="btn btn-sm btn-danger" @click="decide(item, 'Validé')">Valider</button></div></div><form v-if="editingItem === item" class="row g-2 mt-3" @submit.prevent="saveEdit"><div class="col-md-4"><label class="form-label" :for="`edit-title-${item.id}`">Titre</label><input :id="`edit-title-${item.id}`" v-model="editForm.title" class="form-control" required></div><div class="col-md-3"><label class="form-label" :for="`edit-village-${item.id}`">Village</label><input :id="`edit-village-${item.id}`" v-model="editForm.village" class="form-control"></div><div class="col-12"><label class="form-label" :for="`edit-content-${item.id}`">Récit</label><textarea :id="`edit-content-${item.id}`" v-model="editForm.content" class="form-control" rows="4" required></textarea></div><div class="col-12 d-flex gap-2"><button class="btn btn-danger btn-sm" type="submit">Enregistrer</button><button class="btn btn-light btn-sm" type="button" @click="editingItem = null">Annuler</button></div></form></div></div>
	</main>
</template>
