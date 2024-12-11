import "./nav-item.scss";
import {Link} from "react-router-dom";

interface Props {
    to: string;
    text: string;
    target?: string;
    rel?: string;
    right?: boolean;
}

export default function NavItem({to, text, target = "_self", rel = "noopener noreferrer", right = false}: Props) {
    return (
        <Link className={`nav-link ${right ? "right" : ""}`} to={to} target={target} rel={rel}>
            {text}
        </Link>
    );
}