<script setup lang="ts">
import { useModal } from '@/composables/useModal'
import Button from '@/components/Button/Button.vue'
const { open } = useModal()
const toggleModal = () => {
  open({
    title: 'Example Modal 3',
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
    <input type="text" name="example" id="example" />
    <Button @click="toggleModal">Toggle 2nd modal</Button>
  </div>
</template>

<style scoped lang="scss"></style>
