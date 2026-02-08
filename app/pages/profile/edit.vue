<template>
  <div class="profile-edit-page">
    <div class="container container-narrow">
      <div class="setup-header">
        <NuxtLink to="/profile" class="back-link">← Back to Profile</NuxtLink>
        <h1>Edit Your Profile</h1>
        <p>Keep your player details up to date</p>
      </div>

      <form v-if="loaded" @submit.prevent="handleSubmit" class="setup-form">
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
              <div class="photo-preview" v-if="photoPreview || form.avatarUrl">
                <img :src="photoPreview || form.avatarUrl" alt="Profile photo" />
              </div>
              <div class="photo-placeholder" v-else>
                <span class="placeholder-icon">📷</span>
              </div>
              <div class="photo-actions">
                <label class="upload-btn">
                  <input type="file" accept="image/*" @change="handlePhotoChange" />
                  <span>Choose new image...</span>
                </label>
                <p class="photo-hint">Max size 500KB. For best results use a square image.</p>
              </div>
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
          <NuxtLink to="/profile" class="btn btn-secondary">
            Cancel
          </NuxtLink>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            {{ loading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
      <div v-else class="loading-state">
        <span class="spinner large"></span>
        <p>Loading your profile...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

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
  { value: 'flexible', label: 'Flexible' }
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
  { value: 'flexible', label: 'Flexible' }
]

const form = ref({
  name: '',
  surname: '',
  avatarUrl: '',
  position: '',
  skillLevel: '',
  preferredDays: [] as string[],
  preferredAreas: [] as string[]
})

const photoPreview = ref('')
const photoFile = ref<File | null>(null)
const loading = ref(false)
const loaded = ref(false)
const error = ref('')

// Fetch existing profile
onMounted(async () => {
  try {
    const data: any = await $fetch('/api/profile')
    if (data) {
      form.value.name = data.name || ''
      form.value.surname = data.surname || ''
      form.value.avatarUrl = data.avatar_url || ''
      form.value.position = data.position || ''
      form.value.skillLevel = data.skill_level || ''
      form.value.preferredDays = data.preferred_days || []
      form.value.preferredAreas = data.preferred_areas || []
    }
  } catch (err) {
    console.error('Failed to fetch profile:', err)
  } finally {
    loaded.value = true
  }
})

const handlePhotoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    if (file.size > 500 * 1024) {
      error.value = 'Image too large (max 500KB)'
      return
    }
    photoFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
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

const handleSubmit = async () => {
  error.value = ''

  if (!form.value.name) {
    error.value = 'Please enter your name'
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
        preferredAreas: form.value.preferredAreas,
        avatarUrl: photoPreview.value || form.value.avatarUrl
      }
    })

    router.push('/profile')
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to update profile. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.profile-edit-page {
  min-height: 100vh;
  background: var(--white);
  color: var(--black);
  padding: 100px var(--space-4) var(--space-20);
}

.setup-header {
  text-align: center;
  margin-bottom: var(--space-10);
  position: relative;
}

.back-link {
  position: absolute;
  top: 0;
  left: 0;
  color: var(--gray-500);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--black);
}

.setup-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: var(--space-2);
  color: var(--black);
}

.setup-header p {
  color: var(--gray-500);
  font-size: 1.125rem;
}

.setup-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-section {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group label,
.section-label {
  font-weight: 700;
  color: var(--black);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.required {
  color: var(--gray-400);
  font-weight: 500;
  font-size: 0.75rem;
  margin-left: auto;
  text-transform: none;
  letter-spacing: normal;
}

.form-group input {
  padding: var(--space-3) var(--space-4);
  background: var(--gray-50);
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  color: var(--black);
  transition: all var(--transition-fast);
}

.form-group input:focus {
  outline: none;
  border-color: var(--black);
  background: white;
}

.photo-upload {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.photo-preview,
.photo-placeholder {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-full);
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--gray-200);
  flex-shrink: 0;
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-icon {
  font-size: 2.5rem;
  opacity: 0.5;
}

.photo-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.upload-btn {
  padding: var(--space-2) var(--space-4);
  background: var(--white);
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-full);
  cursor: pointer;
  color: var(--black);
  font-weight: 600;
  font-size: 0.875rem;
  transition: all var(--transition-fast);
  display: inline-block;
  text-align: center;
}

.upload-btn:hover {
  background: var(--gray-50);
  border-color: var(--black);
}

.upload-btn input {
  display: none;
}

.photo-hint {
  font-size: 0.75rem;
  color: var(--gray-400);
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
  background: var(--gray-50);
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-full);
  color: var(--gray-600);
  font-size: 0.875rem;
  font-weight: 500;
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
  display: flex;
  gap: var(--space-4);
  overflow-x: auto;
  padding-bottom: var(--space-4);
  scrollbar-width: thin;
}

.skill-card {
  background: var(--gray-50);
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 280px;
  flex-shrink: 0;
}

.skill-card:hover {
  border-color: var(--gray-400);
}

.skill-card.active {
  border-color: var(--black);
  background: white;
  box-shadow: var(--shadow-md);
}

.skill-card h4 {
  color: var(--black);
  font-size: 1rem;
  font-weight: 800;
  margin-bottom: var(--space-2);
}

.skill-card p {
  color: var(--gray-500);
  font-size: 0.875rem;
  line-height: 1.5;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-500);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  text-align: center;
  border: 1px solid rgba(239, 68, 68, 0.2);
  font-weight: 600;
}

.form-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: flex-end;
  margin-top: var(--space-4);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-20) 0;
  color: var(--gray-400);
  gap: var(--space-4);
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner.large {
  width: 40px;
  height: 40px;
  border-width: 3px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .profile-edit-page {
    padding-top: 80px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .photo-upload {
    flex-direction: column;
    text-align: center;
  }

  .form-actions {
    flex-direction: column-reverse;
  }
  
  .btn {
    width: 100%;
  }

  .form-section {
    padding: var(--space-6);
  }
}
</style>
