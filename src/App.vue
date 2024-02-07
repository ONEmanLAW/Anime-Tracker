<template>
  <div>
    <Sidebar />
      <router-view />
  </div>
</template>

<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { onMounted } from "vue";
  import { useAnimeStore } from "@/stores/animeStore";

  const animeStore = useAnimeStore();

  onMounted(() => {
    animeStore.loadAnimeListFromLocalStorage();
  });
</script>

<style>
  
</style>