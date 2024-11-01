import Footer from "../../components/Footer/Footer.tsx";
import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";
import CardSection from "../../components/cards/CardSection/CardSection.tsx";
import {useNavigate} from "react-router-dom";
import "./playground.scss";
import {useEffect, useRef} from "react";
import HomeButton from "../../components/buttons/HomeButton/HomeButton.tsx";

export function Playground() {
    const navigate = useNavigate();

    const pageContainerRef = useRef(null);

    useEffect(() => {
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
    }, []);

    return (
        <>
            <div className="page-container" ref={pageContainerRef}>
                <HomeButton text={"Home"} clickHandler={() => navigate("/")}/>
                <div className="top">

                </div>
                <div className="bottom">
                    <div className="bottom-content">
                        <FadeInSection>
                            <CardSection cardType={"ci-card"} cellWidth={"300px"} cellHeight={"260px"} cards={[
                                {
                                    header: "Pop the Bubble",
                                    text: "The cutest web-game there ever was!",
                                    key: "pop_the_bubble",
                                    imgUrl: "../../../public/images/bubblegame.png",
                                    clickHandler: () => navigate("/playground/bubblegame"),
                                },
                            ]}/>
                        </FadeInSection>
                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    );
}