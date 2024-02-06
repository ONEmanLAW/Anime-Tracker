<script setup>
  import { ref } from 'vue'
  import { useAnimeStore } from '@/stores/animeStore'
  

  const query = ref('')
  const search_results = ref([])
  const animeStore = useAnimeStore()

  const searchAnime = () => {
    const url = `${animeStore.apiUrl}?q=${query.value}`
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
      <button type="submit" class="button">Search</button>
    </form>

    <div class="results" v-if="search_results.length > 0">
      <div class="result" v-for="anime in search_results" :key="anime.id">
        <img :src="anime.images.jpg.image_url" />
        <div class="details">
          <h3>{{ anime.title }} :</h3>
          <p :title="anime.synopsis" v-if="anime.synopsis">
            {{ anime.synopsis.length > 150 ? anime.synopsis.slice(0, 150) + ' ...' : anime.synopsis }}
          </p>
          <span class="flex-1"></span>
          <button class="button" @click="addAnime(anime)">Add to My Anime</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  form {
    display: flex;
    max-width: 480px;
    margin: 0 auto 1.5rem;
  }

  form input {
    appearance: none;
    outline: none;
    border: none;
    background: white;

    display: block;
    color: #888;
    font-size: 1.125rem;
    padding: 0.5rem 1rem;
    width: 100%;
  }
</style>
