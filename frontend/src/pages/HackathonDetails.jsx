import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const HackathonDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [hackathon, setHackathon] = useState(null);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHackathon = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/hackathons/${id}`);
                setHackathon(res.data);

                const teamsRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/hackathons/${id}/teams/open`);
                setTeams(teamsRes.data);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchHackathon();
    }, [id]);

    if (loading) return <div className="container">Loading...</div>;
    if (!hackathon) return <div className="container">Hackathon not found</div>;

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <div className="card" style={{ marginBottom: '2rem' }}>
                <h1>{hackathon.name}</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{hackathon.description}</p>
                <div style={{ display: 'flex', gap: '2rem', color: 'var(--color-text-secondary)' }}>
                    <span>Start: {new Date(hackathon.startDate).toLocaleDateString()}</span>
                    <span>Phase: <span style={{ color: 'var(--color-primary)' }}>{hackathon.currentPhase}</span></span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <h2>Open Teams</h2>
                    {teams.length === 0 ? (
                        <p>No open teams found.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {teams.map(team => (
                                <div key={team._id} className="card">
                                    <h3>{team.name}</h3>
                                    <p>Leader: {team.leader.name}</p>
                                    <button className="btn btn-outline" style={{ marginTop: '0.5rem' }}>Request to Join</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h2>Actions</h2>
                    {user && (
                        <div className="card">
                            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Create Team</button>
                            {/* Logic to show submission button if part of a team */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HackathonDetails;
