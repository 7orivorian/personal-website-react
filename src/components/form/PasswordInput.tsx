export default function PasswordInput({id, label, autoComplete, register, errors}: {
    id: string;
    label: string;
    autoComplete: string;
    register: any;
    errors: any;
}) {
    return (
        <div className="input-container auth-input password-input">
            <label htmlFor={id}>{label}</label>
            <input id={id}
                   autoComplete={autoComplete}
                   className={errors[id] ? "error" : ""}
                   {...register(`${id}`, {
                       required: true,
                       minLength: {
                           value: 16,
                           message: "Minimum password length is 16 characters"
                       },
                       maxLength: {
                           value: 128,
                           message: "Maximum password length is 128 characters"
                       }
                   })}
            />
            {errors[id] && <span className="error">{errors[id].message}</span>}
        </div>
    );
}