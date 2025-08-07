# Vue 3 + DevExtreme Enterprise Frontend Template

A comprehensive Vue 3 frontend template with DevExtreme UI components, featuring complete Chinese code comments and enterprise-level architecture.

## ✨ Features

- 🚀 **Vue 3** with Composition API and Script Setup syntax
- 🎨 **DevExtreme** enterprise UI component library
- 🔐 **JWT Authentication** system with complete auth flow
- 🌍 **Internationalization** support (Chinese, Japanese, Vietnamese)
- 🎭 **Theme System** with multiple color schemes and dark/light modes
- 📱 **Responsive Design** for all device sizes
- 🏗️ **Modular Architecture** with clear service layer separation
- 📚 **Comprehensive Chinese Comments** on every file and function
- 📖 **Complete Documentation** and usage guides

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3.5+
- **Build Tool**: Vite 7.0+
- **UI Library**: DevExtreme 23.1.5
- **Router**: Vue Router 4.5+
- **HTTP Client**: Axios 1.11+
- **CSS Preprocessor**: Sass
- **Code Quality**: ESLint

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/Vue3-DevExtreme-Template.git

# Navigate to project directory
cd Vue3-DevExtreme-Template

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── main.js                    # Application entry point
├── App.vue                    # Root component
├── router.js                  # Vue Router configuration
├── auth.js                    # Authentication service
├── components/                # Reusable components
│   ├── app-footer.vue
│   ├── header-toolbar.vue
│   ├── side-nav-menu.vue
│   └── theme-selector.vue
├── views/                     # Page components
│   ├── login-form.vue
│   ├── home-page.vue
│   └── tasks-page.vue
├── layouts/                   # Layout components
│   ├── side-nav-outer-toolbar.vue
│   └── single-card.vue
├── services/                  # Service layer
│   ├── http-service.js
│   ├── api-service.js
│   └── theme-service.js
├── localization/              # Internationalization
│   ├── localization.js
│   ├── localization.zh.json
│   ├── localization.ja.json
│   └── localization.vi.json
└── utils/                     # Utility functions
    └── media-query.js
```

## 🌍 Internationalization

The template supports three languages:
- 🇨🇳 Chinese (Simplified)
- 🇯🇵 Japanese
- 🇻🇳 Vietnamese

Language switching is available in the login form and throughout the application.

## 🎨 Theme System

Multiple themes available:
- Orange Light (Default)
- Blue Light
- Purple Light
- Purple Dark

Themes can be switched dynamically through the theme selector component.

## 📚 Documentation

- [Project Structure Guide](./PROJECT_STRUCTURE_COMMENTS.md) (Chinese)
- [Code Comments Progress](./CODE_COMMENTS_PROGRESS.md) (Chinese)
- [Localization Guide](./LOCALIZATION_GUIDE.md) (Chinese)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- DevExpress for the comprehensive DevExtreme component library
- All contributors who helped improve this template

## 📧 Contact

If you have any questions or suggestions, please feel free to reach out!

---

⭐ If this template helps you, please give it a star!
