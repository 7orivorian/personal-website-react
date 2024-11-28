import "./navbar.scss";
import NavItem from "../NavItem/NavItem.tsx";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <NavItem to={'/'} text={"Home"}/>
            </div>
            <div className="navbar-right">
                <NavItem to={'/links'} text={"Links"}/>
            </div>
        </div>
    );
}