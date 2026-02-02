importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyC7I3nHJWB0r7KT4F0EfMtherX7UDfAF3I",
  authDomain: "erizo-8eb3e.firebaseapp.com",
  projectId: "erizo-8eb3e",
  storageBucket: "erizo-8eb3e.firebasestorage.app",
  messagingSenderId: "806333927569",
  appId: "1:806333927569:web:c956e3992e1a5e43fb6f30",
  measurementId: "G-TMHZRMXQRJ",
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
