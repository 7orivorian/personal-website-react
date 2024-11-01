import ImageCard from "../ImageCard/ImageCard.tsx";
import CoverImageCard from "../CoverImageCard/CoverImageCard.tsx";
import "./card-section.scss";

export default function CardSection({cardType, cellWidth, cellHeight, cards}) {
    let cardElements = null;
    if (cards && (cards.length > 0)) {
        cardElements = cards.map((card: {
            key: string;
            header: string;
            text: string;
            imgUrl: string;
            clickHandler: void
        }) => {
            switch (cardType) {
                case "ci-card":
                    return (
                        <CoverImageCard
                            key={card.key}
                            header={card.header}
                            text={card.text}
                            imgUrl={card.imgUrl}
                            clickHandler={card.clickHandler}
                        />
                    );
                default:
                    return (
                        <ImageCard
                            key={card.key}
                            header={card.header}
                            text={card.text}
                            imgUrl={card.imgUrl}
                            clickHandler={card.clickHandler}
                        />
                    );
            }
        });
    }

    return (
        <div id="cards">
            {cardElements && cardElements}
        </div>
    );
};