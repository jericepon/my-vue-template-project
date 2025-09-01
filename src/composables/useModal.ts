import type { ModalState } from '@/stores/modal'
import { useModalStore } from '@/stores/modal'
import { storeToRefs } from 'pinia'
import type { Component } from 'vue'

function generateId() {
  return 'modal_' + Math.random().toString(36).substr(2, 9)
}

export function useModal() {
  const modalStore = useModalStore()
  const { stack } = storeToRefs(modalStore)

  function open(
    modal: Omit<
      ModalState['stack'][0],
      'isOpen' | 'id' | 'component' | 'disableOutsideClick'
    > & {
      component?: Component
      componentProps?: Record<string, any>
      disableOutsideClick?: boolean
    },
  ) {
    const id = generateId()
    modalStore.open({
      ...modal,
      id,
      component: modal.component,
      componentProps: modal.componentProps,
      disableOutsideClick: modal.disableOutsideClick,
    })
    return id
  }
  function close(id?: string) {
    modalStore.close(id)
  }
  function closeAll() {
    modalStore.closeAll()
  }

  return {
    stack: stack,
    open,
    close,
    closeAll,
  }
}

// ...existing code...
