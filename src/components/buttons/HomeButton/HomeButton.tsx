import "./home-button.scss";

export default function HomeButton({text, clickHandler}) {
    return (
        <div className="nav-button" onClick={clickHandler}>
            <h2 className="nav-button__text">{text}</h2>
        </div>
    );
}