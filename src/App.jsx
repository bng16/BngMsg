import Room from "./pages/Room";
import LoginPage from "./pages/LoginPage";
import RegisterAccount from "./pages/RegisterAccount";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRotes from "./components/PrivateRotes";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterAccount />} />

          <Route element={<PrivateRotes />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
