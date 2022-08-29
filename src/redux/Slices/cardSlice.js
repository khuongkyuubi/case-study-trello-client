import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cardId: '',
    title: '',
    labels: [],
    members: [],
    watchers: [],
    activities: [],
    checklists: [],
    owner: '', // id of List contain card
    description: '',
    date: {
        startDate: null,
        dueDate: null,
        dueTime: null,
        completed: false,
    },
    attachments: [],
    cover: {
        color: null,
        isSizeOne: null,
    },
    colors: [
        // bg : background ; hbg : hover background
        {bg: '#61bd4f', hbg: '#519839'},
        {bg: '#f2d600', hbg: '#d9b51c'},
        {bg: '#ff9f1a', hbg: '#cd8313'},
        {bg: '#eb5a46', hbg: '#b04632'},
        {bg: '#c377e0', hbg: '#89609e'},
        {bg: '#0079bf', hbg: '#055a8c'},
        {bg: '#344563', hbg: '#172b4d'},
        {bg: '#ff78cb', hbg: '#c75bad'},
    ],
    pending: false,
}
//create slice
const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        reset: () => initialState, // reset state
        setPending: (state, action) => {
            state.pending = action.payload
        },
        setCard: (state, action) => {
            state.cardId = action.payload._id;
            state.title = action.payload.title;
            state.labels = action.payload.labels;
            state.members = action.payload.members;
            state.watchers = action.payload.watchers;
            state.activities = action.payload.activities;
            state.owner = action.payload.owner;
            state.listTitle = action.payload.listTitle;
            state.listId = action.payload.listId;
            state.boardId = action.payload.boardId;
            state.description = action.payload.description;
            state.checklists = action.payload.checklists;
            state.date = action.payload.date;
            state.attachments = action.payload.attachments;
            state.cover = action.payload.cover;
        },
        updateTitle: (state, action) => {
            state.title = action.payload
        },

        createLabel: (state, action) => {
            const { _id, text, color, backColor } = action.payload;
            state.labels.unshift({ _id, text, color, backColor, selected: true });
        },

        updateLabel: (state, action) => {
            const { labelId, text, color, backColor } = action.payload;
            state.labels = state.labels.map((label) => {
                if (label._id === labelId) {
                    label.text = text;
                    label.color = color;
                    label.backColor = backColor;
                }
                return label;
            });
        },
        updateLabelSelection: (state, action) => {
            const { labelId, selected } = action.payload;
            state.labels = state.labels.map((label) => {
                if (label._id === labelId) {
                    label.selected = selected;
                }
                return label;
            });
        },
        updateLabelSelectionOfCard: (state, action) => {
            const { listId, cardId, labelId, selected } = action.payload;
            state.checklists = state.checklists.map((list) => {
                if (list._id === listId) {
                    list.cards = list.cards.map((card) => {
                        if (card._id === cardId) {
                            card.labels = card.labels.map((label) => {
                                if (label._id === labelId) {
                                    label.selected = selected;
                                }
                                return label;
                            });
                        }
                        return card;
                    });
                }
                return list;
            });
            
        },
        updateCreatedLabelId: (state, action) => {
            state.labels = state.labels.map((label) => {
                if (label._id === 'notUpdated') {
                    label._id = action.payload;
                }
                return label;
            });
        },
        addComment: (state, action) => {
            state.activities = action.payload;
        },

    }
});


// export actions
export const {
    reset,
    setPending,
    setCard,
    updateTitle,
    updateLabel,
    updateLabelSelection,
    updateLabelSelectionOfCard,
    createLabel,
    updateCreatedLabelId,
    addComment,
} = cardSlice.actions;

//export reducer
export default cardSlice.reducer;


