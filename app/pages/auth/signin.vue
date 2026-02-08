<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <NuxtLink to="/" class="logo">
          <span class="logo-text">HoopRepublic</span>
        </NuxtLink>
        <h1>Welcome back</h1>
        <p>Sign in to continue to HoopRepublic</p>
      </div>

      <form @submit.prevent="handleSignin" class="auth-form">
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
              placeholder="Enter your password"
              required 
            />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="rememberMe" />
            <span>Remember me</span>
          </label>
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <div class="auth-footer">
        <p>Don't have an account? <NuxtLink to="/auth/signup">Create one</NuxtLink></p>
      </div>
    </div>

    <div class="auth-visual">
      <div class="visual-content">
        <h2>Ready to ball?</h2>
        <p>Find courts, join games, and connect with the London basketball community.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

const handleSignin = async () => {
  error.value = ''
  loading.value = true

  try {
    const response = await $fetch('/api/auth/signin', {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password,
        rememberMe: rememberMe.value
      }
    })

    // Redirect to home or intended page
    router.push('/')
  } catch (err: any) {
    error.value = err.data?.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

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

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--gray-600);
  font-size: 0.875rem;
  cursor: pointer;
}

.checkbox-label input {
  width: 16px;
  height: 16px;
  accent-color: var(--black);
}

.forgot-link {
  color: var(--black);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: underline;
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
  background: var(--gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  position: relative;
  overflow: hidden;
  border-left: 1px solid var(--gray-200);
}

.visual-content {
  position: relative;
  max-width: 400px;
  text-align: center;
}

.visual-content h2 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: var(--space-4);
  color: var(--black);
  line-height: 1.1;
}

.visual-content p {
  color: var(--gray-600);
  font-size: 1.25rem;
  line-height: 1.6;
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
}
</style>
