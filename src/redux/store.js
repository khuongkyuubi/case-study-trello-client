//demo
import {configureStore} from "@reduxjs/toolkit";
import boardReducer from "./Slices/boardSlice";
import listReducer from "./Slices/listSlice";
import userReducer from "./Slices/userSlice";



const Store = configureStore({
    reducer: {
        board: boardReducer,
        list: listReducer,
        user: userReducer,


    }
})

export default Store;