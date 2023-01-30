// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your web app's Firebase configuration
const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_DATABASE_URL,
  VITE_FIREBASE_VAPID_KEY,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
  databaseURL: VITE_FIREBASE_DATABASE_URL,
  vapidKey: VITE_FIREBASE_VAPID_KEY,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore();

const messaging = getMessaging(app);

const requestPermisstion = async () => {
  console.log('권한 요청중...');
  const permission = await Notification.requestPermission();
  if (permission === 'denied') {
    console.log('권한 허용 안됨..');
    return;
  }

  console.log('권한 요청 허용됨');

  const token = await getToken(messaging, {
    vapidKey: VITE_FIREBASE_VAPID_KEY,
  });

  if (token) console.log('token: ', token);
  else console.log('토큰 ㅇㄷ?');

  onMessage(messaging, (payload) => {
    console.log('메세지 도착: ', payload);
  });
};

requestPermisstion();
