import './errorpage.scss'
import {NavigateFunction, useNavigate, useRouteError} from "react-router-dom";
import Button from "../../components/buttons/Button/Button.tsx";

export default function ErrorPage() {
    // @ts-expect-error ts crying again
    const {message, status, statusText}: unknown = useRouteError();
    const navigate: NavigateFunction = useNavigate();

    const clickHandler = (): void => {
        navigate("/");
    };

    return (
        <div id="error-page">
            <div id="warning-container"></div>
            <div id="content-container">
                <h2 id="error" className="fancy-text">error</h2>
                <h1 id="status" className="fancy-text">{status}</h1>
                <h3 id="message">{statusText || message}</h3>
                <Button text="Home" clickHandler={clickHandler}/>
            </div>
        </div>
    );
}