<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { projects as projectData } from '../data/pdata'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

// Active Filter State
const selectedFilter = ref<string>('ALL')

const filterOptions = [
  { label: 'ALL', value: 'ALL' },
  { label: 'HARDWARE / PCB', value: 'HARDWARE' },
  { label: 'EMBEDDED SYSTEMS', value: 'EMBEDDED' },
  { label: 'WEB DEVELOPMENT', value: 'WEB' },
]

// Map project data cleanly with exact category grouping
const projects = projectData.map((project, index) => {
  const p = project as {
    id?: number;
    title: string;
    description: string;
    githubUrl?: string;
    tags?: string[];
    technologies?: string[];
  }

  const tags = p.tags || p.technologies || []
  const titleUpper = p.title.toUpperCase()

  // Categorize projects based on exact titles
  let categoryGroup = 'WEB'
  let categoryLabel = 'WEB DEV'

  if (titleUpper.includes('PIC DEVELOPMENT') || titleUpper.includes('POWER SUPPLY')) {
    categoryGroup = 'HARDWARE'
    categoryLabel = 'HARDWARE / PCB'
  } else if (titleUpper.includes('ECO-CHARGE')) {
    categoryGroup = 'EMBEDDED'
    categoryLabel = 'EMBEDDED SYSTEM'
  } else if (titleUpper.includes('BOARDING') || titleUpper.includes('MUSEUM')) {
    categoryGroup = 'WEB'
    categoryLabel = 'WEB DEV'
  }

  return {
    id: p.id || index + 1,
    number: String(index + 1).padStart(2, '0'),
    category: categoryLabel,
    categoryGroup,
    title: p.title,
    description: p.description,
    stack: tags.join(' · ') || 'Computer Engineering',
    link: p.githubUrl || 'https://github.com/akosijayhan',
  }
})

// Computed Filtered Projects
const filteredProjects = computed(() => {
  if (selectedFilter.value === 'ALL') return projects
  return projects.filter(project => project.categoryGroup === selectedFilter.value)
})

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
  canvas.height = parent ? parent.offsetHeight : 1000

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
  <section id="projects" class="section projects">
    <!-- Moving Circuit Canvas Background -->
    <canvas ref="canvasRef" class="bg-canvas" />

    <!-- Ambient Glowing Background Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <div class="content-container">
      <p class="eyebrow">PROJECTS</p>

      <h2>Things I've <span>built.</span></h2>

      <!-- Interactive Technology Filter Bar -->
      <div class="filter-bar">
        <button
            v-for="option in filterOptions"
            :key="option.value"
            class="filter-btn"
            :class="{ active: selectedFilter === option.value }"
            @click="selectedFilter = option.value"
        >
          {{ option.label }}
        </button>
      </div>

      <!-- Animated Project List -->
      <TransitionGroup name="project-list" tag="div" class="project-list">
        <article
            v-for="project in filteredProjects"
            :key="project.id"
            class="project-row"
        >
          <span class="number">{{ project.number }}</span>

          <div class="project-info">
            <p class="category">{{ project.category }}</p>
            <h3>{{ project.title }}</h3>
            <p class="description">{{ project.description }}</p>
            <p class="stack">{{ project.stack }}</p>
          </div>

          <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="project-link"
              :aria-label="`View ${project.title} on GitHub`"
          >
            ↗
          </a>
        </article>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.section {
  position: relative;
  padding: 120px 10%;
  background: transparent;
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
  width: 380px;
  height: 380px;
  top: 10%;
  left: -5%;
  background: rgba(184, 255, 87, 0.08);
}

.orb-2 {
  width: 420px;
  height: 420px;
  bottom: 10%;
  right: -5%;
  background: rgba(56, 189, 248, 0.12);
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
  font-size: clamp(45px, 7vw, 90px);
  letter-spacing: -3px;
  margin: 0 0 45px;
  color: #ffffff;
  font-family: Impact, 'Arial Narrow', sans-serif;
  text-transform: uppercase;
}

h2 span {
  font-family: Georgia, serif;
  font-style: italic;
  font-weight: 400;
  color: #b8ff57;
  text-transform: none;
  letter-spacing: -1px;
}

/* Filter Bar Styling */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 45px;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 18px;
  border-radius: 20px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  color: #b8ff57;
  border-color: rgba(184, 255, 87, 0.4);
  background: rgba(184, 255, 87, 0.05);
}

.filter-btn.active {
  background: #b8ff57;
  color: #07080b;
  border-color: #b8ff57;
  box-shadow: 0 0 15px rgba(184, 255, 87, 0.3);
}

/* Project Row Layout */
.project-row {
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  gap: 24px;
  align-items: start;
  padding: 40px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(8px);
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-bottom: 20px;
}

.project-row:hover {
  background: rgba(184, 255, 87, 0.03);
  border-top-color: rgba(184, 255, 87, 0.4);
  box-shadow: 0 0 25px rgba(184, 255, 87, 0.1);
  transform: translateX(6px);
}

.number {
  font-size: 12px;
  letter-spacing: 1px;
  color: #b8ff57;
  font-weight: 700;
  padding-top: 5px;
}

.category {
  font-size: 11px;
  letter-spacing: 2px;
  color: #b8ff57;
  font-weight: 600;
  margin: 0;
}

.project-info h3 {
  font-size: clamp(24px, 3.5vw, 36px);
  letter-spacing: -1px;
  margin: 8px 0 12px;
  color: #ffffff;
  font-weight: 700;
  transition: color 0.25s ease;
}

.project-row:hover .project-info h3 {
  color: #b8ff57;
}

.description {
  max-width: 650px;
  font-family: Georgia, serif;
  line-height: 1.8;
  color: #e1e1e1;
  font-size: 15px;
  margin-bottom: 16px;
}

.stack {
  font-size: 12px;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.project-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 32px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.project-link:hover {
  color: #0d0f14;
  background: #b8ff57;
  border-color: #b8ff57;
  transform: translate(4px, -4px);
  box-shadow: 0 0 15px rgba(184, 255, 87, 0.4);
}

/* TransitionGroup Smooth Animations */
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: translateY(15px) scale(0.98);
}

.project-list-move {
  transition: transform 0.4s ease;
}

@media (max-width: 600px) {
  .section {
    padding: 80px 7%;
  }

  .filter-bar {
    gap: 8px;
  }

  .filter-btn {
    padding: 6px 12px;
    font-size: 10px;
  }

  .project-row {
    grid-template-columns: 30px 1fr 35px;
    gap: 12px;
    padding: 25px 12px;
  }

  .project-link {
    width: 36px;
    height: 36px;
    font-size: 24px;
  }
}
</style>