// Firebase Service Worker for Messaging
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// Firebase configuration
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
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);
    
    const notificationTitle = payload.notification.title || 'New Notification';
    const notificationOptions = {
        body: payload.notification.body || 'You have a new message',
        icon: 'https://abuatalah.github.io/favicon.png', // Your favicon or logo
        badge: 'https://abuatalah.github.io/favicon.png',
        data: payload.data || {}
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event.notification);
    event.notification.close();
    
    // Open the app when notification is clicked
    event.waitUntil(
        clients.matchAll({type: 'window', includeUncontrolled: true}).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('abuatalah.github.io') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('https://abuatalah.github.io/');
            }
        })
    );
});
