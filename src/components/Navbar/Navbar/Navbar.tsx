import "./navbar.scss";
import NavItem from "../NavItem/NavItem.tsx";

export default function Navbar() {
    return (
        <div className="navbar">
            <NavItem to={'/'} text={"Home"}/>
            <NavItem to={'/links'} text={"Links"} right={true}/>
        </div>
    );
}