import "./card-section.scss";
import {ReactNode} from "react";

interface Props {
    children: ReactNode;
}

export default function CardSection({children}: Props): ReactNode {
    return (
        <div id="cards">
            {children}
        </div>
    );
};