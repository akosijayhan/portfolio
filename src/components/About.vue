<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}


const educationList = [
  {
    period: '2023 – Present',
    school: 'Cagayan State University – Carig Campus',
    degree: 'Bachelor of Science in Computer Engineering',
  },
  {
    period: '2017 – 2023',
    school: 'Cataggaman National High School',
    degree: 'Senior High School — Humanities and Social Sciences (HUMSS)',
  },
  {
    period: '2012 – 2017',
    school: 'Cataggaman Elementary School',
    degree: 'Elementary Education',
  },
  {
    period: '2010-2011',
    school: 'Cataggaman Viejo Daycare Center',
    degree: 'Basic Education',
  },
]

const hobbies = [
  { icon: '🏀', label: 'Basketball' },
  { icon: '🎮', label: 'Mobile Gaming' },
  { icon: '✈️', label: 'Travel & Exploration' },
  { icon: '🥂', label: 'Inuman' },
  { icon: '🌿', label: 'Nature & Outdoor Adventures' },


]
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

      const dx = nodeA.x - nodeB.x
      const dy = nodeA.y - nodeB.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < CONNECT_DISTANCE) {
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
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
  })

  animationFrameId = requestAnimationFrame(draw)
}

const handleResize = () => {
  initCanvas()
}

onMounted(() => {
  initCanvas()
  window.addEventListener('resize', handleResize)
  draw()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <section id="about" class="section about">
    <!-- Moving Circuit Canvas Background -->
    <canvas ref="canvasRef" class="bg-canvas" />

    <!-- Ambient Glowing Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <div class="content-container">
      <p class="eyebrow">ABOUT ME</p>

      <h2>
        Engineering ideas
        <span>into reality.</span>
      </h2>

      <div class="about-grid">
        <!-- Bio Content -->
        <div class="about-content">
          <p class="bio-lead">
            I'm <strong class="highlight">Jayhan B. Dayag</strong>, a 21-year-old Computer Engineering student born and raised in <strong class="highlight">Tuguegarao City, Cagayan</strong>.
          </p>

          <p>
            I enjoy turning ideas into functional, user-friendly digital experiences. I'm always eager to explore new technologies, refine my skills, and build meaningful solutions that address real-world challenges.
          </p>

          <!-- Hobbies & Personal Interests -->
          <div class="hobbies-container">
            <h3 class="sub-heading">When I'm Not Studying</h3>
            <div class="hobby-tags">
              <span v-for="hobby in hobbies" :key="hobby.label" class="hobby-card">
                <span class="icon">{{ hobby.icon }}</span>
                <span class="label">{{ hobby.label }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Education Section -->
        <div class="education-container">
          <h3 class="education-heading">Education</h3>

          <div class="education-list">
            <div
                v-for="(item, index) in educationList"
                :key="index"
                class="education-card"
            >
              <span class="period">{{ item.period }}</span>
              <h4 class="school">{{ item.school }}</h4>
              <p class="degree">{{ item.degree }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  position: relative;
  padding: 120px 10%;
  background: #0d0f14;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

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

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 1;
  animation: floatOrb 12s infinite alternate ease-in-out;
}

.orb-1 {
  width: 350px;
  height: 350px;
  top: 5%;
  left: -5%;
  background: rgba(56, 189, 248, 0.15);
}

.orb-2 {
  width: 400px;
  height: 400px;
  bottom: 5%;
  right: -5%;
  background: rgba(184, 255, 87, 0.1);
  animation-delay: -6s;
}

@keyframes floatOrb {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(50px, 60px) scale(1.15); }
}

.content-container {
  position: relative;
  z-index: 2;
}

.eyebrow {
  font-size: 11px;
  letter-spacing: 3px;
  color: #b8ff57;
  font-weight: 700;
  margin-bottom: 35px;
  text-shadow: 0 0 8px rgba(184, 255, 87, 0.3);
}

h2 {
  font-size: clamp(42px, 7vw, 90px);
  line-height: 0.98;
  letter-spacing: -3px;
  margin: 0 0 55px;
  color: #ffffff;
  font-family: Impact, 'Arial Narrow', sans-serif;
  text-transform: uppercase;
}

h2 span {
  display: block;
  color: #b8ff57;
  font-family: Georgia, serif;
  font-weight: 400;
  font-style: italic;
  text-transform: none;
  letter-spacing: -1px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.about-content p {
  font-size: 17px;
  line-height: 1.8;
  color: #d1d5db;
  margin-bottom: 1.25rem;
}

.bio-lead {
  font-size: 19px !important;
  color: #ffffff !important;
}

.highlight {
  color: #b8ff57;
  font-weight: 700;
}

/* Hobbies Styling */
.hobbies-container {
  margin-top: 35px;
}

.sub-heading {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #b8ff57;
  margin-bottom: 16px;
  font-weight: 700;
  font-family: 'Courier New', Courier, monospace;
}

.hobby-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hobby-card {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  font-size: 13px;
  color: #e1e1e1;
  transition: all 0.3s ease;
}

.hobby-card:hover {
  background: rgba(184, 255, 87, 0.08);
  border-color: #b8ff57;
  color: #b8ff57;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(184, 255, 87, 0.2);
}

.hobby-card .icon {
  font-size: 14px;
}

.education-heading {
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #b8ff57;
  margin-bottom: 25px;
  font-weight: 700;
}

.education-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.education-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid #b8ff57;
  border-radius: 6px;
  padding: 18px 22px;
  transition: all 0.3s ease;
}

.education-card:hover {
  background: rgba(184, 255, 87, 0.06);
  border-color: rgba(184, 255, 87, 0.4);
  box-shadow: 0 0 25px rgba(184, 255, 87, 0.18);
  transform: translateX(6px);
}

.period {
  font-size: 11px;
  color: #b8ff57;
  font-weight: 700;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 6px;
}

.school {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 4px;
}

.degree {
  font-size: 13px;
  color: #a0a5b5;
  margin: 0;
  font-family: 'SF Pro Display', -apple-system, sans-serif;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 600px) {
  .section {
    padding: 80px 7%;
  }

  h2 {
    letter-spacing: -1.5px;
  }
}
</style>