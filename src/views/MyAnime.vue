<script setup>
  import { ref, computed} from 'vue'
  import { useAnimeStore } from '@/stores/counter'


  const query = ref ('')
  const my_anime = ref ([])
  const search_results = ref ([])

  const animeStore = useAnimeStore()


  // Permet de lire de A-Z
  const my_anime_asc = computed(() => {
    return animeStore.getAnimeList().sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
  })

  const addAnime = anime => {
    search_results.value = []
    query.value = ''

    animeStore.addAnime({
      id: anime.mal_id,
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
    localStorage.setItem('my_anime', JSON.stringify(my_anime.value))
  }

  const decreaseWatch = anime => {
    anime.watched_episodes--
    localStorage.setItem('my_anime', JSON.stringify(my_anime.value))
  }
</script>

<template>
 <main>
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

    <div class="myanime" v-if="my_anime.length > 0">
      <h2>My anime</h2>

      <div v-for="anime in my_anime_asc" class="anime">
        <img :src="anime.image" />
        <h3>{{ anime.title }}</h3>
        <div class="flex-1"></div>
        <span class="episodes">
          {{ anime.watched_episodes }} / {{ anime.total_episodes }}
        </span>
        <button v-if="anime.total_episodes !== anime.watched_episodes" @click="increaseWatch(anime)">+</button>

        <button v-if="anime.watched_episodes > 0" @click="decreaseWatch(anime)">-</button>
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
