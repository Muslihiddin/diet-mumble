<script setup lang="ts">
import { ref } from "vue";

const sidebarLinks = ref([
  { link: "Dishes", name: "dishes" },
  { link: "Restaurants", name: "restaurants" },
]);
</script>

<template>
  <ul
    class="flex flex-col gap-y-3 min-h-full min-w-[150px] mr-4 border-r border-white/10"
  >
    <li v-for="item in sidebarLinks" :key="item.name">
      <RouterLink :to="item.name">{{ item.link }}</RouterLink>
    </li>
  </ul>
</template>

<style>
.router-link-exact-active {
  text-decoration: underline;
  text-decoration-color: #08d9d6;
  text-underline-offset: 4px;
  color: #08d9d6;
  transition: all ease 0.3s;
}
</style>
