<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits(['loaded'])
const logs = ref<string[]>([])
const isFinished = ref(false)

const bootSequence = [
  'INITIALIZING SYSTEM ARCHITECTURE...',
  'CONNECTING TO THE MAINFRAME...',
  'OVERCLOCKING COGNITIVE MODULES...',
  'LOADING JAYHAN B. DAYAG PORTFOLIO...',
  'INJECTING CREATIVITY MATRIX...',
  'RENDERING VISUAL INTERFACE...',
  'ACCESS GRANTED. BOOT COMPLETE.'
]

onMounted(() => {
  bootSequence.forEach((text, index) => {
    setTimeout(() => {
      logs.value.push(text)
      if (index === bootSequence.length - 1) {
        setTimeout(() => {
          isFinished.value = true
          emit('loaded')
        }, 600)
      }
    }, (index + 1) * 350)
  })
})
</script>

<template>
  <Transition name="fade">
    <div v-if="!isFinished" class="terminal-overlay">
      <div class="terminal-box">
        <div class="terminal-header">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="title">jayhan-terminal-v2.1.4.sh</span>
        </div>
        <div class="terminal-body">
          <p v-for="(log, i) in logs" :key="i" class="log-line">
            <span class="prompt">></span> {{ log }}
          </p>
          <span class="cursor">_</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.terminal-overlay {
  position: fixed;
  inset: 0;
  background: #050608;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.terminal-box {
  width: 100%;
  max-width: 600px;
  background: #0a0c10;
  border: 1px solid rgba(184, 255, 87, 0.3);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(184, 255, 87, 0.15);
  font-family: 'Courier New', Courier, monospace;
}

.terminal-header {
  background: #11141c;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }

.title {
  color: rgba(255, 255, 255, 0.5);
  font-size: 11px;
  margin-left: 10px;
}

.terminal-body {
  padding: 20px;
  color: #b8ff57;
  font-size: 13px;
  min-height: 180px;
}

.log-line {
  margin: 6px 0;
}

.prompt {
  color: #00ff66;
  font-weight: bold;
}

.cursor {
  display: inline-block;
  color: #b8ff57;
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>