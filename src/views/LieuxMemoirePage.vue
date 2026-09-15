<script setup>
import { places } from '../data/siteData.js'
</script>

<template>
  <main class="page-shell p-4 p-lg-5">
    <span class="badge rounded-pill eyebrow mb-3">Sur la carte</span>
    <section class="section container-wide px-0">
      <div class="section-heading">
        <div>
          <span class="section-kicker">Patrimoine vivant</span>
          <h1 class="h2 fw-bold mb-0">Lieux de mémoire</h1>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Lieu</th>
              <th>Village</th>
              <th>Thématique</th>
              <th>Accès</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="place in places" :key="place.name">
              <td><strong>{{ place.name }}</strong></td>
              <td>{{ place.village }}</td>
              <td><span class="badge badge-tradition">{{ place.type }}</span></td>
              <td><span class="status">{{ place.access }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>