import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './cards.css';
import flamingo from '../assets/flamingo.png';
import hummingbird from '../assets/hummingbird.png';
import logo from '../assets/icon.svg';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('AuthToken');

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/logout`, {
                method: 'POST',
                credentials: 'include', // Necessary if cookies are used for session tracking
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                navigate('/login');
                localStorage.removeItem('AuthToken');
            } else {
                // Handle any errors here
                const errorData = await response.json();
                console.error('Logout failed:', errorData.message);
            }
        } catch (error) {
            console.error('Logout request failed', error);
        }
    };
    const handleResetPassword = async () => {
        navigate('/reset-password')
    }


    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Bird logo" /> {/* Make sure to define 'logo' */}
            </div>
            <div className="navbar-buttons">
                <button onClick={handleLogout}>Log Out</button>
                <button onClick={handleResetPassword} className="reset-password">Reset Password</button>
            </div>
        </div>
    );
};

const Card = ({ title, description, linkTo, image, backgroundColor, titleColor }) => (
    <div className="card" style={{ backgroundColor: backgroundColor }}>
        <div className="card-image-container" style={{ backgroundImage: `url(${image})` }}>
            {/* Image is set via inline styles */}
        </div>
        <div className="card-content">
            <Link to={linkTo} className="card-title">
                <h2 style={{color: titleColor}}>{title}</h2>
            </Link>
            <div className="card-description">
                <p>{description}</p>
            </div>
            <Link to={linkTo} className="card-action">
                Go
            </Link>
        </div>
    </div>
);


const CardsPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className="cards-container">
                <Card
                    title="Cherish Every Moment, Add Your Beautiful Memories."
                    linkTo="/memories"
                    image={hummingbird}
                    backgroundColor="#FEEAE8"
                    titleColor="#5e8e85"
                    onClick={navigate('/memories')}
                />
                <Card
                    title="Discover the Emotions, Find All Your Precious Memories."
                    // description="Look back on your memories."
                    linkTo="/memories"
                    image={flamingo}
                    backgroundColor="#F4F6FC"
                    titleColor="#ce706d"
                    onClick={navigate('/memories')}
                />
            </div>
        </div>
    );
};

export default CardsPage;
