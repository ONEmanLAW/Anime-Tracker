<script setup>
import { computed } from 'vue';
import { useAnimeStore } from '@/stores/animeStore';
import AnimeItem from '@/components/AnimeItem.vue';

const animeStore = useAnimeStore();

const allAnimeList = computed(() => {
  return animeStore.getAnimeList();
});

const finishedAnimeList = computed(() => {
  return allAnimeList.value.filter(anime => anime.watched_episodes === anime.total_episodes);
});

const watchingAnimeList = computed(() => {
  return allAnimeList.value.filter(anime => anime.watched_episodes > 0 && anime.watched_episodes < anime.total_episodes);
});

const unfinishedAnimeList = computed(() => {
  return allAnimeList.value.filter(anime => anime.watched_episodes === 0 && !watchingAnimeList.value.includes(anime));
});

const updateAnime = (updatedAnime) => {
  animeStore.removeAnime(updatedAnime.id);
  animeStore.addAnime(updatedAnime);
};

const removeAnime = (animeId) => {
  animeStore.removeAnime(animeId);
};
</script>

<template>
  <main>
    <h1>My Anime</h1>

    <!-- Animes Finis -->
    <div>
      <h2>Animes Finis :</h2>
      <div class="results" v-if="finishedAnimeList.length > 0">
        <AnimeItem v-for="anime in finishedAnimeList" :key="anime.id" :anime="anime" @updateAnime="updateAnime" @removeAnime="removeAnime" />
      </div>
    </div>

    <!-- Animes En Cours -->
    <div>
      <h2>Animes En Cours :</h2>
      <div class="results" v-if="watchingAnimeList.length > 0">
        <AnimeItem v-for="anime in watchingAnimeList" :key="anime.id" :anime="anime" @updateAnime="updateAnime" @removeAnime="removeAnime" />
      </div>
    </div>

    <!-- Animes Non Finis -->
    <div>
      <h2>Animes Non Finis :</h2>
      <div class="results" v-if="unfinishedAnimeList.length > 0">
        <AnimeItem v-for="anime in unfinishedAnimeList" :key="anime.id" :anime="anime" @updateAnime="updateAnime" @removeAnime="removeAnime" />
      </div>
    </div>
  </main>
</template>

<style pointer>
  
</style>
