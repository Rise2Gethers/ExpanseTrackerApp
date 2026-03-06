# 💸 Expanse Tracker App

![Status](https://img.shields.io/badge/STATUS-IN_DEVELOPMENT-orange?style=for-the-badge)
![License](https://img.shields.io/badge/LICENSE-MIT-green?style=for-the-badge)
![Sprint](https://img.shields.io/badge/SPRINT-MVP_1-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/Main_Lang-TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)

> **Current Status:** 🚧 In Development (MVP - Sprint 1)

## 🎯 About the Project

**Expanse Tracker** is a **Local-First** mobile application for personal financial management.

More than just an app, this project serves as a **Software Engineering Lab**. Conceived by two developers under the **[Rise2Gethers](https://github.com/Rise2Gethers)** organization, the goal is to simulate the real-life cycle of a software product within a major tech company. We focus not only on writing code but on fostering a culture of **collaborative development** and **scalable architecture**.

---

## 💡 The Differentiator (Engineering Culture)

Unlike traditional academic projects, we strictly follow market-standard processes to ensure quality and maintainability:

- **Agile Methodology:** Continuous flow using Kanban (GitHub Projects).
- **Professional Git Flow:** Direct commits to `main` are forbidden. We use the **Feature Branch Workflow**.
- **Code Review:** Pull Requests (PRs) are mandatory with cross-reviews before merging.
- **Vertical Slicing:** Focus on delivering small, functional pieces of value rather than monolithic layers.

---

## ✨ Features (MVP)

- [x] **UI Foundation:** Design System implementation with React Native Paper.
- [ ] **Dashboard:** Quick visualization of Current Balance and recent movements.
- [ ] **Transaction Management:** Record Income/Outcome in < 2 seconds.
- [ ] **Categories:** Flexible categorization system with icons and colors.
- [ ] **Offline-First:** Data persistence using **SQLite**, ensuring privacy and zero-latency.
- [ ] **Analytics:** Simple charts for financial roadmap analysis.

---

## 🛠️ Tech Stack

The architecture was designed to be modern, type-safe, and performant.

| Category | Technology | Decision Driver |
| :--- | :--- | :--- |
| **Core** | React Native + Expo | Agile cross-platform development (Android/iOS). |
| **Language** | TypeScript | Type safety, maintainability, and code scalability. |
| **Database** | SQLite + Drizzle ORM | Robust local relational DB with full type-safety. |
| **UI Kit** | React Native Paper | Material Design compliance with ready-to-use components. |
| **Navigation** | React Navigation | Industry standard for stack-based navigation. |
| **State** | Zustand | Lightweight global state management without boilerplate. |

---

## 📂 Project Structure

We maintain a clean, modular architecture within `src`:

```bash
src/
├── components/  # Reusable UI components (Buttons, Cards, Inputs)
├── database/    # SQLite configuration and Drizzle Schemas
├── screens/     # Application screens (Home, AddTransaction, Settings)
├── store/       # Global State (Zustand)
├── theme/       # Paper Theme configuration (Colors, Fonts)
└── utils/       # Helper functions and formatters
```

---

## 🚀 How to Run

Prerequisites: **Node.js (LTS)**, **Git**, and the **Expo Go** app on your phone.

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/Rise2Gethers/ExpanseTrackerApp.git](https://github.com/Rise2Gethers/ExpanseTrackerApp.git)
   cd ExpanseTrackerApp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the project:**

   ```bash
   npx expo start
   ```

4. **Test:**
   Scan the QR Code displayed in the terminal using the Expo Go app (Android/iOS).

---

## 🤝 The Team

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/kenjishimizu2411">
        <img src="https://github.com/kenjishimizu2411.png" width="100px;" alt="Kenji Profile"/><br>
        <sub>
          <b>Kenji Shimizu</b>
        </sub>
      </a><br>
      Backend & Data Specialist | AI Implementor Specialist
    </td>
    <td align="center">
      <a href="https://github.com/Jggranito">
        <img src="https://github.com/Jggranito.png" width="100px;" alt="João Profile"/><br>
        <sub>
          <b>João Gabriel</b>
        </sub>
      </a><br>
      Frontend & Mobile Specialist
    </td>
      <td align="center">
      <a href="https://github.com/Guylherme97">
        <img src="https://github.com/Guylherme97.png" width="100px;" alt="Guy Profile"/><br>
        <sub>
          <b>Guylherme Lopes</b>
        </sub>
      </a><br>
      Data Science Specialist & Software Engineer 
    </td>
  </tr>
</table>

---

<p align="center">
  Built with 💜 and TypeScript by <a href="https://github.com/Rise2Gethers">Rise2Gethers</a>.
</p>
