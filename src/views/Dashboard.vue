<script setup>
  import { useAnimeStore } from '@/stores/animeStore';
  import Chart from 'chart.js/auto';
  import { computed, onMounted } from 'vue';

  const animeStore = useAnimeStore();

  const totalWatchedEpisodes = computed(() => {
    const animeList = animeStore.getAnimeList();
    return animeList.reduce((total, anime) => total + anime.watched_episodes, 0);
  });

  const totalCompletedAnime = computed(() => {
    const animeList = animeStore.getAnimeList();
    return animeList.filter(anime => anime.watched_episodes === anime.total_episodes).length;
  });

  const totalOngoingAnime = computed(() => {
    const animeList = animeStore.getAnimeList();
    return animeList.filter(anime => anime.watched_episodes < anime.total_episodes && anime.watched_episodes > 0).length;
  });



  const createPieChart = () => {
  const data = {
    labels: ['Ongoing animes', 'Viewed Anime'],
    datasets: [{
      label: 'Amount',
      data: [totalOngoingAnime.value, totalCompletedAnime.value],
      backgroundColor: [
        'rgb(74, 102, 228)',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }]
  };
  
  const config = {
  type: 'pie',
  data: data,
  options: {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart of animes'
      }
    }
  }
};
  
  const pieChartCanvas = document.getElementById('pieChart');
  if (pieChartCanvas) {
    new Chart(pieChartCanvas, config);
  }
};

onMounted(() => {
  createPieChart();
});

</script>


<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="stats-container">
      <div class="stat-box">
        <div class="stat-content">
          <p class="stat-label">Number of animes</p>
          <p class="stat-value">{{ animeStore.getAnimeList().length }}</p>
        </div>
      </div>
      <div class="stat-box">
        <div class="stat-content">
          <p class="stat-label">Total episodes viewed</p>
          <p class="stat-value">{{ totalWatchedEpisodes }}</p>
        </div>
      </div>
      <div class="stat-box">
        <div class="stat-content">
          <p class="stat-label">Completed animes</p>
          <p class="stat-value">{{ totalCompletedAnime }}</p>
        </div>
      </div>
      <div class="stat-box">
        <div class="stat-content">
          <p class="stat-label">Ongoing animes</p>
          <p class="stat-value">{{ totalOngoingAnime }}</p>
        </div>
      </div>
      <div class="chart-container">
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  </div>
</template>

<style>
  .dashboard {
    text-align: center;
    padding: 20px;
  }

  .stats-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }

  .stat-box {
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 20px;
    flex: 1 1 300px;
    max-width: 300px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .stat-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .stat-label {
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  .stat-value {
    font-size: 24px;
    color: #4a66e4;
  }

  .chart-container {
    margin-top: 20px;
  }
</style>

