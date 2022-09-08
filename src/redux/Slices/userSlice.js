import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    isAuthenticated: null,
    pending: true,
    loading: false,
    token: localStorage.getItem("token"),
    boards:[],
    teams: [],
    teamFind:{},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registrationStart: (state) => {
            state.pending = true;
        },
        registrationEnd: (state) => {
            state.pending = false;
        },
        loginStart: (state) => {
            state.pending = true;
        },
        loginSuccess: (state, action) => {
            state.pending = false;
            state.isAuthenticated = true;
            state.userInfo = action.payload.user;
            state.token = action.payload.user.token;
            localStorage.setItem("token", action.payload.user.token);
        },
        loginFailure: (state) => {
            state.pending = false;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        },
        loadStart: (state) => {
            state.pending = true;
        },
        loadSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload.user;
            state.token = localStorage.getItem("token");
            state.pending = false;
        },
        loadFailure: (state) => {
            state.pending = false;
            state.isAuthenticated = false;
            state.userInfo = null;
            state.token = null;
            localStorage.removeItem("token");
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userInfo = null;
            state.token = null;
            localStorage.removeItem("token");
        },
        fetchingStart: (state)=>{
            state.loading = true;
        },
        fetchingFinish: (state) => {
            state.loading = false;
        },
        addNewBoard: (state,action) => {
            state.userInfo.boards.unshift(action.payload);
        },
        updateUserInfo: (state,action) => {
            state.userInfo = action.payload;
        },
        updateTeam: (state,action) => {
            state.teams = action.payload.teams;
        },
        updateTeamCreate: (state,action) => {
            state.teams.push(action.payload.team)
        },
        inviteTeamMember: (state,action) => {
            state.teamFind.members = action.payload.members;
        },
        removeTeamMember: (state,action) => {
            state.teams = state.teams.map((team)=>{
                if(team._id === action.payload.teamId){
                    team.members = team.members.filter((member)=> member._id !== action.payload.idMember)
                }
                return team;
            })
            state.teamFind.members = state.teamFind.members.filter((member)=>member._id !== action.payload.idMember)
        },
        addTeamFind: (state,action) => {
            state.teamFind = action.payload.team;
        },
        updateRoleTeamFind: (state,action) => {
            state.teamFind.role = action.payload;
        },
        updateRoleUserRole: (state,action) => {
            state.teamFind.members = state.teamFind.members.map((member) =>{
                if(member._id === action.payload.idMember){
                    member.role = action.payload.roleUser;
                }
                return member;
            })
        },
        loadBoardSuccess: (state,action) => {
            state.boards = action.payload;
        },

    },
});

export const {
    registrationStart,
    registrationEnd,
    loginStart,
    loginFailure,
    loginSuccess,
    loadStart,
    loadSuccess,
    loadFailure,
    logout,
    fetchingStart,
    fetchingFinish,
    addNewBoard,
    updateUserInfo,
    updateTeam,
    updateTeamCreate,
    removeTeamMember,
    inviteTeamMember,
    addTeamFind,
    updateRoleTeamFind,
    updateRoleUserRole,
    loadBoardSuccess,
} = userSlice.actions;
export default userSlice.reducer;