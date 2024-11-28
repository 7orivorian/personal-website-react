import "./button.scss";

interface Props {
    text: string;
    clickHandler?: () => void;
}

export default function Button({text, clickHandler}: Props) {
    return (
        <div className="button" onClick={clickHandler}>
            <h2 className="button__text">{text}</h2>
        </div>
    );
}