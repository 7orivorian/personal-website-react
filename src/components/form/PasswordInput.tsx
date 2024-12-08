export default function PasswordInput({register, errors, autoComplete}: {
    register: any;
    errors: any;
    autoComplete: string;
}) {
    return (
        <div className="input-container">
            <label htmlFor="password">Password</label>
            <input id="password"
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