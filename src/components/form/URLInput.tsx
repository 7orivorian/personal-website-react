export default function URLInput({classPrefix, id, label, defaultValue, placeholder, required, register, errors}: {
    classPrefix: string;
    id: string;
    label: string;
    defaultValue?: string | undefined;
    placeholder?: string | undefined;
    required: boolean;
    register: any;
    errors: any;
}) {
    const prefix: string = classPrefix ? `${classPrefix}__` : "";
    return (
        <div className={`${prefix}input-container input-container url-input`}>
            <label htmlFor={id} className="url-input__label">
                <span>{label}</span>
                {required && <span className="required"> *</span>}
            </label>
            <input id={id}
                   type={"url"}
                   defaultValue={defaultValue}
                   autoComplete={"off"}
                   placeholder={placeholder}
                   className={errors[id] ? "error" : ""}
                   {...register(`${id}`, {
                       required: required
                   })}
            />
            {errors[id] && <span className="error">{errors[id].message}</span>}
        </div>
    );
}