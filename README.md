# رقمي بلس - Raqmi Plus

A premium, production-ready Vue.js 3 application for buying and managing international virtual phone numbers.

## 🎨 Design System: "The Digital Vault"

This application follows a high-end, editorial design system with:
- **Deep obsidian tones** with high-voltage purples and emeralds
- **Tonal layering** for depth (no borders)
- **Large-scale typography** for number displays
- **Premium glassmorphism** effects
- **100% RTL Arabic support**

## 📱 Features

- ✅ **Hero Section** with country selection
- ✅ **Live Numbers Marketplace** with copy-to-clipboard functionality
- ✅ **Bundle Packages** for bulk number purchases
- ✅ **Payment Methods** (Syriatel Cash & Sham Cash)
- ✅ **Toast Notifications** system
- ✅ **Sticky Navigation** with smooth scrolling
- ✅ **Fully Responsive** (Mobile-first design)
- ✅ **Zero Console Errors** (Production-ready)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
cd Raqmi-plus
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── App.vue                      # Root component with RTL setup
├── main.js                      # Vue app initialization
├── style.css                    # Global styles and Tailwind
├── components/
│   ├── HeroSection.vue         # Welcome section with flags
│   ├── LiveNumbersSection.vue  # Phone numbers marketplace
│   ├── BundlesSection.vue      # Number packages
│   ├── PaymentFooter.vue       # Payment methods (sticky)
│   └── Toast.vue               # Toast notification system
├── views/
│   └── HomePage.vue            # Main landing page
└── router/
    └── index.js                # Vue Router configuration

index.html                       # HTML entry point
package.json                     # Dependencies
vite.config.js                   # Vite configuration
tailwind.config.js               # Tailwind CSS configuration
postcss.config.js                # PostCSS configuration
```

## 🎯 Key Components

### HeroSection
- Website branding and tagline
- Three country cards (Venezuela, Germany, USA)
- CTA button with smooth scroll

### LiveNumbersSection
- Grid of 6 sample numbers (2 columns mobile, 3 columns desktop)
- Copy button with toast confirmation
- Status indicator (Available/Sold)
- Disabled state for unavailable numbers

### BundlesSection
- Two bundle offerings
- Purchase modal dialog
- Responsive card layout

### PaymentFooter
- Sticky positioning
- Two payment methods
- Generates mock payment numbers on click

## 🎨 Design Colors

- **Primary (Purple):** #dcb8ff → #8a2be2
- **Secondary (Emerald):** #66dd8b
- **Surface Base:** #131313
- **Surface Low:** #1c1b1b
- **Surface High:** #353534

## 📱 Responsive Breakpoints

- **Mobile:** 1 column
- **Tablet (md):** 2 columns
- **Desktop (lg/xl):** 3 columns

## 🔧 Technology Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router 4** - Client-side routing
- **Tailwind CSS 3** - Utility-first CSS framework
- **Vite** - Next-generation frontend tooling
- **Javaecript** - Plain ES modules (no TypeScript)

## 📝 Notes

- All text is in Arabic with RTL layout throughout
- No TypeScript - uses plain JavaScript for simplicity
- No console errors - production-ready code
- Smooth scroll behavior on all navigation links
- Custom toast component for notifications
- Clipboard API for copy functionality

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

Proprietary - Raqmi Plus 2024

## 🤝 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for a premium virtual number experience**
