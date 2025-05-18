import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoginForm from "../components/auth/loginForm";
import "../css/loginPage.css"

const LoginPage = () => {
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/profile');
        }
    }, [navigate]);

    const handleLogin = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const credentials = btoa(`${formData.username}:${formData.password}`);

            const response = await fetch ('https://learn.reboot01.com/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if(!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid username or password');
                }
                throw new Error('Login failed');
            }

            const token = await response.text();
            const decodedToken = jwtDecode(token);

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(decodedToken));

            navigate('/profile')
        } catch (err) {
            console.error('Error details:', err);
            setError(err.message || 'Login failed, please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="login-container">
            <p className="login-subtitle">Please sign in to continue</p>
            {error && (
                <div className="error-message" style={{ 
                    color: '#dc2626',
                    backgroundColor: '#fee2e2',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem'
                }}>
                    {error}
                </div>
            )}
            { isLoading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Logging in...</p>
                </div>
            ) : (
                <LoginForm onSubmit={handleLogin}/>
            )}
        </div>
    )
}

export default LoginPage