import axios from "axios";
import {
    registrationStart,
    registrationEnd,
    loginStart,
    loginFailure,
    loginSuccess,
    loadSuccess,
    loadFailure,
    loadStart,
    fetchingStart,
    fetchingFinish,
} from "../redux/userSlice";
import { openAlert } from "../redux/Slices/alertSlice";

const baseUrl = "http://localhost:3001/user/";



export const getUserFromEmail = async (email, dispatch) => {
    dispatch(fetchingStart());
    if (!email) {
        dispatch(
            openAlert({
                message: "Please write an email to invite",
                severity: "warning",
            })
        );
        dispatch(fetchingFinish());
        return null;
    }

    try {
        const res = await axios.post(baseUrl + "get-user-with-email", { email });
        dispatch(fetchingFinish());
        return res.data;
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage
                    ? error.response.data.errMessage
                    : error.message,
                severity: "error",
            })
        );
        dispatch(fetchingFinish());
        return null;
    }
};
