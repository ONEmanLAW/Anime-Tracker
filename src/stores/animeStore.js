// animeStore.js

import { defineStore } from 'pinia';

export const useAnimeStore = defineStore({
  id: 'animeStore',
  state: () => ({
    animeList: [],
    availableGenres: [],
  }),
  actions: {
    addAnime(anime) {
      if (!this.animeList.some(a => a.id === anime.id)) {
        anime.rating = 0;
        this.animeList.push(anime);
        this.persistAnimeList();
      }
    },

    removeAnime(animeId) {
      this.animeList = this.animeList.filter(a => a.id !== animeId);
      this.persistAnimeList();
    },

    getAnimeList() {
      return this.animeList;
    },

    setAvailableGenres(genres) {
      this.availableGenres = genres;
    },

    persistAnimeList() {
      localStorage.setItem('animeList', JSON.stringify(this.animeList));
    },

    loadAnimeListFromLocalStorage() {
      const storedList = localStorage.getItem('animeList');
      this.animeList = storedList ? JSON.parse(storedList) : [];
    },

    increaseWatch(anime) {
      anime.watched_episodes++;
      this.persistAnimeList();
    },

    decreaseWatch(anime) {
      if (anime.watched_episodes > 0) {
        anime.watched_episodes--;
        this.persistAnimeList();
      }
    },
  },
});
