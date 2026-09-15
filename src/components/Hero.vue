<script setup>
import heroImage from '../assets/img/YT.png'
const emit = defineEmits(['navigate'])
</script>
<template><div class="container my-4"><section class="bg-white rounded-4 overflow-hidden shadow-sm"><div class="row g-0 align-items-stretch"><div class="col-lg-5 p-4 p-lg-5 d-flex flex-column justify-content-center"><h1 class="display-6 fw-bold">La Culture mahoraise,<br><span class="text-danger">Un héritage à préserver et à transmettre</span></h1><p class="mt-3">Plongez au cœur des traditions, explorez des contenus culturels et participez à une communauté engagée.</p><div class="d-flex gap-2 mt-4"><button class="btn btn-danger fw-bold" @click="emit('navigate', 'explorer')">Explorer la culture</button><button class="btn btn-outline-warning fw-bold" @click="emit('navigate', 'evenements')">Voir les événements</button></div></div><div class="col-lg-7 hero-image position-relative" :style="{ backgroundImage: `url(${heroImage})` }"></div></div></section></div></template>
