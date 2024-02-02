<template>
  <main>
    <h1>My Anime</h1>

    <!-- Animes Finis -->
    <div>
      <h2>Animes Finis</h2>
      <div class="results" v-if="finishedAnimeList.length > 0">
        <AnimeItem v-for="anime in finishedAnimeList" :key="anime.id" :anime="anime" @updateAnime="updateAnime" @removeAnime="removeAnime" />
      </div>
    </div>

    <!-- Animes Non Finis -->
    <div>
      <h2>Animes Non Finis</h2>
      <div class="results" v-if="unfinishedAnimeList.length > 0">
        <AnimeItem v-for="anime in unfinishedAnimeList" :key="anime.id" :anime="anime" @updateAnime="updateAnime" @removeAnime="removeAnime" />
      </div>
    </div>
  </main>
</template>

<script setup>
  import { computed } from 'vue';
  import { useAnimeStore } from '@/stores/animeStore';
  import AnimeItem from '@/components/AnimeItem.vue';

  const animeStore = useAnimeStore();

  const finishedAnimeList = computed(() => {
    return animeStore.getAnimeList().filter(anime => anime.watched_episodes === anime.total_episodes);
  });

  const unfinishedAnimeList = computed(() => {
    return animeStore.getAnimeList().filter(anime => anime.watched_episodes !== anime.total_episodes);
  });

  const removeAnime = (animeId) => {
    animeStore.removeAnime(animeId);
  };
</script>
