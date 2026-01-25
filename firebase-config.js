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
try {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase initialized successfully");
} catch (error) {
    console.error("❌ Firebase initialization error:", error);
}

// Backend API Configuration
const BACKEND_CONFIG = {
    // Development URL (for testing)
    // BASE_URL: "http://localhost:5000",
    
    // Production URL (after deploying backend)
    BASE_URL: "https://otp-receiver-backend.onrender.com",
    
    // API Endpoints
    ENDPOINTS: {
        AUTH: {
            LOGIN: "/api/auth/login",
            PROFILE: "/api/auth/profile"
        },
        SMS: {
            COUNTRIES: "/api/sms/countries",
            SERVICES: "/api/sms/services",
            BUY: "/api/sms/buy",
            MY_NUMBERS: "/api/sms/my-numbers",
            MESSAGES: "/api/sms/messages"
        },
        PAYMENTS: {
            CREATE: "/api/payments/create",
            HISTORY: "/api/payments/history",
            QR_GENERATE: "/api/payments/qr/generate"
        },
        USERS: {
            DASHBOARD: "/api/users/dashboard",
            ORDERS: "/api/users/orders",
            MESSAGES: "/api/users/messages"
        }
    }
};

// Export configurations
window.firebaseConfig = firebaseConfig;
window.BACKEND_CONFIG = BACKEND_CONFIG;
