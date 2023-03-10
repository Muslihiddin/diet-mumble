import { defineStore } from 'pinia'
import { auth, db } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, reactive } from 'vue'
import { collection, getDocs, query, updateDoc, doc } from "firebase/firestore";
import type { Meal } from '@/types/Meal';
import type { Restaurant } from '@/types/Restaurant';

type typeOf = 'ml' | 'rt'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedin = ref(false)
  let meals = reactive<Meal[]>([])
  let res = reactive<Restaurant[]>([])
  const gettingDocuments = ref(false)

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isLoggedin.value = true

      const q = query(collection(db, user.uid))

      try {
        gettingDocuments.value = true
        const querySnapshot = await getDocs(q) //getting data of user

        querySnapshot.forEach((doc) => {
          if (doc.id == 'meals') {
            doc.data().data.map((x: Meal) => meals.push(x))
          }
          if (doc.id == 'res') {
            doc.data().data.map((x: Restaurant) => res.push(x))
          }
        })

      } finally {
        gettingDocuments.value = false
      }
    } else {
      isLoggedin.value = false
    }
  })

  const deleteItem = async (type: typeOf, id: any) => {
    if (auth.currentUser) {
      if (type == 'ml') {
        meals.splice(meals.findIndex(x => x.id == id), 1)
        try {
          await updateDoc(doc(db, auth.currentUser.uid, 'meals'), { data: meals }) // uploading to server new ver of meals
        } catch (e) {
          console.log("auth.ts/ line-52 ", e);
        }
      }
      if (type == 'rt') {
        res.splice(res.findIndex(x => x.id == id), 1)
        try {
          await updateDoc(doc(db, auth.currentUser.uid, 'res'), { data: res }) // uploading to server new ver of res
        } catch (e) {
          console.log("auth.ts/ line-60 ", e);
        }
      }

    }
  }

  return {
    gettingDocuments,
    isLoggedin,
    meals, res, deleteItem
  }
})