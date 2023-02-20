<script setup lang="ts">
import type { PropType } from "vue";
import type { Meal } from "@/types/Meal";
import type { Restaurant } from "@/types/Restaurant";
import BaseCard from "../BaseCard.vue";

defineProps({
  item: {
    type: Object as PropType<Meal | Restaurant>,
    required: true,
  },
});
</script>

<template>
  <li>
    <BaseCard :item="item" />
  </li>
</template>
