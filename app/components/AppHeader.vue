<template>
  <header class="header glass">
    <div class="container header-content">
      <NuxtLink to="/" class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28" height="28" class="logo-icon">
          <circle cx="256" cy="256" r="240" fill="#f97316"/>
          <path d="M256 16C123.45 16 16 123.45 16 256s107.45 240 240 240 240-107.45 240-240S388.55 16 256 16z" fill="none" stroke="#fff" stroke-width="24"/>
          <path d="M256 16v480M16 256h480" fill="none" stroke="#fff" stroke-width="24"/>
          <path d="M256 16C123.45 16 16 123.45 16 256" fill="none" stroke="#fff" stroke-width="24"/>
          <path d="M496 256c0-132.55-107.45-240-240-240" fill="none" stroke="#fff" stroke-width="24"/>
          <circle cx="256" cy="256" r="120" fill="none" stroke="#fff" stroke-width="24"/>
        </svg>
        <span class="logo-text">HoopRepublic</span>
      </NuxtLink>

      <nav class="nav">
        <NuxtLink to="/courts" class="nav-link">Find Courts</NuxtLink>
        <NuxtLink to="/games" class="nav-link">Open Games</NuxtLink>
        <NuxtLink v-if="user?.role === 'admin'" to="/admin/courts" class="nav-link nav-link-admin">Admin</NuxtLink>
      </nav>

      <div class="header-actions">
        <template v-if="!user">
          <NuxtLink to="/auth/signin" class="btn btn-secondary">Sign In</NuxtLink>
          <NuxtLink to="/auth/signup" class="btn btn-primary">Get Started</NuxtLink>
        </template>
        <template v-else>
          <div class="user-menu" @click="toggleUserMenu" v-click-outside="closeUserMenu">
            <div class="user-avatar">
              <img v-if="user.avatar_url" :src="user.avatar_url" :alt="user.name" />
              <span v-else>{{ userInitials }}</span>
            </div>
            <span class="user-name">{{ user.name }}</span>
            <span class="chevron">▼</span>
            
            <div class="dropdown-menu" :class="{ open: userMenuOpen }">
              <NuxtLink to="/profile" class="dropdown-item" @click="closeUserMenu">
                👤 My Profile
              </NuxtLink>
              <NuxtLink v-if="user.role === 'admin'" to="/admin/courts" class="dropdown-item" @click="closeUserMenu">
                ⚙️ Admin
              </NuxtLink>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" @click="handleLogout">
                🚪 Sign Out
              </button>
            </div>
          </div>
        </template>
      </div>

      <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span class="hamburger" :class="{ active: mobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ open: mobileMenuOpen }">
      <nav class="mobile-nav">
        <NuxtLink to="/courts" class="mobile-nav-link" @click="closeMobileMenu">Find Courts</NuxtLink>
        <NuxtLink to="/games" class="mobile-nav-link" @click="closeMobileMenu">Open Games</NuxtLink>
        <template v-if="user">
          <NuxtLink to="/profile" class="mobile-nav-link" @click="closeMobileMenu">My Profile</NuxtLink>
          <NuxtLink v-if="user.role === 'admin'" to="/admin/courts" class="mobile-nav-link" @click="closeMobileMenu">Admin</NuxtLink>
        </template>
        <div class="mobile-actions">
          <template v-if="!user">
            <NuxtLink to="/auth/signin" class="btn btn-secondary" style="width: 100%" @click="closeMobileMenu">Sign In</NuxtLink>
            <NuxtLink to="/auth/signup" class="btn btn-primary" style="width: 100%" @click="closeMobileMenu">Get Started</NuxtLink>
          </template>
          <button v-else class="btn btn-secondary" style="width: 100%" @click="handleLogout">Sign Out</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const router = useRouter()
const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)

// Use global user state
const { user, logout, fetchUser } = useUser()

// Fetch user on mount if not present
onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
})

const userInitials = computed(() => {
  if (!user.value) return ''
  const first = user.value.name?.[0] || ''
  const last = user.value.surname?.[0] || ''
  return (first + last).toUpperCase() || first.toUpperCase()
})

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const closeUserMenu = () => {
  userMenuOpen.value = false
}

const handleLogout = async () => {
  await logout()
  closeMobileMenu()
  closeUserMenu()
}

// Click outside directive
const vClickOutside = {
  mounted(el: any, binding: any) {
    el._clickOutside = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el._clickOutside)
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--space-4) 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}

.logo {
  display: flex;
  align-items: center;
}

.logo-icon {
  margin-right: var(--space-2);
}

.logo-text {
  font-size: 1.375rem;
  font-weight: 900;
  color: var(--black);
  letter-spacing: -0.02em;
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.nav-link {
  font-weight: 500;
  font-size: 0.9375rem;
  color: var(--gray-500);
  transition: color var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--black);
}

.nav-link.router-link-active {
  color: var(--black);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-500);
  border-radius: 2px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  position: relative;
  padding: var(--space-2);
  border-radius: var(--radius-lg);
  transition: background var(--transition-fast);
}

.user-menu:hover {
  background: var(--gray-100);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--primary-400), var(--primary-600));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-weight: 600;
  font-size: 0.875rem;
  color: white;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-weight: 500;
  color: var(--gray-700);
}

.chevron {
  font-size: 0.625rem;
  color: var(--gray-500);
  transition: transform var(--transition-fast);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--space-2);
  min-width: 180px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--gray-200);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all var(--transition-fast);
  z-index: 50;
}

.dropdown-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  color: var(--gray-700);
  font-size: 0.875rem;
  text-decoration: none;
  transition: background var(--transition-fast);
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background: var(--gray-50);
}

.dropdown-item:first-child {
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}

.dropdown-divider {
  height: 1px;
  background: var(--gray-100);
  margin: var(--space-1) 0;
}

.mobile-menu-btn {
  display: none;
  padding: var(--space-2);
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--gray-700);
  border-radius: 2px;
  transition: all var(--transition-base);
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid var(--gray-200);
  box-shadow: var(--shadow-lg);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all var(--transition-base);
}

.mobile-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.mobile-nav {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.mobile-nav-link {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--gray-700);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--gray-100);
}

.mobile-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

@media (max-width: 768px) {
  .nav,
  .header-actions {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }
}
</style>
