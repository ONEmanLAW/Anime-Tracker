<script setup>
  import { useAnimeStore } from '@/stores/animeStore';
  import { computed } from 'vue';

  const animeStore = useAnimeStore();

  const totalWatchedEpisodes = computed(() => {
    const animeList = animeStore.getAnimeList();
    return animeList.reduce((total, anime) => total + anime.watched_episodes, 0);
  });

  const totalCompletedAnime = computed(() => {
    const animeList = animeStore.getAnimeList();
    return animeList.filter(anime => anime.watched_episodes === anime.total_episodes).length;
  });

  const totalOngoingAnime = computed(() => {
    const animeList = animeStore.getAnimeList();
    return animeList.filter(anime => anime.watched_episodes < anime.total_episodes && anime.watched_episodes > 0).length;
  });
</script>


<template>
  <div>
    <h1>Dashboard</h1>
    <p>Nombre d'animes dans My Anime: {{ animeStore.getAnimeList().length }}</p>
    <p>Nombre total d'épisodes vus: {{ totalWatchedEpisodes }}</p>
    <p>Nombre total d'animes terminés: {{ totalCompletedAnime }}</p>
    <p>Nombre d'animes en cours: {{ totalOngoingAnime }}</p>
  </div>
</template>
