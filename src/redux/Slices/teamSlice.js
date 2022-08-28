import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    id: '',
    name: '',
    description: '',
    members: [],
    teamsData: [],
    image: '',
    pending: true,
    creating:false,
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        startFetchingTeams: (state) => {
            state.pending = true;
        },
        successFetchingTeams: (state, action) => {
            state.teamsData = action.payload.teams;
            state.pending = false;
        },
        failFetchingTeams: (state) => {
            state.pending = false;
        },
        startCreatingTeam: (state) => {
            state.creating = true;
        },
        successCreatingTeam: (state, action) => {
            state.teamsData.push(action.payload);
            state.creating = false;
        },
        failCreatingTeam: (state) => {
            state.creating = true;
        },
        reset:(state)=>{
            state=initialState;
        }
    },
});

export const {
    startFetchingTeams,
    successFetchingTeams,
    failFetchingTeams,
    startCreatingTeam,
    successCreatingTeam,
    failCreatingTeam,
    reset
} = teamSlice.actions;

export default teamSlice.reducer;