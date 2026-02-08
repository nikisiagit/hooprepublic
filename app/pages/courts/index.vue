<template>
  <div class="courts-page">
    <section class="page-header">
      <div class="container">
        <h1>Find Basketball Courts</h1>
        <p>Discover and book courts across London</p>
      </div>
    </section>

    <!-- Search & Filters -->
    <section class="filters-section">
      <div class="container">
        <div class="filters-bar glass">
          <div class="search-input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              class="search-input"
              placeholder="Search by location, postcode or court name..."
              v-model="searchQuery"
            />
          </div>

          <div class="filter-group">
            <select class="filter-select" v-model="filters.type">
              <option value="">All Types</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
            </select>

            <select class="filter-select" v-model="filters.borough">
              <option value="">All Boroughs</option>
              <option value="westminster">Westminster</option>
              <option value="camden">Camden</option>
              <option value="southwark">Southwark</option>
              <option value="tower-hamlets">Tower Hamlets</option>
              <option value="hackney">Hackney</option>
              <option value="islington">Islington</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Courts Grid -->
    <section class="courts-section">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="courts-grid">
          <div v-for="i in 6" :key="i" class="court-card-skeleton">
            <div class="skeleton court-image-skeleton"></div>
            <div class="skeleton-content">
              <div class="skeleton skeleton-title"></div>
              <div class="skeleton skeleton-text"></div>
              <div class="skeleton skeleton-tags"></div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="courts.length === 0" class="empty-state">
          <div class="empty-state-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h3 class="empty-state-title">No courts found</h3>
          <p class="empty-state-text">
            We haven't added any courts yet. Check back soon or help us by suggesting a court in your area!
          </p>
          <NuxtLink to="/courts/suggest" class="btn btn-primary" style="margin-top: var(--space-6)">
            Suggest a Court
          </NuxtLink>
        </div>

        <!-- Courts List -->
        <div v-else class="courts-grid">
          <div 
            v-for="court in filteredCourts" 
            :key="court.id" 
            class="court-card card"
          >
            <div class="court-image">
              <img 
                :src="court.image_url || '/placeholder-court.svg'" 
                :alt="court.name"
              />
              <span v-if="getCourtType(court)" class="court-type-badge">
                {{ getCourtType(court) }}
              </span>
            </div>
            
            <div class="court-content">
              <div class="court-header">
                <div>
                  <h3>{{ court.name }}</h3>
                  <p class="court-location">{{ court.address }}<span v-if="court.postcode">, {{ court.postcode }}</span></p>
                </div>
                <div v-if="court.avg_rating" class="court-rating">
                  <span class="rating-stars">★</span>
                  <span class="rating-value">{{ court.avg_rating }}</span>
                  <span class="rating-count">({{ court.review_count }})</span>
                </div>
              </div>

              <div class="court-features">
                <span 
                  v-for="tag in court.tags?.slice(0, 4)" 
                  :key="tag.id" 
                  class="feature"
                >
                  {{ tag.icon }} {{ tag.name }}
                </span>
              </div>

              <div class="court-actions">
                <NuxtLink :to="`/courts/${court.id}`" class="btn btn-secondary">
                  View Details
                </NuxtLink>
                <button class="btn btn-primary">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
  address: string
  postcode?: string
  borough?: string
  image_url?: string
  tags?: Tag[]
  avg_rating?: number
  review_count?: number
}

const searchQuery = ref('')
const loading = ref(false)
const courts = ref<Court[]>([])

const filters = reactive({
  type: '',
  borough: ''
})

// Get court type from tags
const getCourtType = (court: Court): string | null => {
  const indoorTag = court.tags?.find(t => t.id === 'tag_indoor')
  if (indoorTag) return '🏟️ Indoor'
  const outdoorTag = court.tags?.find(t => t.id === 'tag_outdoor')
  if (outdoorTag) return '🌳 Outdoor'
  return null
}

// Computed filtered courts
const filteredCourts = computed(() => {
  let result = courts.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(court => 
      court.name.toLowerCase().includes(query) ||
      court.address.toLowerCase().includes(query) ||
      (court.postcode?.toLowerCase().includes(query) ?? false)
    )
  }

  if (filters.type) {
    const tagId = filters.type === 'indoor' ? 'tag_indoor' : 'tag_outdoor'
    result = result.filter(court => 
      court.tags?.some(t => t.id === tagId)
    )
  }

  if (filters.borough) {
    result = result.filter(court => 
      court.borough?.toLowerCase().replace(/\s/g, '-') === filters.borough
    )
  }

  return result
})

// Fetch courts from API
const fetchCourts = async () => {
  loading.value = true
  try {
    const response = await $fetch<Court[]>('/api/courts')
    courts.value = response
  } catch (error) {
    console.error('Failed to fetch courts:', error)
    courts.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCourts()
})
</script>

<style scoped>
.courts-page {
  padding-top: 80px;
}

.page-header {
  padding: var(--space-16) 0 var(--space-12);
  background: var(--white);
  text-align: center;
  border-bottom: 1px solid var(--gray-100);
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: var(--space-2);
  letter-spacing: -0.02em;
}

.page-header p {
  font-size: 1.25rem;
  color: var(--gray-500);
}

/* Filters */
.filters-section {
  padding: var(--space-6) 0;
  position: sticky;
  top: 72px;
  z-index: 50;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--gray-100);
}

.filters-bar {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-4);
  background: white;
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.search-input-wrapper:focus-within {
  border-color: var(--black);
}

.search-input-wrapper svg {
  color: var(--gray-400);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  padding: var(--space-3) 0;
  border: none;
  background: none;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
}

.filter-group {
  display: flex;
  gap: var(--space-3);
}

.filter-select {
  padding: var(--space-3) var(--space-4);
  padding-right: var(--space-10);
  background: white;
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23171717' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: all var(--transition-fast);
}

.filter-select:focus {
  outline: none;
  border-color: var(--black);
}

/* Courts Grid */
.courts-section {
  padding: var(--space-8) 0 var(--space-16);
}

.courts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: var(--space-8);
}

.court-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--gray-200);
  height: 100%;
}

.court-card:hover {
  border-color: var(--black);
  transform: translateY(-4px);
}

.court-image {
  position: relative;
  height: 240px;
  overflow: hidden;
  background: var(--gray-100);
}

.court-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.court-card:hover .court-image img {
  transform: scale(1.05);
}

.court-type-badge {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  padding: var(--space-1) var(--space-3);
  background: var(--black);
  color: var(--white);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: var(--shadow-md);
}

.court-content {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  flex: 1;
}

.court-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
}

.court-header h3 {
  font-size: 1.25rem;
  margin-bottom: var(--space-1);
}

.court-location {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.court-rating {
  font-weight: 600;
  font-size: 0.875rem;
}

.court-price {
  text-align: right;
  flex-shrink: 0;
}

.court-price .price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--black);
}

.court-price .per-hour {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.court-features {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.feature {
  padding: var(--space-1) var(--space-3);
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  color: var(--gray-700);
}

.court-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--gray-100);
}

.court-actions .btn {
  flex: 1;
}

/* Skeleton Loading */
.court-card-skeleton {
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--gray-200);
}

.court-image-skeleton {
  height: 240px;
}

.skeleton-content {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.skeleton-title {
  height: 24px;
  width: 70%;
}

.skeleton-text {
  height: 16px;
  width: 50%;
}

.skeleton-tags {
  height: 32px;
  width: 100%;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16) var(--space-8);
  text-align: center;
  background: var(--gray-50);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--gray-200);
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  margin-bottom: var(--space-6);
  color: var(--gray-400);
}

.empty-state-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: var(--space-2);
}

.empty-state-text {
  color: var(--gray-500);
  max-width: 400px;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.25rem;
  }

  .filters-bar {
    flex-direction: column;
  }

  .filter-group {
    width: 100%;
  }

  .filter-select {
    flex: 1;
  }

  .courts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
