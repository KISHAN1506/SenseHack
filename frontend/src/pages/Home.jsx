import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Users, Trophy, Calendar, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section style={{
                padding: '10rem 0 8rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Glow */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(255, 87, 34, 0.15) 0%, transparent 70%)',
                    zIndex: -1,
                    pointerEvents: 'none'
                }}></div>

                <div className="container animate-slide-up">
                    <h1 style={{
                        fontSize: '5rem',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        fontWeight: 800,
                        letterSpacing: '-2px'
                    }}>
                        Build the <span style={{
                            color: 'var(--color-primary)',
                            textShadow: '0 0 30px rgba(255, 87, 34, 0.4)'
                        }}>Future</span><br />
                        at SENSE HACK
                    </h1>
                    <p style={{
                        fontSize: '1.3rem',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '700px',
                        margin: '0 auto 3rem',
                        lineHeight: 1.6
                    }} className="delay-100 animate-slide-up">
                        Join the ultimate hackathon experience. Collaborate, innovate, and compete with the best minds in tech.
                        Turn your ideas into reality in 48 hours.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }} className="delay-200 animate-slide-up">
                        <Link to="/register" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            Register Now <ArrowRight size={20} />
                        </Link>
                        <Link to="/hackathons" className="btn btn-outline" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
                            Explore Hackathons
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '5rem 0 8rem' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        <FeatureCard
                            icon={<Code size={40} color="var(--color-primary)" />}
                            title="Code & Create"
                            description="Build innovative solutions using the latest technologies. Push your limits."
                            delay="delay-100"
                        />
                        <FeatureCard
                            icon={<Users size={40} color="var(--color-primary)" />}
                            title="Team Up"
                            description="Find teammates and collaborate on exciting projects. Network with peers."
                            delay="delay-200"
                        />
                        <FeatureCard
                            icon={<Trophy size={40} color="var(--color-primary)" />}
                            title="Win Prizes"
                            description="Compete for amazing prizes and recognition. Get judged by industry experts."
                            delay="delay-300"
                        />
                        <FeatureCard
                            icon={<Calendar size={40} color="var(--color-primary)" />}
                            title="Events"
                            description="Participate in workshops and networking sessions throughout the event."
                            delay="delay-400"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => (
    <div className={`card animate-slide-up ${delay}`} style={{
        textAlign: 'left',
        padding: '2.5rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }}>
        <div style={{
            marginBottom: '1.5rem',
            padding: '15px',
            background: 'rgba(255, 87, 34, 0.1)',
            borderRadius: '12px',
            display: 'inline-flex'
        }}>{icon}</div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{description}</p>
    </div>
);

export default Home;
