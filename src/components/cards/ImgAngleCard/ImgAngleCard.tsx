import "./img-angle-card.scss";

export default function ImgAngleCard({imageUrl, header, text, clickHandler}: {
    imageUrl: string,
    header: string,
    text: string,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    clickHandler: Function
}) {
    return (
        <div className="angle-card"
             style={{backgroundImage: `url("${imageUrl}")`}}
             onClick={(): void => clickHandler()}>
            <div className="angle-card-inner">
                <div className="angle-card-text-container">
                    <h1 className="angle-card-header fancy-text">{header}</h1>
                    <p className="angle-card-text">{text}</p>
                </div>
            </div>
        </div>
    );
}