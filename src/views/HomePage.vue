<template>
  <div class="min-h-screen bg-slate-950 flex flex-col">
    <!-- Sticky Navigation Bar -->
    <nav
      class="sticky top-0 z-30 border-b border-slate-700/30 bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm"
    >
      <div class="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <a href="#" class="inline-flex items-center">
            <LogoIcon />
          </a>
        </div>

        <!-- Navigation Links -->
        <div class="flex items-center gap-6 md:gap-8">
          <a
            href="#"
            @click.prevent="scrollToSection('hero')"
            class="text-gray-300 hover:text-white transition-colors font-semibold text-sm md:text-base"
          >
            {{ $t('nav.home') }}
          </a>
          <a
            href="#"
            @click.prevent="scrollToSection('live-numbers')"
            class="text-gray-300 hover:text-white transition-colors font-semibold text-sm md:text-base"
          >
            {{ $t('nav.numbers') }}
          </a>
          <a
            href="#"
            @click.prevent="scrollToSection('bundles')"
            class="text-gray-300 hover:text-white transition-colors font-semibold text-sm md:text-base"
          >
            {{ $t('nav.bundles') }}
          </a>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col">
      <!-- Hero Section -->
      <div id="hero">
        <HeroSection />
      </div>

      <!-- Live Numbers Section -->
      <div id="live-numbers">
        <LiveNumbersSection />
      </div>

      <!-- Bundles Section -->
      <div id="bundles">
        <BundlesSection />
      </div>
    </main>

    <!-- Payment Footer -->
    <PaymentFooter />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import HeroSection from '../components/HeroSection.vue'
import LiveNumbersSection from '../components/LiveNumbersSection.vue'
import BundlesSection from '../components/BundlesSection.vue'
import PaymentFooter from '../components/PaymentFooter.vue'
import LogoIcon from '../components/LogoIcon.vue'

const { t } = useI18n()

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
