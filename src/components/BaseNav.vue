<script setup lang="ts">
import { ref, onMounted } from "vue";

const isVisible = ref(false);

onMounted(() =>
  setTimeout(() => {
    isVisible.value = true;
  }, 150)
);

const navLinks = ref([
  { link: "Home", name: "home" },
  { link: "About", name: "about" },
]);
</script>
<template>
  <nav class="py-3 mb-5 h-[56px]">
    <Transition name="navbar-anim">
      <div v-if="isVisible" class="flex justify-between items-center">
        <RouterLink
          :to="{ name: 'home' }"
          class="text-2xl font-bold text-grayish tracking-wider"
          data-test="logo"
          >Logo</RouterLink
        >
        <ul class="flex items-center gap-x-5" data-test="navLinks">
          <li v-for="item in navLinks" :key="item.link">
            <RouterLink :to="{ name: item.name }">{{ item.link }}</RouterLink>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>
<style>
.router-link-active {
  color: #ff2e63;
}

.navbar-anim-enter-active {
  transition: ease all 0.5s;
}

.navbar-anim-enter-from {
  transform: translateY(-100%);
}
</style>
