import React, {ReactNode, useEffect, useRef, useState} from "react";
import "./fade-in-section.scss";

interface FadeInSectionProps {
    children: ReactNode;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({children}) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const target = domRef.current;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (target) {
                        observer.unobserve(target);
                    }
                }
            });
        });

        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, []);

    return (
        <div className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
             ref={domRef}
        >{children}</div>
    );
};

export default FadeInSection;