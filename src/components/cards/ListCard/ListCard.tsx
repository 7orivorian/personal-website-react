import React from "react";
import "./list-card.scss";

interface ListCardProps {
    header: string;
    text: string;
    clickHandler?: () => void;
    children: React.ReactNode;
}

export default function ListCard({header, text, clickHandler, children}: ListCardProps) {
    return (
        <div className="list-card" onClick={clickHandler && clickHandler}>
            <div className="list-card__text-container">
                <h2 className="list-card-header">{header}</h2>
                <p className="list-card-text">{text}</p>
            </div>
            <div className="list-card__svg-container">
                {children}
            </div>
        </div>
    );
}