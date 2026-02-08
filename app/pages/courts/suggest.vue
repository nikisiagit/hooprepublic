<template>
  <div class="suggest-page">
    <section class="page-header">
      <div class="container">
        <h1>Suggest a Court</h1>
        <p>Know a basketball court that's not on our list? Help us grow the community!</p>
      </div>
    </section>

    <section class="form-section">
      <div class="container">
        <div class="form-card card">
          <form @submit.prevent="submitCourt">
            <div class="form-group">
              <label for="name">Court Name *</label>
              <input 
                id="name" 
                v-model="form.name" 
                type="text" 
                class="input"
                placeholder="e.g., Victoria Park Basketball Court"
                required
              />
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea 
                id="description" 
                v-model="form.description" 
                class="input textarea"
                placeholder="Tell us about this court - condition, best times to visit, etc."
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="address">Address *</label>
              <input 
                id="address" 
                v-model="form.address" 
                type="text" 
                class="input"
                placeholder="Full address or nearest landmark"
                required
              />
              <small class="field-hint">Enter the address or click on the map below to set the location</small>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="postcode">Postcode</label>
                <input 
                  id="postcode" 
                  v-model="form.postcode" 
                  type="text" 
                  class="input"
                  placeholder="e.g., E9 7DE"
                />
              </div>
              <div class="form-group">
                <label for="borough">Borough</label>
                <select id="borough" v-model="form.borough" class="input">
                  <option value="">Select borough</option>
                  <option value="Barking and Dagenham">Barking and Dagenham</option>
                  <option value="Barnet">Barnet</option>
                  <option value="Bexley">Bexley</option>
                  <option value="Brent">Brent</option>
                  <option value="Bromley">Bromley</option>
                  <option value="Camden">Camden</option>
                  <option value="City of London">City of London</option>
                  <option value="Croydon">Croydon</option>
                  <option value="Ealing">Ealing</option>
                  <option value="Enfield">Enfield</option>
                  <option value="Greenwich">Greenwich</option>
                  <option value="Hackney">Hackney</option>
                  <option value="Hammersmith and Fulham">Hammersmith and Fulham</option>
                  <option value="Haringey">Haringey</option>
                  <option value="Harrow">Harrow</option>
                  <option value="Havering">Havering</option>
                  <option value="Hillingdon">Hillingdon</option>
                  <option value="Hounslow">Hounslow</option>
                  <option value="Islington">Islington</option>
                  <option value="Kensington and Chelsea">Kensington and Chelsea</option>
                  <option value="Kingston upon Thames">Kingston upon Thames</option>
                  <option value="Lambeth">Lambeth</option>
                  <option value="Lewisham">Lewisham</option>
                  <option value="Merton">Merton</option>
                  <option value="Newham">Newham</option>
                  <option value="Redbridge">Redbridge</option>
                  <option value="Richmond upon Thames">Richmond upon Thames</option>
                  <option value="Southwark">Southwark</option>
                  <option value="Sutton">Sutton</option>
                  <option value="Tower Hamlets">Tower Hamlets</option>
                  <option value="Waltham Forest">Waltham Forest</option>
                  <option value="Wandsworth">Wandsworth</option>
                  <option value="Westminster">Westminster</option>
                </select>
              </div>
            </div>

            <!-- Map placeholder -->
            <div class="form-group">
              <label>Location on Map *</label>
              <div class="map-placeholder">
                <div class="map-inner">
                  <span class="map-icon">📍</span>
                  <p>Click to set court location</p>
                  <small v-if="form.latitude && form.longitude">
                    {{ form.latitude.toFixed(6) }}, {{ form.longitude.toFixed(6) }}
                  </small>
                </div>
                <input type="hidden" :value="form.latitude" required />
              </div>
              <div class="coord-inputs">
                <input 
                  v-model.number="form.latitude" 
                  type="number" 
                  step="any"
                  class="input"
                  placeholder="Latitude (e.g., 51.5074)"
                  required
                />
                <input 
                  v-model.number="form.longitude" 
                  type="number" 
                  step="any"
                  class="input"
                  placeholder="Longitude (e.g., -0.1278)"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label>Court Features</label>
              <div class="tags-grid">
                <button
                  v-for="tag in availableTags"
                  :key="tag.id"
                  type="button"
                  class="tag-option"
                  :class="{ selected: form.tagIds.includes(tag.id) }"
                  @click="toggleTag(tag.id)"
                >
                  <span class="tag-icon">{{ tag.icon }}</span>
                  <span class="tag-name">{{ tag.name }}</span>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="imageUrl">Photo URL (optional)</label>
              <input 
                id="imageUrl" 
                v-model="form.imageUrl" 
                type="url" 
                class="input"
                placeholder="https://example.com/court-photo.jpg"
              />
              <small class="field-hint">Share a photo of the court to help others find it</small>
            </div>

            <div class="form-actions">
              <NuxtLink to="/courts" class="btn btn-secondary">
                Cancel
              </NuxtLink>
              <button type="submit" class="btn btn-primary" :disabled="submitting">
                {{ submitting ? 'Submitting...' : 'Submit Court' }}
              </button>
            </div>
          </form>
        </div>

        <div class="info-card">
          <h3>📋 Submission Guidelines</h3>
          <ul>
            <li>Make sure the court is accessible to the public</li>
            <li>Double-check the location coordinates</li>
            <li>Add as many relevant tags as possible</li>
            <li>Your submission will be reviewed before publishing</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="modal-overlay" @click.self="closeSuccess">
      <div class="success-modal">
        <div class="success-icon">✓</div>
        <h2>Court Submitted!</h2>
        <p>Thank you for helping grow the HoopRepublic community. Your submission will be reviewed shortly.</p>
        <NuxtLink to="/courts" class="btn btn-primary">
          Back to Courts
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tag {
  id: string
  name: string
  category: string
  icon: string
}

const submitting = ref(false)
const showSuccess = ref(false)
const availableTags = ref<Tag[]>([])

const form = reactive({
  name: '',
  description: '',
  address: '',
  postcode: '',
  borough: '',
  latitude: null as number | null,
  longitude: null as number | null,
  tagIds: [] as string[],
  imageUrl: ''
})

const fetchTags = async () => {
  try {
    const response = await $fetch<{ tags: Tag[] }>('/api/tags')
    availableTags.value = response.tags
  } catch (error) {
    console.error('Failed to fetch tags:', error)
  }
}

const toggleTag = (tagId: string) => {
  const index = form.tagIds.indexOf(tagId)
  if (index === -1) {
    form.tagIds.push(tagId)
  } else {
    form.tagIds.splice(index, 1)
  }
}

const submitCourt = async () => {
  if (!form.name || !form.address || form.latitude === null || form.longitude === null) {
    alert('Please fill in all required fields including location coordinates')
    return
  }

  submitting.value = true
  try {
    await $fetch('/api/courts', {
      method: 'POST',
      body: {
        ...form,
        isAdmin: false // User submission goes to pending
      }
    })
    showSuccess.value = true
  } catch (error) {
    console.error('Failed to submit court:', error)
    alert('Failed to submit court. Please try again.')
  } finally {
    submitting.value = false
  }
}

const closeSuccess = () => {
  showSuccess.value = false
}

onMounted(() => {
  fetchTags()
})
</script>

<style scoped>
.suggest-page {
  padding-top: 80px;
}

.page-header {
  padding: var(--space-16) 0 var(--space-12);
  background: var(--white);
  text-align: center;
  border-bottom: 1px solid var(--gray-100);
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: var(--space-2);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.page-header p {
  font-size: 1.125rem;
  color: var(--gray-500);
}

.form-section {
  padding: var(--space-12) 0;
}

.form-section .container {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-8);
  max-width: 1000px;
}

.form-card {
  padding: var(--space-8);
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: var(--space-2);
  color: var(--gray-900);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.textarea {
  resize: vertical;
  min-height: 100px;
}

.field-hint {
  display: block;
  margin-top: var(--space-2);
  font-size: 0.8rem;
  color: var(--gray-400);
}

.map-placeholder {
  height: 200px;
  background: var(--gray-50);
  border: 2px dashed var(--gray-300);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: var(--space-3);
}

.map-placeholder:hover {
  border-color: var(--black);
  background: var(--gray-100);
}

.map-inner {
  text-align: center;
  color: var(--gray-500);
}

.map-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: var(--space-2);
}

.map-inner small {
  color: var(--black);
  font-weight: 500;
}

.coord-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-2);
}

.tag-option {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background: var(--white);
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-lg);
  text-align: left;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.tag-option:hover {
  border-color: var(--black);
  background: var(--gray-50);
}

.tag-option.selected {
  background: var(--black);
  border-color: var(--black);
}

.tag-option.selected .tag-name {
  color: var(--white);
}

.tag-icon {
  font-size: 1.25rem;
}

.tag-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--gray-700);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-6);
  border-top: 1px solid var(--gray-200);
  margin-top: var(--space-6);
}

.info-card {
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.info-card h3 {
  font-size: 1rem;
  margin-bottom: var(--space-4);
  color: var(--black);
  font-weight: 700;
}

.info-card ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.info-card li {
  font-size: 0.9rem;
  color: var(--gray-600);
  padding-left: var(--space-5);
  position: relative;
}

.info-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--black);
  font-weight: 700;
}

/* Success Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
}

.success-modal {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-10);
  text-align: center;
  max-width: 400px;
}

.success-icon {
  width: 64px;
  height: 64px;
  background: var(--black);
  color: white;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto var(--space-6);
}

.success-modal h2 {
  margin-bottom: var(--space-3);
  font-size: 1.5rem;
  font-weight: 800;
}

.success-modal p {
  color: var(--gray-500);
  margin-bottom: var(--space-6);
}

@media (max-width: 768px) {
  .form-section .container {
    grid-template-columns: 1fr;
  }

  .info-card {
    position: static;
    order: -1;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .tags-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
