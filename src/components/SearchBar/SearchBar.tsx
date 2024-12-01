import "./searchbar.scss";
import SearchIcon from "../icon/material/SearchIcon.tsx";
import CloseIcon from "../icon/material/CloseIcon.tsx";
import React, {useState} from "react";

export default function SearchBar({placeholderText, query, setQuery}: {
    placeholderText: string;
    query: string,
    setQuery: (query: string) => void
}) {
    const [isBouncing, setIsBouncing] = useState(false);
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);

        // Trigger bounce animation without allowing overlap
        if (!isBouncing) {
            setIsBouncing(true);
            setTimeout(() => setIsBouncing(false), 100); // Reset animation state after it plays
        }
    };
    return (
        <div className="search-container">
            <div className={isBouncing ? "search-bar bounce" : "search-bar"}>
                <input
                    className="search-input"
                    type="text"
                    placeholder={placeholderText}
                    value={query}
                    onChange={onInputChange}
                />
                <div className="search-icon" onClick={() => setQuery("")}>
                    <div className={`icon-wrapper ${query ? "fade-out" : "fade-in"}`}>
                        <SearchIcon/>
                    </div>
                    <div className={`icon-wrapper ${query ? "fade-in" : "fade-out"}`}>
                        <CloseIcon/>
                    </div>
                </div>
            </div>
        </div>
    );
}