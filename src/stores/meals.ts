import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useAuthStore } from './auth'
import { db, auth } from '@/firebase/firebase'
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import type { Meal } from '@/types/Meal';

const authStore = useAuthStore()
export const useMealsStore = defineStore('meals', () => {

  const getMeals = computed(() => {
    if (authStore.isLoggedin && authStore.gettingDocuments) {
      return 'loading'
    }
    if (authStore.isLoggedin && !authStore.gettingDocuments) {
      return authStore.meals
    }
  })

  const setMeal = async (mealData: Meal) => {
    try {
      if (auth.currentUser) {
        await updateDoc(doc(db, auth.currentUser.uid, 'meals'), { data: arrayUnion(mealData) })
        authStore.meals.push(mealData)
      }
    } catch (e) {
      console.log(e);
    }
  }

  return { getMeals, setMeal }
})