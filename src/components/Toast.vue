<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
    <Transition
      v-for="toast in toasts"
      :key="toast.id"
      appear
      @enter="onEnter"
      @leave="onLeave"
    >
      <div
        v-if="toast.visible"
        class="flex items-center gap-3 px-4 py-3 rounded-lg backdrop-blur-md"
        :class="[
          toast.type === 'success'
            ? 'bg-emerald-900/60 text-emerald-100'
            : toast.type === 'error'
              ? 'bg-red-900/60 text-red-100'
              : 'bg-slate-800/60 text-slate-100'
        ]"
      >
        <span class="text-lg">
          {{ toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ' }}
        </span>
        <span class="text-sm font-medium">{{ toast.message }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const toasts = reactive([])
let nextId = 0

const show = (message, type = 'success', duration = 3000) => {
  const id = nextId++
  const toast = reactive({
    id,
    message,
    type,
    visible: true
  })

  toasts.push(toast)

  setTimeout(() => {
    toast.visible = false
    setTimeout(() => {
      const index = toasts.findIndex((t) => t.id === id)
      if (index > -1) {
        toasts.splice(index, 1)
      }
    }, 300)
  }, duration)
}

const onEnter = (el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateX(-20px)'
  el.offsetHeight
  el.style.transition = 'all 0.3s ease'
  el.style.opacity = '1'
  el.style.transform = 'translateX(0)'
}

const onLeave = (el) => {
  el.style.transition = 'all 0.3s ease'
  el.style.opacity = '0'
  el.style.transform = 'translateX(-20px)'
}

defineExpose({ show })
</script>
