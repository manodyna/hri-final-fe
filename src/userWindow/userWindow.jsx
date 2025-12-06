import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../components/input/inputComponent';
import ChatComponent from '../components/chat/chatComponent';
import './userWindow.css';
import logo from '../assets/icon.svg';
import toggler from '../assets/downArrow.png'

const TabbedPanel = () => {
    const [activeTab, setActiveTab] = useState('add-memory');
    const navigate = useNavigate();

    // Function to handle navigation
    const handleNavigate = (path) => {
        navigate(path);
    };

    // Function to handle tab switching
    const handleTabSwitch = (tabName) => {
        setActiveTab(tabName);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <div>
            <div className="navbar">
                <div className="navbar-logo" onClick={() => handleNavigate('/home')}>
                    {/* Logo will act as 'Home' tab */}
                    <img src={logo} alt="Bird logo" style={{ cursor: 'pointer' }} />
                </div>
                <div className="navbar-buttons">
                    {/* These buttons will act as tabs */}
                    <button
                        className={activeTab === 'add-memory' ? 'active' : 'button'}
                        onClick={() => handleTabSwitch('add-memory')}>
                        Add memories
                    </button>
                    <button
                        className={activeTab === 'retrieve-memory' ? 'active' : 'button'}
                        onClick={() => handleTabSwitch('retrieve-memory')}>
                        Retrieve memories
                    </button>
                    {/* Additional buttons for other actions */}
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'add-memory' && <InputComponent />}
                {activeTab === 'retrieve-memory' && <ChatComponent />}
            </div>
        </div>
    );
};

export default TabbedPanel;
