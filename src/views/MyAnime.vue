<script setup>
  import { computed } from 'vue'
  import { useAnimeStore } from '@/stores/animeStore'

  const animeStore = useAnimeStore()

  const myAnimeList = computed(() => {
    const animeList = animeStore.getAnimeList() || [];
    return animeList.sort((a, b) => a.title.localeCompare(b.title));
  })

  const finishedAnimeList = computed(() => {
    return myAnimeList.value.filter(anime => anime.watched_episodes === anime.total_episodes);
  });

  const unfinishedAnimeList = computed(() => {
    return myAnimeList.value.filter(anime => anime.watched_episodes !== anime.total_episodes);
  });

  const increaseWatch = anime => {
    animeStore.increaseWatch(anime)
  };

  const decreaseWatch = anime => {
    animeStore.decreaseWatch(anime)
  };

  const removeAnime = anime => {
    animeStore.removeAnime(anime)
  };
</script>


<template>
  <main>
    <h1>My Anime</h1>

    <!-- Animes Finis -->
    <div>
      <h2>Animes Finis</h2>
      <div class="results" v-if="finishedAnimeList.length > 0">
        <div class="result" v-for="anime in finishedAnimeList" :key="anime.id">
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
            <label for="rating">Note:</label>
            <select id="rating" v-model="anime.rating">
              <option v-for="i in 11" :key="i" :value="i - 1">{{ i - 1 }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Animes Non Finis -->
    <div>
      <h2>Animes Non Finis</h2>
      <div class="results" v-if="unfinishedAnimeList.length > 0">
        <div class="result" v-for="anime in unfinishedAnimeList" :key="anime.id">
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
            <label for="rating">Note:</label>
            <select id="rating" v-model="anime.rating">
              <option v-for="i in 11" :key="i" :value="i - 1">{{ i - 1 }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
