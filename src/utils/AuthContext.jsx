import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get(); // Await the promise
      setUser(accountDetails);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null); // Set user to null if there's an error
    }
    setLoading(false);
  };

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      await account.createEmailPasswordSession(credentials.email, credentials.password);
      const accountDetails = await account.get(); // Await the promise here as well
      setUser(accountDetails);
      navigate('/'); // Redirect after successful login
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleUserLogout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
