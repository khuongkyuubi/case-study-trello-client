import './App.css';
import HomePage from "./pages/Home/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardsPage from "./pages/Boards/BoardsPage";
import MyBoardsPage from "./pages/MyBoards/MyBoardsPage";
import BoardMemberHome from "./pages/BoardMember/BoardMemberHome";
import SettingHomePage from "./pages/SettingPage/SettingHomePage";


function App() {

    return (
        <BrowserRouter>

            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/boards" element={<BoardsPage />} />
                <Route path="/my-boards" element={<MyBoardsPage />} />
                <Route path="/members" element={<BoardMemberHome />} />
                <Route path="/setting" element={<SettingHomePage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
