<script setup>
  // Pour L'API
  import { ref } from 'vue'

  import { useAnimeStore } from '@/stores/counter'

  const query = ref ('')
  const search_results = ref ([])
  const animeStore = useAnimeStore()

  // Aller cherche l'api
  const searchAnime = () => {
    const url = `https://api.jikan.moe/v4/anime?q=${query.value}`
    fetch(url)
    .then (res => res.json ())
    .then (res => {
      search_results.value = res.data
    })
  }

  const handleInput = event => {
    if (!event.target.value) {
      search_results.value = []
    }
  }

  const addAnime = anime => {
    animeStore.addAnime(anime)
  }
</script>

<template>
 <main>
    <h1>My Anime Tracker</h1>

    <form @submit.prevent="searchAnime">
      <input 
        type="text"
        placeholder="search for a anime ..." 
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
          <button @click="addAnime(anime)">Add to my Anime</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
  @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
