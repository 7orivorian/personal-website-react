import "./scroll-to-top.scss";
import {useEffect, useState} from "react";
import ArrowUpIcon from "../icon/material/ArrowUpIcon.tsx";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Show button when page is scrolled down 'x' amount
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <div className="to-top-container">
            <button className={`to-top-button ${isVisible ? "is-visible" : ""}`} onClick={scrollToTop}>
                <ArrowUpIcon/>
            </button>
        </div>
    );
}