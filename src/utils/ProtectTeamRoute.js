import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Outlet, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import checkTeamVisibility from "./checkTeamVisibility";
import { getTeam} from "../services/teamService";
import LoadingScreen from "../components/LoadingScreen";

const ProtectedTeamRoute =  () => {
    const navigate = useNavigate();
    const {userInfo, teams, teamFind} = useSelector((state) => state.user);
    const { members,  teamsData, team, loading} = useSelector((state) => state.team);
    const {listTeamData} = useSelector((state) => state.boardInTeam);
    const {idTeam} = useParams();
    const dispatch = useDispatch();
    const [isAccessTeam, setIsAccessTeam] = useState(false)

    // const getInfoTeam = async () => {
    //     return await getTeam(false, idTeam, dispatch);
    // }
    // const result =  getTeam(false, idTeam, dispatch);
    // useEffect(() => {
    //     if((!loading) {
    //         const result = checkBoardVisibility(userInfo._id, visibility, members, boardTeams.members);
    //         console.log(result)
    //         if(!result) navigate("/")
    //     }
    // })
    useEffect(() => {
        getTeam(false, idTeam, dispatch);
    },[])

    // console.log(loading, "loading");
    useEffect( () => {
        // console.log(loading, "loading")
        // console.log(teamFind?.role, "Team Role")
        // console.log(teamFind?.name, "Team Name")
            if(!loading){
                const result = checkTeamVisibility(userInfo._id, teamFind?.members , teamFind?.role)
                // console.log(checkTeamVisibility(userInfo._id, teamFind?.members , teamFind?.role));
                result ? setIsAccessTeam(true) : navigate("/team/private")
                // if(!checkTeamVisibility(userInfo._id, teamFind?.members , teamFind?.role)){
                //     navigate("/team/private")
                // }
                // console.log(result, "result")
                // console.log(userInfo._id, "userId")
                // console.log(teamFind?.members, "member Team")
                // console.log(teamFind?.role, "Team Role")
                // console.log(teamFind?.name, "Team Name")
            }
        })

    return (
        (!loading && isAccessTeam)?
            <Outlet/>
            : <LoadingScreen/>
    );

};

export default ProtectedTeamRoute;