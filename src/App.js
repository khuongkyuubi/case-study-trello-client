import './App.css';
import HomePage from "./pages/Home/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardsPage from "./pages/Boards/BoardsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                //dang demo
                <Route path="/" element={<HomePage />} />
                <Route path="/boards" element={<BoardsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
