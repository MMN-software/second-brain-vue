# Second Brain — Personal Productivity PWA

An all-in-one personal productivity app: notes, tasks, habits, a calendar and a focus timer in one installable **Progressive Web App**. Built with **Vue 3**, works offline and keeps all data on the device. The interface is Persian and right-to-left, with a Persian (Jalali) calendar.

[![Live demo](https://img.shields.io/badge/Live_demo-0EA5E9?style=for-the-badge&logo=githubpages&logoColor=white)](https://mmn-software.github.io/second-brain-vue/)
![Vue.js](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## Features

- **Notes** with tags, templates (idea, meeting, daily journal, book summary, shopping list, goal) and full-text search
- **Tasks** with details and due dates
- **Habit tracker** with streaks
- **Calendar** using the Jalali calendar (`jalaali-js`)
- **Pomodoro focus timer**
- **4-7-8 breathing exercise**
- **Weather widget** for a set of preset cities via the Open-Meteo API
- **Stats and achievements** to keep motivation up
- Light and dark themes, emoji picker, in-app guide
- Backup and restore of all data
- Installable and offline-capable (manifest + service worker)

## Tech

Vue 3 Composition API loaded as an ES module, with no build step. Data is persisted to `localStorage`, `jalaali-js` handles date conversion, Open-Meteo provides weather, and a custom service worker handles caching.

## Run locally

```bash
git clone https://github.com/MMN-software/second-brain-vue.git
cd second-brain-vue
npx serve .
```

---

Built by **[Mohammad Mehdi Nemati](https://github.com/MMN-software)** · Available for freelance work — [get in touch](mailto:mohammadmehdi.neemati@gmail.com)
