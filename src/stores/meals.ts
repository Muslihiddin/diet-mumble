import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Meal } from '@/types/Meal'

export const useMealsStore = defineStore('meals', () => {
  const meals = reactive<Meal[]>([
    {
      id: '01',
      image: 'https://source.unsplash.com/random/150×151/?meal',
      title: 'Meal one',
      restaurant_title: 'Retaurant title',
      status: 'wanna try',
      type: 'ml'
    },
    {
      id: '02',
      image: 'https://source.unsplash.com/random/151×150/?meal',
      title: 'Meal two',
      restaurant_title: 'Retaurant title',
      status: "not recommended",
      type: 'ml'
    },
    {
      id: '03',
      image: 'https://source.unsplash.com/random/150×152/?meal',
      title: 'Meal three',
      restaurant_title: 'Retaurant title',
      status: "recommended",
      type: 'ml'
    }
  ])

  return { meals }
})