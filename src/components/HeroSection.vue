<template>
  <section
    class="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
  >
    <!-- Decorative Background Elements -->
    <div
      class="absolute top-20 right-32 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
    ></div>
    <div class="absolute bottom-20 left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>

    <!-- Main Content -->
    <div class="relative z-10 text-center max-w-4xl">
      <div class="flex items-center justify-center mb-8">
        <LogoIcon />
      </div>
      <!-- Logo/Title -->
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-l from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent">
        {{ $t('hero.title') }}
      </h1>

      <!-- Subtitle -->
      <p class="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
        {{ $t('hero.subtitle') }}
      </p>

      <!-- Flag Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-12">
        <div
          v-for="flag in flags"
          :key="flag.id"
          class="group relative px-6 py-8 rounded-xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
        >
          <!-- Hover Gradient Background -->
          <div
            class="absolute inset-0 rounded-xl bg-gradient-to-b from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>

          <!-- Content -->
          <div class="relative z-10">
            <div class="text-4xl mb-3">{{ flag.emoji }}</div>
            <div class="text-white font-semibold text-lg">{{ flag.label }}</div>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <button
        @click="scrollToLiveNumbers"
        class="inline-block px-8 py-3 md:px-10 md:py-4 bg-gradient-to-l from-purple-400 to-purple-600 hover:from-purple-300 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        {{ $t('hero.browseNumbers') }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LogoIcon from './LogoIcon.vue'

const { t } = useI18n()

const flags = ref([
  {
    id: 1,
    label: 'فنزويلا',
    emoji: '🇻🇪'
  },
  {
    id: 2,
    label: 'ألمانيا',
    emoji: '🇩🇪'
  },
  {
    id: 3,
    label: 'أمريكا',
    emoji: '🇺🇸'
  }
])

const scrollToLiveNumbers = () => {
  const element = document.getElementById('live-numbers')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
