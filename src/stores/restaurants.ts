import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Restaurant } from '@/types/Restaurant'

export const useRestaurantsStore = defineStore('restaurants', () => {
  const restaurants = reactive<Restaurant[]>([
    {
      id: '01',
      title: 'Restaurant one',
      status: 'recommended',
      type: 'rt'
    },
    {
      id: '02',
      title: 'Restaurant two',
      status: 'not recommended',
      type: 'rt'
    }
  ])

  return { restaurants }
})