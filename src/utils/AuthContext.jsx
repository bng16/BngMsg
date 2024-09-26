import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
  const [loding, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    setLoading(false)
  },[])

  const contectData={
    user,
  }

  return <AuthContext.Provider value={contectData} >
            {loding ? <p>Loading...</p> : children}
        </ AuthContext.Provider >
}

export const useAuth =()=>{
  return useContext(AuthContext)
}
export default AuthContext;
