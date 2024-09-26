import { useEffect } from 'react';
import {useAuth} from "../utils/AuthContext";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const {user}=useAuth()
  const navigate=useNavigate()

  useEffect(() => {
    if(user){
      navigate('/')
    }
  },[])
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage