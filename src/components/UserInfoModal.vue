<template>
  <Teleport to="body">
    <Transition @enter="onEnter" @leave="onLeave">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="closeModal"
        ></div>

        <!-- Modal -->
        <div
          class="relative bg-slate-800/95 border border-slate-700/50 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            ✕
          </button>

          <!-- Title -->
          <h2 class="text-2xl font-bold text-white mb-6 pr-6">
            {{ $t('userInfo.title') }}
          </h2>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- First Name -->
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                {{ $t('userInfo.firstName') }}
                <span class="text-red-400">*</span>
              </label>
              <input
                v-model="formData.firstName"
                type="text"
                :placeholder="$t('userInfo.firstNamePlaceholder')"
                @blur="validateField('firstName')"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-700 transition-all"
              />
              <span
                v-if="errors.firstName"
                class="text-red-400 text-xs block mt-1"
              >
                {{ errors.firstName }}
              </span>
            </div>

            <!-- Last Name -->
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                {{ $t('userInfo.lastName') }}
                <span class="text-red-400">*</span>
              </label>
              <input
                v-model="formData.lastName"
                type="text"
                :placeholder="$t('userInfo.lastNamePlaceholder')"
                @blur="validateField('lastName')"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-700 transition-all"
              />
              <span v-if="errors.lastName" class="text-red-400 text-xs block mt-1">
                {{ errors.lastName }}
              </span>
            </div>

            <!-- WhatsApp Number -->
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                {{ $t('userInfo.whatsapp') }}
                <span class="text-red-400">*</span>
              </label>
              <input
                v-model="formData.whatsapp"
                type="text"
                :placeholder="$t('userInfo.whatsappPlaceholder')"
                @blur="validateField('whatsapp')"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-700 transition-all"
              />
              <span v-if="errors.whatsapp" class="text-red-400 text-xs block mt-1">
                {{ errors.whatsapp }}
              </span>
            </div>

            <!-- Age -->
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                {{ $t('userInfo.age') }}
                <span class="text-red-400">*</span>
              </label>
              <input
                v-model.number="formData.age"
                type="number"
                :placeholder="$t('userInfo.agePlaceholder')"
                min="16"
                max="99"
                @blur="validateField('age')"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-slate-700 transition-all"
              />
              <span v-if="errors.age" class="text-red-400 text-xs block mt-1">
                {{ errors.age }}
              </span>
            </div>

            <!-- Terms Checkbox -->
            <div class="flex items-start gap-3 py-2">
              <input
                v-model="formData.agreeTerms"
                type="checkbox"
                id="terms"
                class="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 cursor-pointer"
              />
              <label for="terms" class="text-sm text-gray-300 cursor-pointer">
                {{ $t('userInfo.terms') }}
                <span class="text-red-400">*</span>
              </label>
            </div>
            <span v-if="errors.agreeTerms" class="text-red-400 text-xs block">
              {{ errors.agreeTerms }}
            </span>

            <!-- Buttons -->
            <div class="flex gap-3 pt-6">
              <button
                type="submit"
                :disabled="!isFormValid"
                class="flex-1 px-4 py-3 bg-gradient-to-l from-purple-400 to-purple-600 hover:from-purple-300 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                {{ $t('userInfo.proceedToPayment') }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all"
              >
                {{ $t('userInfo.cancel') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useOrderStore } from '../stores/order'

const { t } = useI18n()
const router = useRouter()
const orderStore = useOrderStore()
const showToast = inject('showToast')

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  bundle: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['close'])

// Form Data
const formData = ref({
  firstName: '',
  lastName: '',
  whatsapp: '',
  age: null,
  agreeTerms: false
})

const errors = ref({
  firstName: '',
  lastName: '',
  whatsapp: '',
  age: '',
  agreeTerms: ''
})

// Validation regex
const whatsappRegex = /^\+[1-9]\d{9,14}$/

// Validation
const validateField = (field) => {
  const value = formData.value[field]

  switch (field) {
    case 'firstName':
      errors.value.firstName = !value ? t('userInfo.required') : ''
      break
    case 'lastName':
      errors.value.lastName = !value ? t('userInfo.required') : ''
      break
    case 'whatsapp':
      if (!value) {
        errors.value.whatsapp = t('userInfo.required')
      } else if (!whatsappRegex.test(value)) {
        errors.value.whatsapp = t('userInfo.invalidWhatsapp')
      } else {
        errors.value.whatsapp = ''
      }
      break
    case 'age':
      if (!value) {
        errors.value.age = t('userInfo.required')
      } else if (value < 16 || value > 99) {
        errors.value.age = t('userInfo.invalidAge')
      } else {
        errors.value.age = ''
      }
      break
    case 'agreeTerms':
      errors.value.agreeTerms = !value ? t('userInfo.termsRequired') : ''
      break
  }
}

// Check if form is valid
const isFormValid = computed(() => {
  return (
    formData.value.firstName &&
    formData.value.lastName &&
    formData.value.whatsapp &&
    formData.value.age &&
    formData.value.agreeTerms &&
    whatsappRegex.test(formData.value.whatsapp) &&
    formData.value.age >= 16 &&
    formData.value.age <= 99
  )
})

// Handle submit
const handleSubmit = () => {
  if (!isFormValid.value) {
    showToast(t('errors.pleaseCompleteForm'), 'error')
    return
  }

  // Save user info to store
  orderStore.setUser({
    firstName: formData.value.firstName,
    lastName: formData.value.lastName,
    whatsapp: formData.value.whatsapp,
    age: formData.value.age
  })

  // Close modal
  closeModal()

  // Navigate to payment page
  if (props.bundle) {
    router.push(`/payment/${props.bundle.id}`)
  }
}

// Close modal
const closeModal = () => {
  resetForm()
  emit('close')
}

// Reset form
const resetForm = () => {
  formData.value = {
    firstName: '',
    lastName: '',
    whatsapp: '',
    age: null,
    agreeTerms: false
  }
  errors.value = {
    firstName: '',
    lastName: '',
    whatsapp: '',
    age: '',
    agreeTerms: ''
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

// Reset form when isOpen changes
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      resetForm()
    }
  }
)
</script>
