<script setup>
  import { ref } from 'vue'
import { useAnimeStore } from '@/stores/animeStore'

const query = ref('')
const search_results = ref([])
const searching = ref(false)
const animeAdded = ref(false)
const successMessage = ref('')
const animeStore = useAnimeStore()

const searchAnime = () => {
  searching.value = true
  const url = `${animeStore.apiUrl}?q=${query.value}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      search_results.value = res.data || []
    })
    .finally(() => {
      searching.value = false
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
  animeAdded.value = true
  successMessage.value = `Vous avez ajouté "${anime.title}" à votre liste.`
  setTimeout(() => {
    animeAdded.value = false
  }, 3000)
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

    <div class="empty-results" v-if="search_results.length === 0">
      <p>0 films affichés</p>
    </div>

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
    <div class="success-message" v-if="animeAdded">
      <p>{{ successMessage }}</p>
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
    background: var(--light);

    display: block;
    color: var(--gray);
    font-size: 1.125rem;
    padding: 0.5rem 1rem;
    flex: 1;
    width: 300px;
  }

  .empty-results {
    display: flex;
    justify-content: center;
    margin-right: 10vw; 
    align-items: center;
    height: 10vh; 
  }
  
  .empty-results p {
    font-size: 1.5rem; 
    color: var(--gray);
  }

  .success-message {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--primary);
  color: white; 
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif; 
}

.success-message p {
  margin: 0; 
}

@media screen and (max-width: 768px) {
  form {
    max-width: calc(100% - 70px); 
  }

  form input {
    max-width: 100%;  
  }
}
</style>
