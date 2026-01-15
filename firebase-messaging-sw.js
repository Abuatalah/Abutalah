// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-MCpoBC-626_5JU59f98pOygaCm1RO90",
  authDomain: "abutalah-d690f.firebaseapp.com",
  databaseURL: "https://abutalah-d690f-default-rtdb.firebaseio.com",
  projectId: "abutalah-d690f",
  storageBucket: "abutalah-d690f.firebasestorage.app",
  messagingSenderId: "459877871118",
  appId: "1:459877871118:web:679060d22d2a10431b165f",
  measurementId: "G-PF85DVPCTD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    data: payload.data || {},
    tag: 'masjid-notification'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received.', event.notification.tag);
  event.notification.close();

  // Handle notification click
  event.waitUntil(
    clients.matchAll({type: 'window', includeUncontrolled: true})
      .then(function(windowClients) {
        // If a window is already open, focus it
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          if (client.url === 'https://abuatalah.github.io/' && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise, open a new window
        if (clients.openWindow) {
          return clients.openWindow('https://abuatalah.github.io/');
        }
      })
  );
});
