<script setup lang="ts">
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const inputCommand = ref('')
const terminalOutput = ref<Array<{ type: 'command' | 'response'; text: string }>>([
  { type: 'response', text: 'JAYHAN OS v2.1.4' },
  { type: 'response', text: 'Type "help" to list available portfolio CLI commands.\n' }
])

const terminalBodyRef = ref<HTMLElement | null>(null)

const toggleDrawer = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    scrollToBottom()
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalBodyRef.value) {
      terminalBodyRef.value.scrollTop = terminalBodyRef.value.scrollHeight
    }
  })
}

const handleCommand = () => {
  const cmd = inputCommand.value.trim().toLowerCase()
  if (!cmd) return

  // Echo user input
  terminalOutput.value.push({ type: 'command', text: `> ${inputCommand.value}` })

  // Process commands
  switch (cmd) {
    case 'help':
      terminalOutput.value.push({
        type: 'response',
        text: `AVAILABLE COMMANDS:
  help        - Show available terminal commands
  bio         - Summary about Jayhan
  skills      - List of skills
  projects    - View projects
  cat resume  - CV & qualifications
  contact     - Display contacts
  help moko   - haha
  clear       - Clear terminal history`
      })
      break

    case 'bio':
      terminalOutput.value.push({
        type: 'response',
        text: 'Jayhan B. Dayag — BS Computer Engineering student at Cagayan State University - Carig Campus. (Single)'
      })
      break

    case 'skills':
      terminalOutput.value.push({
        type: 'response',
        text: `HARDWARE: PIC Microcontrollers, MPLAB X, PICKit, Multisim, PCB Layout & Prototyping
SOFTWARE: Embedded C, Assembly, Python, Vue 3, Django REST Framework, TypeScript, HTML/CSS
QA / TESTING: Test case execution, Bug reporting, Regression testing`
      })
      break

    case 'projects':
      terminalOutput.value.push({
        type: 'response',
        text: `1. PIC Development Kit Board (Embedded C, Assembly)
2. Custom PCB Power Supply (Multisim, Multilayer PCB)
3. Eco-Charge Sustainable Station (Arduino, Sensors)
4. Dinosaur Museum Management System (Vue 3, Django REST)
5. Golden Harvest Boarding House Finder`
      })
      break

    case 'cat resume':
    case 'resume':
    case 'cv':
      terminalOutput.value.push({
        type: 'response',
        text: `CURRICULUM VITAE SUMMARY:
Name: Jayhan B. Dayag
Degree: BS Computer Engineering (CSU - Carig Campus)
Eligibility: Civil Service Professional Eligible (March 2025)
Download full PDF CV at the bottom of the page or click "DOWNLOAD CV".`
      })
      break

    case 'contact':
      terminalOutput.value.push({
        type: 'response',
        text: `Email: akosijayhan@gmail.com
Phone: 09934421384
Facebook: @akosijayhan
Instagram: @jayhahahan
GitHub: https://github.com/akosijayhan`
      })
      break

    case 'help moko':
      terminalOutput.value.push({
        type: 'response',
        text: `Send GCash:
Account Name: JAYHAN B. DAYAG
Mobile Number: 09934421384
Note: Pang parlay`
      })
      break

    case 'clear':
      terminalOutput.value = []
      break

    default:
      terminalOutput.value.push({
        type: 'response',
        text: `command not found: "${cmd}". Type "help" for a list of available commands.`
      })
      break
  }

  inputCommand.value = ''
  scrollToBottom()
}
</script>

<template>
  <div class="terminal-drawer-wrapper">
    <!-- Trigger Floating Drawer Button (Bottom-Left Corner) -->
    <button
        class="terminal-toggle-btn"
        @click="toggleDrawer"
        :aria-expanded="isOpen"
        aria-label="Toggle CLI Shell"
    >
      <span class="btn-icon">-&gt;</span>
      <span class="btn-text">CLI Shell</span>
    </button>

    <!-- Collapsible Terminal Panel -->
    <Transition name="slide-drawer">
      <div v-if="isOpen" class="terminal-drawer">
        <div class="drawer-header">
          <div class="window-controls">
            <span class="control close" @click="toggleDrawer"></span>
            <span class="control minimize"></span>
            <span class="control maximize"></span>
          </div>
          <span class="window-title">guest@jayhan-portfolio:~</span>
          <button class="close-x-btn" @click="toggleDrawer">✕</button>
        </div>

        <div ref="terminalBodyRef" class="drawer-body">
          <div
              v-for="(out, index) in terminalOutput"
              :key="index"
              class="terminal-line"
              :class="out.type"
          >
            <pre class="line-text">{{ out.text }}</pre>
          </div>
        </div>

        <form class="drawer-input-area" @submit.prevent="handleCommand">
          <span class="prompt-symbol">&gt;</span>
          <input
              v-model="inputCommand"
              type="text"
              class="cmd-input"
              placeholder="Type 'help'..."
              autocomplete="off"
              spellcheck="false"
          />
        </form>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Positioned fixed at the Bottom-Left corner */
.terminal-drawer-wrapper {
  position: fixed;
  bottom: 25px;
  left: 25px;
  z-index: 999;
  font-family: 'Courier New', Courier, monospace;
}

/* Floating Toggle Button */
.terminal-toggle-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #0a0c10;
  border: 1px solid rgba(184, 255, 87, 0.4);
  color: #b8ff57;
  padding: 12px 20px;
  border-radius: 30px;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 1.5px;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(184, 255, 87, 0.2);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.terminal-toggle-btn:hover {
  background: #b8ff57;
  color: #07080b;
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 12px 30px rgba(184, 255, 87, 0.4);
}

.btn-icon {
  font-weight: 900;
}

/* Terminal Panel Window (Opens from bottom-left) */
.terminal-drawer {
  position: absolute;
  bottom: 60px;
  left: 0;
  width: min(480px, 90vw);
  height: 380px;
  background: rgba(10, 12, 16, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(184, 255, 87, 0.3);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(184, 255, 87, 0.15);
}

.drawer-header {
  background: #11141c;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.window-controls {
  display: flex;
  gap: 6px;
}

.control {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.close { background: #ff5f56; cursor: pointer; }
.minimize { background: #ffbd2e; }
.maximize { background: #27c93f; }

.window-title {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
}

.close-x-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  font-size: 12px;
}

.close-x-btn:hover {
  color: #b8ff57;
}

.drawer-body {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.terminal-line.command {
  color: #ffffff;
  font-weight: 700;
}

.terminal-line.response {
  color: #b8ff57;
}

.line-text {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.5;
}

.drawer-input-area {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  background: #07080b;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.prompt-symbol {
  color: #00ff66;
  font-weight: 900;
  font-size: 14px;
}

.cmd-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #b8ff57;
  font-family: inherit;
  font-size: 12px;
}

.cmd-input::placeholder {
  color: rgba(184, 255, 87, 0.3);
}

/* Slide Transition */
.slide-drawer-enter-active,
.slide-drawer-leave-active {
  transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-drawer-enter-from,
.slide-drawer-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

@media (max-width: 600px) {
  .terminal-drawer-wrapper {
    bottom: 12px;
    left: 10px;
  }

  .terminal-toggle-btn {
    padding: 8px 12px;
    font-size: 10px;
    gap: 6px;
  }

  .terminal-drawer {
    width: calc(100vw - 20px);
    left: 0;
    bottom: 50px;
  }
}
</style>