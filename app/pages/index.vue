<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
      </div>
      
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Find Courts
            </NuxtLink>
            <NuxtLink to="/games" class="btn btn-secondary btn-lg">
              View Open Games
            </NuxtLink>
          </div>
        </div>

        <div class="hero-visual animate-fade-in" style="animation-delay: 0.2s">
          <div class="hero-card glass">
            <div class="hero-card-header">
              <span class="badge badge-success">Available Now</span>
              <span class="court-price">£12/hr</span>
            </div>
            <div class="hero-card-body">
              <h3>Queen Elizabeth Olympic Park</h3>
              <p>Stratford, E20</p>
              <div class="court-tags">
                <span class="tag">🏟️ Indoor</span>
                <span class="tag">💡 Lit</span>
                <span class="tag">🌟 Pro Court</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-scroll">
        <span>Scroll to explore</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14m-7-7l7 7 7-7"/>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2>How It <span class="gradient-text">Works</span></h2>
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
            <p>Browse courts across London by location, type, and availability. Filter by indoor/outdoor, price, and amenities.</p>
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
            <p>Choose your preferred time and book instantly. Pick whether to play privately or open it up for others to join.</p>
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
            <p>Join open games, meet new players, and build your basketball community. From pickup to competitive 5v5.</p>
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
            <p>Join HoopRepublic today and connect with London's basketball community.</p>
            <div class="cta-actions">
              <button class="btn btn-primary btn-lg">Create Free Account</button>
              <NuxtLink to="/courts" class="btn btn-secondary btn-lg">Browse Courts</NuxtLink>
            </div>
          </div>
          <div class="cta-visual">
            <span class="cta-emoji">🏀</span>
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
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    var(--primary-50) 0%, 
    white 40%, 
    var(--accent-50) 100%
  );
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--gray-200) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.5;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.hero-text {
  max-width: 560px;
}

.hero-text .badge {
  margin-bottom: var(--space-6);
}

.hero-text h1 {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--space-6);
  color: var(--gray-900);
}

.hero-description {
  font-size: 1.25rem;
  color: var(--gray-600);
  line-height: 1.7;
  margin-bottom: var(--space-8);
}

.hero-cta {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.hero-card {
  width: 340px;
  padding: var(--space-6);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
}

.hero-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.court-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-600);
}

.hero-card-body h3 {
  font-size: 1.25rem;
  margin-bottom: var(--space-1);
}

.hero-card-body p {
  color: var(--gray-500);
  margin-bottom: var(--space-4);
}

.court-tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  font-size: 0.75rem;
  background: var(--gray-100);
  border-radius: var(--radius-full);
  color: var(--gray-600);
}

.hero-scroll {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  color: var(--gray-400);
  font-size: 0.875rem;
  animation: bounce 2s infinite;
}

/* Features Section */
.features {
  padding: var(--space-24) 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: var(--space-4);
}

.section-header p {
  font-size: 1.25rem;
  color: var(--gray-500);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

.feature-card {
  text-align: center;
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  background: var(--gray-50);
  transition: all var(--transition-base);
}

.feature-card:hover {
  background: white;
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, var(--primary-100), var(--primary-50));
  color: var(--primary-600);
  margin-bottom: var(--space-6);
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: var(--space-3);
}

.feature-card p {
  color: var(--gray-500);
  line-height: 1.7;
}

/* CTA Section */
.cta {
  padding: var(--space-16) 0 var(--space-24);
}

.cta-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-16);
  background: linear-gradient(135deg, var(--gray-900), var(--gray-800));
  border-radius: var(--radius-2xl);
  overflow: hidden;
  position: relative;
}

.cta-content {
  max-width: 500px;
}

.cta-content h2 {
  font-size: 2.25rem;
  color: white;
  margin-bottom: var(--space-4);
}

.cta-content p {
  font-size: 1.125rem;
  color: var(--gray-400);
  margin-bottom: var(--space-8);
}

.cta-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.cta-visual {
  font-size: 8rem;
  opacity: 0.2;
}

.cta-emoji {
  filter: grayscale(1);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-text {
    max-width: 100%;
  }

  .hero-text h1 {
    font-size: 3rem;
  }

  .hero-cta {
    justify-content: center;
  }

  .hero-visual {
    display: none;
  }

  .features-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 120px 0 80px;
  }

  .hero-text h1 {
    font-size: 2.25rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-scroll {
    display: none;
  }

  .cta-card {
    flex-direction: column;
    text-align: center;
    padding: var(--space-10) var(--space-6);
  }

  .cta-visual {
    display: none;
  }

  .cta-actions {
    justify-content: center;
  }
}
</style>
