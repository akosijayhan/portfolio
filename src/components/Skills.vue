<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { skillCategories, experiences } from '../data/pdata'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface SkillCategory {
  category?: string
  skills?: string[]
}

interface ExperienceItem {
  period?: string
  role?: string
  company?: string
  organization?: string
  description?: string
  highlights?: string[]
}

// Safely cast imported data
const rawCategories = (skillCategories ?? []) as unknown as SkillCategory[]
const rawExperiences = (experiences ?? []) as unknown as ExperienceItem[]

// Map skills list
const skillGroups = rawCategories.map((group, index) => ({
  number: String(index + 1).padStart(2, '0'),
  title: group.category ?? 'Skills',
  skills: group.skills ?? [],
}))

// Map experience list
const experienceList = rawExperiences.map((item, index) => ({
  number: String(index + 1).padStart(2, '0'),
  period: item.period ?? '',
  role: item.role ?? 'Role',
  company: item.company ?? item.organization ?? '',
  description: item.description ?? '',
  highlights: item.highlights ?? [],
}))

// Expandable accordion state for work experience
const expandedId = ref<string | null>(null)
const toggleExpand = (id: string) => {
  expandedId.value = expandedId.value === id ? null : id
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
  <section id="expertise-experience" class="section">
    <!-- Moving Circuit Canvas Background -->
    <canvas ref="canvasRef" class="bg-canvas" />

    <!-- Ambient Glowing Background Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <div class="content-container">
      <!-- Skills Section -->
      <div id="skills" class="block">
        <p class="eyebrow">EXPERTISE</p>
        <h2>Tools of <span> the trade</span></h2>

        <div class="skill-list">
          <article
              v-for="group in skillGroups"
              :key="group.number"
              class="skill-row"
          >
            <span class="number">{{ group.number }}</span>
            <h3>{{ group.title }}</h3>
            <div class="tags">
              <span v-for="skill in group.skills" :key="skill" class="skill-chip">
                {{ skill }}
              </span>
            </div>
          </article>
        </div>
      </div>

      <!-- Experience Section -->
      <div v-if="experienceList.length" id="experience" class="block experience-block">
        <p class="eyebrow">CAREER PATH</p>
        <h2>Work <span> experience</span></h2>

        <div class="experience-list">
          <article
              v-for="item in experienceList"
              :key="item.number"
              class="experience-row"
              :class="{ expanded: expandedId === item.number }"
              @click="toggleExpand(item.number)"
          >
            <span class="number">{{ item.number }}</span>

            <div class="role-details">
              <div class="role-header">
                <div>
                  <span v-if="item.period" class="period">{{ item.period }}</span>
                  <h3>
                    {{ item.role }}
                    <span v-if="item.company"> — {{ item.company }}</span>
                  </h3>
                </div>
                <span class="expand-btn">{{ expandedId === item.number ? '−' : '+' }}</span>
              </div>

              <p v-if="item.description" class="description">{{ item.description }}</p>

              <ul v-if="item.highlights.length" class="highlights">
                <li v-for="(point, i) in item.highlights" :key="i">
                  {{ point }}
                </li>
              </ul>
            </div>
          </article>
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
  width: 380px;
  height: 380px;
  top: 15%;
  right: -5%;
  background: rgba(56, 189, 248, 0.12);
}

.orb-2 {
  width: 420px;
  height: 420px;
  bottom: 15%;
  left: -5%;
  background: rgba(184, 255, 87, 0.08);
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

.experience-block {
  margin-top: 100px;
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
  margin: 0 0 65px;
  color: #ffffff;
  font-family: Impact, 'Arial Narrow', sans-serif;
  text-transform: uppercase;
}

h2 span {
  font-family: Georgia, serif;
  font-weight: 400;
  font-style: italic;
  color: #b8ff57;
  text-transform: none;
  letter-spacing: -1px;
}

.skill-row {
  display: grid;
  grid-template-columns: 50px 1.2fr 1.8fr;
  gap: 20px;
  align-items: center;
  padding: 35px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

.skill-row:hover {
  background: rgba(184, 255, 87, 0.03);
  border-top-color: rgba(184, 255, 87, 0.4);
  transform: translateX(6px);
}

.number {
  color: #b8ff57;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}

h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-chip {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border-radius: 30px;
  padding: 9px 16px;
  font-size: 12px;
  color: #e1e1e1;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.skill-chip:hover {
  border-color: #b8ff57;
  color: #b8ff57;
  background: rgba(184, 255, 87, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(184, 255, 87, 0.15);
}

.experience-row {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 20px;
  padding: 35px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  cursor: pointer;
  margin-bottom: 12px;
}

.experience-row:hover {
  background: rgba(184, 255, 87, 0.03);
  border-top-color: rgba(184, 255, 87, 0.4);
  transform: translateX(6px);
}

.role-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.expand-btn {
  color: #b8ff57;
  font-family: monospace;
  font-size: 20px;
  font-weight: 700;
}

.period {
  display: inline-block;
  font-size: 12px;
  color: #b8ff57;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.role-details h3 span {
  color: #b8ff57;
  font-weight: 400;
}

.description {
  margin: 12px 0 0;
  color: #a0a5b5;
  font-size: 14px;
  line-height: 1.6;
}

.highlights {
  margin: 12px 0 0;
  padding-left: 18px;
  color: #c5c9d3;
  font-size: 13px;
  line-height: 1.6;
}

.highlights li::marker {
  color: #b8ff57;
}

@media (max-width: 700px) {
  .section {
    padding: 80px 7%;
  }

  .experience-block {
    margin-top: 60px;
  }

  .skill-row {
    grid-template-columns: 35px 1fr;
    gap: 15px;
    padding: 25px 10px;
  }

  .tags {
    grid-column: 2;
    margin-top: 5px;
  }

  .experience-row {
    grid-template-columns: 35px 1fr;
    gap: 15px;
    padding: 25px 10px;
  }
}
</style>