<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <NuxtLink to="/" class="logo">
          <span class="logo-text">HoopRepublic</span>
        </NuxtLink>
        <h1>Create your account</h1>
        <p>Join the London basketball community</p>
      </div>

      <form @submit.prevent="handleSignup" class="auth-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">First Name</label>
            <input 
              id="name" 
              v-model="form.name" 
              type="text" 
              placeholder="Enter your first name"
              required 
            />
          </div>
          <div class="form-group">
            <label for="surname">Last Name</label>
            <input 
              id="surname" 
              v-model="form.surname" 
              type="text" 
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email" 
            v-model="form.email" 
            type="email" 
            placeholder="you@example.com"
            required 
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input 
              id="password" 
              v-model="form.password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="Create a strong password"
              required 
              minlength="8"
            />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .87-.03 1.28-.09"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
            </button>
          </div>
          <span class="hint">At least 8 characters</span>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <div class="password-input">
            <input 
              id="confirmPassword" 
              v-model="form.confirmPassword" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="Confirm your password"
              required 
            />
            <!-- No toggle button here as it shares state with the main password field, or maybe add one that ALSO toggles the same state? 
                 Actually, usually show/hide toggles all password fields or each has its own. 
                 The simplest is to just let the main toggle control both since they share the state variable.
                 BUT, if I want to have icons in both, I should add the icon here too.
                 Wait, if I add the icon here, I should make sure it toggles the SAME state variable. 
                 Yes, that's fine. -->
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .87-.03 1.28-.09"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
            </button>
          </div>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Creating account...' : 'Create Account' }}
        </button>

        <div class="auth-divider">
          <span>or</span>
        </div>

        <div class="google-auth-wrapper">
          <GoogleSignInButton 
            @success="handleGoogleSuccess" 
            @error="handleGoogleError" 
          />
        </div>
      </form>

      <div class="auth-footer">
        <p>Already have an account? <NuxtLink to="/auth/signin">Sign in</NuxtLink></p>
      </div>
    </div>

    <div class="auth-visual">
      <!-- 
        To use a video background: 
        1. Place your MP4 file in `public/background-video.mp4`
        2. The poster image below will show while loading or if no video is present.
      -->
      <video autoplay muted loop playsinline class="bg-video" poster="/auth-bg.png">
        <!-- Add a working video source here later, e.g. <source src="/background-video.mp4" type="video/mp4"> -->
      </video>
      <div class="visual-overlay"></div>
      
      <div class="visual-content">
        <h2>Find your game</h2>
        <p>Connect with players, discover courts, and never miss a pickup game in London.</p>
        <div class="features">
          <div class="feature">
            <span class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </span>
            <span>Find courts near you</span>
          </div>
          <div class="feature">
            <span class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </span>
            <span>Join pickup games</span>
          </div>
          <div class="feature">
            <span class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <span>Connect with players</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GoogleSignInButton } from 'vue3-google-signin'

definePageMeta({
  layout: false
})

const { fetchUser } = useUser()
const router = useRouter()

const form = ref({
  name: '',
  surname: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleSignup = async () => {
  error.value = ''

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  if (form.value.password.length < 8) {
    error.value = 'Password must be at least 8 characters'
    return
  }

  loading.value = true

  try {
    const response = await $fetch('/api/auth/signup', {
      method: 'POST',
      body: {
        name: form.value.name,
        surname: form.value.surname,
        email: form.value.email,
        password: form.value.password
      }
    })

    // Update global user state
    await fetchUser()

    // Redirect to complete profile
    router.push('/profile/setup')
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to create account. Please try again.'
  } finally {
    loading.value = false
  }
}

const handleGoogleSuccess = async (response: any) => {
  const { credential } = response
  loading.value = true
  error.value = ''
  
  try {
    const res = await $fetch('/api/auth/google', {
      method: 'POST',
      body: { credential }
    })
    
    // Update global user state
    await fetchUser()
    
    // Check if new user -> maybe redirect to profile setup?
    // Since Google signup creates minimal profile, redirecting to setup helps
    router.push('/profile/setup') 
  } catch (err: any) {
    error.value = err.data?.message || 'Google sign up failed'
  } finally {
    loading.value = false
  }
}

const handleGoogleError = () => {
  error.value = 'Google sign up failed'
}
</script>

<style scoped>
/* ... existing styles ... */
.auth-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--space-4) 0;
  position: relative;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--gray-200);
}

.auth-divider span {
  padding: 0 var(--space-3);
  color: var(--gray-400);
  font-size: 0.875rem;
  font-weight: 500;
}

.google-auth-wrapper {
  display: flex;
  justify-content: center;
}
</style>

<style scoped>
.auth-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-12);
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
}

.auth-header {
  margin-bottom: var(--space-8);
}

.logo {
  display: inline-flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: var(--space-8);
  text-decoration: none;
  color: var(--black);
  letter-spacing: -0.02em;
}

.auth-header h1 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--black);
  margin-bottom: var(--space-2);
}

.auth-header p {
  color: var(--gray-500);
  font-size: 1.125rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group label {
  font-weight: 600;
  color: var(--gray-900);
  font-size: 0.875rem;
}

.form-group input {
  padding: var(--space-3) var(--space-4);
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  transition: all var(--transition-fast);
  background: var(--gray-50);
}

.form-group input:focus {
  outline: none;
  border-color: var(--black);
  background: var(--white);
}

.password-input {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input input {
  width: 100%;
  padding-right: var(--space-12);
}

/* Hide native password toggle in Edge/IE */
.password-input input::-ms-reveal,
.password-input input::-ms-clear {
  display: none;
}

.toggle-password {
  position: absolute;
  right: var(--space-3);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  opacity: 0.4;
  transition: opacity var(--transition-fast);
}

.toggle-password:hover {
  opacity: 1;
}

.hint {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.error-message {
  background: var(--error-50);
  color: var(--error-600);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  font-weight: 500;
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--black);
  color: var(--white);
  border: none;
  border-radius: var(--radius-full);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: var(--space-2);
}

.btn-primary:hover:not(:disabled) {
  background: var(--gray-800);
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-footer {
  margin-top: var(--space-8);
  text-align: center;
  color: var(--gray-600);
}

.auth-footer a {
  color: var(--black);
  font-weight: 700;
  text-decoration: underline;
}

.auth-visual {
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  position: relative;
  overflow: hidden;
}

.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: grayscale(100%);
  opacity: 0.6;
}

.visual-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2;
}

.visual-content {
  position: relative;
  z-index: 3;
  color: white;
  max-width: 400px;
  text-align: center;
}

.visual-content h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: var(--space-4);
  color: var(--white);
}

.visual-content p {
  color: var(--gray-400);
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: var(--space-10);
}

.features {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.feature {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  background: var(--gray-900);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-800);
  text-align: left;
}

.feature-icon {
  font-size: 1.25rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-800);
  border-radius: var(--radius-full);
}

@media (max-width: 1024px) {
  .auth-page {
    grid-template-columns: 1fr;
  }

  .auth-visual {
    display: none;
  }
}

@media (max-width: 640px) {
  .auth-container {
    padding: var(--space-6);
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
