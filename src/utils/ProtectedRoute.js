import {useSelector} from "react-redux";
import {useNavigate, Outlet} from "react-router-dom";
import {useEffect} from "react";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (!user.isAuthenticated && !user.pending) navigate("/");
    });
    return (
        user.isAuthenticated && user.pending && <Outlet/>
    );
};

export default ProtectedRoute;