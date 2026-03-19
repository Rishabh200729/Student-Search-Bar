import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";
import HighlightedText from "./HighlightedText";
import { Search, X, Loader2 } from "lucide-react";

const SearchBar = ({ onSelect }) => {
    // The current text typed into the search input box
    const [query, setQuery] = useState("");
    
    // The array of student objects returned from the backend API
    const [results, setResults] = useState([]);
    
    // Tracks if a search was completed but returned 0 results
    const [showEmpty, setShowEmpty] = useState(false);
    
    // Tracks if the API request is currently in progress (shows spinner)
    const [loading, setLoading] = useState(false);
    
    // Controls whether the dropdown menu (results or empty state) is visible
    const [open, setOpen] = useState(false);

    // Lazy load: debounced search term updates only after 300ms of no typing
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        const fetchStudents = async () => {
            const searchTerm = debouncedQuery.trim();
            if (searchTerm.length >= 3) {
                setLoading(true);
                setShowEmpty(false);
                try {
                    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
                    const response = await fetch(`${API_BASE_URL}/api/students/search?name=${encodeURIComponent(searchTerm)}`);
                    if (!response.ok) {
                        setResults([]);
                        setShowEmpty(true);
                    } else {
                        const data = await response.json();
                        setResults(data);
                        setShowEmpty(data.length === 0);
                    }
                    setOpen(true);
                } catch (error) {
                    console.error("Error fetching students:", error);
                    setResults([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
                setShowEmpty(false);
                setOpen(false);
            }
        };

        fetchStudents();
    }, [debouncedQuery]);

    return (
        <div className="relative w-full">
            {/* Input box */}
            <div className={`flex items-center gap-3 bg-slate-900 border rounded-xl px-4 py-3 border-amber-500`}>

                {/* Search icon */}
                <Search className="shrink-0 text-slate-400" size={17} strokeWidth={2.2} />

                <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => {
                        if (results.length > 0 || showEmpty) setOpen(true);
                    }}
                    placeholder="Type 3+ characters to search students…"
                    className="flex-1 bg-transparent outline-none text-slate-100 text-[15px] placeholder-slate-400 font-sans"
                />

                {/* Spinner */}
                {loading && (
                    <Loader2 className="w-4 h-4 text-amber-500 animate-spin shrink-0" />
                )}

                {/* Clear button */}
                {query && (
                    <button
                        onClick={() => { setQuery(''); setResults([]); setOpen(false); setShowEmpty(false); }}
                        className="text-slate-400 hover:text-slate-100 transition-colors cursor-pointer flex items-center justify-center p-1"
                    >
                        <X size={17} strokeWidth={2.5} />
                    </button>
                )}
            </div>

            {/* Results dropdown */}
            {open && results.length > 0 && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-slate-900 border border-slate-800
          rounded-xl py-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)] z-50 overflow-hidden">
                    <ul>
                        {results.map((student) => (
                            <li
                                key={student.rollNumber}
                                onClick={() => {
                                    onSelect(student);
                                    setOpen(false);
                                    setQuery('');
                                }}
                                className="px-4 py-3 hover:bg-slate-800/50 cursor-pointer transition-colors flex items-center justify-between group"
                            >
                                <div>
                                    <div className="text-[14.5px] text-slate-100 font-medium">
                                        <HighlightedText text={student.name} highlight={query} />
                                    </div>
                                    <div className="text-[12.5px] text-slate-400 mt-0.5">
                                        Class: {student.class}
                                    </div>
                                </div>
                                <div className="text-[12px] font-mono text-slate-400 group-hover:text-amber-500/70 transition-colors">
                                    #{student.rollNumber}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Empty state */}
            {showEmpty && open && !loading && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-slate-900 border border-slate-800
          rounded-xl px-4 py-4 text-[13.5px] text-slate-400 text-center
          shadow-[0_8px_32px_rgba(0,0,0,0.45)] z-50">
                    No students found for{' '}
                    <strong className="text-slate-100">"{query}"</strong>
                </div>
            )}
        </div>
    )
}

export default SearchBar;