import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
} from 'firebase/firestore'
import type { Product } from '~/types'

export const useProducts = () => {
  const { $db } = useNuxtApp()
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Tüm ürünleri getir
  const fetchProducts = async () => {
    loading.value = true
    error.value = null

    // Firebase yapılandırılmamışsa boş dizi döndür
    if (!$db) {
      console.warn('Firebase not configured')
      loading.value = false
      return []
    }

    try {
      const productsCollection = collection($db, 'products')
      const querySnapshot = await getDocs(productsCollection)

      products.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
      })) as Product[]

      return products.value
    } catch (e: any) {
      error.value = e.message
      console.error('Ürünler yüklenirken hata:', e)
      return []
    } finally {
      loading.value = false
    }
  }

  // Tekil ürün getir
  const fetchProduct = async (id: string) => {
    loading.value = true
    error.value = null

    if (!$db) {
      console.warn('Firebase not configured')
      loading.value = false
      return null
    }

    try {
      const docRef = doc($db, 'products', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          name: docSnap.data().name,
          price: docSnap.data().price,
        } as Product
      }
      return null
    } catch (e: any) {
      error.value = e.message
      console.error('Ürün yüklenirken hata:', e)
      return null
    } finally {
      loading.value = false
    }
  }

  // Yeni ürün ekle
  const addProduct = async (name: string, price: number) => {
    loading.value = true
    error.value = null

    if (!$db) {
      console.warn('Firebase not configured')
      loading.value = false
      return null
    }

    try {
      const productsCollection = collection($db, 'products')
      const docRef = await addDoc(productsCollection, {
        name,
        price,
      })

      return docRef.id
    } catch (e: any) {
      error.value = e.message
      console.error('Ürün eklenirken hata:', e)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    addProduct,
  }
}
