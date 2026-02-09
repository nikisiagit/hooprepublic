<template>
  <div class="games-page">
    <section class="page-header">
      <div class="container header-inner">
        <div class="header-text">
          <h1>Games</h1>
          <p>Join pickup games in London</p>
        </div>
        
        <!-- Next Available Game Prompt -->
        <div v-if="nextAvailableGame" class="next-game-prompt aura-orange">
          <div class="prompt-content">
            <span class="prompt-label">Next Available Game</span>
            <div class="prompt-info">
              <span class="prompt-time">🕒 {{ formatTime(nextAvailableGame.start_time) }}</span>
              <span class="prompt-court">{{ nextAvailableGame.court_name }}</span>
            </div>
          </div>
          <button @click="scrollToGame(nextAvailableGame.id)" class="btn btn-primary btn-sm">
            Take me there
          </button>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="filters-section" v-if="upcomingDays.length > 0">
      <div class="container">
        <div class="filters-container">
          <div class="date-filters">
            <button 
              v-for="day in upcomingDays" 
              :key="day.value"
              class="date-btn"
              :class="{ active: selectedDate === day.value }"
              @click="selectedDate = day.value"
            >
              <span class="date-day">{{ day.label }}</span>
              <span class="date-date">{{ day.date }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Games List -->
    <section class="games-section">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="games-list">
          <div v-for="i in 4" :key="i" class="game-card-skeleton">
            <div class="skeleton skeleton-time"></div>
            <div class="skeleton-content">
              <div class="skeleton skeleton-title"></div>
              <div class="skeleton skeleton-text"></div>
            </div>
            <div class="skeleton skeleton-players"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="games.length === 0" class="empty-state">
          <div class="empty-state-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3 class="empty-state-title">No open games yet</h3>
          <p class="empty-state-text">
            Be the first to create an open game! Book a court and invite others to join.
          </p>
          <NuxtLink to="/games/create" class="btn btn-primary" style="margin-top: var(--space-6)">
            Create a Game
          </NuxtLink>
        </div>

        <!-- Games List -->
        <div v-else class="games-list">
          <div 
            v-for="game in filteredGames" 
            :key="game.id" 
            :id="`game-${game.id}`"
            class="game-card card"
          >
            <div class="game-time">
              <span class="time">{{ formatTime(game.start_time) }}</span>
              <span class="duration">{{ getDuration(game.start_time, game.end_time) }}</span>
            </div>

            <div class="game-info">
              <h3>{{ game.court_name }}</h3>
              <p class="game-location">{{ game.court_address }}</p>
              
              <div class="game-host">
                <div class="host-avatar">
                  {{ getInitials(game.host_name) }}
                </div>
                <span>Hosted by <strong>{{ game.host_name }}</strong></span>
              </div>
            </div>

            <div class="game-players">
              <div class="players-count">
                <span class="current">{{ game.current_players }}</span>
                <span class="separator">/</span>
                <span class="max">{{ game.max_players }}</span>
              </div>
              <span class="players-label">Players</span>
              
              <div class="spots-indicator">
                <div 
                  class="spots-fill" 
                  :style="{ width: `${(game.current_players / game.max_players) * 100}%` }"
                ></div>
              </div>
            </div>

            <div class="game-actions">
              <button 
                class="btn btn-primary"
                :disabled="game.current_players >= game.max_players"
              >
                {{ game.current_players >= game.max_players ? 'Full' : 'Join Game' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface Game {
  id: string
  booking_date: string
  start_time: string
  end_time: string
  court_name: string
  court_address: string
  host_name: string
  current_players: number
  max_players: number
}

interface Day {
  value: string
  label: string
  date: string
}

const loading = ref(false)
const games = ref<Game[]>([])
const selectedDate = ref('')

// Generate upcoming days
const upcomingDays = computed<Day[]>(() => {
  const days: Day[] = []
  const today = new Date()
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    const value = date.toISOString().split('T')[0] ?? ''
    const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayNames[date.getDay()]
    const dateStr = date.getDate().toString()
    
    // Ensure value is a string (TS fix)
    days.push({ value: value || '', label, date: dateStr })
  }
  
  return days
})

// Set default selected date
onMounted(() => {
  const days = upcomingDays.value
  if (days.length > 0 && days[0]) {
    selectedDate.value = days[0].value
  }
  fetchGames()
})

const filteredGames = computed(() => {
  if (!selectedDate.value) return games.value
  return games.value.filter(game => game.booking_date === selectedDate.value)
})

const nextAvailableGame = computed(() => {
  if (games.value.length === 0) return null
  // Games are already sorted by date and time from the API usually, 
  // but let's just take the first one that hasn't started yet today or in the future
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const currentTime = now.getHours() * 60 + now.getMinutes()

  return games.value.find(game => {
    if (game.booking_date > today) return true
    if (game.booking_date === today) {
      const [h, m] = game.start_time.split(':').map(Number)
      const gameTime = (h || 0) * 60 + (m || 0)
      return gameTime > currentTime
    }
    return false
  }) || games.value[0]
})

const scrollToGame = (id: string) => {
  const el = document.getElementById(`game-${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add('highlight-pulse')
    setTimeout(() => el.classList.remove('highlight-pulse'), 2000)
  }
}

const fetchGames = async () => {
  loading.value = true
  try {
    const response = await $fetch<Game[]>('/api/games')
    games.value = response
  } catch (error) {
    console.error('Failed to fetch games:', error)
    games.value = []
  } finally {
    loading.value = false
  }
}

const formatTime = (time: string) => {
  if (!time) return ''
  const parts = time.split(':')
  if (parts.length < 2) return time
  
  const hours = parts[0] ?? '0'
  const minutes = parts[1] ?? '00'
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

const getDuration = (start: string, end: string) => {
  if (!start || !end) return ''
  const startParts = start.split(':').map(Number)
  const endParts = end.split(':').map(Number)
  
  if (startParts.length < 2 || endParts.length < 2) return ''
  
  const [startHours, startMinutes] = startParts
  const [endHours, endMinutes] = endParts
  
  // Safe access with fallback or just assertions if confident
  const sH = startHours || 0
  const sM = startMinutes || 0
  const eH = endHours || 0
  const eM = endMinutes || 0

  const startTotal = sH * 60 + sM
  const endTotal = eH * 60 + eM
  const diff = endTotal - startTotal
  
  const hours = Math.floor(diff / 60)
  const minutes = diff % 60
  
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

const getInitials = (name: string) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}
</script>

<style scoped>
.games-page {
  padding-top: 80px;
}

.page-header {
  padding: var(--space-8) 0;
  background: var(--white);
  border-bottom: 1px solid var(--gray-100);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-8);
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 2px;
  letter-spacing: -0.02em;
}

.page-header p {
  font-size: 1rem;
  color: var(--gray-500);
}

/* Next Game Prompt */
.next-game-prompt {
  background: var(--gray-950);
  border: 1px solid var(--orange-900);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-2xl);
  display: flex;
  align-items: center;
  gap: var(--space-6);
  color: white;
}

.prompt-content {
  display: flex;
  flex-direction: column;
}

.prompt-label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  font-weight: 800;
  color: var(--orange-500);
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.prompt-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 700;
  font-size: 0.9375rem;
}

.prompt-time {
  white-space: nowrap;
}

.prompt-court {
  color: var(--gray-400);
  font-weight: 500;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Filters */
.filters-section {
  padding: var(--space-4) 0;
  position: sticky;
  top: 72px;
  z-index: 50;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
}

.filters-container {
  display: flex;
  justify-content: center;
}

.date-filters {
  display: flex;
  gap: var(--space-1);
  background: var(--gray-50);
  padding: 4px;
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-100);
}

.date-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 16px;
  background: transparent;
  border: none;
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  flex-shrink: 0;
  min-width: 70px;
}

.date-btn:hover {
  border-color: var(--black);
}

.date-btn.active {
  background: var(--black);
  border-color: var(--black);
  color: var(--white);
}

.date-day {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.date-date {
  font-size: 1.25rem;
  font-weight: 700;
}

/* Games List */
.games-section {
  padding: var(--space-8) 0 var(--space-16);
}

.games-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 800px;
  margin: 0 auto;
}

.game-card {
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: var(--space-4);
  align-items: center;
  padding: var(--space-4) var(--space-6);
  background: var(--white);
  border: 1px solid var(--gray-100);
  border-radius: var(--radius-2xl);
  transition: all var(--transition-base);
}

.game-card:hover {
  border-color: var(--black);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.game-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  background: var(--gray-50);
  border-radius: var(--radius-lg);
  min-width: 80px;
  border: 1px solid var(--gray-200);
}

.game-time .time {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--black);
}

.game-time .duration {
  font-size: 0.75rem;
  color: var(--gray-500);
  margin-top: 2px;
}

.game-info h3 {
  font-size: 1.125rem;
  margin-bottom: var(--space-1);
}

.game-location {
  font-size: 0.875rem;
  color: var(--gray-500);
  margin-bottom: var(--space-3);
}

.game-host {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
  color: var(--gray-600);
}

.host-avatar {
  width: 28px;
  height: 28px;
  background: var(--black);
  color: var(--white);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  font-weight: 600;
}

.game-players {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.players-count {
  font-size: 1.25rem;
  font-weight: 700;
}

.players-count .current {
  color: var(--black);
}

.players-count .separator,
.players-count .max {
  color: var(--gray-400);
}

.players-label {
  font-size: 0.75rem;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.spots-indicator {
  width: 60px;
  height: 4px;
  background: var(--gray-200);
  border-radius: 2px;
  overflow: hidden;
}

.spots-fill {
  height: 100%;
  background: var(--black);
  border-radius: 2px;
  transition: width var(--transition-base);
}

.game-actions .btn {
  white-space: nowrap;
}

.game-actions .btn:disabled {
  background: var(--gray-100);
  color: var(--gray-400);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.highlight-pulse {
  animation: highlight-pulse 2s ease-out;
}

@keyframes highlight-pulse {
  0% { border-color: var(--orange-500); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
  70% { border-color: var(--orange-500); box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
  100% { border-color: var(--gray-100); box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
}

/* Skeleton */
.game-card-skeleton {
  display: grid;
  grid-template-columns: 80px 1fr 60px 100px;
  gap: var(--space-6);
  align-items: center;
  padding: var(--space-5);
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-200);
}

.skeleton-time {
  height: 60px;
  border-radius: var(--radius-lg);
  background: var(--gray-100);
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.skeleton-title {
  height: 24px;
  width: 60%;
  background: var(--gray-100);
}

.skeleton-text {
  height: 16px;
  width: 40%;
  background: var(--gray-100);
}

.skeleton-players {
  height: 50px;
  border-radius: var(--radius-lg);
  background: var(--gray-100);
}

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.25rem;
  }

  .game-card {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .game-time {
    flex-direction: row;
    gap: var(--space-3);
    justify-content: center;
  }

  .game-players {
    flex-direction: row;
    justify-content: center;
    gap: var(--space-4);
  }

  .game-actions {
    width: 100%;
  }

  .game-actions .btn {
    width: 100%;
  }

  .game-card-skeleton {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
}
</style>
