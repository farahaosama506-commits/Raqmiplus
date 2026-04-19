import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  // State
  const user = ref({
    firstName: '',
    lastName: '',
    whatsapp: '',
    age: null
  })

  const selectedBundle = ref({
    id: null,
    title: '',
    description: '',
    price: ''
  })

  const paymentMethod = ref('syriatel')
  const transferId = ref('')
  const orderStatus = ref('pending') // pending, processing, completed, failed
  const orderDate = ref(null)

  // Getters
  const hasUserInfo = () => {
    return user.value.firstName && user.value.lastName && user.value.whatsapp && user.value.age
  }

  const hasValidUserInfo = () => {
    const whatsappRegex = /^\+[1-9]\d{9,14}$/
    return (
      user.value.firstName &&
      user.value.lastName &&
      whatsappRegex.test(user.value.whatsapp) &&
      user.value.age >= 16 &&
      user.value.age <= 99
    )
  }

  // Actions
  const setUser = (userInfo) => {
    user.value = {
      ...user.value,
      ...userInfo
    }
  }

  const setSelectedBundle = (bundle) => {
    selectedBundle.value = bundle
  }

  const setTransferId = (id) => {
    transferId.value = id
  }

  const setPaymentMethod = (method) => {
    paymentMethod.value = method
  }

  const submitOrder = async () => {
    try {
      orderStatus.value = 'processing'
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      orderDate.value = new Date().toISOString()
      orderStatus.value = 'completed'
      
      return {
        success: true,
        orderId: `ORD-${Date.now()}`,
        message: 'Order created successfully'
      }
    } catch (error) {
      orderStatus.value = 'failed'
      return {
        success: false,
        message: error.message || 'Order creation failed'
      }
    }
  }

  const resetOrder = () => {
    user.value = {
      firstName: '',
      lastName: '',
      whatsapp: '',
      age: null
    }
    selectedBundle.value = {
      id: null,
      title: '',
      description: '',
      price: ''
    }
    paymentMethod.value = 'syriatel'
    transferId.value = ''
    orderStatus.value = 'pending'
    orderDate.value = null
  }

  return {
    // State
    user,
    selectedBundle,
    paymentMethod,
    transferId,
    orderStatus,
    orderDate,
    
    // Getters
    hasUserInfo,
    hasValidUserInfo,
    
    // Actions
    setUser,
    setSelectedBundle,
    setTransferId,
    setPaymentMethod,
    submitOrder,
    resetOrder
  }
})
