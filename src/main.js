import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import router from './router'
import ar from './locales/ar.json'
import en from './locales/en.json'

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'ar',
  messages: {
    ar,
    en
  },
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false
})

const app = createApp(App)

// Register Pinia
app.use(createPinia())

// Register i18n
app.use(i18n)

// Register router
app.use(router)

app.mount('#app')
