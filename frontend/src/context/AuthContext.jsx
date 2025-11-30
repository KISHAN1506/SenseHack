import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // In a real app, you'd verify the token with the backend here
                    // For now, we'll just decode it or assume it's valid if we had a /me endpoint
                    // Let's assume we store user info in local storage for simplicity or fetch it
                    // const res = await axios.get('http://localhost:5000/api/auth/me', { headers: { 'x-auth-token': token } });
                    // setUser(res.data);

                    // Since we don't have /me yet, let's just set a dummy user or rely on login response
                    // Actually, let's implement a simple verify or just persist user data
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) setUser(JSON.parse(storedUser));
                } catch (err) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        // We need to decode token or fetch user. For now, let's assume backend returns user or we fetch it.
        // The backend currently only returns token.
        // Let's fetch user details or just decode if we had jwt-decode.
        // For now, I'll update backend to return user or just fetch dashboard.
        // Let's fetch dashboard to get user info.

        // Quick fix: Update backend login to return user data or fetch it here.
        // I'll fetch dashboard to get user info.
        // But dashboard needs ID.
        // I'll decode the token manually (base64) to get ID.
        const token = res.data.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user.id;

        const userRes = await axios.get(`http://localhost:5000/api/users/${userId}/dashboard`, {
            headers: { 'x-auth-token': token }
        });

        setUser(userRes.data.user);
        localStorage.setItem('user', JSON.stringify(userRes.data.user));
    };

    const register = async (name, email, password, role) => {
        const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
        localStorage.setItem('token', res.data.token);

        const token = res.data.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user.id;

        const userRes = await axios.get(`http://localhost:5000/api/users/${userId}/dashboard`, {
            headers: { 'x-auth-token': token }
        });

        setUser(userRes.data.user);
        localStorage.setItem('user', JSON.stringify(userRes.data.user));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
