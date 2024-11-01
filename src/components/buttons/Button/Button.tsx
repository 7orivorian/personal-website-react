import "./button.scss";

export default function Button({text, clickHandler}) {
    return (
        <div className="button" onClick={clickHandler}>
            <h2 className="button__text">{text}</h2>
        </div>
    );
}