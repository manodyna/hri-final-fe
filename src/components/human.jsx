import React, { useState } from 'react';
// import "./chatComponent.css";
import { useNavigate } from "react-router-dom";
import Humanoid3D from "./Humanoid3D";
// import Humanoid3D from "";

const ChatComponent = () => {
    const [inputText, setInputText] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isBotSpeaking, setIsBotSpeaking] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const sendQueryToCustomAPI = async (userQuery) => {
        const authToken = localStorage.getItem('AuthToken');
        const userId = localStorage.getItem('UserId');
        const payload = {
            userId: userId,
            query: userQuery
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                alert("looks like your token expired, login again");
                navigate('/login');
                return null;
            }

            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter' && event.shiftKey) {
            setInputText(inputText => inputText + "\n");
            event.preventDefault();
            return;
        }

        if (event.key === 'Enter' && inputText.trim()) {
            event.preventDefault();
            setIsLoading(true);
            setIsBotSpeaking(true); // humanoid starts "speaking/thinking"

            const newConversation = [
                ...conversation,
                { role: 'user', text: inputText }
            ];
            setConversation(newConversation);
            setInputText('');

            const apiResponseMessage = await sendQueryToCustomAPI(inputText);

            setIsLoading(false);
            setIsBotSpeaking(false); // stop mouth animation

            if (apiResponseMessage) {
                setConversation([
                    ...newConversation,
                    { role: 'ovii', text: apiResponseMessage }
                ]);
            }
        }
    };

    return (
        <div className="companion-layout">
            {/* LEFT: 3D digital human */}
            <div className="companion-left">
                {/*<div className="companion-title">Your companion</div>*/}
                {/*<div className="companion-subtitle">*/}
                {/*    Ask anything. I’ll remember, reflect, and respond.*/}
                {/*</div>*/}
                <div style={{ flex: 1, minHeight: 0 }}>
                    <Humanoid3D speaking={isBotSpeaking} />
                </div>
            </div>

            {/* RIGHT: conversation + input */}
            <div className="companion-right">
                <div className="conversation">
                    {conversation.map((message, index) => (
                        <div key={index} className={`message ${message.role}`}>
                            {message.text}
                        </div>
                    ))}
                </div>
                {/*<div className="message-input-container">*/}
                {/*    <textarea*/}
                {/*        className="message-input"*/}
                {/*        rows="4"*/}
                {/*        placeholder="Talk to your companion..."*/}
                {/*        value={inputText}*/}
                {/*        onChange={handleInputChange}*/}
                {/*        onKeyPress={handleKeyPress}*/}
                {/*        disabled={isLoading}*/}
                {/*    />*/}
                {/*    {isLoading && <div className="spinner"></div>}*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default ChatComponent;
