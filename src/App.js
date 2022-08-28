
import './App.css';
import {useEffect} from "react";
import HomePage from "./pages/Home/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardsPage from "./pages/Boards/BoardsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AlertSnackBar from "./components/AlertSnackBar";
import Register from "./pages/RegisterPage/Register";
import Index from "./pages/IndexPage/Index";
import Store from "./redux/store";
import {loadUser} from "./services/userService";
import FreeRoute from "./utils/FreeRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import Board from "./pages/BoardPage/Board";
import Boards from "./pages/BoardsPage";
import MyBoardsPage from "./pages/MyBoards/MyBoardsPage";
import BoardMemberHome from "./pages/BoardMember/BoardMemberHome";
import SettingHomePage from "./pages/SettingPage/SettingHomePage";
import {getTeams} from "./services/teamService";
import {useDispatch} from "react-redux";




function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        loadUser(Store.dispatch);
    }, []);
    useEffect(() => {
        getTeams(false,dispatch)
    },[])

    return (
        <BrowserRouter>
            <AlertSnackBar/>
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/boards" element={<BoardsPage/>}/>
                    <Route path="/board/:id" element={<Board/>}/>
                    <Route path="/my-boards" element={<MyBoardsPage />} />
                    <Route path="/members" element={<BoardMemberHome />} />
                    <Route path="/setting" element={<SettingHomePage/>} />
                    <Route path="/boards-create" element={<Boards/>}/>
                </Route>
                <Route element={<FreeRoute/>}>
                    <Route path="/" element={<Index/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
