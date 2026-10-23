<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  value: string // Holds either '0' or '1'
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

const PARTICLE_COUNT = 90 // Density of binary particles

const createParticle = (width: number, height: number, isInitial = false): Particle => {
  return {
    x: Math.random() * width,
    y: isInitial ? Math.random() * height : -20,
    value: Math.random() > 0.5 ? '1' : '0', // Randomly assign 0 or 1
    size: Math.floor(Math.random() * 8 + 12), // Font size in px (12px - 20px)
    speedY: Math.random() * 1.6 + 0.5, // Fall speed
    speedX: (Math.random() - 0.5) * 0.4, // Gentle horizontal drift
    opacity: Math.random() * 0.5 + 0.2, // Glowing opacity
    rotation: (Math.random() - 0.5) * 20, // Subtle angle tilt
    rotSpeed: (Math.random() - 0.5) * 0.5
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
    p.y += p.speedY
    p.x += p.speedX
    p.rotation += p.rotSpeed

    // Reset particle when it falls past the bottom of the screen
    if (p.y > canvas.height + 30) {
      Object.assign(p, createParticle(canvas.width, canvas.height, false))
    }

    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate((p.rotation * Math.PI) / 180)

    // Style and render binary text
    ctx.font = `700 ${p.size}px "Courier New", Courier, monospace`
    ctx.fillStyle = `rgba(184, 255, 87, ${p.opacity})` // Matrix green accent (#b8ff57)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Subtle glow effect for digital matrix look
    ctx.shadowColor = '#b8ff57'
    ctx.shadowBlur = 6

    ctx.fillText(p.value, 0, 0)
    ctx.restore()
  })

  animationFrameId = requestAnimationFrame(draw)
}

const handleResize = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr

  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
  }

  initParticles(window.innerWidth, window.innerHeight)
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
  pointer-events: none;
  z-index: 1;
}
</style>