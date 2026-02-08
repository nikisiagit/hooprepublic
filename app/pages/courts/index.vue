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
            
            <button 
              class="view-toggle-btn" 
              @click="isMapView = !isMapView"
              :class="{ active: isMapView }"
              aria-label="Toggle map view"
            >
              <span v-if="!isMapView" class="toggle-icon">🗺️ Map</span>
              <span v-else class="toggle-icon">📋 List</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Courts Content -->
    <section class="courts-section" :class="{ 'map-active': isMapView }">
      <div class="split-container">
        <!-- Listings Column -->
        <div class="listings-column">
          <div class="results-header" v-if="!loading && courts.length > 0">
            <h2>{{ filteredCourts.length }} courts found in London</h2>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="courts-list">
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

          <!-- List View -->
          <div v-else class="courts-list">
            <div 
              v-for="court in filteredCourts" 
              :key="court.id" 
              class="court-card card"
              @mouseenter="hoveredCourtId = court.id"
              @mouseleave="hoveredCourtId = null"
              :class="{ 'is-hovered': hoveredCourtId === court.id }"
            >
              <div class="court-image">
                <img 
                  :src="court.image_url || '/placeholder-court.svg'" 
                  :alt="court.name"
                  loading="lazy"
                />
                <span v-if="getCourtType(court)" class="court-type-badge">
                  {{ getCourtType(court) }}
                </span>
              </div>
              
              <div class="court-content">
                <div class="court-header">
                  <div>
                    <span class="location-top">{{ court.borough || 'London' }}</span>
                    <h3>{{ court.name }}</h3>
                    <p class="court-address">{{ court.address }}</p>
                  </div>
                  <div v-if="court.avg_rating" class="court-rating">
                    <span class="rating-stars">★</span>
                    <span class="rating-value">{{ court.avg_rating }}</span>
                  </div>
                </div>

                <div class="court-features">
                  <span 
                    v-for="tag in court.tags?.slice(0, 3)" 
                    :key="tag.id" 
                    class="feature"
                  >
                    {{ tag.icon }} {{ tag.name }}
                  </span>
                </div>

                <div class="court-footer">
                  <div class="price-info">
                    <span class="price">Free</span>
                    <span class="subtext">Public Access</span>
                  </div>
                  <div class="court-actions">
                    <NuxtLink :to="`/courts/${court.id}`" class="btn btn-secondary btn-sm">
                      Details
                    </NuxtLink>
                    <button class="btn btn-primary btn-sm">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Column -->
        <div class="map-column" :class="{ 'mobile-visible': isMapView }">
          <div class="map-sticky-wrapper">
            <ClientOnly>
              <CourtMap :courts="filteredCourts" :active-court-id="hoveredCourtId" />
              <template #fallback>
                <div class="map-loading">
                  <span class="spinner"></span>
                  <p>Loading Map...</p>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile Map Toggle -->
    <button 
      class="mobile-floating-toggle" 
      @click="isMapView = !isMapView"
    >
      <span v-if="!isMapView">🗺️ View Map</span>
      <span v-else>📋 View List</span>
    </button>
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
  latitude: number
  longitude: number
  tags?: Tag[]
  avg_rating?: number
  review_count?: number
}

const searchQuery = ref('')
const loading = ref(false)
const isMapView = ref(false)
const hoveredCourtId = ref<string | null>(null)
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
/* Split View Layout */
.courts-section {
  padding: 0;
  background: var(--white);
  margin-top: 24px;
}

.split-container {
  display: flex;
  min-height: calc(100vh - 160px);
}

.listings-column {
  flex: 0 0 55%;
  padding: var(--space-8);
  border-right: 1px solid var(--gray-100);
}

.results-header {
  margin-bottom: var(--space-8);
}

.results-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--black);
}

.map-column {
  flex: 0 0 45%;
  position: sticky;
  top: 152px; /* Fixed Header + Sticky Filters */
  height: calc(100vh - 152px);
  background: var(--gray-50);
}

.map-sticky-wrapper {
  height: 100%;
  width: 100%;
}

.map-loading {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  color: var(--gray-500);
}

/* Specific List/Grid Layout */
.courts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

.court-card {
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: white;
  transition: all var(--transition-base);
  cursor: pointer;
}

.court-card.is-hovered {
  border-color: var(--black);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.court-image {
  position: relative;
  height: 220px;
  overflow: hidden;
  border-radius: var(--radius-lg);
  margin: var(--space-3);
}

.court-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.location-top {
  display: block;
  font-size: 0.75rem;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.court-address {
  font-size: 0.875rem;
  color: var(--gray-600);
  line-height: 1.4;
}

.court-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--gray-100);
}

.price-info {
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--black);
}

.subtext {
  font-size: 0.75rem;
  color: var(--gray-500);
}

.court-actions {
  display: flex;
  gap: var(--space-2);
  margin-left: auto;
}

/* Mobile Floating Toggle */
.mobile-floating-toggle {
  display: none;
  position: fixed;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-3) var(--space-6);
  background: var(--black);
  color: white;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.9375rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 100;
  border: none;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .listings-column {
    flex: 0 0 100%;
    padding: var(--space-6);
  }
  
  .map-column {
    display: none;
  }

  .map-column.mobile-visible {
    display: block;
    position: fixed;
    top: 152px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
    flex: 0 0 100%;
  }

  .mobile-floating-toggle {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .courts-section.map-active .listings-column {
    display: none;
  }
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--gray-200);
  border-top-color: var(--black);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Global Reset for this page specific parts */
.view-toggle-btn {
  display: none !important; /* Replaced by mobile toggle and split view */
}

.page-header {
  padding: 100px var(--space-6) var(--space-4); /* Added padding for fixed nav */
  background: var(--white);
  text-align: left;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}
</style>

<style scoped>
/* Filters restored */
.filters-section {
  padding: 0 var(--space-6) var(--space-6);
  background: var(--white);
  border-bottom: 1px solid var(--gray-100);
}

.filters-bar {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-4);
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
  height: 48px;
  min-width: 300px;
}

.search-input-wrapper:focus-within {
  border-color: var(--black);
  box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
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
  font-size: 0.9375rem;
  height: 100%;
}

.search-input:focus {
  outline: none;
}

.filter-group {
  display: flex;
  gap: var(--space-2);
}

.filter-select {
  padding: 0 var(--space-4);
  padding-right: var(--space-10);
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
  height: 48px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23171717' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: all var(--transition-fast);
}

.filter-select:focus {
  outline: none;
  border-color: var(--black);
}

@media (max-width: 768px) {
  .filters-bar {
    flex-direction: column;
  }
  
  .search-input-wrapper {
    min-width: 100%;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .filter-select {
    flex: 1;
  }
}
</style>
