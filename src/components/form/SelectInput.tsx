import {ChangeEvent, useState} from "react";
import {Option} from "../../scripts/types.ts";

export default function SelectInput({classPrefix, id, label, defaultValue, options, required, register, errors}: {
    classPrefix: string;
    id: string;
    label: string;
    defaultValue?: Option | undefined;
    options: Option[];
    required: boolean;
    register: any;
    errors: any;
}) {
    const prefix: string = classPrefix ? `${classPrefix}__` : "";
    const [selected, setSelected] = useState(defaultValue?.value || "");
    const {onChange, ...rest} = register(`${id}`, {required: required});

    const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setSelected(e.target.value);
        onChange(e);
    };

    return (
        <div className={`${prefix}input-container input-container select-input`}>
            <label htmlFor={id}>
                <span>{label}</span>
                {required && <span className="required"> *</span>}
            </label>
            <select id={id}
                    className={`${!selected ? "is-unset" : ""}${errors[id] ? " error" : ""}`}
                    value={selected}
                    onChange={e => handleChange(e)}
                    {...rest}>
                <option value="" className="placeholder-option">Select...</option>
                {options.map((option: Option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {errors[id] && <span className="error">{errors[id].message}</span>}
        </div>
    );
}