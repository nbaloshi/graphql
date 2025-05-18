import { useState, useEffect } from "react";
import { fetchGraphQL } from "../../services/graphqlService";
import { GET_USER_INFO } from "../../queries/userQueries";
import { User, Mail, Hash } from "lucide-react";
import "../../css/userInfo.css";

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return (
        <div className="user-info-container loading">
            <div className="loading-text">Loading user info...</div>
        </div>
    );
    
    if (error) return (
        <div className="user-info-container error">
            <div className="error-text">Error: {error}</div>
        </div>
    );
    
    if (!userInfo) return (
        <div className="user-info-container empty">
            <div className="empty-text">No user information found</div>
        </div>
    );

    return (
        <div className="user-info-container">
            <div className="user-header">
                <div className="avatar-container">
                    <div className="user-avatar">
                        {userInfo.firstName?.[0]?.toUpperCase() || userInfo.login[0].toUpperCase()}
                    </div>
                </div>
                <div className="user-title">
                    <h2 className="user-name">
                        {`${userInfo.firstName} ${userInfo.lastName}`}
                    </h2>
                    <p className="user-login">@{userInfo.login}</p>
                </div>
            </div>
            
            <div className="user-details">
                <div className="detail-item">
                    <User className="detail-icon" />
                    <div className="detail-content">
                        <span className="detail-label">Username</span>
                        <span className="detail-value">{userInfo.login}</span>
                    </div>
                </div>
                
                <div className="detail-item">
                    <Hash className="detail-icon" />
                    <div className="detail-content">
                        <span className="detail-label">ID</span>
                        <span className="detail-value">{userInfo.id}</span>
                    </div>
                </div>

                <div className="detail-item">
                    <Mail className="detail-icon" />
                    <div className="detail-content">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">{userInfo.email || 'Not provided'}</span>
                    </div>
                </div>
            </div>

            <div className="user-status">
                <span className="status-dot"></span>
                Active Student
            </div>
        </div>
    );
};

export default UserInfo;