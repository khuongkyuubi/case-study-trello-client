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
    logout, updateUserInfo
} from "../redux/Slices/userSlice";
import {openAlert} from "../redux/Slices/alertSlice";
import setBearer from "../utils/setBearer";
import {changeRole} from "../redux/Slices/boardSlice";

const baseUrl = process.env.REACT_APP_API_ENDPOINT + "/user/";

export const register = async (
    {name, surname, email, password, repassword},
    dispatch
) => {
    dispatch(registrationStart());
    if (password !== repassword) {
        dispatch(
            openAlert({
                message: "Your passwords does not match!",
                severity: "error",
            })
        );
    } else {
        try {
            const res = await axios.post(`${baseUrl}register`, {
                name,
                surname,
                email,
                password,
            });
            dispatch(
                openAlert({
                    message: res.data.message,
                    severity: "success",
                    nextRoute: "/login",
                    duration: 1500,
                })
            );
        } catch (error) {
            console.log(error.response)
            dispatch(
                openAlert({
                    message: error?.response?.data?.errMessage[0].msg
                        ? error.response.data.errMessage[0].msg
                        : error.response.data.errMessage,
                    severity: "error",
                })
            );
        }
    }
    dispatch(registrationEnd());
};

export const login = async ({email, password}, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(baseUrl + "login", {email, password});
        const {user, message} = res.data;
        localStorage.setItem("token", user.token);
        setBearer(user.token);
        dispatch(loginSuccess({user}));
        dispatch(
            openAlert({
                message,
                severity: "success",
                duration: 500,
                nextRoute: "/boards",
            })
        );
    } catch (error) {
        dispatch(loginFailure());
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage[0].msg
                    ? error.response.data.errMessage[0].msg
                    : error.response.data.errMessage,
                severity: "error",
            })
        );
    }
};

export const loadUser = async (dispatch) => {
    dispatch(loadStart());
    if (!localStorage.token) return dispatch(loadFailure());
    setBearer(localStorage.token);
    try {
        const res = await axios.get(baseUrl + "get-user");
        dispatch(loadSuccess({user: res.data}));
    } catch (error) {
        dispatch(loadFailure());
    }
};

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
        const res = await axios.post(baseUrl + "get-user-with-email", {email});
        dispatch(fetchingFinish());
        return res.data;
    } catch (error) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage[0].msg
                    ? error.response.data.errMessage[0].msg
                    : error.response.data.errMessage,
                severity: "error",
            })
        );
        dispatch(fetchingFinish());
        return null;
    }
};

export const logOut = async (user, dispatch) => {
    dispatch(logout(user))
}
export const uploadAvatar = async (data, dispatch) => {
    dispatch(fetchingStart())
    try {
        const res = await axios.post(process.env.REACT_APP_API_ENDPOINT + '/uploads/avatar', data);
        dispatch(fetchingFinish())
        dispatch(
            openAlert({
                message: "Update Complete",
                severity: "success",
                duration: 500,
                nextRoute: "/settings"
            })
        );
        return res.data;
    } catch (error) {
        dispatch(
            openAlert({
                message: 'Update is not allowed',
                severity: "error",
            })
        );
        dispatch(fetchingFinish())
    }
}
export const updateInfoUser = async ({name, surname, email, password, newPassword}, dispatch) => {
    try {
        const res = await axios.post(baseUrl + 'user-update', {
            name: name,
            surname: surname,
            email,
            newPassword,
            password
        })
        dispatch(fetchingFinish())
        dispatch(
            openAlert({
                message: "Update Complete",
                severity: "success",
                duration: 500,
                nextRoute: "/home"
            })
        )
        return res.data
    } catch (e) {
        dispatch(
            openAlert({
                message: 'Password does not match',
                severity: "error",
            })
        );
        dispatch(fetchingFinish())
        return null;
    }
}

export const changeRoleUser = async (role, dispatch, idMember, idBoard) => {
    try {
        const res = await axios.post(baseUrl + 'user-update-role',
            {
                role,
                idMember,
                idBoard
            })
        console.log(res.data,'.........................................')
        dispatch(changeRole({
                role,
                idMember
            }
        ))

        // dispatch(fetchingFinish())
        // dispatch(
        //     openAlert({
        //         message:"Update Complete",
        //         severity: "success",
        //         duration: 500,
        //         nextRoute: "/home"
        //     })
        // )
        // return res.data
    } catch (e) {
        dispatch(
            openAlert({
                message: 'Password does not match',
                severity: "error",
            })
        );
        dispatch(fetchingFinish())
        return null;
    }


    // dispatch(setRoleForUser(role))


}

export const getUserInfo = async (dispatch) => {
    try {
        const res = await axios.get(baseUrl + "get-user");
        dispatch(updateUserInfo(res.data));
    } catch (error) {
        dispatch(loadFailure());
    }
};
