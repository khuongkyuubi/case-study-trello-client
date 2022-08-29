import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listTeamData: [],
    pending: true,
    backgroundImages: [
        "https://images.unsplash.com/photo-1636471815144-616b00e21f24",
        "https://images.unsplash.com/photo-1636467455675-46b5552af493",
        "https://images.unsplash.com/photo-1636412911203-4065623b94fc",
        "https://images.unsplash.com/photo-1636408807362-a6195d3dd4de",
        "https://images.unsplash.com/photo-1603932743786-9a069a74e632",
        "https://images.unsplash.com/photo-1636207608470-dfedb46c2380",
        "https://images.unsplash.com/photo-1603932978744-e09fcf98ac00",
        "https://images.unsplash.com/photo-1636207543865-acf3ad382295",
        "https://images.unsplash.com/photo-1597244211919-8a52ab2e40ea",
    ],
    smallPostfix:
        "?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjM2NjUzNDgz&ixlib=rb-1.2.1&q=80&w=400",
    creating: false,
    backgroundColors: ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#00aecc'],
};

const boardInTeamsSlice = createSlice({
    name: "boardsTeam",
    initialState,
    reducers: {
        startFetchingBoardInTeam: (state) => {
            state.pending = true;
        },
         successFetchingBoardInTeam: (state, action) => {
            state.listTeamData = action.payload.boards;
            state.pending = false;
        },
        failFetchingBoardInTeam: (state) => {
            state.pending = false;
        },
        startCreatingBoardInTeam: (state) => {
            state.creating = true;
        },
        successCreatingBoardInTeam: (state, action) => {
            state.listTeamData.push(action.payload);
            state.creating = false;
        },
        failCreatingBoardInTeam: (state) => {
            state.creating = true;
        },
        reset:(state)=>{
            state=initialState;
        }
    },
});

export const {
    startFetchingBoardInTeam,
    successFetchingBoardInTeam,
    failFetchingBoardInTeam,
    startCreatingBoardInTeam,
    successCreatingBoardInTeam,
    failCreatingBoardInTeam,
    reset
} = boardInTeamsSlice.actions;
export default boardInTeamsSlice.reducer;