//demo
import {configureStore} from "@reduxjs/toolkit";
import boardReducer from "./Slices/boardSlice";
import listReducer from "./Slices/listSlice";
import alertReducer from "./Slices/alertSlice";
import userReducer from "./Slices/userSlice";
import boardsReducer from "./Slices/boardsSlice";
import teamReducer from "./Slices/teamSlice";



const Store = configureStore({
    reducer: {
        board: boardReducer,
        list: listReducer,
        alert: alertReducer,
        user: userReducer,
        boards: boardsReducer,
        team:teamReducer
    }
})

export default Store;