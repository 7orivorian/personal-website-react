import "./icon-angle-card.scss";

//TODO: This
export default function IconAngleCard({icon, header, text, clickHandler}: {
    icon: string,
    header: string,
    text: string,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    clickHandler: Function
}) {
    return (
        <div className="angle-card"
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