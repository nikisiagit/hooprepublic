<template>
  <div class="map-container">
    <l-map 
      ref="map" 
      v-model:zoom="zoom" 
      :center="center" 
      :use-global-leaflet="false"
      class="leaflet-map"
    >
      <!-- Minimal Light Tile Layer (CartoDB Positron) -->
      <l-tile-layer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="CartoDB Positron"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
      />

      <!-- Court Markers using simple circle markers for minimal look -->
      <l-circle-marker
        v-for="court in courts"
        :key="court.id"
        :lat-lng="[court.latitude, court.longitude]"
        v-bind="getMarkerStyle(court.id)"
      >
        <l-popup>
          <div class="map-popup-content">
            <h3>{{ court.name }}</h3>
            <p>{{ court.borough || 'London' }}</p>
            <NuxtLink :to="`/courts/${court.id}`" class="popup-link">
              View Details ->
            </NuxtLink>
          </div>
        </l-popup>
      </l-circle-marker>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LCircleMarker, LPopup } from "@vue-leaflet/vue-leaflet"

// Define props
const props = defineProps<{
  courts: any[]
  activeCourtId?: string | null
}>()

// Map state
const zoom = ref(11)
const center = ref<[number, number]>([51.5074, -0.1278]) // London center

// Marker style helper
const getMarkerStyle = (courtId: string) => {
  const isActive = props.activeCourtId === courtId
  return {
    radius: isActive ? 12 : 8,
    color: isActive ? '#000000' : '#000000',
    fillColor: isActive ? '#000000' : '#000000',
    fillOpacity: isActive ? 1 : 0.6,
    weight: isActive ? 3 : 1
  }
}

// Optional: Fit bounds logic can be added here
</script>

<style scoped>
.map-container {
  height: 600px; /* robust height */
  width: 100%;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--gray-200);
  z-index: 1; /* ensure map stays below sticky filters if needed, but above background */
}

/* Fix popup styles globally or locally */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 0;
  overflow: hidden;
}

:deep(.leaflet-popup-content) {
  margin: 0;
  padding: var(--space-4);
  font-family: var(--font-sans);
}

.map-popup-content h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: var(--space-1);
  color: var(--black);
}

.map-popup-content p {
  font-size: 0.875rem;
  color: var(--gray-500);
  margin-bottom: var(--space-2);
}

.popup-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--black);
  text-decoration: none;
}

.popup-link:hover {
  text-decoration: underline;
}
</style>
