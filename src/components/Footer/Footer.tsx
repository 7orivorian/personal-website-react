import "./footer.scss";

export default function Footer() {
    return (
        <div className="footer">
            <p className="copyright">&copy; {import.meta.env.VITE_MYNAME} 2024</p>
        </div>
    );
}