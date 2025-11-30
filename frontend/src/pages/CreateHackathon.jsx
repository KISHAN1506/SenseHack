import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CreateHackathon = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        registrationDeadline: ''
    });
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_API_URL}/api/hackathons`, formData, {
                headers: { 'x-auth-token': token }
            });
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to create hackathon');
        }
    };

    if (!user || user.role !== 'organizer') {
        return <div className="container">Access Denied</div>;
    }

    return (
        <div className="container" style={{ marginTop: '2rem', maxWidth: '600px' }}>
            <div className="card">
                <h2>Create Hackathon</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Hackathon Name"
                        className="input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="input"
                        style={{ minHeight: '100px', fontFamily: 'inherit' }}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <label>Start Date</label>
                    <input
                        type="date"
                        className="input"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        required
                    />
                    <label>End Date</label>
                    <input
                        type="date"
                        className="input"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        required
                    />
                    <label>Registration Deadline</label>
                    <input
                        type="date"
                        className="input"
                        value={formData.registrationDeadline}
                        onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                        required
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Create Hackathon</button>
                </form>
            </div>
        </div>
    );
};

export default CreateHackathon;
