# Student Search Application

This project implements a full stack "Search Bar with Lazy Load Functionality" per the technical interview assignment requirements.

## Features Covered
- **Lazy Loading**: Input is debounced by 300ms. Search triggers only when the user stops typing and has entered at least 3 characters.
- **RESTful Backend API**: Built with Node.js & Express to query a mock `students.json` dataset.
- **Dynamic Search & Display**: Matches are dynamically fetched. Dropdown shows up to 5 best matches asynchronously. 
- **Highlighting**: Matches in the dropdown are visually highlighted to easily see why a student was matched.
- **Selection**: Clicking a student displays their detailed information underneath the search bar.
- **Edge cases covered**: 
  - Case insensitive searching
  - Partial matches handled seamlessly
  - Handles names with similar prefixes perfectly
  - Supports searching with spaces

## Project Structure
- `backend/`: The Express.js backend API providing the search endpoint.
- `frontend/`: The React.js frontend application styled with Tailwind CSS v4.

---

## 🚀 Setup & Run Instructions

### 1. Start the Backend API
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   *The backend will run on `http://localhost:3000`.*

### 2. Start the Frontend Application
1. Open a **new** terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local URL (typically `http://localhost:5173`) in your browser to test the application!

## Testing the Application
- Try searching for "jas" or "singh" (wait 300ms for the debounce).
- Notice the highlighted text in the dropdown.
- Select a user to view their Details Card.
- Clear the input using the `×` button to reset the UI.
