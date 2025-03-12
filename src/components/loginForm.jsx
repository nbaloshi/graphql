import { useState } from "react";

const LoginForm = ({ onSubmit }) => {
    
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    });
    const [ error, setError ] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await onSubmit(formData);
        } catch (err) {
            setError('Login failed, please check your credentials')
        }
    }

    return(
        <div className="login-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username/Email:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="Enter username or email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter password"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="subit" className="login-button">Login</button>
            </form>
        </div>
    )
}

export default LoginForm