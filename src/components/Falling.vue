<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  opacity: number
  rotation: number
  rotSpeed: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number
let particles: Particle[] = []

const PARTICLE_COUNT = 35 // Adjust quantity (30-50 works best)

const createParticle = (width: number, height: number, isInitial = false): Particle => {
  return {
    x: Math.random() * width,
    y: isInitial ? Math.random() * height : -20,
    size: Math.random() * 4 + 2, // particle size
    speedY: Math.random() * 1.2 + 0.3, // fall speed
    speedX: (Math.random() - 0.5) * 0.4, // subtle horizontal drift
    opacity: Math.random() * 0.4 + 0.1,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 2
  }
}

const initParticles = (width: number, height: number) => {
  particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height, true))
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((p) => {
    // Update position
    p.y += p.speedY
    p.x += p.speedX
    p.rotation += p.rotSpeed

    // Reset particle when it falls past screen bottom
    if (p.y > canvas.height + 20) {
      Object.assign(p, createParticle(canvas.width, canvas.height, false))
    }

    // Render debris fragment
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate((p.rotation * Math.PI) / 180)
    ctx.fillStyle = `rgba(184, 255, 87, ${p.opacity})` // Uses portfolio accent color (#b8ff57)
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
    ctx.restore()
  })

  animationFrameId = requestAnimationFrame(draw)
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initParticles(canvas.width, canvas.height)
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  draw()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <canvas ref="canvasRef" class="falling-debris-canvas" />
</template>

<style scoped>
.falling-debris-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* Allows user clicks to pass through to portfolio content */
  z-index: 1; /* Sits behind text and cards */
}
</style>