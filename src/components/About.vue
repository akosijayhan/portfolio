<script setup lang="ts">
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
    period: '2011 – 2017',
    school: 'Cataggaman Elementary School',
    degree: 'Elementary Education',
  },
]
</script>

<template>
  <section id="about" class="section about">
    <p class="eyebrow"> ABOUT ME</p>

    <h2>
      Engineering ideas
      <span>into reality.</span>
    </h2>

    <div class="about-grid">
      <!-- Bio Summary -->
      <div class="about-content">
        <p>
          I am a Computer Engineering student at Cagayan State University – Carig Campus, passionate about software development, embedded systems, and innovative engineering solutions. I am interested in developing practical technologies that solve real-world problems through creativity, critical thinking, and technical expertise. My skills include programming, web development, microcontroller-based systems, Internet of Things (IoT), and hardware and software troubleshooting.
        </p>

        <p>
          I enjoy exploring new technologies, learning different programming tools and frameworks, and applying my knowledge to academic projects and personal development. I have experience working with technologies such as Arduino, ESP32, HTML, CSS, JavaScript, and modern web development frameworks. I am also interested in artificial intelligence, automation, and system development, particularly in creating efficient, user-friendly, and reliable solutions
        </p>
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
  </section>
</template>

<style scoped>
.section {
  padding: 120px 10%;
  background:
      radial-gradient(
          circle at 10% 20%,
          rgba(56, 189, 248, 0.08) 0%,
          transparent 50%
      ),
      radial-gradient(
          circle at 90% 80%,
          rgba(184, 255, 87, 0.06) 0%,
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

/* Two-column layout grid */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.about-content p {
  font-family: Georgia, serif;
  font-size: 18px;
  line-height: 1.9;
  color: #e1e1e1;
  margin-bottom: 1.25rem;
}

/* Education styling */
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
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid #b8ff57;
  border-radius: 6px;
  padding: 18px 22px;
  transition: all 0.3s ease;
}

.education-card:hover {
  background: rgba(184, 255, 87, 0.04);
  border-color: rgba(184, 255, 87, 0.3);
  transform: translateX(5px);
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