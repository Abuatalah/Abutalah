// Check if user is logged in
function checkAuthState() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            console.log("User logged in:", user.email);
            
            // If on login/signup page, redirect to dashboard
            if (window.location.pathname.includes('login.html') || 
                window.location.pathname.includes('signup.html')) {
                window.location.href = 'dashboard.html';
            }
            
            // Update UI for logged in user
            updateUserUI(user);
        } else {
            // User is signed out
            console.log("User not logged in");
            
            // If on protected page, redirect to login
            if (window.location.pathname.includes('dashboard.html')) {
                window.location.href = 'login.html';
            }
        }
    });
}

// Sign up with email/password
async function signUp(email, password, name) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Save additional user data to Firestore
        await db.collection('users').doc(user.uid).set({
            name: name,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            balance: 100, // Free credits
            plan: 'starter'
        });
        
        showMessage('Account created successfully! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        
    } catch (error) {
        showMessage(error.message, 'error');
        console.error("Sign up error:", error);
    }
}

// Sign in with email/password
async function signIn(email, password) {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } catch (error) {
        showMessage(error.message, 'error');
        console.error("Sign in error:", error);
    }
}

// Sign in with Google
async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        
        // Check if user exists in Firestore
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        
        if (!userDoc.exists) {
            // Create new user in Firestore
            await db.collection('users').doc(result.user.uid).set({
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                balance: 100,
                plan: 'starter'
            });
        }
        
        showMessage('Google login successful!', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        showMessage(error.message, 'error');
        console.error("Google sign in error:", error);
    }
}

// Sign out
async function signOut() {
    try {
        await auth.signOut();
        showMessage('Logged out successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Reset password
async function resetPassword(email) {
    try {
        await auth.sendPasswordResetEmail(email);
        showMessage('Password reset email sent! Check your inbox.', 'success');
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Update user UI
function updateUserUI(user) {
    const userElements = document.querySelectorAll('.user-name, .user-email');
    userElements.forEach(element => {
        if (element.classList.contains('user-name')) {
            element.textContent = user.displayName || 'User';
        }
        if (element.classList.contains('user-email')) {
            element.textContent = user.email;
        }
    });
}

// Show message notification
function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.message-notification');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-notification ${type}`;
    messageDiv.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize auth check
document.addEventListener('DOMContentLoaded', checkAuthState);
