import "./App.css";
import Leaderboard from "./components/Leaderboard";
import UserCommunityRelationshipManager from "./components/UserCommunityRelationshipManager";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <div>
        <a href="https://frameonesoftware.com" target="_blank">
          <img src="/logo.png" className="logo" alt="Frame One Software Logo" />
        </a>
      </div>
      <div>
        <UserCommunityRelationshipManager />
      </div>
      <div>
        <Leaderboard />
      </div>
    </>
  );
}

export default App;
