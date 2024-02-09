<template>
  <main>
    <h1>My Anime Tracker</h1>

    <form @submit.prevent="searchAnime">
      <input 
        type="text"
        placeholder="Search for an anime ..." 
        v-model="query" 
        @input="handleInput" />
      <button type="submit" class="button">Search</button>
    </form>

    <div class="empty-results" v-if="search_results.length === 0">
      <p>No results found.</p>
    </div>

    <div class="results" v-if="search_results.length > 0">
      <div class="result" v-for="anime in search_results" :key="anime.id">
        <img :src="anime.images.jpg.image_url" />
        <div class="details">
          <h3>{{ anime.title }}</h3>
          <p :title="anime.synopsis" v-if="anime.synopsis">
            {{ anime.synopsis.length > 150 ? anime.synopsis.slice(0, 150) + ' ...' : anime.synopsis }}
          </p>
          <div class="genres">
            <span class="genre" v-for="(genre, index) in anime.genres" :key="index">
              {{ genre.name }}{{ index !== anime.genres.length - 1 ? ' ' : '' }}
            </span>
          </div>
          <span class="flex-1"></span>
          <button class="button" @click="addAnime(anime)">Add to My Anime</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useAnimeStore } from '@/stores/animeStore';
import { ref } from 'vue';

const animeStore = useAnimeStore();
const query = ref('');
const search_results = ref([]);
const searching = ref(false);

const searchAnime = () => {
  searching.value = true;
  const url = `${animeStore.apiUrl}?q=${query.value}`;
  fetch(url)
    .then(res => res.json())
    .then(res => {
      search_results.value = res.data || [];
    })
    .finally(() => {
      searching.value = false;
    });
};

const handleInput = event => {
  if (!event.target.value) {
    search_results.value = [];
  }
};

const addAnime = anime => {
  animeStore.addAnime({
    id: anime.mal_id,
    title: anime.title,
    image: anime.images.jpg.image_url,
    total_episodes: anime.episodes,
    watched_episodes: 0,
    genres: anime.genres.map(genre => genre.name),
  });
};
</script>

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

.genres {
  margin-top: 0.5rem;
}

.genre {
  margin-right: 0.5rem;
  background-color: var(--primary);
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  display: inline-block;
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
