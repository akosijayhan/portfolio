<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)
const isQrExpanded = ref(false)
const gcashNumber = '09934421384'
const copied = ref(false)

const copyNumber = () => {
  navigator.clipboard.writeText(gcashNumber)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

// Expose open method so Terminal CLI or external buttons can trigger it anytime
defineExpose({
  openModal: () => {
    isModalOpen.value = true
  }
})
</script>

<template>
  <div class="donate-global-wrapper">
    <!-- Floating Trigger Button (Bottom-Right Corner) -->
    <button class="donate-floating-btn" @click="isModalOpen = true" aria-label="Open GCash Donation">
      <span class="coffee-icon">☕</span>
      <span class="btn-text">Pindot mo 'to</span>
    </button>

    <!-- Donation Modal Popup -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isModalOpen" class="modal-backdrop" @click.self="isModalOpen = false">
          <div class="donate-card">
            <button class="close-btn" @click="isModalOpen = false" aria-label="Close modal">✕</button>

            <div class="card-header">
              <span class="cyber-badge">FUEL THE CODE</span>
              <h3>Scan mo na 'yan please</h3>
              <p>No amount is too small—every peso counts, and my wallet will definitely appreciate it.</p>
            </div>

            <!-- Direct GCash QR Code Display -->
            <div class="qr-display-section">
              <div class="qr-frame" @click="isQrExpanded = true" title="Click to view full QR code">
                <img src="/gcash.jpg" alt="Jayhan GCash QR Code" class="qr-image" />
                <div class="qr-hover-badge">🔍 TAP TO ENLARGE</div>
              </div>
              <span class="qr-caption">PANG THESIS LANG PO</span>
            </div>

            <!-- GCash Account Details & One-Click Copy -->
            <div class="account-details-box">
              <div class="account-row">
                <span class="label">ACCOUNT NAME:</span>
                <span class="value">JAYHAN B. DAYAG</span>
              </div>
              <div class="account-row">
                <span class="label">MOBILE NO:</span>
                <div class="number-action">
                  <span class="number">{{ gcashNumber }}</span>
                  <button class="copy-btn" @click="copyNumber">
                    {{ copied ? 'COPIED! ✓' : 'COPY' }}
                  </button>
                </div>
              </div>
            </div>

            <p class="footer-note">&gt; Thank you for supporting!</p>
          </div>
        </div>
      </Transition>

      <!-- Lightbox Modal for Enlarged QR View -->
      <Transition name="fade">
        <div v-if="isQrExpanded" class="lightbox-backdrop" @click="isQrExpanded = false">
          <div class="lightbox-content">
            <img src="/gcash.jpg" alt="Jayhan GCash QR Code Enlarged" class="lightbox-image" />
            <p class="lightbox-caption">Tap anywhere to close</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* Fixed Floating Position (Bottom-Right Corner) */
.donate-global-wrapper {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 998;
  font-family: 'Courier New', Courier, monospace;
}

/* Floating Toggle Button — Styled identically to Terminal CLI button */
.donate-floating-btn {
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

.donate-floating-btn:hover {
  background: #b8ff57;
  color: #07080b;
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 12px 30px rgba(184, 255, 87, 0.4);
}

.coffee-icon {
  font-weight: 900;
  font-size: 13px;
}

/* Modal Overlay */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(7, 8, 11, 0.92);
  backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.donate-card {
  position: relative;
  width: 100%;
  max-width: 400px;
  background: #0d0f14;
  border: 1px solid rgba(184, 255, 87, 0.3);
  border-radius: 16px;
  padding: 30px 24px;
  box-shadow: 0 0 40px rgba(184, 255, 87, 0.15);
  color: #ffffff;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  cursor: pointer;
}

.close-btn:hover {
  color: #b8ff57;
}

.cyber-badge {
  display: inline-block;
  font-size: 10px;
  font-family: monospace;
  color: #b8ff57;
  background: rgba(184, 255, 87, 0.1);
  border: 1px solid rgba(184, 255, 87, 0.3);
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.card-header h3 {
  margin: 0 0 8px;
  font-size: 20px;
  color: #ffffff;
}

.card-header p {
  margin: 0 0 20px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
}

/* QR Display Frame */
.qr-display-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.qr-frame {
  position: relative;
  background: #ffffff;
  padding: 12px;
  border-radius: 12px;
  border: 2px solid #b8ff57;
  box-shadow: 0 0 25px rgba(184, 255, 87, 0.2);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.qr-frame:hover {
  transform: scale(1.03);
}

.qr-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  display: block;
}

.qr-hover-badge {
  position: absolute;
  bottom: 0;
  inset-x: 0;
  background: rgba(13, 15, 20, 0.85);
  color: #b8ff57;
  font-size: 10px;
  font-family: monospace;
  padding: 6px 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.qr-frame:hover .qr-hover-badge {
  opacity: 1;
}

.qr-caption {
  margin-top: 8px;
  font-size: 11px;
  font-family: monospace;
  color: #0072ff;
  font-weight: 800;
  letter-spacing: 1.5px;
}

/* Account Details Box */
.account-details-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(184, 255, 87, 0.3);
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 20px;
  text-align: left;
}

.account-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.account-row:last-child {
  margin-bottom: 0;
}

.account-row .label {
  font-size: 10px;
  font-family: monospace;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
}

.account-row .value {
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
}

.number-action {
  display: flex;
  align-items: center;
  gap: 10px;
}

.number {
  font-family: monospace;
  font-size: 14px;
  font-weight: 700;
  color: #b8ff57;
}

.copy-btn {
  background: rgba(184, 255, 87, 0.15);
  border: 1px solid #b8ff57;
  color: #b8ff57;
  font-size: 10px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: #b8ff57;
  color: #07080b;
}

.footer-note {
  font-family: monospace;
  font-size: 11px;
  color: rgba(184, 255, 87, 0.7);
  margin: 0;
}

/* Lightbox Styling */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(5, 6, 8, 0.95);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.lightbox-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-image {
  max-width: 85vw;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 12px;
  border: 2px solid #b8ff57;
  box-shadow: 0 0 50px rgba(184, 255, 87, 0.3);
}

.lightbox-caption {
  margin-top: 15px;
  color: rgba(255, 255, 255, 0.6);
  font-family: monospace;
  font-size: 12px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Mobile Responsiveness for Small Viewports */
@media (max-width: 600px) {
  .donate-global-wrapper {
    bottom: 12px;
    right: 10px;
  }

  .donate-floating-btn {
    padding: 8px 12px;
    font-size: 10px;
    gap: 6px;
  }
}
</style>