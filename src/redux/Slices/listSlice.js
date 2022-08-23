import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allLists: [],
    loadingListService: true
}


const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loadingListService = action.payload;
        },
        successCreatingList: (state, action) => {
            state.allLists.push(action.payload);
        },
        successFetchingList: (state, action) => {
            state.allLists = action.payload;
        },
        successDeletingList: (state, action) => {
            state.allLists = state.allLists.filter(list => list._id !== action.payload);
        },
        updateListDragDrop: (state, action) => {
            state.allLists = action.payload;
        },
        updateListTitle: (state, action) => {
            const {listId, title} = action.payload;
            state.allLists = state.allLists.map(list => {
                if (list._id === listId) {
                    list.title = title
                }
                return list;
            });
        }


    }
});

export const {
    setLoading,
    successCreatingList,
    successFetchingList,
    successDeletingList,
    updateListDragDrop,
    updateListTitle
} = listSlice.actions;

export default listSlice.reducer;