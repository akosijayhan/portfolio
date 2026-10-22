<script setup lang="ts">
import { profile } from '../data/pdata'

interface SocialLink {
  label: string
  username: string
  url: string
  color: string
  glow: string
  icon: string
  hoverText: string
}

const safeProfile = profile ?? {}

const socialLinks: SocialLink[] = [
  {
    label: 'FACEBOOK',
    username: '@akosijayhan',
    url: safeProfile.facebook || 'https://www.facebook.com/akosijayhan',
    color: '#1877F2',
    glow: 'rgba(24, 119, 242, 0.15)',
    icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    hoverText: 'Let’s connect'
  },
  {
    label: 'INSTAGRAM',
    username: '@jayhahahan',
    url: safeProfile.instagram || 'https://www.instagram.com/jayhahahan/',
    color: '#E4405F',
    glow: 'rgba(228, 64, 95, 0.15)',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    hoverText: 'Direct message me!'
  },
  {
    label: 'GITHUB',
    username: '@akosijayhan',
    url: safeProfile.github || 'https://github.com/akosijayhan',
    color: '#E6EDF3',
    glow: 'rgba(255, 255, 255, 0.12)',
    icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    hoverText: 'Check code repos'
  },
  {
    label: 'EMAIL',
    username: safeProfile.email || 'akosijayhan@gmail.com',
    url: safeProfile.email ? `mailto:${safeProfile.email}` : 'mailto:akosijayhan@gmail.com',
    color: '#EA4335',
    glow: 'rgba(234, 67, 53, 0.12)',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    hoverText: 'Send a quick mail'
  }
].filter(link => link.url)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer id="contact" class="contact">
    <p class="eyebrow">05 — GET IN TOUCH</p>

    <h2>
      Have a project
      <span>in mind?</span>
    </h2>

    <a
        :href="socialLinks[0]?.url"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-link"
    >
      LET'S TALK
      <div class="glow-arrow">
        <span>↗</span>
      </div>
    </a>

    <!-- Social Accounts Grid Section -->
    <div id="socials" class="socials-section">
      <p class="eyebrow">DIGITAL CHANNELS</p>

      <div class="social-links-grid">
        <a
            v-for="account in socialLinks"
            :key="account.label"
            :href="account.url"
            target="_blank"
            rel="noopener noreferrer"
            class="social-card"
            :style="{ '--brandColor': account.color, '--shadowColor': account.glow }"
        >
          <div class="card-glow-bg"></div>

          <div class="card-content">
            <div class="brand-info">
              <svg
                  class="brand-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
              >
                <path :d="account.icon" />
              </svg>

              <div class="text-stack">
                <span class="label">{{ account.label }}</span>
                <span class="username">{{ account.username }}</span>
              </div>
            </div>

            <div class="arrow-container">
              <span class="action-caption">{{ account.hoverText }}</span>
              <span class="arrow-indicator">↗</span>
            </div>
          </div>
        </a>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="credits">
        <span>{{ (safeProfile.name || 'JAYHAN DAYAG').toUpperCase() }} © 2026</span>
        <span class="version-badge">BUILD V2.1.4</span>
      </div>
      <button type="button" @click="scrollToTop" class="back-to-top">
        BACK TO TOP <span class="caret">↑</span>
      </button>
    </div>
  </footer>
</template>

<style scoped>
.contact {
  position: relative;
  overflow: hidden;
  padding: 140px 10% 40px;
  background:
      radial-gradient(
          circle at 90% 15%,
          rgba(184, 255, 87, 0.1) 0%,
          transparent 45%
      ),
      radial-gradient(
          circle at 10% 90%,
          rgba(56, 189, 248, 0.08) 0%,
          transparent 45%
      ),
      #07080b;
  color: #ffffff;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.eyebrow {
  font-size: 11px;
  letter-spacing: 4px;
  color: #b8ff57;
  font-weight: 800;
  margin-bottom: 35px;
  text-shadow: 0 0 10px rgba(184, 255, 87, 0.25);
  font-family: 'Courier New', Courier, monospace;
}

h2 {
  font-size: clamp(55px, 9.5vw, 130px);
  line-height: 0.93;
  letter-spacing: -4px;
  margin: 0 0 45px;
  color: #ffffff;
  font-family: Impact, 'Arial Narrow', sans-serif;
  text-transform: uppercase;
}

h2 span {
  display: block;
  font-family: Georgia, serif;
  font-weight: 400;
  font-style: italic;
  color: #b8ff57;
  text-transform: none;
  letter-spacing: -1px;
  padding-left: 10px;
}

.contact-link {
  display: inline-flex;
  gap: 30px;
  align-items: center;
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 800;
  padding: 10px 0 18px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.15);
  letter-spacing: 3px;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.contact-link:hover {
  color: #b8ff57;
  border-color: #b8ff57;
}

.glow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.contact-link:hover .glow-arrow {
  background: rgba(184, 255, 87, 0.15);
  border-color: #b8ff57;
  box-shadow: 0 0 15px rgba(184, 255, 87, 0.3);
  transform: translate(4px, -4px);
}

.contact-link .glow-arrow span {
  color: #ffffff;
  font-size: 22px;
  transition: color 0.3s ease;
}

.contact-link:hover .glow-arrow span {
  color: #b8ff57;
}

.socials-section {
  margin-top: 130px;
  padding-top: 50px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.social-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.social-card {
  position: relative;
  display: block;
  overflow: hidden;
  padding: 24px 28px;
  background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.02) 0%,
      rgba(255, 255, 255, 0.005) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-glow-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at -10% -10%,
      var(--shadowColor) 0%,
      transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.brand-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.brand-icon {
  width: 24px;
  height: 24px;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.4s ease;
}

.text-stack {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.4s ease;
}

.username {
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 4px;
  font-family: 'Courier New', Courier, monospace;
  transition: color 0.4s ease;
}

.arrow-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-caption {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #b8ff57;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.arrow-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
  transition: all 0.35s ease;
}

.social-card:hover {
  border-color: var(--brandColor);
  transform: translateY(-5px);
  box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.3),
      0 0 20px var(--shadowColor);
}

.social-card:hover .card-glow-bg {
  opacity: 1;
}

.social-card:hover .brand-icon {
  color: var(--brandColor);
  transform: scale(1.15) rotate(-5deg);
}

.social-card:hover .label {
  color: #ffffff;
}

.social-card:hover .username {
  color: rgba(255, 255, 255, 0.7);
}

.social-card:hover .action-caption {
  opacity: 0.8;
  transform: translateX(0);
}

.social-card:hover .arrow-indicator {
  background: var(--brandColor);
  border-color: var(--brandColor);
  color: #ffffff;
  transform: translate(2px, -2px);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 80px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.35);
  font-size: 11px;
  letter-spacing: 2px;
}

.credits {
  display: flex;
  align-items: center;
  gap: 15px;
}

.version-badge {
  font-size: 8px;
  font-family: monospace;
  padding: 3px 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.5);
}

.back-to-top {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 11px;
  transition: all 0.3s ease;
}

.back-to-top .caret {
  transition: transform 0.3s ease;
}

.back-to-top:hover {
  color: #b8ff57;
}

.back-to-top:hover .caret {
  transform: translateY(-4px);
}

@media (max-width: 768px) {
  .contact {
    padding: 100px 7% 30px;
  }

  h2 {
    letter-spacing: -2px;
  }

  .socials-section {
    margin-top: 80px;
  }

  .social-links-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .social-card {
    padding: 20px 24px;
  }
}

@media (max-width: 500px) {
  .footer-bottom {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>