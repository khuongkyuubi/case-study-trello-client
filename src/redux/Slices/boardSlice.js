import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    id: '',
    title: '',
    backgroundImageLink: '',
    isImage: true,
    lists: [],
    members: [],
    activity: [],
    loading: true,
    description: '',
    activityLoading: false,
};

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        successFetchingBoard: (state, action) => {
            const {
                _id: id,
                title,
                backgroundImageLink,
                isImage,
                lists,
                members,
                activity,
                description
            } = action.payload;
            state.id = action.payload._id;
            state.title = action.payload.title;
            state.backgroundImageLink = action.payload.backgroundImageLink;
            state.isImage = action.payload.isImage;
            state.lists = action.payload.lists;
            state.members = action.payload.members;
            state.activity = action.payload.activity;
            state.description = action.payload.description;
        },
        updateTitle: (state, action) => {
            state.tiles = action.payload;
        },
        setActivityBoard: (state, action) => {
            state.activityLoading = action.payload;
        },
        updateActivity: (state, action) => {
            state.activity = action.payload;
        },
        updateDescription: (state, action) => {
            state.description = action.payload;
        },
        updateBackground: (state, action) => {
            const {background, isImage} = action.payload;
            state.backgroundImageLink = background;
            state.isImage = isImage;
        },
        addMembers: (state, action) => {
            state.members = action.payload;
        }
    },
});

export const {
    setLoading,
    successFetchingBoard,
    updateTitle,
    setActivityBoard,
    updateActivity,
    updateDescription,
    updateBackground,
    addMembers
} = boardSlice.actions;

export default boardSlice.reducer;