export default function DateInput({classPrefix, id, label, required, register, errors}: {
    classPrefix: string;
    id: string;
    label: string;
    required: boolean;
    register: any;
    errors: any;
}) {
    const prefix: string = classPrefix ? `${classPrefix}__` : "";
    return (
        <div className={`${prefix}input-container input-container date-input`}>
            <label htmlFor={id} className="date-input__label">
                <span>{label}</span>
                {required && <span className="required"> *</span>}
            </label>
            <input id={id}
                   type="text"
                   placeholder="mm/dd/yyyy"
                   autoComplete={"off"}
                   onFocus={(e) => e.target.type = "date"}
                   onBlur={(e) => e.target.type = "text"}
                   className={errors[id] ? "error" : ""}
                   {...register(`${id}`, {
                       required: required
                   })}
            />
            {errors[id] && <span className="error">{errors[id].message}</span>}
        </div>
    );
}