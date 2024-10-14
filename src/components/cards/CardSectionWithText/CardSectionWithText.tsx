import {useEffect, useRef} from "react";
import "./card-section-with-text.scss";
import ImageCard from "../ImageCard/ImageCard.tsx";

export default function CardSectionWithText({width, height, card}) {
    const cardContainerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e): void => {
            const cards = cardContainerRef.current.getElementsByClassName("card");
            for (const card of cards) {
                const rect = card.getBoundingClientRect(),
                    x: number = e.clientX - rect.left,
                    y: number = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            }
        };

        const cardContainer = cardContainerRef.current;
        cardContainer.addEventListener("mousemove", handleMouseMove);

        return (): void => {
            cardContainer.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="card-section-with-text"
             ref={cardContainerRef}
             style={{gap: "10px"}}
        >
            <ImageCard key={card.key} header={card.header} text={card.text} imgUrl={card.imgUrl}
                       clickHandler={card.clickHandler}/>
            <div className="cswt-text">
                <p>Halooooo!</p>
            </div>
        </div>
    );
};