<script setup lang="ts">
import { useModal } from '@/composables/useModal'
const { open } = useModal()
const toggleModal = () => {
  open({
    title: 'Example Modal',
    content: '<p>This is an example modal content.</p>',
    disableOutsideClick: true,
  })
}
</script>
<template>
  <div>
    <h3>Modal Test Content</h3>
    <p>This is a test content for the modal.</p>
    <p>It can include any Vue component or HTML content.</p>
    <p>Feel free to customize it as needed!</p>
    <Button @click="toggleModal">Toggle 2nd modal</Button>
  </div>
</template>

<style scoped lang="scss"></style>
