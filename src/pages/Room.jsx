import { useEffect, useState } from 'react';
import service from '../appwrite/config'; 

function Room() {
  useEffect(() => {
    const result = service.getMessages();
    console.log('res :: ',result);
  },[])

  return (
    <div>Room</div>
  )
}

export default Room