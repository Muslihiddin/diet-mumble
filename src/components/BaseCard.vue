<script setup lang="ts">
import type { PropType } from "vue";
import type { Meal } from "@/types/Meal";
import type { Restaurant } from "@/types/Restaurant";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useAuthStore } from "@/stores/auth";
import BaseBadge from "./BaseBadge.vue";

const authStore = useAuthStore();

const props = defineProps({
  item: {
    type: Object as PropType<Meal | Restaurant>,
    required: true,
  },
});

const options = ref(false);

const openOptions = () => (options.value = !options.value);

const handleDeletion = () => {
  authStore.deleteItem(props.item.type, props.item.id);
};
</script>

<template>
  <div
    class="relative bg-primary flex gap-x-3 rounded-lg py-2 px-2 min-w-[320px]"
  >
    <img
      src="https://source.unsplash.com/random/150×150/?meal"
      class="w-[150px] h-[150px] rounded object-cover"
    />
    <div class="w-full flex justify-between">
      <div>
        <h2 class="text-lg font-semibold">{{ item.title }}</h2>
        <p v-if="item.type === 'ml'" class="text-sm text-gray-300">
          {{ item.restaurant_title }}
        </p>
        <BaseBadge class="mt-3" :status="item.status" />
      </div>
      <div class="px-1 py-1">
        <div
          class="flex flex-col gap-y-1 cursor-pointer pt-1 px-1"
          @click="openOptions"
        >
          <Icon icon="ic:baseline-more-horiz" width="24" color="#EAEAEA" />
        </div>
      </div>
    </div>

    <Transition name="rotate-in">
      <ul
        v-if="options"
        class="absolute top-[3rem] right-4 bg-primary border border-black/30 py-2 px-3 rounded-lg"
      >
        <li
          class="hover:bg-white/10 duration-150 cursor-pointer px-3 rounded"
          @click="handleDeletion"
        >
          <p class="flex items-center gap-x-1 text-red-800 font-semibold">
            <Icon icon="mdi:delete" :inline="true" class="mt-[1px]" /> Delete
          </p>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.rotate-in-enter-active,
.rotate-in-leave-active {
  transition: all 0.1s ease;
}

.rotate-in-enter-from,
.rotate-in-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
