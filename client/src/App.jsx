import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/users/Login";
import Registration from "./pages/users/Registration";

import SearchAppBar from "./components/Navbar";

function App() {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/aa" element={<SearchAppBar />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
