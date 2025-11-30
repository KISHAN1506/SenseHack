import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, loading } = useAuth();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`http://localhost:5000/api/users/${user._id || user.id}/dashboard`, {
                        headers: { 'x-auth-token': token }
                    });
                    setData(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchData();
    }, [user]);

    if (loading || !data) return <div className="container" style={{ marginTop: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Welcome, {user.name}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Participating Hackathons */}
                <div className="card">
                    <h2>Participating Hackathons</h2>
                    {data.participatingTeams.length === 0 ? (
                        <p style={{ color: 'var(--color-text-secondary)' }}>You are not participating in any hackathons yet.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {data.participatingTeams.map(team => (
                                <li key={team._id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                    <strong>{team.hackathon.name}</strong>
                                    <br />
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Team: {team.name}</span>
                                    <br />
                                    <Link to={`/hackathons/${team.hackathon._id}`} style={{ fontSize: '0.9rem' }}>View Details</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Organized Hackathons (if applicable) */}
                {data.organizedHackathons && data.organizedHackathons.length > 0 && (
                    <div className="card">
                        <h2>Organized Hackathons</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {data.organizedHackathons.map(hackathon => (
                                <li key={hackathon._id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                    <strong>{hackathon.name}</strong>
                                    <br />
                                    <span style={{ color: 'var(--color-text-secondary)' }}>Phase: {hackathon.currentPhase}</span>
                                    <br />
                                    <Link to={`/hackathons/${hackathon._id}`} style={{ fontSize: '0.9rem' }}>Manage</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
