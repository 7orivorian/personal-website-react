import {useState} from "react";

export default function SelectInput({classPrefix, id, label, options, required, register, errors}: {
    classPrefix: string;
    id: string;
    label: string;
    options: { value: string; label: string; }[];
    required: boolean;
    register: any;
    errors: any;
}) {
    const prefix: string = classPrefix ? `${classPrefix}__` : "";
    const [selected, setSelected] = useState("");
    return (
        <div className={`${prefix}input-container input-container select-input`}>
            <label htmlFor={id}>
                <span>{label}</span>
                {required && <span className="required"> *</span>}
            </label>
            <select id={id}
                    className={`${!selected ? "is-unset" : ""}${errors[id] ? " error" : ""}`}
                    onChange={e => setSelected(e.target.value)}
                    {...register(`${id}`, {required: required})}>
                <option value="" className="placeholder-option">Select...</option>
                {options.map((option: { value: string; label: string; }) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {errors[id] && <span className="error">{errors[id].message}</span>}
        </div>
    );
}