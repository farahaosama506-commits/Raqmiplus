<template>
  <section
    id="live-numbers"
    class="relative py-20 px-4 md:px-8 lg:px-12 bg-slate-900/50"
  >
    <!-- Decorative Background -->
    <div
      class="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          {{ $t('liveNumbers.title') }}
        </h2>
        <div class="h-1 w-20 bg-gradient-to-l from-purple-400 to-purple-600 mx-auto rounded-full"></div>
      </div>

      <!-- Numbers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="number in numbers"
          :key="number.id"
          :class="[
            'group relative rounded-xl p-6 transition-all duration-300 overflow-hidden',
            number.status === 'متاح'
              ? 'bg-gradient-to-b from-slate-800/70 to-slate-900/70 border border-slate-700/30 hover:border-purple-500/50 hover:from-slate-800 hover:to-slate-900'
              : 'bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-700/20 opacity-60'
          ]"
        >
          <!-- Hover Gradient Overlay -->
          <div
            v-if="number.status === 'متاح'"
            class="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>

          <!-- Content -->
          <div class="relative z-10">
            <!-- Header: Flag and Country -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <span class="text-3xl">{{ number.flag }}</span>
                <span class="text-sm text-gray-400">{{ number.country }}</span>
              </div>
              <div
                :class="[
                  'text-xs font-bold px-3 py-1 rounded-full',
                  number.status === 'متاح'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-red-500/20 text-red-300'
                ]"
              >
                {{ number.status === 'متاح' ? $t('liveNumbers.available') : $t('liveNumbers.sold') }}
              </div>
            </div>

            <!-- Phone Number - Large Display -->
            <div class="text-2xl md:text-3xl font-bold text-white mb-4 font-mono text-center py-2">
              {{ number.number }}
            </div>

            <!-- Footer: Price and Action -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-700/30">
              <span class="text-lg font-bold text-purple-300">{{ number.price }}$</span>
              <button
                @click="copyToClipboard(number.number)"
                :disabled="number.status !== 'متاح'"
                :class="[
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300',
                  number.status === 'متاح'
                    ? 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer hover:transform hover:scale-105 active:scale-95'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                ]"
              >
                <span>📋</span>
                <span>{{ $t('liveNumbers.copy') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const showToast = inject('showToast')

const numbers = ref([
  {
    id: 1,
    number: '+58 412-1234567',
    country: 'فنزويلا',
    flag: '🇻🇪',
    price: '2.5',
    status: 'متاح'
  },
  {
    id: 2,
    number: '+49 152-2345678',
    country: 'ألمانيا',
    flag: '🇩🇪',
    price: '3.0',
    status: 'متاح'
  },
  {
    id: 3,
    number: '+1 212-3456789',
    country: 'أمريكا',
    flag: '🇺🇸',
    price: '4.0',
    status: 'متاح'
  },
  {
    id: 4,
    number: '+58 414-9876543',
    country: 'فنزويلا',
    flag: '🇻🇪',
    price: '2.5',
    status: 'متاح'
  },
  {
    id: 5,
    number: '+49 157-8765432',
    country: 'ألمانيا',
    flag: '🇩🇪',
    price: '3.0',
    status: 'تم البيع'
  },
  {
    id: 6,
    number: '+1 310-7654321',
    country: 'أمريكا',
    flag: '🇺🇸',
    price: '4.0',
    status: 'متاح'
  }
])

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showToast(`تم نسخ: ${text}`, 'success')
  } catch (error) {
    showToast('فشل النسخ', 'error')
  }
}
</script>
