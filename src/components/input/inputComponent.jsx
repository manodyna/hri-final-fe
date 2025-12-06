import React, { useState } from 'react';
import "./inputComponent.css";
import {useNavigate} from "react-router-dom";
import send from "../../assets/send.svg";

const InputComponent = () => {
    const [inputText, setInputText] = useState('');
    const [conversation, setConversation] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const sendQueryToCustomAPI = async (userInput) => {
        const authToken = localStorage.getItem('AuthToken'); // Assuming auth token is stored in localStorage
        const userId = localStorage.getItem('UserId'); // Assuming user id is stored in localStorage

        console.log(authToken);

        const payload = {
            userId: userId,
            input: userInput
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/getInput`, { // Adjust the URL as necessary
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
            }

            const data = await response.json();

            // Process the response as needed
            return data.message;
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
        if (event.key === 'Enter' && inputText.trim()) {
            event.preventDefault();
            const newConversation = [...conversation, { role: 'user', text: inputText }];
            setConversation(newConversation);
            setInputText('');

            // Since the messages should only be user messages, we are not updating the conversation with the API response
            await sendQueryToCustomAPI(inputText);
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
            <textarea
                className="message-input"
                rows="4"
                placeholder="Enter Your Memories, For Example: I met my friend Sneha on 23rd nov 2023..."
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default InputComponent;
