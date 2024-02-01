import { defineStore } from 'pinia'

export const useAnimeStore = defineStore({
  id: 'animeStore',
  state: () => ({
    animeList: [],
  }),
  actions: {
    addAnime(anime) {
      // Vérifiez si l'anime n'est pas déjà dans la liste
      if (!this.animeList.some(a => a.id === anime.id)) {
        this.animeList.push(anime)
        this.persistAnimeList()
      }
    },
    removeAnime(anime) {
      // Retirez l'anime de la liste
      this.animeList = this.animeList.filter(a => a.id !== anime.id)
      this.persistAnimeList()
    },
    getAnimeList() {
      return this.animeList
    },
    persistAnimeList() {
      localStorage.setItem('animeList', JSON.stringify(this.animeList))
    },
    loadAnimeListFromLocalStorage() {
      const storedList = localStorage.getItem('animeList')
      this.animeList = storedList ? JSON.parse(storedList) : []
    }
  },
})