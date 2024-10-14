import {useEffect, useRef} from "react";
import "./card-section.scss";
import ImageCard from "../ImageCard/ImageCard.tsx";

export default function CardSection({columns, rows, cellWidth, cellHeight, cards}) {
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

    let cardElements = null;
    if (cards && (cards.length > 0)) {
        cardElements = cards.map((card: {
            key: string;
            header: string;
            text: string;
            imgUrl: string;
            clickHandler: void
        }) => {
            return (
                <ImageCard key={card.key} header={card.header} text={card.text} imgUrl={card.imgUrl}
                           clickHandler={card.clickHandler}/>
            );
        });
    }

    return (
        <div id="cards" ref={cardContainerRef} style={{
            gridTemplateColumns: `repeat(${columns}, ${cellWidth})`,
            gridTemplateRows: `repeat(${rows}, ${cellHeight})`,
            gap: "10px"
        }}>
            {cardElements && cardElements}
        </div>
    );
};