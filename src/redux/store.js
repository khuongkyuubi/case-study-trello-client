//demo
import {configureStore} from "@reduxjs/toolkit";
import boardReducer from "./Slices/boardSlice";
import listReducer from "./Slices/listSlice";



const Store = configureStore({
    reducer: {
        board: boardReducer,
        list: listReducer

    }
})

export default Store;