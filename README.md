# 🎓 Student Search Application

A full-stack, responsive student search web application. The platform features an intelligent, lazy-loaded search bar that queries a backend mock database, providing real-time highlighted results and displaying detailed student profiles.

## 🚀 Features
- **Real-time Search:** Search queries fire seamlessly as you type.
- **Lazy Loading (Debouncing):** API calls are intelligently delayed by 300ms to prevent network spam and ensure optimal performance.
- **Smart Highlighting:** The searched text correctly highlights within the result names (with spaces and special characters handled seamlessly).
- **Responsive UI:** A premium, modern dark-mode aesthetic utilizing Tailwind CSS and beautiful Lucide icons.
- **Error States:** Gracefully handles empty results and protects against Regex crashes.

---

## 🛠️ Technology Stack
- **Frontend:** React, Tailwind CSS, Lucide React (Icons), Vite.
- **Backend:** Node.js, Express.js.
- **Database:** Mock JSON Dataset (`student_data.json` - exactly 50 students).

---

## ⚙️ Setup & Installation Instructions

Follow these steps to run the application locally on your machine.

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   *(The backend should now be running cleanly on `http://localhost:3000`)*

### 2. Frontend Setup
1. Open a **new** terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(The frontend should immediately be accessible at `http://localhost:5173` or similar).*

---

## 🧠 Approach, Design Choices & Optimizations

### 1. The custom `useDebounce` Hook
Without debouncing, typing "Hari" would fire off 4 independent API calls (`H`, `Ha`, `Har`, `Hari`), putting intense pressure on the server and leading to potential race-condition bugs on slow internet connections. I implemented a custom `useDebounce` hook that creates a 300ms buffer window. It strictly prevents the code from executing expensive network requests until the user actually pauses their typing. 

### 2. Component Architecture & Separation of Concerns
The React UI avoids the "God Component" anti-pattern by heavily utilizing compositional components:
- `App.jsx` handles global state and layout.
- `SearchBar.jsx` focuses entirely on input handling, state buffers, and calling the API.
- `StudentDetails.jsx` is a dumb presentation component that strictly renders the final data. 
- `HighlightedText.jsx` encapsulates the complex logic of string splitting.

### 3. Resilient "Bulletproof" Regex
Creating dynamic Regular Expressions (`new RegExp(query)`) normally crashes web pages if users search for reserved symbols like `(` or `*`. Our `HighlightedText.jsx` module takes the user's string, cleanly `trim()`s it, and programmatically escapes any dangerous characters (`/[.*+?^${}()|[\]\\]/g`). This prevents app-crashing `SyntaxError`s!

### 4. Refactoring UI to Tailwind Native Color Palette
We recently upgraded the application's overall codebase quality by refactoring arbitrary generic Hex Codes (`#161b25`, `#7a8299`) into strict, standard Tailwind color tokens (`slate-900`, `slate-400`). This unifies the color palette drastically, ensures that Dark Mode/Light Mode swapping is far more feasible in the future, and instantly elevated readability.

### 5. Backend Controlled Results
The Node.js backend controller leverages `.slice(0, 5)` to intentionally enforce constraints. Rather than sending the entire heavy 50+ student JSON file back to the browser and burdening the client to filter, the backend calculates the query, limits the payload mathematically, and ensures the UI never breaks layout constraints.
