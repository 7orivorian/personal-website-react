export default function PasswordInput({id, register, errors, autoComplete}: {
    id: string;
    register: any;
    errors: any;
    autoComplete: string;
}) {
    return (
        <div className="input-container">
            <label htmlFor={id}>Password</label>
            <input id={id}
                   autoComplete={autoComplete}
                   className={errors.password ? "error" : ""}
                   {...register("password", {
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
            {errors.password && <span className="error">{errors.password.message}</span>}
        </div>
    );
}