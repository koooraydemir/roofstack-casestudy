import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAuth, type Auth } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Firebase config kontrolü
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey || '',
    authDomain: config.public.firebaseAuthDomain || '',
    projectId: config.public.firebaseProjectId || '',
    storageBucket: config.public.firebaseStorageBucket || '',
    messagingSenderId: config.public.firebaseMessagingSenderId || '',
    appId: config.public.firebaseAppId || '',
  }

  // Eğer Firebase config eksikse, dummy değerler döndür
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'demo-api-key') {
    console.warn('Firebase is not configured. Using mock data.')
    return {
      provide: {
        firebase: null as FirebaseApp | null,
        db: null as Firestore | null,
        auth: null as Auth | null,
      },
    }
  }

  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig)

    // Initialize Firestore
    const db = getFirestore(app)

    // Initialize Auth
    const auth = getAuth(app)

    return {
      provide: {
        firebase: app as FirebaseApp | null,
        db: db as Firestore | null,
        auth: auth as Auth | null,
      },
    }
  } catch (error) {
    console.error('Firebase initialization error:', error)
    return {
      provide: {
        firebase: null as FirebaseApp | null,
        db: null as Firestore | null,
        auth: null as Auth | null,
      },
    }
  }
})
