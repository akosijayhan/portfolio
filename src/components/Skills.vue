<script setup lang="ts">
import { skillCategories, experiences } from '../data/pdata'

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

// Safely cast imported data using unknown to avoid TypeScript TS2352 errors
const rawCategories = (skillCategories ?? []) as unknown as SkillCategory[]
const rawExperiences = (experiences ?? []) as unknown as ExperienceItem[]

// Map skills list
const skillGroups = rawCategories.map((group, index) => ({
  number: String(index + 1).padStart(2, '0'),
  title: group.category ?? 'Skills',
  skills: group.skills ?? [],
}))

// Map experience list (handles both company and organization properties)
const experienceList = rawExperiences.map((item, index) => ({
  number: String(index + 1).padStart(2, '0'),
  period: item.period ?? '',
  role: item.role ?? 'Role',
  company: item.company ?? item.organization ?? '',
  description: item.description ?? '',
  highlights: item.highlights ?? [],
}))
</script>

<template>
  <section id="expertise-experience" class="section">
    <!-- Skills Section -->
    <div id="skills" class="block">
      <p class="eyebrow">EXPERTISE</p>
      <h2>Tools of the trade<span></span></h2>

      <div class="skill-list">
        <article
            v-for="group in skillGroups"
            :key="group.number"
            class="skill-row"
        >
          <span class="number">{{ group.number }}</span>
          <h3>{{ group.title }}</h3>
          <div class="tags">
            <span v-for="skill in group.skills" :key="skill">
              {{ skill }}
            </span>
          </div>
        </article>
      </div>
    </div>

    <!-- Experience Section -->
    <div v-if="experienceList.length" id="experience" class="block experience-block">
      <p class="eyebrow">CAREER PATH</p>
      <h2>Work experience <span></span></h2>

      <div class="experience-list">
        <article
            v-for="item in experienceList"
            :key="item.number"
            class="experience-row"
        >
          <span class="number">{{ item.number }}</span>

          <div class="role-details">
            <span v-if="item.period" class="period">{{ }}</span>
            <h3>
              {{ item.role }}
              <span v-if="item.company">  {{ }}</span>
            </h3>
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

/* Skills Layout */
.skill-row {
  display: grid;
  grid-template-columns: 50px 1.2fr 1.8fr;
  gap: 20px;
  align-items: center;
  padding: 35px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.3s ease;
}

.skill-row:hover {
  border-top-color: rgba(184, 255, 87, 0.4);
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

.tags span {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border-radius: 30px;
  padding: 9px 16px;
  font-size: 12px;
  color: #e1e1e1;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.tags span:hover {
  border-color: #b8ff57;
  color: #b8ff57;
  background: rgba(184, 255, 87, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(184, 255, 87, 0.15);
}

/* Experience Layout */
.experience-row {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 20px;
  padding: 35px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.3s ease;
}

.experience-row:hover {
  border-top-color: rgba(184, 255, 87, 0.4);
}

.period {
  display: inline-block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
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
  }

  .tags {
    grid-column: 2;
    margin-top: 5px;
  }

  .experience-row {
    grid-template-columns: 35px 1fr;
    gap: 15px;
  }
}
</style>