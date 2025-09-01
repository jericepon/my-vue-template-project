<template>
  <teleport to="body">
    <div
      v-if="stack.length > 0"
      class="modal-backdrop"
      style="z-index: 1000"
  @click.self="handleBackdropClick(stack[stack.length - 1])"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
      :aria-label="stack[stack.length - 1].title || 'Modal'"
      ref="backdrops"
    >
      <template v-for="(modal, idx) in stack" :key="modal.id">
        <div
          v-show="modal.isOpen"
          class="modal"
          :class="{ shake: shakeStates[modal.id] }"
          :style="{ zIndex: 1001 + idx }"
          ref="modals"
          @keydown.esc="idx === stack.length - 1 && handleEsc(modal.id)"
        >
          <header class="modal-header">
            <slot name="header" :modal="modal">
              <h2>{{ modal.title }}</h2>
            </slot>
            <button
              class="modal-close"
              @click="close(modal.id)"
              aria-label="Close modal"
            >
              &times;
            </button>
          </header>
          <section class="modal-content">
            <slot :modal="modal">
              <component
                v-if="modal.component"
                :is="modal.component"
                v-bind="modal.componentProps"
              />
              <div v-else-if="modal.content" v-html="modal.content"></div>
            </slot>
          </section>
          <footer class="modal-footer">
            <slot name="footer" :modal="modal"></slot>
          </footer>
        </div>
      </template>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, onUnmounted, watchEffect } from 'vue'
import { useModal } from '@/composables/useModal'

const { stack, close } = useModal()
const backdrops = ref<HTMLElement[]>([])
const modals = ref<HTMLElement[]>([])
const shakeStates = ref<{ [id: string]: boolean }>({})

function handleBackdropClick(modal: any) {
  if (!modal.disableOutsideClick) {
    close(modal.id)
  } else {
    // Trigger shake animation
    shakeStates.value[modal.id] = false
    nextTick(() => {
      shakeStates.value[modal.id] = true
      setTimeout(() => {
        shakeStates.value[modal.id] = false
      }, 500)
    })
  }
}

function handleEsc(id: string) {
  close(id)
}

// Focus management: focus first focusable element in modal
function focusModal(idx: number) {
  nextTick(() => {
    const modalEl = modals.value[idx]
    if (!modalEl) return
    const focusable = modalEl.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    if (focusable.length) focusable[0].focus()
    else modalEl.focus()
  })
}


// Focus new modal, cleanup shake state for removed modals
watch(
  () => stack.value.map(m => m.id),
  (ids, oldIds) => {
    // Focus new modal
    if (ids.length > oldIds.length) focusModal(ids.length - 1)
    // Cleanup shakeStates for removed modals
    oldIds.forEach(id => {
      if (!ids.includes(id)) delete shakeStates.value[id]
    })
  },
)

onUnmounted(() => {
  // Clean up if needed
})
</script>

<style scoped>
.shake {
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
    @keyframes shake {
      10%, 90% { transform: translate(-50%, -50%) translateX(-2px); }
      20%, 80% { transform: translate(-50%, -50%) translateX(4px); }
      30%, 50%, 70% { transform: translate(-50%, -50%) translateX(-8px); }
      40%, 60% { transform: translate(-50%, -50%) translateX(8px); }
      100% { transform: translate(-50%, -50%); }
    }
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: var(--color-background-utilities-overlay, rgba(0, 0, 0, 0.5));
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Optional: add blur for glass effect */
  backdrop-filter: blur(2px);
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-text-neutral-on-neutral);
  color: var(--color-background-default-default);
  border-radius: var(--size-radius-200, 8px);
  min-width: 320px;
  max-width: 90vw;
  max-height: 90vh;
  box-shadow: 0 2px 24px var(--color-primitives-black-400, rgba(0, 0, 0, 0.2));
  outline: none;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--size-space-400, 16px) var(--size-space-600, 24px)
    var(--size-space-200, 8px) var(--size-space-600, 24px);
  border-bottom: 1px solid var(--color-border-default-default, #e5e5e5);
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  color: var(--color-icon-default-secondary, #757575);
  transition: color 0.2s;
}

.modal-close:hover {
  color: var(--color-icon-danger-default, #900b09);
}

.modal-content {
  padding: var(--size-space-600, 24px);
  overflow: auto;
}

.modal-footer {
  padding: var(--size-space-400, 16px) var(--size-space-600, 24px);
  border-top: 1px solid var(--color-border-default-default, #e5e5e5);
  text-align: right;
}
</style>
