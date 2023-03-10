import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useAuthStore } from './auth'
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from '@/firebase/firebase'
import type { Restaurant } from '@/types/Restaurant'

const authStore = useAuthStore()

export const useRestaurantsStore = defineStore('restaurants', () => {

  const getRestaurants = computed(() => {
    if (authStore.isLoggedin && authStore.gettingDocuments) {
      return 'loading'
    }
    if (authStore.isLoggedin && !authStore.gettingDocuments) {
      return authStore.res
    }
  })

  const setRestaurant = async (resData: Restaurant) => {
    try {
      if (auth.currentUser) {
        await updateDoc(doc(db, auth.currentUser.uid, 'res'), { data: arrayUnion(resData) })
        authStore.res.push(resData)
      }
    } catch (e) {
      console.log(e);
    }
  }

  return { getRestaurants, setRestaurant }
})