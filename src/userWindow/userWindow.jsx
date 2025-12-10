import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userWindow.css";
// import "./inputComponent.css";
// import "./chatComponent.css";
import logo from "../assets/icon.svg";

const CompanionAgent = () => {
    const [activeTab, setActiveTab] = useState("companion");
    const [inputText, setInputText] = useState("");
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const sendToAgent = async (userInput) => {
        const authToken = localStorage.getItem("AuthToken");
        const userId = localStorage.getItem("UserId");

        try {
            setIsLoading(true);

            // 1. UPSERT MEMORY
            const upsertResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/v1/getInput`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        userId: userId,
                        input: userInput,
                    }),
                }
            );

            if (!upsertResponse.ok) {
                alert("Session expired. Login again.");
                navigate("/login");
                return;
            }

            // 2. QUERY MEMORY + AI
            const queryResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/v1/query`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        userId: userId,
                        query: userInput,
                    }),
                }
            );

            if (!queryResponse.ok) {
                throw new Error("Query failed");
            }

            const data = await queryResponse.json();

            const assistantReply =
                data.message || data.data || data.reply || "No response from agent.";

            // 3. SHOW AGENT REPLY
            setConversation((prev) => [
                ...prev,
                { role: "assistant", text: assistantReply },
            ]);
        } catch (error) {
            console.error("Agent Error:", error);
            setConversation((prev) => [
                ...prev,
                { role: "assistant", text: "Something went wrong." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === "Enter" && event.shiftKey) {
            setInputText((prev) => prev + "\n");
            event.preventDefault();
            return;
        }

        if (event.key === "Enter" && inputText.trim()) {
            event.preventDefault();

            const userMessage = inputText.trim();

            // Show user message instantly
            setConversation((prev) => [
                ...prev,
                { role: "user", text: userMessage },
            ]);

            setInputText("");

            // Send to agent
            await sendToAgent(userMessage);
        }
    };

    return (
        <div>
            {/* NAVBAR */}
            <div className="navbar">
                <div className="navbar-logo" onClick={() => navigate("/home")}>
                    <img src={logo} alt="Logo" style={{ cursor: "pointer" }} />
                </div>

                <div className="navbar-buttons">
                    <button
                        className={activeTab === "companion" ? "active" : "button"}
                        onClick={() => setActiveTab("companion")}
                    >
                        Companion
                    </button>

                    <button
                        className={activeTab === "memory" ? "active" : "button"}
                        onClick={() => setActiveTab("memory")}
                    >
                        Memory View
                    </button>
                </div>
            </div>

            {/* CHAT WINDOW */}
            <div className="interview-container">
                <div className="conversation">
                    {conversation.map((message, index) => (
                        <div key={index} className={`message ${message.role}`}>
                            {message.data}
                        </div>
                    ))}

                    {isLoading && (
                        <div className="message assistant">Thinking...</div>
                    )}
                </div>

                {/* INPUT */}
                <div className="message-input-container">
          <textarea
              className="message-input"
              rows="4"
              placeholder="Talk to your companion..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
          />
                </div>
            </div>
        </div>
    );
};

export default CompanionAgent;
