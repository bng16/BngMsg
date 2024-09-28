import { useEffect, useRef, useState } from "react";
import client, {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";

import { useAuth } from "../utils/AuthContext";


import { ID, Query, Role, Permission } from "appwrite";

import { MdOutlineDelete } from "react-icons/md";

import Header from "../components/Header";


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
  const messagesEndRef = useRef(null);
  const { user } = useAuth();


  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMessages((prev) => [...prev, response.payload]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setMessages((prev) =>
            prev.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    let payload = {
      body: messageBody,
      user_name: user.name,
      user_Id:user.$id
    };


    let permissions=[
      Permission.write(Role.user(user.$id)),
    ]

    await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions,
    );


    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.limit(150)]
    );
    setMessages(response.documents);
  };

  const deleteMessage = async (MSG_ID) => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, MSG_ID);
  };

  return (
    <div
      id="screen"
      className="w-screen h-screen bg-gray-950 flex justify-center overflow-hidden"
    >
      <div
        id="main"
        className="w-full md:w-[60%] h-full bg-gray-900 px-4 py-4 flex flex-col"
      >
        <Header/>
        <div id="msgs-container" className="h-full overflow-y-scroll">
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

              <div className="flex items-center">
                <div className="bg-[#F02D65] px-4 py-2 rounded-md mr-2 text-white font-medium text-md text-left w-fit max-w-[70%] break-words">
                  {message.body}
                </div>
                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && <MdOutlineDelete
                  className="text-white text-xl opacity-50 hover:opacity-100 cursor-pointer"
                  onClick={() => deleteMessage(message.$id)}
                />}
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
            className="bg-pink-600 text-white font-semibold py-2 rounded-md px-5 cursor-pointer"
            value='Send'
          />
        </form>
      </div>
    </div>
  );
}

export default Room;



