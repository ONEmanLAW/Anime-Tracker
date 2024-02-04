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
    emit('removeAnime', props.anime.id);
  };
</script>


<template>
  <div class="result">
    <img :src="anime.image" />
    <div class="details">
      <h3>{{ anime.title }}</h3>
      <span class="flex-1"></span>
      <span class="episodes">
        {{ anime.watched_episodes }} / {{ anime.total_episodes }}
      </span>
      <button v-if="anime.total_episodes !== anime.watched_episodes" @click="increaseWatch">+</button>
      <button v-if="anime.watched_episodes > 0" @click="decreaseWatch">-</button>
      <button @click="removeAnime">Supprimer</button>
      <label for="rating">Note:</label>
      <select id="rating" v-model="anime.rating" @change="updateRating">
        <option v-for="i in 11" :key="i" :value="i - 1">{{ i - 1 }}</option>
      </select>
    </div>
  </div>
</template>
