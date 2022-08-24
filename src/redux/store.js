//demo
import {configureStore} from "@reduxjs/toolkit";
import boardReducer from "./Slices/boardSlice";
import listReducer from "./Slices/listSlice";
import boardsReducer from "./Slices/boardsSlice";
import userReducer from "./userSlice"




const Store = configureStore({
    reducer: {
        board: boardReducer,
        list: listReducer,
        boards: boardsReducer
    }
})

export default Store;