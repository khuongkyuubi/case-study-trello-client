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
    team: [],
    loading: true,
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
        successFetchingTeam: (state, action) => {
            state.team = action.payload.team;
            state.pending = false;
            state.loading = false;
        },

        failFetchingTeams: (state) => {
            state.pending = false;
        },
        startCreatingTeam: (state) => {
            state.creating = true;
        },
        successCreatingTeam: (state, action) => {
            // console.log(action.payload, "team created");
            state.teamsData.unshift(action.payload);
            state.creating = false;
        },
        startFetchingTeamCurrent: (state, action) => {
            state.loading = true;
        },
        failCreatingTeam: (state) => {
            state.creating = true;
        },
        changeIsOpenStatus: (state, action) => {
            state.teamsData = state.teamsData.map(team => {
                if(team._id === action.payload.teamId){
                    team.isOpen = !team.isOpen;
                }
                return team;
            })
        },
        changeRole: (state, action) => {
            state.teamsData = state.teamsData.map(team => {
                if(team._id === action.payload.teamId){
                    team.role = action.payload.role;
                }
                return team;
            })
        },
        inviteMember: (state, action) => {
            // console.log(action.payload, "invite")
            state.members = action.payload;
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
    reset,
    successFetchingTeam,
    changeRole,
    inviteMember,
    startFetchingTeamCurrent
} = teamSlice.actions;

export default teamSlice.reducer;