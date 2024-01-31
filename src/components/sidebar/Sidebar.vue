<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth} from './state'


  export default {
    props: {},
    components: { SidebarLink },
    setup() {
      return { collapsed, toggleSidebar, sidebarWidth }
    }
  }
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapse">
        <div>V</div>
        <div>S</div>
      </span>
      <span v-else>Vue Sidebar</span>
    </h1>

    <SidebarLink>Anime</SidebarLink>
    <SidebarLink>My Anime</SidebarLink>
    <SidebarLink>Stats</SidebarLink>
    <SidebarLink>Suggestion</SidebarLink>
    

    <span class="collapse-icon" @click="toggleSidebar" :class="{ 'rotate-180' : collapse }">
      <i class='bx bx-right-arrow-alt'></i>
    </span>
  </div>
</template>

<style>
  :root {
    --sidebar-bg-color:#cf0a0a;
    --sidebar-bg-hover:#b80a0a;
    --sidebar-bg-active:#10e033;
  }
</style>

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