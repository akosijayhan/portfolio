<script setup lang="ts">
import { profile } from '../data/pdata'

const socialLinks = [
  { label: 'GitHub', url: profile.github },
  { label: 'Facebook', url: profile.facebook },
  { label: 'Instagram', url: profile.instagram },
]

// Updated sequence: About -> Certificates -> Projects (ProjectCard) -> Skills -> Contact
const navigation = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact', id: 'contact' },
]
</script>

<template>
  <section id="home" class="hero">
    <!-- Background portrait and overlay -->
    <div
        class="hero-image"
        :style="{ backgroundImage: `url('${profile.avatarUrl}')` }"
    ></div>
    <div class="hero-overlay"></div>

    <!-- Header -->
    <header class="hero-header">
      <a href="#home" class="brand" aria-label="Back to home">
        <span> </span>
      </a>

      <div class="social-links">
        <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
        >
          {{ social.label }}
        </a>
      </div>
    </header>

    <!-- Main introduction -->
    <main class="hero-content">
      <p class="eyebrow">
        {{ profile.degree }} STUDENT
      </p>

      <h1>
        <span class="name-first">{{ profile.name.trim().split(' ')[0] }}</span>
        <span class="name-last">
          {{ profile.name.trim().split(' ').slice(1).join(' ') }}
        </span>
      </h1>

      <p class="hero-description">
        {{ profile.bio }}
      </p>

      <p class="hero-location">
        📍 {{ profile.location }}
      </p>

      <a href="#projects" class="explore-link">
        EXPLORE MY WORK
        <span>↘</span>
      </a>
    </main>

    <!-- Side navigation matching your section sequence -->
    <nav class="side-navigation" aria-label="Main navigation">
      <a
          v-for="item in navigation"
          :key="item.id"
          :href="`#${item.id}`"
      >
        {{ item.label }}
      </a>
    </nav>

    <!-- Footer -->
    <div class="hero-footer">
      <span>PORTFOLIO — 2026</span>
      <span></span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: #0d0f14;
  color: #fff;
  padding: 100px 7% 80px;
}

.hero-image {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-position: right 45% center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: grayscale(0%) contrast(1.05) brightness(1.0);
  opacity: 0.95;
  transform: scale(1);
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
      linear-gradient(
          90deg,
          rgba(13, 15, 20, 0.96) 0%,
          rgba(13, 15, 20, 0.82) 38%,
          rgba(13, 15, 20, 0.35) 65%,
          rgba(13, 15, 20, 0.15) 80%,
          rgba(13, 15, 20, 0.35) 100%
      ),
      radial-gradient(
          circle at 80% 40%,
          rgba(56, 189, 248, 0.12) 0%,
          rgba(184, 255, 87, 0.08) 50%,
          transparent 80%
      );
}

.hero:hover .hero-image {
  transform: scale(1.02);
}

.hero-header {
  position: absolute;
  top: 30px;
  left: 7%;
  right: 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.brand {
  color: #fff;
  font-size: 26px;
  font-weight: 900;
  text-decoration: none;
  letter-spacing: -1px;
}

.brand span {
  color: #b8ff57;
  text-shadow: 0 0 10px rgba(184, 255, 87, 0.4);
}

.social-links {
  display: flex;
  align-items: center;
  gap: 25px;
}

.social-links a,
.side-navigation a {
  color: #fff;
  text-decoration: none;
  font-family: Georgia, serif;
  font-size: 15px;
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.social-links a:hover,
.side-navigation a:hover {
  color: #b8ff57;
  text-shadow: 0 0 8px rgba(184, 255, 87, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 750px;
  padding-bottom: 20px;
}

.eyebrow {
  color: #b8ff57;
  font-size: 11px;
  letter-spacing: 3px;
  font-weight: 700;
  margin: 0 0 25px;
  text-shadow: 0 0 8px rgba(184, 255, 87, 0.3);
}

.hero-content h1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: Impact, 'Arial Narrow', sans-serif;
  font-size: clamp(76px, 11vw, 175px);
  font-weight: 900;
  letter-spacing: -5px;
  line-height: 0.85;
  overflow-wrap: anywhere;
  margin: 0 0 35px;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.name-first,
.name-last {
  display: block;
}

.name-last {
  margin-top: 8px;
  color: #fcfcfc;
}

.name-last::after {
  content: '.';
  color: #b8ff57;
}

.hero-description {
  max-width: 480px;
  color: #f1f1f1;
  font-family: Georgia, serif;
  font-size: 17px;
  line-height: 1.8;
  margin: 0 0 12px;
}

.hero-location {
  color: #b8ff57;
  font-size: 11px;
  letter-spacing: 1.5px;
  margin: 0 0 26px;
  font-weight: 600;
}

.explore-link {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  color: #fff;
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 2px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding-bottom: 12px;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.explore-link:hover {
  border-color: #b8ff57;
  color: #b8ff57;
}

.explore-link span {
  color: #b8ff57;
  font-size: 20px;
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.explore-link:hover span {
  transform: translate(6px, 6px);
}

.side-navigation {
  position: absolute;
  z-index: 2;
  right: 7%;
  top: 50%;
  transform: translateY(-35%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 27px;
}

.side-navigation a {
  font-size: 16px;
  position: relative;
  transition: all 0.2s ease;
}

.side-navigation a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  right: 0;
  width: 0%;
  height: 2px;
  background: #b8ff57;
  transition: width 0.2s ease;
}

.side-navigation a:hover {
  color: #b8ff57;
  text-decoration: none;
}

.side-navigation a:hover::after {
  width: 100%;
}

.hero-footer {
  position: absolute;
  bottom: 25px;
  left: 7%;
  right: 7%;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  color: #bdbdbd;
  font-size: 9px;
  letter-spacing: 2px;
}

@media (min-width: 1400px) {
  .hero-content h1 {
    font-size: clamp(150px, 12vw, 190px);
  }
}

@media (max-width: 900px) {
  .hero-content {
    max-width: 75%;
  }

  .hero-content h1 {
    font-size: clamp(70px, 11vw, 115px);
  }

  .side-navigation {
    gap: 22px;
  }
}

@media (max-width: 700px) {
  .hero {
    min-height: 100svh;
    padding: 110px 7% 100px;
  }

  .hero-image {
    background-position: 63% center;
    opacity: 0.65;
  }

  .hero-overlay {
    background: linear-gradient(
        90deg,
        rgba(13, 15, 20, 0.96),
        rgba(13, 15, 20, 0.62)
    );
  }

  .hero-header {
    top: 24px;
  }

  .social-links {
    gap: 12px;
  }

  .social-links a {
    font-size: 12px;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-content h1 {
    font-size: clamp(65px, 14vw, 100px);
    letter-spacing: -3px;
  }

  .hero-description {
    max-width: 340px;
    font-size: 15px;
  }

  .side-navigation {
    display: none;
  }

  .hero-footer {
    font-size: 8px;
    letter-spacing: 1px;
  }
}

@media (max-width: 380px) {
  .social-links {
    gap: 8px;
  }

  .social-links a {
    font-size: 10px;
  }

  .hero-content h1 {
    font-size: 58px;
  }

  .hero-footer {
    letter-spacing: 0.5px;
  }
}
</style>