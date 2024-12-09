import "../auth-form.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import UsernameInput from "../../../components/form/UsernameInput.tsx";
import PasswordInput from "../../../components/form/PasswordInput.tsx";
import {useUser} from "../../../contexts/UserContext.tsx";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const {login} = useUser();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs): void => {
        login(data.username, data.password).then((message: string | null) => {
            if (message) {
                alert(message);
                return;
            }
            navigate('/');
        });
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <UsernameInput id={"login-username"} register={register} errors={errors}/>
            <PasswordInput id={"login-password"} register={register} errors={errors} autoComplete={"current-password"}/>

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
};