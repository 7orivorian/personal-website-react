import "./dropdown.scss";
import {useState} from "react";

export default function Dropdown({options}: { options: DropdownOption[] }) {
    const [label, setLabel] = useState("All");
    return (
        <span className="custom-dropdown">
            {/*<label className="dropdown-label">{label}</label>*/}
            <select className="dropdown-list">
                {options.map((option: DropdownOption) => (
                    <DropdownItem key={option.value}
                                  label={option.label}
                                  value={option.value}
                                  handleClick={(l: string) => setLabel(l)}
                    />
                ))}
            </select>
        </span>
    );
}

function DropdownItem({label, value, handleClick}: {
    label: string;
    value: string;
    handleClick: (l: string, v: string) => void
}) {
    return (
        <option className="dropdown-item"
            onClick={() => handleClick(label, value)}>
            {label}
        </option>
    );
}

export type DropdownOption = {
    label: string;
    value: string;
}