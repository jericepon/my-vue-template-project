<template>
  <button
    class="btn"
    :class="[`btn--${color}`, `btn--${size}`, { 'btn--disabled': disabled }]"
    :disabled="disabled"
    :aria-disabled="disabled ? 'true' : undefined"
    :tabindex="disabled ? -1 : 0"
    type="button"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
type ButtonColor = 'primary' | 'neutral' | 'subtle'
type ButtonSize = 'medium' | 'small'

const props = withDefaults(
  defineProps<{
    color?: ButtonColor
    size?: ButtonSize
    disabled?: boolean
  }>(),
  {
    color: 'primary',
    size: 'medium',
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  if (!props.disabled) emit('click', event)
}
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--size-radius-200);
  font-family: var(--typography-body-font-family), sans-serif;
  font-weight: var(--typography-body-font-weight-strong);
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    box-shadow 0.15s;
  outline: none;
  user-select: none;
  min-width: 80px;
  padding: 0 var(--size-space-400);
  font-size: var(--typography-body-size-medium);
  height: 40px;
  background: var(--color-background-brand-default);
  color: var(--color-text-brand-on-brand);
}

.btn--primary {
  background: var(--color-background-brand-default);
  color: var(--color-text-brand-on-brand);
}
.btn--primary:hover:not(.btn--disabled) {
  background: var(--color-background-brand-hover);
}
.btn--primary.btn--disabled,
.btn--primary:disabled {
  background: var(--color-background-disabled-default);
  color: var(--color-text-disabled-on-disabled);
  cursor: not-allowed;
  opacity: 0.7;
}

.btn--neutral {
  background: var(--color-background-neutral-default);
  color: var(--color-text-neutral-on-neutral);
}
.btn--neutral:hover:not(.btn--disabled) {
  background: var(--color-background-neutral-hover);
}
.btn--neutral.btn--disabled,
.btn--neutral:disabled {
  background: var(--color-background-disabled-default);
  color: var(--color-text-disabled-on-disabled);
  cursor: not-allowed;
  opacity: 0.7;
}

.btn--subtle {
  background: var(--color-background-default-secondary);
  color: var(--color-text-default-default);
  border: 1px solid var(--color-border-default-default);
}
.btn--subtle:hover:not(.btn--disabled) {
  background: var(--color-background-default-secondary-hover);
}
.btn--subtle.btn--disabled,
.btn--subtle:disabled {
  background: var(--color-background-disabled-default);
  color: var(--color-text-disabled-on-disabled);
  border-color: var(--color-border-disabled-default);
  cursor: not-allowed;
  opacity: 0.7;
}

.btn--medium {
  height: 40px;
  font-size: var(--typography-body-size-medium);
  padding: 0 var(--size-space-400);
}
.btn--small {
  height: 32px;
  font-size: var(--typography-body-size-small);
  padding: 0 var(--size-space-200);
}

.btn:focus-visible {
  outline: 2px solid var(--color-border-brand-default);
  outline-offset: 2px;
}
</style>
