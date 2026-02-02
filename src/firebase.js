import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7I3nHJWB0r7KT4F0EfMtherX7UDfAF3I",
  authDomain: "erizo-8eb3e.firebaseapp.com",
  projectId: "erizo-8eb3e",
  storageBucket: "erizo-8eb3e.firebasestorage.app",
  messagingSenderId: "806333927569",
  appId: "1:806333927569:web:c956e3992e1a5e43fb6f30",
  measurementId: "G-TMHZRMXQRJ"
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(firebaseApp);

// Correctly export a promise that resolves to messaging instance (or null)
export const getMessagingObject = async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    console.error("Messaging not supported:", err);
    return null;
  }
};

// fetchToken function
export const fetchToken = async (setTokenFound, setFcmToken) => {
  try {
    const messaging = await getMessagingObject();
    if (!messaging) {
      console.log("Messaging not supported in this browser");
      setTokenFound(false);
      return;
    }

    // VAPID key should be obtained from Firebase Console > Project Settings > Cloud Messaging > Web Push certificates
    // For now, we'll skip FCM token generation to prevent errors
    const vapidKey = ""; // TODO: Add your VAPID key from Firebase Console

    if (!vapidKey) {
      console.log("VAPID key not configured. Skipping FCM token generation.");
      setTokenFound(false);
      return;
    }

    const currentToken = await getToken(messaging, {
      vapidKey: vapidKey,
    });

    if (currentToken) {
      setTokenFound(true);
      setFcmToken(currentToken);
    } else {
      setTokenFound(false);
      setFcmToken();
    }
  } catch (err) {
    console.log("FCM token fetch skipped or failed:", err.message);
    setTokenFound(false);
  }
};

// onMessageListener function
export const onMessageListener = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const messaging = await getMessagingObject();
      if (!messaging) return;

      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    } catch (err) {
      reject(err);
    }
  });
