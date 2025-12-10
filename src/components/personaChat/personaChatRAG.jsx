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

    const sendQueryToCustomAPI = async (userInput) => {
        const authToken = localStorage.getItem('AuthToken');
        const userId = localStorage.getItem('UserId');

        try {
            // 1. UPSERT MEMORY
            const upsertResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/v1/getInput`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify({
                        userId: userId,
                        input: userInput
                    })
                }
            );

            if (!upsertResponse.ok) {
                alert("Session expired. Login again.");
                navigate('/login');
                return null;
            }

            // 2. QUERY MEMORY + AI RESPONSE
            const queryResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/v1/query`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify({
                        userId: userId,
                        query: userInput
                    })
                }
            );

            if (!queryResponse.ok) {
                throw new Error("Query failed");
            }

            const data = await queryResponse.json();

            // THIS MUST BE TEXT
            return data.message || data.reply || data.answer;

        } catch (error) {
            console.error("API Error:", error);
            return "I had trouble recalling that. Try again.";
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