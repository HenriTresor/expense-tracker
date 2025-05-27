# 💰 Personal Finance Tracker App - ABCD Ltd

A mobile application developed using **React Native + Expo** to help users manage their daily expenses, set budgets, receive alerts on budget limits, and visualize spending habits in an intuitive dashboard.

---

## 🚀 Features

- 🔐 User login with credential validation
- ➕ Add, view, and delete expenses
- 📊 Dashboard for expense visualization and budget monitoring
- ✅ Form validation using Zod + React Hook Form
- ⚙️ Redux for state management
- 🌐 API integration using Axios
- 🔔 Error handling and user-friendly notifications

---

## 🏗️ Folder Structure

- /api → Axios API service functions
- /app → App root and navigation container
- /assets → Static resources (images, fonts)
- /components → Reusable UI components
- /constants → Color palette, route names, API constants
- /hooks → Custom reusable hooks
- /store → Redux slices and global store
- /utils → Helpers (formatting, validation)

## 📄 Pages

- Login -> /
- Dashboard -> /(tabs)
- Create Expense -> /(tabs)/add-expense
- Expense details -> /(tabs)/expense-details/{id}
- Settings -> /(tabs)/settings

---

## 🔗 API Endpoints

| Functionality        | Method | Endpoint                            |
| -------------------- | ------ | ----------------------------------- |
| Get user by username | GET    | `/users?username=example@gmail.com` |
| Add expense          | POST   | `/expenses`                         |
| Get all expenses     | GET    | `/expenses`                         |
| Get expense by ID    | GET    | `/expenses/{expenseId}`             |
| Delete expense       | DELETE | `/expenses/{expenseId}`             |

📍 API Base URL: `https://67ac71475853dfff53dab929.mockapi/api/v1`

---

## 📦 Technologies Used

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://github.com/colinhacks/zod) + [React Hook Form](https://react-hook-form.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/)
- [Expo Router](https://docs.expo.dev/)

---

## ⚙️ Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/henritresor/expense-tracker.git
   cd expense-tracker
   ```
2. Install dependencies
   ```bash
   npm install --legacy-peer-deps
   ```
3. run the application
   ```bash
   npx expo start
   ```

   
