import "./cover-image-card.scss";

interface Props {
    header: string;
    text: string;
    imgUrl: string;
    clickHandler?: () => void;
}

export default function CoverImageCard({header, text, imgUrl, clickHandler}: Props) {
    return (
        <div className="ci-card" onClick={clickHandler && clickHandler}>
            <div className="ci-card__image">
                <img src={imgUrl} alt={header}/>
            </div>
            <div className="ci-card__text-container">
                <h2 className="ci-card-header">{header}</h2>
                <p className="ci-card-text">{text}</p>
            </div>
        </div>
    );
}