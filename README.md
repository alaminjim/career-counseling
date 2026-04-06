# 🚀 CareerPath - Premium Career Counseling Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-id/deploy-status)](https://career-counselings.netlify.app/)

**CareerPath** is a high-fidelity, industry-standard career counseling platform designed to guide professionals through specialized diagnostic roadmaps, expert counseling, and data-driven career planning.

## 🌐 Live Application
Check out the live site: [https://career-counselings.netlify.app/](https://career-counselings.netlify.app/)

## ✨ Key Features

- **🛡️ Hybrid Authentication System:** 
  - Traditional Firebase Email/Password login.
  - Direct Google OAuth integration with a premium custom "Continue with Google" button.
- **💎 Premium Dark Aesthetic:** Built with a curated dark-mode palette using Tailwind CSS 4.0 and DaisyUI 5.0 for a professional SaaS feel.
- **🌀 Advanced Micro-animations:** Powered by Framer Motion and Lucide-React icons for a fluid and interactive user experience.
- **📊 Specialized Career Catalog:** A comprehensive library of 14+ specialized career services, each with unique diagnostic protocols.
- **📱 Responsive Infrastructure:** Fully optimized for mobile, tablet, and desktop environments.
- **🔐 Secure Persistence:** Global user state management with session persistence across refreshes.

## 🛠️ Technology Stack

- **Frontend:** [React 19](https://react.dev/) (Vite)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/), [DaisyUI 5.0](https://daisyui.com/)
- **Authentication:** [Firebase 11](https://firebase.google.com/), [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide-React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites
- Node.js installed
- npm or yarn

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/career-counseling.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file and add your Firebase and Google Client ID credentials:
   ```env
   VITE_apiKey=your_api_key
   VITE_authDomain=your_auth_domain
   VITE_projectId=your_project_id
   VITE_storageBucket=your_storage_bucket
   VITE_messagingSenderId=your_sender_id
   VITE_appId=your_app_id
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📄 Assignment Details
This project was developed as part of **Assignment-9** in the Career Counseling section of Programming Hero.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

---
Developed by [Alamin](https://github.com/alaminjim) 🚀
