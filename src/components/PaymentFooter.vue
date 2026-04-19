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
      

        <!-- Cham Cash Button -->
    

        <!-- Telegram Contact Button -->
        <a
          href="https://t.me/raqmiplus"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-l from-sky-500 to-blue-700 hover:from-sky-400 hover:to-blue-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <span class="text-2xl">✈️</span>
          <span>تواصل عبر تيليجرام</span>
        </a>
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
