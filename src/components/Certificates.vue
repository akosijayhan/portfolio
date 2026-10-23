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
    image: './Dayag.png',
  },
  {
    number: '02',
    title: 'Civil Service Eligible',
    issuer: 'Civil Service Commission',
    image: './csc.jpg',
  },
  {
    number: '03',
    title: 'Safety Officer 1 (SO1)',
    issuer: 'DOLE Accredited',
    image: './SO1.png',
  },
  {
    number: '04',
    title: 'International Conference',
    issuer: 'Cagayan State University',
    image: './sem.png',
  },
]

const currentIndex = ref(0)
const isModalOpen = ref(false)
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

// Canvas Particle System
let nodes: Node[] = []
const NODE_COUNT = 30
const CONNECT_DISTANCE = 130

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const parent = canvas.parentElement
  canvas.width = parent ? parent.offsetWidth : window.innerWidth
  canvas.height = parent ? parent.offsetHeight : 800

  nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.2,
    vy: (Math.random() - 0.5) * 1.2,
    radius: Math.random() * 2.5 + 1.5,
  }))
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < nodes.length; i++) {
    const nodeA = nodes[i]
    if (!nodeA) continue

    for (let j = i + 1; j < nodes.length; j++) {
      const nodeB = nodes[j]
      if (!nodeB) continue

      // Fixed: Restored missing subtraction operators
      const dx = nodeA.x - nodeB.x
      const dy = nodeA.y - nodeB.y
      // Fixed: Restored distance formula math operators
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < CONNECT_DISTANCE) {
        // Fixed: Restored opacity falloff formula
        const opacity = (1 - dist / CONNECT_DISTANCE) * 0.3
        ctx.strokeStyle = `rgba(184, 255, 87, ${opacity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(nodeA.x, nodeA.y)
        ctx.lineTo(nodeB.x, nodeB.y)
        ctx.stroke()
      }
    }
  }

  nodes.forEach((node) => {
    node.x += node.vx
    node.y += node.vy

    if (node.x < 0 || node.x > canvas.width) node.vx *= -1
    if (node.y < 0 || node.y > canvas.height) node.vy *= -1

    ctx.fillStyle = '#b8ff57'
    ctx.shadowColor = '#b8ff57'
    ctx.shadowBlur = 8
    ctx.beginPath()
    // Fixed: Restored multiplication operator in arc formula
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
  })

  animationFrameId = requestAnimationFrame(draw)
}

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
  // Fixed: Restored subtraction operator in previous slide index calculation
  currentIndex.value = (currentIndex.value - 1 + certificates.length) % certificates.length
}

const setSlide = (index: number) => {
  currentIndex.value = index
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleKeydown = (event: KeyboardEvent) => {
  if (isModalOpen.value) {
    if (event.key === 'Escape') closeModal()
  } else {
    if (event.key === 'ArrowRight') nextSlide()
    if (event.key === 'ArrowLeft') prevSlide()
  }
}

const handleResize = () => {
  initCanvas()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  initCanvas()
  window.addEventListener('resize', handleResize)
  draw()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <section id="certificates" class="section certificates-section">
    <!-- Moving Circuit Canvas Background -->
    <canvas ref="canvasRef" class="bg-canvas" />

    <!-- Ambient Glow Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <div class="content-container">
      <p class="eyebrow">04 — CERTIFICATES</p>

      <h2>Certificates <span>& awards.</span></h2>

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
              // Fixed: Restored subtraction operator in class bindings
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
  position: relative;
  padding: 120px 10%;
  background: transparent;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

/* Canvas Background Layer */
.bg-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.85;
}

/* Floating Glow Ambient Background Orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 1;
  animation: floatOrb 12s infinite alternate ease-in-out;
}

.orb-1 {
  width: 380px;
  height: 380px;
  top: 10%;
  right: -5%;
  background: rgba(56, 189, 248, 0.12);
}

.orb-2 {
  width: 420px;
  height: 420px;
  bottom: 10%;
  left: -5%;
  background: rgba(184, 255, 87, 0.08);
  animation-delay: -6s;
}

@keyframes floatOrb {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(50px, 60px) scale(1.15);
  }
}

.content-container {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  backdrop-filter: blur(12px);
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