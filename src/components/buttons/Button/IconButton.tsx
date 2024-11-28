import "./icon-button.scss";
import React from "react";

interface Props {
    clickHandler?: () => void;
    children?: React.ReactNode;
}

export default function IconButton({clickHandler, children}: Props) {
    return (
        <div className="icon-button" onClick={clickHandler}>
            {children}
        </div>
    );
}