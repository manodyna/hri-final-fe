import React, { useState } from 'react';
import "./chatComponent.css";
import {useNavigate} from "react-router-dom";
import send from "../../assets/send.svg";
import bird from "../../assets/icon.svg";

const ChatComponent = () => {
    const [inputText, setInputText] = useState('');
    const [conversation, setConversation] = useState([]);
    const searchParams = new URLSearchParams(window.location.search);
    const [isLoading, setIsLoading] = useState(false);
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
                // throw new Error(`HTTP error! status: ${response.status}`);
                alert("looks like your token expired, login again");
                navigate('/login');
            }

            const data = await response.json();

            // Return only the message part of the response, or handle it as needed
            return data.data;
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleKeyPress = async (event) => {
        if (event.key === 'Enter' && event.shiftKey) {
            // Insert a line break into the text area
            setInputText(inputText => inputText + "\n");
            event.preventDefault();
        } else
            if (event.key === 'Enter') {
            event.preventDefault();
            setIsLoading(true); // Start loading
            const newConversation = [...conversation, { role: 'user', text: inputText }];
            setConversation(newConversation);
            setInputText('');

            const apiResponseMessage = await sendQueryToCustomAPI(inputText);
            setIsLoading(false); // End loading
            if (apiResponseMessage) {
                setConversation([...newConversation, { role: 'ovii', text: apiResponseMessage }]);
            }
        }
    };


    return (
        <div className="interview-container">
            <div className="conversation">

                {conversation.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        {/*<strong>{message.role.toUpperCase()}: </strong>*/}
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="message-input-container">
                <textarea
                    className="message-input"
                    rows="4"
                    placeholder="Enter your message..."
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                />
                {/*<button*/}
                {/*    className="icon-send-button"*/}
                {/*    onClick={() => handleKeyPress({ key: 'Enter' })}*/}
                {/*    disabled={isLoading}*/}
                {/*>*/}
                {/*    <img src={send} alt="Send" />*/}
                {/*</button>*/}
                {isLoading && <div className="spinner"></div>}
            </div>
        </div>
    );
};

export default ChatComponent;
