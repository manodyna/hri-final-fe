import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const PersonaChatRAG = () => {
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
            personaName: 'William shakespeare', // Set the desired persona name
            personaDescription: 'William shakespeare is a a famous playwright who has written a ' +
                'lot of plays like romeo and juliet' +
                'he speaks in shakespearean english and he uses a lot of poetry and prose' +
                'he is eloquent in speech', // Set the desired persona description
            personaPrompt: userQuery
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/personaRAG`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                // throw new Error(`HTTP error! status: ${response.status}`);
                alert("Looks like there was an issue creating the persona. Please try again.");
                return; // You might want to handle errors more gracefully based on your application's requirements
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
                {isLoading && <div className="spinner"></div>}
            </div>
        </div>
    );
};
export default PersonaChatRAG;