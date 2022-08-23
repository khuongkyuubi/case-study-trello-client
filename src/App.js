import './App.css';
import HomePage from "./pages/Home/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardsPage from "./pages/Boards/BoardsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AlertSnackBar from "./components/AlertSnackBar";
import Register from "./pages/RegisterPage/Register";



function App() {
    return (
        <BrowserRouter>
            <AlertSnackBar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/boards" element={<BoardsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
