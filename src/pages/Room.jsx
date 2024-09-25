import { useEffect, useState } from "react";
import {
  datanases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";

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

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const response = await datanases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES
    );
    console.log("RESPONSE : ", response);
    setMessages(response.documents);
  };

  return (
    <div className="w-screen h-screen bg-gray-950 flex justify-center">
      <div className="w-[60%] h-full bg-gray-900 px-4 py-4">
        {messages.map((message) => (
          <div key={message.$id} className="mb-3 flex flex-col gap-1">
            <div className="flex items-center">
              <h6 className="text-white font-semibold text-lg pr-3">
                {message.user_name}
              </h6>
              <h6 className="text-white text-xs">{formatDate(message.$createdAt)}</h6>
            </div>

            <div>
              <div className="bg-pink-600 px-4 py-2 rounded-md text-white font-medium text-lg text-left max-w-[70%] ">
                {message.body}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Room;
