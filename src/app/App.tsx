import {useEffect, useRef, useState} from "react";
import {isMobileDevice} from "../scripts/utils.ts";
import TextRoller from "../components/TextRoller/TextRoller.tsx";
import Footer from "../components/Footer/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import Landing from "../pages/Landing/Landing.tsx";
import Links from "../pages/Links/Links.tsx";
import {Playground} from "../pages/Playground/Playground.tsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.tsx";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary.tsx";
import Navbar from "../components/Navbar/Navbar/Navbar.tsx";
import Resume from "../pages/Resume/Resume.tsx";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.tsx";
import Auth from "../pages/auth/Auth.tsx";
import {UserProvider} from "../contexts/UserContext.tsx";

export default function App() {
    const contentWidth = 1200;

    const [isProfileImgAnimating, setIsProfileImgAnimating] = useState(false);

    const profileClickHandler = (): void => {
        setIsProfileImgAnimating(true);
        setTimeout((): void => setIsProfileImgAnimating(false), 1000);
    };

    const pageContainerRef = useRef(null);

    useEffect(() => {
        // @ts-expect-error is not null
        const content = pageContainerRef.current.querySelector('.bottom-content');
        if (content) {
            content.style.setProperty("--content-width", `${contentWidth}px`);
        }

        if (isMobileDevice()) {
            let targetX: number = Math.random() * window.innerWidth;
            let targetY: number = Math.random() * window.innerHeight;
            let currentX: number = targetX;
            let currentY: number = targetY;
            let animationId: number;

            const animate = (): void => {
                const speedFactor = 0.01; // Adjust for smoother or faster movement
                currentX += (targetX - currentX) * speedFactor;
                currentY += (targetY - currentY) * speedFactor;

                // @ts-expect-error is not null
                const cards = pageContainerRef.current.getElementsByClassName('ci-card');
                for (const card of cards) {
                    const rect = card.getBoundingClientRect(),
                        x: number = currentX - rect.left,
                        y: number = currentY - rect.top;

                    card.style.setProperty("--mouse-x", `${x}px`);
                    card.style.setProperty("--mouse-y", `${y}px`);
                }

                if (Math.abs(targetX - currentX) < 10 && Math.abs(targetY - currentY) < 10) {
                    // When near the target, pick a new target
                    targetX = Math.random() * window.innerWidth;
                    targetY = Math.random() * window.innerHeight;
                }

                animationId = requestAnimationFrame(animate);
            };

            animate(); // Start the animation loop

            return (): void => {
                cancelAnimationFrame(animationId);
            };
        } else {
            const handleMouseMove = (e: any): void => {
                // @ts-expect-error is not null
                const cards = pageContainerRef.current.getElementsByClassName('ci-card');
                for (const card of cards) {
                    const rect = card.getBoundingClientRect(),
                        x: number = e.clientX - rect.left,
                        y: number = e.clientY - rect.top;

                    card.style.setProperty("--mouse-x", `${x}px`);
                    card.style.setProperty("--mouse-y", `${y}px`);
                }
            };

            const pageContainer = pageContainerRef.current;
            // @ts-expect-error is not null
            pageContainer.addEventListener("mousemove", handleMouseMove);

            return (): void => {
                // @ts-expect-error is not null
                pageContainer.removeEventListener("mousemove", handleMouseMove);
            };
        }
    }, [contentWidth]);

    return (
        <ErrorBoundary>
            <UserProvider>
                <div className="page-container" ref={pageContainerRef}>
                    <div className="top">
                        <TextRoller phrases={[
                            "a developer",
                            "a designer",
                            "cat obsessed",
                            "completely sane",
                            "7orivorian",
                        ]}/>
                        <Navbar/>
                    </div>
                    <div className="bottom">
                        <div className="profile-image-container">
                            <img className={`profile-image ${isProfileImgAnimating ? "do-profile-spin" : ""}`}
                                 src="../../public/images/profile_img_placeholder.jpg" alt="profile_img"
                                 onDoubleClick={profileClickHandler}
                            />
                        </div>
                        <div className="bottom-content">
                            <Routes>
                                <Route path='/' element={<Landing/>}/>
                                <Route path='/links' element={<Links/>}/>
                                <Route path='/playground' element={<Playground/>}/>
                                <Route path='/resume' element={<Resume/>}/>
                                <Route path='/auth' element={<Auth/>}/>
                                <Route path='*' element={<ErrorPage/>}/>
                            </Routes>
                            <ScrollToTop/>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </UserProvider>
        </ErrorBoundary>
    );
}