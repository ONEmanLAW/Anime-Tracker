<script setup>
import { ref } from 'vue'
import { useAnimeStore } from '@/stores/animeStore'

const query = ref('')
const search_results = ref([])
const animeStore = useAnimeStore()

const searchAnime = () => {
  const url = `https://api.jikan.moe/v4/anime?q=${query.value}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      search_results.value = res.data
    })
}

const handleInput = event => {
  if (!event.target.value) {
    search_results.value = []
  }
}


const addAnime = anime => {
  animeStore.addAnime({
    id: anime.mal_id,
    title: anime.title,
    image: anime.images.jpg.image_url,
    total_episodes: anime.episodes,
    watched_episodes: 0,
  })
}
</script>


<template>
  <main>
    <h1>My Anime Tracker</h1>

    <form @submit.prevent="searchAnime">
      <input 
        type="text"
        placeholder="search for an anime ..." 
        v-model="query" 
        @input="handleInput" />
      <button type="submit">Search</button>
    </form>

    <div class="results" v-if="search_results.length > 0">
      <div class="result" v-for="anime in search_results">
        <img :src="anime.images.jpg.image_url" />
        <div class="details">
          <h3> {{ anime.title }}</h3>
          <p :title="anime.synopsis" v-if="anime.synopsis">
            {{ anime.synopsis.slice(0, 120) }}
          </p>
          <span class="flex-1"></span>
          <button @click="addAnime(anime)">Add to My Anime</button>
        </div>
      </div>
    </div>
  </main>
</template>


<style>

</style>