import axios from 'axios';
import {openAlert} from '../redux/Slices/alertSlice';
import {
    failFetchingBoards,
    startFetchingBoards,
    successFetchingBoards,
    successCreatingBoard,
    failCreatingBoard,
    startCreatingBoard,
} from "../redux/Slices/boardsSlice";
import {
    deleteMember,
    setLoading, statusBoard,
    successFetchingBoard,
    updateTitle,
    updateFilterMembers,
} from "../redux/Slices/boardSlice";
import board from "../pages/BoardPage/Board";
import { addNewBoard } from "../redux/userSlice";
import {successFetchingBoardInTeam} from "../redux/Slices/boardInTeamSlice";
import initMembersFilter from "../utils/initMembersFilter";

const baseUrl = process.env.REACT_APP_API_ENDPOINT;

export const getBoard = async (boardId, dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await  axios.get(baseUrl + "/board/" + boardId);

        dispatch(successFetchingBoard(res.data));
        console.log(res.data, "board data")
        // const initMembersFilter = (members) => {
        //     const state = {noMembers: false}
        //     members.map((member) => state[member.user] = false);
        //     return state;
        // }
        const initMembersFilterState = initMembersFilter(res.data.members);
        dispatch(updateFilterMembers(initMembersFilterState))



        setTimeout(()=> {
            dispatch(setLoading(false))
        }, 1000);
    } catch (error) {
        dispatch(setLoading(false));
        dispatch(
            openAlert({
                // custom error will have response.data
                message: error?.response?.data?.errMessage || error.message,
                severity: "error",
            })
        )

    }
}

export const getBoards = async (fromDropDown, dispatch) => {
    if(!fromDropDown)dispatch(startFetchingBoards());
    try {
        const res = await axios.get(baseUrl + "/boards/");
        setTimeout(() => {
            // dispatch(successFetchingBoardInTeam({ boards: res.data }))
            dispatch(successFetchingBoards({ boards: res.data }));
        }, 1000);
    } catch (error) {
        dispatch(failFetchingBoards());
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
export const createBoard = async (formDataCreateBoard, dispatch) => {
    dispatch(startCreatingBoard());
    if (!(formDataCreateBoard.title && formDataCreateBoard.backgroundImageLink)) {
        dispatch(failCreatingBoard());
        dispatch(
            openAlert({
                message: "Please enter a title for board!",
                severity: "warning",
            })
        );
        return;
    }
    try {

        const res = await axios.post(baseUrl + "/boards/create", formDataCreateBoard);
        console.log(res.data)
        dispatch(addNewBoard(res.data));
        dispatch(successFetchingBoard(res.data))
        dispatch(successCreatingBoard(res.data));
        dispatch(
            openAlert({
                message: `${res.data.title} board has been successfully created`,
                severity: "success",
            })
        );
        setTimeout(()=>{window.location.href = `/board/${res.data._id}`;},1000)

    } catch (error) {
        dispatch(failCreatingBoard());
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

export const boardTitleUpdate = async (title, boardId, dispatch) => {
    try {
        dispatch(updateTitle(title));
        await axios.put(baseUrl + '/board/' + boardId + '/update-board-title', {title:title});
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ? error.response.data.errMessage : error.message,
                severity: 'error',
            })
        );
    }
};

