import { defineStore } from 'pinia'

import type { Component } from 'vue'
export interface ModalState {
  stack: Array<{
    id: string
    title?: string
    content?: string | null
    props?: Record<string, any>
    isOpen: boolean
    onClose?: () => void
    component?: Component
    componentProps?: Record<string, any>
    disableOutsideClick?: boolean
  }>
}

export const useModalStore = defineStore('modal', {
  state: (): ModalState => ({
    stack: [],
  }),
  actions: {
    open(modal: Omit<ModalState['stack'][0], 'isOpen'>) {
      this.stack.push({ ...modal, isOpen: true })
    },
    close(id?: string) {
      const idx = id
        ? this.stack.findIndex((m) => m.id === id)
        : this.stack.length - 1
      if (idx >= 0) {
        const modal = this.stack[idx]
        if (modal.onClose) modal.onClose()
        this.stack.splice(idx, 1)
      }
    },
    closeAll() {
      this.stack.forEach((m) => m.onClose && m.onClose())
      this.stack = []
    },
  },
})
