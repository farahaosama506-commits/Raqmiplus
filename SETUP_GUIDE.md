# Installation & Setup Guide

## Prerequisites
- Node.js 16+ 
- npm or yarn
- Git (optional)

## Installation Steps

### 1. Install Dependencies
```bash
cd Raqmi-plus
npm install
```

This will install:
- vue@^3.4.0
- vue-router@^4.3.0
- pinia@^2.1.0        (State management)
- vue-i18n@^9.x       (Internationalization)
- tailwindcss@^3.4.0
- vite@^5.0.0
- And build tools

### 2. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or next available port if 5173 is in use)

### 3. Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder

## 📁 New Files Created

### Stores
- `src/stores/order.js` - Pinia store for order management

### Components
- `src/components/UserInfoModal.vue` - User information form modal

### Views
- `src/views/PaymentPage.vue` - Payment processing page

### Locales
- `src/locales/ar.json` - Arabic translations
- `src/locales/en.json` - English translations

### Documentation
- `PURCHASE_FLOW.md` - Complete purchase flow documentation

## 📝 Files Modified

### Core Files
- `src/main.js` - Added Pinia and i18n initialization
- `src/router/index.js` - Added payment route and navigation guard

### Components (Updated with i18n)
- `src/components/HeroSection.vue`
- `src/components/LiveNumbersSection.vue`
- `src/components/PaymentFooter.vue`
- `src/components/BundlesSection.vue` - Integrated UserInfoModal
- `src/views/HomePage.vue` - Updated navigation with i18n

## ✅ Verification Checklist

After installation, verify the following:

### 1. Application Loads
- [ ] App opens without console errors
- [ ] All sections visible and styled correctly
- [ ] Responsive design works on mobile/tablet/desktop

### 2. Purchase Flow Works
- [ ] Click "شراء الآن" on a bundle → UserInfoModal opens
- [ ] Fill form with valid data
- [ ] Form validation shows errors for invalid input
- [ ] Click "متابعة للدفع" → Navigate to `/payment/1`
- [ ] Payment page displays bundle info and payment methods
- [ ] Copy payment number button works
- [ ] Enter Transfer ID and click "تأكيد الطلب"
- [ ] Success modal displays after 2 seconds
- [ ] Click "العودة للرئيسية" → Return to home

### 3. Routing Guards
- [ ] Try accessing `/payment/1` directly → Redirect to home
- [ ] Complete user form → Can access payment page

### 4. i18n Localization
- [ ] All text displays in Arabic
- [ ] RTL layout applied correctly
- [ ] Form validation messages in Arabic

### 5. Styling & Animations
- [ ] Modals have smooth fade-in/fade-out
- [ ] Toast notifications appear with animations
- [ ] Hover effects work on buttons and cards
- [ ] Loading spinner shows during order submission

## 🔧 Development Tips

### Hot Module Replacement (HMR)
Vite automatically reloads when you modify files. Just save and the browser updates!

### Vue DevTools
Install Vue DevTools browser extension for:
- Component inspection
- Pinia store debugging
- Event tracking

### Browser Console
Monitor for:
- JavaScript errors
- i18n warnings
- Pinia state changes

## 📊 Testing the Purchase Flow

### Scenario 1: Valid Purchase
1. Go to home page
2. Click "شراء الآن" on first bundle
3. Enter:
   - First Name: أحمد
   - Last Name: علي
   - WhatsApp: +201012345678
   - Age: 30
   - Check terms checkbox
4. Click "متابعة للدفع"
5. Copy payment number
6. Enter any 6-20 digit number as Transfer ID
7. Click "تأقيد الطلب"
8. Verify success message

### Scenario 2: Form Validation
1. Click "شراء الآن"
2. Leave First Name empty
3. Click outside field → Error shows
4. Type invalid WhatsApp (e.g., "123") → Error shows
5. Enter Age < 16 → Error shows
6. Uncheck terms → Error shows

### Scenario 3: Access Control
1. Try visiting `http://localhost:5173/payment/1` directly
2. Should redirect to home page

## 🐛 Troubleshooting

### Issue: Port 5173 already in use
**Solution:** Vite automatically tries the next port (5174, 5175, etc.)

### Issue: npm packages not installing
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: i18n translations not showing
**Solution:**
- Check `src/main.js` has `app.use(i18n)`
- Verify locale files exist at `src/locales/`
- Check console for i18n warnings

### Issue: Pinia store undefined
**Solution:**
- Check `src/main.js` has `app.use(createPinia())`
- Import with: `import { useOrderStore } from '../stores/order'`
- Call hook: `const store = useOrderStore()`

### Issue: Routing not working
**Solution:**
- Check router imports in components
- Use `router.push()` or `<router-link>`
- Verify routes in `src/router/index.js`

## 📚 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [vue-i18n Documentation](https://vue-i18n.intlify.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🚀 Next Steps

1. **Customize for Production:**
   - Update company name/branding
   - Add real payment endpoints
   - Configure environment variables
   - Set up analytics

2. **Add Features:**
   - Order history page
   - User account management
   - WhatApp integration
   - Email confirmations

3. **Optimize:**
   - Code splitting
   - Image optimization
   - Caching strategy
   - SEO optimization

## 💬 Support

For issues or questions:
1. Check console for error messages
2. Review the comprehensive PURCHASE_FLOW.md
3. Verify all dependencies are installed
4. Check that all files are in correct locations

---

**Happy coding! 🎉**
