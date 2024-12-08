import "../auth-form.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import UsernameInput from "../../../components/form/UsernameInput.tsx";
import PasswordInput from "../../../components/form/PasswordInput.tsx";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs): void => {

        fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            //TODO: impl token storage
            return res.json();
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <UsernameInput register={register} errors={errors}/>
            <PasswordInput register={register} errors={errors} autoComplete={"current-password"}/>

            <div className="input-container">
                <label className="invisible" htmlFor="submit">Register</label>
                <input id="submit" type="submit"/>
            </div>
        </form>
    );
}

type Inputs = {
    username: string
    password: string
}