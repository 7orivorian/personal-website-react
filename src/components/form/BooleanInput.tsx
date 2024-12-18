export default function BooleanInput({classPrefix, id, label, checked, register, errors}: {
    classPrefix: string;
    id: string;
    label: string;
    checked: boolean;
    register: any;
    errors: any;
}) {
    const prefix: string = classPrefix ? `${classPrefix}__` : "";
    return (
        <div className={`${prefix}input-container input-container boolean-input`}>
            <label htmlFor={id}>{label}</label>
            <input id={id}
                   type="checkbox"
                   defaultChecked={checked}
                   className={errors[id] ? "error" : ""}
                   {...register(`${id}`)}
            />
            {errors[id] && <span className="error">{errors[id].message}</span>}
        </div>
    );
}