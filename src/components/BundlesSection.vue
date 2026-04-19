<template>
  <section
    id="bundles"
    class="relative py-20 px-4 md:px-8 lg:px-12 bg-slate-950/50"
  >
    <!-- Decorative Background -->
    <div
      class="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          {{ $t('bundles.title') }}
        </h2>
        <div class="h-1 w-20 bg-gradient-to-l from-emerald-400 to-emerald-600 mx-auto rounded-full"></div>
      </div>

      <!-- Bundles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div
          v-for="bundle in bundles"
          :key="bundle.id"
          class="group relative rounded-xl overflow-hidden transition-all duration-300 border border-slate-700/30 hover:border-emerald-500/50"
        >
          <!-- Background -->
          <div
            class="absolute inset-0 bg-gradient-to-b from-slate-800/70 to-slate-900/70"
          ></div>

          <!-- Hover Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-b from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>

          <!-- Content -->
          <div class="relative z-10 p-8 h-full flex flex-col justify-between">
            <!-- Header -->
            <div class="mb-6">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-3">
                {{ bundle.title }}
              </h3>
              <p class="text-gray-300 text-sm md:text-base leading-relaxed">
                {{ bundle.description }}
              </p>
            </div>

            <!-- Divider -->
            <div class="h-px bg-gradient-to-l from-slate-700/30 to-transparent my-6"></div>

            <!-- Footer with Price and Button -->
            <div class="flex items-end justify-between gap-4">
              <div>
                <span class="text-gray-400 text-xs block mb-1">{{ $t('paymentPage.price') }}</span>
                <span class="text-3xl md:text-4xl font-bold text-emerald-400">
                  {{ bundle.price }}
                </span>
              </div>
              <button
                @click="openUserInfoModal(bundle)"
                class="flex-shrink-0 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-l from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 text-slate-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                {{ $t('bundles.buyNow') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- User Info Modal -->
    <UserInfoModal
      :isOpen="showUserInfoModal"
      :bundle="selectedBundle"
      @close="closeUserInfoModal"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useOrderStore } from '../stores/order'
import UserInfoModal from './UserInfoModal.vue'

const { t } = useI18n()
const orderStore = useOrderStore()

const bundles = ref([
  {
    id: 1,
    title: 'ملف أرقام ألمانيا 🇩🇪',
    description: '20 رقم صالح للتفعيل والتسجيل',
    price: '10 دولار'
  },
  {
    id: 2,
    title: 'ملف أرقام أمريكا VIP 🇺🇸',
    description: '50 رقم صالح للتفعيل والتسجيل',
    price: '10 دولار'
  },
    {
    id: 3,
    title: ' ملف ارقام فنزويلا   VIP 🇺🇸',
    description: '50 رقم صالح للتفعيل والتسجيل',
    price: '3 دولار'
  },
    {
    id: 4,
    title: 'ملف ارقام اندونيسيا   VIP 🇺🇸',
    description: '50 رقم صالح للتفعيل والتسجيل',
    price: '3 دولار'
  },
   {
    id: 5,
    title: ' ملفات ارقام متنوعة     VIP 🇺🇸',
    description: '50 رقم صالح للتفعيل والتسجيل',
    price: '10 دولار'
  }
])

const showUserInfoModal = ref(false)
const selectedBundle = ref(null)

const openUserInfoModal = (bundle) => {
  selectedBundle.value = bundle
  orderStore.setSelectedBundle(bundle)
  showUserInfoModal.value = true
}

const closeUserInfoModal = () => {
  showUserInfoModal.value = false
  selectedBundle.value = null
}
</script>
