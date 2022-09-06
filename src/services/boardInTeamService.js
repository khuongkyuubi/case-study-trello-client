import axios from 'axios';
import {openAlert} from '../redux/Slices/alertSlice';
import {
    startFetchingBoardInTeam,
    successFetchingBoardInTeam,
    failFetchingBoardInTeam,
    startCreatingBoardInTeam,
    successCreatingBoardInTeam,
    failCreatingBoardInTeam,
} from "../redux/Slices/boardInTeamSlice";

import {
    setLoading,
    successFetchingBoard
} from "../redux/Slices/boardSlice";

import board from "../pages/BoardPage/Board";
import {startCreatingBoard, successCreatingBoard} from "../redux/Slices/boardsSlice";
// import { addNewBoard } from "../redux/userSlice";

const baseUrl = process.env.REACT_APP_API_ENDPOINT;

export const createBoardInTeam = async (idTeam,props, dispatch) => {

    const data={
        ...props,
        idTeam
    }

    if (!(props.title && props.backgroundImageLink)) {
        dispatch(
            openAlert({
                message: "Please enter a title for board!",
                severity: "warning",
            }));
        return;
    }
    try {
        const res = await axios.post(baseUrl + "/team/create-boards", data);


        dispatch(successCreatingBoard(res.data));
        dispatch(
            openAlert({
                message: `${res.data.title} board has been successfully created`,
                severity: "success",
            })
        );
        // setTimeout(()=>{window.location.href = `/board/${res.data._id}`;},1000)

    } catch (error) {
        dispatch(failCreatingBoardInTeam());
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
//
export const getListTeam = async (fromDropDown, dispatch) => {
    if(!fromDropDown)dispatch(startFetchingBoardInTeam());
    try {
        const res = await axios.get(baseUrl + "/team/");

        setTimeout(() => {
            dispatch(successFetchingBoardInTeam({ boards: res.data }));
        }, 1000);
    } catch (error) {
        dispatch(failFetchingBoardInTeam());
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
