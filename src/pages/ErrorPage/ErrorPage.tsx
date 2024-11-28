import './errorpage.scss'
import {useRouteError} from "react-router-dom";
import NavItem from "../../components/Navbar/NavItem/NavItem.tsx";

export default function ErrorPage() {
    // @ts-expect-error ts crying again
    const {message, status, statusText}: unknown = useRouteError();

    return (
        <div id="error-page">
            <div id="warning-container"></div>
            <div id="content-container">
                <h2 id="error" className="fancy-text">error</h2>
                <h1 id="status" className="fancy-text">{status}</h1>
                <h3 id="message">{statusText || message}</h3>
                <NavItem to={'/'} text={"Home"}/>
            </div>
        </div>
    );
}