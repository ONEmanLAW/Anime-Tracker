<script setup>
// Pour L'API
import { ref, computed, onMounted } from 'vue'

// Query pour ce que l'on tape pour trouver l'animé 
const query = ref ('')
// Les animé qu'on ajout a notre list
const my_anime = ref ([])
// Tout les resulta après le result de notre query
const search_results = ref ([])


// Permet de lire de A-Z
const my_anime_asc = computed(() => {
  return my_anime.value.sort((a, b) => {
    return a.title.localeCompare(b.title)
  })
})

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
  search_results.value = []
  query.value = ''

  my_anime.value.push({
    id: anime.mal.id,
    title: anime.title,
    image: anime.images.jpg.image_url,
    total_episodes: anime.episodes,
    // Vient pas de L'Api
    watched_episodes: 0
  })

  localStorage.setItem('my_anime', JSON.stringify(my_anime.value))
}

const increaseWatch = anime => {
  anime.watched_episodes++
  localStorage.setItem('my_anime', JSON.stringify(my.anime.value))
}

const decreaseWatch = anime => {
  anime.watched_episodes--
  localStorage.setItem('my_anime', JSON.stringify(my.anime.value))
}

onMounted(() => {
  my_anime.value = JSON.parse(localStorage.getItem('my_anime')) || []
})
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

</style>
