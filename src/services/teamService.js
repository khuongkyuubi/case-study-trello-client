import axios from 'axios';
import {openAlert} from '../redux/Slices/alertSlice';
import {

    startCreatingTeam,
    successCreatingTeam,
    failCreatingTeam,
    reset, startFetchingTeams, successFetchingTeams, failFetchingTeams
} from "../redux/Slices/teamSlice";

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
export const createTeam = async (dataFrom, dispatch,navigate) => {
    dispatch(startCreatingTeam());
    if (!(dataFrom.name)) {
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
        const res = await axios.post(baseUrl + "/team/create", dataFrom);
        dispatch(addNewTeam(res.data));
        dispatch(successCreatingTeam(res.data));
        dispatch(
            openAlert({
                message: `${res.data.title} team has been successfully created`,
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
