import "../auth-form.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import EmailInput from "../../../components/form/EmailInput.tsx";
import UsernameInput from "../../../components/form/UsernameInput.tsx";
import PasswordInput from "../../../components/form/PasswordInput.tsx";
import BooleanInput from "../../../components/form/BooleanInput.tsx";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../../contexts/UserContext.tsx";

export default function Register() {
    const [passwordError, setPasswordError] = useState("" as string | null);
    const navigate = useNavigate();
    const {register: registerUser} = useUser()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs): void => {
        if (data.password !== data.passwordConfirm) {
            setPasswordError("Passwords do not match");
            return;
        }
        setPasswordError(null);

        registerUser(data.username, data.password, data.email, data.admin).then((error: string | null): string | null => {
            if (error) {
                navigate('/auth?type=login');
                alert(error);
                return error;
            }
            navigate('/');
            return null;
        })
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <EmailInput id={"email"} register={register} errors={errors}/>
            <UsernameInput id="username" label={"Username"} register={register} errors={errors}/>
            <PasswordInput id="password" label={"Password"} autoComplete={"new-password"} register={register}
                           errors={errors}/>
            <div className="input-container auth-input password-input">
                <label htmlFor="password-confirm">Confirm Password</label>
                <input id="password-confirm"
                       autoComplete="new-password"
                       className={errors.passwordConfirm ? "error" : ""}
                       {...register("passwordConfirm", {required: true})}
                />
                {(errors.passwordConfirm && <span className="error">{errors.passwordConfirm.message}</span>)
                    || (passwordError && <span className="error">{passwordError}</span>)}
            </div>
            <BooleanInput classPrefix={"auth-form"} id="admin" label={"Admin"} checked={false} register={register}
                          errors={errors}/>

            <div className="input-container auth-input">
                <label className="invisible" htmlFor="register">Register</label>
                <input id="register" className="auth-input" type="submit" value="Register"/>
            </div>
        </form>
    );
}

type Inputs = {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
    admin: boolean;
}