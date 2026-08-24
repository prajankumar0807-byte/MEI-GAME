import { getAnalytics, isSupported } from 'firebase/analytics';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase Web SDK configuration supplied for the MEIGAME project (mei-quiz).
// These values are safe to use in browser code; Firebase security is enforced
// by Authentication, Firestore/Storage Rules, and the trusted backend.
const firebaseConfig = {
  apiKey: "AIzaSyDxDYnDzhsefpdlpadNo_IVDsXKcXR_egk",
  authDomain: "mei-game.firebaseapp.com",
  projectId: "mei-game",
  storageBucket: "mei-game.firebasestorage.app",
  messagingSenderId: "1005304041187",
  appId: "1:1005304041187:web:a526c3f08dc76b3783bfd6",
  
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

// Analytics is optional and is only initialized in supported browser contexts.
export const analyticsPromise =
  typeof window !== 'undefined'
    ? isSupported().then((supported) => (supported ? getAnalytics(firebaseApp) : null))
    : Promise.resolve(null);
