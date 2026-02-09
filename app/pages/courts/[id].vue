<template>
  <div v-if="court" class="court-detail-page">
    <!-- Hero Section with Background / Gallery -->
    <section class="court-hero" :class="{ 'has-placeholder': !court.image_url && (!court.images || court.images.length === 0) }">
      <div v-if="court.image_url || (court.images && court.images.length > 0)" class="court-hero-gallery">
        <div class="main-image">
          <img :src="primaryImage" :alt="court.name" />
        </div>
        <div class="side-images" v-if="court.images && court.images.length > 1">
          <div v-for="image in court.images.slice(1, 3)" :key="image.id" class="side-image">
            <img :src="image.url" :alt="image.alt_text || court.name" />
          </div>
        </div>
      </div>
      <div v-else class="hero-bg-placeholder" :style="{ backgroundImage: `url('/court-placeholder.png')` }">
        <div class="hero-overlay"></div>
      </div>
      
      <div class="container court-hero-content">
        <div class="court-main-header">
          <div class="court-badge-row">
            <span class="location-badge">{{ court.borough }}</span>
            <span class="status-badge" v-if="court.status === 'approved'">Available Now</span>
          </div>
          <h1>{{ court.name }}</h1>
          <div class="address-copy-row">
            <p class="court-address-large">📍 {{ court.address }}, {{ court.postcode }}</p>
            <button @click="copyAddress" class="btn-copy">
              {{ copied ? '✅ Copied' : '📋 Copy' }}
            </button>
          </div>
        </div>

        <div class="court-quick-actions">
          <div class="rating-box" v-if="court.avg_rating">
            <div class="stars">
              <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= Math.round(court.avg_rating) }">★</span>
            </div>
            <span class="rating-val">{{ court.avg_rating }} ({{ court.review_count }} reviews)</span>
          </div>
          <div class="action-buttons">
            <NuxtLink :to="`/games/create?courtId=${court.id}`" class="btn btn-primary btn-lg glow-orange">
              🏀 Host a Game
            </NuxtLink>
            <button @click="scrollToReviewForm" class="btn btn-secondary btn-lg">
              💬 Leave a Review
            </button>
          </div>
        </div>
      </div>
    </section>

    <div class="container court-content-grid">
      <!-- Left Column: Details -->
      <div class="court-details-col">
        <section class="details-section">
          <h2>About this court</h2>
          <p class="court-description">{{ court.description || 'A great community court for London hoopers.' }}</p>
          
          <div class="features-grid-large">
            <div v-for="tag in court.tags" :key="tag.id" class="feature-item">
              <span class="feature-icon">{{ tag.icon }}</span>
              <div class="feature-text">
                <span class="feature-name">{{ tag.name }}</span>
                <span class="feature-cat">{{ tag.category }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Upcoming Games -->
        <section class="upcoming-games-section" id="upcoming-games">
          <div class="section-header-row">
            <h2>Upcoming Games</h2>
            <NuxtLink to="/games" class="link">View all games</NuxtLink>
          </div>
          
          <div v-if="court.upcoming_games && court.upcoming_games.length > 0" class="games-mini-list">
            <NuxtLink v-for="game in court.upcoming_games" :key="game.id" :to="`/games/${id}`" class="game-mini-card">
              <div class="game-date">
                <span class="day">{{ formatDate(game.booking_date, 'DD') }}</span>
                <span class="month">{{ formatDate(game.booking_date, 'MMM') }}</span>
              </div>
              <div class="game-info">
                <h3>{{ game.title }}</h3>
                <p>{{ game.start_time }} - {{ game.end_time }}</p>
              </div>
              <div class="game-meta">
                <span class="game-players">👥 {{ game.current_players }}/{{ game.max_players }}</span>
                <span class="game-price">{{ game.price > 0 ? `£${game.price}` : 'Free' }}</span>
              </div>
            </NuxtLink>
          </div>
          <div v-else class="empty-games">
            <p>No games scheduled here yet. Why not host the first one?</p>
            <NuxtLink :to="`/games/create?courtId=${court.id}`" class="btn btn-outline btn-sm">Host First Game</NuxtLink>
          </div>
        </section>

        <!-- Reviews Section -->
        <section class="reviews-section" id="reviews">
          <div class="section-header-row">
            <h2>Community Reviews</h2>
            <button v-if="!showReviewForm" @click="showReviewForm = true" class="btn btn-outline btn-sm">Add Review</button>
          </div>

          <!-- Review Form -->
          <div v-if="showReviewForm" class="review-form-card card aura-orange" id="review-form">
            <h3>Share your experience</h3>
            <p>Help other hoopers find the best courts.</p>
            
            <form @submit.prevent="submitReview">
              <div class="rating-input">
                <span v-for="i in 5" :key="i" class="star-btn" :class="{ active: i <= reviewForm.rating }" @click="reviewForm.rating = i">★</span>
              </div>
              
              <textarea v-model="reviewForm.comment" placeholder="What did you like? How's the surface? Is it busy?" rows="3" required></textarea>
              
              <div class="form-actions">
                <button type="button" @click="showReviewForm = false" class="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" class="btn btn-primary btn-sm" :disabled="submittingReview">
                  {{ submittingReview ? 'Posting...' : 'Post Review' }}
                </button>
              </div>
            </form>
          </div>

          <div v-if="court.reviews && court.reviews.length > 0" class="reviews-list">
            <div v-for="review in court.reviews" :key="review.id" class="review-card">
              <div class="review-user">
                <div class="avatar">{{ review.user_name?.[0] || 'U' }}</div>
                <div class="user-info">
                  <span class="name">{{ review.user_name }}</span>
                  <span class="date">{{ formatDate(review.created_at) }}</span>
                </div>
                <div class="stars">
                  <span v-for="i in 5" :key="i" class="star-mini" :class="{ active: i <= review.rating }">★</span>
                </div>
              </div>
              <p class="comment">{{ review.comment }}</p>
            </div>
          </div>
          <p v-else class="text-muted">No reviews yet. Be the first to share your experience!</p>
        </section>
      </div>

      <!-- Right Column: Map & Sidebar -->
      <div class="court-sidebar-col">
        <div class="sticky-sidebar">
          <div class="map-card card aura-orange">
            <h3>Court Location</h3>
            <div class="map-container">
              <ClientOnly>
                <CourtMap :courts="[court]" :active-court-id="court.id" :zoom="15" />
                <template #fallback>
                  <div class="map-loading">Loading Map...</div>
                </template>
              </ClientOnly>
            </div>
            <button @click="openInGoogleMaps" class="btn btn-secondary btn-full">
              🗺️ Open in Google Maps
            </button>
          </div>

          <div class="sidebar-help card">
            <h4>Court Rules</h4>
            <ul>
              <li>Respect the local community</li>
              <li>Keep the court clean</li>
              <li>Wait for your turn if busy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="loading-state">
    <div class="spinner large"></div>
    <p>Loading Court Details...</p>
  </div>
  <div v-else class="error-state">
    <h1>Court Not Found</h1>
    <p>The court you are looking for doesn't exist or has been removed.</p>
    <NuxtLink to="/courts" class="btn btn-primary">Back to Courts</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const { user } = useUser()
const route = useRoute()
const id = route.params.id as string
const court = ref<any>(null)
const loading = ref(true)
const copied = ref(false)
const showReviewForm = ref(false)
const submittingReview = ref(false)
const reviewForm = reactive({
  rating: 5,
  comment: ''
})

const fetchCourt = async () => {
  loading.value = true
  try {
    const data = await $fetch(`/api/courts/${id}`)
    court.value = data
  } catch (error) {
    console.error('Failed to fetch court:', error)
  } finally {
    loading.value = false
  }
}

const primaryImage = computed(() => {
  if (court.value?.image_url) return court.value.image_url
  if (court.value?.images && court.value.images.length > 0) return court.value.images[0].url
  return '/court-placeholder.png'
})

const formatDate = (date: string, format = 'MMMM D, YYYY') => {
  return dayjs(date).format(format)
}

const copyAddress = () => {
  const fullAddress = `${court.value.address}, ${court.value.postcode}`
  navigator.clipboard.writeText(fullAddress)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

const scrollToReviewForm = () => {
  showReviewForm.value = true
  setTimeout(() => {
    document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

const submitReview = async () => {
  if (!user.value) {
    return navigateTo('/auth/signin?redirect=' + route.fullPath)
  }

  submittingReview.value = true
  try {
    await $fetch('/api/reviews', {
      method: 'POST',
      body: {
        courtId: court.value.id,
        userId: user.value.id,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      }
    } as any)
    
    // Refresh court data
    await fetchCourt()
    showReviewForm.value = false
    reviewForm.comment = ''
    reviewForm.rating = 5
  } catch (err) {
    console.error('Failed to submit review:', err)
  } finally {
    submittingReview.value = false
  }
}

const openInGoogleMaps = () => {
  const url = `https://www.google.com/maps/search/?api=1&query=${court.value.latitude},${court.value.longitude}`
  window.open(url, '_blank')
}

onMounted(() => {
  fetchCourt()
})
</script>

<style scoped>
.court-detail-page {
  background: var(--white);
  min-height: 100vh;
}

.court-hero {
  position: relative;
  min-height: 400px;
}

.court-hero.has-placeholder {
  min-height: 500px;
}

.hero-bg-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
  z-index: 1;
}

.court-hero-gallery {
  display: grid;
  grid-template-columns: 1fr 300px;
  height: 500px;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  background: var(--gray-50);
}

.main-image {
  height: 100%;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.side-images {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.side-image {
  flex: 1;
}

.side-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.court-hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-8);
  padding: var(--space-12) var(--space-4);
}

.has-placeholder .court-hero-content {
  padding-bottom: var(--space-12);
}

.has-placeholder .court-main-header h1,
.has-placeholder .court-address-large {
  color: white;
}

.court-badge-row {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.location-badge {
  background: var(--orange-50);
  color: var(--orange-600);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.status-badge {
  background: var(--success-500);
  color: white;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.75rem;
}

.address-copy-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-1);
}

.court-address-large {
  font-size: 1.125rem;
  color: var(--gray-600);
}

.btn-copy {
  background: var(--gray-100);
  border: none;
  border-radius: var(--radius-md);
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-copy:hover {
  background: var(--gray-200);
}

.has-placeholder .btn-copy {
  background: rgba(255,255,255,0.2);
  color: white;
  backdrop-filter: blur(4px);
}

.court-quick-actions {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.action-buttons {
  display: flex;
  gap: var(--space-4);
}

.rating-box {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
}

.rating-box .star {
  color: var(--gray-300);
  font-size: 1.25rem;
}

.rating-box .star.active {
  color: #FBBF24;
}

.rating-val {
  font-weight: 700;
  color: var(--gray-900);
}

.has-placeholder .rating-val {
  color: white;
}

/* Content Grid */
.court-content-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: var(--space-16);
  padding-top: var(--space-12);
  padding-bottom: var(--space-24);
}

section {
  margin-bottom: var(--space-16);
}

h2 {
  font-size: 2rem;
  margin-bottom: var(--space-6);
  letter-spacing: -0.02em;
}

.court-description {
  font-size: 1.125rem;
  color: var(--gray-700);
  line-height: 1.7;
  max-width: 600px;
  margin-bottom: var(--space-10);
}

.features-grid-large {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-6);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--gray-50);
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-100);
}

.feature-icon {
  font-size: 1.5rem;
}

.feature-text {
  display: flex;
  flex-direction: column;
}

.feature-name {
  font-weight: 700;
  color: var(--black);
}

.feature-cat {
  font-size: 0.75rem;
  color: var(--gray-500);
  text-transform: uppercase;
}

/* Sidebar */
.sticky-sidebar {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.map-card {
  padding: var(--space-6);
}

.map-card h3 {
  margin-bottom: var(--space-4);
}

.map-container {
  height: 320px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: var(--space-4);
  border: 1px solid var(--gray-200);
}

.btn-full {
  width: 100%;
}

.sidebar-help {
  padding: var(--space-6);
  background: var(--gray-50);
  border-color: transparent;
}

.sidebar-help ul {
  list-style: none;
  padding: 0;
  margin-top: var(--space-4);
}

.sidebar-help li {
  margin-bottom: var(--space-2);
  color: var(--gray-600);
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-help li::before {
  content: '✓';
  color: var(--orange-500);
  font-weight: bold;
}

/* Upcoming Games */
.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
}

.games-mini-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.game-mini-card {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-4);
  border: 1px solid var(--gray-100);
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);
}

.game-mini-card:hover {
  border-color: var(--orange-300);
  background: var(--orange-50);
  transform: translateX(4px);
}

.game-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  height: 60px;
  background: var(--black);
  color: white;
  border-radius: var(--radius-lg);
}

.game-date .day {
  font-size: 1.25rem;
  font-weight: 900;
  line-height: 1;
}

.game-date .month {
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
}

.game-info {
  flex: 1;
}

.game-info h3 {
  font-size: 1.125rem;
  margin-bottom: 2px;
}

.game-info p {
  color: var(--gray-500);
  font-size: 0.875rem;
}

.game-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.game-players {
  font-weight: 700;
  font-size: 0.875rem;
}

.game-price {
  color: var(--orange-600);
  font-weight: 800;
}

/* Reviews */
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.review-card {
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--gray-50);
}

.review-user {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.review-user .avatar {
  width: 32px;
  height: 32px;
  background: var(--gray-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--gray-500);
}

.review-user .user-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.review-user .name {
  font-weight: 700;
}

.review-user .date {
  font-size: 0.75rem;
  color: var(--gray-400);
}

.review-user .stars {
  color: #FBBF24;
  font-weight: 800;
}

.review-card .comment {
  color: var(--gray-700);
  line-height: 1.6;
  font-size: 1.0625rem;
}

.star-mini, .star-btn {
  color: var(--gray-200);
  font-size: 1rem;
}

.star-mini.active, .star-btn.active {
  color: #FBBF24;
}

.review-form-card {
  margin-bottom: var(--space-10);
  padding: var(--space-6);
  border: 1px solid var(--orange-100);
}

.review-form-card h3 {
  margin-bottom: 2px;
}

.review-form-card p {
  font-size: 0.875rem;
  color: var(--gray-500);
  margin-bottom: var(--space-6);
}

.rating-input {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.star-btn {
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.star-btn:hover {
  transform: scale(1.2);
}

.review-form-card textarea {
  width: 100%;
  padding: var(--space-4);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  font-family: inherit;
  margin-bottom: var(--space-4);
  resize: vertical;
}

.review-form-card .form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}

/* States */
.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: var(--space-4);
}

/* Responsive */
@media (max-width: 1024px) {
  .court-content-grid {
    grid-template-columns: 1fr;
  }
  
  .court-hero-gallery {
    grid-template-columns: 1fr;
    height: 300px;
  }
  
  .side-images {
    display: none;
  }
}

@media (max-width: 768px) {
  .court-hero-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .court-quick-actions {
    text-align: left;
    width: 100%;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .rating-box {
    justify-content: flex-start;
  }
  
  .court-hero-gallery {
    height: 240px;
  }
}
</style>
