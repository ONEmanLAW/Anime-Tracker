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
      <h2>Your favorite genres:</h2>
      <ul>
        <li v-for="(genre, index) in mostFrequentGenres" :key="index">{{ genre }}</li>
      </ul>
      
      <div class="chart-container">
        <canvas id="pieChart"></canvas>
      </div>

      <div class="chart-container">
        <canvas id="pieChart2"></canvas>
      </div>
    </div>
  </div>
</template>

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

  const allGenres = computed(() => {
    return animeStore.getAnimeList().flatMap(anime => anime.genres || []);
  });

  const genreCount = computed(() => {
    const count = {};
    allGenres.value.forEach(genre => {
      count[genre] = (count[genre] || 0) + 1;
    });
    return count;
  });

  const genreLabels = Object.keys(genreCount.value);
  const genreData = Object.values(genreCount.value);

  const createGenrePieChart = () => {
    const data = {
      labels: genreLabels,
      datasets: [{
        label: 'Genre Count',
        data: genreData,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)'
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
            text: 'Chart of genres'
          }
        }
      }
    };

    const pieChartCanvas = document.getElementById('pieChart2');
    if (pieChartCanvas) {
      new Chart(pieChartCanvas, config);
    }
  };

  onMounted(() => {
    createPieChart();
    createGenrePieChart();
  });

  const mostFrequentGenres = computed(() => {
    const maxCount = Math.max(...Object.values(genreCount.value));
    return genreLabels.filter(genre => genreCount.value[genre] === maxCount);
  });
</script>

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

  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 5px;
  }
</style>
