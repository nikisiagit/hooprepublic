<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero illustration-bg">
      <div class="container hero-content">
        <div class="hero-text animate-fade-in">
          <span class="badge badge-primary">🏀 London's Basketball Community</span>
          <h1>Find Your Court.<br/>Play Your Game.</h1>
          <p class="hero-description">
            Connect with basketball players across London. Book courts, join open games, 
            and become part of the community.
          </p>
          
          <div class="hero-cta">
            <NuxtLink to="/courts" class="btn btn-primary btn-lg">
              Find Courts
            </NuxtLink>
            <NuxtLink to="/games" class="btn btn-secondary btn-lg">
              View Open Games
            </NuxtLink>
          </div>
        </div>

        <div class="hero-visual animate-slide-in">
          <img src="/images/hero-illustration.png" alt="Basketball Player Illustration" class="hero-illustration" />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2>How It Works</h2>
          <p>Get on the court in three simple steps</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <h3>Find a Court</h3>
            <p>Browse courts across London by location, type, and availability. Filter by indoor/outdoor.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3>Book Your Slot</h3>
            <p>Choose your preferred time and book instantly. Organize private runs or join public ones.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>Play Together</h3>
            <p>Join open games, meet new players, and build your basketball community.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <h2>Ready to Hit the Court?</h2>
            <p>Join HoopRepublic today.</p>
            <div class="cta-actions">
              <NuxtLink to="/auth/signup" class="btn btn-secondary btn-lg">Create Free Account</NuxtLink>
              <NuxtLink to="/courts" class="btn btn-outline-white btn-lg">Browse Courts</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Hero Section */
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  background-color: var(--white);
}

.hero-content {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: var(--space-8);
}

.hero-text {
  max-width: 600px;
}

.hero-text .badge {
  margin-bottom: var(--space-6);
  background: var(--gray-100);
  color: var(--black);
  border: 1px solid var(--gray-200);
}

.hero-text h1 {
  font-size: 4.5rem;
  letter-spacing: -0.03em;
  margin-bottom: var(--space-6);
}

.hero-description {
  font-size: 1.25rem;
  color: var(--gray-600);
  font-weight: 400;
  max-width: 480px;
  margin-bottom: var(--space-10);
}

.hero-cta {
  display: flex;
  gap: var(--space-4);
  align-items: center;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-illustration {
  max-width: 100%;
  height: auto;
}

/* Features Section */
.features {
  padding: var(--space-24) 0;
  background: var(--white);
  border-top: 1px solid var(--gray-100);
}

.section-header {
  margin-bottom: var(--space-16);
}

.section-header h2 {
  font-size: 3rem;
  margin-bottom: var(--space-4);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-12);
}

.feature-card {
  padding: var(--space-8);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-2xl);
  transition: all var(--transition-base);
}

.feature-card:hover {
  border-color: var(--black);
  transform: translateY(-4px);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: var(--space-6);
  color: var(--black);
  background: var(--gray-50);
  border-radius: var(--radius-full);
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: var(--space-3);
}

.feature-card p {
  color: var(--gray-600);
}

/* CTA Section */
.cta {
  padding: var(--space-16) 0 var(--space-20);
}

.cta-card {
  background: var(--black);
  border-radius: var(--radius-2xl);
  padding: var(--space-20) var(--space-12);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cta-content h2 {
  color: var(--white);
  font-size: 3.5rem;
  margin-bottom: var(--space-4);
}

.cta-content p {
  color: var(--gray-400);
  font-size: 1.5rem;
  margin-bottom: var(--space-10);
}

.cta-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
}

.btn-outline-white {
  background: transparent;
  color: var(--white);
  border: 1.5px solid var(--white);
  font-weight: 600;
  border-radius: var(--radius-full);
  padding: var(--space-3) var(--space-6);
  transition: all var(--transition-base);
}

.btn-outline-white:hover {
  background: var(--white);
  color: var(--black);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--space-12);
  }
  
  .hero-text {
    margin: 0 auto;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-cta {
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}

@media (max-width: 768px) {
  .hero-text h1 {
    font-size: 3rem;
  }
  
  .section-header h2 {
    font-size: 2.5rem;
  }

  .cta-content h2 {
    font-size: 2.5rem;
  }
  
  .cta-card {
    padding: var(--space-12) var(--space-6);
  }
  
  .cta-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}
</style>
