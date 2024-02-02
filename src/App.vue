<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import {ref, onMounted } from "vue";
import { useAnimeStore } from "@/stores/animeStore";

const sidebarWidth = ref('200px');

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