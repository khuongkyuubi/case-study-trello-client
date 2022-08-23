//demo
import {configureStore} from "@reduxjs/toolkit";
import boardReducer from "./Slices/boardSlice";
import listReducer from "./Slices/listSlice";
import alertReducer from "./Slices/alertSlice";

const Store = configureStore({
    reducer: {
        board: boardReducer,
        list: listReducer,
        alert: alertReducer
    }
})

export default Store;