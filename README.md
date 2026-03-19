# 🎓 Student Search Application

A full-stack, responsive student search web application. This platform features an intelligent, lazy-loaded search bar that queries a backend mock database, providing real-time highlighted results and displaying detailed student profiles.

---

## 📂 Folder Structure

```text
student-search-app/
├── backend/
│   ├── controllers/
│   │   └── studentController.js    # Logic for filtering and slicing results
│   ├── data/
│   │   └── student_data.json       # Mock JSON Database (50 Students)
│   ├── routes/
│   │   └── studentRoutes.js        # API Routing
│   ├── server.js                   # Express Server Entry Point
│   ├── vercel.json                 # Vercel Configuration for Deployment
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HighlightedText.jsx # Regex matching and text highlighting
│   │   │   ├── SearchBar.jsx       # Input, dropdown, and API fetching logic
│   │   │   └── StudentDetails.jsx  # Renders the selected student card
│   │   ├── hooks/
│   │   │   └── useDebounce.js      # Custom debounce logic for lazy loading
│   │   ├── App.jsx                 # Main React component
│   │   └── index.css               # Tailwind CSS Entry Point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## ⚙️ How to Run Locally

Follow these exact steps to run the application on your local machine.

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies (Express, CORS, etc.):
   ```bash
   npm install
   ```
3. Start the Node.js backend server:
   ```bash
   npm start
   ```
   *(The backend should now be running cleanly on `http://localhost:3000`)*

### 2. Frontend Setup
1. Open a **new** terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the React frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(The frontend should immediately be accessible in your browser at `http://localhost:5173`).*

---

## ✅ Fulfillment of Requirements

### 1. Student Database (Mock Data)
**How it was fulfilled:** 
The backend utilizes a local JSON file (`backend/data/student_data.json`) containing exactly 50 mock students. We completely avoided MongoDB or any NoSQL databases as required. The Node.js controller natively reads this JSON file into memory when handling search requests instead of querying an external database instance.

### 2. Search Bar Functionality
**How it was fulfilled:** 
The application strictly enforces a "minimum 3 character" rule (`if (searchTerm.length >= 3)`) before any API request is made. The backend strictly enforces a maximum of 5 matching students using `results.slice(0, 5)`. The dropdown updates dynamically, and successfully selecting a student mounts the full `<StudentDetails />` component displaying their Name, Class, and unique Roll Number exactly as requested.

### 3. Backend API (Mandatory)
**How it was fulfilled:** 
A lightweight RESTful Node/Express API was constructed. The primary endpoint (`/api/students/search?name=...`) intercepts the query parameter via the frontend, filters the local `student_data.json` mock database in memory, and returns the strictly formatted JSON array.

### 4. Frontend UI (React.js Only)
**How it was fulfilled:** 
The frontend is built purely using React (Vite) and does not rely on heavy UI component libraries. The interface leverages modern Tailwind CSS and Lucide React icons for a responsive, clean, dark-mode aesthetic that scales elegantly between mobile and desktop viewing environments.

### 5. Performance Considerations
**How it was fulfilled:** 
To protect the server from being spammed by keystrokes, the search inherently relies on **Lazy Loading implementation**. The backend limits responses via `.slice()`, preventing the browser from attempting to render hundreds or thousands of DOM nodes regardless of how large the underlying JSON dataset becomes.

### 6. Edge Cases Considered
**How it was fulfilled:** 
- **Similar Prefixes:** Using the Javascript `includes()` operator reliably matches inner substrings (e.g., 'Amrit' will correctly return 'Amritpal Singh').
- **Case-Insensitivity:** Both the frontend's highlighting and the backend's filtering convert strings to `.toLowerCase()` prior to string comparisons.
- **Roll Numbers:** Duplicate names are handled perfectly because React `keys` and selection references use the strictly unique `rollNumber`.
- **Special Characters & Spaces:** User input is parsed through `.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')` prior to being assembled into a Regular Expression, rendering app-crashing `SyntaxError`s impossible. Queries are also `trim()`'d prior to fetch.

### 7. Optional Enhancements (Bonus)
**How it was fulfilled:** 
- **Text Highlighting:** The custom `<HighlightedText />` component dynamically slices and identifies exact substring matches to visually highlight identical characters in dark amber.
- **Debounce Optimization:** A custom React Hook (`useDebounce.js`) sets a rigid `300ms` delay buffer over the input state, absolutely confirming the user has paused typing before the fetch officially fires.
- **Vercel Deployment:** The repository is natively configured via custom `vercel.json` (to expose the Express app as a serverless function) and dynamic Environment Variables (`VITE_API_URL`) to seamlessly run in cloud production exactly as it performs locally.
