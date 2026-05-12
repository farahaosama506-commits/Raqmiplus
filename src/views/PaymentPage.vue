<template>
  <div dir="rtl" lang="ar" class="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-8 px-4 md:px-8">
    <!-- Top Navigation -->
    <div class="max-w-4xl mx-auto mb-8">
      <router-link
        to="/"
        class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-semibold"
      >
        <span>←</span>
        <span>{{ $t('paymentPage.back') }}</span>
      </router-link>
    </div>

    <div class="max-w-4xl mx-auto">
      <!-- Bundle Summary Card -->
      <div
        class="mb-8 rounded-xl bg-gradient-to-b from-slate-800/70 to-slate-900/70 border border-slate-700/30 p-6 md:p-8"
      >
        <h2 class="text-2xl font-bold text-white mb-4">
          {{ $t('paymentPage.bundleSummary') }}
        </h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-400">{{ $t('paymentPage.bundleName') }}</span>
            <span class="text-xl font-bold text-white">
              {{ selectedBundle.name }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-400">{{ $t('paymentPage.country') }}</span>
            <span class="text-xl font-bold text-white">
              {{ selectedBundle.country }} {{ selectedBundle.flag }}
            </span>
          </div>
          <div class="h-px bg-slate-700/30"></div>
          <div class="flex items-center justify-between">
            <span class="text-gray-400">{{ $t('paymentPage.price') }}</span>
            <span class="text-3xl font-bold text-emerald-400">
              {{ selectedBundle.price }}
            </span>
          </div>
        </div>
      </div>

      <!-- Payment Method Selection -->
      <div class="mb-8">
        <h3 class="text-2xl font-bold text-white mb-6">
          {{ $t('paymentPage.selectPaymentMethod') }}
        </h3>

        <div class="space-y-4">
          <!-- Syriatel Cash Card -->
          <div
            @click="selectPaymentMethod('syriatel')"
            :class="[
              'relative rounded-xl border p-6 cursor-pointer transition-all transform hover:scale-105',
              selectedPaymentMethod === 'syriatel'
                ? 'bg-gradient-to-b from-orange-900/40 to-orange-950/40 border-orange-500/50 ring-2 ring-orange-500/30'
                : 'bg-slate-800/70 border-slate-700/30 hover:border-orange-500/30'
            ]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="text-4xl">📱</div>
                <div>
                  <h4 class="text-lg font-bold text-white">
                    {{ $t('payment.syriatelCash') }}
                  </h4>
                  <p class="text-sm text-gray-400">{{ $t('payment.syriatelCashDesc') }}</p>
                </div>
              </div>
              <div
                v-if="selectedPaymentMethod === 'syriatel'"
                class="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center"
              >
                <span class="text-white text-lg">✓</span>
              </div>
            </div>
          </div>

          <!-- Cham Cash Card -->
          <div
            @click="selectPaymentMethod('cham')"
            :class="[
              'relative rounded-xl border p-6 cursor-pointer transition-all transform hover:scale-105',
              selectedPaymentMethod === 'cham'
                ? 'bg-gradient-to-b from-emerald-900/40 to-emerald-950/40 border-emerald-500/50 ring-2 ring-emerald-500/30'
                : 'bg-slate-800/70 border-slate-700/30 hover:border-emerald-500/30'
            ]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="text-4xl">💚</div>
                <div>
                  <h4 class="text-lg font-bold text-white">
                    {{ $t('payment.chamCash') }}
                  </h4>
                  <p class="text-sm text-gray-400">{{ $t('payment.chamCashDesc') }}</p>
                </div>
              </div>
              <div
                v-if="selectedPaymentMethod === 'cham'"
                class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
              >
                <span class="text-white text-lg">✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transfer Details -->
      <div
        v-if="selectedPaymentMethod"
        class="space-y-6 mb-8"
      >
        <!-- Transfer Number Box -->
        <div
          class="rounded-xl p-6 md:p-8"
          :class="selectedPaymentMethod === 'cham' 
            ? 'bg-gradient-to-b from-emerald-900/20 to-emerald-950/30 border border-emerald-500/30' 
            : 'bg-gradient-to-b from-orange-900/20 to-orange-950/30 border border-orange-500/30'"
        >
          <h4 class="text-sm font-semibold text-gray-400 mb-4">
            {{ $t('paymentPage.transferNumber') }}
          </h4>
          
          <div class="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div 
              class="text-3xl md:text-4xl font-bold font-mono"
              :class="selectedPaymentMethod === 'cham' ? 'text-emerald-400' : 'text-orange-400'"
            >
              {{ currentPaymentNumber }}
            </div>
            <button
              @click="copyPaymentNumber"
              class="px-6 py-3 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95"
              :class="selectedPaymentMethod === 'cham' 
                ? 'bg-emerald-600 hover:bg-emerald-500' 
                : 'bg-orange-600 hover:bg-orange-500'"
            >
              {{ $t('paymentPage.copyNumber') }}
            </button>
          </div>

          <!-- QR Code -->
        <div v-if="qrCodeDataUrl && selectedPaymentMethod === 'cham'" class="flex flex-col items-center gap-3 pt-6 border-t border-slate-700/50">
            <p class="text-gray-400 text-sm">{{ $t('paymentPage.scanQR') }}</p>
            <div class="bg-white p-4 rounded-xl">
              <img :src="qrCodeDataUrl" alt="Payment QR Code" class="w-48 h-48" />
            </div>
            <p class="text-gray-500 text-xs">{{ $t('paymentPage.qrHint') }}</p>
          </div>
        </div>

        <!-- Instructions -->
        <div class="p-6 bg-slate-800/50 rounded-xl border border-slate-700/30">
          <p class="text-gray-300 text-sm leading-relaxed">
            {{ $t('paymentPage.instructions') }}
          </p>
        </div>

        <!-- Transfer ID Input -->
        <div>
          <label class="block text-sm font-semibold text-gray-300 mb-3">
            {{ $t('paymentPage.transferId') }}
            <span class="text-red-400">*</span>
          </label>
          <input
            v-model="transferId"
            type="text"
            :placeholder="$t('paymentPage.transferIdPlaceholder')"
            @blur="validateTransferId"
            class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-slate-700 transition-all text-lg"
          />
          <span v-if="errors.transferId" class="text-red-400 text-sm block mt-2">
            {{ errors.transferId }}
          </span>
          <span class="text-gray-500 text-xs block mt-2">
            {{ transferId.length }} / 20 {{ $t('paymentPage.characters') }}
          </span>
        </div>
      </div>

      <!-- Confirm Order Button -->
      <button
        @click="handleConfirmOrder"
        :disabled="!isPaymentValid || isProcessing"
        class="w-full py-4 bg-gradient-to-l from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 text-lg"
      >
        <span v-if="!isProcessing">{{ $t('paymentPage.confirmOrder') }}</span>
        <span v-else class="flex items-center justify-center gap-2">
          <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ $t('paymentPage.processing') }}
        </span>
      </button>

      <!-- Success Modal -->
      <Teleport to="body">
        <Transition @enter="onEnter" @leave="onLeave">
          <div
            v-if="showSuccessModal"
            class="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div
              class="relative bg-slate-800/95 border border-slate-700/50 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center"
            >
              <div class="text-5xl mb-4">✅</div>
              <h3 class="text-2xl font-bold text-white mb-4">
                {{ $t('success.title') }}
              </h3>
              <p class="text-gray-300 mb-8 leading-relaxed">
                {{
                  $t('success.message', {
                    firstName: orderStore.user.firstName,
                    whatsapp: orderStore.user.whatsapp
                  })
                }}
              </p>
              <router-link
                to="/"
                class="inline-block px-8 py-3 bg-gradient-to-l from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                {{ $t('success.backToHome') }}
              </router-link>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useOrderStore } from '../stores/order'
import QRCode from 'qrcode'

const { t } = useI18n()
const router = useRouter()
const orderStore = useOrderStore()
const showToast = inject('showToast')

// Check user info exists before allowing access
onMounted(() => {
  if (!orderStore.hasUserInfo()) {
    router.push('/')
  }
})

const selectedPaymentMethod = ref('syriatel')
const syriatelNumber = ref('932677477')
const chamCashNumber = ref('099XXXXXXX') // 🔥 حط رقم شام كاش الحقيقي
const transferId = ref('')
const isProcessing = ref(false)
const showSuccessModal = ref(false)
const qrCodeDataUrl = ref('')

// 🔥 رقم الدفع الحالي حسب الاختيار
const currentPaymentNumber = computed(() => {
  return selectedPaymentMethod.value === 'cham' ? chamCashNumber.value : syriatelNumber.value
})

const errors = ref({
  transferId: ''
})

// Get selected bundle from store
const selectedBundle = computed(() => {
  return orderStore.selectedBundle
})

// 🔥 توليد الباركود
const generateQRCode = async (text) => {
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(text, {
      width: 200,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' }
    })
  } catch (error) {
    console.error('QR Code generation failed:', error)
  }
}

// 🔥 تغيير الباركود عند تغيير طريقة الدفع
watch(selectedPaymentMethod, (newMethod) => {
  const number = newMethod === 'cham' ? chamCashNumber.value : syriatelNumber.value
  generateQRCode(number)
}, { immediate: true })

// Validate Transfer ID
const validateTransferId = () => {
  const value = transferId.value
  
  if (!value) {
    errors.value.transferId = t('userInfo.required')
  } else if (value.length < 6 || value.length > 20) {
    errors.value.transferId = t('paymentPage.invalidTransferId')
  } else {
    errors.value.transferId = ''
  }
}

// Check if payment form is valid
const isPaymentValid = computed(() => {
  return selectedPaymentMethod.value && transferId.value && transferId.value.length >= 6 && transferId.value.length <= 20
})

// Select payment method
const selectPaymentMethod = (method) => {
  selectedPaymentMethod.value = method
  orderStore.setPaymentMethod(method)
}

// Copy payment number
const copyPaymentNumber = async () => {
  try {
    await navigator.clipboard.writeText(currentPaymentNumber.value)
    showToast(t('notifications.numberCopied'), 'success')
  } catch (error) {
    showToast(t('notifications.error'), 'error')
  }
}

// Handle confirm order
const handleConfirmOrder = async () => {
  validateTransferId()

  if (!isPaymentValid.value) {
    showToast(t('errors.pleaseCompleteForm'), 'error')
    return
  }

  isProcessing.value = true

  try {
    orderStore.setTransferId(transferId.value)
    orderStore.setPaymentMethod(selectedPaymentMethod.value)

    const result = await orderStore.submitOrder()

    if (result.success) {
      showSuccessModal.value = true
    } else {
      showToast(result.message, 'error')
    }
  } catch (error) {
    showToast(t('errors.orderFailed'), 'error')
  } finally {
    isProcessing.value = false
  }
}

// Animations
const onEnter = (el) => {
  el.style.opacity = '0'
  el.offsetHeight
  el.style.transition = 'opacity 0.3s ease'
  el.style.opacity = '1'
}

const onLeave = (el) => {
  el.style.transition = 'opacity 0.3s ease'
  el.style.opacity = '0'
}
</script>