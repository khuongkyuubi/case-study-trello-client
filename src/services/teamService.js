import axios from 'axios';
import {openAlert} from '../redux/Slices/alertSlice';
import {
    changeRole,
    failCreatingTeam,
    failFetchingTeams,
    startCreatingTeam, startFetchingTeamCurrent,
    startFetchingTeams,
    successCreatingTeam,
    successFetchingTeam,
    successFetchingTeams,
} from "../redux/Slices/teamSlice";
import {
    addTeamFind,
    inviteTeamMember,
    removeTeamMember,
    updateRoleTeamFind, updateRoleUserRole,
    updateTeamCreate
} from "../redux/Slices/userSlice";

import board from "../pages/BoardPage/Board";
import {addNewBoard, addNewTeam} from "../redux/userSlice";
import {useNavigate} from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_ENDPOINT;

// export const getBoard = async (boardId, dispatch) => {
//
//     dispatch(setLoading(true));
//     try {
//         const res = await  axios.get(baseUrl + "/board/" + boardId);
//         dispatch(successFetchingBoard(res.data));
//         setTimeout(()=> {
//             dispatch(setLoading(false))
//         }, 1000);
//     } catch (error) {
//         dispatch(setLoading(false));
//         dispatch(
//             openAlert({
//                 // custom error will have response.data
//                 message: error?.response?.data?.errMessage || error.message,
//                 severity: "error",
//             })
//         )
//
//     }
// }

export const getTeams = async (fromDropDown, dispatch) => {
    if (!fromDropDown) dispatch(startFetchingTeams());
    try {
        const res = await axios.get(baseUrl + "/team/");
        setTimeout(() => {
            dispatch(successFetchingTeams({teams: res.data}));
        }, 1000);
    } catch (error) {
        dispatch(failFetchingTeams());
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage
                    ? error.response.data.errMessage
                    : error.message,
                severity: "error",
            })
        );
    }
}

const demo = async (idTeam) => {
    return await axios.get(baseUrl + `/team/${idTeam}`);
}

export const getTeam = async (fromDropDown,idTeam, dispatch) => {
    if (!fromDropDown) dispatch(startFetchingTeamCurrent());
    try {

        demo(idTeam).then(res => {
            // console.log(res.data, "team data")
            dispatch(addTeamFind({team: res.data}));
            dispatch(successFetchingTeam({team: res.data}));
        })

    } catch (error) {
        dispatch(failFetchingTeams());
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage
                    ? error.response.data.errMessage
                    : error.message,
                severity: "error",
            })
        );
    }
}



export const createTeam = async (props, dispatch,navigate) => {
    dispatch(startCreatingTeam());
    if (!(props.name)) {
        dispatch(failCreatingTeam());
        dispatch(
            openAlert({
                message: "Please enter a name for team!",
                severity: "warning",
            })
        );
        return;
    }
    try {
        const res = await axios.post(baseUrl + "/team/create", props);
        dispatch(addNewTeam(res.data));
        dispatch(successCreatingTeam(res.data));
        dispatch(updateTeamCreate({team: res.data}))
        dispatch(
            openAlert({
                message: `${res.data.name} team has been successfully created`,
                severity: "success",
            })
        );
        setTimeout(() => {
           navigate(`/home`);
        }, 1000)

    } catch (error) {
        dispatch(failCreatingTeam());
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage
                    ? error.response.data.errMessage
                    : error.message,
                severity: "error",
            })
        );
    }
};

export const changeRoleTeam = async (role, teamId, dispatch) => {
    dispatch(changeRole({role: role, teamId: teamId}));
    dispatch(updateRoleTeamFind(role))
    try {
        const res = await axios.post(baseUrl + "/team/change-role", {role: role, idTeam: teamId});
    } catch (error) {
        // dispatch(failFetchingTeams());
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage
                    ? error.response.data.errMessage
                    : error.message,
                severity: "error",
            })
        );
    }
}
export const changeRoleUserTeam = async (idMember, idTeam, dispatch, roleUser, memberUser) => {

    dispatch(updateRoleUserRole({idMember, idTeam, roleUser}));
    try {
        const res = await axios.put(baseUrl + "/team/change-role-user", {roleUser: roleUser, idTeam: idTeam, idUser: memberUser, idMember: idMember});
    } catch (error) {
        // dispatch(failFetchingTeams());
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage
                    ? error.response.data.errMessage
                    : error.message,
                severity: "error",
            })
        );
    }
}

export const removeMemberTeam = async (idMember, teamId, dispatch, idUser) => {
    try {
        dispatch(startCreatingTeam());

        const res = await axios.post(baseUrl + "/team/remove-member", {idMember, teamId, idUser})
        dispatch(removeTeamMember({idMember, teamId }));
        dispatch(successCreatingTeam());
        dispatch(
            openAlert({
                message: res.data.message,
                severity: "success",
            })
        );
    } catch (error) {

        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage
                    ? error.response.data.errMessage
                    : error.message,
                severity: "error",
            })
        );
    }
}

export const inviteMemberTeam = async (idTeam, members, dispatch) => {
    try {

        const res = await axios.post(baseUrl + "/team/invite", {idTeam: idTeam, members: members});
        dispatch(
            openAlert({
                message: res.data.message,
                severity: 'success',
            })
        );
        // console.log(res.data.members, "...");
        dispatch(inviteTeamMember({idTeam: idTeam, members: res.data.members}))
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage
                    ? error.response.data.errMessage
                    : error.message,
                severity: "error",
            })
        );
    }
}

