import "./link-button.scss";
import React from "react";

export default function LinkButton({text, clickHandler, color, textTag}: {
    text: string
    textTag: "h1" | "h2" | "h3" | "p"
    color: "primary" | "secondary"
    clickHandler: () => void
}) {
    // Create an object that maps the color prop to the corresponding CSS variables
    const colorMap = {
        primary: {
            base: "var(--primary-color)",
            color75: "var(--primary-color-75)",
            color50: "var(--primary-color-50)",
            color25: "var(--primary-color-25)",
        },
        secondary: {
            base: "var(--secondary-color)",
            color75: "var(--secondary-color-75)",
            color50: "var(--secondary-color-50)",
            color25: "var(--secondary-color-25)",
        }
    };

    // Choose the color set based on the prop
    const selectedColor = colorMap[color];

    const LinkButtonText = React.createElement(
        textTag,
        {className: "link-button-text"},
        text
    );

    return (
        <div
            className="link-button"
            style={{
                // @ts-expect-error this works anyway, so we ignore the error
                '--button-color': selectedColor.base,
                '--button-color-75': selectedColor.color75,
                '--button-color-50': selectedColor.color50,
                '--button-color-25': selectedColor.color25,
            }}
            onClick={(): void => clickHandler()}
        >
            <span className="top-left-ghost"></span>
            <span className="top-left-hover-ghost"></span>
            <span className="bottom-right-ghost"></span>
            <span className="bottom-right-hover-ghost"></span>
            {LinkButtonText}
        </div>
    );
}