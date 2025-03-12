import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoginForm from "../components/loginForm";

const LoginPage = () => {
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(false);

    const handleLogin = async (formData) => {
        setIsLoading(true);

        try {
            const credentials = btoa(`${formData.username}:${formData.password}`);

            const response = await fetch ('https://((DOMAIN))/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok) {
                throw new Error ('Login failed')
            }

            const { token } = await response.json();

            const decodedToken = jwtDecode(token)
            console.log('Decoded token:', decodedToken)

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(decodedToken));

            navigate('/profile')
        } catch (err) {
            throw new Error('Login failed, please check your credentials.')
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="login-page">
            <h1>Login</h1>
            { isLoading ? (
                <div>Loading...</div>
            ) : (
                <LoginForm onSubmit={handleLogin}/>
            )}
        </div>
    )
}

export default LoginPage