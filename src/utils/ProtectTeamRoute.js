import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Outlet, useParams} from "react-router-dom";
import {useEffect} from "react";
import checkTeamVisibility from "./checkTeamVisibility";
import { getTeam} from "../services/teamService";

const ProtectedTeamRoute =  () => {
    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.user);
    const { members, team} = useSelector((state) => state.team);
    const {idTeam} = useParams();
    const dispatch = useDispatch();

    const getInfoTeam = async () => {
        return await getTeam(false, idTeam, dispatch);

    }


    useEffect( () => {

        getInfoTeam().then((res)=>{
            console.log(team, "team");
            console.log(checkTeamVisibility(userInfo._id, team?.members, team?.role));
            if(!checkTeamVisibility(userInfo._id, team?.members , team?.role)){
                navigate("/team/private")
            }
        })
    },[])
    return (
        userInfo && <Outlet/>
    );
};

export default ProtectedTeamRoute;