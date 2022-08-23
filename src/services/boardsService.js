import axios from 'axios';
import {openAlert} from '../redux/Slices/alertSlice';

import {
    setLoading,
    successFetchingBoard
} from "../redux/Slices/boardSlice";
import board from "../pages/BoardPage/Board";
const baseUrl = process.env.REACT_APP_API_ENDPOINT + "/board";

export const getBoard = async (boardId, dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await  axios.get(baseUrl + "/" + boardId);
        dispatch(successFetchingBoard(res.data));
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
