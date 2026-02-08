<template>
  <div class="create-game-page">
    <div class="container">
      <div class="page-header">
        <h1>Create a Game</h1>
        <p>Host a game and invite others to join</p>
      </div>

      <form @submit.prevent="handleSubmit" class="create-game-form">
        <!-- Game Details -->
        <div class="form-section">
          <h2>Game Details</h2>
          
          <div class="form-group">
            <label for="title">Game Title</label>
            <input 
              id="title" 
              v-model="form.title" 
              type="text" 
              placeholder="e.g. Saturday Morning Run"
              required 
            />
          </div>

          <div class="form-group">
            <label for="description">Description & Guidelines</label>
            <textarea 
              id="description" 
              v-model="form.description" 
              placeholder="Describe the game style, any specific rules, or just say hello!"
              rows="4"
            ></textarea>
          </div>
        </div>

        <!-- Court Selection -->
        <div class="form-section">
          <h2>Where & When</h2>
          
          <div class="form-group">
            <label>Select Court</label>
            <div class="court-select-grid">
              <div 
                v-for="court in courts" 
                :key="court.id"
                class="court-option"
                :class="{ active: form.courtId === court.id }"
                @click="form.courtId = court.id"
              >
                <div class="court-option-image">
                   <img :src="court.image_url || '/placeholder-court.svg'" :alt="court.name" />
                </div>
                <div class="court-option-details">
                  <h4>{{ court.name }}</h4>
                  <p>{{ court.borough }}</p>
                </div>
              </div>
            </div>
            <div v-if="loadingCourts" class="loading-text">Loading courts...</div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="date">Date</label>
              <input 
                id="date" 
                v-model="form.date" 
                type="date"
                :min="minDate"
                required 
              />
            </div>
            <div class="form-group">
              <label for="time">Start Time</label>
              <input 
                id="time" 
                v-model="form.startTime" 
                type="time" 
                required 
              />
            </div>
            <div class="form-group">
              <label for="duration">Duration (mins)</label>
              <select id="duration" v-model="form.duration" required>
                <option value="60">1 Hour</option>
                <option value="90">1.5 Hours</option>
                <option value="120">2 Hours</option>
                <option value="180">3 Hours</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Players & Cost -->
        <div class="form-section">
          <h2>Players & Cost</h2>
          
          <div class="form-row">
            <div class="form-group">
              <label for="maxPlayers">Max Players</label>
              <input 
                id="maxPlayers" 
                v-model="form.maxPlayers" 
                type="number" 
                min="2" 
                max="30"
                required 
              />
            </div>
            <div class="form-group">
              <label for="price">Cost per Person (£)</label>
              <input 
                id="price" 
                v-model="form.price" 
                type="number" 
                min="0" 
                step="0.50"
                placeholder="0.00" 
              />
              <span class="hint">Leave as 0 for free games</span>
            </div>
          </div>
          
           <div class="form-group">
            <label for="skillLevel">Skill Level</label>
             <select id="skillLevel" v-model="form.level">
                <option value="all">open to all</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
          </div>

        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="form-actions">
          <NuxtLink to="/games" class="btn btn-secondary">Cancel</NuxtLink>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            {{ loading ? 'Creating...' : 'Create Game' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '~/composables/useUser'

const router = useRouter()
const { user } = useUser() // Ensure user is logged in? Middleware handles this ideally

interface Court {
  id: string
  name: string
  borough: string
  image_url: string
}

const courts = ref<Court[]>([])
const loadingCourts = ref(false)
const loading = ref(false)
const error = ref('')

const minDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const form = reactive({
  title: '',
  description: '',
  courtId: '',
  date: '',
  startTime: '10:00',
  duration: '60',
  maxPlayers: 10,
  price: 0,
  level: 'all'
})

onMounted(async () => {
  if (!user.value) {
    // Redirect or show login (middleware usually handles this)
     router.push('/auth/signin?redirect=/games/create') // simple safeguard
  }
  
  loadingCourts.value = true
  try {
    const response = await $fetch<any[]>('/api/courts')
    courts.value = response.map(c => ({
      id: c.id,
      name: c.name,
      borough: c.borough || 'London',
      image_url: c.image_url
    }))
  } catch (e) {
    console.error('Failed to load courts', e)
  } finally {
    loadingCourts.value = false
  }
})

const handleSubmit = async () => {
  error.value = ''
  
  if (!form.courtId) {
    error.value = 'Please select a court'
    return
  }
  
  // Calculate end time
  const [hoursStr, minsStr] = form.startTime.split(':')
  const hours = parseInt(hoursStr ?? '0')
  const mins = parseInt(minsStr ?? '0')
  const durationMins = parseInt(form.duration)
  const endDate = new Date()
  endDate.setHours(hours, mins + durationMins)
  const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`

  loading.value = true
  
  try {
    await $fetch('/api/games/create', {
      method: 'POST',
      body: {
        ...form,
        endTime
      }
    } as any) // Cast to any to bypass TS inferring issue with method string
    router.push('/games')
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to create game'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-game-page {
  padding: 80px 0;
  min-height: 100vh;
  background: var(--gray-50);
}

.page-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: var(--space-2);
}

.create-game-form {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-section {
  background: white;
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
}

.form-section h2 {
  font-size: 1.25rem;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--gray-100);
}

.form-group {
  margin-bottom: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-4);
}

@media (max-width: 640px) {
    .form-row {
        grid-template-columns: 1fr;
    }
}

label {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--gray-700);
}

input, textarea, select {
  padding: var(--space-3);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  transition: all var(--transition-fast);
  background: white;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--black);
  box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
}

.hint {
  font-size: 0.75rem;
  color: var(--gray-500);
}

/* Court Selection Grid */
.court-select-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
  max-height: 300px;
  overflow-y: auto;
  padding-right: var(--space-2);
}

.court-option {
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-lg);
  cursor: pointer;
  overflow: hidden;
  transition: all var(--transition-fast);
}

.court-option:hover {
  border-color: var(--gray-400);
}

.court-option.active {
  border-color: var(--black);
  background: var(--gray-50);
}

.court-option-image {
  height: 100px;
  background: var(--gray-100);
}

.court-option-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.court-option-details {
  padding: var(--space-3);
}

.court-option-details h4 {
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 2px;
}

.court-option-details p {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.error-message {
  padding: var(--space-4);
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-500);
  border-radius: var(--radius-lg);
  text-align: center;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.btn {
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: var(--black);
  color: white;
}

.btn-secondary {
  background: transparent;
  color: var(--gray-600);
  border: 1px solid var(--gray-300);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: var(--space-2);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
