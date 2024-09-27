import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

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
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleUserLogout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const handleUserRegister = async (credentials) => {

    try {
      // Register user with email, password, and username
      await account.create(
        ID.unique(),
        credentials.email,
        credentials.password,
        credentials.username
      );

      // Log user in after registration
      await account.createEmailPasswordSession(credentials.email, credentials.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate('/');
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
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
