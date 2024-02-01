<script setup>
import { computed } from 'vue'
import { useAnimeStore } from '@/stores/counter'

const animeStore = useAnimeStore()

const my_anime_asc = computed(() => {
  const animeList = animeStore.getAnimeList() || [];
  return animeList.sort((a, b) => {
    return a.title && b.title ? a.title.localeCompare(b.title) : 0;
  });
})

const increaseWatch = anime => {
  animeStore.increaseWatch(anime)
}

const decreaseWatch = anime => {
  animeStore.decreaseWatch(anime)
}

const removeAnime = anime => {
  animeStore.removeAnime(anime)
}
</script>


<template>
  <main>
    <h1>My Anime</h1>

    <div class="results" v-if="my_anime_asc.length > 0">
      <div class="result" v-for="anime in my_anime_asc">
        <img :src="anime.image" />
        <div class="details">
          <h3>{{ anime.title }}</h3>
          <span class="flex-1"></span>
          <span class="episodes">
            {{ anime.watched_episodes }} / {{ anime.total_episodes }}
          </span>
          <button v-if="anime.total_episodes !== anime.watched_episodes" @click="increaseWatch(anime)">+</button>
          <button v-if="anime.watched_episodes > 0" @click="decreaseWatch(anime)">-</button>
          <button @click="removeAnime(anime)">Supprimer</button>
        </div>
      </div>
    </div>
  </main>
</template>


<style>

</style>