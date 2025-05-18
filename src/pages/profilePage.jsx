import LogoutButton from "../components/auth/logoutButton"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/profile/userInfo";
import SkillsDisplay from "../components/profile/skillsDisplay";
import "../css/profilePage.css"
import XpDisplay from "../components/profile/xpDisplay";
import SkillsList from "../components/profile/skillsList";
import AuditRatio from "../components/profile/auditRatio";
import { fetchGraphQL } from "../services/graphqlService";
import { GET_USER_INFO } from "../queries/userQueries";
import { isTokenExpired } from '../utils/authUtils';


const ProfilePage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token || isTokenExpired(token)) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetchGraphQL(GET_USER_INFO);
                setUserInfo(response.data.user[0]);
                setLoading(false);
            } catch (err) {
                console.error('Fetch Error:', err);
                setError(err.message || 'Failed to fetch user info');
                setLoading(false)
            }
        };
        fetchUserInfo();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!userInfo) return <div>No user data found</div>;

    return(
        <div className="profile-container">
            <header className="profile-header">
                <div className="header-content">
                    <h1>Profile</h1>
                    <h1>Welcome, {userInfo.firstName} {userInfo.lastName}</h1>
                    <LogoutButton />
                </div>
            </header>

            <main className="profile-content">
                <div className="profile-grid">
                    <section className="user-section">
                        <UserInfo />
                    </section>

                    <section className="skills-section">
                        <SkillsDisplay />
                    </section>

                    <section className="audit-ratio">
                        <AuditRatio />
                    </section>

                    <section className="skills-graph">
                        <SkillsList />
                    </section>

                    <section className="xp-section">
                        <XpDisplay />
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;