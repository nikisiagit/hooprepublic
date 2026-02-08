<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-header">
        <div class="profile-avatar">
          <img v-if="profile?.avatar_url" :src="profile.avatar_url" :alt="profile.name" />
          <span v-else class="avatar-placeholder">{{ initials }}</span>
        </div>
        <div class="profile-info">
          <h1>{{ profile?.name }} {{ profile?.surname }}</h1>
          <p class="profile-email">{{ profile?.email }}</p>
          <div class="profile-badges" v-if="profile?.position || profile?.skill_level">
            <span v-if="profile?.position" class="badge badge-position">
              {{ formatPosition(profile.position) }}
            </span>
            <span v-if="profile?.skill_level" class="badge badge-skill">
              {{ formatSkillLevel(profile.skill_level) }}
            </span>
          </div>
        </div>
        <NuxtLink to="/profile/edit" class="btn-edit">
          ✏️ Edit Profile
        </NuxtLink>
      </div>

      <div class="profile-content">
        <div class="profile-section">
          <h2>Player Details</h2>
          <div class="details-grid">
            <div class="detail-item">
              <span class="detail-label">Position</span>
              <span class="detail-value">{{ formatPosition(profile?.position) || 'Not set' }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Skill Level</span>
              <span class="detail-value">{{ formatSkillLevel(profile?.skill_level) || 'Not set' }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Member Since</span>
              <span class="detail-value">{{ formatDate(profile?.created_at) }}</span>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h2>Preferred Days</h2>
          <div class="tags-list" v-if="profile?.preferred_days?.length">
            <span v-for="day in profile.preferred_days" :key="day" class="tag">
              {{ formatDay(day) }}
            </span>
          </div>
          <p v-else class="empty-state">No preferred days set</p>
        </div>

        <div class="profile-section">
          <h2>Preferred Areas</h2>
          <div class="tags-list" v-if="profile?.preferred_areas?.length">
            <span v-for="area in profile.preferred_areas" :key="area" class="tag">
              {{ formatArea(area) }}
            </span>
          </div>
          <p v-else class="empty-state">No preferred areas set</p>
        </div>

        <div class="profile-section">
          <h2>Stats</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <span class="stat-value">{{ profile?.games_played || 0 }}</span>
              <span class="stat-label">Games Played</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">{{ profile?.reviews_count || 0 }}</span>
              <span class="stat-label">Reviews</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">{{ profile?.courts_suggested || 0 }}</span>
              <span class="stat-label">Courts Suggested</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Profile {
  id: string
  name: string
  surname: string
  email: string
  avatar_url: string | null
  position: string | null
  skill_level: string | null
  preferred_days: string[]
  preferred_areas: string[]
  created_at: string
  games_played?: number
  reviews_count?: number
  courts_suggested?: number
}

const { data: profile, pending, error } = await useFetch<Profile>('/api/profile')

const initials = computed(() => {
  if (!profile.value) return '?'
  const first = profile.value.name?.[0] || ''
  const last = profile.value.surname?.[0] || ''
  return (first + last).toUpperCase()
})

const formatPosition = (pos: string | null | undefined) => {
  const positions: Record<string, string> = {
    point_guard: 'Point Guard',
    shooting_guard: 'Shooting Guard',
    small_forward: 'Small Forward',
    power_forward: 'Power Forward',
    center: 'Center'
  }
  return pos ? positions[pos] || pos : null
}

const formatSkillLevel = (level: string | null | undefined) => {
  const levels: Record<string, string> = {
    d5_rookie: 'Rookie (D5)',
    d4_rec: 'Rec (D4)',
    d3_inter: 'Inter (D3)',
    d2_comp: 'Comp (D2)',
    d1_elite: 'Elite (D1)'
  }
  return level ? levels[level] || level : null
}

const formatDay = (day: string) => {
  const days: Record<string, string> = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
    flexible: 'Flexible'
  }
  return days[day] || day
}

const formatArea = (area: string) => {
  const areas: Record<string, string> = {
    central: 'Central',
    west: 'West',
    south_west: 'South West',
    south: 'South',
    east: 'East',
    north: 'North',
    north_west: 'North West',
    south_east: 'South East',
    north_east: 'North East',
    flexible: 'Flexible'
  }
  return areas[area] || area
}

const formatDate = (date: string | undefined) => {
  if (!date) return 'Unknown'
  return new Date(date).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
.profile-page {
  padding: var(--space-8) 0;
  min-height: calc(100vh - 80px);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-8);
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-200);
  margin-bottom: var(--space-8);
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  overflow: hidden;
  background: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
}

.profile-info {
  flex: 1;
}

.profile-info h1 {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--black);
  margin-bottom: var(--space-1);
}

.profile-email {
  color: var(--gray-500);
  margin-bottom: var(--space-3);
}

.profile-badges {
  display: flex;
  gap: var(--space-2);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.813rem;
  font-weight: 600;
}

.badge-position {
  background: var(--black);
  color: var(--white);
}

.badge-skill {
  background: var(--gray-100);
  color: var(--gray-700);
}

.btn-edit {
  padding: var(--space-2) var(--space-4);
  background: var(--white);
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius-full);
  color: var(--black);
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.btn-edit:hover {
  background: var(--gray-50);
  border-color: var(--black);
}

.profile-content {
  display: grid;
  gap: var(--space-6);
}

.profile-section {
  background: white;
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  border: 1px solid var(--gray-200);
}

.profile-section h2 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--gray-100);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.detail-label {
  font-size: 0.813rem;
  color: var(--gray-500);
  font-weight: 500;
}

.detail-value {
  font-weight: 600;
  color: var(--black);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag {
  padding: var(--space-2) var(--space-3);
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  color: var(--gray-700);
}

.empty-state {
  color: var(--gray-400);
  font-style: italic;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.stat-card {
  text-align: center;
  padding: var(--space-4);
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--black);
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: 0.813rem;
  color: var(--gray-500);
  font-weight: 500;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-badges {
    justify-content: center;
  }

  .details-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
