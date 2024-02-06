<script setup>
  import SidebarLink from './SidebarLink.vue';
  import { collapsed, toggleSidebar, sidebarWidth } from './state';

  defineProps({
    to: {
      type: String,
      required: true
    }
  });
</script>


<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>S</div>
        <div>b</div>
      </span>
      <span v-else>Sidebar :</span>
    </h1>

    <SidebarLink to="/">Anime</SidebarLink>
    <SidebarLink to="myanime">My Anime</SidebarLink>
    <SidebarLink to="dashboard">Dashboard</SidebarLink>
    <SidebarLink to="suggestion">Suggestion</SidebarLink>

    <span class="collapse-icon" @click="toggleSidebar" :class="{ 'rotate-180': collapsed }">
      <i class='bx bx-right-arrow-alt'></i>
    </span>
  </div>
</template>


<style scoped>
  .sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
  }

  .collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;

    color: rgba(255, 255, 255, 0.7);

    transition: 0.2s linear;
  }

  .rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
  }
</style>