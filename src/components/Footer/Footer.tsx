import "./footer.scss";
import AccountIcon from "../icon/material/AccountIcon.tsx";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../contexts/UserContext.tsx";
import LoginIcon from "../icon/material/LoginIcon.tsx";

export default function Footer() {
    const {isAuthenticated} = useUser();
    const navigate = useNavigate();

    return (
        <div className="footer">
            {isAuthenticated() ? (
                <button className="footer__button" onClick={() => navigate("/user/account")}>
                    <AccountIcon/>
                </button>
            ) : (
                <button className="footer__button" onClick={() => navigate("/user/auth")}>
                    <LoginIcon/>
                </button>
            )}
            <p className="copyright">&copy; {import.meta.env.VITE_MYNAME} 2024</p>
        </div>
    );
}