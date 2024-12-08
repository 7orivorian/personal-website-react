import "./auth.scss";
import Register from "./Register/Register.tsx";
import {useEffect, useState} from "react";
import Login from "./Login/Login.tsx";
import {useSearchParams} from "react-router-dom";

export default function Auth() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [formType, setFormType] = useState(searchParams.get("type")?.toLowerCase() || "login");

    useEffect(() => {
        window.scrollTo({
            top: 500,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        setSearchParams({type: formType});
    }, [formType, setSearchParams]);

    const handleToggle = (): void => {
        setFormType((prev: string) => {
            switch (prev) {
                case "register":
                    return "login";
                default:
                    return "register";
            }
        })
    };

    return (
        <div className="auth-form-container">
            <div className={`carrier ${formType}`}>
                <Login/>
                <Register/>
            </div>
            <p className="form-toggle"
               onClick={handleToggle}>{formType === "login" ? "Don't have an account?" : "Already have an account?"}</p>
        </div>
    );
}