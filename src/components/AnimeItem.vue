<script setup>
  import { defineProps, defineEmits, ref, onMounted } from 'vue';

  const props = defineProps(['anime']);
  const emit = defineEmits();

  const loadedRating = ref(localStorage.getItem('animeRating_' + props.anime.id) || 0);
  props.anime.rating = loadedRating.value;

  onMounted(() => {
    localStorage.setItem('animeRating_' + props.anime.id, props.anime.rating);
  });
  
  const updateRating = () => {
    localStorage.setItem('animeRating_' + props.anime.id, props.anime.rating);
  };

  const increaseWatch = () => {
    props.anime.watched_episodes++;
    emit('updateAnime', props.anime);
  };

  const decreaseWatch = () => {
    if (props.anime.watched_episodes > 0) {
      props.anime.watched_episodes--;
      emit('updateAnime', props.anime);
    }
  };

  const removeAnime = () => {
    const confirmDelete = confirm(`Voulez-vous vraiment supprimer "${props.anime.title}" de votre liste ?`);
    if (confirmDelete) {
      setTimeout(() => {
        emit('removeAnime', props.anime.id);
        alert(`"${props.anime.title}" a été supprimé de votre liste.`);
      }, 500);
    }
  };
</script>


<template>
  <div class="result">
    <img :src="anime.image" />
    <div class="details">
      <h3>{{ anime.title }} :</h3>
      <div class="genres">
        <span class="genre" v-for="(genre, index) in anime.genres" :key="index">
          {{ genre }}
        </span>
      </div>
      <span class="episodes">
        {{ anime.watched_episodes }} / {{ anime.total_episodes }}
      </span>
      <div class="episodes-buttons">
        <button class="button" v-if="anime.total_episodes !== anime.watched_episodes" @click="increaseWatch">+</button>
        <button class="button" v-if="anime.watched_episodes > 0" @click="decreaseWatch">-</button>
      </div>
      <div class="rating-select">
        <label for="rating">Note:</label>
        <select id="rating" class="button" v-model="anime.rating" @change="updateRating">
          <option v-for="i in 11" :key="i" :value="i - 1">{{ i - 1 }}</option>
        </select>
      </div>
      <div class="remove-button">
        <button class="button" @click="removeAnime">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .episodes {
    color: #888;
    margin-top: 5px;
  }
  .episodes-buttons {
    display: flex;
  }

  .episodes-buttons button {
    margin-right: 5px;
    width: 45px; 
  }

  .rating-select {
    margin-top: 50px;
    display: flex;
    align-items: center;
  }

  label {
    color: #888;
    margin-right: 10px;
  }

  select {
    -webkit-appearance: menulist-button; 
    appearance: menulist-button;
    padding: 5px;
    background-color: black;
    color: white;
  }

  option {
    color: #fff;
    background: gray;
  }

  .remove-button {
    margin-top: 50px;
  }
</style>

