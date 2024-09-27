import { CiLogout } from "react-icons/ci";
import { useAuth } from "../utils/AuthContext";

function Header() {
  const { user, handleUserLogout } = useAuth();


  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {user ? (
        <>
          <span>Welcome, {user.name} !</span> {/* Display the user's name */}
          <CiLogout onClick={handleUserLogout} className="cursor-pointer text-white opacity-50 hover:opacity-100 text-3xl" />
        </>
      ) : (
        <button className="bg-pink-600 text-white py-2 px-4 rounded">
          Login
        </button>
      )}
    </div>
  );
}

export default Header;
