const HighlightedText = ({ text, highlight }) => {
    const trimmedHighlight = highlight.trim();
    if (!trimmedHighlight) {
        return <span>{text}</span>;
    }
    const escapedHighlight = trimmedHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, "gi"); // g for global and i for case insensitive 
    const parts = text.split(regex);


    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === trimmedHighlight.toLowerCase() ? (
                    <mark key={i} className="bg-amber-500/20 text-amber-500 rounded px-0.5 bg-transparent font-medium">
                        {part}
                    </mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

export default HighlightedText;
