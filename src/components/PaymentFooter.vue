<template>
  <footer
    class="sticky bottom-0 z-40 border-t border-slate-700/30 bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm"
  >
    <div class="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
      <p class="text-center text-gray-400 text-sm md:text-base mb-6">
        {{ $t('payment.footer') }}
      </p>

      <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
        <!-- Syriatel Cash Button -->
        <button
          @click="handlePayment('سيريتل كاش')"
          class="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-l from-orange-400 to-orange-600 hover:from-orange-300 hover:to-orange-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <span class="text-2xl">📱</span>
          <span>{{ $t('payment.syriatelCash') }}</span>
        </button>

        <!-- Cham Cash Button -->
        <button
          @click="handlePayment('شام كاش')"
          class="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-l from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <span class="text-2xl">💚</span>
          <span>{{ $t('payment.chamCash') }}</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { inject } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const showToast = inject('showToast')

const generatePaymentNumber = () => {
  // Generate a mock payment number
  const prefix = '099'
  const randomNum = String(Math.floor(Math.random() * 10000000)).padStart(7, '0')
  return `${prefix}${randomNum}`
}

const handlePayment = (method) => {
  const paymentNumber = generatePaymentNumber()
  const message = `تم نسخ رقم الدفع: ${paymentNumber}`
  
  try {
    navigator.clipboard.writeText(paymentNumber)
    showToast(message, 'success')
  } catch (error) {
    // Fallback: use alert if clipboard fails
    alert(message)
  }
}
</script>
