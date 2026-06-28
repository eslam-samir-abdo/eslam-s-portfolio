# Eslam Samir — React Portfolio

## 🚀 Setup

```bash
# 1. إنشاء مشروع Vite React جديد
npm create vite@latest eslam-portfolio -- --template react
cd eslam-portfolio

# 2. تنزيل react-router-dom
npm install react-router-dom

# 3. احذف كل اللي في src/ وانسخ الملفات دي مكانها

# 4. شغّل المشروع
npm run dev
```

افتح `http://localhost:5173` ✅

---

## 📁 Structure

```
src/
├── index.js                  ← Entry point
├── App.js                    ← Routes
├── App.css                   ← Global styles
├── hooks/
│   └── useProjects.js        ← localStorage hook
├── components/
│   ├── Navbar.js
│   └── Cursor.js
└── pages/
    ├── Home.js + Home.css
    ├── Skills.js + Skills.css
    ├── Projects.js + Projects.css
    ├── About.js + About.css
    └── Contact.js + Contact.css
```

---

## ✨ Features
- React Router — navigation بين كل الصفحات
- localStorage — المشاريع بتفضل محفوظة
- Live Demo button — بيظهر لو ضفت link
- Featured projects — اختار مشاريع تظهر في الهوم
- Animated skill bars — IntersectionObserver
- Custom cursor
- Intro animation — مرة واحدة per session
