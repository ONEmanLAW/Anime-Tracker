<template>
  <div>
    <h1>Dashboard</h1>
    <p>Nombre d'animes dans My Anime: {{ animeStore.getAnimeList().length }}</p>
    <p>Nombre total d'épisodes vus: {{ totalWatchedEpisodes }}</p>
  </div>
</template>

<script setup>
import { useAnimeStore } from '@/stores/counter';
import { computed } from 'vue';

const animeStore = useAnimeStore();

const totalWatchedEpisodes = computed(() => {
  const animeList = animeStore.getAnimeList();
  return animeList.reduce((total, anime) => total + anime.watched_episodes, 0);
});

</script>