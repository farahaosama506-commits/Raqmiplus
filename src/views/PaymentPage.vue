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
            <span class="text-gray-400">{{ $t('bundles.title') }}</span>
            <span class="text-xl font-bold text-white">
              {{ selectedBundle.title }}
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
                  <p class="text-sm text-gray-400">{{ $t('payment.syriatelCash') }}</p>
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

          <!-- Cham Cash Card (Disabled) -->
          <div
            :class="[
              'relative rounded-xl border p-6 opacity-50',
              'bg-slate-800/70 border-slate-700/30 cursor-not-allowed'
            ]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="text-4xl">💚</div>
                <div>
                  <h4 class="text-lg font-bold text-gray-400">
                    {{ $t('payment.chamCash') }}
                  </h4>
                  <p class="text-sm text-gray-500">{{ $t('paymentPage.comingSoon') }}</p>
                </div>
              </div>
              <span
                class="text-xs font-bold px-3 py-1 bg-slate-700 text-gray-400 rounded-full"
              >
                {{ $t('paymentPage.comingSoon') }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Syriatel Transfer Details -->
      <div
        v-if="selectedPaymentMethod === 'syriatel'"
        class="space-y-6 mb-8"
      >
        <!-- Transfer Number Box -->
        <div
          class="rounded-xl bg-gradient-to-b from-orange-900/20 to-orange-950/30 border border-orange-500/30 p-6 md:p-8"
        >
          <h4 class="text-sm font-semibold text-gray-400 mb-4">
            {{ $t('paymentPage.transferNumber') }}
          </h4>
          <div class="flex items-center justify-between gap-4 flex-wrap">
            <div class="text-3xl md:text-4xl font-bold text-orange-400 font-mono">
              {{ paymentNumber }}
            </div>
            <button
              @click="copyPaymentNumber"
              class="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              {{ $t('paymentPage.copyNumber') }}
            </button>
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
            {{ transferId.length }} / 20 {{ $t('paymentPage.transferId') }}
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
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            <!-- Modal -->
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
import { ref, computed, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useOrderStore } from '../stores/order'

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
const paymentNumber = ref('099' + String(Math.floor(Math.random() * 10000000)).padStart(7, '0'))
const transferId = ref('')
const isProcessing = ref(false)
const showSuccessModal = ref(false)

const errors = ref({
  transferId: ''
})

// Get selected bundle from store or route
const selectedBundle = computed(() => {
  return orderStore.selectedBundle
})

// Validate Transfer ID
const validateTransferId = () => {
  const value = transferId.value
  
  if (!value) {
    errors.value.transferId = t('userInfo.required')
  } else if (!/^\d{6,20}$/.test(value)) {
    errors.value.transferId = t('paymentPage.invalidTransferId')
  } else {
    errors.value.transferId = ''
  }
}

// Check if payment form is valid
const isPaymentValid = computed(() => {
  return selectedPaymentMethod.value === 'syriatel' && transferId.value && /^\d{6,20}$/.test(transferId.value)
})

// Select payment method
const selectPaymentMethod = (method) => {
  selectedPaymentMethod.value = method
  orderStore.setPaymentMethod(method)
}

// Copy payment number
const copyPaymentNumber = async () => {
  try {
    await navigator.clipboard.writeText(paymentNumber.value)
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
    // Set transfer ID in store
    orderStore.setTransferId(transferId.value)

    // Submit order (with 2 second delay simulation)
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
