import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/users/Login";
import Registration from "./pages/users/Registration";
import NewStory from "./pages/users/NewStory";
import Feed from "./pages/Feed";
import Story from "./pages/users/Story";

function App() {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Feed />} />
        <Route path="/new-story" element={<NewStory />} />
        <Route path="/stories" element={<Story />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
