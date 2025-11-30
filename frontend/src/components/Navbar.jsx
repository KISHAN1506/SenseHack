import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav style={{ borderBottom: '1px solid var(--color-border)', padding: '1rem 0', backgroundColor: 'rgba(5, 5, 5, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                    <Terminal color="var(--color-primary)" />
                    SENSE HACK
                </Link>

                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/hackathons">Hackathons</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/login" className="btn btn-outline">Login</Link>
                    <Link to="/register" className="btn btn-primary">Register</Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', background: 'none', border: 'none', color: 'white' }}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
