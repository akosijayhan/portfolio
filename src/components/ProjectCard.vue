<script setup lang="ts">
import { projects as projectData } from '../data/pdata'

// Map project data or define fallback structure
const projects = projectData.map((project, index) => ({
  number: String(index + 1).padStart(2, '0'),
  category: project.tags?.[0]?.toUpperCase() || 'PROJECT',
  title: project.title,
  description: project.description,
  stack: project.tags?.join(' · ') || '',
  link: project.githubUrl || 'https://github.com/akosijayhan',
}))
</script>

<template>
  <section id="projects" class="section projects">
    <p class="eyebrow">PROJECTS</p>

    <h2>Things I've <span>built.</span></h2>

    <div class="project-list">
      <article
          v-for="project in projects"
          :key="project.number"
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
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 120px 10%;
  background:
      radial-gradient(
          circle at 10% 40%,
          rgba(184, 255, 87, 0.06) 0%,
          transparent 50%
      ),
      radial-gradient(
          circle at 90% 70%,
          rgba(56, 189, 248, 0.08) 0%,
          transparent 50%
      ),
      #0d0f14;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
  font-style: italic;
  font-weight: 400;
  color: #b8ff57;
  text-transform: none;
  letter-spacing: -1px;
}

.project-row {
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  gap: 20px;
  align-items: start;
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.project-row:hover {
  border-top-color: rgba(184, 255, 87, 0.4);
}

.number {
  font-size: 12px;
  letter-spacing: 1px;
  color: #b8ff57;
  font-weight: 700;
}

.category {
  font-size: 11px;
  letter-spacing: 2px;
  color: #b8ff57;
  font-weight: 600;
  margin: 0;
}

.project-info h3 {
  font-size: clamp(26px, 4vw, 42px);
  letter-spacing: -1px;
  margin: 10px 0 14px;
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
  font-size: 16px;
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

@media (max-width: 600px) {
  .section {
    padding: 80px 7%;
  }

  .project-row {
    grid-template-columns: 35px 1fr 35px;
    gap: 12px;
  }

  .project-link {
    width: 36px;
    height: 36px;
    font-size: 24px;
  }
}
</style>