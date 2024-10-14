import "./image-card.scss";

export default function ImageCard({header, text, imgUrl, clickHandler}) {
    return (
        <div className="card" onClick={clickHandler && clickHandler}>
            <div className="card-content">
                <div className="card-image-container">
                    <div className="card-image"
                         style={{backgroundImage: `url(${imgUrl})`}}>
                    </div>
                </div>
                <div className="card-text-container">
                    <h2 className="card-header">{header}</h2>
                    <p className="card-text">{text}</p>
                </div>
            </div>
        </div>
    );
}