import { isTokenExpired } from '../utils/authUtils';

const API_URL = 'https://learn.reboot01.com/api/graphql-engine/v1/graphql';

const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Token expired');
    }
    const cleanToken = token.replace(/"/g, '')
    return cleanToken;
};

const fetchGraphQL = async (query) => {
    const token = getAuthToken();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({query})
        });

        const data = await response.json();

        return data;
    } catch (err) {
        console.error('GraphQL request failed:', err);
        throw err;
    }
};

export { fetchGraphQL };