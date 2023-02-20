<script setup lang="ts">
import type { PropType } from "vue";
import type { Meal } from "@/types/Meal";
import type { Restaurant } from "@/types/Restaurant";
import BaseBadge from "./BaseBadge.vue";

defineProps({
  item: {
    type: Object as PropType<Meal | Restaurant>,
    required: true,
  },
});
</script>

<template>
  <div class="bg-primary flex gap-x-3 rounded-lg py-2 px-2 min-w-[320px]">
    <img src="../assets/logo.svg" class="w-[150px]" />
    <div class="flex flex-col">
      <h2 class="text-lg font-semibold">{{ item.title }}</h2>
      <p v-if="item.type === 'ml'" class="text-sm text-gray-300">
        {{ item.restaurant_title }}
      </p>
      <BaseBadge class="mt-3" :status="item.status" />
    </div>
  </div>
</template>
