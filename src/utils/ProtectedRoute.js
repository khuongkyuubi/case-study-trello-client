import {useSelector} from "react-redux";
import {useNavigate, Outlet} from "react-router-dom";
import {useEffect} from "react";
import io from "socket.io-client";
import {useDispatch} from "react-redux";
import {addNotification, updateIsOpened} from "../redux/Slices/userSlice";
export let socket;
const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const {userInfo, notifications} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    //For socket.io
    useEffect(() => {
        if(userInfo) {
            socket = io(ENDPOINT);
            socket.emit("join", {rooms: userInfo.boards}, (error) => {
                if (error) {
                    alert(error);
                }
            });
            //
            socket.emit("join private", {room: userInfo._id}, (error)=> {
                if (error) {
                    alert(error);
                }
            })
            // Recivice notification
            socket.on("notify", ({sender, notify})=> {
                if(sender === userInfo._id) return;
                // handle when recivice notify
                dispatch(addNotification({sender, notify, isUnread: true}))
                dispatch(updateIsOpened(false))
                console.log({sender, notify, isUnread: true})
            })
        }

    }, [userInfo, dispatch]);
    useEffect(() => {
        if (!user.isAuthenticated && !user.pending) navigate("/");
    });
    return (
        user.isAuthenticated && !user.pending && <Outlet/>
    );
};

export default ProtectedRoute;