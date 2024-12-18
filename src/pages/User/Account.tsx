import {useUser} from "../../contexts/UserContext.tsx";
import {useEffect} from "react";
import FadeInSection from "../../components/FadeInSection/FadeInSection.tsx";
import {useNavigate} from "react-router-dom";

export default function Account() {
    const {user, fetchWithAuth} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/auth?type=login");
            return;
        }
        fetchWithAuth(`users/${user?.id}`).then((res) => console.log(res.ok ? "yes" : "no"));
    }, [fetchWithAuth, navigate, user]);

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
                </div>
            </FadeInSection>
        </>
    );
}