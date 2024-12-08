export default function UsernameInput({register, errors}: {
    register: any;
    errors: any;
}) {
    return (
        <div className="input-container">
            <label htmlFor="username">Username</label>
            <input id="username"
                   autoComplete="username"
                   className={errors.username ? "error" : ""}
                   {...register("username", {
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