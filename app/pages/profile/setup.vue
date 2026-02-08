<template>
  <div class="profile-setup-page">
    <div class="setup-container">
      <div class="setup-header">
        <NuxtLink to="/" class="logo">
          <span class="logo-icon">🏀</span>
          <span class="logo-text">Hoop<span class="accent">Republic</span></span>
        </NuxtLink>
        <h1>Complete Your Profile</h1>
        <p>Tell us about yourself so we can match you with the right games</p>
        <div v-if="memberSince" class="member-since">
          Member since {{ memberSince }}
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="setup-form">
        <!-- Name Section -->
        <div class="form-section">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Name <span class="required">Required</span></label>
              <input 
                id="name" 
                v-model="form.name" 
                type="text" 
                placeholder="Enter your first name"
                required 
              />
            </div>
            <div class="form-group">
              <label for="surname">Surname <span class="required">Required</span></label>
              <input 
                id="surname" 
                v-model="form.surname" 
                type="text" 
                placeholder="Enter your surname"
                required
              />
            </div>
          </div>
        </div>

        <!-- Photo Section -->
        <div class="form-section">
          <div class="form-group">
            <label>Photo</label>
            <div class="photo-upload">
              <div class="photo-preview" v-if="photoPreview">
                <img :src="photoPreview" alt="Profile photo" />
              </div>
              <div class="photo-placeholder" v-else>
                <span class="placeholder-icon">📷</span>
              </div>
              <label class="upload-btn">
                <input type="file" accept="image/*" @change="handlePhotoChange" />
                <span>Choose an image...</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Position Section -->
        <div class="form-section">
          <label class="section-label">What's your position? <span class="required">Required</span></label>
          <div class="option-pills">
            <button 
              v-for="pos in positions" 
              :key="pos.value"
              type="button"
              :class="['pill', { active: form.position === pos.value }]"
              @click="form.position = pos.value"
            >
              {{ pos.label }}
            </button>
          </div>
        </div>

        <!-- Skill Level Section -->
        <div class="form-section">
          <label class="section-label">What's your skill level?</label>
          <p class="section-hint">↔ Swipe to help you decide</p>
          
          <div class="skill-cards">
            <div 
              v-for="skill in skillLevels" 
              :key="skill.value"
              :class="['skill-card', { active: form.skillLevel === skill.value }]"
              @click="form.skillLevel = skill.value"
            >
              <h4>{{ skill.label }}</h4>
              <p>{{ skill.description }}</p>
            </div>
          </div>

          <div class="option-pills" style="margin-top: var(--space-4);">
            <button 
              v-for="skill in skillLevels" 
              :key="skill.value"
              type="button"
              :class="['pill', { active: form.skillLevel === skill.value }]"
              @click="form.skillLevel = skill.value"
            >
              {{ skill.label }}
            </button>
          </div>
        </div>

        <!-- Preferred Days Section -->
        <div class="form-section">
          <label class="section-label">What day(s) do you prefer to play? <span class="required">Required</span></label>
          <div class="option-pills">
            <button 
              v-for="day in days" 
              :key="day.value"
              type="button"
              :class="['pill', { active: form.preferredDays.includes(day.value) }]"
              @click="toggleDay(day.value)"
            >
              {{ day.label }}
            </button>
          </div>
        </div>

        <!-- Preferred Areas Section -->
        <div class="form-section">
          <label class="section-label">Preferred London areas <span class="required">Required</span></label>
          <div class="option-pills">
            <button 
              v-for="area in areas" 
              :key="area.value"
              type="button"
              :class="['pill', { active: form.preferredAreas.includes(area.value) }]"
              @click="toggleArea(area.value)"
            >
              {{ area.label }}
            </button>
          </div>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="skipSetup">
            Skip for now
          </button>
          <button type="submit" class="btn-primary" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            {{ loading ? 'Saving...' : 'Complete Profile' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const { user } = useUser()
const router = useRouter()

const memberSince = computed(() => {
  if (!user.value?.created_at) return ''
  return new Date(user.value.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})

const positions = [
  { value: 'point_guard', label: 'Point Guard' },
  { value: 'shooting_guard', label: 'Shooting Guard' },
  { value: 'small_forward', label: 'Small Forward' },
  { value: 'power_forward', label: 'Power Forward' },
  { value: 'center', label: 'Center' }
]

const skillLevels = [
  { 
    value: 'd5_rookie', 
    label: 'Rookie (D5)', 
    description: 'New to the sport or returning after a long hiatus. You play rarely and are currently learning the rules, basic mechanics, and shooting form. You have no organised team experience.' 
  },
  { 
    value: 'd4_rec', 
    label: 'Rec (D4)', 
    description: 'A casual player hitting the court 1-2 times a week for a run. You can make open layups and basic passes, but your finishing consistency varies. Your experience is limited to unstructured playground runs or social sessions.' 
  },
  { 
    value: 'd3_inter', 
    label: 'Inter (D3)', 
    description: 'A solid player hitting the court 2-3 times a week. You understand spacing and defensive zones, can dribble comfortably with both hands, and finish consistently in the paint or from mid-range. You likely have school team or Local League experience.' 
  },
  { 
    value: 'd2_comp', 
    label: 'Comp (D2)', 
    description: 'A competitive player with extensive organised basketball experience. You play at a high level regularly, have refined skills, and can contribute in competitive league or tournament settings.' 
  },
  { 
    value: 'd1_elite', 
    label: 'Elite (D1)', 
    description: 'An elite-level player with professional, semi-professional, or top-tier amateur experience. You have exceptional skills and compete at the highest recreational levels.' 
  }
]

const days = [
  { value: 'mon', label: 'Mon' },
  { value: 'tue', label: 'Tue' },
  { value: 'wed', label: 'Wed' },
  { value: 'thu', label: 'Thu' },
  { value: 'fri', label: 'Fri' },
  { value: 'sat', label: 'Sat' },
  { value: 'sun', label: 'Sun' },
  { value: 'flexible', label: "Don't know / Don't Mind" }
]

const areas = [
  { value: 'central', label: 'Central' },
  { value: 'west', label: 'West' },
  { value: 'south_west', label: 'South West' },
  { value: 'south', label: 'South' },
  { value: 'east', label: 'East' },
  { value: 'north', label: 'North' },
  { value: 'north_west', label: 'North West' },
  { value: 'south_east', label: 'South East' },
  { value: 'north_east', label: 'North East' },
  { value: 'flexible', label: "Don't know / Don't mind" }
]

const form = ref({
  name: '',
  surname: '',
  position: '',
  skillLevel: 'd3_inter',
  preferredDays: [] as string[],
  preferredAreas: [] as string[]
})

const photoPreview = ref('')
const photoFile = ref<File | null>(null)
const loading = ref(false)
const error = ref('')

// Pre-fill user data
watchEffect(() => {
  if (user.value) {
    if (!form.value.name && user.value.name) form.value.name = user.value.name
    if (!form.value.surname && user.value.surname) form.value.surname = user.value.surname
  }
})

const handlePhotoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    photoFile.value = target.files[0]
    photoPreview.value = URL.createObjectURL(target.files[0])
  }
}

const toggleDay = (day: string) => {
  const index = form.value.preferredDays.indexOf(day)
  if (index > -1) {
    form.value.preferredDays.splice(index, 1)
  } else {
    form.value.preferredDays.push(day)
  }
}

const toggleArea = (area: string) => {
  const index = form.value.preferredAreas.indexOf(area)
  if (index > -1) {
    form.value.preferredAreas.splice(index, 1)
  } else {
    form.value.preferredAreas.push(area)
  }
}

const skipSetup = () => {
  router.push('/')
}

const handleSubmit = async () => {
  error.value = ''

  if (!form.value.name || !form.value.surname) {
    error.value = 'Please enter your name and surname'
    return
  }

  if (!form.value.position) {
    error.value = 'Please select your position'
    return
  }

  if (form.value.preferredDays.length === 0) {
    error.value = 'Please select at least one preferred day'
    return
  }

  if (form.value.preferredAreas.length === 0) {
    error.value = 'Please select at least one preferred area'
    return
  }

  loading.value = true

  try {
    await $fetch('/api/profile', {
      method: 'PUT',
      body: {
        name: form.value.name,
        surname: form.value.surname,
        position: form.value.position,
        skillLevel: form.value.skillLevel,
        preferredDays: form.value.preferredDays,
        preferredAreas: form.value.preferredAreas
      }
    })

    router.push('/profile')
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to save profile. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.profile-setup-page {
  min-height: 100vh;
  background: var(--white);
  color: var(--black);
  padding: var(--space-8) var(--space-4);
}

.setup-container {
  max-width: 800px;
  margin: 0 auto;
}

.setup-header {
  text-align: center;
  margin-bottom: var(--space-10);
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: var(--space-6);
  text-decoration: none;
  color: var(--black);
}

.logo-icon {
  font-size: 1.75rem;
}

.logo .accent {
  color: var(--gray-600);
}

.setup-header h1 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: var(--space-2);
  color: var(--black);
}

.setup-header p {
  color: var(--gray-500);
  font-size: 1.125rem;
  margin-bottom: var(--space-4);
}

.member-since {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: var(--gray-100);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  color: var(--gray-600);
  font-weight: 500;
}

.setup-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.form-section {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
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

.form-group label,
.section-label {
  font-weight: 600;
  color: var(--gray-900);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.required {
  color: var(--gray-500);
  font-weight: 400;
  font-size: 0.75rem;
  margin-left: auto;
}

.form-group input {
  padding: var(--space-3) var(--space-4);
  background: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  color: var(--black);
  transition: all var(--transition-fast);
}

.form-group input::placeholder {
  color: var(--gray-400);
}

.form-group input:focus {
  outline: none;
  border-color: var(--black);
  box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
}

.photo-upload {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.photo-preview,
.photo-placeholder {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--gray-200);
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-icon {
  font-size: 2rem;
  opacity: 0.5;
  filter: grayscale(1);
}

.upload-btn {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  cursor: pointer;
  color: var(--gray-600);
  transition: all var(--transition-fast);
}

.upload-btn:hover {
  background: var(--gray-50);
  border-color: var(--gray-300);
  color: var(--black);
}

.upload-btn input {
  display: none;
}

.section-hint {
  color: var(--gray-500);
  font-size: 0.75rem;
  text-align: center;
  margin: var(--space-2) 0 var(--space-4);
}

.option-pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.pill {
  padding: var(--space-2) var(--space-4);
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-full);
  color: var(--gray-600);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pill:hover {
  border-color: var(--gray-400);
  color: var(--black);
}

.pill.active {
  background: var(--black);
  border-color: var(--black);
  color: var(--white);
  font-weight: 600;
}

.skill-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
  overflow-x: auto;
  padding-bottom: var(--space-2);
}

.skill-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 200px;
}

.skill-card:hover {
  border-color: var(--gray-400);
}

.skill-card.active {
  border-color: var(--black);
  background: var(--gray-50);
  box-shadow: 0 0 0 1px var(--black);
}

.skill-card h4 {
  color: var(--black);
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.skill-card p {
  color: var(--gray-600);
  font-size: 0.75rem;
  line-height: 1.5;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-500);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  text-align: center;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.form-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: flex-end;
}

.btn-secondary {
  padding: var(--space-3) var(--space-6);
  background: transparent;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-full);
  color: var(--gray-600);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-secondary:hover {
  background: var(--gray-50);
  color: var(--black);
  border-color: var(--gray-400);
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
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-primary:hover:not(:disabled) {
  background: var(--gray-800);
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.6;
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

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .skill-cards {
    grid-template-columns: 1fr;
    overflow-x: auto;
  }

  .skill-card {
    min-width: unset;
  }

  .form-actions {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
  }
}
</style>
