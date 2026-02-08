<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-text">HoopRepublic</span>
          </div>
          <p class="footer-tagline">
            Connecting basketball players across London.
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} HoopRepublic. All rights reserved.</p>
        <p>Made with 🧡 in London</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--gray-900);
  color: white;
  padding: var(--space-12) 0 var(--space-8);
  margin-top: var(--space-24);
}

.footer-content {
  text-align: center;
  margin-bottom: var(--space-8);
}


.footer-brand .logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
}

.footer-brand .logo-text {
  color: white;
}

.footer-tagline {
  color: var(--gray-400);
  line-height: 1.7;
  max-width: 400px;
  margin: 0 auto;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-8);
  border-top: 1px solid var(--gray-800);
  color: var(--gray-500);
  font-size: 0.875rem;
}

@media (max-width: 640px) {
  .footer-bottom {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
}
</style>
