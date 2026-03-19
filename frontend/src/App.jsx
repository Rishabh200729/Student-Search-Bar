import { useState } from 'react';
import './index.css';
import SearchBar from './components/SearchBar';
import StudentDetails from './components/StudentDetails';

function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <main className="min-h-screen bg-slate-950 flex items-start justify-center px-4 pt-14 pb-16">
      <div className="w-full max-w-[540px]">

        {/* Header */}
        <div className="text-center mb-9">

          <h1 className="font-display text-[clamp(26px,5vw,40px)] font-normal
            leading-tight tracking-tight text-slate-100 mb-3">
            Find a Student
          </h1>

          <p className="text-slate-400 text-[13.5px] max-w-sm mx-auto leading-relaxed">
            Results appear after 3 characters — supports partial matches,
            any case, and special characters.
          </p>
        </div>

        {/* Search bar */}
        <SearchBar onSelect={setSelectedStudent} />

        {/* Selected Student Details */}
        <StudentDetails student={selectedStudent} />

      </div>
    </main>
  )
}

export default App
