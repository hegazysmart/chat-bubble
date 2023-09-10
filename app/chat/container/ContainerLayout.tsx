import "./containerLayout.css";
import React, { useEffect, useState } from "react";

const ChatContainer: React.FC<ChatProps> = ({
  title,
  avatar,
  accentColor = "blue",
  direction = "ltr",
}) => {
  const [messageType, setMessageType] = useState<"text" | "image" | "voice">(
    "text"
  );
  const [messageContent, setMessageContent] = useState<any>("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "", userId: "", message: { type: "text", content: "" } },
  ]);
  const [idCounter, setIdCounter] = useState(-1);
  const [userId, setUserId] = useState(1);

  const handleSendMessage = () => {
    setIdCounter(idCounter + 1);
    setMessages([
      ...messages,
      {
        id: `${idCounter}`,
        userId: `${userId}`,
        message: { type: messageType, content: messageContent },
      },
    ]);
    setMessageContent("");
  };

  const handleChange = (target: any) => {
    if (target.type === "text") {
      setMessageContent(target.value);
    } else {
      const file = target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setMessageContent(url);
      }
    }
  };

  useEffect(() => {
    // Fetch the JSON data from the public directory
    fetch('/data.json')
      .then(response => response.json())
      .then(json => setMessages(json.data))
      .catch(error => {
        console.error("Error fetching the data", error);
      });
  }, []);

  return (
    <div style={{ direction, borderColor: accentColor }} className="chat-box">
      <div className="chat-header">
        {avatar && <img src={avatar} alt="Avatar" />}
        <h2 style={{ color: accentColor }}>{title}</h2>
      </div>
      <div className="chat-messages">
        {messages.map(
          (msg: any) =>
            msg.id && (
              <div key={msg.id}>
                <p className="userId">user {msg.userId}</p>
                <div className={`message ${msg.userId % 2 > 0 ? "a1" : "b1"}`}>
                  {msg.message.type === "text" && <p>{msg.message.content}</p>}
                  {msg.message.type === "image" && (
                    <img src={msg.message.content} alt="User's message" />
                  )}
                  {msg.message.type === "voice" && (
                    <audio controls src={msg.message.content}></audio>
                  )}
                </div>
              </div>
            )
        )}
      </div>
      <div className="chat-input">
        <select
          value={messageType}
          onChange={(e) => {
            setMessageContent("");
            setMessageType(e.target.value as any);
          }}
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="voice">Voice</option>
        </select>
        {messageType === "text" ? (
          <input
            type="text"
            value={messageContent}
            onChange={(e) => handleChange(e.target)}
            placeholder="Type your message"
          />
        ) : (
          <input type="file" onChange={(e) => handleChange(e.target)} />
        )}

        <button
          style={{ backgroundColor: accentColor }}
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
