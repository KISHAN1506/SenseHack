import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hackathons = () => {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHackathons = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/hackathons`);
                setHackathons(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchHackathons();
    }, []);

    if (loading) return <div className="container" style={{ marginTop: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>All Hackathons</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {hackathons.map((hackathon) => (
                    <div key={hackathon._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h3>{hackathon.name}</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                            {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                        </p>
                        <p>{hackathon.description.substring(0, 100)}...</p>
                        <div style={{ marginTop: 'auto' }}>
                            <Link to={`/hackathons/${hackathon._id}`} className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {hackathons.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>No hackathons found.</p>
            )}
        </div>
    );
};

export default Hackathons;
