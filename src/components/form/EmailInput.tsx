import {EMAIL_REGEX} from "../../scripts/utils.ts";

export default function EmailInput({id, register, errors}: {
    id: string;
    register: any;
    errors: any;
}) {
    return (
        <div className="input-container auth-input email-input">
            <label htmlFor={id}>Email</label>
            <input id={id}
                   autoComplete="email"
                   className={errors.email ? "error" : ""}
                   {...register("email", {
                       required: true,
                       maxLength: {
                           value: 120,
                           message: "Maximum email length is 120 characters"
                       },
                       pattern: {
                           value: EMAIL_REGEX,
                           message: "Invalid email pattern"
                       }
                   })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
    );
}