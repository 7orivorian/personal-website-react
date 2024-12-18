export default function UsernameInput({id, label, register, errors}: {
    id: string;
    label: string;
    register: any;
    errors: any;
}) {
    return (
        <div className="input-container auth-input username-input">
            <label htmlFor={id}>{label}</label>
            <input id={id}
                   autoComplete="username"
                   className={errors.username ? "error" : ""}
                   {...register(`${id}`, {
                       required: true,
                       minLength: {
                           value: 3,
                           message: "Minimum username length is 3 characters"
                       },
                       maxLength: {
                           value: 16,
                           message: "Maximum username length is 16 characters"
                       }
                   })}
            />
            {errors.username && <span className="error">{errors.username.message}</span>}
        </div>
    );
}