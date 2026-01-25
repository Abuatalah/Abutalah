// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD79_vCbaVGiCZeBVkXQu9bKJAQdH1D9uE",
    authDomain: "test-b131e.firebaseapp.com",
    projectId: "test-b131e",
    storageBucket: "test-b131e.firebasestorage.app",
    messagingSenderId: "840806149328",
    appId: "1:840806149328:web:4b2d943140915d6c5242d5",
    measurementId: "G-GV6Q3NHCZ8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

console.log("Firebase initialized successfully!");
