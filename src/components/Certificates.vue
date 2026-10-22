<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Certificate {
  number: string
  title: string
  issuer: string
  image: string
}

const certificates: Certificate[] = [
  {
    number: '01',
    title: 'Regional ITE Summit',
    issuer: 'St. Paul University of the Philippines',
    image: new URL('../public/csc.png', import.meta.url).href,
  },
  {
    number: '02',
    title: 'Civil Service Eligible',
    issuer: 'Civil Service Commission',
    image:  new URL('../public/Dayag.png', import.meta.url).href,
  },
  {
    number: '03',
    title: 'Safety Officer 1 (SO1)',
    issuer: 'DOLE Accredited',
    image:  new URL('../public/SO1.png', import.meta.url).href,
  },
  {
    number: '04',
    title: 'International Conference',
    issuer: 'Cagayan State University',
    image: new URL('../public/sem.png', import.meta.url).href,
  }
]

const currentIndex = ref(0)
const isModalOpen = ref(false)

const currentCert = computed<Certificate>(() => {
  return certificates[currentIndex.value] ?? certificates[0] ?? {
    number: '00',
    title: '',
    issuer: '',
    image: '',
  }
})

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % certificates.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + certificates.length) % certificates.length
}

const setSlide = (index: number) => {
  currentIndex.value = index
}

// Modal controls
const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Keyboard controls (Esc to close modal, Left/Right arrows for carousel)
const handleKeydown = (event: KeyboardEvent) => {
  if (isModalOpen.value) {
    if (event.key === 'Escape') closeModal()
  } else {
    if (event.key === 'ArrowRight') nextSlide()
    if (event.key === 'ArrowLeft') prevSlide()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <section id="certificates" class="section certificates-section">
    <p class="eyebrow"> CERTIFICATES</p>

    <h2> Certificates & Achievements<span> </span></h2>

    <div class="carousel-container">
      <!-- Previous Button -->
      <button class="nav-btn prev-btn" @click="prevSlide" aria-label="Previous certificate">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <!-- Carousel Track -->
      <div class="carousel-track">
        <div
            v-for="(cert, index) in certificates"
            :key="cert.number || index"
            class="carousel-slide"
            :class="{
            'active': index === currentIndex,
            'prev': index === (currentIndex - 1 + certificates.length) % certificates.length,
            'next': index === (currentIndex + 1) % certificates.length
          }"
        >
          <div
              class="certificate-card"
              @click="index === currentIndex && openModal()"
              :title="index === currentIndex ? 'Click to view full certificate' : ''"
          >
            <img :src="cert.image" :alt="cert.title" class="certificate-image" />
            <div class="view-overlay" v-if="index === currentIndex">
              <span class="view-badge">🔍 Click to Expand</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Next Button -->
      <button class="nav-btn next-btn" @click="nextSlide" aria-label="Next certificate">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>

    <!-- Caption Info -->
    <div class="caption">
      <span class="number">{{ currentCert.number }} — </span>
      <span class="title">{{ currentCert.title }}</span>
      <span v-if="currentCert.issuer" class="divider">•</span>
      <span v-if="currentCert.issuer" class="issuer">{{ currentCert.issuer }}</span>
    </div>

    <!-- Pagination Dots -->
    <div class="dots-container">
      <button
          v-for="(cert, index) in certificates"
          :key="index"
          class="dot"
          :class="{ 'active': index === currentIndex }"
          @click="setSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>

    <!-- Fullscreen Lightbox Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isModalOpen" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-content">
            <button class="close-btn" @click="closeModal" aria-label="Close modal">✕</button>
            <img :src="currentCert.image" :alt="currentCert.title" class="modal-image" />
            <div class="modal-caption">
              <h3>{{ currentCert.title }}</h3>
              <p v-if="currentCert.issuer">{{ currentCert.issuer }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.section {
  padding: 120px 10%;
  background:
      radial-gradient(
          circle at 85% 30%,
          rgba(56, 189, 248, 0.08) 0%,
          transparent 50%
      ),
      radial-gradient(
          circle at 15% 70%,
          rgba(184, 255, 87, 0.06) 0%,
          transparent 50%
      ),
      #0d0f14;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

.eyebrow {
  font-size: 11px;
  letter-spacing: 3px;
  color: #b8ff57;
  font-weight: 700;
  margin-bottom: 35px;
  text-shadow: 0 0 8px rgba(184, 255, 87, 0.3);
  text-align: left;
  width: 100%;
}

h2 {
  font-size: clamp(45px, 7vw, 90px);
  letter-spacing: -3px;
  margin: 0 0 65px;
  color: #ffffff;
  font-family: Impact, 'Arial Narrow', sans-serif;
  text-transform: uppercase;
  text-align: left;
  width: 100%;
}

h2 span {
  font-family: Georgia, serif;
  font-weight: 400;
  font-style: italic;
  color: #b8ff57;
  text-transform: none;
  letter-spacing: -1px;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.carousel-track {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
}

.carousel-slide {
  position: absolute;
  width: 60%;
  max-width: 650px;
  height: 400px;
  opacity: 0;
  pointer-events: none;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease;
  z-index: 1;
}

.carousel-slide.active {
  opacity: 1;
  pointer-events: auto;
  transform: translate3d(0, 0, 0) scale(1);
  z-index: 3;
}

.carousel-slide.prev {
  opacity: 0.25;
  transform: translate3d(-60%, 0, -150px) scale(0.85);
  pointer-events: none;
  z-index: 2;
}

.carousel-slide.next {
  opacity: 0.25;
  transform: translate3d(60%, 0, -150px) scale(0.85);
  pointer-events: none;
  z-index: 2;
}

.certificate-card {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease;
}

.active .certificate-card:hover {
  border-color: #b8ff57;
  transform: scale(1.02);
  box-shadow: 0 0 35px rgba(184, 255, 87, 0.3), 0 20px 50px rgba(0, 0, 0, 0.6);
}

.active .certificate-card {
  border-color: rgba(184, 255, 87, 0.4);
  box-shadow: 0 0 30px rgba(184, 255, 87, 0.15), 0 20px 50px rgba(0, 0, 0, 0.5);
}

.certificate-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.view-overlay {
  position: absolute;
  inset: 0;
  background: rgba(13, 15, 20, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
}

.active .certificate-card:hover .view-overlay {
  opacity: 1;
}

.view-badge {
  color: #0d0f14;
  background: #b8ff57;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 8px 16px;
  border-radius: 20px;
  letter-spacing: 1px;
  box-shadow: 0 0 15px rgba(184, 255, 87, 0.5);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(13, 15, 20, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #b8ff57;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
}

.nav-btn svg {
  width: 20px;
  height: 20px;
}

.nav-btn:hover {
  background: #b8ff57;
  color: #0d0f14;
  border-color: #b8ff57;
  box-shadow: 0 0 15px rgba(184, 255, 87, 0.4);
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

.caption {
  font-size: 16px;
  color: #e1e1e1;
  margin-bottom: 25px;
  transition: opacity 0.3s ease;
}

.caption .number {
  color: #b8ff57;
  font-weight: 700;
}

.caption .title {
  font-weight: 500;
}

.caption .divider {
  margin: 0 10px;
  opacity: 0.5;
}

.caption .issuer {
  opacity: 0.7;
}

.dots-container {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.dot:hover {
  background: rgba(184, 255, 87, 0.6);
}

.dot.active {
  background: #b8ff57;
  transform: scale(1.35);
  box-shadow: 0 0 8px rgba(184, 255, 87, 0.5);
}

/* Lightbox Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 12, 16, 0.92);
  backdrop-filter: blur(12px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-image {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid rgba(184, 255, 87, 0.4);
  box-shadow: 0 0 40px rgba(184, 255, 87, 0.2);
}

.close-btn {
  position: absolute;
  top: -45px;
  right: -10px;
  background: transparent;
  border: none;
  color: #b8ff57;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.2);
}

.modal-caption {
  margin-top: 1rem;
  text-align: center;
  color: #ffffff;
}

.modal-caption h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #b8ff57;
}

.modal-caption p {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .section {
    padding: 80px 7%;
  }

  .carousel-container {
    height: 350px;
  }

  .carousel-slide {
    width: 80%;
    height: 280px;
  }

  .carousel-slide.prev,
  .carousel-slide.next {
    display: none;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
  }

  .prev-btn {
    left: 5px;
  }

  .next-btn {
    right: 5px;
  }

  .caption {
    font-size: 14px;
  }
}
</style>