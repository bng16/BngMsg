import { BrowserRouter, Routes, Route } from "react-router-dom";

import Room from "./pages/Room";
import LoginPage from "./pages/LoginPage";

import PrivateRotes from "./components/PrivateRotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRotes />}>
          <Route path="/" element={<Room />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
