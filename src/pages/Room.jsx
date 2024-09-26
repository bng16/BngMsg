import { useEffect, useRef, useState } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";

import { ID } from "appwrite";

// Helper function to format the date
const formatDate = (dateString) => {
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleString("en-GB", options);
};

function Room() {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const messagesEndRef = useRef(null); // Reference for scrolling

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    // Scroll to the bottom every time messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
      user_name: "Unknown",
    };

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );

    setMessages([...messages, response]);
    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES
    );
    setMessages(response.documents);
  };

  return (
    <div
      id="screen"
      className="w-screen h-screen bg-gray-950 flex justify-center overflow-hidden"
    >
      <div id="main" className="w-[60%] h-full bg-gray-900 px-4 py-4 flex flex-col">
        <div
          id="msgs-container"
          className="h-full overflow-y-scroll"
        >
          {messages.map((message) => (
            <div
              id="msg"
              key={message.$id}
              className="mb-3 flex flex-col gap-1"
            >
              <div id="msg-info" className="flex items-center">
                <h6 className="text-white font-semibold text-lg pr-3">
                  {message.user_name}
                </h6>
                <h6 className="text-white text-xs">
                  {formatDate(message.$createdAt)}
                </h6>
              </div>

              <div className="bg-[#F02D65] px-4 py-2 rounded-md text-white font-medium text-md text-left w-fit max-w-[70%] break-words">
                {message.body}
              </div>
            </div>
          ))}
          {/* Dummy div for auto-scrolling to the bottom */}
          <div ref={messagesEndRef}></div>
        </div>

        <form
          id="input-form"
          className="w-full bg-gray-800 p-2 flex gap-2 justify-around"
          onSubmit={handleSubmit}
        >
          <textarea
            className="resize-none p-2 w-[75%] h-[50px] max-h-[200px] text-white bg-gray-700 rounded-md"
            required
            rows="1"
            maxLength="1000"
            placeholder="Say something..."
            onChange={(e) => setMessageBody(e.target.value)}
            value={messageBody}
            style={{ overflowY: "auto" }} 
          />
          <input
            type="submit"
            className="bg-pink-600 text-white font-semibold py-2 rounded-md px-5"
            value="Send"
          />
        </form>
      </div>
    </div>
  );
}

export default Room;
