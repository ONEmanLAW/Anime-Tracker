<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import { onMounted } from "vue";
import { useAnimeStore } from "@/stores/counter";



const animeStore = useAnimeStore();

onMounted(() => {
  animeStore.loadAnimeListFromLocalStorage();
});
</script>

<template>
  <div>
    <Sidebar />
    <div :style="{ marginLeft: sidebarWidth }">
      <router-view />
    </div>
  </div>
</template>

<style>

</style>