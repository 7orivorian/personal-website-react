import {NavigateFunction, useNavigate, useRouteError} from "react-router-dom";
import '../stylesheets/errorpage.scss'
import LinkButton from "../components/buttons/LinkButton/LinkButton.tsx";

export default function ErrorPage() {
    // @ts-expect-error ts crying again
    const {message, status, statusText}: unknown = useRouteError();
    const navigate: NavigateFunction = useNavigate();

    const clickHandler = (): void => {
        console.log("Clicked");
        navigate("/");
    };

    return (
        <div id="error-page">
            <div id="warning-container"></div>
            <div id="content-container">
                <h2 id="error" className="fancy-text">error</h2>
                <h1 id="status" className="fancy-text">{status}</h1>
                <h3 id="message">{statusText || message}</h3>
                <LinkButton text="Home" textTag="h2" color="primary" clickHandler={clickHandler}/>
            </div>
        </div>
    );
}