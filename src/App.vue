<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import Modal from '@/components/Modal/Modal.vue'
import { useModal } from './composables/useModal'
import ModalTestContent from './components/ModalTestContent.vue'

const { open } = useModal()
const toggleModal = () => {
  open({
    title: 'First Example Modal',
    content: '<p>This is an first example modal content.</p>',
  })
}

const toggle2ndModal = () => {
  open({
    title: 'Second Modal',
    content: '<p>This is the content of the second modal.</p>',
    component: ModalTestContent,
  })
}
</script>

<template>
  <Button color="primary" @click="toggleModal">Modal 1</Button>
  <Button color="primary" @click="toggle2ndModal">Modal 2</Button>
  <Modal />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
