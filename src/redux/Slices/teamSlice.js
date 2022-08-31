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
    defaultTeam: '',
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        startFetchingTeams: (state) => {
            state.pending = true;
        },
        successFetchingTeams: (state, action) => {
            action.payload.teams.map(team => {
                team.isOpen = false;
            }
        );
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
        changeIsOpenStatus: (state, action) => {
            state.teamsData = state.teamsData.map(team => {
                if(team._id === action.payload.teamId){
                    team.isOpen = !team.isOpen;
                    // team.isOpen = action.payload.isOpen;
                }
                return team;
            })
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
    changeIsOpenStatus,
    failCreatingTeam,
    reset
} = teamSlice.actions;

export default teamSlice.reducer;