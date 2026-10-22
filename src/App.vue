<script setup lang="ts">
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/About.vue'
import CertificateSection from './components/Certificates.vue'
import SkillsSection from './components/Skills.vue'
import ProjectsSection from './components/ProjectCard.vue'
import ContactSection from './components/Contact.vue'
</script>

<template>
  <div class="app-container">
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
    <CertificateSection />
    <ContactSection />
  </div>
</template>

<style>
/* Global resets & smooth scrolling */
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  background-color: #0d0f14;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #ffffff;
  overflow-x: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>