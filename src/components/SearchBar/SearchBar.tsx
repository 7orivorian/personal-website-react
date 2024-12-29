import "./searchbar.scss";
import SearchIcon from "../icon/material/SearchIcon.tsx";
import CloseIcon from "../icon/material/CloseIcon.tsx";
import {useState} from "react";

export default function SearchBar({value, onChange, placeholderText = ""}: {
    value: string;
    onChange: (value: string) => void;
    placeholderText?: string;
}) {
    const [isBouncing, setIsBouncing] = useState(false);

    const onInputChange = (val: string) => {
        onChange(val);

        // Trigger bounce animation without allowing overlap
        if (!isBouncing) {
            setIsBouncing(true);
            setTimeout(() => setIsBouncing(false), 100); // Reset animation state after it plays
        }
    };
    return (
        <div className={`search-container${isBouncing ? " bounce" : ""}`}>
            <input
                className="search-input"
                type="text"
                placeholder={placeholderText}
                value={value}
                onChange={(e) => onInputChange(e.target.value)}
            />
            <button className="search-icon" onClick={() => onInputChange("")}>
                <div className={`icon-wrapper ${value ? "fade-out" : "fade-in"}`}>
                    <SearchIcon/>
                </div>
                <div className={`icon-wrapper ${value ? "fade-in" : "fade-out"}`}>
                    <CloseIcon/>
                </div>
            </button>
        </div>
    );
}