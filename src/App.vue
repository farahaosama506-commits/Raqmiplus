<template>
  <div dir="rtl" lang="ar" class="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
    <!-- Global Toast Container -->
    <Teleport to="body">
      <ToastComponent ref="toastRef" />
    </Teleport>

    <!-- Router View -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import ToastComponent from './components/Toast.vue'

// Create a ref for the Toast component to be used globally
const toastRef = ref(null)

// Provide toast function to all child components
const showToast = (message, type = 'success', duration = 3000) => {
  if (toastRef.value) {
    toastRef.value.show(message, type, duration)
  }
}

provide('showToast', showToast)
</script>

<style>
html {
  scroll-behavior: smooth;
}

* {
  @apply antialiased;
}

body {
  font-family: 'IBM Plex Sans Arabic', 'Manrope', sans-serif;
}
</style>
