<script setup>
  import {ref, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { collapsed } from './state'

  defineProps ({
    to: {
      type: String,
      required: true
    },
  });

  const isActive = ref(false);
  
  onMounted((props) => {
    const route = useRoute()
    const isActive = computed(() => route.path === props.to)
    return { isActive, collapsed }
  });
</script>


<template>
  <router-link :to="to" class="link" :class="{ active : isActive }">
    <transition name="fade">
      <span v-if="!collapsed">
        <slot />
      </span>
    </transition>
  </router-link>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave {
  opacity: 0;
}
  .link {
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;

    margin: 0.1em 0;
    padding: 0.4em;
    border-radius: 0.25em;

    color: white;
    text-decoration: none;
  }

  .link:hover {
    background-color: var(--sidebar-bg-hover);
  }

  .link:active {
    background-color: var(--sidebar-bg-active);
  }

  .link .icon {
    flex-shrink: 0;
    width: 25px;
    margin-right: 10px;
  }
</style>