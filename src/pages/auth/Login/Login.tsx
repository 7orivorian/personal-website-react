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
        login(data.loginUsername, data.loginPassword).then((error: string | null) => {
            if (error) {
                alert(error);
                return;
            }
            navigate('/user/account');
        });
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <UsernameInput id={"loginUsername"} label={"Username"} register={register} errors={errors}/>
            <PasswordInput id={"loginPassword"} label={"Password"} autoComplete={"current-password"} register={register} errors={errors}/>

            <div className="input-container">
                <label className="invisible" htmlFor="submit">Register</label>
                <input id="submit" className="auth-input" type="submit" value="Login"/>
            </div>
        </form>
    );
}

type Inputs = {
    loginUsername: string
    loginPassword: string
};