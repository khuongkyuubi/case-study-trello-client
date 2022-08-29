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
        successFetchingLists: (state, action) => {
            state.allLists = action.payload;
        },
        successDeletingList: (state, action) => {
            state.allLists = state.allLists.filter(list => list._id !== action.payload);
        },
        updateListDragDrop: (state, action) => {
            state.allLists = action.payload;
        },
        updateCardDragDrop: (state, action) => {
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
        },
        successCreatingCard: (state, action) => {
            state.allLists = state.allLists.map((list) => {
                if (list._id === action.payload.listId) {
                    return action.payload.updatedList;
                }
                return list;
            });
        },
        setCardTitle: (state, action) => {
            const {listId, cardId, title} = action.payload;
            state.allLists = state.allLists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) card.title = title;
                        return card;
                    });
                }
                return list;
            });
        },


    }
});

export const {
    setLoading,
    successCreatingList,
    successFetchingLists,
    successDeletingList,
    updateListDragDrop,
    updateListTitle,
    updateCardDragDrop,
    successCreatingCard,
    setCardTitle,
} = listSlice.actions;

export default listSlice.reducer;