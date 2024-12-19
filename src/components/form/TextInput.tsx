export default function TextInput({
                                      classPrefix,
                                      id,
                                      label,
                                      defaultValue,
                                      placeholder,
                                      minLength,
                                      maxLength,
                                      required,
                                      register,
                                      errors
                                  }: {
    classPrefix: string;
    id: string;
    label: string;
    defaultValue?: string | undefined;
    placeholder?: string | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    required: boolean;
    register: any;
    errors: any;
}) {
    const prefix: string = classPrefix ? `${classPrefix}__` : "";
    return (
        <div className={`${prefix}input-container input-container text-input`}>
            <label htmlFor={id} className="text-input__label">
                <span>{label}</span>
                {required && <span className="required"> *</span>}
            </label>
            <input id={id}
                   type={"text"}
                   autoComplete={"off"}
                   placeholder={placeholder}
                   defaultValue={defaultValue}
                   minLength={minLength}
                   maxLength={maxLength}
                   className={errors[id] ? "error" : ""}
                   {...register(`${id}`, {required: required})}
            />
            {errors[id] && <span className="error">{errors[id].message}</span>}
        </div>
    );
}