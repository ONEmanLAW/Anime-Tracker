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
      <select id="rating" v-model="anime.rating">
        <option v-for="i in 11" :key="i" :value="i - 1">{{ i - 1 }}</option>
      </select>
      <p v-if="anime.watched_episodes === anime.total_episodes">
        <strong>Statut:</strong> Fini
      </p>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps(['anime']);
  const emit = defineEmits();

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
