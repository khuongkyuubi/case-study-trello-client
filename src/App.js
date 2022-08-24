import './App.css';
import Home from "./pages/HomePage/Home";
import Board from "./pages/BoardPage/Board"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardsPage from "./pages/BoardsPage";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                //dang demo
                <Route path="/" element={<Home />} />
                <Route path="/board/:id" element={<Board />} />
                <Route path="/boards" element={<BoardsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
