import {useUser} from "../../contexts/UserContext.tsx";
import {useEffect} from "react";
import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";
import {useNavigate} from "react-router-dom";

export default function Account() {
    const {user, fetchWithAuth, isAuthenticated, isAdmin, logout} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/user/auth?type=login");
            return;
        }
        fetchWithAuth(`test/secured/ping`).then((res) => console.log(res));
    }, [fetchWithAuth, isAuthenticated, navigate]);

    return (
        <>
            <FadeInSection>
                <div className="current-user">
                    <h1 className="current-user-heading">Current User</h1>
                    <p className="current-user-name">
                        user.username: {user?.username}
                    </p>
                    <p className="current-user-email">
                        user.email: {user?.email}
                    </p>
                    <p className="current-user-id">
                        user.id: {user?.id}
                    </p>
                    <p className="current-user-is-admin">
                        user.admin: {user?.admin ? "true" : "false"}
                    </p>
                    <button onClick={logout}>Logout</button>
                </div>
            </FadeInSection>
            {isAdmin() && (
                <FadeInSection>
                    <button onClick={() => navigate('/admin')}>Admin Panel</button>
                </FadeInSection>
            )}
        </>
    );
}