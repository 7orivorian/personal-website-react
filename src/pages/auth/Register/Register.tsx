import "../auth-form.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import EmailInput from "../../../components/form/EmailInput.tsx";
import UsernameInput from "../../../components/form/UsernameInput.tsx";
import PasswordInput from "../../../components/form/PasswordInput.tsx";

export default function Register() {
    const [passwordError, setPasswordError] = useState("" as string | null);

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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {passwordConfirm, ...filteredData} = data;

        fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filteredData)
        }).then(res => {
            if (res.status === 201) {
                return res.json();
            }
            throw new Error("Failed to register");
        }).catch(err => {
            //TODO: inform the user of what went wrong (email/username taken etc.)
            console.error(err);
            alert("Failed to register");
        });
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Register</h1>
            <EmailInput register={register} errors={errors}/>
            <UsernameInput register={register} errors={errors}/>
            <PasswordInput register={register} errors={errors} autoComplete={"new-password"}/>

            <div className="input-container">
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input id="passwordConfirm"
                       autoComplete="new-password"
                       className={errors.passwordConfirm ? "error" : ""}
                       {...register("passwordConfirm", {required: true})}
                />
                {(errors.passwordConfirm && <span className="error">{errors.passwordConfirm.message}</span>)
                    || (passwordError && <span className="error">{passwordError}</span>)}
            </div>

            <div className="input-container">
                <label className="invisible" htmlFor="submit">Register</label>
                <input id="submit" type="submit"/>
            </div>
        </form>
    );
}

type Inputs = {
    email: string
    username: string
    password: string
    passwordConfirm: string
}