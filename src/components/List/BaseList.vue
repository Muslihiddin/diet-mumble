<script setup lang="ts">
import type { PropType } from "vue";
import type { Meal } from "@/types/Meal";
import type { Restaurant } from "@/types/Restaurant";
import ListItem from "./ListItem.vue";

defineProps({
  list: {
    type: Array as PropType<Meal[] | Restaurant[]>,
  },
});
</script>
<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <ListItem v-for="item in list" :key="item.id" :item="item" />
  </ul>
</template>
