<script setup>
  // Sidebar
  import Sidebar from "./components/sidebar/Sidebar.vue"
  import { sidebarWidth } from './components/sidebar/state'

  import { useAnimeStore } from '@/stores/counter'
  import { onMounted } from 'vue'

  const animeStore = useAnimeStore()

  onMounted(() => {
    animeStore.loadAnimeListFromLocalStorage()
  })
</script>

<template>
  <Sidebar />
  <div :style="{ marginLeft: sidebarWidth }">
    <router-view />
  </div>
</template>

<style>

</style>
