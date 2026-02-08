<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <NuxtLink to="/" class="logo">
          <span class="logo-icon">🏀</span>
          <span class="logo-text">Hoop<span class="accent">Republic</span></span>
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
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
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
        <div class="big-emoji">🏀</div>
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
  max-width: 440px;
  margin: 0 auto;
  width: 100%;
}

.auth-header {
  margin-bottom: var(--space-8);
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: var(--space-6);
  text-decoration: none;
  color: var(--gray-900);
}

.logo-icon {
  font-size: 1.75rem;
}

.logo .accent {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: var(--space-2);
}

.auth-header p {
  color: var(--gray-600);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group label {
  font-weight: 500;
  color: var(--gray-700);
  font-size: 0.875rem;
}

.form-group input {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  transition: all var(--transition-fast);
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
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
  opacity: 0.6;
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
  accent-color: var(--primary-500);
}

.forgot-link {
  color: var(--primary-600);
  font-size: 0.875rem;
  font-weight: 500;
}

.error-message {
  background: var(--error-50);
  color: var(--error-600);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.35);
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
  color: var(--primary-600);
  font-weight: 500;
}

.auth-visual {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  position: relative;
  overflow: hidden;
}

.auth-visual::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.visual-content {
  position: relative;
  color: white;
  max-width: 400px;
  text-align: center;
}

.big-emoji {
  font-size: 5rem;
  margin-bottom: var(--space-4);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.visual-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.visual-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  line-height: 1.7;
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
