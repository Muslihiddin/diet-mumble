import { defineStore } from 'pinia'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedin = ref(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedin.value = true
    } else {
      isLoggedin.value = false
    }
  })


  return {
    isLoggedin
  }
})