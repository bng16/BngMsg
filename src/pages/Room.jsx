import { useEffect, useState } from 'react';
import { datanases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appwriteConfig';

function Room() {

  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    getMessages();
  },[])

  const getMessages = async () => {
    const response=await datanases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES);
    console.log('RESPONSE : ',response);
    setMessages(response.documents);
  }

  return (
    <div>
      <div>
        {messages.map(message => (
          <div key={message.$id}>
            <div>
              <p>
                {message.$createdAt}
              </p>
            </div>
            <div>
              <span>
                {message.body} 
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Room