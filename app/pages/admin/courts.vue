<template>
  <div class="admin-page">
    <section class="page-header">
      <div class="container">
        <div class="header-row">
          <div>
            <h1>Court Management</h1>
            <p>Add, edit, and manage basketball courts</p>
          </div>
          <button class="btn btn-primary" @click="openAddModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Court
          </button>
        </div>

        <!-- Tabs -->
        <div class="tabs">
          <button 
            class="tab" 
            :class="{ active: activeTab === 'approved' }"
            @click="activeTab = 'approved'"
          >
            Approved Courts
            <span class="tab-count">{{ approvedCourts.length }}</span>
          </button>
          <button 
            class="tab" 
            :class="{ active: activeTab === 'pending' }"
            @click="activeTab = 'pending'"
          >
            Pending Review
            <span class="tab-count warning">{{ pendingCourts.length }}</span>
          </button>
        </div>
      </div>
    </section>

    <section class="courts-section">
      <div class="container">
        <!-- Courts Table -->
        <div class="table-wrapper">
          <table class="courts-table">
            <thead>
              <tr>
                <th>Court Name</th>
                <th>Location</th>
                <th>Tags</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedCourts.length === 0">
                <td colspan="5" class="empty-row">
                  <div class="empty-state-inline">
                    <span>No courts found</span>
                  </div>
                </td>
              </tr>
              <tr v-for="court in displayedCourts" :key="court.id">
                <td>
                  <div class="court-name-cell">
                    <img 
                      :src="court.image_url || '/court-placeholder.png'" 
                      :alt="court.name"
                      class="court-thumb"
                    />
                    <div>
                      <strong>{{ court.name }}</strong>
                      <small v-if="court.description">{{ truncate(court.description, 50) }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="location-cell">
                    <span>{{ court.address }}</span>
                    <small v-if="court.postcode">{{ court.postcode }}</small>
                  </div>
                </td>
                <td>
                  <div class="tags-cell">
                    <span 
                      v-for="tag in court.tags?.slice(0, 3)" 
                      :key="tag.id" 
                      class="tag-pill"
                    >
                      {{ tag.icon }} {{ tag.name }}
                    </span>
                    <span v-if="court.tags && court.tags.length > 3" class="tag-more">
                      +{{ court.tags.length - 3 }}
                    </span>
                  </div>
                </td>
                <td>
                  <div v-if="court.avg_rating" class="rating-cell">
                    <span class="rating-stars">
                      {{ '★'.repeat(Math.round(court.avg_rating)) }}{{ '☆'.repeat(5 - Math.round(court.avg_rating)) }}
                    </span>
                    <small>{{ court.avg_rating }} ({{ court.review_count }})</small>
                  </div>
                  <span v-else class="no-rating">No reviews</span>
                </td>
                <td>
                  <div class="actions-cell">
                    <button 
                      v-if="activeTab === 'pending'"
                      class="action-btn approve" 
                      title="Approve"
                      @click="approveCourt(court)"
                    >
                      ✓
                    </button>
                    <button 
                      class="action-btn edit" 
                      title="Edit"
                      @click="openEditModal(court)"
                    >
                      ✎
                    </button>
                    <button 
                      class="action-btn delete" 
                      title="Delete"
                      @click="deleteCourt(court)"
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ editingCourt ? 'Edit Court' : 'Add New Court' }}</h2>
          <button class="modal-close" @click="closeModal">✕</button>
        </div>
        
        <form class="modal-body" @submit.prevent="saveCourt">
          <div class="form-group">
            <label for="name">Court Name *</label>
            <input 
              id="name" 
              v-model="form.name" 
              type="text" 
              class="input"
              placeholder="e.g., Queen Elizabeth Olympic Park"
              required
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description" 
              v-model="form.description" 
              class="input textarea"
              placeholder="Brief description of the court..."
              rows="3"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="address">Address *</label>
              <input 
                id="address" 
                v-model="form.address" 
                type="text" 
                class="input"
                placeholder="Full address"
                required
              />
            </div>
            <div class="form-group">
              <label for="postcode">Postcode</label>
              <input 
                id="postcode" 
                v-model="form.postcode" 
                type="text" 
                class="input"
                placeholder="e.g., E20 2ST"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="latitude">Latitude *</label>
              <input 
                id="latitude" 
                v-model.number="form.latitude" 
                type="number" 
                step="any"
                class="input"
                placeholder="51.5074"
                required
              />
            </div>
            <div class="form-group">
              <label for="longitude">Longitude *</label>
              <input 
                id="longitude" 
                v-model.number="form.longitude" 
                type="number" 
                step="any"
                class="input"
                placeholder="-0.1278"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="borough">Borough</label>
            <input 
              id="borough" 
              v-model="form.borough" 
              type="text" 
              class="input"
              placeholder="e.g., Tower Hamlets"
            />
          </div>

          <div class="form-group">
            <label>Tags</label>
            <div class="tags-selector">
              <button
                v-for="tag in availableTags"
                :key="tag.id"
                type="button"
                class="tag-option"
                :class="{ selected: form.tagIds.includes(tag.id) }"
                @click="toggleTag(tag.id)"
              >
                {{ tag.icon }} {{ tag.name }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="imageUrl">Image URL</label>
            <input 
              id="imageUrl" 
              v-model="form.imageUrl" 
              type="url" 
              class="input"
              placeholder="https://example.com/court-image.jpg"
            />
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              {{ saving ? 'Saving...' : (editingCourt ? 'Update Court' : 'Add Court') }}
            </button>
          </div>
        </form>
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

interface Court {
  id: string
  name: string
  description?: string
  address: string
  postcode?: string
  borough?: string
  latitude: number
  longitude: number
  status: string
  image_url?: string
  tags?: Tag[]
  avg_rating?: number
  review_count?: number
}

const activeTab = ref<'approved' | 'pending'>('approved')

const { user, isAdmin, fetchUser, logout } = useUser()
const router = useRouter()

// Auth check
onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  
  if (!isAdmin.value) {
    alert('Access denied: Admins only')
    router.push('/')
    return
  }
  
  fetchCourts()
  fetchTags()
})
const showModal = ref(false)
const editingCourt = ref<Court | null>(null)
const saving = ref(false)

const approvedCourts = ref<Court[]>([])
const pendingCourts = ref<Court[]>([])
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

const displayedCourts = computed(() => {
  return activeTab.value === 'approved' ? approvedCourts.value : pendingCourts.value
})

const fetchCourts = async () => {
  try {
    const [approved, pending] = await Promise.all([
      $fetch<Court[]>('/api/courts?status=approved'),
      $fetch<Court[]>('/api/courts?status=pending')
    ])
    approvedCourts.value = approved
    pendingCourts.value = pending
  } catch (error) {
    console.error('Failed to fetch courts:', error)
  }
}

const fetchTags = async () => {
  try {
    const response = await $fetch<{ tags: Tag[] }>('/api/tags')
    availableTags.value = response.tags
  } catch (error) {
    console.error('Failed to fetch tags:', error)
  }
}

const openAddModal = () => {
  editingCourt.value = null
  resetForm()
  showModal.value = true
}

const openEditModal = (court: Court) => {
  editingCourt.value = court
  form.name = court.name
  form.description = court.description || ''
  form.address = court.address
  form.postcode = court.postcode || ''
  form.borough = court.borough || ''
  form.latitude = court.latitude
  form.longitude = court.longitude
  form.tagIds = court.tags?.map(t => t.id) || []
  form.imageUrl = court.image_url || ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingCourt.value = null
  resetForm()
}

const resetForm = () => {
  form.name = ''
  form.description = ''
  form.address = ''
  form.postcode = ''
  form.borough = ''
  form.latitude = null
  form.longitude = null
  form.tagIds = []
  form.imageUrl = ''
}

const toggleTag = (tagId: string) => {
  const index = form.tagIds.indexOf(tagId)
  if (index === -1) {
    form.tagIds.push(tagId)
  } else {
    form.tagIds.splice(index, 1)
  }
}

const saveCourt = async () => {
  if (!form.name || !form.address || form.latitude === null || form.longitude === null) {
    alert('Please fill in all required fields')
    return
  }

  saving.value = true
  try {
    if (editingCourt.value) {
      await $fetch(`/api/courts/${editingCourt.value.id}`, {
        method: 'PUT',
        body: { ...form }
      })
    } else {
      await $fetch('/api/courts', {
        method: 'POST',
        body: { ...form, isAdmin: true }
      })
    }
    closeModal()
    await fetchCourts()
  } catch (error) {
    console.error('Failed to save court:', error)
    alert('Failed to save court')
  } finally {
    saving.value = false
  }
}

const approveCourt = async (court: Court) => {
  if (!confirm(`Approve "${court.name}"?`)) return
  
  try {
    await $fetch(`/api/courts/${court.id}`, {
      method: 'PUT',
      body: { status: 'approved' }
    })
    await fetchCourts()
  } catch (error) {
    console.error('Failed to approve court:', error)
    alert('Failed to approve court')
  }
}

const deleteCourt = async (court: Court) => {
  if (!confirm(`Delete "${court.name}"? This cannot be undone.`)) return
  
  try {
    await $fetch(`/api/courts/${court.id}`, { method: 'DELETE' })
    await fetchCourts()
  } catch (error) {
    console.error('Failed to delete court:', error)
    alert('Failed to delete court')
  }
}

const truncate = (str: string, length: number) => {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

onMounted(() => {
  fetchCourts()
  fetchTags()
})
</script>

<style scoped>
.admin-page {
  padding-top: 80px;
  min-height: 100vh;
  background: var(--gray-50);
}

.page-header {
  padding: var(--space-8) 0;
  background: white;
  border-bottom: 1px solid var(--gray-200);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}

.page-header h1 {
  font-size: 1.75rem;
  margin-bottom: var(--space-1);
}

.page-header p {
  color: var(--gray-500);
}

/* Tabs */
.tabs {
  display: flex;
  gap: var(--space-2);
}

.tab {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-weight: 500;
  color: var(--gray-600);
  transition: all var(--transition-fast);
}

.tab:hover {
  background: var(--gray-50);
  border-color: var(--black);
}

.tab.active {
  background: var(--black);
  color: white;
  border-color: var(--black);
}

.tab-count {
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(255,255,255,0.2);
  border-radius: var(--radius-full);
}

.tab:not(.active) .tab-count {
  background: var(--gray-100);
}

.tab-count.warning {
  background: var(--warning-500);
  color: white;
}

/* Table */
.courts-section {
  padding: var(--space-8) 0;
}

.table-wrapper {
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-200);
  overflow: hidden;
}

.courts-table {
  width: 100%;
  border-collapse: collapse;
}

.courts-table th {
  text-align: left;
  padding: var(--space-4) var(--space-5);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray-500);
  background: var(--gray-50);
  border-bottom: 1px solid var(--gray-200);
}

.courts-table td {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--gray-100);
  vertical-align: middle;
}

.courts-table tr:last-child td {
  border-bottom: none;
}

.court-name-cell {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.court-thumb {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: var(--gray-100);
}

.court-name-cell strong {
  display: block;
  margin-bottom: 2px;
}

.court-name-cell small {
  color: var(--gray-500);
  font-size: 0.8rem;
}

.location-cell span {
  display: block;
}

.location-cell small {
  color: var(--gray-400);
  font-size: 0.8rem;
}

.tags-cell {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.tag-pill {
  padding: 2px 8px;
  font-size: 0.7rem;
  background: var(--gray-100);
  border-radius: var(--radius-full);
  white-space: nowrap;
  border: 1px solid var(--gray-200);
}

.tag-more {
  padding: 2px 8px;
  font-size: 0.7rem;
  background: var(--gray-100);
  color: var(--gray-700);
  border-radius: var(--radius-full);
  border: 1px solid var(--gray-200);
}

.rating-cell {
  display: flex;
  flex-direction: column;
}

.rating-stars {
  color: var(--warning-500);
  font-size: 0.9rem;
}

.rating-cell small {
  color: var(--gray-500);
  font-size: 0.75rem;
}

.no-rating {
  color: var(--gray-400);
  font-size: 0.875rem;
}

.actions-cell {
  display: flex;
  gap: var(--space-2);
}

.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  transition: all var(--transition-fast);
}

.action-btn.approve {
  background: var(--success-500);
  color: white;
}

.action-btn.approve:hover {
  background: var(--success-600);
}

.action-btn.edit {
  background: var(--white);
  border: 1px solid var(--gray-200);
  color: var(--gray-600);
}

.action-btn.edit:hover {
  background: var(--gray-50);
  border-color: var(--gray-300);
  color: var(--black);
}

.action-btn.delete {
  background: var(--error-500);
  color: white;
}

.action-btn.delete:hover {
  background: var(--error-600);
}

.empty-row {
  text-align: center;
  padding: var(--space-12) !important;
}

.empty-state-inline {
  color: var(--gray-400);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--gray-200);
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
}

.modal-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-size: 1.25rem;
  color: var(--gray-400);
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: var(--gray-100);
  color: var(--black);
}

.modal-body {
  padding: var(--space-6);
}

.form-group {
  margin-bottom: var(--space-5);
}

.form-group label {
  display: block;
  font-size: 0.875rem;
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
  min-height: 80px;
}

.tags-selector {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag-option {
  padding: var(--space-2) var(--space-3);
  font-size: 0.8rem;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
  color: var(--gray-600);
  cursor: pointer;
}

.tag-option:hover {
  background: var(--gray-50);
  border-color: var(--gray-300);
}

.tag-option.selected {
  background: var(--black);
  border-color: var(--black);
  color: var(--white);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-6);
  border-top: 1px solid var(--gray-200);
  margin-top: var(--space-6);
}

@media (max-width: 768px) {
  .header-row {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-4);
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .courts-table {
    display: block;
    overflow-x: auto;
  }
}
</style>
