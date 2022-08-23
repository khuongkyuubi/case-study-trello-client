import './App.css';
import HomePage from "./pages/Home/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardsPage from "./pages/Boards/BoardsPage";
import LoginPage from "./pages/LoginPage/LoginPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/boards" element={<BoardsPage />} />
                <Route path="/login" element={<LoginPage />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
