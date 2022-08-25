import {Outlet, useNavigate} from "react-router-dom";
import {login} from "../services/userService";
import {useEffect, useLayoutEffect} from "react";

const FreeRoute = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        token && navigate("/home", {replace: true});
    })
    return (
        !token && <Outlet/>
    );
};

export default FreeRoute;