import { ref, computed } from 'vue'

const COLLAPSE_THRESHOLD = 700;


const isInitiallyCollapsed = window.innerWidth <= COLLAPSE_THRESHOLD;

export const collapsed = ref(isInitiallyCollapsed)

export const toggleSidebar = () => (collapsed.value = !collapsed.value)

export const sidebarWidth = computed(() => {
  return collapsed.value ? '50px' : '180px'; 
})

window.addEventListener('resize', () => {
  collapsed.value = window.innerWidth <= COLLAPSE_THRESHOLD;
});
