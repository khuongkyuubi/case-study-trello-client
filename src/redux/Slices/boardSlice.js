import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    id: '',
    title: '',
    backgroundImageLink: '',
    labels: [],
    isImage: true,
    lists: [],
    members: [],
    activity: [],
    loading: true,
    description: '',
    activityLoading: false,
    colors: [
        {bg: '#61bd4f', hbg: '#519839'},
        {bg: '#f2d600', hbg: '#d9b51c'},
        {bg: '#ff9f1a', hbg: '#cd8313'},
        {bg: '#eb5a46', hbg: '#b04632'},
        {bg: '#c377e0', hbg: '#89609e'},
        {bg: '#0079bf', hbg: '#055a8c'},
        {bg: '#344563', hbg: '#172b4d'},
        {bg: '#ff78cb', hbg: '#c75bad'},
    ],
    isExpandedLabels: false,
};

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        successFetchingBoard: (state, action) => {
            state.id = action.payload._id;
            state.title = action.payload.title;
            state.backgroundImageLink = action.payload.backgroundImageLink;
            state.isImage = action.payload.isImage;
            state.lists = action.payload.lists;
            state.members = action.payload.members;
            state.activity = action.payload.activity;
            state.description = action.payload.description;
            state.labels = action.payload.labels;
            state.isExpandedLabels = action.payload.isExpandedLabels ?? true;
        },
        updateTitle: (state, action) => {
            state.title = action.payload;
        },
        setActivityLoading: (state, action) => {
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
        },
        updateBoardLabel: (state, action) => {
            const {labelId, text, color, backColor} = action.payload;
            state.labels = state.labels.map((label) => {
                if (label._id === labelId) {
                    label.text = text;
                    label.color = color;
                    label.backColor = backColor;
                }
                return label;
            });
        },
        createLabelBoard: (state, action) => {
            state.labels.unshift(action.payload);
        },

        updateCreatedLabelIdBoard: (state, action) => {
            state.labels = state.labels.map((label) => {
                if (label._id === 'notUpdated') {
                    label._id = action.payload;
                }
                return label;
            });
        },
        changeIsExpanded: (state) => {
            state.isExpandedLabels = !state.isExpandedLabels;
        }
    },
});

export const {
    setLoading,
    successFetchingBoard,
    updateTitle,
    setActivityLoading,
    updateActivity,
    updateDescription,
    updateBackground,
    addMembers,
    updateBoardLabel,
    createLabelBoard,
    updateCreatedLabelIdBoard,
    changeIsExpanded,
} = boardSlice.actions;

export default boardSlice.reducer;